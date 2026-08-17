import { describe, it, expect, vi } from "vitest";
import { handleAccountRoute } from "../routes/account.js";
import { createToken } from "../lib/customerAuth.js";

async function setup(data = {}) {
  const adminToken = "test-secret";
  const token = await createToken(1, "ahmet@email.com", { ADMIN_TOKEN: adminToken });

  const bound = {
    first: vi.fn(async () => data.customer || null),
    all: vi.fn(async () => ({ results: data.orders || [] })),
  };
  const env = {
    DB: {
      prepare: vi.fn(() => ({
        bind: vi.fn(() => bound),
        first: vi.fn(async () => data.customer || null),
        all: vi.fn(async () => ({ results: data.orders || [] })),
      })),
    },
    DOCS: { get: vi.fn(async () => data.file || null) },
    ADMIN_TOKEN: adminToken,
  };
  return { env, token };
}

function authRequest(path, token) {
  return new Request(`https://mazzgord.com${path}`, {
    method: "GET",
    headers: { Origin: "https://mazzgord.com", Authorization: `Bearer ${token}` },
  });
}

describe("handleAccountRoute", () => {
  it("should reject without auth token", async () => {
    const { env } = await setup();
    const req = new Request("https://mazzgord.com/api/account/profile", {
      method: "GET", headers: { Origin: "https://mazzgord.com" },
    });
    const res = await handleAccountRoute("/api/account/profile", req, env);
    expect(res.status).toBe(401);
  });

  it("should return profile for authenticated customer", async () => {
    const { env, token } = await setup({
      customer: { id: 1, name: "Ahmet", email: "ahmet@email.com", phone: "0555", created_at: "2026-01-01" },
    });
    const res = await handleAccountRoute("/api/account/profile", authRequest("/api/account/profile", token), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.name).toBe("Ahmet");
  });

  it("should return orders for authenticated customer", async () => {
    const { env, token } = await setup({
      orders: [{ id: 1, email: "ahmet@email.com", order_status: "pending", items_json: "[]" }],
    });
    const res = await handleAccountRoute("/api/account/orders", authRequest("/api/account/orders", token), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.quotes).toBeDefined();
    expect(body.data.orders).toBeDefined();
    expect(body.data.payments).toBeDefined();
  });

  it("should reject file access without ownership", async () => {
    const { env, token } = await setup({ file: null });
    const res = await handleAccountRoute("/api/account/files/uploads/test.pdf", authRequest("/api/account/files/uploads/test.pdf", token), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(403);
  });
});
