import { describe, it, expect } from "vitest";
import { contactSchema, quoteSchema, orderSchema, calculatePriceSchema, validateBody } from "../lib/validation.js";

describe("contactSchema", () => {
  it("should accept valid contact data", () => {
    const result = contactSchema.safeParse({
      name: "Ahmet Yılmaz",
      email: "ahmet@email.com",
      phone: "05551234567",
      message: "Bu bir test mesajıdır",
    });
    expect(result.success).toBe(true);
  });

  it("should reject name shorter than 2 chars", () => {
    const result = contactSchema.safeParse({
      name: "A",
      email: "ahmet@email.com",
      message: "Test mesajı",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Ahmet",
      email: "gecersiz",
      message: "Test mesajı",
    });
    expect(result.success).toBe(false);
  });

  it("should reject message shorter than 5 chars", () => {
    const result = contactSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      message: "1234",
    });
    expect(result.success).toBe(false);
  });

  it("should accept empty phone", () => {
    const result = contactSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      phone: "",
      message: "Test mesajı",
    });
    expect(result.success).toBe(true);
  });
});

describe("quoteSchema", () => {
  it("should accept valid quote data", () => {
    const result = quoteSchema.safeParse({
      name: "Ahmet Yılmaz",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
    });
    expect(result.success).toBe(true);
  });

  it("should reject missing source_language", () => {
    const result = quoteSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      target_language: "Türkçe",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid urgency", () => {
    const result = quoteSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
      urgency: "cok_acil",
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid urgency", () => {
    const result = quoteSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
      urgency: "acil",
    });
    expect(result.success).toBe(true);
  });

  it("should default urgency to standart", () => {
    const result = quoteSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
    });
    expect(result.success).toBe(true);
    expect(result.data.urgency).toBe("standart");
  });

  it("should default delivery_method to digital", () => {
    const result = quoteSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
    });
    expect(result.success).toBe(true);
    expect(result.data.delivery_method).toBe("digital");
  });

  it("should reject negative page_count", () => {
    const result = quoteSchema.safeParse({
      name: "Ahmet",
      email: "ahmet@email.com",
      source_language: "İngilizce",
      target_language: "Türkçe",
      page_count: -5,
    });
    expect(result.success).toBe(false);
  });
});

describe("orderSchema", () => {
  it("should accept valid order data", () => {
    const result = orderSchema.safeParse({
      customer_name: "Ahmet Yılmaz",
      customer_email: "ahmet@email.com",
      items: [{ name: "Yeminli Tercüme", price: 500 }],
      total: 500,
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty items array", () => {
    const result = orderSchema.safeParse({
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      items: [],
      total: 0,
    });
    expect(result.success).toBe(false);
  });

  it("should reject negative total", () => {
    const result = orderSchema.safeParse({
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      items: [{ name: "Test", price: 100 }],
      total: -50,
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = orderSchema.safeParse({
      customer_name: "Ahmet",
      customer_email: "gecersiz",
      items: [{ name: "Test", price: 100 }],
      total: 100,
    });
    expect(result.success).toBe(false);
  });

  it("should accept more than 1 item", () => {
    const result = orderSchema.safeParse({
      customer_name: "Ahmet",
      customer_email: "ahmet@email.com",
      items: [
        { name: "Yeminli Tercüme", price: 500 },
        { name: "Noter Onayı", price: 100 },
      ],
      total: 600,
    });
    expect(result.success).toBe(true);
  });
});

describe("calculatePriceSchema", () => {
  it("should accept valid data with word_count", () => {
    const result = calculatePriceSchema.safeParse({
      word_count: 1000,
    });
    expect(result.success).toBe(true);
  });

  it("should accept valid data with product_id", () => {
    const result = calculatePriceSchema.safeParse({
      product_id: 1,
      quantity: 5,
    });
    return expect(result.success).toBe(true);
  });

  it("should accept empty object", () => {
    const result = calculatePriceSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should reject invalid urgency", () => {
    const result = calculatePriceSchema.safeParse({
      word_count: 100,
      urgency: "cok_acil",
    });
    expect(result.success).toBe(false);
  });

  it("should reject negative word_count", () => {
    const result = calculatePriceSchema.safeParse({
      word_count: -10,
    });
    expect(result.success).toBe(false);
  });
});

describe("validateBody", () => {
  it("should return success true with valid data", () => {
    const result = validateBody(contactSchema, {
      name: "Ahmet",
      email: "ahmet@email.com",
      message: "Test mesajı",
    });
    expect(result.success).toBe(true);
    expect(result.data.name).toBe("Ahmet");
  });

  it("should return success false with invalid data", () => {
    const result = validateBody(contactSchema, {
      name: "A",
      email: "gecersiz",
      message: "1234",
    });
    expect(result.success).toBe(false);
    expect(result.response).toBeDefined();
    expect(result.response.status).toBe(400);
  });

  it("should return JSON error in response", async () => {
    const result = validateBody(contactSchema, {
      name: "A",
      email: "gecersiz",
      message: "1234",
    });
    const body = await result.response.json();
    expect(body.success).toBe(false);
    expect(body.error).toBeDefined();
  });
});
