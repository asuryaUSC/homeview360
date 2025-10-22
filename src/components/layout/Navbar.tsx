"use client";

import { useState, useEffect } from "react";
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
  ChevronRight,
  Search
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";
import SearchModal from "@/components/pwa/SearchModal";

export default function Navbar() {
  // Mock user state - replace with actual auth later
  const isLoggedIn = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/catalog", label: "Catalog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md" : ""
      }`}
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="md:hidden"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-black/5 rounded-lg"
                    aria-label="Open menu"
                  >
                    <motion.div
                      animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white/95 backdrop-blur-2xl border-l border-gray-200/50">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  {/* Navigation Links */}
                  <div className="flex-1 pt-8">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between py-4 px-4 text-lg font-medium text-gray-900 hover:text-black transition-all duration-200 hover:bg-gray-50/70 rounded-xl mx-2 group"
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-200" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Auth Section */}
                  {!isLoggedIn && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="p-4 space-y-3 border-t border-gray-200/50"
                    >
                      <Button
                        variant="outline"
                        className="w-full py-3 text-base font-medium border border-gray-300 hover:border-gray-400 hover:bg-gray-50/80 rounded-xl"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log In
                      </Button>
                      <Button
                        className="w-full py-3 text-base font-medium bg-black text-white hover:bg-gray-800 rounded-xl"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </motion.div>
                  )}
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
              // Not logged in - Login/Signup buttons + Search Icon
              <div className="flex items-center gap-3">
                {/* Log In Button - Hidden on mobile */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden sm:block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base h-auto transition-colors duration-200"
                  >
                    Log In
                  </Button>
                </motion.div>

                {/* Sign Up Button - Hidden on mobile */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden sm:block">
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base h-auto transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                </motion.div>

                {/* Search Icon */}
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-1 hover:opacity-70 transition-opacity duration-200"
                  aria-label="Search"
                >
                  <Search className="h-6 w-6 text-black cursor-pointer" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.nav>
  );
}