#!/usr/bin/env python3
"""
Image Sitemap Generator v1.0
Crawls all HTML files, extracts <img> src attributes,
builds sitemap-images.xml for Google Image Search discovery.
"""
import os, re
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

# Images we know exist (key assets to guarantee inclusion)
KNOWN_ASSETS = [
    ("/images/hero-township.webp", "Paranjape Forest Trails 190-Acre Township Aerial View Bhugaon Pune West"),
    ("/images/misty-greens-plots.webp", "Misty Greens NA Bungalow Plots Forest Trails Bhugaon Pune"),
    ("/images/rivolo-villas.webp", "The Rivolo Luxury Forest Villas 4BHK 5BHK Bhugaon Pune West"),
    ("/images/the-cove.webp", "The Cove Twin Bungalows Forest Trails Bhugaon Pune"),
    ("/images/canopy-apartments.webp", "The Canopy 2BHK 3BHK Apartments Forest Trails Bhugaon"),
    ("/images/highgardens.webp", "The Highgardens Apartments Bhugaon Pune West"),
    ("/images/athashri.webp", "Athashri Senior Living Bhugaon Pune West"),
    ("/images/verandah.webp", "Verandah Forest Trails Luxury Apartments Bhugaon"),
    ("/images/orchard.webp", "Orchard Residences Bhugaon Pune West"),
    ("/images/swaniketan.webp", "Swaniketan Residences Bhugaon Pune"),
    ("/images/everglades.webp", "Everglades Bavdhan Apartments Pune"),
    ("/images/cliff-club.webp", "The Cliff Lifestyle Club Amenities Forest Trails Bhugaon"),
    ("/images/equestrian-academy.webp", "Equestrian Riding Academy Forest Trails Bhugaon Pune"),
    ("/images/ssrvm-school.webp", "Sri Sri Ravishankar Vidya Mandir ICSE School Forest Trails Bhugaon"),
    ("/images/masterplan.webp", "Paranjape Forest Trails 190-Acre Township Master Plan Bhugaon"),
    ("/images/bhugaon-location-map.webp", "Bhugaon Location Map Near Chandani Chowk Bavdhan Kothrud Pune"),
    ("/images/na-plots-site-plan.webp", "Misty Greens NA Bungalow Plots Site Plan Bhugaon Forest Trails"),
    ("/images/rivolo-interior.webp", "Rivolo Luxury Villa Interior 4BHK Bhugaon Pune"),
    ("/images/forest-trails-entrance.webp", "Paranjape Forest Trails Township Main Entrance Bhugaon"),
    ("/images/amenities-swimming-pool.webp", "Olympic Swimming Pool The Cliff Club Forest Trails Bhugaon"),
]

def extract_images_from_html(content, base_url):
    """Extract img src and alt from HTML content."""
    images = []
    # <img> tags
    for m in re.finditer(r'<img[^>]+>', content, re.IGNORECASE):
        tag = m.group(0)
        src_m = re.search(r'src=["\']([^"\']+)["\']', tag, re.IGNORECASE)
        alt_m = re.search(r'alt=["\']([^"\']*)["\']', tag, re.IGNORECASE)
        if src_m:
            src = src_m.group(1).strip()
            alt = alt_m.group(1).strip() if alt_m else ""
            if src.startswith('/') and not src.startswith('//'):
                images.append((DOMAIN + src, alt, base_url))
            elif src.startswith('https://www.paranjapetownship.com'):
                images.append((src, alt, base_url))
    # og:image meta
    for m in re.finditer(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', content, re.IGNORECASE):
        img_url = m.group(1).strip()
        if img_url.startswith('http'):
            images.append((img_url, "Paranjape Forest Trails Township Bhugaon Pune", base_url))
    return images

def main():
    print("Generating sitemap-images.xml...")
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    # Collect all page → images mappings
    page_images = {}  # page_url → [(img_url, title, caption)]
    
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in
                   {'node_modules','.git','.wrangler','dist','scratch','.gemini','_astro','components'}]
        for fname in files:
            if not fname.endswith('.html'):
                continue
            fpath = os.path.join(root, fname)
            rel = os.path.relpath(fpath, BASE_DIR).replace('\\','/')
            if any(x in rel for x in ['components/','scratch/','404']):
                continue
            
            # Compute page URL
            if rel == 'index.html':
                page_url = f"{DOMAIN}/"
            elif rel.endswith('/index.html'):
                page_url = f"{DOMAIN}/{rel[:-10]}"
            else:
                page_url = f"{DOMAIN}/{rel}"
            
            try:
                with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
                    content = f.read()
            except:
                continue
            
            imgs = extract_images_from_html(content, page_url)
            if imgs:
                if page_url not in page_images:
                    page_images[page_url] = []
                page_images[page_url].extend(imgs)
    
    # Build sitemap XML
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ]
    
    # Add known assets to homepage
    homepage_url = f"{DOMAIN}/"
    if homepage_url not in page_images:
        page_images[homepage_url] = []
    for src, alt in KNOWN_ASSETS:
        img_url = DOMAIN + src if src.startswith('/') else src
        page_images[homepage_url].append((img_url, alt, homepage_url))
    
    total_images = 0
    for page_url in sorted(page_images.keys()):
        imgs = page_images[page_url]
        # Deduplicate by URL
        seen = set()
        unique_imgs = []
        for img_url, alt, _ in imgs:
            if img_url not in seen and not any(x in img_url for x in ['data:','gtag','googletagmanager','analytics','beacon']):
                seen.add(img_url)
                unique_imgs.append((img_url, alt))
        
        if not unique_imgs:
            continue
        
        lines.append('  <url>')
        lines.append(f'    <loc>{page_url}</loc>')
        lines.append(f'    <lastmod>{date_str}</lastmod>')
        for img_url, alt in unique_imgs[:10]:  # Max 10 images per page per Google guidelines
            alt_clean = (alt or "Paranjape Forest Trails Bhugaon Pune").replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')[:100]
            lines.append('    <image:image>')
            lines.append(f'      <image:loc>{img_url}</image:loc>')
            lines.append(f'      <image:title>{alt_clean}</image:title>')
            lines.append(f'      <image:caption>{alt_clean} — Paranjape Forest Trails, Bhugaon, Pune West</image:caption>')
            lines.append(f'      <image:geo_location>Bhugaon, Pune, Maharashtra, India</image:geo_location>')
            lines.append('    </image:image>')
            total_images += 1
        lines.append('  </url>')
    
    lines.append('</urlset>')
    
    out_path = os.path.join(BASE_DIR, 'sitemap-images.xml')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"Generated sitemap-images.xml: {len(page_images)} pages, {total_images} images total.")
    
    # Add to sitemap.xml index
    sitemap_path = os.path.join(BASE_DIR, 'sitemap.xml')
    try:
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            sitemap_content = f.read()
        if 'sitemap-images.xml' not in sitemap_content:
            entry = f"""  <sitemap>
    <loc>{DOMAIN}/sitemap-images.xml</loc>
    <lastmod>{date_str}</lastmod>
  </sitemap>"""
            sitemap_content = sitemap_content.replace('</sitemapindex>', entry + '\n</sitemapindex>')
            with open(sitemap_path, 'w', encoding='utf-8') as f:
                f.write(sitemap_content)
            print("Added sitemap-images.xml to sitemap.xml index.")
    except Exception as e:
        print(f"  Could not update sitemap.xml: {e}")

if __name__ == "__main__":
    main()
