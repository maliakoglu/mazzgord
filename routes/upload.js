// POST /api/upload — R2'ye dosya yükle (anlamlı isimlendirme)
import { corsHeaders } from "../lib/cors.js";

export async function handleUpload(request, env) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const customerName = formData.get("customer_name") || "Bilinmeyen";
    if (!file) {
      return new Response(JSON.stringify({ success: false, error: "Dosya yok" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // File size validation — 10MB max
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ success: false, error: "Dosya boyutu 10MB'den buyuk" }), {
        status: 413,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // File type validation
    const allowedExtensions = [".pdf", ".doc", ".docx", ".txt", ".rtf", ".jpg", ".jpeg", ".png"];
    const fileExt = "." + (file.name.split(".").pop() || "").toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      return new Response(JSON.stringify({ success: false, error: "Desteklenmeyen dosya turu" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Dosya adını düzenle: Mehmet-Akoglu_2026-07-12_1430_pasaport.pdf
    const dateStr = new Date().toISOString().split("T")[0];
    const timeStr = new Date().toTimeString().split(" ")[0].replace(/:/g, "");
    const safeName = customerName
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    const safeFileName = file.name
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${safeName}_${dateStr}_${timeStr}_${safeFileName}`;
    const fileKey = `uploads/${fileName}`;

    await env.DOCS.put(fileKey, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    return new Response(JSON.stringify({ success: true, file_key: fileKey, file_name: file.name }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}
