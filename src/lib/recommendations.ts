/**
 * Recommendation scoring engine
 * Implements hybrid approach: popularity for new users, personalized for returning users
 */

import { CatalogItem } from '@/types/catalog';
import {
  isNewUser,
  getTopCategories,
  getTopTags,
  getAveragePriceRange,
  hasViewedProduct,
  StorageManager
} from './tracking';

// Global popularity data (will be calculated from all items)
interface PopularityData {
  viewCounts: Record<string, number>;
  mostPopular: string[];
}

// Generic tags to exclude from matching (appear on most items)
const GENERIC_TAGS = [
  '3d model',
  'ar ready',
  'designer',
  'premium',
  'quality',
  'durable',
  'versatile',
  'stylish'
];

// Filter out generic tags for better matching
function filterGenericTags(tags: string[]): string[] {
  return tags.filter(tag =>
    !GENERIC_TAGS.includes(tag.toLowerCase())
  );
}

// In-memory popularity tracking (could be moved to backend later)
let globalPopularity: PopularityData = {
  viewCounts: {},
  mostPopular: []
};

/**
 * Update global popularity when a product is viewed
 */
export function updatePopularity(productId: string): void {
  if (!globalPopularity.viewCounts[productId]) {
    globalPopularity.viewCounts[productId] = 0;
  }
  globalPopularity.viewCounts[productId]++;

  // Recalculate most popular
  globalPopularity.mostPopular = Object.entries(globalPopularity.viewCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([id]) => id);
}

/**
 * Get popularity score for a product (0-1)
 */
function getPopularityScore(productId: string): number {
  const viewCount = globalPopularity.viewCounts[productId] || 0;
  const maxViews = Math.max(...Object.values(globalPopularity.viewCounts), 1);

  return viewCount / maxViews;
}

/**
 * Calculate personalized score based on user preferences
 */
function getPersonalizedScore(item: CatalogItem): number {
  let score = 0;

  const topCategories = getTopCategories(3);
  const topTags = getTopTags(15);
  const priceRange = getAveragePriceRange();
  const data = StorageManager.getData();

  // Filter out generic tags for meaningful matching
  const filteredUserTags = filterGenericTags(topTags);
  const filteredItemTags = item.tags ? filterGenericTags(item.tags) : [];

  // STRONG Category/Type matching (weight: 0.5 - INCREASED)
  // If user views chairs, strongly recommend more chairs
  if (topCategories.includes(item.category)) {
    const categoryRank = topCategories.indexOf(item.category);
    score += (3 - categoryRank) * 0.15; // 0.45 for #1, 0.30 for #2, 0.15 for #3
  }

  // Same type bonus (seating, tables, lighting, etc.)
  // Get types from viewed items
  if (data.productViews.length > 0) {
    // We'll use a simple heuristic: if item.type matches user's most viewed type
    // For now, give bonus if same category was viewed (proxy for type)
    if (topCategories.includes(item.category)) {
      score += 0.15; // Extra boost for same category
    }
  }

  // Style Tag similarity (weight: 0.3)
  // Require at least 2 matching style tags (not generic tags)
  if (filteredItemTags.length > 0 && filteredUserTags.length > 0) {
    const matchingTags = filteredItemTags.filter(tag =>
      filteredUserTags.some(userTag => userTag.toLowerCase() === tag.toLowerCase())
    );

    if (matchingTags.length >= 2) {
      // At least 2 style matches required
      const tagScore = matchingTags.length / Math.max(filteredItemTags.length, filteredUserTags.length, 1);
      score += tagScore * 0.3;
    }
  }

  // Price similarity (weight: 0.2)
  if (priceRange) {
    const priceDiff = Math.abs(item.price - priceRange.avg);
    const priceRange_spread = Math.max(priceRange.max - priceRange.min, 100);
    const priceSimilarity = Math.max(0, 1 - (priceDiff / priceRange_spread));
    score += priceSimilarity * 0.2;
  }

  return score;
}

/**
 * Calculate hybrid recommendation score
 */
export function calculateRecommendationScore(item: CatalogItem): number {
  const isNew = isNewUser();

  if (isNew) {
    // For new users, use popularity only
    return getPopularityScore(item.id);
  } else {
    // For returning users, blend personalized and popularity
    const personalizedScore = getPersonalizedScore(item);
    const popularityScore = getPopularityScore(item.id);

    // 70% personalized, 30% popularity
    return personalizedScore * 0.7 + popularityScore * 0.3;
  }
}

/**
 * Sort items by recommendation score
 */
export function sortByRecommendation(items: CatalogItem[]): CatalogItem[] {
  return [...items].sort((a, b) => {
    const scoreA = calculateRecommendationScore(a);
    const scoreB = calculateRecommendationScore(b);
    return scoreB - scoreA;
  });
}

/**
 * Boost search results with recommendation scores
 */
export function boostSearchResults(
  items: CatalogItem[],
  searchQuery: string
): CatalogItem[] {
  // Calculate relevance + recommendation combined score
  const scoredItems = items.map(item => {
    // Text relevance score (0-1)
    let relevanceScore = 0;
    const query = searchQuery.toLowerCase();

    // Name match is most important
    if (item.name.toLowerCase().includes(query)) {
      relevanceScore += 0.5;
      // Exact match gets bonus
      if (item.name.toLowerCase() === query) {
        relevanceScore += 0.3;
      }
    }

    // Category match
    if (item.category.toLowerCase().includes(query)) {
      relevanceScore += 0.2;
    }

    // Tag match
    if (item.tags?.some(tag => tag.toLowerCase().includes(query))) {
      relevanceScore += 0.2;
    }

    // SKU match
    if (item.sku.toLowerCase().includes(query)) {
      relevanceScore += 0.1;
    }

    // Description match (less weight)
    if (item.description?.toLowerCase().includes(query)) {
      relevanceScore += 0.05;
    }

    // Recommendation score (0-1)
    const recommendationScore = calculateRecommendationScore(item);

    // Combined score: 60% relevance, 40% recommendation
    const combinedScore = relevanceScore * 0.6 + recommendationScore * 0.4;

    return {
      item,
      relevanceScore,
      recommendationScore,
      combinedScore
    };
  });

  // Sort by combined score
  scoredItems.sort((a, b) => b.combinedScore - a.combinedScore);

  return scoredItems.map(s => s.item);
}

