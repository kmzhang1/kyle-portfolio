/**
 * RAG (Retrieval Augmented Generation) utilities for portfolio AI agent
 * Supports both FAISS (legacy) and LightRAG backends
 */

import fs from 'fs';
import path from 'path';

/**
 * Portfolio RAG with support for multiple backends
 * - FAISS: Simple vector similarity search (legacy)
 * - LightRAG: Knowledge graph-based retrieval (recommended)
 */
class PortfolioRAG {
  constructor(backend = 'lightrag') {
    this.backend = backend; // 'faiss' or 'lightrag'
    this.metadata = null;
    this.lightragResults = null;
    this.indexLoaded = false;
    this.baseDir = path.join(process.cwd(), 'ai-agent', 'data');
  }

  /**
   * Load metadata from the FAISS index (legacy backend)
   */
  async loadFAISSMetadata() {
    try {
      const metadataPath = path.join(this.baseDir, 'faiss_index', 'portfolio_metadata.json');

      if (!fs.existsSync(metadataPath)) {
        console.warn('FAISS metadata not found. Please run ingest_portfolio_rag.py first.');
        return false;
      }

      const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
      this.metadata = JSON.parse(metadataContent);
      this.indexLoaded = true;

      console.log(`Loaded ${this.metadata.length} chunks from FAISS metadata`);
      return true;
    } catch (error) {
      console.error('Error loading FAISS metadata:', error);
      return false;
    }
  }

  /**
   * Load LightRAG results (from pre-computed queries)
   */
  async loadLightRAGResults() {
    try {
      const resultsPath = path.join(this.baseDir, 'lightrag_results.json');

      if (!fs.existsSync(resultsPath)) {
        console.warn('LightRAG results not found. Using on-demand querying.');
        this.indexLoaded = true;
        return true; // Still return true, we'll query on-demand
      }

      const resultsContent = fs.readFileSync(resultsPath, 'utf-8');
      this.lightragResults = JSON.parse(resultsContent);
      this.indexLoaded = true;

      console.log('Loaded LightRAG results');
      return true;
    } catch (error) {
      console.error('Error loading LightRAG results:', error);
      return false;
    }
  }

  /**
   * Load metadata based on selected backend
   */
  async loadMetadata() {
    if (this.backend === 'lightrag') {
      return await this.loadLightRAGResults();
    } else {
      return await this.loadFAISSMetadata();
    }
  }

  /**
   * Search using FAISS backend (keyword-based fallback)
   */
  async searchFAISS(query, topK = 5) {
    if (!this.metadata || this.metadata.length === 0) {
      return [];
    }

    // Simple keyword matching
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(/\s+/);

    // Score each chunk based on keyword matches
    const scoredChunks = this.metadata.map((chunk) => {
      const textLower = chunk.text.toLowerCase();
      let score = 0;

      // Count keyword matches
      keywords.forEach((keyword) => {
        if (textLower.includes(keyword)) {
          score += 1;
        }
      });

      // Boost score for category tags
      if (queryLower.includes('project') && textLower.includes('[PROJECT]')) {
        score += 2;
      }
      if (queryLower.includes('experience') && textLower.includes('[EXPERIENCE]')) {
        score += 2;
      }
      if (queryLower.includes('skill') && textLower.includes('[SKILLS]')) {
        score += 2;
      }
      if (queryLower.includes('education') && textLower.includes('[EDUCATION]')) {
        score += 2;
      }

      return {
        ...chunk,
        score,
      };
    });

    // Sort by score and return top K
    const topChunks = scoredChunks
      .filter((chunk) => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return topChunks;
  }

  /**
   * Search using LightRAG backend
   * Note: For server-side rendering, we use pre-computed results
   * For dynamic querying, you'd need to call the Python script via child_process
   */
  async searchLightRAG(query, topK = 5) {
    // If we have pre-computed results, return them
    if (this.lightragResults) {
      // Check if results is a single query result or array
      if (Array.isArray(this.lightragResults)) {
        // Find matching query
        const match = this.lightragResults.find(
          (r) => r.query && r.query.toLowerCase().includes(query.toLowerCase())
        );
        if (match && match.status === 'success') {
          return [{ text: match.result, score: 1.0, source: 'lightrag' }];
        }
      } else if (this.lightragResults.status === 'success') {
        return [{ text: this.lightragResults.result, score: 1.0, source: 'lightrag' }];
      }
    }

    // If no pre-computed results, return empty (would need to spawn Python process)
    console.warn(
      'LightRAG: No pre-computed results found. ' +
      'Run query_lightrag.py with your query to generate results.'
    );
    return [];
  }

  /**
   * Search based on selected backend
   */
  async search(query, topK = 5) {
    if (!this.indexLoaded) {
      await this.loadMetadata();
    }

    if (this.backend === 'lightrag') {
      return await this.searchLightRAG(query, topK);
    } else {
      return await this.searchFAISS(query, topK);
    }
  }

  /**
   * Get context for RAG
   */
  async getContext(query, topK = 5) {
    const results = await this.search(query, topK);

    if (results.length === 0) {
      return 'No relevant information found in the portfolio.';
    }

    // Combine the text from top results
    const context = results
      .map((result, idx) => `[${idx + 1}] ${result.text}`)
      .join('\n\n');

    return context;
  }
}

// Singleton instances
let ragInstanceFAISS = null;
let ragInstanceLightRAG = null;

/**
 * Get RAG instance with specified backend
 * @param {string} backend - 'faiss' or 'lightrag' (default: 'lightrag')
 * @returns {PortfolioRAG}
 */
export function getRAGInstance(backend = 'lightrag') {
  if (backend === 'lightrag') {
    if (!ragInstanceLightRAG) {
      ragInstanceLightRAG = new PortfolioRAG('lightrag');
    }
    return ragInstanceLightRAG;
  } else {
    if (!ragInstanceFAISS) {
      ragInstanceFAISS = new PortfolioRAG('faiss');
    }
    return ragInstanceFAISS;
  }
}
