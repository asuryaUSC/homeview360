/**
 * React hook for tracking user interactions
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  trackProductView,
  trackSearchQuery,
  trackCategoryView,
  trackTagViews,
  trackPriceView,
  getOrCreateSessionId,
  hasViewedProduct
} from '@/lib/tracking';
import { updatePopularity } from '@/lib/recommendations';
import { CatalogItem } from '@/types/catalog';

/**
 * Hook for tracking product views with time spent
 */
export function useProductViewTracking(productId: string | null) {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!productId) return;

    // Initialize session
    getOrCreateSessionId();

    // Record start time
    startTimeRef.current = Date.now();

    // Track the view immediately
    trackProductView(productId);
    updatePopularity(productId);

    // Cleanup: track time spent when component unmounts
    return () => {
      if (startTimeRef.current) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (timeSpent > 0) {
          trackProductView(productId, timeSpent);
        }
      }
    };
  }, [productId]);
}

/**
 * Hook for tracking search queries
 */
export function useSearchTracking() {
  const lastQueryRef = useRef<string>('');

  const trackSearch = useCallback((query: string, resultsCount: number) => {
    // Avoid tracking duplicate consecutive searches
    if (query && query !== lastQueryRef.current) {
      trackSearchQuery(query, resultsCount);
      lastQueryRef.current = query;
    }
  }, []);

  return { trackSearch };
}

/**
 * Hook for tracking product interactions (clicks, views)
 */
export function useProductInteractionTracking() {
  const trackProductClick = useCallback((item: CatalogItem) => {
    // Initialize session
    getOrCreateSessionId();

    // Track the product view
    trackProductView(item.id);
    updatePopularity(item.id);

    // Track category preference
    if (item.category) {
      trackCategoryView(item.category);
    }

    // Track tag preferences
    if (item.tags && item.tags.length > 0) {
      trackTagViews(item.tags);
    }

    // Track price range
    if (item.price) {
      trackPriceView(item.price);
    }
  }, []);

  const checkIfViewed = useCallback((productId: string): boolean => {
    return hasViewedProduct(productId);
  }, []);

  return {
    trackProductClick,
    checkIfViewed
  };
}

/**
 * Hook to initialize tracking on app load
 */
export function useInitializeTracking() {
  useEffect(() => {
    // Initialize session
    getOrCreateSessionId();

    // Initialize recommendations system
    import('@/lib/recommendations').then(({ initializeRecommendations }) => {
      initializeRecommendations();
    });
  }, []);
}

/**
 * Hook for tracking category browsing
 */
export function useCategoryTracking() {
  const trackCategory = useCallback((category: string) => {
    if (category && category !== 'All') {
      trackCategoryView(category);
    }
  }, []);

  return { trackCategory };
}
