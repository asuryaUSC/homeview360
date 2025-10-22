"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Smartphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogItem } from "@/types/catalog";
import { getDeviceInfo } from "@/components/pwa/DeviceDetection";
import { isPremiumUser } from "@/utils/premiumCheck";
import IOSARViewer from "./IOSARViewer";
import AndroidARViewer from "./AndroidARViewer";
import DesktopARModal from "./DesktopARModal";
import AdGateModal from "./AdGateModal";

interface ARButtonProps {
  product: CatalogItem;
}

export default function ARButton({ product }: ARButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDesktopModal, setShowDesktopModal] = useState(false);
  const [showAndroidViewer, setShowAndroidViewer] = useState(false);
  const [showAdGate, setShowAdGate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deviceInfo = getDeviceInfo();
  const isPremium = isPremiumUser();

  const handleARClick = async () => {
    if (!product.ar_compatible) {
      setError("AR not available for this product");
      return;
    }

    // Check if user is premium - if not, show ad gate first
    if (!isPremium) {
      setShowAdGate(true);
      return;
    }

    // Premium users skip ad and go straight to AR
    launchARExperience();
  };

  const launchARExperience = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // iOS Safari - Direct USDZ launch
      if (deviceInfo.isIOS && deviceInfo.browser === 'safari') {
        // iOS AR Quick Look will be handled by IOSARViewer component
        return;
      }

      // Android Chrome - WebXR GLB viewer
      if (deviceInfo.isAndroid && deviceInfo.browser === 'chrome') {
        setShowAndroidViewer(true);
        return;
      }

      // Mobile fallback - Show Android viewer for other mobile browsers
      if (deviceInfo.isMobile) {
        setShowAndroidViewer(true);
        return;
      }

      // Desktop - Show modal with QR code and instructions
      setShowDesktopModal(true);

    } catch (err) {
      setError("Failed to launch AR viewer");
      console.error("AR Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // For iOS Safari, render the special AR link
  if (deviceInfo.isIOS && deviceInfo.browser === 'safari') {
    return (
      <IOSARViewer
        product={product}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
      />
    );
  }

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-3"
      >
        <Button
          onClick={handleARClick}
          disabled={isLoading || !product.ar_compatible}
          size="lg"
          className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-4 text-base font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : deviceInfo.isDesktop ? (
            <Smartphone className="mr-2 h-5 w-5" />
          ) : (
            <Eye className="mr-2 h-5 w-5" />
          )}

          {isLoading ? "Loading AR..." : "View in AR"}
        </Button>

        <div className="text-sm text-gray-600">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : deviceInfo.isDesktop ? (
            <p>Scan QR code with your phone to view in AR</p>
          ) : (
            <p>See how this looks in your space</p>
          )}
        </div>
      </motion.div>

      {/* Desktop Modal */}
      {showDesktopModal && (
        <DesktopARModal
          product={product}
          isOpen={showDesktopModal}
          onClose={() => setShowDesktopModal(false)}
        />
      )}

      {/* Android AR Viewer */}
      {showAndroidViewer && (
        <AndroidARViewer
          product={product}
          isOpen={showAndroidViewer}
          onClose={() => setShowAndroidViewer(false)}
        />
      )}

      {/* Ad Gate Modal for non-premium users */}
      {showAdGate && (
        <AdGateModal
          isOpen={showAdGate}
          onClose={() => setShowAdGate(false)}
          onContinue={launchARExperience}
        />
      )}
    </>
  );
}