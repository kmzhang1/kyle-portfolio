"""
query_lightrag.py - Query LightRAG knowledge graph and export results to JSON

This script queries the LightRAG knowledge graph and exports results to JSON
for consumption by the Next.js frontend.

Supports multiple query modes:
- local: Entity/relation-focused retrieval
- global: Graph-based retrieval
- hybrid: Combination of local and global
- naive: Simple text chunk retrieval
"""

import os
import json
import asyncio
import logging
import argparse
from pathlib import Path
from typing import List, Dict, Any, Optional

# Initialize logger
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

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


async def initialize_lightrag(
    working_dir: str,
    llm_model: str = "gemini-2.0-flash-exp",
    embedding_model: str = "models/text-embedding-004",
) -> Optional[LightRAG]:
    """
    Initialize LightRAG instance

    Args:
        working_dir: Directory containing LightRAG knowledge graph
        llm_model: Gemini model for text generation
        embedding_model: Gemini model for embeddings

    Returns:
        Initialized LightRAG instance or None if failed
    """
    if not LIGHTRAG_AVAILABLE:
        logger.error("LightRAG is not available")
        return None

    # Check for API key
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        logger.error("GOOGLE_API_KEY not found in environment variables")
        return None

    # Check if working directory exists
    if not os.path.exists(working_dir):
        logger.error(f"Working directory not found: {working_dir}")
        logger.error("Please run ingest_lightrag.py first to create the knowledge graph")
        return None

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
            working_dir=working_dir,
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
        return rag

    except Exception as e:
        logger.error(f"Error initializing LightRAG: {e}")
        return None


async def query_lightrag(
    rag: LightRAG,
    query: str,
    mode: str = "hybrid",
    top_k: int = 10,
) -> Dict[str, Any]:
    """
    Query LightRAG knowledge graph

    Args:
        rag: LightRAG instance
        query: Query string
        mode: Query mode (local, global, hybrid, naive)
        top_k: Number of results to return

    Returns:
        Dictionary with query results
    """
    try:
        logger.info(f"Querying with mode '{mode}': {query}")

        # Create query parameters
        param = QueryParam(
            mode=mode,
            top_k=top_k,
        )

        # Execute query
        result = await rag.aquery(query, param=param)

        logger.info(f"Query completed, result length: {len(result)} characters")

        return {
            "status": "success",
            "query": query,
            "mode": mode,
            "result": result,
            "top_k": top_k,
        }

    except Exception as e:
        logger.error(f"Error querying LightRAG: {e}")
        return {
            "status": "error",
            "query": query,
            "mode": mode,
            "error": str(e),
        }


async def batch_query(
    rag: LightRAG,
    queries: List[str],
    mode: str = "hybrid",
    top_k: int = 10,
) -> List[Dict[str, Any]]:
    """
    Execute multiple queries in batch

    Args:
        rag: LightRAG instance
        queries: List of query strings
        mode: Query mode
        top_k: Number of results per query

    Returns:
        List of query results
    """
    results = []
    for query in queries:
        result = await query_lightrag(rag, query, mode, top_k)
        results.append(result)
    return results


def export_to_json(results: Dict[str, Any] | List[Dict[str, Any]], output_path: str):
    """
    Export query results to JSON file

    Args:
        results: Query results (single or list)
        output_path: Path to output JSON file
    """
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        logger.info(f"Results exported to: {output_path}")
        return True
    except Exception as e:
        logger.error(f"Error exporting to JSON: {e}")
        return False


async def run_query(
    working_dir: str,
    query: str = None,
    queries_file: str = None,
    mode: str = "hybrid",
    top_k: int = 10,
    output_file: str = None,
    llm_model: str = "gemini-2.0-flash-exp",
    embedding_model: str = "models/text-embedding-004",
):
    """
    Main query function

    Args:
        working_dir: LightRAG working directory
        query: Single query string
        queries_file: File containing multiple queries (one per line)
        mode: Query mode (local, global, hybrid, naive)
        top_k: Number of results
        output_file: Output JSON file path
        llm_model: Gemini LLM model
        embedding_model: Gemini embedding model
    """
    # Initialize LightRAG
    rag = await initialize_lightrag(working_dir, llm_model, embedding_model)
    if not rag:
        return {"status": "error", "message": "Failed to initialize LightRAG"}

    try:
        # Determine queries
        queries = []
        if query:
            queries = [query]
        elif queries_file:
            with open(queries_file, "r", encoding="utf-8") as f:
                queries = [line.strip() for line in f if line.strip()]
        else:
            logger.error("No query provided. Use --query or --queries_file")
            await rag.finalize_storages()
            return {"status": "error", "message": "No query provided"}

        # Execute queries
        if len(queries) == 1:
            results = await query_lightrag(rag, queries[0], mode, top_k)
        else:
            results = await batch_query(rag, queries, mode, top_k)

        # Export to JSON if output file specified
        if output_file:
            export_to_json(results, output_file)

        # Finalize
        await rag.finalize_storages()

        return results

    except Exception as e:
        logger.error(f"Error during query execution: {e}")
        await rag.finalize_storages()
        return {"status": "error", "message": str(e)}


def main():
    parser = argparse.ArgumentParser(
        description="Query LightRAG knowledge graph and export results to JSON",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--working_dir",
        default="./data/lightrag_storage",
        help="LightRAG working directory",
    )
    parser.add_argument(
        "--query",
        help="Query string (for single query)",
    )
    parser.add_argument(
        "--queries_file",
        help="File containing multiple queries (one per line)",
    )
    parser.add_argument(
        "--mode",
        default="hybrid",
        choices=["local", "global", "hybrid", "naive"],
        help="Query mode",
    )
    parser.add_argument(
        "--top_k",
        type=int,
        default=10,
        help="Number of results to return",
    )
    parser.add_argument(
        "--output_file",
        default="./data/lightrag_results.json",
        help="Output JSON file path",
    )
    parser.add_argument(
        "--llm_model",
        default="gemini-2.0-flash-exp",
        help="Gemini model for text generation",
    )
    parser.add_argument(
        "--embedding_model",
        default="models/text-embedding-004",
        help="Gemini model for embeddings",
    )

    args = parser.parse_args()

    # Run query
    results = asyncio.run(
        run_query(
            working_dir=args.working_dir,
            query=args.query,
            queries_file=args.queries_file,
            mode=args.mode,
            top_k=args.top_k,
            output_file=args.output_file,
            llm_model=args.llm_model,
            embedding_model=args.embedding_model,
        )
    )

    # Print results
    print("\n" + "=" * 80)
    print("QUERY RESULTS")
    print("=" * 80)
    if isinstance(results, list):
        for i, result in enumerate(results, 1):
            print(f"\n[Query {i}] {result.get('query', 'N/A')}")
            print(f"Status: {result.get('status', 'N/A')}")
            if result.get('status') == 'success':
                print(f"\n{result.get('result', 'No result')}\n")
            else:
                print(f"Error: {result.get('error', 'Unknown error')}\n")
    else:
        print(f"\nQuery: {results.get('query', 'N/A')}")
        print(f"Status: {results.get('status', 'N/A')}")
        if results.get('status') == 'success':
            print(f"\n{results.get('result', 'No result')}\n")
        else:
            print(f"Error: {results.get('error', 'Unknown error')}\n")
    print("=" * 80)


if __name__ == "__main__":
    main()
