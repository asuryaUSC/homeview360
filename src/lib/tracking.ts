/**
 * Tracking utilities for user interactions and preferences
 * Uses cookies for session data and localStorage for detailed interaction history
 */

// Types
export interface ProductView {
  productId: string;
  timestamp: number;
  timeSpent?: number; // in seconds
}

export interface SearchQuery {
  query: string;
  timestamp: number;
  resultsCount: number;
}

export interface UserInteraction {
  productViews: ProductView[];
  searchQueries: SearchQuery[];
  categoryPreferences: Record<string, number>; // category -> view count
  tagPreferences: Record<string, number>; // tag -> view count
  priceRangeViews: number[]; // array of prices viewed
}

// Constants
const DATA_RETENTION_DAYS = 90;
const COOKIE_NAME = 'homeview360_session';
const STORAGE_KEY = 'homeview360_tracking';

// Recency decay weights
const RECENCY_WEIGHTS = {
  WEEK_1: 1.0,    // 0-7 days
  WEEK_4: 0.8,    // 8-30 days
  WEEK_8: 0.5,    // 31-60 days
  WEEK_12: 0.3,   // 61-90 days
};

// Engagement multipliers based on time spent
const ENGAGEMENT_MULTIPLIERS = {
  BRIEF: 1.05,      // 10-30s
  MODERATE: 1.10,   // 30-60s
  STRONG: 1.15,     // 60-120s
  VERY_STRONG: 1.20 // 120s+
};

// Stop words for search keyword extraction
const STOP_WORDS = ['the', 'a', 'an', 'for', 'with', 'in', 'on', 'at', 'to', 'from'];

/**
 * Cookie management utilities
 */
