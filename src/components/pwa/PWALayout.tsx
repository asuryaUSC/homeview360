"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { usePWAMode } from "@/hooks/usePWAMode";
import PWAOnboarding from "./PWAOnboarding";
import PWAAuthScreen from "./PWAAuthScreen";
import PWAHome from "./PWAHome";
import BottomTabBar from "./BottomTabBar";

interface PWALayoutProps {
  children: ReactNode;
}

export default function PWALayout({ children }: PWALayoutProps) {
  const { isPWA, isLoading: isPWALoading } = usePWAMode();
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  // Check if user has seen onboarding
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("pwa-onboarded");
      setHasSeenOnboarding(seen === "true");
      setIsCheckingOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pwa-onboarded", "true");
      setHasSeenOnboarding(true);
    }
  };

  // Don't render anything during loading to prevent flash
  if (isPWALoading || !isLoaded || isCheckingOnboarding) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">{children}</div>;
  }

  // Regular web experience
  if (!isPWA) {
    return <div className="min-h-screen">{children}</div>;
  }

  // PWA Experience
  // 1. Show onboarding if first time
  if (!hasSeenOnboarding) {
    return <PWAOnboarding onComplete={handleOnboardingComplete} />;
  }

  // 2. Show auth screen if not signed in
  if (!isSignedIn) {
    return <PWAAuthScreen />;
  }

  // 3. Show PWA home on root path
  if (pathname === "/") {
    return (
      <>
        <PWAHome />
        <BottomTabBar />
      </>
    );
  }

  // 4. Show regular content with bottom tab bar
  return (
    <>
      <div className="min-h-screen pb-20">{children}</div>
      <BottomTabBar />
    </>
  );
}