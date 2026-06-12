import Link from "next/link";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Green Jobs & Hiring Tips": {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  "Industry News & Trends": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "Company Spotlights": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
};

interface CategoryBadgeProps {
  category: string;
  linkable?: boolean;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, linkable = true, size = "sm" }: CategoryBadgeProps) {
  const colors = categoryColors[category] ?? {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
  };

  const sizeClass = size === "md"
    ? "text-sm px-3 py-1.5 font-semibold"
    : "text-xs px-2.5 py-1 font-medium";

  const className = `inline-flex items-center rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizeClass} tracking-wide`;

  if (linkable) {
    return (
      <Link
        href={`/blog/category/${encodeURIComponent(category)}`}
        className={`${className} hover:opacity-80 transition-opacity`}
      >
        {category}
      </Link>
    );
  }

  return <span className={className}>{category}</span>;
}
