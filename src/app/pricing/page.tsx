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

      <main className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center relative px-4 pt-12 pb-8 sm:pt-16 sm:pb-4 sm:-mt-8 lg:-mt-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg mb-6"
          >
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              Flexible Plans for Every Creator
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
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-base sm:text-lg md:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed font-medium px-4"
            >
              Transform your space with unlimited design freedom. Start free, upgrade anytime.
            </motion.p>
          </motion.div>
        </section>
      
        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-8 sm:mb-12"
        >
          <BillingToggle selected={billingPeriod} onChange={setBillingPeriod} />
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto pb-8"
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
          className="mt-10 sm:mt-10 md:mt-10 text-center px-4 pb-16"
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
