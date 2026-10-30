/**
 * Formats pushed_at timestamp as "Last active X days ago"
 */
export function formatLastActive(pushedAt?: string | null): string {
  if (!pushedAt) return "Activity unknown";

  const date = new Date(pushedAt);
  if (isNaN(date.getTime())) return "Activity unknown";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  if (diffMs < 0) return "Last active recently";

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    if (diffHours <= 1) return "Last active just now";
    return `Last active ${diffHours} hours ago`;
  }

  if (diffDays === 1) {
    return "Last active 1 day ago";
  }

  if (diffDays < 30) {
    return `Last active ${diffDays} days ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) {
    return "Last active 1 month ago";
  }
  if (diffMonths < 12) {
    return `Last active ${diffMonths} months ago`;
  }

  const diffYears = Math.floor(diffDays / 365);
  if (diffYears === 1) {
    return "Last active 1 year ago";
  }
  return `Last active ${diffYears} years ago`;
}

/**
 * Compact relative time for cards (e.g. "2h ago", "3d ago", "2mo ago")
 */
export function formatRelativeTime(value?: string | null): string {
  if (!value) return "Unknown";

  const date = new Date(value);
  if (isNaN(date.getTime())) return "Unknown";

  const diffMs = Math.max(0, Date.now() - date.getTime());
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  return `${Math.floor(days / 365)}y ago`;
}

/**
 * Human-readable calendar date
 */
export function formatDate(value?: string | null): string {
  if (!value) return "Unknown";

  const date = new Date(value);
  if (isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Exact integer formatting with separators
 */
export function formatNumber(value?: number | null): string {
  return (value ?? 0).toLocaleString("en-US");
}

/**
 * Format large numbers for metrics (e.g. 14.5k or 291,130)
 */
export function formatCompactNumber(num: number): string {
  if (num === undefined || num === null) return "0";
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toLocaleString();
}

/**
 * Strips any potential HTML tags and script elements, returning pure safe plain text
 */
export function sanitizePlainText(input?: string | null): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Strip html tags
  const stripped = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return stripped.trim();
}
