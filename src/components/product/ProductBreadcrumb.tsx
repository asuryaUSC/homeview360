"use client";

import { CatalogItem } from "@/types/catalog";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Home, ChevronRight } from "lucide-react";

interface ProductBreadcrumbProps {
  product: CatalogItem;
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center space-x-2 text-sm"
    >
      {/* Back to Catalog - Mobile */}
      <Link
        href="/catalog"
        className="lg:hidden flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        <span>Back</span>
      </Link>

      {/* Full Breadcrumb - Desktop */}
      <div className="hidden lg:flex items-center space-x-2">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Home className="h-4 w-4" />
        </Link>

        <ChevronRight className="h-4 w-4 text-gray-400" />

        <Link
          href="/catalog"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Catalog
        </Link>

        <ChevronRight className="h-4 w-4 text-gray-400" />

        <span className="text-gray-600">{product.category}</span>

        <ChevronRight className="h-4 w-4 text-gray-400" />

        <span className="text-gray-900 font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </div>
    </motion.nav>
  );
}