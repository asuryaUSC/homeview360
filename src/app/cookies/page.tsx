import Navbar from "@/components/layout/Navbar";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-8 sm:p-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Last Updated: November 10, 2025
          </p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What Are Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How We Use Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                HomeView360 uses cookies for several important purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security features.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and preferences, such as your language choice and recently viewed items.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website through Google Analytics and similar services.
                </li>
                <li>
                  <strong>Recommendation Cookies:</strong> Store your browsing history to provide personalized furniture recommendations.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Types of Cookies We Use
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  1. Session Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  These temporary cookies expire when you close your browser. We use them to maintain your session and ensure secure authentication through Clerk.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2. Persistent Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies remain on your device for a set period or until you delete them. They include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">homeview360_session</code> - Tracks your browsing session (365 days)</li>
                  <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">homeview360_tracking</code> - Stores product views and preferences (90 days)</li>
                  <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">homeview360_cookie_consent</code> - Records your cookie preferences (365 days)</li>
                  <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">homeview360_popularity</code> - Stores product popularity data (persistent)</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  3. Third-Party Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We use services from trusted third parties that may set their own cookies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Google Analytics:</strong> Tracks website usage and performance</li>
                  <li><strong>Vercel Analytics:</strong> Monitors site performance and reliability</li>
                  <li><strong>Clerk:</strong> Manages user authentication and security</li>
                  <li><strong>Google AdSense:</strong> Delivers relevant advertisements</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Cookie Choices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Accept or decline cookies through our cookie banner when you first visit</li>
                <li>Change your cookie preferences at any time by clearing your browser&apos;s localStorage</li>
                <li>Configure your browser to refuse all cookies or alert you when cookies are being sent</li>
                <li>Delete cookies that have already been set through your browser settings</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Note:</strong> Blocking or deleting cookies may affect your experience on our website. Some features, such as personalized recommendations and saved preferences, may not function properly without cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Managing Cookies in Your Browser
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most browsers allow you to control cookies through their settings. Here&apos;s how to manage cookies in popular browsers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We automatically clean up old tracking data to protect your privacy. Product views and search history older than 90 days are automatically deleted from our system.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <p className="text-gray-700 mt-4">
                <strong>Email:</strong> privacy@homeview360.app<br />
                <strong>Website:</strong> homeview360.app
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by updating the &quot;Last Updated&quot; date at the top of this policy.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
