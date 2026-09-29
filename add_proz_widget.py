with open("client/src/components/home/About.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) useEffect import ekle
old_import = "export default function About() {"
new_import = """import { useEffect, useRef } from "react";

export default function About() {
  const prozRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ProZ Remoto widget script'ini yükle
    const existing = document.querySelector('script[src="https://www.proz.com/remoto/embed.js"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://www.proz.com/remoto/embed.js";
    script.defer = true;
    script.setAttribute("data-pool-id", "99200081");
    script.setAttribute("data-theme", "auto");
    script.setAttribute("data-max-width", "440");
    document.body.appendChild(script);
  }, []);"""

if old_import in content and "proz" not in content.lower():
    content = content.replace(old_import, new_import, 1)
    print("1 OK - import ve useEffect eklendi")
else:
    print("1 SKIP")

# 2) Widget container'ı section kapanışından önce ekle
old_end = """        </div>
      </div>
    </section>
  );
}"""

new_end = """        </div>

        {/* ProZ Remoto Widget */}
        <div className="mt-12 flex justify-center">
          <div ref={prozRef} data-remoto-embed></div>
        </div>
      </div>
    </section>
  );
}"""

if old_end in content and "data-remoto-embed" not in content:
    content = content.replace(old_end, new_end, 1)
    print("2 OK - widget container eklendi")
else:
    print("2 SKIP")

with open("client/src/components/home/About.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Tamam.")
