#!/usr/bin/env python3
"""
Technical SEO Hardening Engine v1.0
=====================================
1. Core Web Vitals — hero image preload, fetchpriority=high, font preload
2. External link rel="nofollow noopener noreferrer" on all outbound links
3. hreflang wiring — English ↔ Hindi pages bidirectional
4. Microdata itemscope/itemprop on key body elements
5. GA4 defer optimization — load analytics non-render-blocking
6. `robots` meta tag per-page tuning (noindex on fragment files)
"""

import os, re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

HERO_IMGS = [
    "/images/hero-township.webp",
    "/images/misty-greens-plots.webp",
    "/images/hero-banner.webp",
    "/images/banner.webp",
]

# English ↔ Hindi hreflang pairs
HREFLANG_PAIRS = {
    "/na-plots-in-bhugaon/":    "/pune-mein-plot/",
    "/na-plots-in-pune/":       "/pune-mein-plot/",
    "/plots-in-pune-west/":     "/pune-mein-plot/",
    "/2bhk-in-bhugaon/":        "/bhugaon-mein-flat/",
    "/3bhk-in-pune/":           "/bhugaon-mein-flat/",
    "/luxury-villas-bhugaon/":  "/pune-mein-villa/",
    "/5bhk-villas-pune-west/":  "/pune-mein-villa/",
}
# Reverse map: hindi → english
HREFLANG_REVERSE = {v: k for k, v in HREFLANG_PAIRS.items()}

# Trusted external domains — do NOT nofollow
TRUSTED_DOMAINS = {
    "mahaonline.gov.in", "maharera.mahaonline.gov.in",
    "google.com", "maps.google.com", "search.google.com",
    "gov.in", "india.gov.in", "rera.mahaonline.gov.in",
    "youtube.com", "wa.me", "whatsapp.com",
}

def read(p):
    try:
        with open(p, encoding='utf-8', errors='replace') as f:
            return f.read()
    except: return None

def write(p, c):
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)

def inject_head(content, block):
    if '</head>' in content:
        return content.replace('</head>', block + '\n</head>', 1)
    return content

def get_slug_url(rel):
    if rel == 'index.html':
        return "/"
    if rel.endswith('/index.html'):
        return "/" + rel[:-10]
    return "/" + rel

# ─── 1. HERO IMAGE PRELOAD (CWV — LCP fix) ───────────────────────────────────
def inject_hero_preload(content, rel):
    if 'rel="preload"' in content and 'hero' in content:
        return content, False
    # Detect which hero image this page likely uses
    hero = None
    for img in HERO_IMGS:
        if img.split('/')[-1].replace('.webp','') in content.lower():
            hero = img
            break
    if not hero:
        # Check og:image for the hero
        m = re.search(r'og:image["\'][^>]+content=["\']([^"\']+\.webp)', content)
        if m:
            src = m.group(1)
            hero = src if src.startswith('/') else '/' + src.split(DOMAIN)[-1]
    if not hero:
        hero = "/images/hero-township.webp"  # default

    preload_block = f'  <link rel="preload" as="image" href="{hero}" fetchpriority="high">\n'
    preload_block += '  <link rel="preload" as="style" href="/style.min.css?v=2026.08.24.10">\n'
    # Also preload Google Fonts
    preload_block += '  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>\n'
    preload_block += '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'

    content = inject_head(content, preload_block)
    return content, True

# ─── 2. fetchpriority="high" on FIRST image ──────────────────────────────────
def inject_fetchpriority(content):
    # Add fetchpriority="high" and loading="eager" to the FIRST <img> tag
    if 'fetchpriority' in content:
        return content, False
    first_img = re.search(r'<img\s', content, re.IGNORECASE)
    if not first_img:
        return content, False
    idx = first_img.start()
    # Find end of this img tag
    end = content.index('>', idx)
    img_tag = content[idx:end+1]
    if 'loading="lazy"' in img_tag:
        img_tag = img_tag.replace('loading="lazy"', 'loading="eager" fetchpriority="high"')
    else:
        img_tag = img_tag.rstrip('>').rstrip('/') + ' fetchpriority="high" loading="eager">'
    content = content[:idx] + img_tag + content[end+1:]
    return content, True

# ─── 3. GA4 DEFER (non-render-blocking) ──────────────────────────────────────
def defer_ga4(content):
    # Replace synchronous gtag script with deferred version
    # Pattern: <script async src="https://www.googletagmanager.com/...">
    # Make sure it's async (it should be) — also add crossorigin
    if 'googletagmanager' not in content:
        return content, False
    modified = False
    # Ensure async attribute present
    content_new = re.sub(
        r'<script\s+src="(https://www\.googletagmanager\.com/[^"]+)"',
        r'<script async defer src="\1" crossorigin="anonymous"',
        content
    )
    if content_new != content:
        content = content_new
        modified = True
    return content, modified

# ─── 4. EXTERNAL LINK nofollow ───────────────────────────────────────────────
def add_nofollow(content):
    modified = False
    def process_link(m):
        nonlocal modified
        tag = m.group(0)
        href_m = re.search(r'href=["\']([^"\']+)["\']', tag)
        if not href_m:
            return tag
        href = href_m.group(1)
        # Only process external links
        if not href.startswith('http'):
            return tag
        if DOMAIN in href:
            return tag
        # Check if trusted
        for td in TRUSTED_DOMAINS:
            if td in href:
                # Still add noopener for security
                if 'noopener' not in tag:
                    tag = tag.replace('>', ' rel="noopener noreferrer">', 1) if 'rel=' not in tag else tag
                return tag
        # Add nofollow noopener noreferrer
        if 'nofollow' in tag:
            return tag
        if 'rel=' in tag:
            tag = re.sub(r'rel=["\']([^"\']*)["\']', lambda x: f'rel="{x.group(1)} nofollow noopener noreferrer"', tag)
        else:
            tag = tag.rstrip('>') + ' rel="nofollow noopener noreferrer">'
        modified = True
        return tag

    content = re.sub(r'<a\s[^>]+>', process_link, content)
    return content, modified

