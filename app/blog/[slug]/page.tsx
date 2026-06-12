import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import CategoryBadge from "@/components/CategoryBadge";
import ReadingTime from "@/components/ReadingTime";
import ReadingProgress from "@/components/ReadingProgress";
import NewsletterSignup from "@/components/NewsletterSignup";
import RelatedPosts from "@/components/RelatedPosts";
import { ArticleJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug);
    const { title, description, coverImage, date, author, category } = post.frontmatter;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: date,
        authors: [author],
        section: category,
        images: coverImage ? [{ url: coverImage, width: 1200, height: 630, alt: title }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(coverImage ? { images: [coverImage] } : {}),
      },
      alternates: {
        canonical: `https://greenkollar.com/blog/${params.slug}`,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const categoryGradients: Record<string, string> = {
  "Green Jobs & Hiring Tips": "from-green-600 via-emerald-700 to-teal-800",
  "Industry News & Trends": "from-cyan-700 via-sky-700 to-blue-800",
  "Company Spotlights": "from-amber-600 via-orange-700 to-rose-800",
};

export default function PostPage({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const { frontmatter, content, readingTime, slug } = post;
  const gradient = categoryGradients[frontmatter.category] ?? "from-green-700 to-emerald-800";

  return (
    <>
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        date={frontmatter.date}
        author={frontmatter.author}
        slug={slug}
        image={frontmatter.coverImage || undefined}
      />
      <ReadingProgress />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className={`relative bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Decorative grid */}
        <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none" />
        {/* Blur orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black/20 blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>›</span>
            <CategoryBadge category={frontmatter.category} size="sm" />
          </nav>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {frontmatter.title}
          </h1>

          <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
            {frontmatter.description}
          </p>

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-sm">
                {frontmatter.author[0]}
              </div>
              <span className="font-semibold text-white/90">{frontmatter.author}</span>
            </div>
            <span className="text-white/30">·</span>
            <time dateTime={frontmatter.date} className="text-white/70">{formatDate(frontmatter.date)}</time>
            <span className="text-white/30">·</span>
            <ReadingTime minutes={readingTime} className="text-white/60" />
          </div>

          {/* Tags */}
          {frontmatter.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ARTICLE ─────────────────────────────────────────── */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <article className="prose prose-lg max-w-none">
            <MDXRemote source={content} />
          </article>

          {/* Share row */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Found this helpful?</p>
              <p className="text-xs text-gray-400">Share it with your network.</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(`https://greenkollar.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-full transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://greenkollar.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED POSTS ────────────────────────────────────── */}
      <div className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <RelatedPosts currentSlug={slug} category={frontmatter.category} />
        </div>
      </div>

      {/* ── NEWSLETTER ───────────────────────────────────────── */}
      <div className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
          <NewsletterSignup variant="inline" />
        </div>
      </div>
    </>
  );
}
