import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = os.getcwd()

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

print(f"🚀 Sovereign Preview Server Starting...")
print(f"📍 Root: {DIRECTORY}")
print(f"🔗 URL: http://localhost:{PORT}")
print(f"💡 Use this to view the site correctly (respects absolute paths /assets/...)")
print(f"Press Ctrl+C to stop.")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped.")
        httpd.server_close()
