"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  buttonText,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col bg-white border transition-all duration-300 ${
          highlighted
            ? "border-blue-500 shadow-lg hover:shadow-xl"
            : "border-gray-200 shadow-sm hover:shadow-md"
        }`}
      >
        <CardHeader className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 p-4 sm:p-6">
          {/* Badge area - fixed height for alignment */}
          <div className="h-5 sm:h-6">
            {highlighted && (
              <Badge className="bg-blue-500 text-white border-none text-[10px] sm:text-xs font-medium">
                Most Popular
              </Badge>
            )}
          </div>

          {/* Plan name */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{name}</h3>

          {/* Price */}
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900">
              ${price === 0 ? "0" : price.toFixed(2)}
            </span>
            <span className="text-sm sm:text-base text-gray-600">/month</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[32px] sm:min-h-[40px]">
            {description}
          </p>
        </CardHeader>

        <CardContent className="pb-4 sm:pb-6 px-4 sm:px-6">
          {/* Features list with responsive minimum height */}
          <div className="space-y-2 sm:space-y-2.5 min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-2.5">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4 sm:pt-6 mt-auto p-4 sm:p-6">
          <motion.div
            className="w-full"
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className={`w-full py-4 sm:py-6 text-sm sm:text-base font-semibold relative overflow-hidden group transition-all duration-200 ${
                highlighted || name === "Pro"
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-black border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {/* Shimmer effect for Premium */}
              {highlighted && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 0.6 }}
                />
              )}
              {buttonText}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
