"""
ingest_lightrag.py - Portfolio RAG ingestion using LightRAG with Gemini

This script creates a LightRAG knowledge graph from portfolio documents including:
- Resume/CV
- Project READMEs
- Any markdown, text, PDF, or Word files in the data directory
- GitHub repositories (optional)

Uses Google's Gemini models:
- gemini-2.0-flash-exp for LLM
- text-embedding-004 for embeddings
"""

import os
import asyncio
import logging
import argparse
from pathlib import Path
from typing import List, Optional

# Initialize logger
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Import document processors from existing script
from ingest_portfolio_rag import (
    process_markdown_file,
    process_txt_file,
    process_docx_file,
    process_pdf_file,
    process_github_repo,
    get_user_repos,
)

# LightRAG
try:
    from lightrag import LightRAG, QueryParam
    from lightrag.utils import EmbeddingFunc
    LIGHTRAG_AVAILABLE = True
except ImportError:
    LIGHTRAG_AVAILABLE = False
    logger.error("LightRAG not installed. Install with: pip install lightrag-hku")

# Gemini models
from gemini_llm import gemini_model_complete_async, gemini_embedding_async

# Environment
from dotenv import load_dotenv

load_dotenv()


async def process_documents_for_lightrag(
    source_directory: str,
    github_repos: List[str] = None,
    github_user: str = None,
    github_token: str = None,
    enable_github: bool = False,
) -> str:
    """
    Process all documents and combine into a single text for LightRAG ingestion.

    Args:
        source_directory: Directory containing documents
        github_repos: List of GitHub repositories to ingest
        github_user: GitHub username to fetch all public repos from
        github_token: Optional GitHub token for API authentication
        enable_github: Enable GitHub repository extraction

    Returns:
        Combined text from all documents
    """
    all_text = []

    # Process local documents
    if os.path.isdir(source_directory):
        supported_extensions = (".md", ".markdown", ".txt", ".docx", ".pdf")
        source_files = []

        for root, dirs, files in os.walk(source_directory):
            for f in files:
                if f.lower().endswith(supported_extensions):
                    full_path = os.path.join(root, f)
                    source_files.append(full_path)

        logger.info(f"Processing {len(source_files)} local files...")

        for filepath in source_files:
            relative_path = os.path.relpath(filepath, source_directory)
            file_ext = filepath.lower()

            documents = []

            if file_ext.endswith((".md", ".markdown")):
                documents = process_markdown_file(filepath, relative_path, "")
            elif file_ext.endswith(".txt"):
                documents = process_txt_file(filepath, relative_path, "")
            elif file_ext.endswith(".docx"):
                documents = process_docx_file(filepath, relative_path, "")
            elif file_ext.endswith(".pdf"):
                documents = process_pdf_file(filepath, relative_path, "")

            for doc in documents:
                # Add source context
                source_info = f"\n\n--- Source: {relative_path} ---\n"
                all_text.append(source_info + doc.page_content)

            if documents:
                logger.info(f"Processed {filepath}")

    # Process GitHub repositories (only if enabled)
    if enable_github:
        if github_user:
            logger.info(f"Fetching repositories for user: {github_user}")
            user_repos = get_user_repos(github_user, github_token)
            if user_repos:
                if github_repos:
                    github_repos.extend(user_repos)
                else:
                    github_repos = user_repos

        if github_repos:
            logger.info(f"Processing {len(github_repos)} GitHub repositories...")
            for repo_name in github_repos:
                logger.info(f"Fetching repository: {repo_name}")
                github_docs = process_github_repo(
                    repo_name=repo_name, github_token=github_token
                )

                for doc in github_docs:
                    source_info = f"\n\n--- GitHub: {repo_name} - {doc.metadata.get('source_file', 'unknown')} ---\n"
                    all_text.append(source_info + doc.page_content)

                logger.info(f"Processed {len(github_docs)} files from {repo_name}")

    combined_text = "\n\n".join(all_text)
    logger.info(f"Total text length: {len(combined_text)} characters")

    return combined_text


