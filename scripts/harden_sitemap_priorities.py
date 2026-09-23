#!/usr/bin/env python3
"""
Sitemap Priority Hardener + News Sitemap Generator v1.0
=========================================================
1. Updates <priority> in all existing sitemap XML files based on page type
2. Generates sitemap-news.xml for Google News eligibility
"""

import os, re
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

# Priority rules: highest match wins
PRIORITY_RULES = [
    # Homepage
    (lambda u: u == f"{DOMAIN}/", "1.0"),
    # Primary enclave pages
    (lambda u: any(x in u for x in [
        "misty-greens", "rivolo-residences", "the-cove", "the-canopy",
        "highgardens", "athashri", "verandah", "orchard-residences", "swaniketan",
    ]), "0.95"),
    # New high-volume keyword pages
    (lambda u: any(x in u for x in [
        "2bhk-in-bhugaon", "3bhk-in-pune", "na-plots-in-bhugaon", "na-plots-in-pune",
        "property-in-bhugaon", "luxury-villas-bhugaon", "nri-investment-bhugaon",
        "rera-approved-plots-bhugaon", "5bhk-villas-pune-west",
        "pune-mein-plot", "bhugaon-mein-flat", "pune-mein-villa",
    ]), "0.90"),
    # BHK / na-bungalow keyword pages
    (lambda u: any(x in u for x in [
        "-bhk-flats-", "bhk-near-", "na-bungalow-plots-",
        "twin-bungalows-", "independent-bungalows-",
        "gated-township-plots-", "luxury-forest-villas-",
    ]), "0.85"),
    # Price / investment / location pages
    (lambda u: any(x in u for x in [
        "price", "investment", "location", "price-list", "brochure",
        "bhugaon-property-price-history",
    ]), "0.85"),
    # Comparisons
    (lambda u: any(x in u for x in [
        "-vs-", "comparisons", "forest-trails-vs-",
    ]), "0.80"),
    # Blogs
    (lambda u: "blogs" in u, "0.70"),
    # Connectivity / near pages
    (lambda u: any(x in u for x in ["near-", "connectivity", "proximity"]), "0.70"),
    # Legal / RERA
    (lambda u: any(x in u for x in ["legal", "rera", "stamp-duty", "registration"]), "0.65"),
    # Amenities
    (lambda u: "amenities" in u, "0.55"),
    # Default
    (lambda u: True, "0.70"),
]

def get_priority(url):
    for rule, priority in PRIORITY_RULES:
        try:
            if rule(url):
                return priority
        except:
            continue
    return "0.70"

def harden_sitemap(fpath):
    try:
        with open(fpath, encoding='utf-8') as f:
            content = f.read()
    except:
        return 0

    def replace_priority(m):
        url = m.group(1) if m.lastindex >= 1 else ""
        return m.group(0)  # placeholder

    # Replace each <priority> tag based on its preceding <loc>
    parts = re.split(r'(<url>.*?</url>)', content, flags=re.DOTALL)
    modified = False
    new_parts = []
    for part in parts:
        if '<url>' in part and '<loc>' in part:
            loc_m = re.search(r'<loc>([^<]+)</loc>', part)
            if loc_m:
                url = loc_m.group(1).strip()
                priority = get_priority(url)
                # Replace existing priority
                new_part = re.sub(r'<priority>[^<]+</priority>',
                                   f'<priority>{priority}</priority>', part)
                if new_part != part:
                    modified = True
                    part = new_part
        new_parts.append(part)

    if modified:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(''.join(new_parts))
    return 1 if modified else 0

# ─── NEWS SITEMAP ─────────────────────────────────────────────────────────────

BLOG_BASE = os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-blogs")

BLOG_PUBLICATION_DATES = {
    "baner-vs-bhugaon-investment-analysis-2026": "2026-09-15",
    "bavdhan-na-bungalow-plots-investment": "2026-09-12",
    "bavdhan-vs-bhugaon-villa-investment": "2026-09-10",
    "best-schools-near-bhugaon-paud-road": "2026-09-08",
    "best-township-near-baner-pashan-it-hub": "2026-09-07",
    "bhugaon-vs-bavdhan-na-plots-comparison-2026": "2026-09-05",
    "buy-na-bungalow-plots-near-warje-sinhgad-road": "2026-09-03",
    "forest-trails-na-bungalow-plots-advantage": "2026-09-02",
    "kothrud-vs-bhugaon-na-bungalow-plots": "2026-09-01",
    "misty-greens-na-plots-review": "2026-08-30",
    "na-bungalow-plots-pune-west-guide": "2026-08-28",
    "pmrda-ring-road-bhugaon-property-appreciation-2026": "2026-08-25",
    "premium-apartments-near-kothrud-bhugaon-canopy": "2026-08-23",
    "senior-living-communities-west-pune-bhugaon": "2026-08-20",
    "best-localities-pune-west-investment-2026": "2026-09-20",
    "na-plots-vs-flats-pune-investment-2026": "2026-09-19",
    "bhugaon-property-investment-guide-2026": "2026-09-18",
    "chandani-chowk-flyover-property-prices-2026": "2026-09-17",
    "3bhk-pune-under-1-crore-2026": "2026-09-16",
    "stamp-duty-plots-pune-2026": "2026-09-22",
    "property-registration-process-pune-2026": "2026-09-21",
    "nri-property-purchase-guide-india-2026": "2026-09-20",
    "gated-community-vs-apartments-pune-2026": "2026-09-19",
    "best-time-to-buy-property-pune-2026": "2026-09-18",
}

