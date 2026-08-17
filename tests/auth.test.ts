import { describe, it, expect, vi } from "vitest";
import { handleAuthRoute } from "../routes/auth.js";

function createMockEnv(existingCustomer = null) {
  const bound = {
    first: vi.fn(async () => existingCustomer),
    run: vi.fn(async () => ({ meta: { last_row_id: 1 } })),
  };
  return {
    DB: {
      prepare: vi.fn(() => ({
        bind: vi.fn(() => bound),
        first: vi.fn(async () => existingCustomer),
      })),
    },
    ADMIN_TOKEN: "test-secret",
  };
}

function createRequest(body: any) {
  return new Request("https://mazzgord.com/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://mazzgord.com" },
    body: JSON.stringify(body),
  });
}

describe("handleAuthRoute register", () => {
  it("should register new customer", async () => {
    const env = createMockEnv(null);
    const res = await handleAuthRoute("/api/auth/register", createRequest({
      name: "Ahmet Yılmaz",
      email: "ahmet@email.com",
      password: "sifre123",
      phone: "05551234567",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
    expect(body.customer.name).toBe("Ahmet Yılmaz");
  });

  it("should reject duplicate email", async () => {
    const env = createMockEnv({ id: 1, email: "ahmet@email.com" });
    const res = await handleAuthRoute("/api/auth/register", createRequest({
      name: "Ahmet",
      email: "ahmet@email.com",
      password: "sifre123",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(409);
  });

  it("should reject short password", async () => {
    const env = createMockEnv(null);
    const res = await handleAuthRoute("/api/auth/register", createRequest({
      name: "Ahmet",
      email: "ahmet@email.com",
      password: "123",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject invalid email", async () => {
    const env = createMockEnv(null);
    const res = await handleAuthRoute("/api/auth/register", createRequest({
      name: "Ahmet",
      email: "gecersiz",
      password: "sifre123",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });
});

describe("handleAuthRoute login", () => {
  it("should reject non-existent user", async () => {
    const env = createMockEnv(null);
    const res = await handleAuthRoute("/api/auth/login", createRequest({
      email: "yok@email.com",
      password: "sifre123",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(401);
  });

  it("should reject missing credentials", async () => {
    const env = createMockEnv(null);
    const res = await handleAuthRoute("/api/auth/login", createRequest({
      email: "ahmet@email.com",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });
});
