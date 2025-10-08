"use client";

import { motion } from "framer-motion";
import { X, Share, Plus, MoreVertical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceInfo } from "./DeviceDetection";

interface InstallInstructionsProps {
  deviceInfo: DeviceInfo;
  onClose: () => void;
}

export default function InstallInstructions({ deviceInfo, onClose }: InstallInstructionsProps) {
  const getInstructions = () => {
    if (deviceInfo.isIOS) {
      return (
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-900 leading-relaxed">
                Tap the <Share className="inline h-4 w-4 text-blue-600 mx-0.5" /> <span className="font-semibold">Share</span> button in Safari
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-900 leading-relaxed">
                Scroll and tap <Plus className="inline h-4 w-4 text-blue-600 mx-0.5" /> <span className="font-semibold">&quot;Add to Home Screen&quot;</span>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-900 leading-relaxed">
                Tap <span className="font-semibold">&quot;Add&quot;</span> to complete installation
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (deviceInfo.isAndroid) {
      return (
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-100 rounded-xl">
            <div className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-900 leading-relaxed">
                Tap the <MoreVertical className="inline h-4 w-4 text-green-600 mx-0.5" /> <span className="font-semibold">menu</span> in Chrome
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-100 rounded-xl">
            <div className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-900 leading-relaxed">
                Tap <Download className="inline h-4 w-4 text-green-600 mx-0.5" /> <span className="font-semibold">&quot;Add to Home screen&quot;</span>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-100 rounded-xl">
            <div className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-900 leading-relaxed">
                Tap <span className="font-semibold">&quot;Install&quot;</span> to complete
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Desktop instructions
    return (
      <div className="space-y-3">
        <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-100 rounded-xl">
          <div className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm text-gray-900 leading-relaxed">
              Look for the <span className="font-semibold">install icon</span> in your address bar
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-100 rounded-xl">
          <div className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm text-gray-900 leading-relaxed">
              Click <span className="font-semibold">&quot;Install HomeView360&quot;</span> when prompted
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-100 rounded-xl">
          <div className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm text-gray-900 leading-relaxed">
              App will be added to your desktop
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 max-w-lg w-full sm:mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-xl font-bold text-black">Install HomeView360</h2>
            <p className="text-sm text-gray-600 mt-1">Get quick access from your home screen</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-9 w-9 p-0 hover:bg-gray-100 rounded-full -mt-1"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {getInstructions()}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            Get faster access and an app-like experience
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}