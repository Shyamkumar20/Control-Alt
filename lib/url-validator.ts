/**
 * Validates that an external URL starts with https://, parses safely,
 * and is not a dangerous protocol (javascript:, data:, vbscript:, etc.)
 */
export function validateHttpsUrl(rawUrl?: string | null): string | null {
  if (!rawUrl || typeof rawUrl !== "string") {
    return null;
  }

  const trimmed = rawUrl.trim();
  if (!trimmed.toLowerCase().startsWith("https://")) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Validates that a GitHub URL points securely to https://github.com/*
 */
export function validateGitHubUrl(rawUrl?: string | null): string | null {
  const validHttps = validateHttpsUrl(rawUrl);
  if (!validHttps) {
    return null;
  }

  try {
    const parsed = new URL(validHttps);
    const host = parsed.hostname.toLowerCase();
    if (host === "github.com" || host === "www.github.com") {
      return validHttps;
    }
    return null;
  } catch {
    return null;
  }
}
