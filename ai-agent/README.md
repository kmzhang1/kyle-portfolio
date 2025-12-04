# Portfolio RAG Ingestion with LightRAG and ByteDance Dolphin

This directory contains the RAG (Retrieval Augmented Generation) ingestion pipeline for the portfolio chatbot, featuring both traditional FAISS-based retrieval and advanced knowledge graph-based retrieval with LightRAG.

## Features

### Common Features
- **Multi-format document support**: Markdown, text, Word documents (.docx), and PDFs
- **Advanced PDF parsing**: Uses ByteDance Dolphin-1.5 for accurate document image parsing
- **Semantic tagging**: Automatically categorizes content (projects, experience, skills, education)
- **GitHub repository ingestion**: Extract and index code from GitHub repositories

### FAISS Backend (Legacy)
- **Vector search**: FAISS index for fast similarity search
- **Embedding generation**: Sentence transformers for text embeddings

### LightRAG Backend (Recommended)
- **Knowledge graph extraction**: Automatically builds entity-relationship graphs from documents
- **Dual-level retrieval**: Combines local (entity/relation) and global (graph-based) search
- **Multiple query modes**: local, global, hybrid, naive, and mix modes
- **Powered by Gemini**: Uses Google's Gemini models for LLM and embeddings
  - LLM: `gemini-2.0-flash-exp`
  - Embeddings: `text-embedding-004`

## Setup

### 1. Install Dependencies

```bash
# Using uv (recommended)
uv sync

# Or using pip
pip install -e .
```

### 2. Configure API Keys

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add:
```bash
# Required for LightRAG
GOOGLE_API_KEY=your_google_api_key_here

# Optional for GitHub ingestion
GITHUB_TOKEN=your_github_token_here
```

Get your Google API key from: https://aistudio.google.com/app/apikey

### 3. Download Dolphin Model (Optional, for PDF processing)

Download the Dolphin-1.5 model (if you plan to process PDFs):

```bash
huggingface-cli download ByteDance/Dolphin-1.5 --local-dir ./hf_model
```

**Note:** The Dolphin repository is NOT required. The `dolphin_parser.py` module is self-contained.

### 4. Prepare Your Documents

Place your documents in the `data/documents/` directory:

```
data/documents/
├── resume.pdf
├── project1/
│   └── README.md
├── experience.docx
└── skills.txt
```

## Usage

### Option 1: LightRAG (Recommended)

#### Step 1: Ingest Documents

```bash
# Basic ingestion
python ingest_lightrag.py

# With custom options
python ingest_lightrag.py \
  --source_dir ./data/documents \
  --output_dir ./data/lightrag_storage \
  --llm_model gemini-2.0-flash-exp \
  --embedding_model models/text-embedding-004
```

**Arguments:**
- `--source_dir`: Directory containing source documents (default: `./data/documents`)
- `--output_dir`: Directory to save LightRAG knowledge graph (default: `./data/lightrag_storage`)
- `--llm_model`: Gemini model for text generation (default: `gemini-2.0-flash-exp`)
- `--embedding_model`: Gemini model for embeddings (default: `models/text-embedding-004`)
- `--enable-github`: Enable GitHub repository ingestion
- `--github_repos`: List of GitHub repositories to ingest (e.g., `owner/repo`)
- `--github_user`: GitHub username to fetch all public repositories from

#### Step 2: Query the Knowledge Graph

```bash
# Single query
python query_lightrag.py \
  --query "What projects has this person worked on?" \
  --mode hybrid \
  --output_file ./data/lightrag_results.json

# Multiple queries from file
python query_lightrag.py \
  --queries_file ./queries.txt \
  --mode hybrid \
  --output_file ./data/lightrag_results.json
```

**Query Modes:**
- `local`: Entity/relation-focused retrieval (fast, precise)
- `global`: Graph-based retrieval (comprehensive)
- `hybrid`: Combination of local and global (recommended)
- `naive`: Simple text chunk retrieval

