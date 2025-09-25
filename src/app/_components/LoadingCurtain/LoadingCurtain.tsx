"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ShoppingBag } from "lucide-react"

interface LoadingCurtainProps {
  isLoading: boolean
  children: React.ReactNode
}

export default function LoadingCurtain({ isLoading, children }: LoadingCurtainProps) {
  return (
    <div className="relative min-h-screen">
      {/* Content with fade-in effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ 
          duration: 0.6, 
          delay: isLoading ? 0 : 0.8, // Wait for doors to finish opening
          ease: "easeOut"
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Loading Curtain */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }} // Fade out after doors open
            className="fixed inset-0 z-50 bg-emerald-600"
          >
            {/* Door panels */}
            <div className="absolute inset-0 flex">
              {/* Left door */}
              <motion.div
                initial={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2 
                }}
                className="w-1/2 h-full bg-emerald-700 relative"
              >
                {/* Door handle */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-2 h-8 bg-emerald-400 rounded-full opacity-60" />
              </motion.div>

              {/* Right door */}
              <motion.div
                initial={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2 
                }}
                className="w-1/2 h-full bg-emerald-700 relative"
              >
                {/* Door handle */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-8 bg-emerald-400 rounded-full opacity-60" />
              </motion.div>
            </div>

            {/* Center seam line */}
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-emerald-500/40" />

            {/* Loading content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* Logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-8"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-900/30">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 text-emerald-50 mb-6"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-lg font-medium tracking-wide">Loading...</span>
              </motion.div>

              {/* Bouncing dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-emerald-100 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
