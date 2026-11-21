import { describe, it, expect, vi } from "vitest";
import { handleUpload } from "../routes/upload.js";

const SIGNATURES: Record<string, { mime: string; bytes: number[] }> = {
  pdf:  { mime: "application/pdf", bytes: [0x25, 0x50, 0x44, 0x46] },
  docx: { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", bytes: [0x50, 0x4b, 0x03, 0x04] },
  jpg:  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  jpeg: { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  png:  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  txt:  { mime: "text/plain", bytes: [] },
};

function createMockEnv() {
  return {
    DOCS: { put: vi.fn(async () => ({})) },
  };
}

function createUploadRequest(
  filename: string,
  content = "test content",
  customerName = "Mehmet Akoglu",
  overrideBytes?: number[],
) {
  const ext = filename.split(".").pop()!.toLowerCase();
  const sig = SIGNATURES[ext];
  const mime = sig ? sig.mime : "application/octet-stream";
  const prefix = overrideBytes ?? (sig ? sig.bytes : []);
  const body = new Uint8Array([...prefix, ...new TextEncoder().encode(content)]);
  const formData = new FormData();
  formData.append("file", new Blob([body], { type: mime }), filename);
  formData.append("customer_name", customerName);
  return new Request("https://mazzgord.com/api/upload", {
    method: "POST",
    headers: { Origin: "https://mazzgord.com" },
    body: formData,
  });
}

describe("handleUpload", () => {
  it("gecerli PDF kabul edilir", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("test.pdf"), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.file_key).toContain("uploads/");
    expect(env.DOCS.put).toHaveBeenCalled();
  });

  it("dosya yoksa 400", async () => {
    const env = createMockEnv();
    const formData = new FormData();
    formData.append("customer_name", "Mehmet");
    const res = await handleUpload(new Request("https://mazzgord.com/api/upload", {
      method: "POST",
      headers: { Origin: "https://mazzgord.com" },
      body: formData,
    }), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("desteklenmeyen uzanti reddedilir", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("test.exe", "malware"), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it(".docx kabul edilir", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("document.docx"), env);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it(".jpg kabul edilir", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("photo.jpg"), env);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("dosya adi rastgele UUID olur, musteri adi icermez", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("test.pdf", "content", "Mehmet Akoğlu"), env);
    const body = await res.json();
    expect(body.file_key).toMatch(/^uploads\/[0-9a-f-]{36}\.pdf$/);
    expect(body.file_key).not.toContain("Mehmet");
  });

  it("icerik uzantiyla uyusmuyorsa reddedilir", async () => {
    const env = createMockEnv();
    const res = await handleUpload(
      createUploadRequest("sahte.pdf", "x", "Test", [0xff, 0xd8, 0xff]),
      env,
    );
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });
});
