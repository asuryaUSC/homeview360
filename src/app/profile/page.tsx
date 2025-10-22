"use client";

import { motion } from "framer-motion";
import {
  User,
  Heart,
  Settings,
  HelpCircle,
  CreditCard,
  Info,
  Download,
  LogIn,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  description?: string;
}

const menuSections: MenuSection[] = [
  {
    title: "Account",
    items: [
      {
        id: "login",
        label: "Sign In",
        icon: LogIn,
        href: "/sign-in",
        description: "Access your account",
      },
      {
        id: "signup",
        label: "Create Account",
        icon: UserPlus,
        href: "/sign-up",
        description: "Join HomeView 360",
      },
    ],
  },
  {
    title: "Your Items",
    items: [
      {
        id: "favorites",
        label: "Saved Items",
        icon: Heart,
        href: "/favorites",
        description: "Your favorite furniture",
      },
    ],
  },
  {
    title: "Subscription",
    items: [
      {
        id: "pricing",
        label: "Upgrade to Premium",
        icon: CreditCard,
        href: "/pricing",
        badge: "Popular",
        description: "Unlock unlimited features",
      },
    ],
  },
  {
    title: "App",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        href: "/settings",
        description: "Preferences and options",
      },
      {
        id: "about",
        label: "About",
        icon: Info,
        href: "/about",
        description: "Learn more about HomeView 360",
      },
      {
        id: "help",
        label: "Help & Support",
        icon: HelpCircle,
        href: "/help",
        description: "Get assistance",
      },
    ],
  },
];

export default function ProfilePage() {
  const isLoggedIn = false; // TODO: Connect to Clerk auth
  const isPWA =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
  // Some iOS versions expose `navigator.standalone` — access safely via a narrowed type
  (window.navigator as unknown as { standalone?: boolean }).standalone === true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
          <p className="text-sm text-gray-400">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* User Card (when logged in) */}
        {isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gradient-to-br from-gray-800/60 to-gray-800/30 border border-gray-700/50 rounded-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">Guest User</h2>
                <p className="text-sm text-gray-400">guest@homeview360.com</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Sections */}
        <div className="space-y-8">
          {menuSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block group"
                    >
                      <div className="p-4 bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 rounded-2xl hover:border-gray-600 transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gray-700/50 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-semibold text-white group-hover:text-gray-100 transition-colors">
                                {item.label}
                              </h3>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-[10px] font-bold text-white">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-sm text-gray-400">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Install PWA Prompt (if not installed) */}
        {!isPWA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">
                  Install HomeView 360
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Get the full app experience with offline access and faster
                  performance
                </p>
                <Link
                  href="/"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Learn How
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">HomeView 360</p>
          <p className="text-xs text-gray-600 mt-1">Version 1.0.0 (MVP)</p>
          <p className="text-xs text-gray-600 mt-2">
            Made with care for interior design enthusiasts
          </p>
        </motion.div>
      </div>
    </div>
  );
}
