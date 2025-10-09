"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogItem } from "@/types/catalog";


interface AndroidARViewerProps {
  product: CatalogItem;
  isOpen: boolean;
  onClose: () => void;
}


export default function AndroidARViewer({ product, isOpen, onClose }: AndroidARViewerProps) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Dynamically load model-viewer
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
        // Clean up script if needed
        const existingScript = document.querySelector('script[src*="model-viewer"]');
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
      };
    }
  }, [isOpen]);

  const handleModelLoad = () => {
    setIsModelLoaded(true);
    setError(null);
  };

  const handleModelError = () => {
    setError("Failed to load 3D model");
    setIsModelLoaded(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-lg">
          <div className="flex items-center justify-between p-4">
            <div className="text-white">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-300">AR Viewer</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {!isModelLoaded && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Loading 3D Model...</p>
              <p className="text-sm text-gray-400 mt-2">
                File size: {product.models.glb_size_mb} MB
              </p>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            <div className="text-center text-white">
              <p className="text-lg text-red-400 mb-4">{error}</p>
              <Button
                onClick={onClose}
                className="bg-white text-black hover:bg-gray-200"
              >
                Close
              </Button>
            </div>
          </motion.div>
        )}

        {/* Model Viewer */}
        {React.createElement('model-viewer', {
          src: `/${product.models.glb}`,
          alt: product.name,
          ar: true,
          'ar-modes': 'webxr scene-viewer quick-look',
          'camera-controls': true,
          'auto-rotate': true,
          'shadow-intensity': '1',
          exposure: '1',
          'environment-image': 'neutral',
          style: {
            width: '100%',
            height: '100%',
            backgroundColor: '#000000'
          },
          onLoad: handleModelLoad,
          onError: handleModelError
        }, 
          /* AR Button */
          React.createElement(Button, {
            slot: 'ar-button',
            className: 'absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-medium'
          }, 'View in your space'),

          /* Loading indicator */
          React.createElement('div', {
            slot: 'progress-bar',
            className: 'absolute bottom-20 left-1/2 transform -translate-x-1/2'
          }, 
            React.createElement('div', {
              className: 'bg-white/20 rounded-full h-2 w-48'
            },
              React.createElement('div', {
                className: 'bg-white h-2 rounded-full transition-all duration-300'
              })
            )
          )
        )}

        {/* Controls */}
        {isModelLoaded && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 right-4 flex flex-col space-y-2"
          >
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
              onClick={() => {
                const modelViewer = document.querySelector('model-viewer');
                if (modelViewer) {
                  // @ts-expect-error - Model viewer resetTurntableRotation method not typed
                  modelViewer.resetTurntableRotation();
                }
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Instructions */}
        {isModelLoaded && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-20 left-4 right-4 text-center"
          >
            <div className="bg-black/50 backdrop-blur-lg rounded-lg p-3 text-white text-sm">
              <p>Drag to rotate • Pinch to zoom • Tap &quot;View in your space&quot; for AR</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}