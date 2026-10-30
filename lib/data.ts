import { cache } from "react";
import { CATEGORIES, getCategoryForTopic, type CategorySlug } from "@/lib/categories";
import { toToolListItem } from "@/lib/directory";
import { createServerComponentClient } from "@/lib/supabase";
import type { ToolListItem } from "@/lib/types";
import type { Software } from "@/types/database";

const PAGE_SIZE = 1000;

function logQueryFailure(operation: string, error: { code?: string; message?: string }) {
  console.error(`[directory] ${operation} failed`, {
    code: error.code,
    message: error.message,
  });
}

export const getDirectoryTools = cache(async (): Promise<ToolListItem[]> => {
  const supabase = createServerComponentClient();
  const rows: Software[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("software")
      .select("*")
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      logQueryFailure("directory query", error);
      throw new Error("Unable to load the directory.");
    }

    const page = (data ?? []) as unknown as Software[];
    if (page.length === 0) break;

    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }

  return rows.map(toToolListItem);
});

export const getToolByFullName = cache(
  async (fullName: string): Promise<Software | null> => {
    const supabase = createServerComponentClient();

    const { data, error } = await supabase
      .from("software")
      .select("*")
      .eq("full_name", fullName)
      .maybeSingle();

    if (error) {
      logQueryFailure("tool query", error);
      throw new Error("Unable to load this repository.");
    }

    return data ?? null;
  }
);

export interface CategoryOverview {
  slug: CategorySlug;
  name: string;
  description: string;
  count: number;
}

export interface CatalogOverview {
  total: number;
  categories: CategoryOverview[];
}

export const getCatalogOverview = cache(async (): Promise<CatalogOverview> => {
  const supabase = createServerComponentClient();
  const counts = new Map<CategorySlug, number>();
  const seen = new Set<string>();
  const pageSize = 1000;
  let total = 0;

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("software")
      .select("*")
      .range(from, from + pageSize - 1);

    if (error) {
      logQueryFailure("catalog query", error);
      throw new Error("Unable to load the catalog.");
    }

    const rows = (data ?? []) as unknown as Pick<Software, "id" | "topics">[];

    if (rows.length === 0) break;
    total += rows.length;

    for (const row of rows) {
      for (const topic of row.topics ?? []) {
        const category = getCategoryForTopic(topic);
        if (!category) continue;
        const key = `${row.id}:${category.slug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        counts.set(category.slug, (counts.get(category.slug) ?? 0) + 1);
      }
    }

    if (rows.length < pageSize) break;
  }

  return {
    total,
    categories: CATEGORIES.map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      count: counts.get(category.slug) ?? 0,
    })),
  };
});
