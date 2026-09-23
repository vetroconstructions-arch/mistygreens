#!/usr/bin/env python3
"""
Fix microdata injection that broke JSON-LD.
The inject_microdata function injected <span> tags inside JSON-LD script blocks.
This repair:
1. Finds all JSON-LD blocks with <span itemprop=...> inside them
2. Strips the span tags from within JSON-LD only
3. Leaves microdata intact in visible body HTML
"""
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LD_PATTERN = re.compile(
    r'(<script\s+type=["\']application/ld\+json["\']>)(.*?)(</script>)',
    re.DOTALL | re.IGNORECASE
)

def strip_html_tags_from_json(raw):
    """Remove HTML tags from inside a JSON string."""
    # Strip <span ...> and </span> tags
    cleaned = re.sub(r'<span[^>]*>', '', raw)
    cleaned = re.sub(r'</span>', '', cleaned)
    cleaned = re.sub(r'<[a-zA-Z][^>]*>', '', cleaned)
    cleaned = re.sub(r'</[a-zA-Z]+>', '', cleaned)
    return cleaned

total_errors = 0
total_fixed = 0
still_broken = []

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
            raw = m.group(2)
            close_tag = m.group(3)
            original_full = m.group(0)

            try:
                json.loads(raw.strip())
                continue  # valid, skip
            except json.JSONDecodeError:
                total_errors += 1

            # Try stripping HTML tags from the JSON
            fixed = strip_html_tags_from_json(raw)

            try:
                json.loads(fixed.strip())
                new_full = open_tag + fixed + close_tag
                new_content = new_content.replace(original_full, new_full, 1)
                file_modified = True
                total_fixed += 1
            except json.JSONDecodeError as e2:
                rel = os.path.relpath(fpath, BASE)
                still_broken.append((rel, str(e2), raw[max(0,e2.pos-60):e2.pos+60]))

        if file_modified:
            open(fpath, 'w', encoding='utf-8').write(new_content)

print(f'Errors scanned:  {total_errors}')
print(f'Errors fixed:    {total_fixed}')
print(f'Still broken:    {len(still_broken)}')
for rel, err, ctx in still_broken[:10]:
    print(f'  {rel}: {err}')
    print(f'    Context: {repr(ctx)}')
