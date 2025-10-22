"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Preload critical assets
    const preloadAssets = async () => {
      // Preload fonts are already handled by Next.js font optimization
      // Add any critical image preloading here if needed

      // Wait for minimum splash duration (1.5s)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Fade out
      setIsVisible(false);

      // Wait for fade-out animation to complete
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    preloadAssets();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        >
          {/* Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2
            }}
            className="relative"
          >
            {/* Logo */}
            <div className="relative w-32 h-32 mb-6">
              <Image
                src="/logo.svg"
                alt="HomeView 360"
                width={128}
                height={128}
                priority
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* App Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.5
            }}
            className="text-3xl font-bold text-white mb-2 tracking-tight"
          >
            HomeView 360
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.7
            }}
            className="text-gray-400 text-sm tracking-wide"
          >
            Bring your space to life
          </motion.p>

          {/* Loading Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 1
            }}
            className="mt-12"
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.15,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
