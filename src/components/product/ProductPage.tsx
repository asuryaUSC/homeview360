"use client";

import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetails from "./ProductDetails";
import ProductDimensions from "./ProductDimensions";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { usePWAMode } from "@/hooks/usePWAMode";

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
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 sm:mt-10"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-4 text-base font-medium rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View in AR
                </Button>
                <p className="text-sm text-gray-600 mt-3">
                  See how this looks in your space
                </p>
              </motion.div>

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