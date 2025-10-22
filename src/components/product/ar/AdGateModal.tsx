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
  const scriptLoadedRef = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !scriptLoadedRef.current) {
      // Create and inject Adsterra script
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "//pl27901486.effectivegatecpm.com/a2ac111dd358290b1b08c1f1b3e5cc19/invoke.js";

      // Add load event listener
      script.onload = () => {
        setAdLoaded(true);
      };

      // Append to document body (Adsterra scripts work better in body)
      document.body.appendChild(script);
      scriptLoadedRef.current = true;

      // Check if ad loaded after a timeout
      const timeout = setTimeout(() => {
        setAdLoaded(true);
      }, 3000);

      // Cleanup function
      return () => {
        clearTimeout(timeout);
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        scriptLoadedRef.current = false;
      };
    }
  }, [isOpen]);

  const handleContinue = () => {
    onContinue();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full bg-white border-gray-200 shadow-2xl p-6 sm:p-8"
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
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
              Just a moment before your AR experience
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Support HomeView 360 by viewing this brief message. Premium users enjoy ad-free AR access.
            </DialogDescription>
          </DialogHeader>

          {/* Ad Container */}
          <div className="w-full space-y-3">
            <div className="w-full relative overflow-hidden rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px]">
              {/* Adsterra ad container - place directly without wrapper */}
              <div
                id="container-a2ac111dd358290b1b08c1f1b3e5cc19"
                className="w-full"
              />
              {/* Loading placeholder - hide when ad loads */}
              {!adLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
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
              className="w-full bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] py-5 sm:py-6 text-base"
            >
              Continue to AR Experience
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
