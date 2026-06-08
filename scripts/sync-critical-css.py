import os
import re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
INDEX_PATH = os.path.join(BASE_DIR, 'index.html')

def extract_critical_css():
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        html = f.read()
    pattern = re.compile(r'(<style id="critical-css">.*?</style>)', re.IGNORECASE | re.DOTALL)
    match = pattern.search(html)
    return match.group(1) if match else None

def sync_critical_css():
    css_content = extract_critical_css()
    if not css_content:
        print("❌ Critical CSS block not found in index.html!")
        return

    pattern = re.compile(r'(<style id="critical-css">.*?</style>)', re.IGNORECASE | re.DOTALL)
    changed = 0

    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('node_modules', 'scripts', 'brain')]
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if file_path == INDEX_PATH:
                    continue

                with open(file_path, 'r', encoding='utf-8') as f:
                    html = f.read()

                if pattern.search(html):
                    new_html = pattern.sub(css_content.replace('\\', '\\\\'), html)
                    if new_html != html:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_html)
                        changed += 1

    print(f"✅ Synchronized Critical CSS to {changed} cluster pages.")

if __name__ == '__main__':
    sync_critical_css()
