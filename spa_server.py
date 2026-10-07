import os
import http.server
import socketserver
import json

DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist", "public")

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST, **kwargs)

    def do_GET(self):
        # API pricing isteklerini local JSON'dan servis et (prerender icin)
        if self.path == "/api/pricing":
            pricing_path = os.path.join(DIST, "api", "pricing.json")
            if os.path.exists(pricing_path):
                with open(pricing_path, "r", encoding="utf-8") as f:
                    data = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-cache")
                self.end_headers()
                self.wfile.write(data.encode("utf-8"))
                return

        # Dosya yolunu ayikla
        path = self.translate_path(self.path)

        # Eger dosya yoksa VE .html/.js/.css/.png vb degilse, index.html'e fallback
        if not os.path.exists(path):
            ext = os.path.splitext(self.path)[1].lower()
            asset_exts = {".js", ".css", ".png", ".webp", ".svg", ".ico", ".jpg", ".jpeg", ".gif", ".txt", ".xml", ".json", ".woff", ".woff2", ".map"}
            if ext not in asset_exts and not self.path.startswith("/assets/"):
                self.path = "/index.html"

        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

if __name__ == "__main__":
    PORT = 3001
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        httpd.serve_forever()
