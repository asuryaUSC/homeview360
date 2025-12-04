"use client";

import React from "react";
import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Shield, Truck } from "lucide-react";

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
      <motion.div variants={itemVariants} className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs px-3 py-1">
          {product.category}
        </Badge>
        <Badge variant="secondary" className="text-xs px-3 py-1 bg-gray-100 text-gray-700">
          {product.sku}
        </Badge>
        {product.in_stock ? (
          <Badge className="text-xs px-3 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            In Stock
          </Badge>
        ) : (
          <Badge variant="destructive" className="text-xs px-3 py-1">
            Out of Stock
          </Badge>
        )}
      </motion.div>

      {/* Product Name */}
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
      >
        {product.name}
      </motion.h1>

      {/* Price */}
      <motion.div variants={itemVariants} className="flex items-baseline space-x-3">
        <span className="text-3xl sm:text-4xl font-bold text-gray-900">
          ${product.price}
        </span>
        <span className="text-lg text-gray-600">USD</span>
      </motion.div>

      {/* Quick info */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm"
      >
        <div className="rounded-xl border border-gray-200 bg-white/70 p-3 shadow-sm">
          <div className="text-gray-500 font-medium">Category</div>
          <div className="text-gray-900 font-semibold mt-1">{product.category}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white/70 p-3 shadow-sm">
          <div className="text-gray-500 font-medium">AR Ready</div>
          <div className="text-gray-900 font-semibold mt-1">
            {product.ar_compatible ? "Yes" : "Not available"}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white/70 p-3 shadow-sm">
          <div className="text-gray-500 font-medium">Dimensions</div>
          <div className="text-gray-900 font-semibold mt-1">
            {product.dimensions.width}m × {product.dimensions.depth}m
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white/70 p-3 shadow-sm">
          <div className="text-gray-500 font-medium">Shipping</div>
          <div className="text-gray-900 font-semibold mt-1">2–3 days</div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants} className="prose prose-gray max-w-none">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </motion.div>

      {/* Key Features - Clean Apple Style */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Highlights
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FeatureRow icon={<Check className="h-4 w-4 text-emerald-600" />} label="Expert craftsmanship" />
            <FeatureRow icon={<Truck className="h-4 w-4 text-blue-600" />} label="Ships within 2–3 days" />
            <FeatureRow icon={<Shield className="h-4 w-4 text-gray-700" />} label="2-year warranty included" />
            {product.ar_compatible && (
              <FeatureRow icon={<Clock className="h-4 w-4 text-indigo-600" />} label="AR preview ready" />
            )}
          </div>
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

function FeatureRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/60 border border-gray-100 px-3 py-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </div>
  );
}
