"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const lastUpdated = "November 10, 2025";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-sm sm:prose-base max-w-none">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, and usage data.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We also automatically collect certain information about your device when you use our Service, including IP address, browser type, operating system, and usage patterns.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and improve user experience</li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Export your data</li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">6. Children&apos;s Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">7. Changes to Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:privacy@homeview360.com" className="text-blue-600 hover:text-blue-700 underline">
                  privacy@homeview360.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
