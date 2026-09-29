with open("worker.js", "r", encoding="utf-8") as f:
    content = f.read()

old = '''        const readable = new ReadableStream({
          async start(controller) {
            try {
              const reader = aiStream.getReader();
              const decoder = new TextDecoder();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const text = decoder.decode(value, { stream: true });
                if (text) {
                  controller.enqueue(encoder.encode("data: " + JSON.stringify({ text }) + "\\n\\n"));
                }
              }
              controller.enqueue(encoder.encode("data: " + JSON.stringify({ done: true, sessionId: sessionId || Date.now().toString() }) + "\\n\\n"));
              controller.close();
            } catch(err) {
              console.log("Stream okuma hatasi:", String(err));
              controller.enqueue(encoder.encode("data: " + JSON.stringify({ done: true, error: true }) + "\\n\\n"));
              controller.close();
            }
          }
        });

        return new Response(readable, { headers: streamHeaders });'''

new = '''        // AI stream'i zaten SSE formatinda — dogrudan passthrough
        return new Response(aiStream, { headers: streamHeaders });'''

if old not in content:
    print("HATA: Stream blogu bulunamadi!")
    exit(1)

content = content.replace(old, new)

# encoder degiskeni artik kullanilmiyor — kaldir
content = content.replace("        const encoder = new TextEncoder();\n", "")

with open("worker.js", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Worker passthrough duzeltildi")
