"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Animated Logo Icon */}
      <motion.div
        whileHover={{ rotate: 5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`${sizeClasses[size]} relative`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circle with Gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3f4f6" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#logoGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          />

          {/* 360° Icon Elements */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {/* Outer Ring */}
            <circle
              cx="20"
              cy="20"
              r="12"
              stroke="url(#iconGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="2 2"
            />

            {/* Inner House Shape */}
            <path
              d="M12 22 L20 15 L28 22 L28 27 L24 27 L24 23 L16 23 L16 27 L12 27 Z"
              fill="url(#iconGradient)"
            />

            {/* 360° Dots */}
            <circle cx="20" cy="8" r="1" fill="url(#iconGradient)" />
            <circle cx="32" cy="20" r="1" fill="url(#iconGradient)" />
            <circle cx="20" cy="32" r="1" fill="url(#iconGradient)" />
            <circle cx="8" cy="20" r="1" fill="url(#iconGradient)" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Brand Text */}
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col"
      >
        <span className={`${textSizes[size]} font-bold text-black leading-none tracking-tight`}>
          HomeView
        </span>
        <span className="text-xs font-medium text-gray-500 leading-none tracking-wider">
          360°
        </span>
      </motion.div>
    </div>
  );
}