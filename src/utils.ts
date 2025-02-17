import { marked } from "marked";
import { sanitize } from "dompurify";

/**
 * Computes the cosine similarity between two vectors.
 * @param vecA First vector.
 * @param vecB Second vector.
 * @returns Cosine similarity score.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  return dotProduct / (magnitudeA * magnitudeB);
}

export function convertMarkdownToHtml(markdown: string): string {
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const html = marked(markdown).toString();
  return sanitize(html);
}
