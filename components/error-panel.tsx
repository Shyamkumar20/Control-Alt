"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ErrorPanelProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorPanel({ error, reset }: ErrorPanelProps) {
  useEffect(() => {
    console.error(
      `Application error${error.digest ? ` (digest: ${error.digest})` : ""}`
    );
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <AlertTriangle className="h-6 w-6 text-ca-amber" aria-hidden="true" />
      <h1 className="mt-4 text-base font-medium text-ca-text">
        Something went wrong
      </h1>
      <p className="mt-1.5 text-xs leading-relaxed text-ca-text-secondary">
        We couldn&apos;t load this part of the directory. The data source may be
        temporarily unavailable.
      </p>
      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-ca bg-ca-blue px-3 py-1.5 text-xs font-medium text-ca-on-accent transition-colors hover:bg-ca-blue-light"
        >
          Try again
        </button>
        <Link
          href="/directory"
          className="rounded-ca border border-ca-border2 px-3 py-1.5 text-xs text-ca-text-secondary transition-colors hover:border-ca-blue hover:text-ca-blue-light"
        >
          Back to directory
        </Link>
      </div>
    </div>
  );
}
