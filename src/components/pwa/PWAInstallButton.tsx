"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDeviceInfo, isStandalone, type DeviceInfo } from "./DeviceDetection";
import InstallInstructions from "./InstallInstructions";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallButton() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isIOS: false,
    isAndroid: false,
    isMobile: false,
    isDesktop: true,
    browser: 'other',
    canInstallPWA: false
  });
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setDeviceInfo(getDeviceInfo());
    setIsInstalled(isStandalone());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Chrome/Edge automatic install
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    } else {
      // Show manual instructions
      setShowInstructions(true);
    }
  };

  // Don't show if already installed or not mounted
  if (!isMounted || isInstalled) {
    return null;
  }

  const getButtonIcon = () => {
    if (deviceInfo.isMobile) {
      return <Smartphone className="mr-2 h-4 w-4" />;
    }
    return <Monitor className="mr-2 h-4 w-4" />;
  };

  const getButtonText = () => {
    if (deviceInfo.isIOS) return "Add to Home Screen";
    if (deviceInfo.isAndroid) return "Install App";
    return "Install App";
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button
          onClick={handleInstallClick}
          className="bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-800 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          size="lg"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
            transition={{ duration: 0.6 }}
          />

          {getButtonIcon()}
          {getButtonText()}
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {showInstructions && (
          <InstallInstructions
            deviceInfo={deviceInfo}
            onClose={() => setShowInstructions(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}