"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-sm sm:prose-base max-w-none">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using HomeView360 (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">2. Use of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                HomeView360 provides an augmented reality platform for visualizing furniture in your space. You agree to use the Service only for lawful purposes and in accordance with these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You must not use the Service in any way that causes, or may cause, damage to the Service or impairment of the availability or accessibility of the Service.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of HomeView360 and its licensors.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HomeView360.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall HomeView360, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">6. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms, please contact us at:{" "}
                <a href="mailto:legal@homeview360.com" className="text-blue-600 hover:text-blue-700 underline">
                  legal@homeview360.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
