"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import CatalogCard from "@/components/catalog/CatalogCard";
import { getCatalogItems } from "@/lib/catalogData";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWAMode } from "@/hooks/usePWAMode";

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 12;
  const { isPWA } = usePWAMode();

  // Wait for client mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Shuffle items for variety - only on client
  const allItems = useMemo(() => {
    if (!isMounted) return getCatalogItems();

    const items = getCatalogItems();
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [isMounted]);

  // Calculate pagination
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen relative">
      {!isPWA && <Navbar />}

      <main className={`container mx-auto px-3 sm:px-4 ${isPWA ? 'py-6 sm:py-8' : 'py-8 sm:py-12 md:py-16'}`}>
        {/* Hero Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Our Catalog
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            {allItems.length} items available
          </p>
        </motion.div>

        {/* Product Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {currentItems.map((item, index) => (
            <CatalogCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-12">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 sm:px-3 sm:py-2 border-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 py-1 sm:px-3 sm:py-2 text-gray-500 hidden sm:inline"
                  >
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page as number)}
                  className={`px-2 py-1 sm:px-4 sm:py-2 text-sm ${
                    currentPage === page
                      ? "bg-black text-white hover:bg-gray-800"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </Button>
              );
            })}

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 sm:px-3 sm:py-2 border-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allItems.length)} of {allItems.length} items
        </div>
      </main>
    </div>
  );
}
