"use client";

import Navbar from "@/components/layout/Navbar";
import PricingCard from "@/components/pricing/PricingCard";
import { motion } from "framer-motion";

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for exploring HomeView360's AR furniture visualization",
      features: [
        "Browse cross-brand catalog",
        "5 AR views per day",
        "1 Smart Room save",
        "Basic AR placement",
        "Scale & surface detection",
        "Public sharing",
        "Basic recommendations",
        "Community support",
      ],
      buttonText: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Premium",
      price: 5.99,
      description: "Unlock the full creative potential with unlimited AR and AI features",
      features: [
        "Everything in Free",
        "Unlimited Smart Rooms",
        "Unlimited AR views",
        "AI style recommendations",
        "Advanced lighting simulator",
        "HD AR rendering",
        "Priority cloud sync",
        "Multi-brand comparison",
        "No watermarks",
      ],
      buttonText: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Pro",
      price: 14.99,
      description: "Professional tools for designers, decorators, and real-estate stagers",
      features: [
        "Everything in Premium",
        "Client collaboration tools",
        "Export design mockups",
        "Preference analytics",
        "Custom 3D uploads",
        "Multiple client spaces",
        "Early AI tool access",
        "Priority support",
        "Team workspace (soon)",
      ],
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
    <div className="min-h-screen relative">
      <Navbar />

      <main className="container mx-auto px-4 py-16 sm:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Transform your space with the perfect plan for your needs
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {pricingTiers.map((tier) => (
            <motion.div key={tier.name} variants={itemVariants}>
              <PricingCard
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                buttonText={tier.buttonText}
                highlighted={tier.highlighted}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ or Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500 mt-2">
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
