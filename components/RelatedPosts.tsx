import { getAllPosts } from "@/lib/posts";
import PostCard from "./PostCard";
import { motion } from "framer-motion";

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

export default function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const all = getAllPosts();
  const related = all
    .filter((p) => p.slug !== currentSlug && p.frontmatter.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1 h-6 rounded-full bg-green-500" />
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          More in {category}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
