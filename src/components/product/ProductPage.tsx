"use client";

import React from "react";
import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetails from "./ProductDetails";
import ProductDimensions from "./ProductDimensions";
import { usePWAMode } from "@/hooks/usePWAMode";
import ARButton from "./ar/ARButton";
import { useProductViewTracking } from "@/hooks/useTracking";
import { trackCategoryView, trackTagViews, trackPriceView } from "@/lib/tracking";
import { getCatalogItems } from "@/lib/catalogData";
import { getSimilarItems } from "@/lib/recommendations";
import CatalogCard from "@/components/catalog/CatalogCard";

interface ProductPageProps {
  product: CatalogItem;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { isPWA } = usePWAMode();

  // Track product view with time spent
  useProductViewTracking(product.id);

  // Load catalog once to derive personalized sections
  const allItems = React.useMemo(() => getCatalogItems(), []);

  // Pull similar items using the enhanced recommendation engine (diversity capped)
  const similarItems = React.useMemo(() => {
    return getSimilarItems(product, allItems, 6);
  }, [allItems, product]);

  // Track additional product attributes on mount
  React.useEffect(() => {
    if (product) {
      trackCategoryView(product.category);
      if (product.tags && product.tags.length > 0) {
        trackTagViews(product.tags);
      }
      trackPriceView(product.price);
    }
  }, [product]);

  return (
    <div className="min-h-screen relative">
      {!isPWA && <Navbar />}

      <main className={`container mx-auto px-3 sm:px-4 ${isPWA ? 'py-4 sm:py-6' : 'py-6 sm:py-8'}`}>
        {/* Breadcrumb */}
        <ProductBreadcrumb product={product} />

        {/* Product Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 sm:mt-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Product Image */}
            <div className="order-1">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Details */}
            <div className="order-2 lg:pt-8">
              <ProductDetails product={product} />

              {/* AR Button */}
              <div className="mt-8 sm:mt-10">
                <ARButton product={product} />
              </div>

              {/* Dimensions */}
              <div className="mt-8 sm:mt-10">
                <ProductDimensions product={product} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Similar Items */}
        {similarItems.length > 0 && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  You May Also Like
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Curated picks that pair well with this piece
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {similarItems.map((item, index) => (
                <CatalogCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
