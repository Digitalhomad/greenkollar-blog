import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: encodeURIComponent(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} — GreenKollar Blog`,
    description: `Browse all GreenKollar articles about ${category}. Career insights and news for the green economy.`,
    openGraph: {
      title: `${category} — GreenKollar Blog`,
      description: `Browse all GreenKollar articles in the "${category}" category.`,
    },
    alternates: {
      canonical: `https://greenkollar.com/blog/category/${encodeURIComponent(category)}`,
    },
  };
}

const categoryBannerGradients: Record<string, string> = {
  "Green Jobs & Hiring Tips": "from-green-600 to-emerald-700",
  "Industry News & Trends": "from-sky-600 to-blue-700",
  "Company Spotlights": "from-amber-500 to-orange-600",
};

export default function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);
  const allCategories = getAllCategories();

  if (posts.length === 0) notFound();

  const gradient = categoryBannerGradients[category] ?? "from-green-600 to-emerald-700";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className={`relative bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-white/80">Categories</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={category} linkable={false} size="md" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {category}
          </h1>
          <p className="text-white/70 text-base">
            {posts.length} article{posts.length !== 1 ? "s" : ""} published
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category switcher */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700 transition-colors shadow-sm"
          >
            All Posts
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all duration-200 ${
                cat === category
                  ? "bg-green-500 text-white border-green-500 shadow-green-500/30 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
