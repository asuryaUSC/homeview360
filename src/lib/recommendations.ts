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
  getViewedProductIds,
  hasViewedProduct
} from './tracking';

// Global popularity data (will be calculated from all items)
interface PopularityData {
  viewCounts: Record<string, number>;
  mostPopular: string[];
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
  let factors = 0;

  const topCategories = getTopCategories(3);
  const topTags = getTopTags(10);
  const priceRange = getAveragePriceRange();
  const viewedIds = getViewedProductIds();

  // Category preference (weight: 0.3)
  if (topCategories.includes(item.category)) {
    const categoryRank = topCategories.indexOf(item.category);
    score += (3 - categoryRank) * 0.1; // 0.3 for #1, 0.2 for #2, 0.1 for #3
    factors++;
  }

  // Tag similarity (weight: 0.4)
  if (item.tags && item.tags.length > 0) {
    const matchingTags = item.tags.filter(tag =>
      topTags.some(userTag => userTag.toLowerCase() === tag.toLowerCase())
    );
    const tagScore = matchingTags.length / Math.min(item.tags.length, topTags.length);
    score += tagScore * 0.4;
    factors++;
  }

  // Price similarity (weight: 0.2)
  if (priceRange) {
    const priceDiff = Math.abs(item.price - priceRange.avg);
    const priceRange_spread = priceRange.max - priceRange.min || 100;
    const priceSimilarity = Math.max(0, 1 - (priceDiff / priceRange_spread));
    score += priceSimilarity * 0.2;
    factors++;
  }

  // Type preference (weight: 0.1)
  // Future enhancement: boost items of same type as viewed items
  if (viewedIds.length > 0) {
    score += 0.05;
  }

  // Normalize score
  return factors > 0 ? score : 0;
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

  const score = calculateRecommendationScore(item);
  // Consider it recommended if score > 0.5
  return score > 0.5;
}

/**
 * Get reason why item is recommended
 */
export function getRecommendationReason(item: CatalogItem): string | null {
  if (isNewUser()) return null;

  const topCategories = getTopCategories(1);
  const topTags = getTopTags(5);

  // Category match
  if (topCategories.includes(item.category)) {
    return `Based on your interest in ${item.category.toLowerCase()}`;
  }

  // Tag match
  if (item.tags) {
    const matchingTags = item.tags.filter(tag =>
      topTags.some(userTag => userTag.toLowerCase() === tag.toLowerCase())
    );
    if (matchingTags.length > 0) {
      return `Matches your style: ${matchingTags.slice(0, 2).join(', ')}`;
    }
  }

  // Previously viewed
  if (hasViewedProduct(item.id)) {
    return 'You viewed this before';
  }

  return null;
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
