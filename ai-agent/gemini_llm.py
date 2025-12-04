"""
Gemini LLM and Embedding wrappers for LightRAG

This module provides LightRAG-compatible interfaces for Google's Gemini models:
- gemini-2.0-flash-exp for text generation
- text-embedding-004 for embeddings

Uses the google-genai package (not the deprecated google-generativeai)
"""

import os
import logging
from typing import List, Dict, Any, Optional
from google import genai
from google.genai import types

logger = logging.getLogger(__name__)


class GeminiLLM:
    """Gemini LLM wrapper for LightRAG"""

    def __init__(
        self,
        model_name: str = "gemini-2.0-flash-exp",
        api_key: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
    ):
        """
        Initialize Gemini LLM

        Args:
            model_name: Gemini model to use (default: gemini-2.0-flash-exp)
            api_key: Google AI API key (uses GOOGLE_API_KEY env var if not provided)
            temperature: Sampling temperature
            max_tokens: Maximum tokens to generate
        """
        self.model_name = model_name
        self.temperature = temperature
        self.max_tokens = max_tokens

        # Configure API key
        api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError(
                "Google API key not found. Set GOOGLE_API_KEY environment variable "
                "or pass api_key parameter."
            )

        # Initialize client
        self.client = genai.Client(api_key=api_key)
        logger.info(f"Initialized Gemini LLM: {model_name}")

    def __call__(self, prompt: str, **kwargs) -> str:
        """
        Generate text using Gemini

        Args:
            prompt: Input prompt
            **kwargs: Additional generation parameters

        Returns:
            Generated text
        """
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=self.temperature,
                    max_output_tokens=self.max_tokens,
                    safety_settings=[
                        types.SafetySetting(
                            category="HARM_CATEGORY_HARASSMENT",
                            threshold="BLOCK_NONE"
                        ),
                        types.SafetySetting(
                            category="HARM_CATEGORY_HATE_SPEECH",
                            threshold="BLOCK_NONE"
                        ),
                        types.SafetySetting(
                            category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold="BLOCK_NONE"
                        ),
                        types.SafetySetting(
                            category="HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold="BLOCK_NONE"
                        ),
                    ]
                )
            )
            return response.text
        except Exception as e:
            logger.error(f"Error generating text with Gemini: {e}")
            raise

    async def acall(self, prompt: str, **kwargs) -> str:
        """
        Async generate text using Gemini

        Args:
            prompt: Input prompt
            **kwargs: Additional generation parameters

        Returns:
            Generated text
        """
        try:
            response = await self.client.aio.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=self.temperature,
                    max_output_tokens=self.max_tokens,
                    safety_settings=[
                        types.SafetySetting(
                            category="HARM_CATEGORY_HARASSMENT",
                            threshold="BLOCK_NONE"
                        ),
                        types.SafetySetting(
                            category="HARM_CATEGORY_HATE_SPEECH",
                            threshold="BLOCK_NONE"
                        ),
                        types.SafetySetting(
                            category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold="BLOCK_NONE"
                        ),
                        types.SafetySetting(
                            category="HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold="BLOCK_NONE"
                        ),
                    ]
                )
            )
            return response.text
        except Exception as e:
            logger.error(f"Error generating text with Gemini: {e}")
            raise


class GeminiEmbedding:
    """Gemini Embedding wrapper for LightRAG"""

    def __init__(
        self,
        model_name: str = "models/text-embedding-004",
        api_key: Optional[str] = None,
    ):
        """
        Initialize Gemini Embedding

        Args:
            model_name: Gemini embedding model (default: models/text-embedding-004)
            api_key: Google AI API key (uses GOOGLE_API_KEY env var if not provided)
        """
        self.model_name = model_name

        # Configure API key
        api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError(
                "Google API key not found. Set GOOGLE_API_KEY environment variable "
                "or pass api_key parameter."
            )

        # Initialize client
        self.client = genai.Client(api_key=api_key)
        logger.info(f"Initialized Gemini Embedding: {model_name}")

    def __call__(self, texts: List[str], **kwargs) -> List[List[float]]:
        """
        Generate embeddings for texts

        Args:
            texts: List of text strings to embed
            **kwargs: Additional parameters

        Returns:
            List of embedding vectors
        """
        try:
            embeddings = []
            for text in texts:
                result = self.client.models.embed_content(
                    model=self.model_name,
                    contents=text,
                    config=types.EmbedContentConfig(
                        task_type="RETRIEVAL_DOCUMENT"
                    )
                )
                embeddings.append(result.embeddings[0].values)
            return embeddings
        except Exception as e:
            logger.error(f"Error generating embeddings with Gemini: {e}")
            raise

    async def acall(self, texts: List[str], **kwargs) -> List[List[float]]:
        """
        Async generate embeddings for texts

        Args:
            texts: List of text strings to embed
            **kwargs: Additional parameters

        Returns:
            List of embedding vectors
        """
        try:
            embeddings = []
            for text in texts:
                result = await self.client.aio.models.embed_content(
                    model=self.model_name,
                    contents=text,
                    config=types.EmbedContentConfig(
                        task_type="RETRIEVAL_DOCUMENT"
                    )
                )
                embeddings.append(result.embeddings[0].values)
            return embeddings
        except Exception as e:
            logger.error(f"Error generating embeddings with Gemini: {e}")
            raise


def gemini_model_complete(
    prompt: str,
    model_name: str = "gemini-2.0-flash-exp",
    **kwargs
) -> str:
    """
    LightRAG-compatible completion function using Gemini

    Args:
        prompt: Input prompt
        model_name: Gemini model name
        **kwargs: Additional parameters

    Returns:
        Generated text
    """
    llm = GeminiLLM(model_name=model_name)
    return llm(prompt, **kwargs)


async def gemini_model_complete_async(
    prompt: str,
    model_name: str = "gemini-2.0-flash-exp",
    **kwargs
) -> str:
    """
    LightRAG-compatible async completion function using Gemini

    Args:
        prompt: Input prompt
        model_name: Gemini model name
        **kwargs: Additional parameters

    Returns:
        Generated text
    """
    llm = GeminiLLM(model_name=model_name)
    return await llm.acall(prompt, **kwargs)


def gemini_embedding(
    texts: List[str],
    model_name: str = "models/text-embedding-004",
    **kwargs
) -> List[List[float]]:
    """
    LightRAG-compatible embedding function using Gemini

    Args:
        texts: List of texts to embed
        model_name: Gemini embedding model name
        **kwargs: Additional parameters

    Returns:
        List of embedding vectors
    """
    embedding = GeminiEmbedding(model_name=model_name)
    return embedding(texts, **kwargs)


async def gemini_embedding_async(
    texts: List[str],
    model_name: str = "models/text-embedding-004",
    **kwargs
) -> List[List[float]]:
    """
    LightRAG-compatible async embedding function using Gemini

    Args:
        texts: List of texts to embed
        model_name: Gemini embedding model name
        **kwargs: Additional parameters

    Returns:
        List of embedding vectors
    """
    embedding = GeminiEmbedding(model_name=model_name)
    return await embedding.acall(texts, **kwargs)
