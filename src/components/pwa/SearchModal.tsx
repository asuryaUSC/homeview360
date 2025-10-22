"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { getCatalogItems } from "@/lib/catalogData";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = useMemo(() => getCatalogItems(), []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle body scroll and auto-focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Auto-focus input after animation
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery(""); // Clear search when closing
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allItems
      .filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query)
      )
      .slice(0, 10); // Limit results for performance
  }, [searchQuery, allItems]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center pt-[15vh] px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
          />

          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl z-10"
          >
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search furniture..."
                className="w-full pl-12 pr-12 py-4 text-lg bg-transparent border-0 rounded-2xl focus:outline-none placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Hint text below search */}
            {!searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-white/60 mt-3"
              >
                Search by name, category, or style
              </motion.p>
            )}
          </motion.div>

          {/* Results floating on backdrop */}
          <div className="relative w-full max-w-2xl mt-4 z-10">
            {searchQuery.trim() && filteredItems.length > 0 && (
              <div className="space-y-3 pb-8">
                {filteredItems.map((item, index) => {
                  // Filter out generic tags and get style-specific ones
                  const styleTags = item.tags
                    .filter(tag => !['3D model', 'AR ready', 'AR-ready', '3D', 'home decor'].includes(tag))
                    .slice(0, 3);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      <Link
                        href={`/catalog/${item.id}`}
                        onClick={onClose}
                        className="relative flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-white/90 backdrop-blur-xl hover:bg-white rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-2xl border border-white/20 hover:scale-[1.02] overflow-hidden"
                      >
                        {/* Gradient border effect on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6, #FBBF24, #FB923C)',
                            padding: '1px',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude'
                          }}
                        />

                        {/* Product Thumbnail - Larger */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                          {item.thumbnail ? (
                            <Image
                              src={`/${item.thumbnail}`}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 80px, 96px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <Search className="h-8 w-8 text-gray-300" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0 pt-1">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-1 group-hover:text-black transition-colors">
                            {item.name}
                          </h3>

                          {/* SKU */}
                          <p className="text-xs text-gray-400 mt-0.5">
                            SKU: {item.sku}
                          </p>

                          {/* Category and Price */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <p className="text-xs sm:text-sm text-gray-600">
                              {item.category}
                            </p>
                            <span className="text-gray-300">•</span>
                            <p className="text-sm sm:text-base font-bold text-gray-900">
                              ${item.price}
                            </p>
                          </div>

                          {/* Style Tags */}
                          {styleTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {styleTags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full capitalize"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Hover indicator */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 flex items-center justify-center shadow-md">
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* No results state */}
            {searchQuery.trim() && filteredItems.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/60 text-sm mt-8"
              >
                No products found. Try different keywords.
              </motion.p>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}