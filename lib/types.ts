import type { CategorySlug } from "@/lib/categories";

export interface ToolListItem {
  id: number;
  fullName: string;
  name: string;
  description: string;
  license: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  htmlUrl: string;
  createdAt: string;
  pushedAt: string;
}

export type PopularityBucket = "any" | "10k" | "1k" | "under1k";

export type DirectoryTab = "all" | "trending" | "docker" | "recent";

export type ViewMode = "grid" | "list";

export interface DirectoryFilters {
  query: string;
  category: CategorySlug | "all";
  language: string;
  popularity: PopularityBucket;
  tab: DirectoryTab;
}

export interface Facet {
  value: string;
  label: string;
  count: number;
}
