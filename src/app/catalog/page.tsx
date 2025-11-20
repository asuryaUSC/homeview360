"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import CatalogCard from "@/components/catalog/CatalogCard";
import { getCatalogItems } from "@/lib/catalogData";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWAMode } from "@/hooks/usePWAMode";
import { useCategoryTracking, useInitializeTracking } from "@/hooks/useTracking";

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const itemsPerPage = 12;
  const { isPWA } = usePWAMode();

  // Tracking hooks
  const { trackCategory } = useCategoryTracking();
  useInitializeTracking();

  // Wait for client mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track category changes
  useEffect(() => {
    if (isMounted && selectedCategory !== "All") {
      trackCategory(selectedCategory);
    }
  }, [selectedCategory, isMounted, trackCategory]);

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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allItems.map(item => item.category));
    return ["All", ...Array.from(cats).sort()];
  }, [allItems]);

  // Filter items based on selections
  const filteredItems = useMemo(() => {
    let filtered = allItems;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== "All") {
      filtered = filtered.filter(item => {
        const price = item.price;
        switch (priceRange) {
          case "Under $100": return price < 100;
          case "$100 - $500": return price >= 100 && price <= 500;
          case "$500 - $1000": return price > 500 && price <= 1000;
          case "Over $1000": return price > 1000;
          default: return true;
        }
      });
    }

    return filtered;
  }, [allItems, selectedCategory, priceRange]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange]);

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
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.03)_0%,transparent_50%)] pointer-events-none" />

      {!isPWA && <Navbar />}

      <main className={`container mx-auto px-3 sm:px-4 relative z-10 ${isPWA ? 'py-6 sm:py-8' : ''}`}>
        {/* Hero Section */}
        {!isPWA && (
          <section className="flex flex-col items-center justify-center relative px-4 pt-12 pb-8 sm:pt-16 sm:pb-12 sm:-mt-8 lg:-mt-12">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg mb-6"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-800">
                {allItems.length} Curated Items
              </span>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
              className="text-center max-w-5xl space-y-4 sm:space-y-6 mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight px-2">
                <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
                  Explore Our
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AR Catalog
                </span>
              </h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-base sm:text-lg md:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed font-medium px-4"
              >
                Discover furniture from top brands. Visualize each piece in your space with AR.
              </motion.p>
            </motion.div>
          </section>
        )}

        {/* Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            {/* Category Filter */}
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-md border border-white/60 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 font-medium shadow-sm hover:bg-white/70 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex-1">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-md border border-white/60 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 font-medium shadow-sm hover:bg-white/70 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              >
                <option value="All">All Prices</option>
                <option value="Under $100">Under $100</option>
                <option value="$100 - $500">$100 - $500</option>
                <option value="$500 - $1000">$500 - $1,000</option>
                <option value="Over $1000">Over $1,000</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="hidden sm:flex items-center px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-700">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>

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
              className="px-2 py-1 sm:px-3 sm:py-2 bg-white/70 backdrop-blur-sm border-white/60 hover:bg-white/90 hover:border-blue-200/60 shadow-sm disabled:opacity-50"
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
                  className={`px-2 py-1 sm:px-4 sm:py-2 text-sm transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md shadow-blue-300/40 border-transparent"
                      : "bg-white/70 backdrop-blur-sm border-white/60 hover:bg-white/90 hover:border-blue-200/60 shadow-sm"
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
              className="px-2 py-1 sm:px-3 sm:py-2 bg-white/70 backdrop-blur-sm border-white/60 hover:bg-white/90 hover:border-blue-200/60 shadow-sm disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mb-6 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-700 font-medium">
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} items
        </div>
      </main>
    </div>
  );
}
