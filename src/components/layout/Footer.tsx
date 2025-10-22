"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Catalog", href: "/catalog" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
    Support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  };

  return (
    <footer className="relative bg-transparent border-t border-gray-200/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-1 mb-4 sm:mb-0">
            <Link href="/" className="inline-flex items-center space-x-2 mb-3">
              <div
                className="relative transition-transform hover:scale-110 duration-300"
                style={{ width: "32px", height: "32px" }}
              >
                <Image
                  src="/logo.png"
                  alt="HomeView Logo"
                  width={500}
                  height={500}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-black leading-none">
                  HomeView
                </span>
                <span className="text-[10px] text-gray-500 leading-none">
                  360°
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
              Visualize furniture in your space before you buy. Transform your home shopping experience with AR technology.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">
              Product
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.Product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">
              Legal
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.Legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">
              Support
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.Support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 border-t border-gray-200/50">
          <div className="flex justify-center sm:justify-start">
            <p className="text-xs text-gray-600 text-center sm:text-left">
              © {currentYear} HomeView360. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
