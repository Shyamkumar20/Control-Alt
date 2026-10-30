import type { Metadata } from "next";
import { Topbar } from "@/components/topbar";
import { CategoryCard } from "@/components/category-card";
import { getCatalogOverview } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse open-source software by category.",
};

export default async function CategoriesPage() {
  const { categories, total } = await getCatalogOverview();

  return (
    <>
      <Topbar />

      <main
        id="main"
        className="mx-auto w-full max-w-[900px] flex-1 px-3 pb-20 sm:px-4"
      >
        <header className="border-b border-ca-border py-7">
          <h1 className="text-xl font-semibold tracking-tight text-ca-text">
            Browse by category
          </h1>
          <p className="mt-1 font-mono text-[11px] text-ca-text-dim">
            {total} tools · {categories.length} categories
          </p>
        </header>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              slug={category.slug}
              name={category.name}
              count={category.count}
            />
          ))}
        </div>
      </main>
    </>
  );
}
