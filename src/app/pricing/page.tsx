"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import PricingCard from "@/components/pricing/PricingCard";
import BillingToggle from "@/components/pricing/BillingToggle";
import { motion } from "framer-motion";
import type { FeatureCategory, PricingPeriod } from "@/components/pricing/PricingCard";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly" | "threeYear">("monthly");

  const pricingTiers = [
    {
      name: "Free",
      pricing: {
        monthly: 0,
      } as PricingPeriod,
      description: "Perfect for exploring room design and visualization tools.",
      features: [
        {
          items: [
            "1 room upload",
            "Limited furniture items",
            "Save up to 3 designs",
            "Basic customization tools",
            "Community support",
          ],
        },
      ] as FeatureCategory[],
      buttonText: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Premium",
      pricing: {
        monthly: 5.99,
        yearly: 59.99,
        threeYear: 149.99,
      } as PricingPeriod,
      description: "Unlock the full creative experience with unlimited design freedom — ad-free.",
      features: [
        {
          category: "Core Features",
          items: [
            "Unlimited room uploads",
            "Unlimited furniture previews",
            "Full design library access",
            "Save & share unlimited designs",
          ],
        },
        {
          category: "Customization",
          items: [
            "Change wall colors, flooring, and lighting",
            "No ads",
          ],
        },
        {
          category: "Support",
          items: [
            "Priority support",
          ],
        },
      ] as FeatureCategory[],
      buttonText: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Pro",
      pricing: {
        monthly: 14.99,
        yearly: 149.99,
        threeYear: 349.99,
      } as PricingPeriod,
      description: "Professional-grade tools for interior designers, decorators, and real-estate stagers.",
      features: [
        {
          category: "Everything in Premium",
          items: [
            "All Premium features included",
          ],
        },
        {
          category: "Professional Tools",
          items: [
            "Client collaboration tools",
            "Export high-quality design mockups",
            "Custom 3D model uploads",
            "Multiple client spaces",
          ],
        },
        {
          category: "Advanced Features",
          items: [
            "Advanced preference analytics",
            "Early access to new AI tools",
            "Priority & dedicated support",
            "Team workspace (coming soon)",
          ],
        },
      ] as FeatureCategory[],
      buttonText: "Start Free Trial",
      highlighted: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.05)_0%,transparent_50%)] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Choose Your Plan
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Transform your space with the perfect plan for your needs
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BillingToggle selected={billingPeriod} onChange={setBillingPeriod} />
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {pricingTiers.map((tier) => (
            <motion.div key={tier.name} variants={itemVariants}>
              <PricingCard
                name={tier.name}
                pricing={tier.pricing}
                description={tier.description}
                features={tier.features}
                buttonText={tier.buttonText}
                highlighted={tier.highlighted}
                billingPeriod={billingPeriod}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ or Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 sm:mt-16 md:mt-20 text-center px-4"
        >
          <p className="text-xs sm:text-sm text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Need a custom enterprise plan?{" "}
            <a
              href="mailto:sales@homeview360.com"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
