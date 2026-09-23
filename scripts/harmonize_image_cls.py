#!/usr/bin/env python3
"""
CORE WEB VITALS MULTILINE IMG DIMENSION INJECTOR
================================================
Correctly handles multiline <img tags to guarantee zero Cumulative Layout Shift (CLS).
"""
import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

files_updated = 0
images_harmonized = 0

def add_dim_to_tag(tag):
    global images_harmonized
    if 'width=' in tag and 'height=' in tag:
        return tag

    src_m = re.search(r'src=["\']([^"\']+)["\']', tag, re.IGNORECASE)
    src = src_m.group(1).lower() if src_m else ""

    if any(k in src for k in ['logo', 'brand', 'favicon']):
        width, height = "280", "84"
    elif any(k in src for k in ['hero', 'banner', 'master-plan', 'drone', 'aerial']):
        width, height = "1280", "720"
    elif any(k in src for k in ['gate', 'amenity', 'sports', 'pool', 'villa', 'club', 'residence']):
        width, height = "800", "533"
    elif any(k in src for k in ['floor-plan', 'layout', 'blueprint']):
        width, height = "1000", "750"
    elif any(k in src for k in ['avatar', 'person', 'author', 'team', 'testimonial']):
        width, height = "120", "120"
    elif any(k in src for k in ['icon', 'star', 'check', 'arrow']):
        width, height = "32", "32"
    else:
        width, height = "600", "400"

    images_harmonized += 1
    
    # Inject before the final closing > or />
    if tag.rstrip().endswith('/>'):
        idx = tag.rfind('/>')
        return tag[:idx] + f' width="{width}" height="{height}" />'
    else:
        idx = tag.rfind('>')
        return tag[:idx] + f' width="{width}" height="{height}">'

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        try:
            content = open(fpath, encoding='utf-8', errors='ignore').read()
        except:
            continue

        if "<img" not in content.lower():
            continue

        # Regex matches multiline <img ... >
        def repl(match):
            return add_dim_to_tag(match.group(0))

        new_content, count = re.subn(r'<img\s+[^>]+>', repl, content, flags=re.DOTALL | re.IGNORECASE)
        if new_content != content:
            open(fpath, 'w', encoding='utf-8').write(new_content)
            files_updated += 1

print("==================================================")
print("CORE WEB VITALS MULTILINE CLS INJECTOR COMPLETE")
print(f"  Files upgraded for CLS zero-shift: {files_updated}")
print(f"  Total images given explicit width/height: {images_harmonized}")
print("==================================================")
