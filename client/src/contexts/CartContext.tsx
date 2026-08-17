import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";

export interface CartItem {
  productId: number;
  sku: string;
  slug: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  options: Record<string, boolean>;
  metadata: Record<string, unknown>;
}

export interface ServiceOption {
  key: string;
  label: string;
  type: "surcharge_percent" | "fixed_price";
  value: number;
}

export interface ServiceProduct {
  id: number;
  sku: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  source_language: string | null;
  target_language: string | null;
  unit: string;
  base_price: number;
  currency: string;
  active: number;
  options: ServiceOption[];
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: ServiceProduct, quantity: number, options: Record<string, boolean>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CART_KEY = "mazzgord_cart";

function calculateItemPrice(
  basePrice: number,
  quantity: number,
  options: ServiceOption[],
  selectedOptions: Record<string, boolean>
): number {
  let base = basePrice * quantity;
  for (const opt of options) {
    if (!selectedOptions[opt.key]) continue;
    if (opt.type === "surcharge_percent") {
      base += base * (opt.value / 100);
    } else if (opt.type === "fixed_price") {
      base += opt.value * quantity;
    }
  }
  return Math.round(base * 100) / 100;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItemRef = useRef<((product: ServiceProduct, quantity: number, options: Record<string, boolean>) => void) | null>(null);

  const addItem = useCallback(
    (product: ServiceProduct, quantity: number, selectedOptions: Record<string, boolean>) => {
      const totalPrice = calculateItemPrice(product.base_price, quantity, product.options, selectedOptions);
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity, totalPrice: calculateItemPrice(product.base_price, i.quantity + quantity, product.options, i.options) }
              : i
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            sku: product.sku,
            slug: product.slug,
            name: product.name,
            unit: product.unit,
            unitPrice: product.base_price,
            quantity,
            totalPrice,
            options: selectedOptions,
            metadata: {},
          },
        ];
      });
    },
    []
  );

  addItemRef.current = addItem;

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity, totalPrice: Math.round(i.unitPrice * quantity * 100) / 100 }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = window.localStorage.getItem(CART_KEY);
        if (saved) setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(CART_KEY, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent("mazzgord-cart-updated"));
      }
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      addItemRef.current?.(detail.product, detail.quantity, detail.options);
    };
    window.addEventListener("mazzgord-add-to-cart", handler);
    return () => window.removeEventListener("mazzgord-add-to-cart", handler);
  }, []);

  const total = items.reduce((sum, i) => sum + i.totalPrice, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function addToCart(product: ServiceProduct, quantity: number, options: Record<string, boolean> = {}) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("mazzgord-add-to-cart", { detail: { product, quantity, options } }));
  }
}
