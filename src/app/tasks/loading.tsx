"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    
    <div className="flex pt-10 flex-col items-center justify-center text-amber-600 transition-colors duration-800">
      
      {/* Animated Text */}
      <motion.p
        className="text-xl font-medium mb-6 "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Loading...
      </motion.p>

      {/* Spinner */}
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
