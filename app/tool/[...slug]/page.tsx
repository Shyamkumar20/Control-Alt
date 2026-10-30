import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { ToolTabs } from "@/components/tool-tabs";
import { getToolByFullName } from "@/lib/data";
import { getToolCategory } from "@/lib/directory";
import {
  formatCompactNumber,
  formatNumber,
  formatRelativeTime,
  sanitizePlainText,
} from "@/lib/format-utils";
import { validateGitHubUrl, validateHttpsUrl } from "@/lib/url-validator";

export const dynamic = "force-dynamic";

interface ToolPageProps {
  params: Promise<{ slug: string[] }>;
}

const SEGMENT_PATTERN = /^[A-Za-z0-9_.-]+$/;

function normalizeFullName(slug: string[]): string | null {
  if (slug.length !== 2) return null;
  if (!slug.every((part) => part.length <= 100 && SEGMENT_PATTERN.test(part))) {
    return null;
  }
  return `${slug[0]}/${slug[1]}`;
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullName = normalizeFullName(slug);
  if (!fullName) return { title: "Tool not found" };

  try {
    const tool = await getToolByFullName(fullName);
    if (!tool) return { title: "Tool not found" };

    return {
      title: tool.name,
      description: sanitizePlainText(tool.description).slice(0, 160),
    };
  } catch {
    return { title: "Tool" };
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const fullName = normalizeFullName(slug);
  if (!fullName) notFound();

  const tool = await getToolByFullName(fullName);
  if (!tool) notFound();

  const description = sanitizePlainText(tool.description);
  const readme = sanitizePlainText(tool.readme_excerpt) || null;
  const license =
    tool.license_spdx && tool.license_spdx.toUpperCase() !== "NOASSERTION"
      ? sanitizePlainText(tool.license_spdx)
      : null;
  const category = getToolCategory({ topics: tool.topics ?? [] });
  const repoUrl = validateGitHubUrl(tool.html_url);
  const websiteUrl = validateHttpsUrl(tool.homepage);

  return (
    <>
      <Topbar />

      <main
        id="main"
        className="mx-auto w-full max-w-[860px] flex-1 px-3 pb-20 sm:px-4"
      >
        <div className="pt-5">
          <Link
            href="/directory"
            className="inline-flex items-center gap-1.5 text-xs text-ca-text-secondary transition-colors hover:text-ca-blue-light"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Directory
          </Link>
        </div>

        <header className="mt-4 border-b border-ca-border pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-ca-text">
              {tool.name}
            </h1>
            {license && (
              <span className="rounded-ca border border-ca-border2 px-1.5 py-0.5 font-mono text-[10px] leading-none text-ca-text-secondary">
                {license}
              </span>
            )}
            {category && (
              <span className="rounded-ca bg-ca-blue-dim px-1.5 py-0.5 font-mono text-[10px] leading-none text-ca-blue-light">
                Category: {category.name}
              </span>
            )}
          </div>

          <p className="mt-1 font-mono text-[11px] text-ca-text-dim">
            {fullName}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-ca-text-secondary">
            <span className="text-ca-amber">
              ★ {formatNumber(tool.stars)} stars
            </span>
            <span>forks {formatNumber(tool.forks)}</span>
            <span>Lang: {tool.language ?? "—"}</span>
            <span>Updated {formatRelativeTime(tool.pushed_at)}</span>
          </div>
        </header>

        <p className="mt-5 whitespace-pre-line text-[13px] leading-relaxed text-ca-text-secondary">
          {description || "No description provided for this repository."}
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-ca bg-ca-blue px-4 text-xs font-medium text-ca-on-accent transition-colors hover:bg-ca-blue-light sm:w-auto"
            >
              View on GitHub <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span className="flex h-9 w-full items-center justify-center rounded-ca border border-ca-border px-4 text-xs text-ca-text-dim sm:w-auto">
              GitHub link unavailable
            </span>
          )}

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-ca border border-ca-border2 px-4 text-xs text-ca-text-secondary transition-colors hover:border-ca-blue hover:text-ca-blue-light sm:w-auto"
            >
              Website <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <ToolTabs
          description={description || "No description provided for this repository."}
          readme={readme}
          topics={(tool.topics ?? []).slice(0, 12)}
          repoUrl={repoUrl}
        />

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-1 border-t border-ca-border pt-4 font-mono text-[10px] text-ca-text-dim">
          <span>Repo: {fullName}</span>
          <span>★ {formatCompactNumber(tool.stars)}</span>
          <span>Created {formatRelativeTime(tool.created_at)}</span>
        </div>
      </main>
    </>
  );
}
