import os
import http.server
import socketserver

DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist", "public")

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST, **kwargs)

    def do_GET(self):
        # Dosya yolunu ayikla
        path = self.translate_path(self.path)

        # Eger dosya yoksa VE .html/.js/.css/.png vb degilse, index.html'e fallback
        if not os.path.exists(path):
            # Statik asset'leri (assets/, .js, .css, .png, .webp, .svg, .ico, .txt, .xml, .json) fallback disi birak
            ext = os.path.splitext(self.path)[1].lower()
            asset_exts = {".js", ".css", ".png", ".webp", ".svg", ".ico", ".jpg", ".jpeg", ".gif", ".txt", ".xml", ".json", ".woff", ".woff2", ".map"}
            if ext not in asset_exts and not self.path.startswith("/assets/"):
                # SPA fallback: index.html serve et
                self.path = "/index.html"

        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

if __name__ == "__main__":
    PORT = 3001
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        httpd.serve_forever()
