/**
 * Premium Status Utility
 *
 * This module provides functions to check if a user has premium access.
 * Currently returns false for all users (everyone sees ads).
 *
 * TODO: Once Clerk authentication and payment integration is complete,
 * update this function to check actual user subscription status.
 *
 * Future implementation should:
 * 1. Import user data from Clerk
 * 2. Check subscription tier (Free, Premium, Pro)
 * 3. Return true for Premium/Pro users, false for Free users
 */

/**
 * Checks if the current user has premium access.
 *
 * @returns {boolean} True if user is premium (no ads), false otherwise
 *
 * Current behavior: Always returns false (all users see ads)
 *
 * Future implementation example:
 * ```typescript
 * import { useUser } from '@clerk/nextjs';
 *
 * export function isPremiumUser(): boolean {
 *   const { user } = useUser();
 *   if (!user) return false;
 *
 *   const subscriptionTier = user.publicMetadata?.subscriptionTier;
 *   return subscriptionTier === 'premium' || subscriptionTier === 'pro';
 * }
 * ```
 */
export function isPremiumUser(): boolean {
  // TODO: Replace with actual Clerk user subscription check
  // For now, all users are non-premium (see ads)
  return false;
}

/**
 * Hook version for use in React components.
 * Can be expanded to include loading states and real-time subscription updates.
 *
 * @returns {boolean} True if user is premium
 */
export function usePremiumStatus(): boolean {
  // TODO: Add useUser() from Clerk when authentication is implemented
  // TODO: Add loading state handling
  return isPremiumUser();
}
