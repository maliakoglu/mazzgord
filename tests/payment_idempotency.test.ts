import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handlePaymentRoute } from "../routes/payment.js";

// --- Mock helpers ---

let sharedPaidUpdateCount = 0;

function createMockEnv(payment: any) {
  const prepareMock = vi.fn((sql: string) => ({
    bind: vi.fn(() => ({
      first: vi.fn(async () => payment),
      run: vi.fn(async () => {
        if (sql.includes("status = 'paid'")) {
          sharedPaidUpdateCount++;
          return { meta: { last_row_id: 1, changes: sharedPaidUpdateCount === 1 ? 1 : 0 } };
        }
        if (sql.includes("status = 'failed'")) {
          return { meta: { last_row_id: 1, changes: payment.status === "paid" ? 0 : 1 } };
        }
        return { meta: { last_row_id: 1, changes: 1 } };
      }),
    })),
    first: vi.fn(async () => payment),
    all: vi.fn(async () => ({ results: [payment] })),
  }));
  return {
    DB: { prepare: prepareMock },
    IYZICO_API_KEY: "test-key",
    IYZICO_SECRET_KEY: "test-secret",
    RESEND_API_KEY: "test-resend-key",
    WEBHOOK_SECRET: "test-webhook-secret",
  };
}

function createMockFetch(iyzicoResponse: any) {
  const calls: string[] = [];
  const mockFn = vi.fn(async (url: string | URL, opts: any) => {
    const urlStr = String(url);
    calls.push(urlStr);
    if (urlStr.includes("iyzipay.com")) {
      return new Response(JSON.stringify(iyzicoResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("resend.com")) {
      return new Response(JSON.stringify({ id: "test" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("{}", { status: 404 });
  });
  return { mockFn, calls };
}

function countEmails(calls: string[]): number {
  return calls.filter((u) => u.includes("resend.com")).length;
}

function createVerifyRequest(body: any) {
  return new Request("https://mazzgord.com/api/payment/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://mazzgord.com" },
    body: JSON.stringify(body),
  });
}

function createWebhookRequest(body: any) {
  return new Request("https://mazzgord.com/api/payment/webhook?secret=test-webhook-secret", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const basePayment = {
  id: 1,
  payment_link_id: "abc123def456",
  status: "pending",
  amount: 100,
  customer_name: "Test Customer",
  customer_email: "test@test.com",
  customer_phone: "+905551234567",
  description: "Test payment",
  quote_id: null,
  iyzico_conversation_id: "mazzgord-1-123",
};

const iyzicoSuccess = {
  status: "success",
  paymentId: "iyz123",
  conversationId: "mazzgord-1-123",
};

const iyzicoFailure = {
  status: "failure",
  errorMessage: "Kart reddedildi",
};

// --- Tests ---

describe("Payment idempotency — verify", () => {
  let originalFetch: any;

  beforeEach(() => {
    sharedPaidUpdateCount = 0;
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("sequential replay: only first verify sends email", async () => {
    const { mockFn, calls } = createMockFetch(iyzicoSuccess);
    globalThis.fetch = mockFn as any;

    const env = createMockEnv({ ...basePayment });

    const res1 = await handlePaymentRoute("/api/payment/verify", createVerifyRequest({
      token: "tok1", conversation_id: "mazzgord-1-123", link_id: "abc123def456",
    }), env);
    const body1 = await res1.json();
    expect(body1.success).toBe(true);
    expect(body1.status).toBe("paid");
    const emails1 = countEmails(calls);

    const res2 = await handlePaymentRoute("/api/payment/verify", createVerifyRequest({
      token: "tok1", conversation_id: "mazzgord-1-123", link_id: "abc123def456",
    }), env);
    const body2 = await res2.json();
    expect(body2.success).toBe(true);
    expect(body2.status).toBe("paid");

    const totalEmails = countEmails(calls);
    expect(totalEmails).toBe(2);
  });

  it("concurrent verify: only one sends email", async () => {
    const { mockFn, calls } = createMockFetch(iyzicoSuccess);
    globalThis.fetch = mockFn as any;

    const env = createMockEnv({ ...basePayment });

    const [res1, res2] = await Promise.all([
      handlePaymentRoute("/api/payment/verify", createVerifyRequest({
        token: "tok1", conversation_id: "mazzgord-1-123", link_id: "abc123def456",
      }), env),
      handlePaymentRoute("/api/payment/verify", createVerifyRequest({
        token: "tok1", conversation_id: "mazzgord-1-123", link_id: "abc123def456",
      }), env),
    ]);

    const body1 = await res1.json();
    const body2 = await res2.json();
    expect(body1.status).toBe("paid");
    expect(body2.status).toBe("paid");

    const totalEmails = countEmails(calls);
    expect(totalEmails).toBe(2);
  });

  it("paid payment not overwritten to failed by invalid verify", async () => {
    const { mockFn, calls } = createMockFetch(iyzicoFailure);
    globalThis.fetch = mockFn as any;

    const env = createMockEnv({ ...basePayment, status: "paid" });

    const res = await handlePaymentRoute("/api/payment/verify", createVerifyRequest({
      token: "invalid", conversation_id: "mazzgord-1-123", link_id: "abc123def456",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.status).toBe("failed");

    const totalEmails = countEmails(calls);
    expect(totalEmails).toBe(0);
  });
});

describe("Payment idempotency — webhook", () => {
  let originalFetch: any;

  beforeEach(() => {
    sharedPaidUpdateCount = 0;
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("webhook replay: only first sends email", async () => {
    const { mockFn, calls } = createMockFetch(iyzicoSuccess);
    globalThis.fetch = mockFn as any;

    const env = createMockEnv({ ...basePayment });

    await handlePaymentRoute("/api/payment/webhook", createWebhookRequest({
      status: "success", paymentId: "iyz123", conversationId: "mazzgord-1-123",
    }), env);

    await handlePaymentRoute("/api/payment/webhook", createWebhookRequest({
      status: "success", paymentId: "iyz123", conversationId: "mazzgord-1-123",
    }), env);

    const totalEmails = countEmails(calls);
    expect(totalEmails).toBe(2);
  });

  it("webhook failure does not overwrite paid", async () => {
    const { mockFn, calls } = createMockFetch(iyzicoSuccess);
    globalThis.fetch = mockFn as any;

    const env = createMockEnv({ ...basePayment, status: "paid" });

    await handlePaymentRoute("/api/payment/webhook", createWebhookRequest({
      status: "failure", conversationId: "mazzgord-1-123",
    }), env);

    const totalEmails = countEmails(calls);
    expect(totalEmails).toBe(0);
  });
});

describe("Payment idempotency — callback", () => {
  let originalFetch: any;

  beforeEach(() => {
    sharedPaidUpdateCount = 0;
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  function createCallbackRequest(fields: Record<string, string>) {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.append(k, v);
    return new Request("https://mazzgord.com/odeme/sonuc/mobil", {
      method: "POST",
      body: fd,
    });
  }

  it("callback replay: only first sends email", async () => {
    const { mockFn, calls } = createMockFetch(iyzicoSuccess);
    globalThis.fetch = mockFn as any;

    const env = createMockEnv({ ...basePayment });

    await handlePaymentRoute("/odeme/sonuc/mobil", createCallbackRequest({
      token: "tok1", conversationId: "mazzgord-1-123", link: "abc123def456", mobile: "1",
    }), env);

    await handlePaymentRoute("/odeme/sonuc/mobil", createCallbackRequest({
      token: "tok1", conversationId: "mazzgord-1-123", link: "abc123def456", mobile: "1",
    }), env);

    const totalEmails = countEmails(calls);
    expect(totalEmails).toBe(2);
  });

  it("callback failure does not overwrite paid", async () => {
    const { mockFn, calls } = createMockFetch(iyzicoFailure);
    globalThis.fetch = mockFn as any;

    const env = createMockEnv({ ...basePayment, status: "paid" });

    await handlePaymentRoute("/odeme/sonuc/mobil", createCallbackRequest({
      token: "invalid", conversationId: "mazzgord-1-123", link: "abc123def456", mobile: "1",
    }), env);

    const totalEmails = countEmails(calls);
    expect(totalEmails).toBe(0);
  });
});
