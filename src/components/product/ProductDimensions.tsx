"use client";

import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

interface ProductDimensionsProps {
  product: CatalogItem;
}

export default function ProductDimensions({ product }: ProductDimensionsProps) {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // Convert meters to feet and inches
  const metersToFeetInches = (meters: number) => {
    const totalInches = meters * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  // Convert meters to centimeters
  const metersToCentimeters = (meters: number) => {
    return Math.round(meters * 100);
  };

  const formatDimension = (meters: number) => {
    if (unit === "metric") {
      return `${metersToCentimeters(meters)} cm`;
    } else {
      const { feet, inches } = metersToFeetInches(meters);
      return feet > 0 ? `${feet}'${inches}"` : `${inches}"`;
    }
  };

  const { width, height, depth } = product.dimensions;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Ruler className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Dimensions</h3>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            variant={unit === "metric" ? "default" : "ghost"}
            size="sm"
            onClick={() => setUnit("metric")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              unit === "metric"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Metric
          </Button>
          <Button
            variant={unit === "imperial" ? "default" : "ghost"}
            size="sm"
            onClick={() => setUnit("imperial")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              unit === "imperial"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Imperial
          </Button>
        </div>
      </div>

      {/* Dimensions Table */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatDimension(width)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Width</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatDimension(height)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Height</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatDimension(depth)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Depth</div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="mt-6 flex justify-center">
          <div className="relative">
            {/* 3D Box Representation */}
            <div className="relative w-24 h-16">
              {/* Front face */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-400 rounded-sm"
                style={{
                  transform: "perspective(100px) rotateX(5deg) rotateY(-5deg)",
                  transformOrigin: "center center"
                }}
              />
              {/* Top face */}
              <div
                className="absolute w-24 h-4 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-400 rounded-sm"
                style={{
                  transform: "perspective(100px) rotateX(60deg) translateY(-8px)",
                  transformOrigin: "center bottom"
                }}
              />
              {/* Right face */}
              <div
                className="absolute w-4 h-16 bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-400 rounded-sm"
                style={{
                  transform: "perspective(100px) rotateY(60deg) translateX(20px)",
                  transformOrigin: "left center"
                }}
              />
            </div>
          </div>
        </div>

        {/* Dimension Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            All measurements are approximate and may vary slightly
          </p>
        </div>
      </div>
    </motion.div>
  );
}