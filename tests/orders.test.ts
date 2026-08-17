import { describe, it, expect, vi } from "vitest";
import { handleOrdersRoute } from "../routes/orders.js";

function createMockEnv(orderRow = null) {
  const bound = {
    run: vi.fn(async () => ({})),
    first: vi.fn(async () => orderRow),
  };
  return {
    DB: {
      prepare: vi.fn(() => ({
        bind: vi.fn(() => bound),
        first: vi.fn(async () => orderRow),
        all: vi.fn(async () => ({ results: [] })),
      })),
    },
    RESEND_API_KEY: null,
  };
}

function createPostRequest(body: any) {
  return new Request("https://mazzgord.com/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://mazzgord.com" },
    body: JSON.stringify(body),
  });
}

function createGetRequest(linkId: string) {
  return new Request(`https://mazzgord.com/api/orders/${linkId}`, {
    method: "GET",
    headers: { Origin: "https://mazzgord.com" },
  });
}

describe("handleOrdersRoute POST", () => {
  it("should accept valid order", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders", createPostRequest({
      customer_name: "Ahmet Yılmaz",
      customer_email: "ahmet@email.com",
      items: [{ name: "Yeminli Tercüme", price: 500 }],
      total: 500,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.payment_link_id).toBeDefined();
    expect(body.payment_url).toContain("https://mazzgord.com/odeme?id=");
  });

  it("should reject missing items", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders", createPostRequest({
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      total: 100,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject empty items array", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders", createPostRequest({
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      items: [],
      total: 0,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject invalid email", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders", createPostRequest({
      customer_name: "Ahmet",
      customer_email: "gecersiz",
      items: [{ name: "Test", price: 100 }],
      total: 100,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject negative total", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders", createPostRequest({
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      items: [{ name: "Test", price: 100 }],
      total: -50,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });
});

describe("handleOrdersRoute GET", () => {
  it("should return 404 for non-existent order", async () => {
    const env = createMockEnv(null);
    const res = await handleOrdersRoute("/api/orders/abc123def456", createGetRequest("abc123def456"), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(404);
  });

  it("should return order details for valid order", async () => {
    const orderRow = {
      payment_link_id: "abc123def456",
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      items_json: '[{"name":"Yeminli Tercüme","price":500}]',
      total: 500,
      status: "pending",
      delivery_method: "digital",
    };
    const env = createMockEnv(orderRow);
    const res = await handleOrdersRoute("/api/orders/abc123def456", createGetRequest("abc123def456"), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.customer_name).toBe("Ahmet");
    expect(body.data.items).toHaveLength(1);
    expect(body.data.items[0].name).toBe("Yeminli Tercüme");
  });
});
