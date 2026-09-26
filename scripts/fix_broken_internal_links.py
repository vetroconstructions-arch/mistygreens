#!/usr/bin/env python3
"""
FIX BROKEN INTERNAL LINKS
=========================
Maps legacy or nonexistent internal links to their canonical destinations:
- /apartments/ -> /paranjape-forest-trails-township-bhugaon-apartments/
- /villas/ -> /paranjape-forest-trails-township-bhugaon-luxury-forest-villas-bhugaon/
- /rera-compliance-guide/ -> /rera-status-forest-trails/
- /paranjape-forest-trails-township-bhugaon-contact/ -> /paranjape-schemes-contact/
- /contact/ -> /paranjape-schemes-contact/
- /contact -> /paranjape-schemes-contact/
- /athashri/ -> /paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/
- /the-verandah/ -> /paranjape-forest-trails-township-bhugaon-verandah/
- /orchard-residences/ -> /paranjape-forest-trails-township-bhugaon-orchard-residences/
- /everglades/ -> /paranjape-forest-trails-township-bhugaon-everglades/
- /stamp-duty-plots-pune-2026/ -> /paranjape-forest-trails-township-bhugaon-blogs/stamp-duty-plots-pune-2026/
- /paranjape-forest-trails-township-bhugaon-brochure/ -> /paranjape-forest-trails-bhugaon-floor-plan-2026/
"""

import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LINK_REPLACEMENTS = [
    (r'href=["\']/apartments/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-apartments/"'),
    (r'href=["\']/villas/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-luxury-forest-villas-bhugaon/"'),
    (r'href=["\']/rera-compliance-guide/?["\']', 'href="/rera-status-forest-trails/"'),
    (r'href=["\']/paranjape-forest-trails-township-bhugaon-contact/?["\']', 'href="/paranjape-schemes-contact/"'),
    (r'href=["\']/contact/?["\']', 'href="/paranjape-schemes-contact/"'),
    (r'href=["\']/athashri/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"'),
    (r'href=["\']/the-verandah/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-verandah/"'),
    (r'href=["\']/orchard-residences/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-orchard-residences/"'),
    (r'href=["\']/everglades/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-everglades/"'),
    (r'href=["\']/stamp-duty-plots-pune-2026/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-blogs/stamp-duty-plots-pune-2026/"'),
    (r'href=["\']/paranjape-forest-trails-township-bhugaon-brochure/?["\']', 'href="/paranjape-forest-trails-bhugaon-floor-plan-2026/"'),
]

files_modified = 0
total_replacements = 0

EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch', 'components'}

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

        orig = content
        repl_count = 0
        for pattern, repl in LINK_REPLACEMENTS:
            content, count = re.subn(pattern, repl, content)
            repl_count += count

        if repl_count > 0:
            open(fpath, 'w', encoding='utf-8').write(content)
            files_modified += 1
            total_replacements += repl_count

print(f"Fixed {total_replacements} broken link instances across {files_modified} files.")
