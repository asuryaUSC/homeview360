"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

export default function FloatingSearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Floating Search Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSearchOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-black text-white rounded-full shadow-2xl backdrop-blur-xl border border-gray-200/20 flex items-center justify-center"
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Search className="h-6 w-6" />
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}