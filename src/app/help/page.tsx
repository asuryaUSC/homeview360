"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Smartphone, User, Wrench, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HelpCenterPage() {
  const helpCategories = [
    {
      icon: Smartphone,
      title: "Getting Started & AR Basics",
      description: "Learn how to use HomeView 360 and master AR features",
      articles: [
        {
          title: "How to use AR features",
          content: "To use AR features, tap the AR button on any product page. Grant camera permissions when prompted, then point your device at a flat surface like a floor or table. The app will detect the surface and let you place, rotate, and scale furniture in real-time within your actual space. For best results, ensure good lighting and clear floor space."
        },
        {
          title: "Creating your first Smart Room",
          content: "Start by browsing the catalog and finding furniture you like. Click 'Add to Room' on any product. You can arrange items in AR or create a virtual layout. Continue adding more items to build your complete room design. Once you're happy with your layout, click 'Save Room' and give it a name. Your Smart Room is now accessible from the Rooms page anytime!"
        },
        {
          title: "Placing furniture in AR",
          content: "When placing furniture in AR, start by scanning your floor or surface slowly. Once the app detects the surface (you'll see a grid), tap to place the furniture. Use two fingers to rotate the item, pinch to scale it up or down, and drag to move it around. You can remove items by tapping the delete icon. Make sure you have enough space and good lighting for the best experience."
        },
        {
          title: "Understanding lighting presets",
          content: "Lighting presets let you see how furniture looks under different lighting conditions. Choose from day, night, warm, or cool lighting environments to understand how colors and textures will appear in various settings. This feature uses HDRI environment maps and WebXR light estimation to simulate realistic lighting effects, helping you make more informed decisions about how furniture will look in your home throughout the day."
        },
        {
          title: "Mobile vs Desktop experience",
          content: "HomeView 360 works on both mobile and desktop devices. Mobile provides the full AR experience with camera-based placement, perfect for visualizing furniture in your actual space. Desktop offers a powerful browsing and planning experience with larger screens for comparing products and managing Smart Rooms. For the best experience, use mobile for AR visualization and desktop for detailed browsing and comparison."
        },
      ],
    },
    {
      icon: User,
      title: "Account & Subscription",
      description: "Manage your account and subscription settings",
      articles: [
        {
          title: "Managing your account",
          content: "Access your account settings by clicking your profile icon in the navigation bar. Here you can update your personal information, change your password, manage notification preferences, and view your subscription status. Your account data is securely stored and synced across all your devices. You can also download your data or delete your account from the account settings page."
        },
        {
          title: "Upgrading to Premium or Pro",
          content: "Upgrade to Premium ($5.99/month) for unlimited AR placements, full catalog access, and AI style suggestions. Upgrade to Pro ($14.99/month) for all Premium features plus designer tools, client viewing links, and advanced measurements. Visit the Pricing page to compare plans and choose the one that fits your needs. You can upgrade or downgrade your plan anytime from your account settings."
        },
        {
          title: "Subscription billing",
          content: "Subscriptions are billed monthly or annually depending on your chosen plan. We accept all major credit cards and digital payment methods. Your subscription will automatically renew unless you cancel. You'll receive an email reminder 3 days before each billing cycle. View your billing history and download invoices from your account settings at any time."
        },
        {
          title: "Cancellation and refunds",
          content: "You can cancel your subscription anytime from your account settings with no cancellation fees. You'll continue to have access to paid features until the end of your billing period, then automatically revert to the Free tier. Your saved rooms and preferences will be preserved. We offer a 14-day money-back guarantee on annual plans if you're not satisfied."
        },
        {
          title: "Saving preferences",
          content: "Your preferences including favorite products, saved searches, and style profile are automatically saved to your account and synced across all devices. You can customize your experience by setting your preferred measurement units, notification settings, and privacy preferences. All your Smart Rooms and product collections are also saved to your account for easy access anytime."
        },
      ],
    },
    {
      icon: Wrench,
      title: "Technical Troubleshooting",
      description: "Fix common issues and technical problems",
      articles: [
        {
          title: "AR not working properly",
          content: "If AR isn't working, first check that you've granted camera permissions to HomeView 360. Ensure you're using Chrome on Android or Safari on iOS. Make sure you're in a well-lit space with clear floor surfaces. Try restarting the app and clearing your browser cache. If issues persist, your device may not support ARCore (Android) or ARKit (iOS). Contact our support team for device-specific assistance."
        },
        {
          title: "Browser compatibility",
          content: "HomeView 360 works best on modern browsers. For AR features, use Chrome on Android (with WebXR support) or Safari on iOS (with AR Quick Look). Desktop browsing works on Chrome, Safari, Firefox, and Edge. Make sure your browser is updated to the latest version. Some older devices may have limited AR capabilities. Check our device compatibility guide for specific requirements."
        },
        {
          title: "Camera permissions",
          content: "AR features require camera access. On iOS, go to Settings > Safari > Camera and enable access for HomeView 360. On Android, go to Settings > Apps > Chrome > Permissions and enable camera access. If you previously denied permissions, you'll need to manually enable them in your device settings. Clear your browser cache and reload the page after changing permissions."
        },
        {
          title: "3D model loading issues",
          content: "If 3D models aren't loading, check your internet connection. Models require downloading 3D assets which may take a few seconds on slower connections. Try clearing your browser cache and cookies. Make sure you have enough available storage space on your device. If specific products aren't loading, they may be temporarily unavailable - try again later or contact support."
        },
        {
          title: "PWA installation help",
          content: "To install HomeView 360 as a PWA on iOS: tap the Share button, scroll down and tap 'Add to Home Screen'. On Android: tap the menu (three dots) and select 'Add to Home Screen' or look for the install prompt at the bottom of your screen. Once installed, the app will appear on your home screen like a native app and can work partially offline."
        },
      ],
    },
    {
      icon: ShoppingBag,
      title: "Product & Shopping",
      description: "Navigate the catalog and find the perfect furniture",
      articles: [
        {
          title: "Browsing the catalog",
          content: "Our catalog features furniture from multiple brands all in one place. Use the main navigation to explore different categories like sofas, tables, chairs, and decor. Products are organized by style, price, size, and brand. You can view products in grid or list view, and sort by newest, price, or popularity. Click on any product to see detailed information, 3D preview, and AR options."
        },
        {
          title: "Search and filters",
          content: "Use the search bar to find specific products or styles. You can search by product name, brand, style (e.g., 'modern gray sofa'), or features. Apply filters to narrow results by price range, dimensions, color, material, and brand. Use the dimension sliders to find furniture that fits your space perfectly. Save your searches for quick access later."
        },
        {
          title: "Product details and dimensions",
          content: "Each product page shows comprehensive information including dimensions, materials, colors, price, and brand details. View products in 3D by rotating the model, and see them in different lighting conditions. Dimensions are provided in both imperial and metric units. Check the 'Specifications' tab for detailed measurements, weight, and assembly requirements. Always verify dimensions before purchasing."
        },
        {
          title: "Comparing products",
          content: "Add products to your comparison list to view them side-by-side. Compare dimensions, prices, styles, and features all at once. You can compare up to 4 products at a time. This feature is especially useful when choosing between similar items or deciding which size works best for your space. Premium users can save unlimited comparisons."
        },
        {
          title: "Retailer links and purchasing",
          content: "HomeView 360 is a visualization tool, not a retailer. When you find a product you love, click 'View at Retailer' to visit the brand's website where you can complete your purchase. This ensures you get the best pricing, shipping options, and customer service directly from the source. We may earn affiliate commissions on purchases, which helps keep the app free and accessible."
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="min-h-[70vh] sm:min-h-[85vh] flex flex-col items-center justify-center relative px-4 sm:px-6 pt-8 pb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg mb-6"
          >
            <span className="text-xs sm:text-sm font-medium text-gray-800">24/7 Support & Resources</span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-5xl space-y-4 sm:space-y-6 md:space-y-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
                Get Help
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Stay Inspired
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 max-w-2xl mx-auto"
            >
              Comprehensive support and resources to help you bring your space to life
            </motion.p>
          </motion.div>
        </section>

        {/* Help Categories Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-12 sm:py-16 md:py-20 pb-24"
        >
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    {/* Category Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 rounded-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                          {category.title}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Article Accordion */}
                    <Accordion type="multiple" className="space-y-2">
                      {category.articles.map((article) => (
                        <AccordionItem key={article.title} value={article.title} className="border-none">
                          <AccordionTrigger className="text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:no-underline">
                            <span className="text-sm sm:text-base text-gray-700 font-medium pr-4">
                              {article.title}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-3 pb-3 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                            {article.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* FAQ Card */}
              <div className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Quick answers to common questions about HomeView 360
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors group"
                >
                  View FAQ
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </div>

              {/* Contact Card */}
              <div className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our support team is here to assist you with any questions
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors group"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Getting Started CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Explore our catalog and start visualizing your dream space in seconds
              </p>
              <Link href="/catalog">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                  >
                    Browse Catalog
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
