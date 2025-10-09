"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, QrCode, Eye, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogItem } from "@/types/catalog";
import Image from "next/image";
import QRCode from "qrcode";

interface DesktopARModalProps {
  product: CatalogItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function DesktopARModal({ product, isOpen, onClose }: DesktopARModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [productUrl, setProductUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Generate the product URL
      const url = `${window.location.origin}/catalog/${product.id}`;
      setProductUrl(url);

      // Generate QR code client-side (more reliable for Vercel)
      QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then((dataUrl) => {
        setQrCodeDataUrl(dataUrl);
      }).catch((err) => {
        console.error('QR code generation failed:', err);
      });

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, product.id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black rounded-lg">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View in AR</h3>
                <p className="text-sm text-gray-600">Use your phone for the best experience</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Product Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.thumbnail ? (
                  <Image
                    src={`/${product.thumbnail}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-400">
                      {getInitials(product.name)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">${product.price}</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Smartphone className="h-5 w-5" />
                <span className="font-medium">Step 1: Get your phone</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <QrCode className="h-5 w-5" />
                <span className="font-medium">Step 2: Scan the QR code</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Eye className="h-5 w-5" />
                <span className="font-medium">Step 3: Tap &quot;View in AR&quot;</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
                {qrCodeDataUrl ? (
                  <Image
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
                  </div>
                )}
              </div>
            </div>

            {/* URL Copy */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 text-center">
                Or copy this link to your phone:
              </p>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <code className="flex-1 text-sm text-gray-700 truncate">
                  {productUrl}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 text-center">
                  Link copied to clipboard!
                </p>
              )}
            </div>

            {/* AR Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-100 rounded">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 mb-1">AR Experience</h5>
                  <p className="text-sm text-blue-700">
                    Place and scale the {product.name} in your real space using your phone&apos;s camera.
                    Walk around to see it from every angle before you buy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>🍎 iOS: Safari</span>
              <span>•</span>
              <span>🤖 Android: Chrome</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}