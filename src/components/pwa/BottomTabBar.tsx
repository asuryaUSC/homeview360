"use client";

import { motion } from "framer-motion";
import { Home, Search, Layers, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  matchPaths: string[];
}

const tabs: Tab[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
    matchPaths: ["/"],
  },
  {
    id: "catalog",
    label: "Catalog",
    icon: Search,
    href: "/catalog",
    matchPaths: ["/catalog"],
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: Layers,
    href: "/rooms",
    matchPaths: ["/rooms"],
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/profile",
    matchPaths: ["/profile"],
  },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("home");

  useEffect(() => {
    // Determine active tab based on current pathname
    const currentTab = tabs.find((tab) =>
      tab.matchPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))
    );
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [pathname]);

  // Don't show on individual product pages
  if (pathname.match(/^\/catalog\/[^/]+$/)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-t border-white/40 shadow-lg shadow-gray-300/20 safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 h-full group relative"
              onClick={() => {
                // Simulate haptic feedback
                if (navigator.vibrate) {
                  navigator.vibrate(10);
                }
              }}
            >
              {/* Active indicator background */}
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-x-2 inset-y-1.5 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-pink-500/15 rounded-2xl"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                className="mb-1 relative z-10"
              >
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  scale: isActive ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                className={`text-[10px] font-semibold tracking-wide relative z-10 ${
                  isActive ? "text-purple-600" : "text-gray-600"
                }`}
              >
                {tab.label}
              </motion.span>
            </Link>
          );
        })}
      </div>

      {/* Safe area padding for iOS devices with notch/home indicator */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white/70" />
    </nav>
  );
}
