import { describe, it, expect, vi } from "vitest";
import { handleOrdersRoute } from "../../routes/orders.js";

function createMockEnv() {
  let orderRow: any = null;
  const bound = {
    run: vi.fn(async () => { orderRow = {
      payment_link_id: "testlink12345678",
      customer_name: "Ahmet Yılmaz",
      customer_email: "ahmet@email.com",
      items_json: '[{"name":"Yeminli Pasaport Çevirisi","price":125},{"name":"Noter Onayı","price":50}]',
      total: 300,
      status: "pending",
      delivery_method: "digital",
    }; return {}; }),
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

function createOrderRequest(body: any) {
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

describe("E2E: Sipariş akışı", () => {
  it("should complete full order flow: create -> query", async () => {
    const env = createMockEnv();
    const cartItems = [
      { productId: 1, sku: "YEMINLI-PASAPORT", name: "Yeminli Pasaport Çevirisi", price: 125, quantity: 2, unitPrice: 125, totalPrice: 250, options: {} },
      { productId: 2, sku: "NOTER-ONAY", name: "Noter Onayı", price: 50, quantity: 1, unitPrice: 50, totalPrice: 50, options: { notary: true } },
    ];
    const createRes = await handleOrdersRoute("/api/orders", createOrderRequest({
      customer_name: "Ahmet Yılmaz",
      customer_email: "ahmet@email.com",
      customer_phone: "05551234567",
      items: cartItems,
      total: 300,
      delivery_method: "digital",
      source_language: "İngilizce",
      target_language: "Türkçe",
    }), env);
    const createBody = await createRes.json();
    expect(createBody.success).toBe(true);
    expect(createBody.payment_link_id).toBeDefined();
    expect(createBody.payment_url).toContain("/odeme?id=");
    const linkId = createBody.payment_link_id;
    const queryRes = await handleOrdersRoute(`/api/orders/${linkId}`, createGetRequest(linkId), env);
    const queryBody = await queryRes.json();
    expect(queryBody.success).toBe(true);
    expect(queryBody.data.customer_name).toBe("Ahmet Yılmaz");
    expect(queryBody.data.items).toHaveLength(2);
  });

  it("should reject order with invalid cart data", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders", createOrderRequest({
      customer_name: "A",
      customer_email: "gecersiz",
      items: [],
      total: -100,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject order without items", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders", createOrderRequest({
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      total: 100,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should return 404 for non-existent order", async () => {
    const env = createMockEnv();
    const res = await handleOrdersRoute("/api/orders/abcdef123456", createGetRequest("abcdef123456"), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(404);
  });
});
