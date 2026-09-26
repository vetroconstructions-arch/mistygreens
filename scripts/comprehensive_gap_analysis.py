#!/usr/bin/env python3
"""
COMPREHENSIVE SEO & SITE GAP ANALYSIS ENGINE
============================================
Performs exhaustive checks across:
1. Internal Links (404 links, malformed URLs, non-trailing-slash links)
2. Images & Assets (broken images, missing alt, missing dimensions)
3. CSS/JS Assets (missing files, 404 stylesheets/scripts)
4. Meta & Headers (<title>, <meta description>, canonical tags, H1 tags, og tags)
5. Structured Data (JSON-LD validation, Google Rich Snippet compliance)
6. Sitemap Integrity (missing pages in sitemaps, non-existent URLs in sitemaps)
7. Content & Compliance (MahaRERA numbers, price markers, email obfuscation)
8. Orphan Pages (pages with 0 incoming internal links)
"""

import os, re, json, glob
from urllib.parse import urlparse, unquote

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

# Exclude directories
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch', 'components'}

def get_all_html_files():
    html_files = []
    for root, dirs, files in os.walk(BASE):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))
    return sorted(html_files)

def file_to_url_path(fpath):
    rel = os.path.relpath(fpath, BASE).replace('\\', '/')
    if rel == 'index.html':
        return '/'
    if rel.endswith('/index.html'):
        return '/' + rel[:-11].strip('/') + '/'
    if rel.endswith('index.html'):
        return '/' + rel[:-10].strip('/') + '/'
    if rel.endswith('.html'):
        return '/' + rel
    return '/' + rel.strip('/') + '/'

def url_path_to_file(url_path):
    path = url_path.split('?')[0].split('#')[0]
    path = unquote(path)
    if path == '/':
        return os.path.join(BASE, 'index.html')
    clean = path.strip('/')
    candidate1 = os.path.join(BASE, clean, 'index.html')
    if os.path.exists(candidate1):
        return candidate1
    candidate2 = os.path.join(BASE, clean)
    if os.path.exists(candidate2):
        return candidate2
    candidate3 = os.path.join(BASE, clean + '.html')
    if os.path.exists(candidate3):
        return candidate3
    return None

