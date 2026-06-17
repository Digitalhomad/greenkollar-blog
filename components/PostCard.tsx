"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CategoryBadge from "./CategoryBadge";
import ReadingTime from "./ReadingTime";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
  index?: number;
}

const categoryGradients: Record<string, string> = {
  "Green Jobs & Hiring Tips": "from-green-400 via-emerald-500 to-teal-600",
  "Industry News & Trends": "from-cyan-400 via-sky-500 to-blue-600",
  "Company Spotlights": "from-amber-400 via-orange-500 to-rose-500",
  "5-Year Trend Reports": "from-violet-400 via-purple-500 to-indigo-600",
  "Country Spotlight": "from-lime-400 via-green-500 to-emerald-600",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const gradient = categoryGradients[frontmatter.category] ?? "from-green-400 to-emerald-600";

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Link href={`/blog/${slug}`} className="group block">
          <article className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />

            {/* Content */}
            <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
              {/* Top badges */}
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Featured
                </span>
                <CategoryBadge category={frontmatter.category} linkable={false} />
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight group-hover:text-green-200 transition-colors duration-300"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {frontmatter.title}
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl line-clamp-2">
                {frontmatter.description}
              </p>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {frontmatter.author[0]}
                </div>
                <span className="text-gray-300 font-medium">{frontmatter.author}</span>
                <span className="text-gray-500">·</span>
                <span>{formatDate(frontmatter.date)}</span>
                <span className="text-gray-500">·</span>
                <ReadingTime minutes={readingTime} />
                <motion.span
                  className="ml-auto inline-flex items-center gap-1 text-white/80 group-hover:text-white group-hover:gap-2 transition-all text-sm font-medium"
                  whileHover={{ x: 4 }}
                >
                  Read article →
                </motion.span>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={`/blog/${slug}`} className="group block h-full">
        <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300">
          {/* Color gradient header */}
          <div className={`relative h-44 w-full flex-shrink-0 bg-gradient-to-br ${gradient} overflow-hidden`}>
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/15" />
            <div className="absolute bottom-2 left-4 w-16 h-16 rounded-full bg-white/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-500" />

            {/* Category label in image */}
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                {frontmatter.category.split(" & ")[0]}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5">
            <div className="mb-3">
              <CategoryBadge category={frontmatter.category} linkable={false} />
            </div>

            <h3
              className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-green-600 transition-colors duration-200"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {frontmatter.title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
              {frontmatter.description}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-[10px] font-bold">
                  {frontmatter.author[0]}
                </div>
                <span className="font-medium text-gray-600 truncate max-w-[80px]">{frontmatter.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{formatDate(frontmatter.date)}</span>
                <span>·</span>
                <ReadingTime minutes={readingTime} />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