/**
 * Get recommended items for catalog page
 */
export function getRecommendedItems(
  items: CatalogItem[],
  limit: number = 12
): CatalogItem[] {
  const sorted = sortByRecommendation(items);
  return sorted.slice(0, limit);
}

/**
 * Get "similar items" based on a reference item
 */
export function getSimilarItems(
  referenceItem: CatalogItem,
  allItems: CatalogItem[],
  limit: number = 6
): CatalogItem[] {
  const scoredItems = allItems
    .filter(item => item.id !== referenceItem.id) // Exclude the reference item
    .map(item => {
      let similarityScore = 0;

      // Same category (high weight)
      if (item.category === referenceItem.category) {
        similarityScore += 0.4;
      }

      // Same type
      if (item.type === referenceItem.type) {
        similarityScore += 0.2;
      }

      // Tag overlap
      if (referenceItem.tags && item.tags) {
        const commonTags = referenceItem.tags.filter(tag =>
          item.tags?.includes(tag)
        );
        const tagSimilarity = commonTags.length /
          Math.max(referenceItem.tags.length, item.tags.length);
        similarityScore += tagSimilarity * 0.3;
      }

      // Price similarity (within 50%)
      const priceDiff = Math.abs(item.price - referenceItem.price);
      const priceRatio = priceDiff / referenceItem.price;
      if (priceRatio < 0.5) {
        similarityScore += (0.5 - priceRatio) * 0.1;
      }

      return { item, similarityScore };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);

  return scoredItems.map(s => s.item);
}

/**
 * Check if an item should be marked as "Recommended for you"
 */
export function isRecommendedForUser(item: CatalogItem): boolean {
  if (isNewUser()) return false;

  const data = StorageManager.getData();
  // Require at least 3 product views before showing recommendations
  if (data.productViews.length < 3) return false;

  const score = calculateRecommendationScore(item);
  // Stricter threshold: only truly good matches
  return score > 0.6;
}

/**
 * Get reason why item is recommended
 */
export function getRecommendationReason(item: CatalogItem): string | null {
  // Previously viewed gets its own badge (not "For you")
  if (hasViewedProduct(item.id)) {
    return null; // Handle separately with "Previously Viewed"
  }

  // CRITICAL: Check if actually recommended first
  if (!isRecommendedForUser(item)) {
    return null;
  }

  const topCategories = getTopCategories(1);
  const topTags = getTopTags(15);
  const filteredUserTags = filterGenericTags(topTags);
  const filteredItemTags = item.tags ? filterGenericTags(item.tags) : [];

  // Category match (strongest signal)
  if (topCategories.includes(item.category)) {
    return `Similar to your ${item.category.toLowerCase()} views`;
  }

  // Style tag match (require 2+ matches with non-generic tags)
  if (filteredItemTags.length > 0) {
    const matchingTags = filteredItemTags.filter(tag =>
      filteredUserTags.some(userTag => userTag.toLowerCase() === tag.toLowerCase())
    );
    if (matchingTags.length >= 2) {
      return `Matches your style: ${matchingTags.slice(0, 2).join(', ')}`;
    }
  }

  return null;
}

/**
 * Get top N recommended items (limited to 4-5 max)
 */
export function getTopRecommendations(
  items: CatalogItem[],
  limit: number = 5
): CatalogItem[] {
  if (isNewUser()) return [];

  const data = StorageManager.getData();
  if (data.productViews.length < 3) return [];

  // Filter to only recommended items
  const recommended = items.filter(item => isRecommendedForUser(item));

  // Sort by score
  const scored = recommended.map(item => ({
    item,
    score: calculateRecommendationScore(item)
  }));

  scored.sort((a, b) => b.score - a.score);

  // Return top N (max 5)
  return scored.slice(0, Math.min(limit, 5)).map(s => s.item);
}

/**
 * Get recently viewed items
 */
export function getRecentlyViewed(
  allItems: CatalogItem[],
  limit: number = 8
): CatalogItem[] {
  const data = StorageManager.getData();

  if (data.productViews.length === 0) return [];

  // Get unique product IDs in reverse order (most recent first)
  const viewedIds = [...data.productViews]
    .reverse()
    .map(v => v.productId)
    .filter((id, index, self) => self.indexOf(id) === index) // Unique only
    .slice(0, limit);

  // Map IDs to items
  const viewedItems = viewedIds
    .map(id => allItems.find(item => item.id === id))
    .filter((item): item is CatalogItem => item !== undefined);

  return viewedItems;
}

/**
 * Initialize recommendation system
 */
export function initializeRecommendations(): void {
  // Initialize session tracking
  if (typeof window !== 'undefined') {
    // Load any cached popularity data from localStorage
    try {
      const cached = localStorage.getItem('homeview360_popularity');
      if (cached) {
        globalPopularity = JSON.parse(cached);
      }
    } catch (error) {
      console.warn('Failed to load popularity data:', error);
    }

    // Save popularity data periodically
    setInterval(() => {
      try {
        localStorage.setItem('homeview360_popularity', JSON.stringify(globalPopularity));
      } catch (error) {
        console.warn('Failed to save popularity data:', error);
      }
    }, 60000); // Every minute
  }
}
