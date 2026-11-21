// POST /api/upload — R2'ye dosya yükle
// Rastgele anahtar + gerçek dosya imzası (magic bytes) doğrulaması
import { corsHeaders } from "../lib/cors.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED = {
  ".pdf":  ["application/pdf"],
  ".doc":  ["application/msword"],
  ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ".txt":  ["text/plain"],
  ".rtf":  ["application/rtf", "text/rtf"],
  ".jpg":  ["image/jpeg"],
  ".jpeg": ["image/jpeg"],
  ".png":  ["image/png"],
  ".webp": ["image/webp"],
};

function matchesSignature(b, ext) {
  const sw = (sig) => sig.every((v, i) => b[i] === v);
  switch (ext) {
    case ".pdf":  return sw([0x25, 0x50, 0x44, 0x46]);
    case ".jpg":
    case ".jpeg": return sw([0xff, 0xd8, 0xff]);
    case ".png":  return sw([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case ".webp": return sw([0x52, 0x49, 0x46, 0x46]) &&
                         b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50;
    case ".doc":  return sw([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    case ".docx": return sw([0x50, 0x4b, 0x03, 0x04]);
    case ".rtf":  return sw([0x7b, 0x5c, 0x72, 0x74, 0x66]);
    case ".txt":  return true; // metin dosyasinin imzasi yok
    default:      return false;
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function handleUpload(request, env) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const customerName = formData.get("customer_name") || "";

    if (!file || typeof file === "string") {
      return json({ success: false, error: "Dosya yok" }, 400);
    }
    if (file.size === 0) {
      return json({ success: false, error: "Bos dosya" }, 400);
    }
    if (file.size > MAX_FILE_SIZE) {
      return json({ success: false, error: "Dosya boyutu 10MB'den buyuk" }, 413);
    }

    const rawName = (file.name || "").toLowerCase();
    const dot = rawName.lastIndexOf(".");
    const ext = dot === -1 ? "" : rawName.slice(dot);

    if (!ALLOWED[ext]) {
      return json({ success: false, error: "Desteklenmeyen dosya turu" }, 400);
    }
    if (file.type && !ALLOWED[ext].includes(file.type)) {
      return json({ success: false, error: "Gecersiz dosya MIME turu" }, 400);
    }

    const buffer = await file.arrayBuffer();
    const head = new Uint8Array(buffer.slice(0, 16));
    if (!matchesSignature(head, ext)) {
      return json({ success: false, error: "Dosya icerigi uzantisiyla uyusmuyor" }, 400);
    }

    const fileKey = `uploads/${crypto.randomUUID()}${ext}`;
    const retentionUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

    await env.DOCS.put(fileKey, buffer, {
      httpMetadata: { contentType: file.type || ALLOWED[ext][0] },
      customMetadata: {
        uploaded_at: new Date().toISOString(),
        retention_until: retentionUntil,
        customer_name: String(customerName).slice(0, 80),
        original_filename: rawName.replace(/[^a-z0-9._-]/g, "_").slice(0, 120),
      },
    });

    return json({ success: true, file_key: fileKey, file_name: file.name });
  } catch (err) {
    return json({ success: false, error: "Sunucu hatasi" }, 500);
  }
}