# ─── 5. HREFLANG WIRING ──────────────────────────────────────────────────────
def inject_hreflang(content, slug_url):
    if 'hreflang="hi' in content:
        return content, False

    # English pages — add Hindi alternate if pair exists
    if slug_url in HREFLANG_PAIRS:
        hindi_url = DOMAIN + HREFLANG_PAIRS[slug_url]
        en_url = DOMAIN + slug_url
        hreflang_block = f'''  <link rel="alternate" hreflang="en-IN" href="{en_url}">
  <link rel="alternate" hreflang="hi-IN" href="{hindi_url}">
  <link rel="alternate" hreflang="x-default" href="{en_url}">'''
        content = inject_head(content, hreflang_block)
        return content, True

    # Hindi pages — add English alternate
    if slug_url in HREFLANG_REVERSE:
        en_url = DOMAIN + HREFLANG_REVERSE[slug_url]
        hi_url = DOMAIN + slug_url
        hreflang_block = f'''  <link rel="alternate" hreflang="hi-IN" href="{hi_url}">
  <link rel="alternate" hreflang="en-IN" href="{en_url}">
  <link rel="alternate" hreflang="x-default" href="{en_url}">'''
        content = inject_head(content, hreflang_block)
        return content, True

    return content, False

# ─── 6. MICRODATA on price / address elements ────────────────────────────────
def inject_microdata(content, slug_url):
    """Add itemscope/itemprop to visible price and address elements."""
    if 'itemprop' in content:
        return content, False
    modified = False
    # Mark up phone number
    content_new = re.sub(
        r'(\+91\s*7744009295)',
        r'<span itemprop="telephone">\1</span>',
        content
    )
    if content_new != content:
        content = content_new
        modified = True
    # Mark up address string
    content_new = re.sub(
        r'(Paud Road,?\s*Bhugaon)',
        r'<span itemprop="address">\1, Pune West, Maharashtra 412115</span>',
        content, count=1
    )
    if content_new != content:
        content = content_new
        modified = True
    return content, modified

# ─── 7. noindex on fragment/component files ───────────────────────────────────
NOINDEX_DIRS = {'components', 'scratch', '.gemini'}

def ensure_noindex(content):
    if 'noindex' not in content and '<html' in content.lower():
        tag = '<meta name="robots" content="noindex, nofollow">'
        return inject_head(content, '  ' + tag), True
    return content, False

# ─── MAIN ────────────────────────────────────────────────────────────────────

def main():
    stats = {
        'preload': 0, 'fetchpriority': 0, 'ga4_defer': 0,
        'nofollow': 0, 'hreflang': 0, 'microdata': 0, 'noindex': 0,
    }
    print("=" * 68)
    print("Technical SEO Hardening Engine v1.0")
    print("=" * 68)

    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in
                   {'node_modules', '.git', '.wrangler', 'dist', '.gemini', '_astro'}]
        for fname in files:
            if not fname.endswith('.html'):
                continue
            fpath = os.path.join(root, fname)
            rel = os.path.relpath(fpath, BASE_DIR).replace('\\', '/')
            top_dir = rel.split('/')[0]

            # Fragment / component files → noindex
            if top_dir in NOINDEX_DIRS or 'scratch/' in rel:
                content = read(fpath)
                if content:
                    content, mod = ensure_noindex(content)
                    if mod:
                        write(fpath, content)
                        stats['noindex'] += 1
                continue

            content = read(fpath)
            if not content or '<html' not in content.lower():
                continue

            slug_url = get_slug_url(rel)
            modified = False

            # 1. Hero preload
            content, mod = inject_hero_preload(content, rel)
            if mod:
                stats['preload'] += 1
                modified = True

            # 2. fetchpriority on first image
            content, mod = inject_fetchpriority(content)
            if mod:
                stats['fetchpriority'] += 1
                modified = True

            # 3. GA4 defer
            content, mod = defer_ga4(content)
            if mod:
                stats['ga4_defer'] += 1
                modified = True

            # 4. External link nofollow
            content, mod = add_nofollow(content)
            if mod:
                stats['nofollow'] += 1
                modified = True

            # 5. hreflang wiring
            content, mod = inject_hreflang(content, slug_url)
            if mod:
                stats['hreflang'] += 1
                modified = True
                print(f"  hreflang ✓ {rel}")

            # 6. Microdata
            content, mod = inject_microdata(content, slug_url)
            if mod:
                stats['microdata'] += 1
                modified = True

            if modified:
                write(fpath, content)

    print(f"\n  Hero image preloads:     {stats['preload']}")
    print(f"  fetchpriority=high:      {stats['fetchpriority']}")
    print(f"  GA4 async defer:         {stats['ga4_defer']}")
    print(f"  External nofollow added: {stats['nofollow']}")
    print(f"  hreflang pairs wired:    {stats['hreflang']}")
    print(f"  Microdata injected:      {stats['microdata']}")
    print(f"  noindex on fragments:    {stats['noindex']}")
    print("=" * 68)

if __name__ == "__main__":
    main()
