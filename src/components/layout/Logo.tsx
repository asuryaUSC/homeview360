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
      {/* Animated Logo Icon - Matching new design */}
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
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3f4f6" />
            </linearGradient>
          </defs>

          {/* Background Circle */}
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#logoGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          />

          {/* 360° Rings */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {/* Outer Ring */}
            <circle
              cx="20"
              cy="20"
              r="15"
              stroke="url(#iconGradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3 2"
              opacity="0.6"
            />

            {/* Middle Ring */}
            <circle
              cx="20"
              cy="20"
              r="12"
              stroke="url(#iconGradient)"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="2 1.5"
              opacity="0.4"
            />

            {/* Inner Ring */}
            <circle
              cx="20"
              cy="20"
              r="9"
              stroke="url(#iconGradient)"
              strokeWidth="0.6"
              fill="none"
              strokeDasharray="1.5 1"
              opacity="0.3"
            />
          </motion.g>

          {/* Central House Icon */}
          <motion.g
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            transform="translate(20, 20)"
          >
            {/* House Base */}
            <path
              d="M-4 2 L0 -2.5 L4 2 L4 5 L2.5 5 L2.5 2.5 L-2.5 2.5 L-2.5 5 L-4 5 Z"
              fill="url(#iconGradient)"
              stroke="none"
            />

            {/* Roof Detail */}
            <path
              d="M-4.5 2 L0 -3 L4.5 2 L4 2 L0 -2 L-4 2 Z"
              fill="url(#iconGradient)"
              opacity="0.8"
            />

            {/* Door */}
            <rect x="-1" y="2.5" width="2" height="2.5" fill="#374151" rx="0.2"/>

            {/* Windows */}
            <rect x="-3.2" y="1.2" width="1.5" height="1" fill="#374151" rx="0.1"/>
            <rect x="1.7" y="1.2" width="1.5" height="1" fill="#374151" rx="0.1"/>
          </motion.g>

          {/* 360° Positioning Dots */}
          <circle cx="20" cy="5" r="0.8" fill="url(#iconGradient)" opacity="0.8"/>
          <circle cx="35" cy="20" r="0.8" fill="url(#iconGradient)" opacity="0.8"/>
          <circle cx="20" cy="35" r="0.8" fill="url(#iconGradient)" opacity="0.8"/>
          <circle cx="5" cy="20" r="0.8" fill="url(#iconGradient)" opacity="0.8"/>

          {/* Diagonal Dots */}
          <circle cx="28" cy="12" r="0.5" fill="url(#iconGradient)" opacity="0.6"/>
          <circle cx="28" cy="28" r="0.5" fill="url(#iconGradient)" opacity="0.6"/>
          <circle cx="12" cy="28" r="0.5" fill="url(#iconGradient)" opacity="0.6"/>
          <circle cx="12" cy="12" r="0.5" fill="url(#iconGradient)" opacity="0.6"/>
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