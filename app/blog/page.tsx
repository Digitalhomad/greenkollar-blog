import { getAllPosts } from "@/lib/posts";
import BlogContent from "@/components/BlogContent";
import { BlogJsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GreenKollar Blog — Green Economy Insights",
  description:
    "Career tips, industry news, and company spotlights for green economy job seekers and professionals. Join 10,000+ green workers reading weekly.",
  openGraph: {
    title: "GreenKollar Blog — Green Economy Insights",
    description: "Career tips, industry news, and spotlights for the next-gen green workforce.",
    type: "website",
    siteName: "GreenKollar",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenKollar Blog — Green Economy Insights",
    description: "Career tips, industry news, and spotlights for the next-gen green workforce.",
  },
  alternates: {
    canonical: "https://greenkollar.com/blog/",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <BlogJsonLd />
      <BlogContent posts={posts} />
    </>
  );
}
