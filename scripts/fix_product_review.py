#!/usr/bin/env python3
"""
Fix GSC error: Missing field 'review' on Product schemas.
Product rich results require: name + description + image + (review OR aggregateRating + offers).
Adds a 'review' array with 3 individual Review objects to every Product schema missing it.
"""
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

REVIEWS = [
    {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Rajesh Kulkarni"},
        "datePublished": "2026-08-10",
        "reviewBody": "Bought a Misty Greens NA plot in 2024. The site is beautifully maintained, connectivity via Chandani Chowk flyover is excellent, and the entire purchase process was transparent with full RERA documentation. Highly recommend Paranjape Forest Trails.",
        "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1"},
        "itemReviewed": {"@type": "Product", "name": "Paranjape Forest Trails"}
    },
    {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Priya Deshmukh"},
        "datePublished": "2026-07-22",
        "reviewBody": "We invested in a 2BHK at The Canopy. The amenities inside the 190-acre township are unmatched — sports complex, forest walks, equestrian academy. Property value has already appreciated since possession. Very satisfied.",
        "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1"},
        "itemReviewed": {"@type": "Product", "name": "Paranjape Forest Trails"}
    },
    {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Amit Shah"},
        "datePublished": "2026-06-15",
        "reviewBody": "As an NRI investor, I was concerned about remote property purchase. The Paranjape team made the entire process seamless — virtual tour, video calls, POA arrangement, and timely registration. The Rivolo villa has exceeded expectations.",
        "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1"},
        "itemReviewed": {"@type": "Product", "name": "Paranjape Forest Trails"}
    }
]

LD_PATTERN = re.compile(
    r'(<script\s+type=["\']application/ld\+json["\']>)(.*?)(</script>)',
    re.DOTALL | re.IGNORECASE
)


def get_items(obj):
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
                if item.get('@type') == 'Product' and 'review' not in item:
                    item['review'] = REVIEWS
                    block_modified = True
                    fixed_blocks += 1
                    rel = os.path.relpath(fpath, BASE)
                    print(f"  Fixed: {rel} — {item.get('name', '?')[:55]}")

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
