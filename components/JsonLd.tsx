const BASE_URL = "https://greenkollar.com";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  category: string;
  image?: string;
}

export function ArticleJsonLd({ title, description, date, author, slug, category, image }: ArticleJsonLdProps) {
  const articleUrl = `${BASE_URL}/blog/${slug}/`;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "GreenKollar",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    url: articleUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    articleSection: category,
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${BASE_URL}/blog/` },
      { "@type": "ListItem", position: 2, name: category, item: `${BASE_URL}/blog/category/${encodeURIComponent(category)}/` },
      { "@type": "ListItem", position: 3, name: title, item: articleUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

export function BlogJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "GreenKollar Blog",
    description: "Career insights, industry news, and company spotlights for the green economy workforce.",
    url: `${BASE_URL}/blog/`,
    publisher: {
      "@type": "Organization",
      name: "GreenKollar",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GreenKollar",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "GreenKollar connects workers with sustainable, impactful careers in the green economy.",
    sameAs: [
      "https://twitter.com/greenkollar",
      "https://linkedin.com/company/greenkollar",
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
