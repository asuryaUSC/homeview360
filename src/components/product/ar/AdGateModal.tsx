"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MOCK_ADS = [
  "/assets/ads/ad1.mp4",
  "/assets/ads/ad2.mp4",
  "/assets/ads/ad3.mp4",
  "/assets/ads/ad4.mp4",
];

interface AdGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function AdGateModal({
  isOpen,
  onClose,
  onContinue,
}: AdGateModalProps) {
  const adContainerId = "container-a2ac111dd358290b1b08c1f1b3e5cc19";
  const scriptLoadedRef = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackAd, setFallbackAd] = useState<string | null>(null);
  const [canSkip, setCanSkip] = useState(true);
  const [forceControls, setForceControls] = useState(false);
  const fallbackVideoRef = useRef<HTMLVideoElement | null>(null);

  const selectFallbackAd = () => {
    const pick = MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)];
    return typeof window !== "undefined" ? new URL(pick, window.location.origin).toString() : pick;
  };

  const getFallbackLink = (src: string) =>
    src.includes("ad4")
      ? "https://www.wayfair.com/"
      : "https://www.ikea.com/us/en/";

  const handleFallbackClick = () => {
    if (!fallbackAd) return;
    const href = getFallbackLink(fallbackAd);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let verifyTimer: ReturnType<typeof setTimeout> | undefined;

    if (isOpen && !scriptLoadedRef.current) {
      setAdLoaded(false);
      setShowFallback(false);
      setFallbackAd(null);
      setCanSkip(true);

      // Create and inject Adsterra script
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "//pl27901486.effectivegatecpm.com/a2ac111dd358290b1b08c1f1b3e5cc19/invoke.js";

      // Add load event listener
      script.onload = () => {
        setAdLoaded(true);

        // Give the ad a moment to render into the container; if empty, use fallback
        verifyTimer = setTimeout(() => {
          const container = document.getElementById(adContainerId);
          const hasAd = !!container && container.childElementCount > 0;
          if (!hasAd) {
            const randomAd = selectFallbackAd();
            setFallbackAd(randomAd);
            setShowFallback(true);
            setCanSkip(false);
          }
        }, 1000);
      };

      // Append to document body (Adsterra scripts work better in body)
      document.body.appendChild(script);
      scriptLoadedRef.current = true;

      // Check if ad loaded after a timeout
      fallbackTimer = setTimeout(() => {
        const container = document.getElementById(adContainerId);
        const hasAd = !!container && container.childElementCount > 0;

        if (hasAd) {
          setAdLoaded(true);
        } else {
          const randomAd = selectFallbackAd();
          setFallbackAd(randomAd);
          setShowFallback(true);
          setCanSkip(false);
          setAdLoaded(true);
        }
      }, 3000);

      // Cleanup function
      return () => {
        if (fallbackTimer) clearTimeout(fallbackTimer);
        if (verifyTimer) clearTimeout(verifyTimer);
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        scriptLoadedRef.current = false;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showFallback) return;

    setCanSkip(false);
    setForceControls(false);
    const timer = setTimeout(() => setCanSkip(true), 5000);
    return () => clearTimeout(timer);
  }, [showFallback]);

  useEffect(() => {
    if (showFallback && fallbackAd && fallbackVideoRef.current) {
      fallbackVideoRef.current.load();
      const playPromise = fallbackVideoRef.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => setForceControls(true));
      }
    }
  }, [showFallback, fallbackAd]);

  const handleContinue = () => {
    if (showFallback && !canSkip) return;
    onContinue();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl shadow-blue-100/60 p-6 sm:p-8 rounded-3xl"
        showCloseButton={false}
      >
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full p-1 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none z-10 bg-white hover:bg-gray-100"
        >
          <X className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Close</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-5 sm:space-y-6"
        >
          {/* Header */}
          <DialogHeader className="space-y-2 sm:space-y-3 pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/60 text-xs font-semibold text-blue-700 w-fit shadow-sm">
              Sponsored Message
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
              A quick message before your AR preview
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We’ll take you to your AR experience right after this short spot. Premium members skip ads.
            </DialogDescription>
          </DialogHeader>

          {/* Ad Container */}
          <div className="w-full space-y-3">
            <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200 shadow-inner flex items-center justify-center min-h-[100px] sm:min-h-[140px] md:min-h-[160px]">
              {/* Adsterra ad container - place directly without wrapper */}
              {!showFallback && (
                <div id={adContainerId} className="w-full" />
              )}

              {showFallback && fallbackAd && (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handleFallbackClick}
                  role="button"
                  tabIndex={0}
                >
                  <video
                    ref={fallbackVideoRef}
                    key={fallbackAd}
                    src={fallbackAd}
                    className="w-full h-full max-h-[320px] rounded-2xl object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onError={() => setFallbackAd(selectFallbackAd())}
                    controls={forceControls}
                    controlsList="nodownload"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-xs font-semibold text-gray-900 shadow">
                      Tap to shop
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-gray-900/80 text-xs font-semibold text-white shadow">
                      {fallbackAd.includes("ad4") ? "Wayfair" : "IKEA"}
                    </span>
                  </div>
                </div>
              )}

              {/* Loading placeholder - hide when ad or fallback loads */}
              {!adLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-gray-400 text-sm animate-pulse">
                    Loading advertisement...
                  </div>
                </div>
              )}
            </div>

            {/* Info text */}
            <p className="text-xs text-center text-gray-500">
              Advertisement
            </p>
          </div>

          {/* Continue Button */}
          <div className="flex flex-col gap-3 pt-1 sm:pt-2">
            <Button
              onClick={handleContinue}
              size="lg"
              disabled={showFallback && !canSkip}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] py-5 sm:py-6 text-base"
            >
              {showFallback && !canSkip ? "Please wait..." : "Continue to AR Experience"}
            </Button>

            <p className="text-xs sm:text-sm text-center text-gray-500">
              Or{" "}
              <button
                onClick={onClose}
                className="text-gray-700 hover:text-black font-medium underline underline-offset-2 transition-colors"
              >
                go back to product
              </button>
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
