"use client";

import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductImageGalleryProps {
  product: CatalogItem;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate initials for placeholder
  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sticky top-6 space-y-4"
    >
      {/* Main Product Image */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/60 border border-gray-200">
        {product.thumbnail ? (
          <>
            <Image
              src={`/${product.thumbnail}`}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              onLoad={() => setImageLoaded(true)}
              priority
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-4xl md:text-6xl font-bold text-gray-400">
              {getInitials(product.name)}
            </span>
          </div>
        )}

        {/* AR Compatible Badge */}
        {product.ar_compatible && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-black/80 text-white backdrop-blur-sm">
              AR Ready
            </Badge>
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute bottom-4 left-4">
          <Badge
            variant={product.in_stock ? "default" : "destructive"}
            className={product.in_stock ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
          >
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </div>

      {/* Model Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="p-4 sm:p-5 bg-white/80 border border-gray-200 rounded-2xl shadow-sm backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-900">3D Model Info</h4>
          <Badge variant="secondary" className="text-[11px] px-2 py-1 bg-gray-100 text-gray-700">
            GLB + USDZ
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700">
          <div>
            <span className="font-medium text-gray-900">Vertices</span>
            <br />
            {product.models.vertices.toLocaleString()}
          </div>
          <div>
            <span className="font-medium text-gray-900">Faces</span>
            <br />
            {product.models.faces.toLocaleString()}
          </div>
          <div>
            <span className="font-medium text-gray-900">GLB Size</span>
            <br />
            {product.models.glb_size_mb} MB
          </div>
          <div>
            <span className="font-medium text-gray-900">USDZ Size</span>
            <br />
            {product.models.usdz_size_mb} MB
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