async def run_lightrag_ingestion(
    source_dir: str,
    output_dir: str,
    llm_model: str = "gemini-2.0-flash-exp",
    embedding_model: str = "models/text-embedding-004",
    github_repos: List[str] = None,
    github_user: str = None,
    github_token: str = None,
    enable_github: bool = False,
):
    """
    Main LightRAG ingestion function.

    Args:
        source_dir: Directory with source documents
        output_dir: Output directory for LightRAG knowledge graph
        llm_model: Gemini model for text generation
        embedding_model: Gemini model for embeddings
        github_repos: List of GitHub repositories to ingest
        github_user: GitHub username to fetch all public repos from
        github_token: Optional GitHub token for API authentication
        enable_github: Enable GitHub repository extraction
    """
    if not LIGHTRAG_AVAILABLE:
        logger.error("LightRAG is not available. Cannot proceed.")
        return {"status": "error", "message": "LightRAG not installed"}

    logger.info("Starting LightRAG portfolio ingestion")
    logger.info(f"Source directory: {source_dir}")
    logger.info(f"Output directory: {output_dir}")
    logger.info(f"LLM model: {llm_model}")
    logger.info(f"Embedding model: {embedding_model}")

    # Check for API key
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        logger.error("GOOGLE_API_KEY not found in environment variables")
        return {"status": "error", "message": "GOOGLE_API_KEY not set"}

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Initialize LightRAG with Gemini models
    try:
        logger.info("Initializing LightRAG...")

        # Create wrapper functions for LightRAG
        async def llm_model_func(prompt, **kwargs):
            return await gemini_model_complete_async(prompt, model_name=llm_model, **kwargs)

        async def embedding_func(texts):
            if isinstance(texts, str):
                texts = [texts]
            embeddings = await gemini_embedding_async(texts, model_name=embedding_model)
            return embeddings if len(texts) > 1 else embeddings[0]

        rag = LightRAG(
            working_dir=output_dir,
            llm_model_func=llm_model_func,
            embedding_func=EmbeddingFunc(
                embedding_dim=768,  # text-embedding-004 dimension
                max_token_size=8192,
                func=embedding_func,
            ),
        )

        # Initialize storages
        await rag.initialize_storages()
        logger.info("LightRAG initialized successfully")

    except Exception as e:
        logger.error(f"Error initializing LightRAG: {e}")
        return {"status": "error", "message": f"LightRAG initialization failed: {e}"}

    # Process documents
    try:
        logger.info("Processing documents...")
        combined_text = await process_documents_for_lightrag(
            source_directory=source_dir,
            github_repos=github_repos,
            github_user=github_user,
            github_token=github_token,
            enable_github=enable_github,
        )

        if not combined_text or len(combined_text.strip()) < 100:
            logger.warning("No sufficient text content found to process")
            await rag.finalize_storages()
            return {"status": "error", "message": "No documents found to process"}

    except Exception as e:
        logger.error(f"Error processing documents: {e}")
        await rag.finalize_storages()
        return {"status": "error", "message": f"Document processing failed: {e}"}

    # Insert into LightRAG
    try:
        logger.info("Inserting documents into LightRAG knowledge graph...")
        await rag.ainsert(combined_text)
        logger.info("Documents inserted successfully")

    except Exception as e:
        logger.error(f"Error inserting documents into LightRAG: {e}")
        await rag.finalize_storages()
        return {"status": "error", "message": f"LightRAG insertion failed: {e}"}

    # Finalize
    try:
        await rag.finalize_storages()
        logger.info("LightRAG ingestion completed successfully")

        return {
            "status": "success",
            "message": f"Processed documents into knowledge graph",
            "output_dir": output_dir,
            "text_length": len(combined_text),
        }

    except Exception as e:
        logger.error(f"Error finalizing LightRAG: {e}")
        return {"status": "error", "message": f"Finalization failed: {e}"}


def main():
    parser = argparse.ArgumentParser(
        description="Portfolio LightRAG ingestion script - Process local documents and GitHub repositories",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--source_dir",
        default="./data/documents",
        help="Local directory containing documents.",
    )
    parser.add_argument(
        "--output_dir",
        default="./data/lightrag_storage",
        help="Directory to save the LightRAG knowledge graph.",
    )
    parser.add_argument(
        "--llm_model",
        default="gemini-2.0-flash-exp",
        help="Gemini model for text generation.",
    )
    parser.add_argument(
        "--embedding_model",
        default="models/text-embedding-004",
        help="Gemini model for embeddings.",
    )
    parser.add_argument(
        "--enable-github",
        action="store_true",
        help="Enable GitHub repository extraction (disabled by default)",
    )
    parser.add_argument(
        "--github_repos",
        nargs="+",
        help='GitHub repositories to ingest (format: "owner/repo").',
    )
    parser.add_argument(
        "--github_user",
        help="GitHub username to fetch all public repositories from",
    )
    parser.add_argument(
        "--github_token",
        help="GitHub personal access token for higher API rate limits (optional)",
    )

    args = parser.parse_args()

    # Get GitHub token from args or environment variable
    github_token = args.github_token or os.getenv("GITHUB_TOKEN")

    # Run async ingestion
    result = asyncio.run(
        run_lightrag_ingestion(
            source_dir=args.source_dir,
            output_dir=args.output_dir,
            llm_model=args.llm_model,
            embedding_model=args.embedding_model,
            github_repos=args.github_repos,
            github_user=args.github_user,
            github_token=github_token,
            enable_github=args.enable_github,
        )
    )

    print(f"\n{result}")


if __name__ == "__main__":
    main()
