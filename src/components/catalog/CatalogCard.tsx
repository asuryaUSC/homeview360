"use client";

import { CatalogItem } from "@/types/catalog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CatalogCardProps {
  item: CatalogItem;
  index?: number;
}

export default function CatalogCard({ item, index = 0 }: CatalogCardProps) {
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
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
    >
      <Link href={`/catalog/${item.id}`} className="block group">
        <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative w-full aspect-square bg-gray-50">
            {item.thumbnail ? (
              <Image
                src={`/${item.thumbnail}`}
                alt={item.name}
                fill
                className="object-cover"
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
          </div>

          {/* Content */}
          <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
            {/* Category Badge */}
            <div className="mb-1 sm:mb-2">
              <span className="inline-block bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md font-medium">
                {item.category}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
              {item.name}
            </h3>

            {/* Price */}
            <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mt-1 sm:mt-2">
              ${item.price}
            </p>

            {/* View in AR Link */}
            <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
              <span>View in AR</span>
              <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
