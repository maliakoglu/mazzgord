import re

with open("worker.js", "r", encoding="utf-8") as f:
    content = f.read()

old = '''        let reply = "";
        let aiResponse;
        try {
          aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-10)
            ],
            max_tokens: 500,
            temperature: 0.3,
          });
          reply = aiResponse.response || aiResponse.result || aiResponse.text || "";
        } catch(e1) {
          console.log("Llama-3.3-70B hatasi:", String(e1));
          try {
            aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
              messages: [
                { role: "system", content: systemPrompt },
                ...messages.slice(-10)
              ],
              max_tokens: 300,
            });
            reply = aiResponse.response || "";
          } catch(e2) {
            console.log("Llama hatasi:", String(e2));
          }
        }

        if (!reply) {
          reply = "Su anda teknik bir sorun yasiyoruz. Lutfen info@mazzgord.com adresine e-posta gonderin veya +90 538 629 50 40 numarasindan bana ulasin.";
        }

        const estInputTokens = Math.ceil((systemPrompt.length + messages.reduce((s, m) => s + (m.content || "").length, 0)) / 4);
        const estOutputTokens = Math.ceil((reply || "").length / 4);

        return new Response(JSON.stringify({
          success: true,
          reply: reply,
          sessionId: sessionId || Date.now().toString(),
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });'''

new = '''        // Streaming response — AI yanitini token token gonder
        const streamHeaders = {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          ...corsHeaders,
        };

        const encoder = new TextEncoder();

        let aiStream;
        try {
          aiStream = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-10)
            ],
            max_tokens: 500,
            temperature: 0.3,
            stream: true,
          });
        } catch(e1) {
          console.log("Llama-3.3-70B streaming hatasi:", String(e1));
          try {
            aiStream = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
              messages: [
                { role: "system", content: systemPrompt },
                ...messages.slice(-10)
              ],
              max_tokens: 300,
              stream: true,
            });
          } catch(e2) {
            console.log("Llama streaming hatasi:", String(e2));
            return new Response(JSON.stringify({ success: false, error: "AI hatasi" }), {
              status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }
        }

        const readable = new ReadableStream({
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

if old not in content:
    print("HATA: Eski kod blogu bulunamadi!")
    exit(1)

content = content.replace(old, new)

with open("worker.js", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: worker.js streaming patch uygulandi")
