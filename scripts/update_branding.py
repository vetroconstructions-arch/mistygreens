import os
import re

def update_branding(base_dir):
    new_header_logo = """            <a href="/" class="nav-brand">
                <div class="brand-logo-text">
                    <span class="brand-main">PARANJAPE</span>
                    <span class="brand-sub">Forest Trails</span>
                </div>
            </a>"""
    
    new_loader_logo = """            <div class="loader-logo">
                <div class="brand-logo-text" style="align-items: center; text-align: center;">
                    <span class="brand-main" style="color: #fff; font-size: 2.5rem;">PARANJAPE</span>
                    <span class="brand-sub" style="color: var(--pscl-gold); font-size: 0.8rem; margin-top: 5px;">Forest Trails</span>
                </div>
            </div>"""

    header_pattern = re.compile(r'<a href="/" class="nav-brand"><img src="/assets/branding/logo\.png"[^>]*></a>')
    loader_pattern = re.compile(r'<div class="loader-logo"><img src="/assets/branding/logo\.png"[^>]*></div>')

    count = 0
    for root, _, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or '.wrangler' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    original_content = content
                    content = header_pattern.sub(new_header_logo, content)
                    content = loader_pattern.sub(new_loader_logo, content)
                    if content != original_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        count += 1
                except Exception as e:
                    print(f"Error in {file_path}: {e}")

    print(f"Updated {count} HTML files with new branding.")

if __name__ == "__main__":
    update_branding('.')
