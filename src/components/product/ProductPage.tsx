"use client";

import React from "react";
import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
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
  const shellPadding = isPWA ? "py-4 sm:py-6" : "py-6 sm:py-10";

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

      <main className={`container mx-auto px-3 sm:px-4 ${shellPadding}`}>
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6">
          <ProductBreadcrumb product={product} />
        </div>

        {/* Product Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 sm:mt-4"
        >
          <div className="rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-xl shadow-gray-200/50 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
              {/* Product Image */}
              <div className="order-1">
                <ProductImageGallery product={product} />
              </div>

              {/* Product Details */}
              <div className="order-2 lg:pt-4 xl:pt-6 space-y-8">
                <ProductDetails product={product} />

                {/* AR Button */}
                <div className="pt-2">
                  <ARButton product={product} />
                </div>

                {/* Dimensions */}
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
            <div className="mb-5 sm:mb-8 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-50 border border-blue-200 text-xs font-semibold text-blue-700 w-fit shadow-sm">
                <Compass className="w-4 h-4" />
                Curated for you
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    You May Also Like
                  </h2>
                  <p className="text-sm text-gray-600">
                    Pieces that complement this product in style and scale
                  </p>
                </div>
              </div>
            </div>

            <div className="-mx-3 sm:-mx-4 lg:-mx-0">
              <div className="overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-3 sm:gap-4 lg:gap-5 xl:gap-6 px-3 sm:px-4 lg:px-0 snap-x snap-mandatory">
                  {similarItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="snap-start min-w-[220px] sm:min-w-[240px] lg:min-w-[260px]"
                    >
                      <CatalogCard item={item} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
