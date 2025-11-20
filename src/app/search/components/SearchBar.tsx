'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Glass morphism pill container */}
        <div
          className={`
            relative w-full rounded-full overflow-hidden
            bg-gradient-to-br from-white/10 to-white/5
            backdrop-blur-xl
            border border-white/20
            shadow-2xl
            transition-all duration-300
            ${isFocused ? 'shadow-[0_0_40px_rgba(99,102,241,0.3)]' : 'shadow-[0_8px_32px_rgba(0,0,0,0.3)]'}
          `}
        >
          {/* Search icon */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-white/80' : 'text-white/50'}`} />
          </div>

          {/* Input field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search our catalog..."
            className="
              w-full h-16 md:h-20
              pl-16 pr-16
              bg-transparent
              text-white/90 placeholder:text-white/40
              text-base md:text-lg
              focus:outline-none
              transition-all duration-300
            "
            aria-label="Search furniture catalog"
          />

          {/* Clear button */}
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="
                absolute right-6 top-1/2 -translate-y-1/2
                w-8 h-8
                flex items-center justify-center
                rounded-full
                bg-white/10 hover:bg-white/20
                border border-white/20
                transition-all duration-200
                group
              "
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" />
            </motion.button>
          )}
        </div>

        {/* Glow effect on focus */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"
          />
        )}
      </motion.div>

      {/* Keyboard shortcut hint */}
      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono">⌘</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono">K</kbd>
          <span className="ml-1">to search from anywhere</span>
        </div>
      </div>
    </motion.div>
  );
}