BLOG_TITLES = {
    "baner-vs-bhugaon-investment-analysis-2026": "Baner vs Bhugaon Investment Analysis 2026",
    "bavdhan-na-bungalow-plots-investment": "Bavdhan NA Bungalow Plots Investment Guide 2026",
    "best-localities-pune-west-investment-2026": "Best Localities in Pune West for Investment 2026",
    "na-plots-vs-flats-pune-investment-2026": "NA Plots vs Flats in Pune — Better Investment 2026?",
    "bhugaon-property-investment-guide-2026": "Bhugaon Property Investment Guide 2026",
    "chandani-chowk-flyover-property-prices-2026": "Chandani Chowk Flyover Effect on Property Prices 2026",
    "3bhk-pune-under-1-crore-2026": "3BHK in Pune Under 1 Crore — Is It Possible in 2026?",
    "stamp-duty-plots-pune-2026": "Stamp Duty on Plots in Pune 2026 — Complete Guide",
    "property-registration-process-pune-2026": "Property Registration Process in Pune 2026",
    "nri-property-purchase-guide-india-2026": "NRI Property Purchase Guide India 2026",
    "gated-community-vs-apartments-pune-2026": "Gated Community vs Apartments in Pune 2026",
    "best-time-to-buy-property-pune-2026": "Best Time to Buy Property in Pune 2026",
    "pmrda-ring-road-bhugaon-property-appreciation-2026": "PMRDA Ring Road Bhugaon Property Appreciation 2026",
    "misty-greens-na-plots-review": "Misty Greens NA Plots Review 2026",
    "senior-living-communities-west-pune-bhugaon": "Senior Living Communities in West Pune — Bhugaon",
    "premium-apartments-near-kothrud-bhugaon-canopy": "Premium Apartments near Kothrud at Bhugaon — The Canopy",
    "na-bungalow-plots-pune-west-guide": "NA Bungalow Plots in Pune West — Complete Guide",
    "kothrud-vs-bhugaon-na-bungalow-plots": "Kothrud vs Bhugaon NA Bungalow Plots Comparison",
    "forest-trails-na-bungalow-plots-advantage": "Why Forest Trails NA Bungalow Plots Are Pune's Best",
    "best-township-near-baner-pashan-it-hub": "Best Township near Baner Pashan IT Hub 2026",
    "bhugaon-vs-bavdhan-na-plots-comparison-2026": "Bhugaon vs Bavdhan NA Plots Comparison 2026",
    "buy-na-bungalow-plots-near-warje-sinhgad-road": "Buy NA Bungalow Plots near Warje Sinhgad Road",
    "bavdhan-vs-bhugaon-villa-investment": "Bavdhan vs Bhugaon Villa Investment 2026",
    "best-schools-near-bhugaon-paud-road": "Best Schools near Bhugaon Paud Road 2026",
}

def generate_news_sitemap():
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">',
    ]

    blog_dirs = []
    if os.path.isdir(BLOG_BASE):
        for d in sorted(os.listdir(BLOG_BASE)):
            idx = os.path.join(BLOG_BASE, d, "index.html")
            if os.path.isfile(idx):
                blog_dirs.append(d)

    count = 0
    for slug in blog_dirs:
        pub_date = BLOG_PUBLICATION_DATES.get(slug, today)
        title = BLOG_TITLES.get(slug, slug.replace('-', ' ').title())
        url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-blogs/{slug}/"
        lines.extend([
            '  <url>',
            f'    <loc>{url}</loc>',
            '    <news:news>',
            '      <news:publication>',
            '        <news:name>Paranjape Forest Trails Real Estate Blog</news:name>',
            '        <news:language>en</news:language>',
            '      </news:publication>',
            f'      <news:publication_date>{pub_date}T09:00:00+05:30</news:publication_date>',
            f'      <news:title>{title}</news:title>',
            '      <news:keywords>Pune real estate, NA plots Bhugaon, property investment Pune West, Forest Trails Bhugaon</news:keywords>',
            '    </news:news>',
            f'    <lastmod>{pub_date}</lastmod>',
            '    <priority>0.70</priority>',
            '  </url>',
        ])
        count += 1

    lines.append('</urlset>')
    out = os.path.join(BASE_DIR, 'sitemap-news.xml')
    with open(out, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Generated sitemap-news.xml: {count} blog entries.")

    # Add to sitemap index
    sitemap_path = os.path.join(BASE_DIR, 'sitemap.xml')
    try:
        with open(sitemap_path, encoding='utf-8') as f:
            sc = f.read()
        if 'sitemap-news.xml' not in sc:
            entry = f"""  <sitemap>
    <loc>{DOMAIN}/sitemap-news.xml</loc>
    <lastmod>{today}</lastmod>
  </sitemap>"""
            sc = sc.replace('</sitemapindex>', entry + '\n</sitemapindex>')
            with open(sitemap_path, 'w', encoding='utf-8') as f:
                f.write(sc)
            print("Added sitemap-news.xml to sitemap.xml index.")
    except Exception as e:
        print(f"Could not update sitemap.xml: {e}")

def main():
    print("=" * 68)
    print("Sitemap Priority Hardener + News Sitemap Generator")
    print("=" * 68)

    # Harden all sitemap XML files
    total = 0
    for fname in os.listdir(BASE_DIR):
        if fname.startswith('sitemap') and fname.endswith('.xml') and fname != 'sitemap.xml' and fname != 'sitemap-news.xml':
            fpath = os.path.join(BASE_DIR, fname)
            n = harden_sitemap(fpath)
            if n:
                print(f"  Priority hardened: {fname}")
            total += n

    print(f"\n  Sitemaps hardened: {total}")

    # Generate news sitemap
    generate_news_sitemap()
    print("=" * 68)

if __name__ == "__main__":
    main()
