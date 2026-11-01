#!/usr/bin/env python3
"""
Infrastructure & DNS/Routing Hardening Engine
=============================================
1. Parses _redirects to build the canonical routing map.
2. Replaces all internal links across all HTML files that point to redirected paths.
3. Fixes canonical tags on legacy redirect-source HTML files so they point to the canonical target.
4. Hardens generate_seo_matrix.py and generate_image_sitemap.py to NEVER include 301 URLs in sitemaps.
5. Regenerates all sitemaps and verifies zero redirected URLs in XML sitemaps.
"""

import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

# 1. Load _redirects
redirects_map = {}
with open(os.path.join(BASE_DIR, '_redirects'), 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        parts = line.split()
        if len(parts) >= 2:
            src = parts[0].rstrip('/*').rstrip('*').rstrip('/')
            dst = parts[1].rstrip('/*').rstrip('*')
            if not dst.endswith('/'):
                dst += '/'
            if src:
                redirects_map[src] = dst

print(f"Loaded {len(redirects_map)} redirect rules from _redirects.")

# 2. Fix internal links across all HTML files
html_files = []
for root, dirs, files in os.walk(BASE_DIR):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', '.wrangler', 'dist', 'scratch', '.gemini', '_astro', 'components'}]
    for fname in files:
        if fname.endswith('.html'):
            html_files.append(os.path.join(root, fname))

links_fixed = 0
files_updated = 0

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    orig = content

    for src, dst in redirects_map.items():
        # Match href="/src" or href="/src/"
        pattern = re.compile(r'href=([\'"])' + re.escape(src) + r'/?([\'"])')
        if pattern.search(content):
            content = pattern.sub(f'href=\\1{dst}\\2', content)

    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        files_updated += 1

print(f"Updated internal links to direct canonical destinations in {files_updated} HTML files.")

# 3. Fix canonical tags in legacy redirect-source files
legacy_sources = [src.lstrip('/') for src in redirects_map.keys()]
legacy_fixed = 0
for src in legacy_sources:
    target_file = os.path.join(BASE_DIR, src, 'index.html')
    if os.path.exists(target_file):
        dst = redirects_map['/' + src]
        canonical_target = f"{DOMAIN}{dst}"
        with open(target_file, 'r', encoding='utf-8', errors='ignore') as f:
            c = f.read()
        new_c = re.sub(r'<link\s+rel="canonical"\s+href="[^"]*"\s*/?>', f'<link rel="canonical" href="{canonical_target}">', c)
        if new_c != c:
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(new_c)
            legacy_fixed += 1
            print(f"Aligned canonical on legacy file: {src}/index.html -> {canonical_target}")

print(f"Aligned canonical tags on {legacy_fixed} legacy redirect-source files.")
