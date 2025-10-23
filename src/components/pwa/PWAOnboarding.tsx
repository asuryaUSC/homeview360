"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Eye, Layers, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../layout/Logo";

interface OnboardingSlide {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

const slides: OnboardingSlide[] = [
  {
    icon: Eye,
    title: "Visualize in AR",
    description: "See furniture in your space before you buy. Use your phone's camera to place items in real-time.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Layers,
    title: "Create Smart Rooms",
    description: "Save and share your room designs. Collaborate with friends or designers to perfect your space.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Shop Multiple Brands",
    description: "Browse furniture from top brands all in one place. Compare styles, prices, and visualize instantly.",
    gradient: "from-pink-500 to-orange-500",
  },
];

interface PWAOnboardingProps {
  onComplete: () => void;
}

export default function PWAOnboarding({ onComplete }: PWAOnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <Logo size="sm" />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-gray-600 hover:text-gray-900"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-8 shadow-lg shadow-${slide.gradient.split(' ')[1].replace('to-', '')}/30`}
            >
              <Icon className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              {slide.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-12">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: currentSlide === index ? 32 : 8,
                backgroundColor: currentSlide === index ? "#1f2937" : "#d1d5db",
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          size="lg"
          className={`w-full bg-gradient-to-r ${slide.gradient} text-white hover:opacity-90 transition-opacity py-6 text-lg font-semibold shadow-lg`}
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
}
