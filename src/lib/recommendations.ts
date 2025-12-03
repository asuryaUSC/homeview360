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
  getViewedProductIds,
  StorageManager,
  getSearchKeywords,
  getRecencyWeightedCategories,
  getRecencyWeightedTags,
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

/**
 * Diversity filter interface
 */
interface ScoredItem {
  item: CatalogItem;
  score: number;
}

/**
 * Apply diversity filter to ensure varied recommendations
 */
function applyDiversityFilter(
  scoredItems: ScoredItem[],
  limit: number,
  maxPerCategory: number
): CatalogItem[] {
  const selected: CatalogItem[] = [];
  const categoryCounts = new Map<string, number>();

  for (const { item } of scoredItems) {
    const category = item.category;
    const currentCount = categoryCounts.get(category) || 0;

    // Check if adding this item would violate diversity constraint
    if (currentCount < maxPerCategory) {
      selected.push(item);
      categoryCounts.set(category, currentCount + 1);

      // Stop when we have enough items
      if (selected.length >= limit) {
        break;
      }
    }
  }

  return selected;
}

/**
 * Calculate search relevance boost
 */
function calculateSearchRelevanceScore(item: CatalogItem): number {
  const searchData = getSearchKeywords(20);

  if (searchData.totalSearches === 0) return 0;

  let score = 0;
  const { keywords, totalSearches } = searchData;

  // Check if item tags match search keywords
  if (item.tags) {
    item.tags.forEach(tag => {
      const tagLower = tag.toLowerCase();
      if (keywords[tagLower]) {
        score += (keywords[tagLower] / totalSearches) * 0.5;
      }
    });
  }

  // Check if category matches search keywords
  const categoryLower = item.category.toLowerCase();
  if (keywords[categoryLower]) {
    score += (keywords[categoryLower] / totalSearches) * 0.5;
  }

  // Cap at maximum contribution (13% of total score)
  return Math.min(score, 0.13);
}

/**
 * Calculate engagement boost based on time spent patterns
 */
function calculateEngagementBoost(item: CatalogItem): number {
  const data = StorageManager.getData();

  // Calculate average time spent on viewed products
  const viewsWithTime = data.productViews.filter(v => v.timeSpent && v.timeSpent > 10);

  if (viewsWithTime.length === 0) return 0;

  // Calculate global average time spent
  const avgTime = viewsWithTime.reduce((sum, v) => sum + (v.timeSpent || 0), 0) / viewsWithTime.length;

  // Get engagement multiplier for average time
  let multiplier = 1.0;
  if (avgTime < 30) multiplier = 1.02;
  else if (avgTime < 60) multiplier = 1.05;
  else if (avgTime < 120) multiplier = 1.08;
  else multiplier = 1.12;

  // Apply boost to matching categories/tags
  let boost = 0;

  // Boost if item matches highly-engaged categories
  const topCategories = getTopCategories(3);
  if (topCategories.includes(item.category)) {
    boost += 0.06 * (multiplier - 1.0) / 0.12; // Scale to 0-0.06
  }

  // Boost if item matches highly-engaged tags
  const topTags = getTopTags(15);
  if (item.tags) {
    const matchingTags = item.tags.filter(tag =>
      topTags.some(topTag => topTag.toLowerCase() === tag.toLowerCase())
    );
    if (matchingTags.length > 0) {
      boost += 0.06 * (multiplier - 1.0) / 0.12; // Scale to 0-0.06
    }
  }

  // Cap at maximum contribution (12% of total score)
  return Math.min(boost, 0.12);
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
 * Enhanced with recency weighting, engagement, and search relevance
 */
function getPersonalizedScore(item: CatalogItem): number {
  let score = 0;

  // Use recency-weighted preferences
  const topCategories = getRecencyWeightedCategories(3);
  const topTags = getRecencyWeightedTags(15);
  const priceRange = getAveragePriceRange();

  // Filter out generic tags for meaningful matching
  const filteredUserTags = filterGenericTags(topTags);
  const filteredItemTags = item.tags ? filterGenericTags(item.tags) : [];

  // Category/Type matching (weight: 0.25 - adjusted from 0.45)
  if (topCategories.includes(item.category)) {
    const categoryRank = topCategories.indexOf(item.category);
    score += (3 - categoryRank) * 0.08; // 0.24 for #1, 0.16 for #2, 0.08 for #3
  }

  // Style Tag similarity (weight: 0.20 - adjusted from 0.30)
  if (filteredItemTags.length > 0 && filteredUserTags.length > 0) {
    const matchingTags = filteredItemTags.filter(tag =>
      filteredUserTags.some(userTag => userTag.toLowerCase() === tag.toLowerCase())
    );

    if (matchingTags.length >= 2) {
      const tagScore = matchingTags.length / Math.max(filteredItemTags.length, filteredUserTags.length, 1);
      score += tagScore * 0.20;
    }
  }

  // Price similarity (weight: 0.15 - adjusted from 0.20)
  if (priceRange) {
    const priceDiff = Math.abs(item.price - priceRange.avg);
    const priceRange_spread = Math.max(priceRange.max - priceRange.min, 100);
    const priceSimilarity = Math.max(0, 1 - (priceDiff / priceRange_spread));
    score += priceSimilarity * 0.15;
  }

  // NEW: Engagement boost (weight: 0.12)
  score += calculateEngagementBoost(item);

  // NEW: Search relevance (weight: 0.13)
  score += calculateSearchRelevanceScore(item);

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
 * Now with diversity filtering
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

      return { item, score: similarityScore };
    })
    .sort((a, b) => b.score - a.score);

  // Apply diversity filter: max 3 items per category
  return applyDiversityFilter(scoredItems, limit, 3);
}

/**
 * Check if an item should be marked as "Recommended for you"
 */
export function isRecommendedForUser(item: CatalogItem): boolean {
  if (isNewUser()) return false;

  const data = StorageManager.getData();
  // Require at least 3 product views before showing recommendations
  if (data.productViews.length < 3) return false;

  // Don't recommend items the user already viewed
  if (hasViewedProduct(item.id)) return false;

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
 * Now with diversity filtering
 */
export function getTopRecommendations(
  items: CatalogItem[],
  limit: number = 5
): CatalogItem[] {
  if (isNewUser()) return [];

  const data = StorageManager.getData();
  if (data.productViews.length < 1) return [];

  const viewedIds = new Set(getViewedProductIds());

  // Score all items up front
  const scoredAll = items.map(item => ({
    item,
    score: calculateRecommendationScore(item)
  })).sort((a, b) => b.score - a.score);

  // Primary: items that clear recommendation threshold and aren't viewed
  const primary = scoredAll.filter(({ item, score }) =>
    !viewedIds.has(item.id) && score > 0.6 && isRecommendedForUser(item)
  );

  // Sort by score
  // Apply diversity filter: max 2 items per category in top 5
  const topPrimary = applyDiversityFilter(primary, Math.min(limit, 5), 2);

  if (topPrimary.length > 0) return topPrimary;

  // Fallback: top scored non-viewed items even if below threshold
  const fallbackCandidates = scoredAll.filter(({ item }) => !viewedIds.has(item.id));
  return applyDiversityFilter(fallbackCandidates, Math.min(limit, 5), 2);
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
