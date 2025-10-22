"use client";

import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetails from "./ProductDetails";
import ProductDimensions from "./ProductDimensions";
import { usePWAMode } from "@/hooks/usePWAMode";
import ARButton from "./ar/ARButton";

interface ProductPageProps {
  product: CatalogItem;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { isPWA } = usePWAMode();

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
      </main>
    </div>
  );
}