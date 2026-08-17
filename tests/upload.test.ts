import { describe, it, expect, vi } from "vitest";
import { handleUpload } from "../routes/upload.js";

function createMockEnv() {
  return {
    DOCS: {
      put: vi.fn(async () => ({})),
    },
  };
}

function createUploadRequest(filename: string, content: string, customerName = "Mehmet Akoglu") {
  const formData = new FormData();
  const blob = new Blob([content], { type: "text/plain" });
  formData.append("file", blob, filename);
  formData.append("customer_name", customerName);
  return new Request("https://mazzgord.com/api/upload", {
    method: "POST",
    headers: { Origin: "https://mazzgord.com" },
    body: formData,
  });
}

describe("handleUpload", () => {
  it("should accept valid file upload", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("test.pdf", "test content"), env);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.file_key).toContain("uploads/");
    expect(env.DOCS.put).toHaveBeenCalled();
  });

  it("should reject missing file", async () => {
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

  it("should reject unsupported file type", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("test.exe", "malware"), env);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(res.status).toBe(400);
  });

  it("should accept .docx file", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("document.docx", "doc content"), env);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("should accept .jpg file", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("photo.jpg", "image data"), env);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("should sanitize customer name in file key", async () => {
    const env = createMockEnv();
    const res = await handleUpload(createUploadRequest("test.pdf", "content", "Mehmet Akoğlu"), env);
    const body = await res.json();
    expect(body.file_key).toContain("Mehmet-Akoglu");
  });
});
