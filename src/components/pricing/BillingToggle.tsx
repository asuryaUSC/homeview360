"use client";

import { motion } from "framer-motion";

interface BillingToggleProps {
  selected: "monthly" | "yearly" | "threeYear";
  onChange: (period: "monthly" | "yearly" | "threeYear") => void;
}

export default function BillingToggle({ selected, onChange }: BillingToggleProps) {
  const options = [
    { value: "monthly" as const, label: "Monthly", savings: null },
    { value: "yearly" as const, label: "Yearly", savings: "15%" },
    { value: "threeYear" as const, label: "3 Years", savings: "30%" },
  ];

  return (
    <div className="flex justify-center mb-8 sm:mb-12">
      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-50/40 via-purple-50/30 to-pink-50/40 backdrop-blur-md rounded-full p-1 border border-white/60 shadow-lg shadow-purple-100/50">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-300 focus:outline-none"
          >
            {selected === option.value && (
              <motion.div
                layoutId="billing-toggle"
                className="absolute inset-0 bg-white/90 backdrop-blur-lg rounded-full shadow-md shadow-blue-200/50"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center gap-0.5">
              <span
                className={`text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selected === option.value
                    ? "text-gray-900"
                    : "text-gray-600"
                }`}
              >
                {option.label}
              </span>
              {option.savings && (
                <span
                  className={`text-[9px] sm:text-[10px] font-medium transition-all duration-300 ${
                    selected === option.value
                      ? "text-emerald-600"
                      : "text-emerald-500/70"
                  }`}
                >
                  Save {option.savings}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
