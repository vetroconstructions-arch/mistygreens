#!/usr/bin/env python3
"""
Sitewide Favicon, Apple Touch Icon & Social Meta Fortifier
==========================================================
Ensures 100% of all 406 production HTML files have:
1. Favicon (<link rel="icon">) & Apple Touch Icon for Google Search SERP branding
2. OpenGraph Meta (og:title, og:description, og:image, og:url, og:site_name)
3. Twitter Card Meta (twitter:card, twitter:title, twitter:description, twitter:image)
"""

import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
DEFAULT_IMAGE = f"{DOMAIN}/images/hero-township.webp"
FAVICON_TAG = '<link rel="icon" type="image/png" href="/assets/branding/favicon.png">'
APPLE_ICON_TAG = '<link rel="apple-touch-icon" href="/assets/branding/apple-touch-icon.png">'

def fortify_html_files():
    count_favicon = 0
    count_apple = 0
    count_og = 0
    count_twitter = 0
    total_files = 0

    for root, dirs, files in os.walk(BASE):
        parts = set(root.replace(os.sep, '/').split('/'))
        if parts & {'node_modules', '.git', '.wrangler', 'components', 'scripts', 'dist', 'scratch', '.gemini'}:
            continue
        for file in files:
            if file.endswith('.html'):
                total_files += 1
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, BASE).replace(os.sep, '/')
                if rel_path == 'index.html':
                    url_path = '/'
                elif rel_path.endswith('/index.html'):
                    url_path = '/' + rel_path[:-10]
                elif rel_path.endswith('index.html'):
                    url_path = '/' + rel_path[:-10]
                else:
                    url_path = '/' + rel_path

                canonical_url = f"{DOMAIN}{url_path}"

                with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                modified = False

                # Extract title and description
                title_match = re.search(r'<title>(.*?)</title>', content, re.I | re.DOTALL)
                title = title_match.group(1).strip() if title_match else "Paranjape Forest Trails Bhugaon | Official Site"

                desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=(["\'])(.*?)\1', content, re.I | re.DOTALL)
                desc = desc_match.group(2).strip() if desc_match else "Explore Paranjape Forest Trails Bhugaon — 190-acre nature township in Pune West with NA plots, luxury forest villas, twin bungalows & 2/3 BHK flats."

                tags_to_inject = []

                # 1. Favicon
                if not re.search(r'<link\s+[^>]*rel=["\'](icon|shortcut icon)["\']', content, re.I):
                    tags_to_inject.append(f'  {FAVICON_TAG}')
                    count_favicon += 1

                # 2. Apple Touch Icon
                if not re.search(r'<link\s+[^>]*rel=["\']apple-touch-icon["\']', content, re.I):
                    tags_to_inject.append(f'  {APPLE_ICON_TAG}')
                    count_apple += 1

                # 3. OpenGraph tags
                if not re.search(r'<meta\s+property=["\']og:title["\']', content, re.I):
                    tags_to_inject.append(f'  <meta property="og:title" content="{title}">')
                    count_og += 1

                if not re.search(r'<meta\s+property=["\']og:description["\']', content, re.I):
                    tags_to_inject.append(f'  <meta property="og:description" content="{desc}">')
                    count_og += 1

                if not re.search(r'<meta\s+property=["\']og:url["\']', content, re.I):
                    tags_to_inject.append(f'  <meta property="og:url" content="{canonical_url}">')

                if not re.search(r'<meta\s+property=["\']og:image["\']', content, re.I):
                    tags_to_inject.append(f'  <meta property="og:image" content="{DEFAULT_IMAGE}">')
                    tags_to_inject.append(f'  <meta property="og:image:width" content="1200">')
                    tags_to_inject.append(f'  <meta property="og:image:height" content="630">')

                if not re.search(r'<meta\s+property=["\']og:site_name["\']', content, re.I):
                    tags_to_inject.append('  <meta property="og:site_name" content="Paranjape Forest Trails Township Bhugaon">')

                # 4. Twitter tags
                if not re.search(r'<meta\s+name=["\']twitter:card["\']', content, re.I):
                    tags_to_inject.append('  <meta name="twitter:card" content="summary_large_image">')
                    count_twitter += 1

                if not re.search(r'<meta\s+name=["\']twitter:title["\']', content, re.I):
                    tags_to_inject.append(f'  <meta name="twitter:title" content="{title}">')

                if not re.search(r'<meta\s+name=["\']twitter:description["\']', content, re.I):
                    tags_to_inject.append(f'  <meta name="twitter:description" content="{desc}">')

                if not re.search(r'<meta\s+name=["\']twitter:image["\']', content, re.I):
                    tags_to_inject.append(f'  <meta name="twitter:image" content="{DEFAULT_IMAGE}">')

                if tags_to_inject:
                    inject_block = '\n'.join(tags_to_inject) + '\n'
                    # Inject before </head>
                    if '</head>' in content:
                        content = re.sub(r'</head>', f'{inject_block}</head>', content, count=1, flags=re.I)
                        modified = True
                    elif '<body' in content:
                        content = re.sub(r'<body', f'{inject_block}<body', content, count=1, flags=re.I)
                        modified = True

                if modified:
                    with open(full_path, 'w', encoding='utf-8') as f:
                        f.write(content)

    print(f"Processed {total_files} HTML files:")
    print(f"  - Injected favicon in {count_favicon} files")
    print(f"  - Injected apple-touch-icon in {count_apple} files")
    print(f"  - Injected OpenGraph metadata in {count_og} files")
    print(f"  - Injected Twitter Card metadata in {count_twitter} files")

if __name__ == "__main__":
    fortify_html_files()
