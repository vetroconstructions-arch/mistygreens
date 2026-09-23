#!/usr/bin/env python3
"""
Performance Hardening Engine v1.0
====================================
1. Critical CSS async loading — make stylesheet non-render-blocking
2. Lazy load all non-first images (loading=lazy decoding=async)
3. Add dns-prefetch for third-party domains
4. Add resource hints for key pages
"""
import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Minimal critical CSS to inline (prevents FOUC before full sheet loads)
CRITICAL_CSS = """
:root{--brand:#4A0808;--gold:#D4AF37;--bg:#0e0c14}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#1a1a1a;line-height:1.6}
h1,h2,h3{font-weight:700;color:#1a1a1a}
a{color:var(--brand);text-decoration:none}
img{max-width:100%;height:auto}
#loader{position:fixed;inset:0;z-index:10005;background:#000;display:flex;align-items:center;justify-content:center}
"""

PERF_HINTS = """  <link rel="dns-prefetch" href="//www.googletagmanager.com">
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link rel="dns-prefetch" href="//formsubmit.co">
  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>"""

def read(p):
    try:
        return open(p, encoding='utf-8', errors='replace').read()
    except: return None

def write(p, c):
    open(p, 'w', encoding='utf-8').write(c)

stats = {'async_css': 0, 'lazy_img': 0, 'dns_prefetch': 0, 'critical_css': 0}

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in
               {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        rel = os.path.relpath(fpath, BASE).replace('\\', '/')
        if any(x in rel for x in ['components/', 'scratch/']):
            continue

        content = read(fpath)
        if not content or '<html' not in content.lower():
            continue

        modified = False

        # 1. Make main stylesheet load async (non-render-blocking)
        if 'style.min.css' in content and 'media="print"' not in content:
            content = re.sub(
                r'<link\s+rel=["\']stylesheet["\']\s+href=["\']([^"\']*style\.min\.css[^"\']*)["\']>',
                lambda m: (
                    f'<noscript><link rel="stylesheet" href="{m.group(1)}"></noscript>\n'
                    f'  <link rel="stylesheet" href="{m.group(1)}" media="print" '
                    f'onload="this.media=\'all\'">'
                ),
                content
            )
            if 'media="print"' in content:
                stats['async_css'] += 1
                modified = True

        # 2. Inject inline critical CSS (only if async stylesheet was applied)
        if 'media="print"' in content and '<style>' not in content[:500]:
            critical_block = f'  <style id="critical-css">{CRITICAL_CSS}</style>\n'
            content = content.replace('<head>', '<head>\n' + critical_block, 1)
            stats['critical_css'] += 1
            modified = True

        # 3. DNS prefetch hints
        if 'dns-prefetch' not in content and 'googletagmanager' in content:
            content = content.replace('</head>', PERF_HINTS + '\n</head>', 1)
            stats['dns_prefetch'] += 1
            modified = True

        # 4. Lazy load all non-first images
        img_count = 0
        def process_img(m):
            global img_count
            tag = m.group(0)
            img_count += 1
            # Skip first image (already has fetchpriority=high)
            if img_count == 1:
                return tag
            # Skip if already has loading attribute
            if 'loading=' in tag:
                return tag
            # Skip SVG, data URIs, tracking pixels
            href = re.search(r'src=["\']([^"\']+)["\']', tag)
            if href and any(x in href.group(1) for x in ['data:', '.svg', 'pixel', 'beacon']):
                return tag
            # Add lazy loading
            tag = tag.rstrip('>')
            if tag.endswith('/'):
                tag = tag[:-1].rstrip() + ' loading="lazy" decoding="async"/>'
            else:
                tag = tag + ' loading="lazy" decoding="async">'
            stats['lazy_img'] += 1
            return tag

        img_count = 0
        new_content = re.sub(r'<img\s[^>]+>', process_img, content, flags=re.IGNORECASE)
        if new_content != content:
            content = new_content
            modified = True

        if modified:
            write(fpath, content)

print("=" * 60)
print("Performance Hardening Engine v1.0 — COMPLETE")
print(f"  Async CSS loading:    {stats['async_css']} pages")
print(f"  Critical CSS inline:  {stats['critical_css']} pages")
print(f"  DNS prefetch added:   {stats['dns_prefetch']} pages")
print(f"  Images lazy-loaded:   {stats['lazy_img']} img tags")
print("=" * 60)
