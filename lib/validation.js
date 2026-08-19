// lib/validation.js — Merkezi Zod validation şemaları
import { z } from "zod";

// === Ortak şema parçaları ===
const emailSchema = z.string().email("Geçersiz e-posta").max(200);
const phoneSchema = z.string().max(20).optional().or(z.literal(""));
const nameSchema = z.string().min(2, "Ad en az 2 karakter olmalı").max(200, "Ad çok uzun");
const notesSchema = z.string().max(5000, "Notlar çok uzun").optional().or(z.literal(""));

// === POST /api/contact ===
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: z.string().min(5, "Mesaj en az 5 karakter olmalı").max(5000, "Mesaj çok uzun"),
});

// === POST /api/quote ===
export const quoteSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  source_language: z.string().min(1, "Kaynak dil zorunlu").max(100),
  target_language: z.string().min(1, "Hedef dil zorunlu").max(100),
  document_type: z.string().max(100).optional().or(z.literal("")),
  page_count: z.number().int().min(1).max(10000).nullish(),
  word_count: z.number().int().min(1).max(1000000).nullish(),
  notes: notesSchema,
  file_key: z.string().max(500).nullish().or(z.literal("")),
  service_type: z.string().max(100).optional().or(z.literal("")),
  urgency: z.enum(["standart", "hizli", "acil"]).optional().default("standart"),
  delivery_method: z.enum(["digital", "shipping"]).optional().default("digital"),
  shipping_address: z.string().max(1000).nullish().or(z.literal("")),
  notary_need: z.string().max(50).nullish().or(z.literal("")),
  apostille_need: z.string().max(50).nullish().or(z.literal("")),
  target_country: z.string().max(200).nullish().or(z.literal("")),
  delivery_date: z.string().max(50).nullish().or(z.literal("")),
  yeminli: z.boolean().optional().default(false),
  noter_onay: z.boolean().optional().default(false),
});

// === POST /api/orders ===
export const orderItemSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().min(0).optional(),
  quantity: z.number().int().min(1).max(100).optional(),
  unitPrice: z.number().min(0).optional(),
  totalPrice: z.number().min(0).optional(),
  productId: z.number().int().optional(),
  sku: z.string().max(100).optional(),
  options: z.record(z.string(), z.any()).optional(),
  page_count: z.number().int().min(1).max(10000).nullish(),
  word_count: z.number().int().min(1).max(1000000).nullish(),
  service_type: z.string().max(100).optional().or(z.literal("")),
  yeminli: z.boolean().optional(),
  noter_onay: z.boolean().optional(),
  urgency: z.enum(["standart", "hizli", "acil"]).optional(),
});

export const orderSchema = z.object({
  customer_name: nameSchema,
  customer_email: emailSchema,
  customer_phone: phoneSchema,
  items: z.array(orderItemSchema).min(1, "En az bir kalem gerekli").max(50),
  total: z.number().min(0, "Tutar negatif olamaz").max(1000000, "Tutar çok yüksek"),
  delivery_method: z.enum(["digital", "shipping"]).optional().default("digital"),
  shipping_address: z.string().max(1000).nullish().or(z.literal("")),
  file_keys: z.array(z.string().max(500)).max(20).optional(),
  source_language: z.string().max(100).optional().or(z.literal("")),
  target_language: z.string().max(100).optional().or(z.literal("")),
});

// === POST /api/calculate-price ===
export const calculatePriceSchema = z.object({
  product_id: z.number().int().min(1).optional(),
  sku: z.string().max(100).optional().or(z.literal("")),
  page_count: z.number().int().min(1).max(10000).nullish(),
  word_count: z.number().int().min(1).max(1000000).nullish(),
  service_type: z.string().max(100).optional().or(z.literal("")),
  urgency: z.enum(["standart", "hizli", "acil"]).optional(),
  yeminli: z.boolean().optional(),
  noter_onay: z.boolean().optional(),
  quantity: z.number().int().min(1).max(10000).optional(),
  options: z.record(z.string(), z.any()).optional(),
});

// === Yardımcı fonksiyon: request body'yi şemaya göre doğrula ===
// Dönüş: { success: true, data } veya { success: false, response }
export function validateBody(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0];
    const message = firstError ? firstError.message : "Geçersiz istek";
    return {
      success: false,
      response: new Response(JSON.stringify({ success: false, error: message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
  return { success: true, data: result.data };
}

// === POST /api/auth/register ===
export const authSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: z.string().min(6, "Sifre en az 6 karakter olmali").max(100),
  phone: phoneSchema,
});
