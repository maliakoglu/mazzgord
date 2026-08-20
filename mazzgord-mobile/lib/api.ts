import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const API_BASE_URL = "https://mazzgord.com";
const TOKEN_KEY = "mazzgord_auth_token";

export async function getToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setToken(token: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function removeToken(): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

type ApiOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  auth?: boolean;
};

export async function apiCall<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = await getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
    }
    throw err;
  }
  clearTimeout(timeoutId);

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let errorMessage = `Hata: ${response.status}`;
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    }
    throw new Error(errorMessage);
  }

  if (contentType && contentType.includes("application/json")) {
    return await response.json() as T;
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : {}) as T;
}

// === AUTH ===
export const authApi = {
  register: async (data: { name: string; email: string; password: string; phone?: string }) =>
    apiCall<{ success: boolean; token?: string; error?: string; customer?: Customer }>("/api/auth/register", {
      method: "POST",
      body: data,
    }),

  login: async (data: { email: string; password: string }) =>
    apiCall<{ success: boolean; token?: string; error?: string; customer?: Customer }>("/api/auth/login", {
      method: "POST",
      body: data,
    }),
};

// === SERVICES ===
export const servicesApi = {
  list: async () =>
    apiCall<{ success: boolean; data?: Service[] }>("/api/services"),

  categories: async () =>
    apiCall<{ success: boolean; data?: string[] }>("/api/services/categories"),

  getBySlug: async (slug: string) =>
    apiCall<{ success: boolean; data?: Service }>(`/api/services/${slug}`),
};

// === QUOTE ===
export const quoteApi = {
  sendCode: async (email: string) =>
    apiCall<{ success: boolean; error?: string }>("/api/quote/send-code", {
      method: "POST",
      body: { email },
    }),

  verifyCode: async (email: string, code: string) =>
    apiCall<{ success: boolean; verified?: boolean; error?: string }>("/api/quote/verify-code", {
      method: "POST",
      body: { email, code },
    }),

  create: async (data: QuoteRequest) =>
    apiCall<{ success: boolean; order_no?: string; order_token?: string; error?: string }>("/api/quote", {
      method: "POST",
      body: data,
    }),

  track: async (orderNo: string) =>
    apiCall<{ success: boolean; data?: QuoteStatus; error?: string }>(`/api/quote/${orderNo}`),
};

// === ACCOUNT ===
export const accountApi = {
  profile: async () =>
    apiCall<{ success: boolean; data?: Customer }>("/api/account/profile", { auth: true }),

  orders: async () =>
    apiCall<{ success: boolean; data?: AccountOrders }>("/api/account/orders", { auth: true }),
};

// === CONTACT ===
export const contactApi = {
  send: async (data: ContactRequest) =>
    apiCall<{ success: boolean; error?: string }>("/api/contact", {
      method: "POST",
      body: data,
    }),
};

// === TYPES ===
export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  created_at?: string;
};

export type Service = {
  id: number;
  sku: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  source_language: string | null;
  target_language: string | null;
  unit: string;
  base_price: number;
  currency: string;
  active: number;
  image: string | null;
  tax_rate: number;
  delivery_type: string;
  sort_order: number;
  options: ServiceOption[];
};

export type ServiceOption = {
  label?: string;
  value?: string;
  price?: number;
  [key: string]: unknown;
};

export type QuoteRequest = {
  name: string;
  email: string;
  phone?: string;
  source_language: string;
  target_language: string;
  document_type?: string;
  page_count?: number;
  word_count?: number;
  notes?: string;
  file_key?: string;
  service_type?: string;
  urgency: string;
  delivery_method: string;
  shipping_address?: string;
  yeminli?: boolean;
  noter_onay?: boolean;
  notary_need?: boolean;
  apostille_need?: boolean;
  target_country?: string;
  delivery_date?: string;
  idempotency_key?: string;
};

export type QuoteStatus = {
  order_no: string;
  order_token: string;
  source_language: string;
  target_language: string;
  document_type: string | null;
  page_count: number | null;
  word_count: number | null;
  urgency: string;
  delivery_method: string;
  shipping_tracking: string | null;
  order_status: string;
  estimated_price: number | null;
  delivery_date: string | null;
  created_at: string;
};

export type AccountOrders = {
  quotes: QuoteRecord[];
  orders: OrderRecord[];
  payments: PaymentRecord[];
};

export type QuoteRecord = {
  id: number;
  name: string;
  email: string;
  source_language: string;
  target_language: string;
  document_type: string | null;
  page_count: number | null;
  word_count: number | null;
  urgency: string;
  delivery_method: string;
  order_status: string;
  estimated_price: number | null;
  delivery_date: string | null;
  delivered_file_key: string | null;
  created_at: string;
};

export type OrderRecord = {
  payment_link_id: string;
  customer_name: string;
  items: unknown[];
  total: number;
  status: string;
  delivery_method: string;
  shipping_tracking: string | null;
  delivered_file_key: string | null;
  created_at: string;
};

export type PaymentRecord = {
  amount: number;
  description: string | null;
  status: string;
  payment_link_id: string;
  created_at: string;
};

export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

// === UPLOAD ===
export const uploadApi = {
  upload: async (fileAsset: { uri: string; name: string; type: string; file?: File }, customerName: string) => {
    const token = await getToken();
    const formData = new FormData();
    // Web: File objesi kullan, Native: { uri, name, type } kullan
    const fileObj = Platform.OS === "web" && fileAsset.file
      ? fileAsset.file
      : { uri: fileAsset.uri, name: fileAsset.name, type: fileAsset.type } as any;
    formData.append("file", fileObj);
    formData.append("customer_name", customerName);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      let errorMessage = `Hata: ${response.status}`;
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json() as { success: boolean; file_key?: string; file_name?: string; error?: string };
    }
    const text = await response.text();
    return (text ? JSON.parse(text) : {}) as { success: boolean; file_key?: string; file_name?: string; error?: string };
  },
};

// === PAYMENT ===
export const paymentApi = {
  get: async (linkId: string) =>
    apiCall<{ success: boolean; data?: PaymentInfo; error?: string }>(`/api/payment/${linkId}`, { auth: true }),

  initialize: async (paymentLinkId: string) =>
    apiCall<{ success: boolean; payment_page_url?: string; error?: string }>("/api/payment/initialize", {
      method: "POST",
      body: { payment_link_id: paymentLinkId },
      auth: true,
    }),

  verify: async (token: string, conversationId: string, linkId: string) =>
    apiCall<{ success: boolean; status?: string; error?: string }>("/api/payment/verify", {
      method: "POST",
      body: { token, conversation_id: conversationId, link_id: linkId },
      auth: true,
    }),
};

export type PaymentInfo = {
  id: number;
  amount: number;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_link_id: string;
  status: string;
};
