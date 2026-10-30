import Link from "next/link";
import { formatCompactNumber, sanitizePlainText } from "@/lib/format-utils";
import { getCategoryNameForTool, toolHref } from "@/lib/directory";
import { validateGitHubUrl } from "@/lib/url-validator";
import type { ToolListItem, ViewMode } from "@/lib/types";

interface ToolCardProps {
  tool: ToolListItem;
  view: ViewMode;
}

export function ToolCard({ tool, view }: ToolCardProps) {
  const description =
    sanitizePlainText(tool.description) || "No description provided.";
  const categoryName = getCategoryNameForTool(tool);
  const license =
    tool.license && tool.license.toUpperCase() !== "NOASSERTION"
      ? sanitizePlainText(tool.license)
      : null;
  const repoUrl = validateGitHubUrl(tool.htmlUrl);
  const href = toolHref(tool.fullName);

  if (view === "list") {
    return (
      <article className="rounded-card border border-ca-border bg-ca-surface px-3 py-2.5 transition-colors duration-150 hover:border-ca-blue">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 font-mono text-[10px] text-ca-text-dim">
              <span className="truncate">Category: {categoryName}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">Lang: {tool.language ?? "—"}</span>
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <Link
                href={href}
                title={tool.fullName}
                className="truncate text-[13px] font-medium leading-snug text-ca-text hover:text-ca-blue-light"
              >
                {tool.name}
              </Link>
              {license && <LicenseChip license={license} />}
            </div>
            <p className="mt-0.5 line-clamp-1 text-[11px] leading-relaxed text-ca-text-secondary">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
            <span className="font-mono text-[10px] text-ca-amber">
              ★ {formatCompactNumber(tool.stars)}
            </span>
            <span className="hidden font-mono text-[10px] text-ca-text-dim sm:inline">
              forks {formatCompactNumber(tool.forks)}
            </span>
            <CardActions href={href} repoUrl={repoUrl} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col rounded-card border border-ca-border bg-ca-surface p-3 transition-colors duration-150 hover:border-ca-blue">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] leading-none text-ca-text-dim">
        <span className="truncate">Category: {categoryName}</span>
        <span className="shrink-0 text-ca-amber">
          ★ {formatCompactNumber(tool.stars)}
        </span>
      </div>

      <div className="mt-2 flex items-start justify-between gap-2">
        <Link
          href={href}
          title={tool.fullName}
          className="min-w-0 truncate text-[15px] font-medium leading-snug text-ca-text hover:text-ca-blue-light"
        >
          {tool.name}
        </Link>
        {license && <LicenseChip license={license} />}
      </div>

      <p className="mt-1.5 line-clamp-2 text-xs leading-[1.5] text-ca-text-secondary">
        {description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
        <span className="truncate font-mono text-[10px] text-ca-text-dim">
          Lang: {tool.language ?? "—"}
        </span>
        <CardActions href={href} repoUrl={repoUrl} />
      </div>
    </article>
  );
}

function LicenseChip({ license }: { license: string }) {
  return (
    <span className="max-w-[110px] shrink-0 truncate rounded-ca border border-ca-border2 px-1.5 py-0.5 font-mono text-[10px] leading-none text-ca-text-secondary">
      {license}
    </span>
  );
}

function CardActions({
  href,
  repoUrl,
}: {
  href: string;
  repoUrl: string | null;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Link
        href={href}
        className="rounded-ca border border-ca-border2 px-2 py-1 font-mono text-[10px] leading-none text-ca-text-secondary transition-colors hover:border-ca-blue hover:text-ca-blue-light"
      >
        Specs
      </Link>
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-ca border border-ca-border2 px-2 py-1 font-mono text-[10px] leading-none text-ca-text-secondary transition-colors hover:border-ca-blue hover:text-ca-blue-light"
        >
          Repo ↗
        </a>
      )}
    </div>
  );
}
