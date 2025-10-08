"use client";

import { useState, useEffect } from "react";

export function usePWAMode() {
  const [isPWA, setIsPWA] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPWAMode = () => {
      // Check if running in standalone mode
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        // @ts-expect-error - iOS specific property
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');

      setIsPWA(isStandalone);
      setIsLoading(false);
    };

    // Initial check
    checkPWAMode();

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPWA(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return { isPWA, isLoading };
}