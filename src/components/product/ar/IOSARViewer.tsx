"use client";

import { motion } from "framer-motion";
import { Eye, Loader2 } from "lucide-react";
import { CatalogItem } from "@/types/catalog";
import Image from "next/image";

interface IOSARViewerProps {
  product: CatalogItem;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export default function IOSARViewer({
  product,
  isLoading,
  setIsLoading,
  error,
  setError
}: IOSARViewerProps) {

  const handleARLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!product.ar_compatible) {
      e.preventDefault();
      setError("AR not available for this product");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Small delay to show loading state, then iOS will handle the AR
    // Don't prevent default - let iOS Safari handle the AR link naturally
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (!product.ar_compatible) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-3"
      >
        <div className="w-full sm:w-auto bg-gray-300 text-gray-500 px-8 py-4 text-base font-medium rounded-xl text-center">
          <Eye className="mr-2 h-5 w-5 inline" />
          AR Not Available
        </div>
        <p className="text-sm text-gray-500">
          AR viewing is not supported for this product
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-3"
    >
      {/* iOS AR Quick Look Link */}
      <a
        href={`/${product.models.usdz}`}
        rel="ar"
        onClick={handleARLinkClick}
        className="inline-block w-full sm:w-auto"
        aria-label={`View ${product.name} in AR`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-base font-medium rounded-xl transition-all duration-200 text-center cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin inline" />
          ) : (
            <Eye className="mr-2 h-5 w-5 inline" />
          )}
          {isLoading ? "Loading AR..." : "View in AR"}
        </motion.div>
      </a>

      <div className="text-sm text-gray-600">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : isLoading ? (
          <p className="text-blue-600">Preparing AR experience...</p>
        ) : (
          <p>Tap to launch AR Quick Look on your iPhone</p>
        )}
      </div>

      {/* Hidden image for AR Quick Look - iOS requirement */}
      {product.thumbnail && (
        <Image
          src={`/${product.thumbnail}`}
          alt={`${product.name} thumbnail for AR`}
          width={200}
          height={200}
          style={{ display: 'none' }}
          priority
        />
      )}
    </motion.div>
  );
}