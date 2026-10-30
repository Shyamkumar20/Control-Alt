import Link from "next/link";
import { categoryHref } from "@/lib/directory";
import type { CategorySlug } from "@/lib/categories";

interface CategoryCardProps {
  slug: CategorySlug;
  name: string;
  count: number;
}

export function CategoryCard({ slug, name, count }: CategoryCardProps) {
  return (
    <Link
      href={categoryHref(slug)}
      className="flex items-center justify-between gap-3 rounded-card border border-ca-border bg-ca-surface px-4 py-3.5 transition-colors duration-150 hover:border-ca-blue"
    >
      <span className="truncate text-[13px] font-medium text-ca-text">{name}</span>
      <span className="shrink-0 font-mono text-[11px] text-ca-text-dim">
        {count}
      </span>
    </Link>
  );
}
