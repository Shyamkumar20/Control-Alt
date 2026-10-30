import Link from "next/link";
import { ArrowRight, Boxes, Github, Search, Star } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const HIGHLIGHTS = [
  {
    icon: Github,
    title: "Live GitHub data",
    body: "Stars, forks, licenses and last-push dates are read from the source, not hand-typed.",
  },
  {
    icon: Search,
    title: "Find the replacement",
    body: "Search by the tool you're leaving behind — Notion, Postman, Figma — and see what's open.",
  },
  {
    icon: Boxes,
    title: "Self-host friendly",
    body: "Filter to Docker-ready projects, browse by language, or sort by real popularity.",
  },
];

export default function LandingPage() {
  return (
    <>
      <header className="border-b border-ca-border">
        <div className="mx-auto flex h-12 w-full max-w-[1400px] items-center gap-2 px-3 sm:px-4">
          <Brand />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <section className="mx-auto w-full max-w-[720px] px-4 pb-16 pt-20 text-center sm:pt-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ca-text-dim">
            Open-source directory · powered by live GitHub data
          </p>

          <h1 className="mt-5 text-[32px] font-semibold leading-[1.1] tracking-tight text-ca-text sm:text-[44px]">
            Take control.
            <br />
            <span className="text-ca-blue-light">Go open.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[520px] text-[13px] leading-relaxed text-ca-text-secondary sm:text-sm">
            A curated directory of open-source software. Browse by category,
            language and popularity, see how alive each project is, and pick the
            tools you can run on your own terms.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <Link
              href="/directory"
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-ca bg-ca-blue px-6 text-sm font-medium text-ca-on-accent transition-colors hover:bg-ca-blue-light sm:w-auto"
            >
              Enter the directory
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/categories"
              className="inline-flex h-11 w-full items-center justify-center rounded-ca border border-ca-border2 px-6 text-sm text-ca-text-secondary transition-colors hover:border-ca-blue hover:text-ca-blue-light sm:w-auto"
            >
              Browse categories
            </Link>
          </div>

          <p className="mt-4 font-mono text-[10px] text-ca-text-dim">
            No account needed · free to browse
          </p>
        </section>

        <section className="mx-auto w-full max-w-[900px] px-4 pb-24">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-card border border-ca-border bg-ca-surface p-4"
              >
                <Icon className="h-4 w-4 text-ca-blue" aria-hidden="true" />
                <h2 className="mt-3 text-xs font-medium text-ca-text">{title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-ca-text-secondary">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-1.5 font-mono text-[10px] text-ca-text-dim">
            <Star className="h-3 w-3" aria-hidden="true" />
            <span>Every entry is a real, public repository</span>
          </div>
        </section>
      </main>

      <footer className="border-t border-ca-border">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 text-[10px] text-ca-text-dim sm:flex-row">
          <span className="font-mono">ControlAlt</span>
          <Link
            href="/directory"
            className="transition-colors hover:text-ca-blue-light"
          >
            Skip the intro → open the directory
          </Link>
        </div>
      </footer>
    </>
  );
}

function Brand() {
  return (
    <Link
      href="/"
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
  );
}
