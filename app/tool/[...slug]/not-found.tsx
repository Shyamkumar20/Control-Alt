import Link from "next/link";
import { Topbar } from "@/components/topbar";

export default function ToolNotFound() {
  return (
    <>
      <Topbar />
      <main
        id="main"
        className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-24 text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ca-text-dim">
          404 · Not found
        </p>
        <h1 className="mt-2 text-base font-medium text-ca-text">
          Repository not found
        </h1>
        <p className="mt-1.5 text-xs leading-relaxed text-ca-text-secondary">
          This tool isn&apos;t in the directory. It may have been renamed or
          removed.
        </p>
        <Link
          href="/"
          className="mt-5 rounded-ca bg-ca-blue px-3 py-1.5 text-xs font-medium text-ca-on-accent transition-colors hover:bg-ca-blue-light"
        >
          Back to directory
        </Link>
      </main>
    </>
  );
}
