"use client";

import "./globals.css";
import { ErrorPanel } from "@/components/error-panel";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ca-bg text-ca-text antialiased">
        <ErrorPanel error={error} reset={reset} />
      </body>
    </html>
  );
}
