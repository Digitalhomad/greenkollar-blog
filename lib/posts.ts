import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  description: string;
  coverImage: string;
  featured: boolean;
}

export interface Post {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
  readingTime: number;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: number;
}

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      readingTime: calcReadingTime(content),
    };
  });
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    frontmatter: data as PostFrontmatter,
    readingTime: calcReadingTime(content),
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.frontmatter.category));
  return Array.from(cats);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

export function getFeaturedPost(): PostMeta | null {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.featured) ?? posts[0] ?? null;
}
