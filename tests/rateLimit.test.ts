import { describe, it, expect, vi } from "vitest";
import { checkRateLimit } from "../lib/rateLimit.js";

function createMockEnv(kvData: Record<string, string> = {}) {
  return {
    RATE_LIMIT: {
      get: vi.fn(async (key: string) => kvData[key] || null),
      put: vi.fn(async (key: string, value: string, opts?: any) => {
        kvData[key] = value;
      }),
    },
  };
}

function createRequest() {
  return new Request("https://mazzgord.com/api/contact", {
    method: "POST",
    headers: { "CF-Connecting-IP": "1.2.3.4" },
  });
}

describe("checkRateLimit", () => {
  it("should allow requests under limit", async () => {
    const env = createMockEnv();
    const request = createRequest();
    const result = await checkRateLimit(request, env, "/api/contact");
    expect(result).toBe(null);
  });

  it("should block after 10 requests", async () => {
    const env = createMockEnv();
    const now = Date.now();
    env.RATE_LIMIT.get = vi.fn(async () => JSON.stringify({ count: 10, firstRequest: now }));
    const request = createRequest();
    const result = await checkRateLimit(request, env, "/api/contact");
    expect(result).not.toBe(null);
    expect(result!.status).toBe(429);
  });

  it("should not rate limit non-API paths", async () => {
    const env = createMockEnv();
    const request = createRequest();
    const result = await checkRateLimit(request, env, "/yeminli-tercume");
    expect(result).toBe(null);
  });
});
