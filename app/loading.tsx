export default function Loading() {
  return (
    <main
      id="main"
      className="flex flex-1 items-center justify-center px-4 py-24"
      role="status"
      aria-live="polite"
    >
      <p className="font-mono text-[11px] text-ca-text-dim">Loading...</p>
    </main>
  );
}
