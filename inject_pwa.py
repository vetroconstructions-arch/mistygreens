import os, glob, re
for html_file in glob.glob('**/*.html', recursive=True):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'serviceWorker' not in content:
        content = content.replace('</body>', '    <!-- Service Worker Registration -->\n    <script>\n        if ("serviceWorker" in navigator) {\n            window.addEventListener("load", () => {\n                navigator.serviceWorker.register("/sw.js").catch(err => console.error("SW failed: ", err));\n            });\n        }\n    </script>\n</body>')
    if 'rel="preconnect"' not in content:
        content = content.replace('<head>', '<head>\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link rel="preconnect" href="https://cdnjs.cloudflare.com">\n    <link rel="dns-prefetch" href="https://formsubmit.co">\n    <link rel="dns-prefetch" href="https://www.googletagmanager.com">')
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
