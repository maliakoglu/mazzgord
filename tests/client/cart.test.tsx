import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart, type ServiceProduct } from "@/contexts/CartContext";

function wrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

const mockProduct: ServiceProduct = {
  id: 1,
  sku: "YEMINLI-PASAPORT",
  slug: "yeminli-pasaport",
  name: "Yeminli Pasaport Çevirisi",
  description: "Pasaport çevirisi",
  category: "yeminli",
  source_language: "İngilizce",
  target_language: "Türkçe",
  unit: "sayfa",
  base_price: 125,
  currency: "TRY",
  active: 1,
  options: [],
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("CartContext", () => {
  it("should start with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
    expect(result.current.count).toBe(0);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 2, {});
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe("Yeminli Pasaport Çevirisi");
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.count).toBe(2);
  });

  it("should calculate total correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 3, {});
    });
    expect(result.current.total).toBe(375);
  });

  it("should merge same product quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 1, {});
      result.current.addItem(mockProduct, 2, {});
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 1, {});
      result.current.removeItem(1);
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it("should update quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 1, {});
      result.current.updateQuantity(1, 5);
    });
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.total).toBe(625);
  });

  it("should not update quantity below 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 2, {});
      result.current.updateQuantity(1, 0);
    });
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("should clear cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 2, {});
      result.current.clearCart();
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it("should apply surcharge_percent option", () => {
    const productWithSurcharge: ServiceProduct = {
      ...mockProduct,
      options: [{ key: "sworn", label: "Yeminli", type: "surcharge_percent", value: 50 }],
    };
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(productWithSurcharge, 1, { sworn: true });
    });
    expect(result.current.total).toBe(187.5);
  });

  it("should apply fixed_price option", () => {
    const productWithFixed: ServiceProduct = {
      ...mockProduct,
      options: [{ key: "notary", label: "Noter", type: "fixed_price", value: 50 }],
    };
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(productWithFixed, 2, { notary: true });
    });
    expect(result.current.total).toBe(350);
  });
});
