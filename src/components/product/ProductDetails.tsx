"use client";

import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsProps {
  product: CatalogItem;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Category Badge */}
      <motion.div variants={itemVariants}>
        <Badge variant="outline" className="text-xs px-3 py-1">
          {product.category}
        </Badge>
      </motion.div>

      {/* Product Name */}
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
      >
        {product.name}
      </motion.h1>

      {/* Price */}
      <motion.div variants={itemVariants} className="flex items-baseline space-x-2">
        <span className="text-3xl sm:text-4xl font-bold text-gray-900">
          ${product.price}
        </span>
        <span className="text-lg text-gray-600">USD</span>
      </motion.div>

      {/* SKU */}
      <motion.div variants={itemVariants} className="text-sm text-gray-600">
        <span className="font-medium">SKU:</span> {product.sku}
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants} className="prose prose-gray max-w-none">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </motion.div>

      {/* Key Features - Clean Apple Style */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-900 font-medium">Expert craftsmanship</span>
            <span className="text-gray-500">•</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-900 font-medium">Ships within 2-3 days</span>
            <span className="text-gray-500">•</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-900 font-medium">2-year warranty included</span>
            <span className="text-gray-500">•</span>
          </div>
          {product.ar_compatible && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-900 font-medium">Augmented reality preview</span>
              <span className="text-blue-600 text-sm font-medium">AR</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 8).map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {product.tags.length > 8 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{product.tags.length - 8} more
            </Badge>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}