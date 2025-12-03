"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function FAQPage() {
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
            <span className="text-xs sm:text-sm font-medium text-gray-800">Quick Answers</span>
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
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 max-w-2xl mx-auto"
            >
              Find answers to common questions about HomeView 360
            </motion.p>
          </motion.div>
        </section>

        {/* FAQ Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-12 sm:py-16 md:py-20 max-w-4xl mx-auto pb-24"
        >
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg">
            <Accordion type="multiple" className="w-full">
              {/* General Questions */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">General Questions</h2>

                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">What is HomeView 360?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    HomeView 360 is a web-based and mobile-optimized Progressive Web App that lets you visualize furniture from multiple brands directly inside your own rooms using augmented reality (AR). It combines AR placement, personalized style recommendations, lighting simulation, and social sharing to make furniture shopping more engaging and accurate. With our cross-brand catalog and Smart Rooms feature, you can explore, compare, and style your space with confidence.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">How does the AR feature work?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Our AR feature uses WebXR for Android devices and USDZ Quick Look for iOS to provide cross-platform augmented reality experiences. Simply tap the AR button on any product page, grant camera permissions when prompted, and point your device at the floor or surface where you want to place the furniture. The app will detect the surface and let you position, rotate, and scale the 3D model in real-time within your actual space.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">Is HomeView 360 free to use?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes! HomeView 360 offers a freemium model with three tiers:
                    <br /><br />
                    <strong>Free:</strong> Limited catalog access, 3 AR placements per day, 3 Smart Rooms, watermarked screenshots.
                    <br /><br />
                    <strong>Premium ($5.99/month):</strong> Unlimited AR placements and room saves, full catalog access, lighting presets, AI style suggestions, and shareable links without watermarks.
                    <br /><br />
                    <strong>Pro ($14.99/month):</strong> All Premium features plus designer tools, client viewing links, and advanced measurement features.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">Can I use this on my phone?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Absolutely! HomeView 360 is a Progressive Web App (PWA) optimized for both mobile and desktop devices. You can install it on your phone like a native app by tapping the &ldquo;Add to Home Screen&rdquo; button in your browser, or simply use it directly in your mobile browser. The responsive design ensures a seamless experience across all screen sizes.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Account & Subscription */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Account & Subscription</h2>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">How do I create an account?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Creating an account is quick and easy. Click the &ldquo;Sign Up&rdquo; button in the navigation bar, and you&apos;ll be guided through our secure sign-up process powered by Clerk. You can sign up with your email address or use social login options. Once registered, you&apos;ll have immediate access to all Free tier features and can upgrade anytime to unlock Premium or Pro capabilities.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">What&apos;s included in the Premium plan?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The Premium plan ($5.99/month) includes:
                    <br /><br />
                    • Unlimited AR placements (no daily limits)
                    <br />
                    • Unlimited Smart Room saves
                    <br />
                    • Full access to our entire furniture catalog
                    <br />
                    • Lighting presets (day, night, warm, cool)
                    <br />
                    • AI Style Companion for personalized recommendations
                    <br />
                    • Shareable room links with no watermarks
                    <br />
                    • Priority customer support
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">What&apos;s included in the Pro plan?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The Pro plan ($14.99/month) includes everything in Premium, plus:
                    <br /><br />
                    • Advanced designer tools and editing features
                    <br />
                    • Client viewing links for professional collaboration
                    <br />
                    • Precise measurement and dimension tools
                    <br />
                    • Export options for presentations and proposals
                    <br />
                    • Analytics and insights on room views
                    <br />
                    • Dedicated account management
                    <br /><br />
                    Perfect for interior designers, architects, and furniture professionals.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left">Can I cancel my subscription anytime?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes! There are no long-term commitments with HomeView 360. You can cancel your Premium or Pro subscription at any time from your account settings. If you cancel, you&apos;ll continue to have access to your paid features until the end of your billing period, and then you&apos;ll automatically revert to the Free tier. Your saved rooms and preferences will be preserved.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Using the App */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Using the App</h2>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left">How do I create a Smart Room?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Creating a Smart Room is simple:
                    <br /><br />
                    1. Browse our catalog and find furniture pieces you like
                    <br />
                    2. Click &ldquo;Add to Room&rdquo; on any product page
                    <br />
                    3. Use AR to place the item in your actual space, or add it to a virtual room
                    <br />
                    4. Continue adding more items to build your complete room layout
                    <br />
                    5. Click &ldquo;Save Room&rdquo; and give it a name
                    <br /><br />
                    Your Smart Room is now saved and can be reopened, edited, or shared anytime. Smart Rooms are portable and not bound to a physical space, so you can access them from anywhere.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left">Can I share my room designs?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes! Premium and Pro subscribers can generate shareable links for any Smart Room. Simply open your saved room, click the &ldquo;Share&rdquo; button, and copy the link. You can share this link via email, text, or social media, and anyone with the link can view your room design. This is perfect for getting feedback from friends, family, or clients. Free tier users can share screenshots, though they will include a small watermark.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-left">What are lighting presets?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Lighting presets let you see how furniture looks under different lighting conditions. Choose from day, night, warm, or cool lighting environments to understand how colors and textures will appear in various settings. This feature uses HDRI environment maps and WebXR light estimation to simulate realistic lighting effects, helping you make more informed decisions about how furniture will look in your home throughout the day.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger className="text-left">How accurate are the dimensions?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Product dimensions are provided directly by the furniture brands and retailers in our catalog, ensuring accuracy. When you use AR placement, our app uses real-world scale and your device&apos;s sensors to position items at their true size. This means what you see in AR is a true-to-scale representation of the actual furniture. We recommend double-checking critical dimensions in your space before purchasing.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Technical */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Technical</h2>

                <AccordionItem value="item-13">
                  <AccordionTrigger className="text-left">Which browsers are supported?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    HomeView 360 works best on modern browsers including Chrome, Safari, and Edge. For the full AR experience:
                    <br /><br />
                    • <strong>Android:</strong> Chrome browser with WebXR support (most devices from 2019 onwards)
                    <br />
                    • <strong>iOS:</strong> Safari with AR Quick Look support (iOS 12 and later)
                    <br />
                    • <strong>Desktop:</strong> Chrome, Safari, Firefox, or Edge for catalog browsing and room planning
                    <br /><br />
                    Make sure your browser is updated to the latest version for the best experience.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger className="text-left">Why isn&apos;t AR working?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    If AR isn&apos;t working, try these troubleshooting steps:
                    <br /><br />
                    1. <strong>Check camera permissions:</strong> Make sure you&apos;ve granted HomeView 360 access to your camera
                    <br />
                    2. <strong>Verify browser compatibility:</strong> Ensure you&apos;re using Chrome (Android) or Safari (iOS)
                    <br />
                    3. <strong>HTTPS requirement:</strong> AR features require a secure connection (HTTPS)
                    <br />
                    4. <strong>Device compatibility:</strong> Check that your device supports ARCore (Android) or ARKit (iOS)
                    <br />
                    5. <strong>Lighting conditions:</strong> Make sure you&apos;re in a well-lit space with clear floor surfaces
                    <br /><br />
                    If issues persist, contact our support team for assistance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-15">
                  <AccordionTrigger className="text-left">Can I use this offline?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    As a Progressive Web App, HomeView 360 offers limited offline functionality. Once you&apos;ve visited the app, you can browse previously loaded catalog items and view saved rooms offline. However, AR placement, new product searches, and syncing saved rooms across devices require an internet connection. We cache key assets to make the offline experience as smooth as possible.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-16">
                  <AccordionTrigger className="text-left">How do I install the app?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Installing HomeView 360 as a PWA is easy:
                    <br /><br />
                    <strong>iOS (Safari):</strong>
                    <br />
                    1. Tap the Share button at the bottom of the screen
                    <br />
                    2. Scroll down and tap &ldquo;Add to Home Screen&rdquo;
                    <br />
                    3. Name the app and tap &ldquo;Add&rdquo;
                    <br /><br />
                    <strong>Android (Chrome):</strong>
                    <br />
                    1. Look for the &ldquo;Install&rdquo; prompt at the top or bottom of the screen
                    <br />
                    2. Tap &ldquo;Install&rdquo; or tap the menu (three dots) and select &ldquo;Add to Home Screen&rdquo;
                    <br />
                    3. Confirm the installation
                    <br /><br />
                    Once installed, HomeView 360 will appear on your home screen like a native app!
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Shopping & Products */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Shopping & Products</h2>

                <AccordionItem value="item-17">
                  <AccordionTrigger className="text-left">Where do the products come from?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Our catalog features furniture from multiple trusted brands and retailers, all in one place. We partner with leading furniture companies to provide a diverse, brand-agnostic selection so you can compare products across different retailers without visiting multiple websites. Each product listing includes detailed information, 3D models, and direct links to the retailer&apos;s website for purchasing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-18">
                  <AccordionTrigger className="text-left">Can I buy directly through HomeView 360?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    HomeView 360 is a visualization and discovery tool, not a direct retailer. When you find a product you love, we provide direct links to the retailer&apos;s website where you can complete your purchase. This ensures you get the best pricing, shipping options, and customer service directly from the source. We may earn affiliate commissions on purchases made through our links, which helps us keep the app free and accessible.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-19">
                  <AccordionTrigger className="text-left">How often is the catalog updated?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    We regularly update our catalog with new products, brands, and collections. Retailer partners can add or update items through our Retailer Dashboard, and we typically refresh our featured collections monthly. Premium and Pro subscribers get early access to new collections and exclusive product launches. You can subscribe to notifications in your account settings to stay informed about new additions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-20">
                  <AccordionTrigger className="text-left">Can I request a specific product?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes! We love hearing from our users about products they&apos;d like to see in HomeView 360. You can submit product requests through our Contact Us page or by emailing contact@homeview.app. While we can&apos;t guarantee that every requested product will be added, we review all suggestions and work with our retail partners to expand our catalog based on user demand. Popular requests are prioritized.
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 via-amber-400 to-orange-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Contact Support
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
