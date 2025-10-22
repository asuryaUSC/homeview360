"use client";

import Navbar from "@/components/layout/Navbar";
import { motion, useScroll } from "framer-motion";
import { Search, Smartphone, Palette, Users, Shield } from "lucide-react";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms for connecting line (currently unused)
  // const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Stagger animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: custom * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.15 + 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <div ref={containerRef} className="min-h-screen relative">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[70vh] sm:min-h-[85vh] flex flex-col items-center justify-center relative px-4 sm:px-6 pt-8 pb-16 sm:pb-8 sm:-mt-8 lg:-mt-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg mb-6 sm:mb-6"
        >
          <span className="text-xs sm:text-sm font-medium text-gray-800">
            The Future of Furniture Shopping
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-center max-w-5xl space-y-4 sm:space-y-4 md:space-y-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight px-2">
            <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
              See It Before
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              You Buy It
            </span>
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 max-w-2xl mx-auto leading-relaxed font-medium px-4"
          >
            HomeView360 uses AR technology to eliminate buyer uncertainty.
            Visualize furniture from multiple brands in your actual space.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator - Desktop only, moved down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="hidden lg:flex absolute bottom-12 flex-col items-center gap-1"
        >
          <span className="text-xs text-gray-600">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-400 flex items-start justify-center p-1.5">
            <div className="w-1 h-1.5 bg-gray-600 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Tighter spacing */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative">
        {/* Connecting Line - Only on features section */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none z-0">
          <div className="w-full h-full bg-gradient-to-b from-blue-500 via-amber-400 to-green-500" />
        </div>

        <div className="container mx-auto max-w-5xl space-y-12 sm:space-y-16 md:space-y-20">

          {/* Feature 1: Browse */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center relative">
            {/* Dot indicator on line */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-lg z-10" />

            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="md:col-span-1"
            >
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 shadow-lg">
                    1
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Browse
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Explore furniture from multiple brands in one seamless catalog.
                  Search by style, dimensions, price, or brand.
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Search className="w-4 h-4 flex-shrink-0" />
                  <span>Cross-brand search • Smart filters</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariants}
              className="hidden md:block h-[280px] sm:h-[320px]"
            >
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-gray-200 shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-500">
                <Search className="w-20 h-20 sm:w-24 sm:h-24 text-blue-500/40" />
              </div>
            </motion.div>
          </div>

          {/* Feature 2: Visualize */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center relative">
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-lg z-10" />

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariants}
              className="hidden md:block h-[280px] sm:h-[320px] order-2 md:order-1"
            >
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border border-gray-200 shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-500">
                <Smartphone className="w-20 h-20 sm:w-24 sm:h-24 text-amber-500/40" />
              </div>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="md:col-span-1 order-1 md:order-2"
            >
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 shadow-lg">
                    2
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Visualize
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Place furniture in your room using AR. See true-to-scale 3D models
                  with realistic lighting on iOS and Android.
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Smartphone className="w-4 h-4 flex-shrink-0" />
                  <span>WebXR • USDZ Quick Look</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 3: Design */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center relative">
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-lg z-10" />

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="md:col-span-1"
            >
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 shadow-lg">
                    3
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Design
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Save Smart Rooms and get AI-powered style recommendations.
                  Share designs with friends, family, or clients.
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Palette className="w-4 h-4 flex-shrink-0" />
                  <span>AI suggestions • Smart Rooms</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariants}
              className="hidden md:block h-[280px] sm:h-[320px]"
            >
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 border border-gray-200 shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-500">
                <Palette className="w-20 h-20 sm:w-24 sm:h-24 text-orange-500/40" />
              </div>
            </motion.div>
          </div>

          {/* Feature 4: Collaborate */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center relative">
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-white shadow-lg z-10" />

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariants}
              className="hidden md:block h-[280px] sm:h-[320px] order-2 md:order-1"
            >
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border border-gray-200 shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-500">
                <Users className="w-20 h-20 sm:w-24 sm:h-24 text-purple-500/40" />
              </div>
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="md:col-span-1 order-1 md:order-2"
            >
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 shadow-lg">
                    4
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Collaborate
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Get feedback from friends or clients before purchasing.
                  Share room designs instantly and decide together.
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>Real-time sharing • Comments</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 5: Shop Confident */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center relative">
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-lg z-10" />

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="md:col-span-1"
            >
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 shadow-lg">
                    5
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Shop Confident
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Fast, secure checkout across multiple retailers. Encrypted data
                  and we never store payment information.
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span>Encrypted • Price comparison</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariants}
              className="hidden md:block h-[280px] sm:h-[320px]"
            >
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border border-gray-200 shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-500">
                <Shield className="w-20 h-20 sm:w-24 sm:h-24 text-green-500/40" />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-24" />
    </div>
  );
}
