/**
 * RAG (Retrieval Augmented Generation) utilities for portfolio AI agent
 * Handles FAISS index loading and semantic search
 */

import fs from 'fs';
import path from 'path';

/**
 * Simple FAISS index loader for Node.js
 * Note: This is a simplified implementation. For production, consider using native bindings
 */
class PortfolioRAG {
  constructor() {
    this.metadata = null;
    this.indexLoaded = false;
    this.baseDir = path.join(process.cwd(), 'ai-agent', 'data', 'faiss_index');
  }

  /**
   * Load metadata from the FAISS index
   */
  async loadMetadata() {
    try {
      const metadataPath = path.join(this.baseDir, 'portfolio_metadata.json');

      if (!fs.existsSync(metadataPath)) {
        console.warn('Portfolio metadata not found. Please run the ingestion script first.');
        return false;
      }

      const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
      this.metadata = JSON.parse(metadataContent);
      this.indexLoaded = true;

      console.log(`Loaded ${this.metadata.length} chunks from metadata`);
      return true;
    } catch (error) {
      console.error('Error loading metadata:', error);
      return false;
    }
  }

  /**
   * Simple keyword-based search as fallback
   * In production, this should use proper vector similarity search
   */
  async search(query, topK = 5) {
    if (!this.indexLoaded) {
      await this.loadMetadata();
    }

    if (!this.metadata || this.metadata.length === 0) {
      return [];
    }

    // Simple keyword matching for now
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

// Singleton instance
let ragInstance = null;

export function getRAGInstance() {
  if (!ragInstance) {
    ragInstance = new PortfolioRAG();
  }
  return ragInstance;
}
