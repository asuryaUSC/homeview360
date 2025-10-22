"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export interface PricingPeriod {
  monthly: number;
  yearly?: number;
  threeYear?: number;
}

export interface FeatureCategory {
  category?: string;
  items: string[];
}

interface PricingCardProps {
  name: string;
  pricing: PricingPeriod;
  description: string;
  features: FeatureCategory[];
  highlighted?: boolean;
  buttonText: string;
  billingPeriod: "monthly" | "yearly" | "threeYear";
  hasAds?: boolean;
}

export default function PricingCard({
  name,
  pricing,
  description,
  features,
  highlighted = false,
  buttonText,
  billingPeriod,
}: PricingCardProps) {
  // Calculate current price and savings
  const getCurrentPrice = () => {
    if (billingPeriod === "monthly") return pricing.monthly;
    if (billingPeriod === "yearly" && pricing.yearly) return pricing.yearly;
    if (billingPeriod === "threeYear" && pricing.threeYear) return pricing.threeYear;
    return pricing.monthly;
  };

  const getMonthlyEquivalent = () => {
    const currentPrice = getCurrentPrice();
    if (billingPeriod === "yearly") return currentPrice / 12;
    if (billingPeriod === "threeYear") return currentPrice / 36;
    return currentPrice;
  };

  const getSavingsPercent = () => {
    if (billingPeriod === "yearly" && pricing.yearly) {
      const yearlyMonthly = pricing.monthly * 12;
      return Math.round(((yearlyMonthly - pricing.yearly) / yearlyMonthly) * 100);
    }
    if (billingPeriod === "threeYear" && pricing.threeYear) {
      const threeYearMonthly = pricing.monthly * 36;
      return Math.round(((threeYearMonthly - pricing.threeYear) / threeYearMonthly) * 100);
    }
    return 0;
  };

  const currentPrice = getCurrentPrice();
  const monthlyEquivalent = getMonthlyEquivalent();
  const savingsPercent = getSavingsPercent();

  // Glassmorphism styles for tiers
  const getCardGlassStyles = () => {
    if (highlighted) {
      return {
        background: "bg-gradient-to-br from-blue-100/30 via-white/60 to-purple-100/30",
        border: "border-white/60",
        shadow: "shadow-xl shadow-blue-200/30 hover:shadow-2xl hover:shadow-blue-300/40",
        glow: "hover:ring-1 hover:ring-blue-200/50",
      };
    }
    if (name === "Pro") {
      return {
        background: "bg-gradient-to-br from-purple-100/30 via-pink-50/20 to-white/60",
        border: "border-white/60",
        shadow: "shadow-xl shadow-purple-200/30 hover:shadow-2xl hover:shadow-purple-300/40",
        glow: "hover:ring-1 hover:ring-purple-200/50",
      };
    }
    return {
      background: "bg-gradient-to-br from-white/40 via-gray-50/30 to-white/50",
      border: "border-white/50",
      shadow: "shadow-lg shadow-gray-300/30 hover:shadow-xl hover:shadow-gray-400/40",
      glow: "hover:ring-1 hover:ring-white/40",
    };
  };

  const cardStyles = getCardGlassStyles();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col backdrop-blur-xl border transition-all duration-300 ${cardStyles.background} ${cardStyles.border} ${cardStyles.shadow} ${cardStyles.glow}`}
      >
        <CardHeader className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 p-4 sm:p-6">
          {/* Badge area - fixed height for alignment */}
          <div className="h-5 sm:h-6 flex gap-2">
            {highlighted && (
              <Badge className="bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm text-white border border-white/30 text-[10px] sm:text-xs font-semibold shadow-lg shadow-blue-300/30">
                Most Popular
              </Badge>
            )}
            {savingsPercent > 0 && (
              <Badge className="bg-gradient-to-r from-emerald-400/70 to-teal-400/70 backdrop-blur-sm text-white border border-white/30 text-[10px] sm:text-xs font-semibold shadow-md shadow-emerald-300/20">
                Save {savingsPercent}%
              </Badge>
            )}
          </div>

          {/* Plan name */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{name}</h3>

          {/* Price */}
          <motion.div
            key={billingPeriod}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                ${currentPrice === 0 ? "0" : monthlyEquivalent.toFixed(2)}
              </span>
              <span className="text-sm sm:text-base text-gray-600">/month</span>
            </div>
            {billingPeriod !== "monthly" && currentPrice > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                ${currentPrice.toFixed(2)} billed {billingPeriod === "yearly" ? "annually" : "every 3 years"}
              </p>
            )}
          </motion.div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[32px] sm:min-h-[40px]">
            {description}
          </p>
        </CardHeader>

        <CardContent className="pb-4 sm:pb-6 px-4 sm:px-6">
          {/* Features list with categories */}
          <div className="space-y-4">
            {features.map((featureGroup, groupIndex) => (
              <div key={groupIndex}>
                {featureGroup.category && (
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {featureGroup.category}
                  </h4>
                )}
                <div className="space-y-2 sm:space-y-2.5">
                  {featureGroup.items.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 sm:space-x-2.5">
                      <div className={`flex-shrink-0 mt-0.5 rounded-full p-0.5 ${
                        highlighted
                          ? "bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                          : name === "Pro"
                          ? "bg-gradient-to-br from-purple-400/20 to-pink-400/20"
                          : "bg-gray-200/40"
                      }`}>
                        <Check className={`h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 ${
                          highlighted ? "text-blue-600" : name === "Pro" ? "text-purple-600" : "text-gray-700"
                        }`} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4 sm:pt-6 mt-auto p-4 sm:p-6">
          <motion.div
            className="w-full"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
          >
            <Button
              className={`w-full py-4 sm:py-6 text-sm sm:text-base font-semibold relative overflow-hidden group transition-all duration-300 border ${
                highlighted
                  ? "bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm text-white hover:from-blue-600 hover:to-purple-600 border-white/40 shadow-lg shadow-blue-300/40 hover:shadow-xl hover:shadow-blue-400/50"
                  : name === "Pro"
                  ? "bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white hover:from-purple-600 hover:to-pink-600 border-white/40 shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50"
                  : "bg-white/70 backdrop-blur-sm text-gray-900 border-gray-300/60 hover:bg-white/90 hover:border-gray-400/60 shadow-md hover:shadow-lg"
              }`}
            >
              {/* Shimmer effect for all buttons */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <span className="relative z-10">{buttonText}</span>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
