"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Plus, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface TopbarProps {
  query?: string;
  onQueryChange?: (query: string) => void;
  onReset?: () => void;
  showSearch?: boolean;
}

export function Topbar({
  query,
  onQueryChange,
  onReset,
  showSearch = true,
}: TopbarProps) {
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState("");
  const isControlled = typeof onQueryChange === "function";
  const value = isControlled ? (query ?? "") : localQuery;

  function handleChange(next: string) {
    if (isControlled) {
      onQueryChange?.(next);
    } else {
      setLocalQuery(next);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isControlled) return;

    const trimmed = value.trim().slice(0, 80);
    router.push(
      trimmed ? `/directory?q=${encodeURIComponent(trimmed)}` : "/directory"
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ca-border bg-ca-bg">
      <div className="mx-auto flex h-12 w-full max-w-[1400px] items-center gap-2 px-3 sm:gap-3 sm:px-4">
        <Link
          href="/directory"
          onClick={onReset}
          className="flex shrink-0 items-center gap-2"
          aria-label="ControlAlt home"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ca-blue"
            aria-hidden="true"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="text-sm font-medium tracking-tight text-ca-text">
            ControlAlt
          </span>
        </Link>

        <span aria-hidden="true" className="hidden h-4 w-px bg-ca-border2 lg:block" />
        <span className="hidden whitespace-nowrap text-xs text-ca-text-secondary lg:block">
          Open-Source Directory
        </span>

        {showSearch && (
          <form
            role="search"
            onSubmit={handleSubmit}
            className="relative ml-1 min-w-0 flex-1 sm:mx-2 sm:max-w-xl"
          >
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ca-text-dim"
            />
            <input
              type="search"
              value={value}
              onChange={(event) => handleChange(event.target.value)}
              placeholder="Search alternatives (e.g. Notion, Postman, Go, AGPL)"
              aria-label="Search open-source software"
              maxLength={80}
              className="h-8 w-full rounded-ca border border-ca-border bg-ca-surface pl-8 pr-3 font-mono text-[11px] text-ca-text placeholder:text-ca-text-dim focus:border-ca-blue focus:outline-none sm:text-xs"
            />
          </form>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ControlAlt on GitHub"
            title="GitHub"
            style={{ borderWidth: "0.5px" }}
            className="flex h-8 w-8 items-center justify-center rounded-ca border border-ca-border2 text-ca-text-secondary transition-colors hover:border-ca-blue hover:text-ca-blue-light"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Submit a tool on GitHub"
            className="flex h-8 items-center gap-1.5 rounded-ca bg-ca-blue px-2.5 text-xs font-medium text-ca-on-accent transition-colors hover:bg-ca-blue-light sm:px-3"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden md:inline">Submit tool</span>
          </a>
        </div>
      </div>
    </header>
  );
}