export const CookieManager = {
  /**
   * Set a cookie with optional expiry
   */
  set(name: string, value: string, days: number = 365): void {
    if (typeof window === 'undefined') return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  },

  /**
   * Get a cookie value
   */
  get(name: string): string | null {
    if (typeof window === 'undefined') return null;

    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  },

  /**
   * Delete a cookie
   */
  delete(name: string): void {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

/**
 * Initialize or get user session ID
 */
export function getOrCreateSessionId(): string {
  let sessionId = CookieManager.get(COOKIE_NAME);

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    CookieManager.set(COOKIE_NAME, sessionId, 365);
  }

  return sessionId;
}

/**
 * localStorage management utilities
 */
export const StorageManager = {
  /**
   * Get tracking data from localStorage
   */
  getData(): UserInteraction {
    if (typeof window === 'undefined') {
      return this.getEmptyData();
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return this.getEmptyData();

      const parsed = JSON.parse(stored);

      // Validate and clean old data
      return this.cleanOldData(parsed);
    } catch (error) {
      console.warn('Failed to parse tracking data, resetting:', error);
      return this.getEmptyData();
    }
  },

  /**
   * Save tracking data to localStorage
   */
  setData(data: UserInteraction): void {
    if (typeof window === 'undefined') return;

    try {
      const cleaned = this.cleanOldData(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    } catch (error) {
      console.error('Failed to save tracking data:', error);
    }
  },

  /**
   * Get empty tracking data structure
   */
  getEmptyData(): UserInteraction {
    return {
      productViews: [],
      searchQueries: [],
      categoryPreferences: {},
      tagPreferences: {},
      priceRangeViews: []
    };
  },

  /**
   * Remove data older than retention period
   */
  cleanOldData(data: UserInteraction): UserInteraction {
    const cutoffTime = Date.now() - (DATA_RETENTION_DAYS * 24 * 60 * 60 * 1000);

    return {
      productViews: data.productViews?.filter(v => v.timestamp > cutoffTime) || [],
      searchQueries: data.searchQueries?.filter(q => q.timestamp > cutoffTime) || [],
      categoryPreferences: data.categoryPreferences || {},
      tagPreferences: data.tagPreferences || {},
      priceRangeViews: data.priceRangeViews || []
    };
  },

  /**
   * Clear all tracking data
   */
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};

/**
 * Calculate recency weight for a timestamp
 */
function calculateRecencyWeight(timestamp: number): number {
  const ageMs = Date.now() - timestamp;
  const ageDays = ageMs / (1000 * 60 * 60 * 24);

  if (ageDays <= 7) return RECENCY_WEIGHTS.WEEK_1;
  if (ageDays <= 30) return RECENCY_WEIGHTS.WEEK_4;
  if (ageDays <= 60) return RECENCY_WEIGHTS.WEEK_8;
  if (ageDays <= 90) return RECENCY_WEIGHTS.WEEK_12;
  return 0;
}

/**
 * Calculate engagement multiplier based on time spent
 */
function getEngagementMultiplier(timeSpent: number): number {
  if (timeSpent < 10) return 1.0;
  if (timeSpent < 30) return ENGAGEMENT_MULTIPLIERS.BRIEF;
  if (timeSpent < 60) return ENGAGEMENT_MULTIPLIERS.MODERATE;
  if (timeSpent < 120) return ENGAGEMENT_MULTIPLIERS.STRONG;
  return ENGAGEMENT_MULTIPLIERS.VERY_STRONG;
}

/**
 * Track a product view
 */
export function trackProductView(productId: string, timeSpent?: number): void {
  const data = StorageManager.getData();

  // Add new view
  data.productViews.push({
    productId,
    timestamp: Date.now(),
    timeSpent
  });

  // Keep only last 100 views for performance
  if (data.productViews.length > 100) {
    data.productViews = data.productViews.slice(-100);
  }

  StorageManager.setData(data);
}

/**
 * Track a search query
 */
export function trackSearchQuery(query: string, resultsCount: number): void {
  if (!query.trim()) return;

  const data = StorageManager.getData();

  // Add new search
  data.searchQueries.push({
    query: query.toLowerCase(),
    timestamp: Date.now(),
    resultsCount
  });

  // Keep only last 50 searches for performance
  if (data.searchQueries.length > 50) {
    data.searchQueries = data.searchQueries.slice(-50);
  }

  StorageManager.setData(data);
}

/**
 * Track category preference
 */
export function trackCategoryView(category: string): void {
  const data = StorageManager.getData();

  data.categoryPreferences[category] = (data.categoryPreferences[category] || 0) + 1;

  StorageManager.setData(data);
}

/**
 * Track tag preferences
 */
export function trackTagViews(tags: string[]): void {
  const data = StorageManager.getData();

  tags.forEach(tag => {
    data.tagPreferences[tag] = (data.tagPreferences[tag] || 0) + 1;
  });

  StorageManager.setData(data);
}

/**
 * Track price range view
 */
export function trackPriceView(price: number): void {
  const data = StorageManager.getData();

  data.priceRangeViews.push(price);

  // Keep only last 50 price views
  if (data.priceRangeViews.length > 50) {
    data.priceRangeViews = data.priceRangeViews.slice(-50);
  }

  StorageManager.setData(data);
}

/**
 * Get user's viewed product IDs
 */
export function getViewedProductIds(): string[] {
  const data = StorageManager.getData();
  return [...new Set(data.productViews.map(v => v.productId))];
}

/**
 * Check if user has viewed a product before
 */
export function hasViewedProduct(productId: string): boolean {
  const data = StorageManager.getData();
  return data.productViews.some(v => v.productId === productId);
}

/**
 * Get user's top categories by view count
 */
export function getTopCategories(limit: number = 3): string[] {
  const data = StorageManager.getData();

  return Object.entries(data.categoryPreferences)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([category]) => category);
}

/**
 * Get user's top tags by view count
 */
export function getTopTags(limit: number = 10): string[] {
  const data = StorageManager.getData();

  return Object.entries(data.tagPreferences)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
}

/**
 * Get user's average price range
 */
export function getAveragePriceRange(): { min: number; max: number; avg: number } | null {
  const data = StorageManager.getData();

  if (data.priceRangeViews.length === 0) return null;

  const prices = data.priceRangeViews;
  const sum = prices.reduce((acc, p) => acc + p, 0);
  const avg = sum / prices.length;
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return { min, max, avg };
}

/**
 * Check if user is new (no interaction history)
 */
export function isNewUser(): boolean {
  const data = StorageManager.getData();
  return data.productViews.length === 0 && data.searchQueries.length === 0;
}

/**
 * Get interaction count for analytics
 */
export function getInteractionCount(): number {
  const data = StorageManager.getData();
  return data.productViews.length + data.searchQueries.length;
}

/**
 * Extract keywords from recent search queries
 */
export function getSearchKeywords(limit: number = 20): {
  keywords: Record<string, number>;
  totalSearches: number;
} {
  const data = StorageManager.getData();
  const keywords: Record<string, number> = {};

  // Get recent searches
  const recentSearches = data.searchQueries.slice(-limit);

  recentSearches.forEach(search => {
    const words = search.query
      .toLowerCase()
      .split(/[\s,\-_]+/)
      .filter(word => word.length > 2 && !STOP_WORDS.includes(word));

    words.forEach(word => {
      keywords[word] = (keywords[word] || 0) + 1;
    });
  });

  return {
    keywords,
    totalSearches: recentSearches.length
  };
}

/**
 * Get top categories weighted by recency
 */
export function getRecencyWeightedCategories(limit: number = 3): string[] {
  const data = StorageManager.getData();

  // For MVP: use existing category preferences with global recency adjustment
  // Calculate average timestamp of all product views
  const avgTimestamp = data.productViews.length > 0
    ? data.productViews.reduce((sum, v) => sum + v.timestamp, 0) / data.productViews.length
    : Date.now();

  const globalRecency = calculateRecencyWeight(avgTimestamp);

  return Object.entries(data.categoryPreferences)
    .map(([cat, count]) => ({ cat, weighted: count * globalRecency }))
    .sort((a, b) => b.weighted - a.weighted)
    .slice(0, limit)
    .map(x => x.cat);
}

/**
 * Get top tags weighted by recency
 */
export function getRecencyWeightedTags(limit: number = 15): string[] {
  const data = StorageManager.getData();

  // Similar to categories - use global recency for MVP
  const avgTimestamp = data.productViews.length > 0
    ? data.productViews.reduce((sum, v) => sum + v.timestamp, 0) / data.productViews.length
    : Date.now();

  const globalRecency = calculateRecencyWeight(avgTimestamp);

  return Object.entries(data.tagPreferences)
    .map(([tag, count]) => ({ tag, weighted: count * globalRecency }))
    .sort((a, b) => b.weighted - a.weighted)
    .slice(0, limit)
    .map(x => x.tag);
}

/**
 * Get average time spent per category/tag for engagement weighting
 * Returns global engagement stats that can be used as multipliers
 */
export function getEngagementStats(): {
  avgTimeSpent: number;
  engagementMultiplier: number;
} {
  const data = StorageManager.getData();

  // Calculate average time spent (for products that have timeSpent tracked)
  const viewsWithTime = data.productViews.filter(v => v.timeSpent && v.timeSpent > 0);

  if (viewsWithTime.length === 0) {
    return {
      avgTimeSpent: 0,
      engagementMultiplier: 1.0
    };
  }

  // Calculate global average time spent
  const totalTime = viewsWithTime.reduce((sum, v) => sum + (v.timeSpent || 0), 0);
  const avgTime = totalTime / viewsWithTime.length;

  // Get engagement multiplier for average time
  const multiplier = getEngagementMultiplier(avgTime);

  return {
    avgTimeSpent: avgTime,
    engagementMultiplier: multiplier
  };
}
