"use client";

import { useState } from "react";

type TabKey = "about" | "readme" | "releases" | "contributors";

const TABS: { key: TabKey; label: string }[] = [
  { key: "about", label: "About" },
  { key: "readme", label: "Readme" },
  { key: "releases", label: "Releases" },
  { key: "contributors", label: "Contributors" },
];

interface ToolTabsProps {
  description: string;
  readme: string | null;
  topics: string[];
  repoUrl: string | null;
}

export function ToolTabs({ description, readme, topics, repoUrl }: ToolTabsProps) {
  const [active, setActive] = useState<TabKey>("about");

  const baseUrl = repoUrl ? repoUrl.replace(/\/+$/, "") : null;

  return (
    <section className="mt-8">
      <div
        className="flex gap-5 border-b border-ca-border"
        role="tablist"
        aria-label="Repository details"
      >
        {TABS.map((tab) => {
          const selected = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.key}`}
              onClick={() => setActive(tab.key)}
              className={`-mb-px border-b py-2 text-xs transition-colors ${
                selected
                  ? "border-ca-blue text-ca-text"
                  : "border-transparent text-ca-text-secondary hover:text-ca-text"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="pt-4 text-[13px] leading-relaxed text-ca-text-secondary"
      >
        {active === "about" && (
          <>
            <p className="whitespace-pre-line">{description}</p>
            {topics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-ca border border-ca-border2 px-1.5 py-0.5 font-mono text-[10px] text-ca-text-dim"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {active === "readme" && (
          <p className="whitespace-pre-line">
            {readme || "No README excerpt is available for this repository."}
          </p>
        )}

        {active === "releases" && (
          <p>
            Release history is not mirrored in this directory.{" "}
            {baseUrl && (
              <a
                href={`${baseUrl}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ca-blue-light hover:text-ca-blue"
              >
                View releases on GitHub ↗
              </a>
            )}
          </p>
        )}

        {active === "contributors" && (
          <p>
            Contributor insights live on GitHub.{" "}
            {baseUrl && (
              <a
                href={`${baseUrl}/graphs/contributors`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ca-blue-light hover:text-ca-blue"
              >
                View contributors on GitHub ↗
              </a>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
