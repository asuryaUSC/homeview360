"use client";

import { motion } from "framer-motion";
import { Eye, Layers, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePremiumStatus } from "@/utils/premiumCheck";

const quickActions = [
  {
    icon: Search,
    label: "Browse Catalog",
    href: "/catalog",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Eye,
    label: "View in AR",
    href: "/catalog",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Layers,
    label: "My Rooms",
    href: "/rooms",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    icon: TrendingUp,
    label: "Trending",
    href: "/catalog",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function PWAHome() {
  const { user } = useUser();
  const { tier } = usePremiumStatus();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {getGreeting()},
          </h1>
          <p className="text-lg text-gray-600">
            {user?.firstName || "there"} 👋
          </p>

          {/* Tier Badge */}
          {tier !== "free" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block mt-3"
            >
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                tier === "pro"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              }`}>
                {tier === "pro" ? "Pro Member" : "Premium Member"}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, type: "spring" }}
              >
                <Link href={action.href}>
                  <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/70 transition-all active:scale-95">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {action.label}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Section */}
      <div className="px-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Continue Exploring</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/catalog">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow active:scale-98">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Explore AR Catalog
                  </h3>
                  <p className="text-sm text-white/90">
                    Browse hundreds of furniture items
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
