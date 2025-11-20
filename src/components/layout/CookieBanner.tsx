"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("homeview360_cookie_consent");

    if (!consent) {
      // Show banner after a brief delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("homeview360_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("homeview360_cookie_consent", "declined");
    setIsVisible(false);
  };

  const handleClose = () => {
    // Treat close as declined
    handleDecline();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50"
        >
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl shadow-gray-900/5 overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400/60 via-purple-400/60 to-pink-400/60" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>

            <div className="p-5 sm:p-6">
              {/* Icon and Title */}
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-white/20">
                  <Cookie className="w-5 h-5 text-purple-700" />
                </div>
                <div className="flex-1 pr-6">
                  <h3 className="text-base font-semibold text-gray-950 mb-1 drop-shadow-sm">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-gray-800 leading-relaxed drop-shadow-sm">
                    We use cookies to enhance your browsing experience, provide personalized recommendations, and analyze site traffic.
                  </p>
                </div>
              </div>

              {/* Cookie Policy Link */}
              <Link
                href="/cookies"
                className="text-xs text-purple-800 hover:text-purple-900 font-semibold inline-flex items-center gap-1 mb-4 drop-shadow-sm"
              >
                View our cookie policy
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-200 border border-white/10"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="flex-1 bg-white/40 backdrop-blur-sm border-white/50 hover:bg-white/50 text-gray-900 font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-sm"
                >
                  Decline
                </Button>
              </div>
            </div>

            {/* Bottom subtle glow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
