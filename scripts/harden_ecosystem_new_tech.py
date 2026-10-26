#!/usr/bin/env python3
"""
Sovereign Next-Gen Web Tech & Edge Hardening Script
- Chrome Speculation Rules API (Prerender & Prefetch)
- Universal Service Worker v3.0 Registration
- Google Assistant / Gemini SpeakableSpecification Schema
- Merchant Offer priceValidUntil 2027 Hardening
- OpenGraph & Twitter Card Hardening
"""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch', 'components'}

SPECULATION_RULES_SNIPPET = """<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": [
        "/",
        "/misty-greens/",
        "/the-rivolo/",
        "/the-cove/",
        "/the-canopy/",
        "/the-highgardens/",
        "/athashri-bhugaon-pune/",
        "/the-verandah/",
        "/orchard-residences/",
        "/swaniketan/",
        "/everglades-bhugaon/"
      ],
      "eagerness": "moderate"
    }
  ],
  "prefetch": [
    {
      "where": {
        "and": [
          { "href_matches": "/*" },
          { "not": { "href_matches": "/thank-you*" } },
          { "not": { "href_matches": "/*\\\\?*" } }
        ]
      },
      "eagerness": "conservative"
    }
  ]
}
</script>"""

SERVICE_WORKER_SNIPPET = """<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function() {});
  });
}
</script>"""

def get_html_files():
    files_list = []
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if f.endswith('.html'):
                files_list.append(os.path.join(root, f))
    return sorted(files_list)

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    original_content = content
    rel_path = os.path.relpath(file_path, BASE_DIR)
    modified = False

    # Skip 404 and thank-you from SW / prerender
    is_utility = '404.html' in rel_path or 'thank-you' in rel_path

    # 1. Speculation Rules API Injection / Harmonization
    if not is_utility:
        if '<script type="speculationrules">' not in content:
            if '</head>' in content:
                content = content.replace('</head>', f'{SPECULATION_RULES_SNIPPET}\n</head>', 1)
                modified = True
        else:
            # Check if prefetch is in the existing speculation rules
            if '"prefetch"' not in content and '</script>' in content:
                # Replace existing speculationrules block with modern comprehensive block
                pattern = re.compile(r'<script type="speculationrules">.*?</script>', re.DOTALL)
                content = pattern.sub(SPECULATION_RULES_SNIPPET, content, count=1)
                modified = True

    # 2. Universal Service Worker Registration Injection
    if not is_utility:
        if 'navigator.serviceWorker.register' not in content and 'serviceWorker' not in content:
            if '</body>' in content:
                content = content.replace('</body>', f'{SERVICE_WORKER_SNIPPET}\n</body>', 1)
                modified = True

    # 3. Structured Data Speakable & priceValidUntil Hardening
    # Find all <script type="application/ld+json"> blocks
    def fix_json_ld(match):
        json_str = match.group(1).strip()
        try:
            data = json.loads(json_str)
        except Exception:
            return match.group(0)

        changed = False

        def process_node(node):
            nonlocal changed
            if isinstance(node, dict):
                # Hardening WebPage speakable
                ntype = node.get('@type')
                if ntype in ('WebPage', 'RealEstateListing', 'ItemPage', 'AboutPage', 'ContactPage', 'CollectionPage'):
                    if 'speakable' not in node:
                        node['speakable'] = {
                            "@type": "SpeakableSpecification",
                            "cssSelector": [
                                "h1",
                                ".hero-title",
                                ".hero-subtitle",
                                ".section-heading"
                            ]
                        }
                        changed = True

                # Hardening Offer & AggregateOffer priceValidUntil
                if ntype in ('Offer', 'AggregateOffer'):
                    if not node.get('priceValidUntil') or node.get('priceValidUntil') < '2026-12-31':
                        node['priceValidUntil'] = '2027-12-31'
                        changed = True

                for k, v in list(node.items()):
                    process_node(v)
            elif isinstance(node, list):
                for item in node:
                    process_node(item)

        process_node(data)

        if changed:
            formatted = json.dumps(data, indent=2, ensure_ascii=False)
            return f'<script type="application/ld+json">\n{formatted}\n</script>'
        return match.group(0)

    content = re.sub(r'<script\s+type="application/ld\+json">([\s\S]*?)</script>', fix_json_ld, content)
    if content != original_content:
        modified = True

    # 4. OpenGraph & Twitter Card Hardening
    if '</head>' in content:
        head_patch = ""
        if 'og:site_name' not in content:
            head_patch += '<meta property="og:site_name" content="Paranjape Forest Trails">\n'
        if 'og:locale' not in content:
            head_patch += '<meta property="og:locale" content="en_IN">\n'
        if 'twitter:card' not in content:
            head_patch += '<meta name="twitter:card" content="summary_large_image">\n'

        if head_patch:
            content = content.replace('</head>', f'{head_patch}</head>', 1)
            modified = True

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    files = get_html_files()
    print(f"Scanning {len(files)} HTML production files...")
    updated_count = 0
    for f in files:
        if process_file(f):
            updated_count += 1

    print(f"✅ Successfully hardened and deployed new tech across {updated_count} / {len(files)} HTML files.")

if __name__ == '__main__':
    main()
