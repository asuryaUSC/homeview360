"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import PWAInstallButton from "@/components/pwa/PWAInstallButton";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="h-screen relative overflow-hidden">
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] space-y-4 sm:space-y-6 md:space-y-8 text-center relative z-10 -mt-4 sm:-mt-6 md:-mt-8">

          {/* Simple Tagline */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg"
          >
            <span className="text-xs sm:text-sm font-medium text-gray-800">See Your Dream Furniture in Your Dream Home.</span>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl px-2"
          >
            {/* Main Headline with Gradient */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
                Visualize Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Dream Space
              </span>
            </motion.h1>

            {/* Simplified Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-base sm:text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Experience furniture in your home before you buy with HomeView360&apos;s immersive AR technology
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <PWAInstallButton />

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-black hover:bg-white hover:border-gray-400 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 0.6 }}
                />

                <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Use Web App
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Simplified footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-xs sm:text-sm text-gray-800 pt-2 sm:pt-4 font-medium"
          >
            Available for iOS, Android, and Web
          </motion.p>
        </div>
      </main>
    </div>
  );
}
