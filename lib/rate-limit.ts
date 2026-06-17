const COOLDOWN_MS = 30_000;
const MAX_REQUESTS_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

interface RateLimitEntry {
  timestamps: number[];
  lastRequest: number;
}

const store = new Map<string, RateLimitEntry>();

function pruneOldTimestamps(timestamps: number[], now: number): number[] {
  return timestamps.filter((ts) => now - ts < HOUR_MS);
}

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [], lastRequest: 0 };

  const elapsed = now - entry.lastRequest;
  if (entry.lastRequest > 0 && elapsed < COOLDOWN_MS) {
    const retryAfterSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  const recent = pruneOldTimestamps(entry.timestamps, now);
  if (recent.length >= MAX_REQUESTS_PER_HOUR) {
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.ceil((HOUR_MS - (now - oldest)) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
  }

  store.set(key, {
    timestamps: [...recent, now],
    lastRequest: now,
  });

  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(forwardedFor: string | null, realIp: string | null): string {
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  if (realIp) return realIp.trim();
  return "unknown";
}
