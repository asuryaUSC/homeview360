"use client";

import { motion } from "framer-motion";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Logo from "../layout/Logo";

export default function PWAAuthScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-between p-6 pb-12">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-16"
      >
        <Logo size="lg" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            HomeView360
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Visualize furniture in your space with AR. Create, save, and share your dream rooms.
        </p>
      </motion.div>

      {/* Auth Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-full max-w-sm space-y-3"
      >
        <SignUpButton mode="modal">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity py-6 text-lg font-semibold shadow-lg"
          >
            Create Account
          </Button>
        </SignUpButton>

        <SignInButton mode="modal">
          <Button
            size="lg"
            variant="outline"
            className="w-full bg-white/60 backdrop-blur-md border-white/60 hover:bg-white/80 py-6 text-lg font-semibold"
          >
            Sign In
          </Button>
        </SignInButton>

        <p className="text-xs text-center text-gray-500 pt-2">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