**Arguments:**
- `--working_dir`: LightRAG storage directory (default: `./data/lightrag_storage`)
- `--query`: Single query string
- `--queries_file`: File with multiple queries (one per line)
- `--mode`: Query mode (default: `hybrid`)
- `--top_k`: Number of results (default: `10`)
- `--output_file`: Output JSON file (default: `./data/lightrag_results.json`)

### Option 2: FAISS (Legacy)

```bash
# Basic ingestion
python ingest_portfolio_rag.py

# With custom options
python ingest_portfolio_rag.py \
  --source_dir ./data/documents \
  --output_dir ./data/faiss_index \
  --embedding_model sentence-transformers/all-MiniLM-L6-v2
```

**Arguments:**
- `--source_dir`: Directory containing source documents (default: `./data/documents`)
- `--output_dir`: Directory to save FAISS index and metadata (default: `./data/faiss_index`)
- `--embedding_model`: Sentence transformer model (default: `sentence-transformers/all-MiniLM-L6-v2`)

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

### LightRAG Output

The ingestion process creates a knowledge graph in the output directory:

```
data/lightrag_storage/
├── graph_chunk_entity_relation.graphml  # Knowledge graph structure
├── kv_store_*.json                       # Key-value stores for entities/relations
└── ... (other LightRAG storage files)
```

Query results are exported to JSON:
```json
{
  "status": "success",
  "query": "What projects has this person worked on?",
  "mode": "hybrid",
  "result": "Based on the knowledge graph, this person has worked on...",
  "top_k": 10
}
```

### FAISS Output

The ingestion process creates:

1. **FAISS Index** (`portfolio_index.faiss`): Vector index for similarity search
2. **Metadata** (`portfolio_metadata.json`): Document chunks with metadata

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

### LightRAG Architecture

```
Documents → Dolphin Parser → Combined Text → LightRAG
                                                ↓
                                          Gemini LLM (Entity/Relation Extraction)
                                                ↓
                                          Knowledge Graph → Query Engine
                                                ↓
                                          Gemini Embeddings
```

### FAISS Architecture (Legacy)

```
Document → Dolphin Parser → Text Chunks → Semantic Tags → Embeddings → FAISS Index
                                                                      ↓
                                                                  Metadata JSON
```

## Integration with Next.js Frontend

The [lib/rag.js](../lib/rag.js) module supports both backends:

```javascript
import { getRAGInstance } from '@/lib/rag';

// Use LightRAG (recommended)
const rag = getRAGInstance('lightrag');

// Or use FAISS (legacy)
const rag = getRAGInstance('faiss');

// Search for relevant context
const results = await rag.search('What projects has this person worked on?');
const context = await rag.getContext('What projects has this person worked on?');
```

**Note:** For LightRAG, pre-compute queries using `query_lightrag.py` and export to JSON. The JavaScript module reads from `data/lightrag_results.json`.

## About the Technologies

### LightRAG

LightRAG is a knowledge graph-based RAG system that:
- Extracts entities and relationships from documents using LLMs
- Builds a graph database for efficient retrieval
- Supports multiple query strategies (local, global, hybrid)
- Provides better context understanding than traditional vector search

Published at EMNLP 2025. [GitHub](https://github.com/HKUDS/LightRAG)

### ByteDance Dolphin

Dolphin is a lightweight (0.3B parameters) multimodal document image parsing model that uses a two-stage analyze-then-parse paradigm:

1. **Stage 1**: Comprehensive layout analysis generating element sequences in natural reading order
2. **Stage 2**: Efficient parsing of individual document elements using heterogeneous anchor prompting

This approach provides superior accuracy compared to traditional PDF text extraction methods.

### Google Gemini

LightRAG uses Google's Gemini models:
- **gemini-2.0-flash-exp**: Fast, efficient LLM for entity/relation extraction
- **text-embedding-004**: High-quality embeddings (768 dimensions) for semantic search

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
