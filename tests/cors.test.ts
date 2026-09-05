import { describe, it, expect } from "vitest";
import { corsHeaders, checkAdminAuth, unauthorizedResponse, checkCsrf, csrfFailedResponse } from "../lib/cors.js";

describe("corsHeaders", () => {
  it("should have correct origin", () => {
    expect(corsHeaders["Access-Control-Allow-Origin"]).toBe("https://mazzgord.com");
  });

  it("should allow POST and OPTIONS", () => {
    expect(corsHeaders["Access-Control-Allow-Methods"]).toBe("GET, POST, OPTIONS");
  });

  it("should allow Content-Type header", () => {
    expect(corsHeaders["Access-Control-Allow-Headers"]).toBe("Content-Type, Authorization, X-Mazzgord-Mobile");
  });
});

describe("checkAdminAuth", () => {
  it("should return true with correct token", () => {
    const request = new Request("https://mazzgord.com/api/messages", {
      headers: { Authorization: "Bearer test-token" },
    });
    const env = { ADMIN_TOKEN: "test-token" };
    expect(checkAdminAuth(request, env)).toBe(true);
  });

  it("should return false with wrong token", () => {
    const request = new Request("https://mazzgord.com/api/messages", {
      headers: { Authorization: "Bearer wrong-token" },
    });
    const env = { ADMIN_TOKEN: "test-token" };
    expect(checkAdminAuth(request, env)).toBe(false);
  });

  it("should return false with no auth header", () => {
    const request = new Request("https://mazzgord.com/api/messages");
    const env = { ADMIN_TOKEN: "test-token" };
    expect(checkAdminAuth(request, env)).toBe(false);
  });
});

describe("unauthorizedResponse", () => {
  it("should return 401 status", async () => {
    const res = unauthorizedResponse();
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.success).toBe(false);
  });
});

describe("checkCsrf", () => {
  it("should accept valid origin", () => {
    const request = new Request("https://mazzgord.com/api/contact", {
      method: "POST",
      headers: { Origin: "https://mazzgord.com" },
    });
    expect(checkCsrf(request)).toBe(true);
  });

  it("should reject invalid origin", () => {
    const request = new Request("https://mazzgord.com/api/contact", {
      method: "POST",
      headers: { Origin: "https://evil.com" },
    });
    expect(checkCsrf(request)).toBe(false);
  });

  it("should accept valid referer", () => {
    const request = new Request("https://mazzgord.com/api/contact", {
      method: "POST",
      headers: { Referer: "https://mazzgord.com/teklif" },
    });
    expect(checkCsrf(request)).toBe(true);
  });

  it("should reject invalid referer", () => {
    const request = new Request("https://mazzgord.com/api/contact", {
      method: "POST",
      headers: { Referer: "https://evil.com/form" },
    });
    expect(checkCsrf(request)).toBe(false);
  });

  it("should reject when no origin or referer", () => {
    const request = new Request("https://mazzgord.com/api/contact", {
      method: "POST",
    });
    expect(checkCsrf(request)).toBe(false);
  });
});

describe("csrfFailedResponse", () => {
  it("should return 403 status", async () => {
    const res = csrfFailedResponse();
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.success).toBe(false);
  });
});
