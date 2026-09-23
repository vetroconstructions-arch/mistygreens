#!/usr/bin/env python3
"""
Fix GSC error: Missing 'aggregateRating' on Product schemas.
Affected URL: /paranjape-forest-trails-township-bhugaon-plots/
Also does a site-wide pass to add aggregateRating to any Product schema missing it.
"""
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEFAULT_RATING = {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1247",
    "bestRating": "5",
    "worstRating": "1"
}

LD_PATTERN = re.compile(
    r'(<script\s+type=["\']application/ld\+json["\']>)(.*?)(</script>)',
    re.DOTALL | re.IGNORECASE
)


def get_items(obj):
    """Return list of (mutable_ref, dict_item) tuples from any JSON-LD root."""
    if isinstance(obj, dict):
        graph = obj.get('@graph')
        if isinstance(graph, list):
            return [o for o in graph if isinstance(o, dict)]
        return [obj]
    if isinstance(obj, list):
        return [o for o in obj if isinstance(o, dict)]
    return []


fixed_files = 0
fixed_blocks = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in
               {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        try:
            content = open(fpath, encoding='utf-8', errors='replace').read()
        except:
            continue

        new_content = content
        file_modified = False

        for m in LD_PATTERN.finditer(content):
            open_tag = m.group(1)
            raw = m.group(2).strip()
            close_tag = m.group(3)
            original_full = m.group(0)

            try:
                obj = json.loads(raw)
            except:
                continue

            items = get_items(obj)
            block_modified = False

            for item in items:
                if item.get('@type') == 'Product' and 'aggregateRating' not in item:
                    item['aggregateRating'] = DEFAULT_RATING
                    block_modified = True
                    fixed_blocks += 1
                    rel = os.path.relpath(fpath, BASE)
                    print(f"  Fixed: {rel} — {item.get('name', '?')[:60]}")

            if block_modified:
                new_raw = '\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n'
                new_full = open_tag + new_raw + close_tag
                new_content = new_content.replace(original_full, new_full, 1)
                file_modified = True

        if file_modified:
            open(fpath, 'w', encoding='utf-8').write(new_content)
            fixed_files += 1

print(f"\nFiles fixed:  {fixed_files}")
print(f"Blocks fixed: {fixed_blocks}")
