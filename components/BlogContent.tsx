"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import PostCard from "./PostCard";
import NewsletterSignup from "./NewsletterSignup";
import type { PostMeta } from "@/lib/posts";
import Link from "next/link";

const CATEGORIES = [
  "Green Jobs & Hiring Tips",
  "Industry News & Trends",
  "Company Spotlights",
];

interface BlogContentProps {
  posts: PostMeta[];
}

function HeroOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-bold text-white text-base">{value}</span>
      <span className="text-gray-400">{label}</span>
    </div>
  );
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.frontmatter.title.toLowerCase().includes(q) ||
        p.frontmatter.description.toLowerCase().includes(q) ||
        p.frontmatter.author.toLowerCase().includes(q) ||
        p.frontmatter.tags?.some((t) => t.toLowerCase().includes(q));
      const matchCat = !activeCategory || p.frontmatter.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [posts, search, activeCategory]);

  const isFiltering = !!search || !!activeCategory;
  const featured = !isFiltering ? posts.find((p) => p.frontmatter.featured) : null;
  const gridPosts = isFiltering ? filtered : filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      {/* ── DARK ANIMATED HERO ─────────────────────────────────── */}
      <section ref={heroRef} className="relative bg-[#071307] overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 hero-grid-bg opacity-100 pointer-events-none" />

        {/* Animated orbs */}
        <HeroOrb className="top-[-80px] left-[10%] w-[500px] h-[500px] bg-green-500/20" delay={0} />
        <HeroOrb className="bottom-[-60px] right-[5%] w-[400px] h-[400px] bg-emerald-400/15" delay={2} />
        <HeroOrb className="top-[20%] right-[25%] w-[300px] h-[300px] bg-teal-500/10" delay={4} />

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              GreenKollar Insights
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Insights for the
            <br />
            <span className="text-gradient-green">Green Economy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed"
          >
            Career tips, industry analysis, and company spotlights for the next generation of green-collar workers.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-xl mb-10"
          >
            <div className="relative group">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-green-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, authors, topics…"
                className="w-full pl-11 pr-10 py-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/15 transition-all duration-200 text-sm"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-gray-300 text-xs transition-colors"
                  >
                    ×
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <StatPill value={`${posts.length}`} label="articles published" />
            <span className="w-px h-4 bg-gray-700" />
            <StatPill value="3" label="content categories" />
            <span className="w-px h-4 bg-gray-700" />
            <StatPill value="Weekly" label="fresh insights" />
            <span className="w-px h-4 bg-gray-700" />
            <StatPill value="100%" label="free forever" />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ── CONTENT AREA ───────────────────────────────────────── */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <FilterPill
              label="All Posts"
              active={!activeCategory}
              onClick={() => setActiveCategory("")}
            />
            {CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(activeCategory === cat ? "" : cat)}
              />
            ))}
          </motion.div>

          {/* Search results header */}
          <AnimatePresence>
            {isFiltering && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <p className="text-gray-500 text-sm">
                  {filtered.length === 0
                    ? "No articles found."
                    : `${filtered.length} article${filtered.length !== 1 ? "s" : ""} found`}
                  {search && <span> for &ldquo;<strong className="text-gray-800">{search}</strong>&rdquo;</span>}
                  {activeCategory && <span> in <strong className="text-gray-800">{activeCategory}</strong></span>}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured post */}
          <AnimatePresence>
            {featured && !isFiltering && (
              <motion.section
                key="featured"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-14"
              >
                <PostCard post={featured} featured />
              </motion.section>
            )}
          </AnimatePresence>

          {/* Post grid */}
          {gridPosts.length > 0 && (
            <section className="mb-16">
              {!isFiltering && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className="w-1 h-6 rounded-full bg-green-500" />
                  <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Latest Articles
                  </h2>
                </motion.div>
              )}

              <motion.div
                key={`${search}-${activeCategory}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {gridPosts.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i} />
                ))}
              </motion.div>
            </section>
          )}

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && isFiltering && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  No articles found
                </h3>
                <p className="text-gray-400 text-sm mb-6">Try a different search term or category</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory(""); }}
                  className="px-5 py-2.5 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Newsletter */}
          <NewsletterSignup variant="section" />
        </div>
      </div>
    </>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
        active
          ? "bg-green-500 text-white shadow-green-500/30 shadow-md"
          : "bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 rounded-full bg-green-500 -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
