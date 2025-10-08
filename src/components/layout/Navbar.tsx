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
  Menu
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
              <div className="md:hidden">
                <Logo size="sm" />
              </div>
              <div className="hidden md:block">
                <Logo size="md" />
              </div>
            </Link>
          </motion.div>

          {/* Center Section - Desktop Navigation Links */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-gray-600 transition-all duration-200 font-medium relative group"
              >
                {link.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200"
                  whileHover={{ width: "100%" }}
                />
              </Link>
            ))}
          </motion.div>

          {/* Right Section - Mobile Menu + Auth Buttons */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Auth Section */}
            {isLoggedIn ? (
              // Logged in user dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center"
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
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black border-2 border-gray-300 hover:bg-black/5 hover:border-gray-400 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base h-auto"
                  >
                    Log In
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base h-auto transition-colors"
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