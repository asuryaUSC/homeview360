"use client";

import { motion } from "framer-motion";
import { Layers, Plus, Lock } from "lucide-react";
import Link from "next/link";

// Placeholder data for demo
const demoRooms = [
  {
    id: "1",
    name: "Living Room",
    itemCount: 5,
    thumbnail: "/placeholder-room.jpg",
    lastModified: "2 days ago",
  },
  {
    id: "2",
    name: "Master Bedroom",
    itemCount: 3,
    thumbnail: "/placeholder-room.jpg",
    lastModified: "1 week ago",
  },
];

export default function RoomsPage() {
  const isPremium = false; // TODO: Connect to Clerk auth/subscription
  const roomCount = demoRooms.length;
  const maxFreeRooms = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-white mb-1">Smart Rooms</h1>
          <p className="text-sm text-gray-400">
            Save and visualize your furniture layouts
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Room Count & Limit */}
        <div className="mb-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Your rooms</p>
              <p className="text-2xl font-bold text-white">
                {roomCount} / {isPremium ? "∞" : maxFreeRooms}
              </p>
            </div>
            {!isPremium && (
              <Link
                href="/pricing"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* Create New Room Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={!isPremium && roomCount >= maxFreeRooms}
          className={`w-full p-6 mb-6 rounded-2xl border-2 border-dashed transition-all ${
            !isPremium && roomCount >= maxFreeRooms
              ? "border-gray-700 bg-gray-800/20 opacity-50 cursor-not-allowed"
              : "border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50 active:scale-[0.98]"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            {!isPremium && roomCount >= maxFreeRooms ? (
              <>
                <Lock className="w-8 h-8 text-gray-600" />
                <div className="text-center">
                  <p className="font-semibold text-gray-400">
                    Room limit reached
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Upgrade to Premium for unlimited rooms
                  </p>
                </div>
              </>
            ) : (
              <>
                <Plus className="w-8 h-8 text-gray-400" />
                <div className="text-center">
                  <p className="font-semibold text-white">Create New Room</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Start visualizing your space
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.button>

        {/* Rooms List */}
        {demoRooms.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Your Rooms
            </h2>
            {demoRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/rooms/${room.id}`}
                  className="block group"
                >
                  <div className="p-4 bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 rounded-2xl hover:border-gray-600 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-gray-700/50 flex items-center justify-center">
                        <Layers className="w-8 h-8 text-gray-500" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-gray-100 transition-colors mb-1">
                          {room.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {room.itemCount} item{room.itemCount !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Modified {room.lastModified}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
              <Layers className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No rooms yet
            </h2>
            <p className="text-gray-400 max-w-sm">
              Create your first Smart Room to start visualizing furniture in your
              space
            </p>
          </motion.div>
        )}

        {/* Feature Info */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-2xl">
          <h3 className="font-semibold text-white mb-3">
            Coming Soon: Full AR Experience
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Place furniture in AR and save layouts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Share rooms with friends for feedback</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Switch lighting presets (day/night)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Get AI style recommendations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
