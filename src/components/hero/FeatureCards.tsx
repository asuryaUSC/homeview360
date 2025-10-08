"use client";

import { motion } from "framer-motion";
import { Eye, Smartphone, Palette, Users } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "AR Visualization",
    description: "See furniture in your space before buying",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Works on iOS, Android, and Web",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Palette,
    title: "Style Matching",
    description: "AI-powered design recommendations",
    gradient: "from-pink-500 to-pink-600"
  },
  {
    icon: Users,
    title: "Social Sharing",
    description: "Share and collaborate on room designs",
    gradient: "from-green-500 to-green-600"
  }
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.6 + (index * 0.1),
            type: "spring",
            stiffness: 100
          }}
          whileHover={{
            y: -5,
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3`}>
            <feature.icon className="w-5 h-5 text-white" />
          </div>

          <h3 className="font-semibold text-black text-sm mb-1">
            {feature.title}
          </h3>

          <p className="text-gray-600 text-xs leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}