import type { MetadataRoute } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://greenkollar.com";
  const posts = getAllPosts();
  const categories = getAllCategories();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: post.frontmatter.featured ? 0.9 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${encodeURIComponent(cat)}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: `${baseUrl}/blog/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/blog/categories/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...postEntries,
    ...categoryEntries,
  ];
}
