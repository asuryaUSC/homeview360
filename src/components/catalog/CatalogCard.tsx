"use client";

import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, TrendingUp } from "lucide-react";
import { useProductInteractionTracking } from "@/hooks/useTracking";
import { getRecommendationReason } from "@/lib/recommendations";

interface CatalogCardProps {
  item: CatalogItem;
  index?: number;
}

export default function CatalogCard({ item, index = 0 }: CatalogCardProps) {
  const { trackProductClick, checkIfViewed } = useProductInteractionTracking();

  // Check if previously viewed
  const isViewed = checkIfViewed(item.id);
  const recommendationReason = getRecommendationReason(item);

  // Generate initials for placeholder
  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
    >
      <Link
        href={`/catalog/${item.id}`}
        onClick={() => trackProductClick(item)}
        className="block group"
      >
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl overflow-hidden shadow-md shadow-gray-300/20 hover:shadow-lg hover:shadow-gray-400/25 hover:bg-white/50 transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative w-full aspect-square bg-white/60 overflow-hidden">
            {item.thumbnail ? (
              <Image
                src={`/${item.thumbnail}`}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 33vw, 25vw"
              />
            ) : (
              // Placeholder for missing thumbnails
              <div className="w-full h-full bg-gradient-to-br from-gray-100/80 to-gray-200/80 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
                  {getInitials(item.name)}
                </span>
              </div>
            )}
            {/* Viewed badge */}
            {isViewed && (
              <div className="absolute top-2 right-2 p-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full shadow-md">
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            {/* Category Badge */}
            <div className="mb-2 flex items-center gap-2 flex-wrap">
              <span className="inline-block bg-gray-900/5 backdrop-blur-sm text-gray-700 text-[10px] sm:text-xs px-2 py-1 rounded-md font-medium">
                {item.category}
              </span>
              {/* Recommendation badge */}
              {recommendationReason && (
                <span className="inline-flex items-center gap-1 bg-green-500/10 backdrop-blur-sm text-green-700 text-[10px] px-2 py-1 rounded-md font-medium">
                  <TrendingUp className="w-2.5 h-2.5" />
                  For you
                </span>
              )}
            </div>

            {/* Product Name */}
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-2">
              {item.name}
            </h3>

            {/* Price */}
            <p className="text-lg sm:text-xl font-bold text-gray-900 mt-auto">
              ${item.price}
            </p>

            {/* View in AR Link */}
            <div className="mt-2 flex items-center text-xs sm:text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
              <span>View Details</span>
              <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
