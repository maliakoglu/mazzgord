import { describe, it, expect } from "vitest";
import { handleCalculatePrice } from "../routes/calculatePrice.js";

function createRequest(body: any) {
  return new Request("https://mazzgord.com/api/calculate-price", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("handleCalculatePrice", () => {
  it("should calculate word-based price", async () => {
    const res = await handleCalculatePrice(createRequest({ word_count: 1000 }), {});
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.estimated_price).toBe(600);
  });

  it("should calculate page-based price", async () => {
    const res = await handleCalculatePrice(createRequest({ page_count: 5 }), {});
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.estimated_price).toBe(625);
  });

  it("should apply yeminli multiplier", async () => {
    const res = await handleCalculatePrice(createRequest({ word_count: 1000, yeminli: true }), {});
    const body = await res.json();
    expect(body.estimated_price).toBe(900);
  });

  it("should apply urgency multiplier", async () => {
    const res = await handleCalculatePrice(createRequest({ word_count: 1000, urgency: "acil" }), {});
    const body = await res.json();
    expect(body.estimated_price).toBe(900);
  });

  it("should enforce minimum price", async () => {
    const res = await handleCalculatePrice(createRequest({ word_count: 10 }), {});
    const body = await res.json();
    expect(body.estimated_price).toBe(100);
  });

  it("should use default when no word/page count", async () => {
    const res = await handleCalculatePrice(createRequest({}), {});
    const body = await res.json();
    expect(body.estimated_price).toBe(125);
  });
});
