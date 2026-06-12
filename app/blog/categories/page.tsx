import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Categories — GreenKollar",
  description: "Browse all GreenKollar blog categories: Green Jobs & Hiring Tips, Industry News & Trends, and Company Spotlights.",
  openGraph: {
    title: "Blog Categories — GreenKollar",
    description: "Browse all GreenKollar blog categories: Green Jobs & Hiring Tips, Industry News & Trends, and Company Spotlights.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Categories — GreenKollar",
    description: "Browse all GreenKollar blog categories for green economy career insights.",
  },
  alternates: {
    canonical: "https://greenkollar.com/blog/categories/",
  },
};

const categoryMeta: Record<string, { icon: string; description: string; color: string; gradient: string }> = {
  "Green Jobs & Hiring Tips": {
    icon: "🌱",
    description: "Practical career advice for landing, growing, and thriving in green-economy roles.",
    color: "text-green-700",
    gradient: "from-green-400 to-emerald-600",
  },
  "Industry News & Trends": {
    icon: "📈",
    description: "Data-driven analysis of where clean energy, climate tech, and sustainability industries are headed.",
    color: "text-sky-700",
    gradient: "from-cyan-400 to-blue-600",
  },
  "Company Spotlights": {
    icon: "🏢",
    description: "Inside looks at the companies building the green economy — their culture, hiring, and mission.",
    color: "text-amber-700",
    gradient: "from-amber-400 to-orange-600",
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-[#071307] overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-100 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-green-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-white/80">Categories</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Browse by <span className="text-gradient-green">Category</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Find exactly what you&apos;re looking for — career tips, industry trends, or company deep-dives.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Category cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const posts = getPostsByCategory(cat);
            const meta = categoryMeta[cat];
            return (
              <Link
                key={cat}
                href={`/blog/category/${encodeURIComponent(cat)}`}
                className="group block"
              >
                <article className="h-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Gradient top */}
                  <div className={`h-32 bg-gradient-to-br ${meta?.gradient ?? "from-green-400 to-emerald-600"} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">
                      {meta?.icon}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  {/* Body */}
                  <div className="p-5">
                    <h2
                      className={`text-lg font-bold mb-2 group-hover:text-green-600 transition-colors ${meta?.color ?? "text-gray-900"}`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {cat}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {meta?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">
                        {posts.length} article{posts.length !== 1 ? "s" : ""}
                      </span>
                      <span className="text-xs font-semibold text-green-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                        Browse →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
