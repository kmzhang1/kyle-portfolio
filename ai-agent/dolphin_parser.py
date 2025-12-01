"""
Dolphin PDF Parser - Integration module for ByteDance Dolphin document parser

This module provides a simplified interface to use Dolphin for parsing PDFs
in the RAG ingestion pipeline. Self-contained without requiring Dolphin repo.
"""

import io
import logging
from typing import List, Optional

logger = logging.getLogger(__name__)

# Try to import Dolphin dependencies
try:
    import torch
    import pymupdf
    from PIL import Image
    from transformers import AutoProcessor, VisionEncoderDecoderModel
    DOLPHIN_AVAILABLE = True
except ImportError as e:
    DOLPHIN_AVAILABLE = False
    logger.warning(f"Dolphin dependencies not available: {e}. PDF parsing will use fallback.")


def convert_pdf_to_images(pdf_path: str, target_size: int = 896) -> List[Image.Image]:
    """Convert PDF pages to images

    Args:
        pdf_path: Path to PDF file
        target_size: Target size for the longest dimension

    Returns:
        List of PIL Images
    """
    images = []
    try:
        doc = pymupdf.open(pdf_path)

        for page_num in range(len(doc)):
            page = doc[page_num]

            # Calculate scale to make longest dimension equal to target_size
            rect = page.rect
            scale = target_size / max(rect.width, rect.height)

            # Render page as image
            mat = pymupdf.Matrix(scale, scale)
            pix = page.get_pixmap(matrix=mat)

            # Convert to PIL Image
            img_data = pix.tobytes("png")
            pil_image = Image.open(io.BytesIO(img_data))
            images.append(pil_image)

        doc.close()
        logger.info(f"Successfully converted {len(images)} pages from PDF")
        return images

    except Exception as e:
        logger.error(f"Error converting PDF to images: {str(e)}")
        return []


class DolphinParser:
    """Wrapper class for ByteDance Dolphin document parser"""

    def __init__(self, model_path: str = "./hf_model"):
        """Initialize Dolphin parser

        Args:
            model_path: Path to the Dolphin model directory
        """
        if not DOLPHIN_AVAILABLE:
            raise ImportError("Dolphin dependencies not available. Install requirements first.")

        self.model_path = model_path
        self.model = None
        self.processor = None
        self.tokenizer = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        logger.info(f"Initializing Dolphin parser with device: {self.device}")
        self._load_model()

    def _load_model(self):
        """Load the Dolphin model and processor"""
        try:
            self.processor = AutoProcessor.from_pretrained(self.model_path)
            self.model = VisionEncoderDecoderModel.from_pretrained(self.model_path)
            self.model.eval()
            self.model.to(self.device)

            # Use float16 on CUDA, float32 on CPU
            if self.device == "cuda":
                self.model = self.model.half()
            else:
                self.model = self.model.float()

            self.tokenizer = self.processor.tokenizer
            logger.info("Dolphin model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading Dolphin model: {e}")
            raise

    def chat(self, prompt: str, image: Image.Image) -> str:
        """Process an image with a text prompt

        Args:
            prompt: Text prompt to guide the model
            image: PIL Image to process

        Returns:
            Generated text from the model
        """
        # Prepare image
        inputs = self.processor(image, return_tensors="pt", padding=True)

        if self.device == "cuda":
            pixel_values = inputs.pixel_values.half().to(self.device)
        else:
            pixel_values = inputs.pixel_values.float().to(self.device)

        # Prepare prompt
        formatted_prompt = f"<s>{prompt} <Answer/>"
        prompt_inputs = self.tokenizer(
            formatted_prompt,
            add_special_tokens=False,
            return_tensors="pt"
        )

        prompt_ids = prompt_inputs.input_ids.to(self.device)
        attention_mask = prompt_inputs.attention_mask.to(self.device)

        # Generate text
        with torch.no_grad():
            outputs = self.model.generate(
                pixel_values=pixel_values,
                decoder_input_ids=prompt_ids,
                decoder_attention_mask=attention_mask,
                min_length=1,
                max_length=4096,
                pad_token_id=self.tokenizer.pad_token_id,
                eos_token_id=self.tokenizer.eos_token_id,
                use_cache=True,
                bad_words_ids=[[self.tokenizer.unk_token_id]],
                return_dict_in_generate=True,
                do_sample=False,
                num_beams=1
            )

        # Decode output
        sequence = self.tokenizer.batch_decode(outputs.sequences, skip_special_tokens=False)[0]
        cleaned = sequence.replace(formatted_prompt, "").replace("<pad>", "").replace("</s>", "").strip()

        return cleaned

    def parse_pdf_simple(self, pdf_path: str) -> str:
        """Parse a PDF file and extract text content using PyMuPDF as fallback

        Dolphin is optimized for structured document parsing with layout analysis.
        For simple text extraction, we use PyMuPDF which is faster and more direct.

        Args:
            pdf_path: Path to the PDF file

        Returns:
            Extracted text content
        """
        import os
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF file not found: {pdf_path}")

        logger.info(f"Parsing PDF with PyMuPDF (direct text extraction): {pdf_path}")

        all_text = []

        try:
            # Use PyMuPDF for direct text extraction (faster than Dolphin for simple PDFs)
            doc = pymupdf.open(pdf_path)
            total_pages = len(doc)

            for page_num in range(total_pages):
                page = doc[page_num]
                text = page.get_text()

                if text and text.strip():
                    all_text.append(f"=== Page {page_num + 1} ===\n{text.strip()}")
                else:
                    logger.warning(f"No text found on page {page_num + 1}, trying OCR with Dolphin...")

                    # If no text found, try with Dolphin (for scanned PDFs)
                    # Need to convert before closing doc
                    images = convert_pdf_to_images(pdf_path)
                    if images and page_num < len(images):
                        try:
                            # Use Dolphin for OCR
                            page_content = self.chat(
                                "Extract all text from this document image in reading order. Output only the text content, not layout coordinates.",
                                images[page_num]
                            )
                            if page_content and page_content.strip():
                                all_text.append(f"=== Page {page_num + 1} ===\n{page_content.strip()}")
                        except Exception as e:
                            logger.error(f"Error using Dolphin OCR on page {page_num + 1}: {e}")
                            all_text.append(f"=== Page {page_num + 1} ===\n[No text content]")

            doc.close()
            logger.info(f"Successfully extracted text from {total_pages} pages")

        except Exception as e:
            logger.error(f"Error parsing PDF: {e}")
            raise

        return "\n\n".join(all_text)


def parse_pdf_with_dolphin(pdf_path: str, model_path: str = "./hf_model") -> Optional[str]:
    """Convenience function to parse a PDF with Dolphin

    Args:
        pdf_path: Path to the PDF file
        model_path: Path to the Dolphin model directory

    Returns:
        Extracted text content, or None if parsing fails
    """
    if not DOLPHIN_AVAILABLE:
        logger.error("Dolphin not available. Cannot parse PDF.")
        return None

    try:
        parser = DolphinParser(model_path=model_path)
        return parser.parse_pdf_simple(pdf_path)
    except Exception as e:
        logger.error(f"Error parsing PDF with Dolphin: {e}")
        return None
