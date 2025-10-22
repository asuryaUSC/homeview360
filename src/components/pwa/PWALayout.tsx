"use client";

import { ReactNode } from "react";
import { usePWAMode } from "@/hooks/usePWAMode";
import FloatingSearchButton from "./FloatingSearchButton";

interface PWALayoutProps {
  children: ReactNode;
}

export default function PWALayout({ children }: PWALayoutProps) {
  const { isPWA, isLoading } = usePWAMode();

  // Don't render anything during loading to prevent flash
  if (isLoading) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen">
      {children}

      {/* Only show floating search button in PWA mode */}
      {isPWA && <FloatingSearchButton />}
    </div>
  );
}