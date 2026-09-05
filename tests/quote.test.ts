import { describe, it, expect, vi } from "vitest";
import { handleQuote } from "../routes/quote.js";

function createMockEnv(quoteRow = { id: 1 }) {
  const bound = {
    run: vi.fn(async () => ({})),
    first: vi.fn(async () => quoteRow),
  };
  return {
    DB: {
      prepare: vi.fn(() => ({
        bind: vi.fn(() => bound),
        first: vi.fn(async () => quoteRow),
        run: vi.fn(async () => ({})),
      })),
    },
    RESEND_API_KEY: null,
    RATE_LIMIT: {
      get: vi.fn(async () => "1"),
      put: vi.fn(async () => {}),
      delete: vi.fn(async () => {}),
    },
  };
}

function createPostRequest(body: any) {
  return new Request("https://mazzgord.com/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://mazzgord.com" },
    body: JSON.stringify(body),
  });
}

function createGetRequest(orderNo: string) {
  return new Request(`https://mazzgord.com/api/quote/${orderNo}`, {
    method: "GET",
    headers: { Origin: "https://mazzgord.com" },
  });
}

describe("handleQuote POST", () => {
  it("should accept valid quote", async () => {
    const env = createMockEnv();
    const res = await handleQuote(createPostRequest({
      name: "Ahmet Yılmaz",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
    }), env, "/api/quote", "POST");
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("should reject missing source_language", async () => {
    const env = createMockEnv();
    const res = await handleQuote(createPostRequest({
      name: "Ahmet",
      email: "ahmet@email.com",
      target_language: "Türkçe",
    }), env, "/api/quote", "POST");
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject invalid email", async () => {
    const env = createMockEnv();
    const res = await handleQuote(createPostRequest({
      name: "Ahmet",
      email: "gecersiz",
      source_language: "İngilizce",
      target_language: "Türkçe",
    }), env, "/api/quote", "POST");
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject short name", async () => {
    const env = createMockEnv();
    const res = await handleQuote(createPostRequest({
      name: "A",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
    }), env, "/api/quote", "POST");
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });
});

describe("handleQuote GET", () => {
  it("should reject invalid order number format", async () => {
    const env = createMockEnv();
    const res = await handleQuote(createGetRequest("INVALID"), env, "/api/quote/INVALID", "GET");
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject non-existent order", async () => {
    const env = createMockEnv(null);
    const res = await handleQuote(createGetRequest("MZ-99999"), env, "/api/quote/MZ-99999", "GET");
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(404);
  });

  it("should return quote status for valid order", async () => {
    const quoteRow = {
      id: 1, name: "Ahmet", email: "ahmet@email.com",
      source_language: "İngilizce", target_language: "Türkçe",
      document_type: "Pasaport", page_count: 1, word_count: null,
      urgency: "standart", delivery_method: "digital",
      shipping_address: null, shipping_tracking: null,
      order_status: "pending", estimated_price: 125,
      delivery_date: null, created_at: "2026-01-01",
    };
    const env = createMockEnv(quoteRow);
    const res = await handleQuote(createGetRequest("MZ-00001"), env, "/api/quote/MZ-00001", "GET");
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.order_no).toBe("MZ-00001");
    expect(body.data.order_status).toBe("pending");
  });
});
