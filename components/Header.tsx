"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function GreenKollarLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/blog" className="flex items-center gap-2.5 group">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <circle cx="18" cy="10" r="5.5" fill={dark ? "white" : "#1a1a1a"} />
        <path d="M7 32 C7 24 11 20 18 20 C25 20 29 24 29 32" fill={dark ? "white" : "#1a1a1a"} />
        <path d="M9 32 C9 26 13 22.5 18 22.5 C23 22.5 27 26 27 32" fill={dark ? "white" : "#1a1a1a"} />
        <path
          d="M14 21.5 L18 27 L22 21.5 C20.5 20.5 19 20 18 20 C17 20 15.5 20.5 14 21.5Z"
          fill="#22c55e"
        />
        <path
          d="M13.5 21 L18 26.5 L14.5 23 C14 22.2 13.7 21.6 13.5 21Z"
          fill="#16a34a"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        <span style={{ color: dark ? "white" : "#1a1a1a" }}>Green</span>
        <span style={{ color: "#22c55e" }}>Kollar</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <GreenKollarLogo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Categories", href: "/blog/categories" },
              { label: "About GreenKollar", href: "/about" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-500 transition-all duration-200 group-hover:w-full rounded-full" />
              </Link>
            ))}
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 animate-pulse-green"
            >
              Find Green Jobs →
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-gray-100 flex flex-col gap-3">
                {[
                  { label: "Blog", href: "/blog" },
                  { label: "Categories", href: "/blog/categories" },
                  { label: "About GreenKollar", href: "/about" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-green-600 py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors mt-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Find Green Jobs →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
