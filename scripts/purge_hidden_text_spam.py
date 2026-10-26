#!/usr/bin/env python3
"""
Purge all black-hat hidden text keyword spam from HTML pages.
Eliminates Google SpamBrain algorithmic suppression risk.
"""

import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch', 'components'}

PATTERNS = [
    re.compile(r'<!--\s*Sovereign Cluster Mesh.*?</div>', re.DOTALL),
    re.compile(r'<!--\s*Sovereign ROI Intelligence Mesh.*?</div>', re.DOTALL),
    re.compile(r'<!--\s*Hyper-Local Proximity Mesh.*?</div>', re.DOTALL),
    re.compile(r'<div\s+class="seo-mesh-footer"[^>]*style="[^"]*display:\s*none[^"]*"[^>]*>.*?</div>', re.DOTALL)
]

def clean_file(fpath):
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    original = content
    for pattern in PATTERNS:
        content = pattern.sub('', content)

    if content != original:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    cleaned_count = 0
    total_files = 0
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if f.endswith('.html'):
                total_files += 1
                if clean_file(os.path.join(root, f)):
                    cleaned_count += 1

    print(f"✅ Cleaned hidden text spam from {cleaned_count} / {total_files} HTML files.")

if __name__ == '__main__':
    main()
