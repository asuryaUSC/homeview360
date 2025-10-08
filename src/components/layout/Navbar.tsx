"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Navbar() {
  // Mock user state - replace with actual auth later
  const isLoggedIn = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/catalog", label: "Catalog" },
    { href: "/search", label: "Search" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">

          {/* Left Section - Logo */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center"
          >
            <Link href="/" className="block">
              <Logo size="md" />
            </Link>
          </motion.div>

          {/* Center Section - Navigation Links */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-10"
          >
            <Link
              href="/about"
              className="text-black hover:text-gray-600 transition-all duration-200 font-medium relative group"
            >
              About
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200"
                whileHover={{ width: "100%" }}
              />
            </Link>
            <Link
              href="/pricing"
              className="text-black hover:text-gray-600 transition-all duration-200 font-medium relative group"
            >
              Pricing
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200"
                whileHover={{ width: "100%" }}
              />
            </Link>
            <Link
              href="/catalog"
              className="text-black hover:text-gray-600 transition-all duration-200 font-medium relative group"
            >
              Catalog
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200"
                whileHover={{ width: "100%" }}
              />
            </Link>
            <Link
              href="/search"
              className="text-black hover:text-gray-600 transition-all duration-200 font-medium relative group"
            >
              Search
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200"
                whileHover={{ width: "100%" }}
              />
            </Link>
          </motion.div>

          {/* Right Section - User Profile */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-3"
          >
            {isLoggedIn ? (
              // Logged in user dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-9 w-9 rounded-full bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center"
                  >
                    <User className="h-4 w-4 text-black" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Not logged in - Login/Signup buttons
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="text-black border-2 border-gray-300 hover:bg-black/5 hover:border-gray-400 px-4 py-2 h-auto"
                  >
                    Log In
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="bg-black text-white hover:bg-gray-800 px-4 py-2 h-auto transition-colors"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}