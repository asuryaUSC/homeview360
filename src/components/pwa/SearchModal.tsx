"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { getCatalogItems } from "@/lib/catalogData";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const allItems = useMemo(() => getCatalogItems(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
        item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query)
      )
      .slice(0, 8); // Limit results for performance
  }, [searchQuery, allItems]);

  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
        <h2 className="text-lg font-semibold text-gray-900">Search Products</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Search Input */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search furniture, categories, or styles..."
            className="w-full pl-12 pr-4 py-4 text-lg bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-300 transition-all"
            autoFocus
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {searchQuery.trim() ? (
          filteredItems.length > 0 ? (
            <div className="space-y-3">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={`/catalog/${item.id}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-4 bg-white/60 border border-gray-200/50 rounded-xl hover:bg-white/80 hover:border-gray-300/50 transition-all group"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.thumbnail ? (
                        <Image
                          src={`/${item.thumbnail}`}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-400">
                            {getInitials(item.name)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-black transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {item.category}
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ${item.price}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try searching for furniture types or categories
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Start typing to search</p>
            <p className="text-gray-400 text-sm mt-1">
              Search by name, category, or style
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}