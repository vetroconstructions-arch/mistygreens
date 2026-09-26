#!/usr/bin/env python3
"""
FIX MISSING IMAGE ALT ATTRIBUTES
================================
Ensures 100% WCAG accessibility and Googlebot Image Indexing compliance:
1. Gives GTM noscript pixels explicit alt="Google Tag Manager"
2. Inspects any other <img> missing alt or with empty alt and adds keyword-rich semantic alt
"""

import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch', 'components'}

files_updated = 0
tags_fixed = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
    for f in files:
        if not f.endswith('.html'):
            continue
        fpath = os.path.join(root, f)
        try:
            content = open(fpath, encoding='utf-8', errors='ignore').read()
        except:
            continue

        if "<img" not in content.lower():
            continue

        orig = content
        
        # 1. Fix GTM noscript
        content = re.sub(
            r'<img\s+([^>]*src=["\']https://www\.googletagmanager\.com/ns\.html\?id=G-PARANJAPE["\'][^>]*?)alt=["\']["\']',
            r'<img \1alt="Google Tag Manager"',
            content,
            flags=re.IGNORECASE
        )
        content = re.sub(
            r'<img\s+([^>]*?)alt=["\']["\']([^>]*src=["\']https://www\.googletagmanager\.com/ns\.html\?id=G-PARANJAPE["\'][^>]*)>',
            r'<img \1alt="Google Tag Manager"\2>',
            content,
            flags=re.IGNORECASE
        )

        # 2. Fix other empty or missing alt tags
        def fix_tag(m):
            tag = m.group(0)
            src_m = re.search(r'src=["\']([^"\']+)["\']', tag, re.IGNORECASE)
            src = src_m.group(1).lower() if src_m else ""
            if "googletagmanager" in src:
                alt_text = "Google Tag Manager"
            elif "misty-greens" in src:
                alt_text = "Misty Greens NA Plots Forest Trails Bhugaon"
            elif "rivolo" in src:
                alt_text = "The Rivolo Luxury Villas Forest Trails Bhugaon"
            elif "cove" in src:
                alt_text = "The Cove Twin Bungalows Forest Trails Bhugaon"
            elif "canopy" in src:
                alt_text = "The Canopy Nature Apartments Forest Trails Bhugaon"
            elif "athashri" in src:
                alt_text = "Athashri Senior Living Forest Trails Bhugaon"
            elif "logo" in src:
                alt_text = "Paranjape Schemes Corporate Logo"
            else:
                alt_text = "Paranjape Forest Trails Township Bhugaon Pune"

            if 'alt=' in tag:
                # Replace empty alt="" or alt=''
                return re.sub(r'alt=["\']\s*["\']', f'alt="{alt_text}"', tag)
            else:
                # Insert alt before closing
                if tag.endswith('/>'):
                    return tag[:-2] + f' alt="{alt_text}" />'
                else:
                    return tag[:-1] + f' alt="{alt_text}">'

        # Find <img> tags with no alt or empty alt
        pattern = re.compile(r'<img\b(?![^>]*\balt=["\'][^"\']+["\'])[^>]*>', re.IGNORECASE)
        content = pattern.sub(fix_tag, content)

        if content != orig:
            open(fpath, 'w', encoding='utf-8').write(content)
            files_updated += 1

print(f"Updated image alt attributes in {files_updated} files.")
