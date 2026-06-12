interface ArticleJsonLdProps {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  image?: string;
}

export function ArticleJsonLd({ title, description, date, author, slug, image }: ArticleJsonLdProps) {
  const baseUrl = "https://greenkollar.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "GreenKollar",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    url: `${baseUrl}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export function BlogJsonLd() {
  const baseUrl = "https://greenkollar.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "GreenKollar Blog",
    description: "Career insights, industry news, and company spotlights for the green economy workforce.",
    url: `${baseUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "GreenKollar",
      url: baseUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
