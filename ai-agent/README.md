# Portfolio RAG Ingestion with ByteDance Dolphin

This directory contains the RAG (Retrieval Augmented Generation) ingestion pipeline for the portfolio chatbot, featuring advanced PDF parsing using ByteDance Dolphin.

## Features

- **Multi-format document support**: Markdown, text, Word documents (.docx), and PDFs
- **Advanced PDF parsing**: Uses ByteDance Dolphin-1.5 for accurate document image parsing
- **Semantic tagging**: Automatically categorizes content (projects, experience, skills, education)
- **Vector search**: FAISS index for fast similarity search
- **Embedding generation**: Sentence transformers for text embeddings

## Setup

### 1. Install Dependencies

```bash
# Using pip
pip install -r requirements.txt

# Or using uv (recommended)
uv pip install -r requirements.txt
```

### 2. Download Dolphin Model

Download the Dolphin-1.5 model (if not already present):

```bash
# Download Dolphin-1.5 model
huggingface-cli download ByteDance/Dolphin-1.5 --local-dir ./hf_model
```

**Note:** The Dolphin repository is NOT required. The `dolphin_parser.py` module is self-contained.

### 3. Prepare Your Documents

Place your documents in the `data/documents/` directory:

```
data/documents/
├── resume.pdf
├── project1/
│   └── README.md
├── experience.docx
└── skills.txt
```

### 4. Run Ingestion

```bash
# Using python directly
python ingest_portfolio_rag.py --source_dir ./data/documents --output_dir ./data/faiss_index

# Or using uv (recommended)
uv run ingest_portfolio_rag.py --source_dir ./data/documents --output_dir ./data/faiss_index
```

## Usage

### Basic Usage

```bash
python ingest_portfolio_rag.py
```

### Advanced Options

```bash
python ingest_portfolio_rag.py \
  --source_dir ./path/to/documents \
  --output_dir ./path/to/output \
  --embedding_model sentence-transformers/all-MiniLM-L6-v2
```

### Arguments

- `--source_dir`: Directory containing source documents (default: `./data/documents`)
- `--output_dir`: Directory to save FAISS index and metadata (default: `./data/faiss_index`)
- `--embedding_model`: Sentence transformer model for embeddings (default: `sentence-transformers/all-MiniLM-L6-v2`)

## Document Processing

### Supported Formats

| Format | Extension | Parser |
|--------|-----------|--------|
| Markdown | `.md`, `.markdown` | markdown library |
| Text | `.txt` | Plain text reader |
| Word | `.docx` | python-docx |
| PDF | `.pdf` | **ByteDance Dolphin-1.5** |

### PDF Processing with Dolphin

PDFs are processed using ByteDance Dolphin, which provides:
- **Two-stage parsing**: Layout analysis followed by element extraction
- **High accuracy**: Better text extraction than traditional OCR
- **Structure preservation**: Maintains document layout and reading order
- **Multi-page support**: Handles complex multi-page documents

## Output

The ingestion process creates:

1. **FAISS Index** (`portfolio_index.faiss`): Vector index for similarity search
2. **Metadata** (`portfolio_metadata.json`): Document chunks with metadata

### Metadata Structure

Each chunk includes:
```json
{
  "id": 0,
  "text": "[PROJECT] [SKILLS] Project description...",
  "metadata": {
    "chunk_id": "uuid-here",
    "parent_document_id": "resume.pdf",
    "parent_content_hash": "sha256-hash",
    "source_type": "pdf_text_dolphin",
    "source_file": "/path/to/resume.pdf",
    "num_pages": 2,
    "parser": "dolphin-1.5"
  }
}
```

## Architecture

```
Document → Dolphin Parser → Text Chunks → Semantic Tags → Embeddings → FAISS Index
                                                                      ↓
                                                                  Metadata JSON
```

## About ByteDance Dolphin

Dolphin is a lightweight (0.3B parameters) multimodal document image parsing model that uses a two-stage analyze-then-parse paradigm:

1. **Stage 1**: Comprehensive layout analysis generating element sequences in natural reading order
2. **Stage 2**: Efficient parsing of individual document elements using heterogeneous anchor prompting

This approach provides superior accuracy compared to traditional PDF text extraction methods.

## Troubleshooting

### Dolphin Dependencies Not Available

If you see warnings about Dolphin not being available:

1. Ensure all dependencies are installed: `pip install -r requirements.txt`
2. Check that the `Dolphin/` directory exists
3. Verify the `hf_model/` directory contains the Dolphin-1.5 model
4. Check CUDA availability for GPU acceleration (optional but recommended)

### GPU/CPU Usage

- **GPU**: Dolphin will use CUDA if available (recommended for faster processing)
- **CPU**: Falls back to CPU processing (slower but functional)

## License

This project uses ByteDance Dolphin, which is licensed under MIT License.
