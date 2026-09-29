with open("worker.js", "r", encoding="utf-8") as f:
    content = f.read()

old = '''        const readable = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of aiStream) {
                const text = chunk.response || "";
                if (text) {
                  controller.enqueue(encoder.encode("data: " + JSON.stringify({ text }) + "\\n\\n"));
                }
              }
              controller.enqueue(encoder.encode("data: " + JSON.stringify({ done: true, sessionId: sessionId || Date.now().toString() }) + "\\n\\n"));
              controller.close();
            } catch(err) {
              controller.enqueue(encoder.encode("data: " + JSON.stringify({ done: true, error: true }) + "\\n\\n"));
              controller.close();
            }
          }
        });

        return new Response(readable, { headers: streamHeaders });'''

new = '''        const readable = new ReadableStream({
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

if old not in content:
    print("HATA: Stream blogu bulunamadi!")
    exit(1)

content = content.replace(old, new)

with open("worker.js", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Stream okuma duzeltildi — getReader() ile")
