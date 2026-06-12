"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterSignupProps {
  variant?: "inline" | "section";
}

export default function NewsletterSignup({ variant = "section" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl overflow-hidden ${variant === "section" ? "py-16 px-6 md:px-16" : "py-10 px-6 md:px-10"}`}
      style={{ background: "linear-gradient(135deg, #14532d 0%, #15803d 40%, #22c55e 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 hero-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-5 shadow-xl"
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                You&apos;re in! 🌱
              </h3>
              <p className="text-green-100 text-base">
                Green economy insights are heading to your inbox. Welcome aboard!
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest border border-white/20">
                🌿 Weekly Newsletter
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Stay ahead of the<br className="hidden sm:block" /> green economy
              </h2>
              <p className="text-green-100 text-base mb-8 leading-relaxed max-w-lg mx-auto">
                Weekly insights on green jobs, sustainable industries, and career tips — straight to your inbox. Free forever.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <motion.div
                  className="flex-1 relative"
                  animate={{ scale: focused ? 1.02 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full px-4 py-3.5 rounded-xl text-gray-900 text-sm placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-white/60 shadow-lg"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, backgroundColor: "#111" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 bg-[#0f1a0f] hover:bg-gray-800 text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap shadow-lg"
                >
                  Subscribe →
                </motion.button>
              </form>
              <p className="mt-4 text-xs text-green-100/60">
                No spam, ever. Unsubscribe at any time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
