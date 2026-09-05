// /api/services — Hizmet ürünü kataloğu API
import { corsHeaders, checkAdminAuth, unauthorizedResponse } from "../lib/cors.js";
import { serviceCreateSchema, serviceUpdateSchema, validateBody } from "../lib/validation.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function parseOptions(optionsJson) {
  if (!optionsJson) return [];
  try {
    return JSON.parse(optionsJson);
  } catch {
    return [];
  }
}

export async function handleServicesRoute(path, request, env) {
  // GET /api/services — Aktif hizmetleri listele (public)
  if (path === "/api/services" && request.method === "GET") {
    try {
      const result = await env.DB.prepare(
        "SELECT * FROM services WHERE active = 1 ORDER BY sort_order ASC, id ASC"
      ).all();
      const services = result.results.map((s) => ({
        ...s,
        options: parseOptions(s.options),
      }));
      return jsonResponse({ success: true, data: services });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // GET /api/services/categories — Kategori listesi (public)
  if (path === "/api/services/categories" && request.method === "GET") {
    try {
      const result = await env.DB.prepare(
        "SELECT DISTINCT category FROM services WHERE active = 1 ORDER BY category ASC"
      ).all();
      return jsonResponse({ success: true, data: result.results.map((r) => r.category) });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // GET /api/services/:slug — Tek hizmet getir (public)
  const singleMatch = path.match(/^\/api\/services\/([a-z0-9-]+)$/);
  if (singleMatch && request.method === "GET") {
    try {
      const slug = singleMatch[1];
      const service = await env.DB.prepare(
        "SELECT * FROM services WHERE slug = ? AND active = 1"
      ).bind(slug).first();
      if (!service) return jsonResponse({ success: false, error: "Hizmet bulunamadi" }, 404);
      return jsonResponse({ success: true, data: { ...service, options: parseOptions(service.options) } });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // === ADMIN ENDPOINTS ===

  // GET /api/admin/services — Tüm hizmetleri listele (admin, pasif dahil)
  if (path === "/api/admin/services" && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const result = await env.DB.prepare(
        "SELECT * FROM services ORDER BY sort_order ASC, id ASC"
      ).all();
      const services = result.results.map((s) => ({
        ...s,
        options: parseOptions(s.options),
      }));
      return jsonResponse({ success: true, data: services });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // POST /api/admin/services — Yeni hizmet ekle (admin)
  if (path === "/api/admin/services" && request.method === "POST") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const body = await request.json();
      const validation = validateBody(serviceCreateSchema, body);
      if (!validation.success) return validation.response;
      const { sku, slug, name, description, category, source_language, target_language, unit, base_price, currency, image, tax_rate, delivery_type, sort_order, options } = validation.data;

      const optionsJson = options ? JSON.stringify(options) : null;
      await env.DB.prepare(
        "INSERT INTO services (sku, slug, name, description, category, source_language, target_language, unit, base_price, currency, active, image, tax_rate, delivery_type, sort_order, options) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?)"
      ).bind(
        sku, slug, name, description || null, category,
        source_language || null, target_language || null,
        unit || 'page', base_price, currency || 'TRY',
        image || null, tax_rate ?? 0.20, delivery_type || 'digital',
        sort_order || 0, optionsJson
      ).run();

      return jsonResponse({ success: true, message: "Hizmet eklendi", sku });
    } catch (err) {
      if (String(err).includes("UNIQUE")) {
        return jsonResponse({ success: false, error: "Bu SKU veya slug zaten mevcut" }, 409);
      }
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // PUT /api/admin/services/:id — Hizmet güncelle (admin)
  const updateMatch = path.match(/^\/api\/admin\/services\/(\d+)$/);
  if (updateMatch && request.method === "PUT") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const id = updateMatch[1];
      const body = await request.json();
      const validation = validateBody(serviceUpdateSchema, body);
      if (!validation.success) return validation.response;
      const validated = validation.data;

      const allowedFields = ["sku", "slug", "name", "description", "category", "source_language", "target_language", "unit", "base_price", "currency", "active", "image", "tax_rate", "delivery_type", "sort_order", "options"];
      const updates = [];
      const values = [];

      for (const field of allowedFields) {
        if (validated[field] !== undefined) {
          if (field === "options") {
            updates.push("options = ?");
            values.push(JSON.stringify(validated[field]));
          } else {
            updates.push(`${field} = ?`);
            values.push(validated[field]);
          }
        }
      }

      if (updates.length === 0) {
        return jsonResponse({ success: false, error: "Guncellenecek alan yok" }, 400);
      }

      updates.push("updated_at = datetime('now')");
      values.push(id);

      await env.DB.prepare(
        `UPDATE services SET ${updates.join(", ")} WHERE id = ?`
      ).bind(...values).run();

      return jsonResponse({ success: true, message: "Hizmet guncellendi", id: Number(id) });
    } catch (err) {
      if (String(err).includes("UNIQUE")) {
        return jsonResponse({ success: false, error: "Bu SKU veya slug zaten mevcut" }, 409);
      }
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // DELETE /api/admin/services/:id — Hizmet sil (admin)
  const deleteMatch = path.match(/^\/api\/admin\/services\/(\d+)$/);
  if (deleteMatch && request.method === "DELETE") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const id = deleteMatch[1];
      await env.DB.prepare("DELETE FROM services WHERE id = ?").bind(id).run();
      return jsonResponse({ success: true, message: "Hizmet silindi", id: Number(id) });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  return null;
}
