import { describe, it, expect, vi } from "vitest";
import { handleContact } from "../routes/contact.js";

function createMockEnv() {
  return {
    DB: {
      prepare: vi.fn(() => ({
        bind: vi.fn(() => ({
          run: vi.fn(async () => ({})),
        })),
      })),
    },
  };
}

function createRequest(body: any) {
  return new Request("https://mazzgord.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://mazzgord.com" },
    body: JSON.stringify(body),
  });
}

describe("handleContact", () => {
  it("should accept valid contact form", async () => {
    const env = createMockEnv();
    const res = await handleContact(createRequest({
      name: "Ahmet Yılmaz",
      email: "ahmet@email.com",
      phone: "05551234567",
      message: "Çeviri hizmeti hakkında bilgi almak istiyorum.",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(env.DB.prepare).toHaveBeenCalled();
  });

  it("should reject missing name", async () => {
    const env = createMockEnv();
    const res = await handleContact(createRequest({
      email: "ahmet@email.com",
      message: "Test mesajı",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject invalid email", async () => {
    const env = createMockEnv();
    const res = await handleContact(createRequest({
      name: "Ahmet",
      email: "gecersiz",
      message: "Test mesajı",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should reject short message", async () => {
    const env = createMockEnv();
    const res = await handleContact(createRequest({
      name: "Ahmet",
      email: "ahmet@email.com",
      message: "1234",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should accept empty phone", async () => {
    const env = createMockEnv();
    const res = await handleContact(createRequest({
      name: "Ahmet",
      email: "ahmet@email.com",
      phone: "",
      message: "Test mesajı yeterince uzun",
    }), env);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
