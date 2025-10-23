"use client";

import { useUser } from '@clerk/nextjs';

/**
 * Premium Status Utility
 *
 * This module provides functions to check if a user has premium access
 * based on their subscription tier stored in Clerk's publicMetadata.
 *
 * Subscription tiers:
 * - 'free': Default tier, sees ads, limited features
 * - 'premium': $5.99/month, no ads, unlimited features
 * - 'pro': $14.99/month, professional tools, no ads
 */

export type SubscriptionTier = 'free' | 'premium' | 'pro';

/**
 * Hook to check if the current user has premium access (Premium or Pro tier).
 *
 * @returns {object} Object containing premium status and loading state
 */
export function usePremiumStatus(): {
  isPremium: boolean;
  isLoading: boolean;
  tier: SubscriptionTier;
} {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return { isPremium: false, isLoading: true, tier: 'free' };
  }

  if (!user) {
    return { isPremium: false, isLoading: false, tier: 'free' };
  }

  // Get subscription tier from user's public metadata
  // This should be set when user subscribes via payment integration
  const tier = (user.publicMetadata?.subscriptionTier as SubscriptionTier) || 'free';
  const isPremium = tier === 'premium' || tier === 'pro';

  return { isPremium, isLoading: false, tier };
}

/**
 * Helper function to check if a specific tier is premium or higher.
 *
 * @param tier - The subscription tier to check
 * @returns True if tier is premium or pro
 */
export function isPremiumTier(tier: SubscriptionTier): boolean {
  return tier === 'premium' || tier === 'pro';
}
