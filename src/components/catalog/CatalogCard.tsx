"use client";

import React from "react";
import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, TrendingUp } from "lucide-react";
import { useProductInteractionTracking } from "@/hooks/useTracking";
import { getRecommendationReason } from "@/lib/recommendations";

interface CatalogCardProps {
  item: CatalogItem;
  index?: number;
}

export default function CatalogCard({ item, index = 0 }: CatalogCardProps) {
  const { trackProductClick, checkIfViewed } = useProductInteractionTracking();
  const [isViewed, setIsViewed] = React.useState(false);

  // Avoid hydration mismatch by resolving viewed status after mount
  React.useEffect(() => {
    setIsViewed(checkIfViewed(item.id));
  }, [checkIfViewed, item.id]);
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
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
            {item.thumbnail ? (
              <Image
                src={`/${item.thumbnail}`}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 33vw, 25vw"
              />
            ) : (
              // Placeholder for missing thumbnails
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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
          <div className="p-3 sm:p-3.5 flex-1 flex flex-col gap-2">
            {/* Category Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-block bg-gray-100 text-gray-800 text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-semibold">
                {item.category}
              </span>
              {/* Recommendation badge */}
              {recommendationReason && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full font-semibold border border-emerald-100">
                  <TrendingUp className="w-2.5 h-2.5" />
                  For you
                </span>
              )}
            </div>

            {/* Product Name */}
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate leading-tight h-[1.4rem] sm:h-[1.5rem]">
              {item.name}
            </h3>

            {/* Quick detail */}
            <div className="text-[11px] sm:text-xs text-gray-600">
              {Math.round(item.dimensions.width * 100)}cm W × {Math.round(item.dimensions.depth * 100)}cm D × {Math.round(item.dimensions.height * 100)}cm H
            </div>

            {/* Price */}
            <div className="mt-auto flex items-center justify-between">
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                ${item.price}
              </p>
              <span className="text-xs text-gray-500 font-medium">
                AR ready
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
