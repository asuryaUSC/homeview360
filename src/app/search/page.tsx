"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, X, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCatalogItems } from "@/lib/catalogData";
import { useSearchTracking, useProductInteractionTracking } from "@/hooks/useTracking";
import { boostSearchResults, getRecommendationReason } from "@/lib/recommendations";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Tracking hooks
  const { trackSearch } = useSearchTracking();
  const { trackProductClick, checkIfViewed } = useProductInteractionTracking();

  // Get catalog items
  const catalogItems = getCatalogItems();

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();

    // First, filter items based on search query
    const matchingItems = catalogItems
      .filter((item) => {
        const matchesName = item.name.toLowerCase().includes(lowercaseQuery);
        const matchesCategory = item.category
          .toLowerCase()
          .includes(lowercaseQuery);
        const matchesSKU = item.sku.toLowerCase().includes(lowercaseQuery);
        const matchesTags = item.tags?.some((tag) =>
          tag.toLowerCase().includes(lowercaseQuery)
        );
        const matchesDescription = item.description
          ?.toLowerCase()
          .includes(lowercaseQuery);

        return (
          matchesName ||
          matchesCategory ||
          matchesSKU ||
          matchesTags ||
          matchesDescription
        );
      });

    // Then, boost results with recommendation scoring
    const boostedResults = boostSearchResults(matchingItems, query);

    return boostedResults.slice(0, 20); // Limit to 20 results for performance
  }, [query, catalogItems]);

  // Track search queries
  useEffect(() => {
    if (query.trim()) {
      trackSearch(query, filteredResults.length);
    }
  }, [query, filteredResults.length, trackSearch]);

  const handleClearSearch = () => {
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800">
        <div className="px-4 py-4">
          {/* Search Input */}
          <div
            className={`relative transition-all duration-300 ${
              isFocused ? "scale-[1.02]" : "scale-100"
            }`}
          >
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search furniture, styles, brands..."
              autoFocus
              className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-600 transition-all"
            />
            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Result Count */}
          {query && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm text-gray-400 px-1"
            >
              {filteredResults.length > 0
                ? `${filteredResults.length} result${
                    filteredResults.length !== 1 ? "s" : ""
                  } found`
                : "No results found"}
            </motion.p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-6">
        {!query ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
              <SearchIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Search HomeView 360
            </h2>
            <p className="text-gray-400 max-w-sm">
              Find furniture by name, style, brand, or description
            </p>

            {/* Popular Searches */}
            <div className="mt-8 w-full max-w-md">
              <p className="text-sm text-gray-500 mb-3 text-left">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Modern sofa",
                  "Dining table",
                  "Office chair",
                  "Scandinavian",
                  "Minimalist",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-full text-sm text-gray-300 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : filteredResults.length > 0 ? (
          /* Results Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4"
          >
{filteredResults.map((item, index) => {
              const isViewed = checkIfViewed(item.id);
              const recommendationReason = getRecommendationReason(item);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/catalog/${item.id}`}
                    onClick={() => trackProductClick(item)}
                    className="block group"
                  >
                    <div className="flex gap-4 p-4 bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 rounded-2xl hover:border-gray-600 transition-all duration-300 hover:scale-[1.02]">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
                        <Image
                          src={
                            // Next/Image expects a string or StaticImport — ensure a string fallback
                            item.thumbnail ? `/${item.thumbnail}` : "/icons/favicon-32.png"
                          }
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Viewed badge */}
                        {isViewed && (
                          <div className="absolute top-2 left-2 p-1 bg-blue-500/80 backdrop-blur-sm rounded-full">
                            <Eye className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-white group-hover:text-gray-100 transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                          <span className="text-sm font-bold text-white flex-shrink-0">
                            ${item.price}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 mb-2">
                          {item.sku} • {item.category}
                        </p>

                        {/* Recommendation reason */}
                        {recommendationReason && (
                          <div className="flex items-center gap-1 mb-2">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span className="text-[10px] text-green-400">
                              {recommendationReason}
                            </span>
                          </div>
                        )}

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-gray-700/50 rounded-full text-[10px] text-gray-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* No Results */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
              <SearchIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No results found
            </h2>
            <p className="text-gray-400 max-w-sm">
              Try different keywords or browse the catalog
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