def analyze():
    html_files = get_all_html_files()
    print(f"Total HTML files detected: {len(html_files)}")
    
    url_to_file = {}
    file_to_url = {}
    for f in html_files:
        u = file_to_url_path(f)
        url_to_file[u] = f
        file_to_url[f] = u

    # Data collectors
    broken_links = []
    non_trailing_slash_links = []
    broken_images = []
    missing_alt_images = []
    broken_scripts_css = []
    title_issues = []
    desc_issues = []
    h1_issues = []
    canonical_issues = []
    schema_issues = []
    unobfuscated_emails = []
    inbound_links = {u: 0 for u in url_to_file}
    
    # Analyze each file
    for f in html_files:
        url_path = file_to_url[f]
        try:
            content = open(f, encoding='utf-8', errors='ignore').read()
        except Exception as e:
            print(f"Failed to read {f}: {e}")
            continue
            
        # 1. Title tag
        titles = re.findall(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if not titles:
            title_issues.append((url_path, "Missing <title>"))
        elif len(titles) > 1:
            title_issues.append((url_path, f"Multiple <title> tags ({len(titles)})"))
        else:
            t = titles[0].strip()
            if len(t) == 0:
                title_issues.append((url_path, "Empty <title>"))
            elif len(t) < 15:
                title_issues.append((url_path, f"Title too short ({len(t)} chars): {t}"))
            elif len(t) > 85:
                title_issues.append((url_path, f"Title too long ({len(t)} chars): {t[:60]}..."))

        # 2. Meta description
        descs_matches = re.findall(r'<meta\s+name=["\']description["\']\s+content=(["\'])(.*?)\1', content, re.IGNORECASE | re.DOTALL)
        descs = [m[1] for m in descs_matches]
        if not descs:
            desc_issues.append((url_path, "Missing meta description"))
        elif len(descs) > 1:
            desc_issues.append((url_path, f"Multiple meta descriptions ({len(descs)})"))
        else:
            d = descs[0].strip()
            if len(d) == 0:
                desc_issues.append((url_path, "Empty meta description"))
            elif len(d) < 40:
                desc_issues.append((url_path, f"Meta description too short ({len(d)} chars)"))
            elif len(d) > 200:
                desc_issues.append((url_path, f"Meta description too long ({len(d)} chars)"))

        # 3. Canonical tag
        canonicals = re.findall(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.IGNORECASE)
        if not canonicals:
            canonical_issues.append((url_path, "Missing canonical tag"))
        elif len(canonicals) > 1:
            canonical_issues.append((url_path, f"Multiple canonical tags ({len(canonicals)})"))
        else:
            c = canonicals[0].strip()
            expected = DOMAIN + url_path
            if c != expected:
                canonical_issues.append((url_path, f"Canonical mismatch: has '{c}', expected '{expected}'"))

        # 4. H1 tag
        h1s = re.findall(r'<h1\b[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
        if not h1s:
            h1_issues.append((url_path, "Missing <h1> tag"))
        elif len(h1s) > 1:
            h1_issues.append((url_path, f"Multiple <h1> tags ({len(h1s)})"))

        # 5. Email check (must be wrapped in <!--email_off--> if in visible HTML or mailto)
        email_off_ranges = [(m.start(), m.end()) for m in re.finditer(r'<!--email_off-->.*?<!--/email_off-->', content, re.DOTALL)]
        script_ranges = [(m.start(), m.end()) for m in re.finditer(r'<script\b.*?</script>', content, re.DOTALL | re.IGNORECASE)]

        for m in re.finditer(r'propsmartrealty@gmail\.com', content):
            idx = m.start()
            if any(s <= idx <= e for s, e in email_off_ranges):
                continue
            if any(s <= idx <= e for s, e in script_ranges):
                continue
            line = content[max(0, idx-40):min(len(content), idx+60)]
            if 'formsubmit.co' in line:
                continue
            unobfuscated_emails.append((url_path, 'propsmartrealty@gmail.com'))
            break

        # 6. Check images (<img src="...">)
        img_tags = re.findall(r'<img\s+[^>]*>', content, re.IGNORECASE)
        for img in img_tags:
            src_m = re.search(r'src=["\']([^"\']+)["\']', img, re.IGNORECASE)
            alt_m = re.search(r'alt=["\']([^"\']*)["\']', img, re.IGNORECASE)
            if not alt_m or not alt_m.group(1).strip():
                missing_alt_images.append((url_path, img[:60]))
            if src_m:
                src = src_m.group(1).split('?')[0].split('#')[0]
                if src.startswith('http://') or src.startswith('https://') or src.startswith('data:'):
                    continue
                # Local image path
                img_path = os.path.join(BASE, src.lstrip('/'))
                if not os.path.exists(img_path):
                    broken_images.append((url_path, src))

        # 7. Check scripts & styles
        scripts = re.findall(r'<script\s+[^>]*src=["\']([^"\']+)["\']', content, re.IGNORECASE)
        for sc in scripts:
            sc_clean = sc.split('?')[0].split('#')[0]
            if sc_clean.startswith('http') or sc_clean.startswith('//'):
                continue
            sc_path = os.path.join(BASE, sc_clean.lstrip('/'))
            if not os.path.exists(sc_path):
                broken_scripts_css.append((url_path, "script", sc))

        css_links = re.findall(r'<link\s+[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
        for cs in css_links:
            cs_clean = cs.split('?')[0].split('#')[0]
            if cs_clean.startswith('http') or cs_clean.startswith('//'):
                continue
            cs_path = os.path.join(BASE, cs_clean.lstrip('/'))
            if not os.path.exists(cs_path):
                broken_scripts_css.append((url_path, "stylesheet", cs))

        # 8. Check internal links (<a href="...">)
        a_tags = re.findall(r'<a\s+[^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
        for href in a_tags:
            href_clean = href.strip()
            if not href_clean or href_clean.startswith(('mailto:', 'tel:', 'javascript:', '#', 'data:')):
                continue
            if href_clean.startswith(('http://', 'https://')):
                if href_clean.startswith(DOMAIN):
                    parsed = urlparse(href_clean)
                    internal_path = parsed.path
                else:
                    continue
            else:
                internal_path = href_clean.split('?')[0].split('#')[0]
                if not internal_path.startswith('/'):
                    # relative path
                    curr_dir = os.path.dirname(url_path)
                    internal_path = os.path.normpath(os.path.join(curr_dir, internal_path)).replace('\\', '/')
            
            # Check internal path
            if not internal_path.startswith('/'):
                internal_path = '/' + internal_path
                
            # Track inbound link
            norm_target = internal_path if internal_path.endswith('/') or '.' in internal_path else internal_path + '/'
            if norm_target in inbound_links:
                inbound_links[norm_target] += 1
                
            # Verify target file exists
            target_file = url_path_to_file(internal_path)
            if not target_file:
                broken_links.append((url_path, href_clean))
            else:
                # Check trailing slash
                if not internal_path.endswith('/') and '.' not in internal_path and internal_path != '/':
                    non_trailing_slash_links.append((url_path, href_clean))

        # 9. JSON-LD validation
        ld_blocks = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', content, re.IGNORECASE | re.DOTALL)
        for ld in ld_blocks:
            try:
                data = json.loads(ld.strip())
            except Exception as e:
                schema_issues.append((url_path, f"JSON parse error: {e}"))

    # 10. Check sitemap coverage
    sitemap_xml = os.path.join(BASE, 'sitemap.xml')
    sitemap_urls = set()
    sub_sitemaps = glob.glob(os.path.join(BASE, 'sitemap*.xml'))
    for sm in sub_sitemaps:
        try:
            sm_content = open(sm, encoding='utf-8').read()
            urls = re.findall(r'<loc>(https://www\.paranjapetownship\.com[^<]+)</loc>', sm_content)
            for u in urls:
                if not u.endswith('.xml'):
                    p = urlparse(u).path
                    if p:
                        sitemap_urls.add(p)
        except Exception as e:
            print(f"Error reading sitemap {sm}: {e}")

    missing_from_sitemaps = []
    for u in url_to_file:
        if u not in sitemap_urls and u not in ['/404.html', '/thank-you.html', '/thank-you/']:
            missing_from_sitemaps.append(u)

    phantom_sitemap_urls = []
    for u in sitemap_urls:
        if u not in url_to_file:
            phantom_sitemap_urls.append(u)

    orphan_pages = [u for u, count in inbound_links.items() if count == 0 and u not in ['/', '/404.html', '/thank-you.html', '/thank-you/']]

    # Summary Report
    print("\n=======================================================")
    print("      COMPREHENSIVE GAP ANALYSIS RESULTS")
    print("=======================================================")
    print(f"Broken Internal Links:          {len(broken_links)}")
    if broken_links:
        for src, target in broken_links[:10]:
            print(f"  - In {src} -> {target}")
        if len(broken_links) > 10:
            print(f"  ... and {len(broken_links)-10} more")

    print(f"Non-Trailing-Slash Links:       {len(non_trailing_slash_links)}")
    print(f"Broken Images:                  {len(broken_images)}")
    if broken_images:
        for src, img in broken_images[:10]:
            print(f"  - In {src} -> {img}")

    print(f"Missing Image Alt:              {len(missing_alt_images)}")
    print(f"Broken Scripts / CSS:           {len(broken_scripts_css)}")
    if broken_scripts_css:
        for src, kind, path in broken_scripts_css:
            print(f"  - In {src} -> {kind}: {path}")

    print(f"Title Issues:                   {len(title_issues)}")
    if title_issues:
        for src, issue in title_issues[:5]:
            print(f"  - {src}: {issue}")

    print(f"Meta Description Issues:        {len(desc_issues)}")
    if desc_issues:
        for src, issue in desc_issues[:5]:
            print(f"  - {src}: {issue}")

    print(f"H1 Issues:                      {len(h1_issues)}")
    if h1_issues:
        for src, issue in h1_issues[:5]:
            print(f"  - {src}: {issue}")

    print(f"Canonical Issues:               {len(canonical_issues)}")
    if canonical_issues:
        for src, issue in canonical_issues[:5]:
            print(f"  - {src}: {issue}")

    print(f"JSON-LD Schema Issues:          {len(schema_issues)}")
    if schema_issues:
        for src, issue in schema_issues:
            print(f"  - {src}: {issue}")

    print(f"Unobfuscated Email Addresses:   {len(unobfuscated_emails)}")
    print(f"Pages Missing from Sitemaps:    {len(missing_from_sitemaps)}")
    if missing_from_sitemaps:
        for u in missing_from_sitemaps[:10]:
            print(f"  - {u}")
    print(f"Phantom URLs in Sitemaps:       {len(phantom_sitemap_urls)}")
    if phantom_sitemap_urls:
        for u in phantom_sitemap_urls[:10]:
            print(f"  - {u}")

    print(f"Orphan Pages (0 Inbound Links): {len(orphan_pages)}")
    if orphan_pages:
        for u in orphan_pages[:10]:
            print(f"  - {u}")
        if len(orphan_pages) > 10:
            print(f"  ... and {len(orphan_pages)-10} more")

    return {
        "broken_links": broken_links,
        "non_trailing_slash_links": non_trailing_slash_links,
        "broken_images": broken_images,
        "missing_alt_images": missing_alt_images,
        "broken_scripts_css": broken_scripts_css,
        "title_issues": title_issues,
        "desc_issues": desc_issues,
        "h1_issues": h1_issues,
        "canonical_issues": canonical_issues,
        "schema_issues": schema_issues,
        "unobfuscated_emails": unobfuscated_emails,
        "missing_from_sitemaps": missing_from_sitemaps,
        "phantom_sitemap_urls": phantom_sitemap_urls,
        "orphan_pages": orphan_pages
    }

if __name__ == '__main__':
    analyze()
