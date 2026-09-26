#!/usr/bin/env python3
"""
Orphan Page Resolver & Sitewide Linking Architecture
===================================================
1. Updates sitemap-page/index.html to contain an exhaustive, beautifully structured index of all 406 pages.
2. Updates paranjape-forest-trails-township-bhugaon-blogs/index.html to link to all 44 blog posts.
3. Updates locality pages (/property-in-*-pune/index.html) to link to local BHK, plot, and villa pages.
"""

import os
import re
from urllib.parse import urlparse

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

def get_all_pages():
    pages = {}
    for root, dirs, files in os.walk(BASE):
        parts = set(root.replace(os.sep, '/').split('/'))
        if parts & {'node_modules', '.git', '.wrangler', 'components', 'scripts', 'dist', 'scratch', '.gemini'}:
            continue
        for file in files:
            if file.endswith('.html'):
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
                pages[url_path] = full_path
    return pages

def extract_page_title(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read(5000)
        m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if m:
            t = m.group(1).split('|')[0].split('—')[0].split('-')[0].strip()
            return t
    except Exception:
        pass
    return None

def build_human_label(url_path):
    p = url_path.strip('/')
    if not p:
        return "Home"
    # Format slug into human label
    slug = p.split('/')[-1].replace('.html', '')
    words = slug.split('-')
    cleaned = []
    for w in words:
        if w.lower() in ['bhk', 'na', 'rera', 'pmc', 'pmrda', 'roi', 'emi', 'nri', 'it', 'fema', 'agr']:
            cleaned.append(w.upper())
        else:
            cleaned.append(w.capitalize())
    return " ".join(cleaned)

def update_sitemap_page(pages):
    sitemap_path = os.path.join(BASE, 'sitemap-page', 'index.html')
    if not os.path.exists(sitemap_path):
        print("sitemap-page/index.html not found!")
        return

    # Categorize all URLs
    categories = {
        "Core Township & Flagship Enclaves": [],
        "BHK Flats & Apartments by Locality": [],
        "NA Bungalow Plots by Locality": [],
        "Luxury Forest Villas & Bungalows": [],
        "Pune Locality & Micro-Market Guides": [],
        "Township Sectors & Masterplan": [],
        "Township Amenities & Lifestyle": [],
        "Real Estate Guides & Insights": [],
        "Blogs & Market Analysis": [],
        "Property Comparisons": [],
        "Calculators & Financial Tools": [],
        "Legal, RERA & Ownership Guides": [],
        "Hindi Language Editions": [],
        "Marathi Language Editions": [],
        "Policy & Administration": []
    }

    for url, file_path in sorted(pages.items()):
        if url in ['/404.html', '/thank-you.html', '/thank-you/']:
            continue
        
        url_lower = url.lower()
        label = build_human_label(url)
        
        # Categorize
        if 'pune-mein-' in url_lower or 'bhugaon-mein-' in url_lower:
            categories["Hindi Language Editions"].append((url, label))
        elif 'pune-madhe-' in url_lower or 'bhugaon-madhe-' in url_lower or '-marathi' in url_lower:
            categories["Marathi Language Editions"].append((url, label))
        elif any(x in url_lower for x in ['privacy-policy', 'terms-of-use', 'editorial-team', 'press-and-awards', 'paranjape-schemes-contact']):
            categories["Policy & Administration"].append((url, label))
        elif any(x in url_lower for x in ['calculator', 'emi', 'roi-calculator']):
            categories["Calculators & Financial Tools"].append((url, label))
        elif any(x in url_lower for x in ['7-12', 'mutation', 'index-2', 'gift-deed', 'joint-registration', 'rera', 'legal/', 'pmrda-vs-pmc', 'carpet-area']):
            categories["Legal, RERA & Ownership Guides"].append((url, label))
        elif any(x in url_lower for x in ['comparisons/', '-vs-', 'vs-']):
            categories["Property Comparisons"].append((url, label))
        elif 'blogs/' in url_lower or 'blogs' in url_lower:
            categories["Blogs & Market Analysis"].append((url, label))
        elif 'sectors/' in url_lower:
            categories["Township Sectors & Masterplan"].append((url, label))
        elif 'amenities/' in url_lower:
            categories["Township Amenities & Lifestyle"].append((url, label))
        elif 'property-in-' in url_lower or '-area-guide' in url_lower or '-neighbourhood-guide' in url_lower or 'location/' in url_lower or 'connectivity' in url_lower:
            categories["Pune Locality & Micro-Market Guides"].append((url, label))
        elif any(x in url_lower for x in ['-bhk', 'bhk-']):
            categories["BHK Flats & Apartments by Locality"].append((url, label))
        elif any(x in url_lower for x in ['villa', 'bungalow', 'the-cove', 'rivolo']):
            categories["Luxury Forest Villas & Bungalows"].append((url, label))
        elif any(x in url_lower for x in ['plots', 'plot', 'misty-greens']):
            categories["NA Bungalow Plots by Locality"].append((url, label))
        elif any(x in url_lower for x in ['guide', 'insights', 'glossary', 'faqs', 'testimonials', 'virtual-tour', 'price-history', 'floor-plans']):
            categories["Real Estate Guides & Insights"].append((url, label))
        else:
            categories["Core Township & Flagship Enclaves"].append((url, label))

    # Build HTML sections
    sections_html = []
    total_links = 0
    for cat_title, items in categories.items():
        if not items:
            continue
        total_links += len(items)
        sec = [f'  <div class="section">\n    <h2>{cat_title} ({len(items)})</h2>\n    <ul>']
        for u, lbl in items:
            sec.append(f'      <li><a href="{u}">{lbl}</a></li>')
        sec.append('    </ul>\n  </div>')
        sections_html.append('\n'.join(sec))

    grid_content = '\n\n'.join(sections_html)

    # Read current sitemap-page/index.html
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace .sitemap-grid content
    new_html = re.sub(
        r'<div class="sitemap-grid">.*?</div>\s*<p style="color:#999;',
        f'<div class="sitemap-grid">\n{grid_content}\n</div>\n\n<p style="color:#999;',
        html,
        flags=re.DOTALL
    )

    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(new_html)

    print(f"Updated sitemap-page/index.html with {total_links} links across {len(categories)} categories.")

def update_blog_hub(pages):
    blog_hub_path = os.path.join(BASE, 'paranjape-forest-trails-township-bhugaon-blogs', 'index.html')
    if not os.path.exists(blog_hub_path):
        return

    blog_urls = [u for u in pages if '/paranjape-forest-trails-township-bhugaon-blogs/' in u and u != '/paranjape-forest-trails-township-bhugaon-blogs/']
    print(f"Found {len(blog_urls)} individual blog posts.")

    with open(blog_hub_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check which blogs are already linked
    missing_blogs = []
    for b in blog_urls:
        if f'href="{b}"' not in content and f'href="{b.rstrip("/")}"' not in content:
            missing_blogs.append(b)

    print(f"Blogs currently missing links on blog hub: {len(missing_blogs)}")
    if missing_blogs:
        # Create a clean archive grid section for all articles
        archive_items = []
        for b in sorted(blog_urls):
            lbl = build_human_label(b)
            archive_items.append(f'      <li style="margin:.4rem 0;"><a href="{b}" style="color:#4A0808;font-weight:600;text-decoration:none;">📄 {lbl}</a></li>')
        
        archive_html = f"""
<!-- COMPLETE BLOG ARCHIVE DIRECTORY -->
<section style="max-width:1100px;margin:3rem auto;padding:2rem;background:#fdfcfb;border:1px solid #e2d8cd;border-radius:12px;">
  <h2 style="color:#4A0808;font-size:1.6rem;margin-bottom:1rem;border-bottom:2px solid #D4AF37;padding-bottom:.5rem;">Complete Real Estate Research & Blog Directory ({len(blog_urls)} Articles)</h2>
  <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem;">
{chr(10).join(archive_items)}
  </ul>
</section>
"""
        # Insert before </main> or <footer>
        if '</main>' in content:
            content = content.replace('</main>', f'{archive_html}\n</main>')
        elif '<footer' in content:
            content = re.sub(r'<footer', f'{archive_html}\n<footer', content, count=1)

        with open(blog_hub_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected comprehensive archive directory with {len(blog_urls)} articles into blog hub.")

def update_locality_hubs(pages):
    locality_files = [f for f in pages if f.startswith('/property-in-') and f.endswith('-pune/')]
    print(f"Found {len(locality_files)} locality hub pages.")

    for loc_url in locality_files:
        file_path = pages[loc_url]
        loc_name = loc_url.replace('/property-in-', '').replace('-pune/', '').strip()
        
        # Find matching BHK, plots, villas
        matching_pages = []
        for p_url in sorted(pages):
            if p_url == loc_url or '/property-in-' in p_url:
                continue
            if f"-near-{loc_name}/" in p_url or f"-in-{loc_name}/" in p_url or f"/{loc_name}-" in p_url:
                matching_pages.append(p_url)

        if not matching_pages:
            continue

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already has micro-market section
        if 'id="micro-market-options"' in content:
            continue

        links_html = []
        for mp in matching_pages:
            lbl = build_human_label(mp)
            links_html.append(f'    <a href="{mp}" style="display:inline-block;background:#fff;border:1px solid #e0d5c1;padding:.4rem .8rem;border-radius:6px;color:#4A0808;text-decoration:none;font-size:.85rem;font-weight:600;">{lbl}</a>')

        section_html = f"""
<div id="micro-market-options" style="background:#fcf9f5;border:1px solid #D4AF37;border-radius:8px;padding:1.2rem;margin:2rem 0;">
  <h3 style="color:#4A0808;margin:0 0 .8rem;font-size:1.1rem;">📍 {loc_name.capitalize()} Configurations & Property Permutations:</h3>
  <div style="display:flex;flex-wrap:wrap;gap:.6rem;">
{chr(10).join(links_html)}
  </div>
</div>
"""
        # Insert before footer or </main>
        if '</main>' in content:
            content = content.replace('</main>', f'{section_html}\n</main>')
        elif '<footer' in content:
            content = re.sub(r'<footer', f'{section_html}\n<footer', content, count=1)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added {len(matching_pages)} micro-market links to {loc_url}")

if __name__ == "__main__":
    pages = get_all_pages()
    print(f"Total detected HTML pages: {len(pages)}")
    update_sitemap_page(pages)
    update_blog_hub(pages)
    update_locality_hubs(pages)
