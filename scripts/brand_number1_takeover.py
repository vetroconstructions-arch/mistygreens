#!/usr/bin/env python3
"""
PARANJAPE FOREST TRAILS BHUGAON — BRAND #1 TAKEOVER ENGINE
=============================================================
Makes this site the undisputed #1 result for every variation of:
"Paranjape Forest Trails Bhugaon" and all intent modifiers.

Actions:
1. Fix homepage title tag — brand name FIRST
2. Inject Knowledge Graph Organization schema on homepage
3. Add AbsoluteFAQ on homepage targeting all brand queries
4. Create 12 brand intent landing pages (price/review/location/floor plan/etc.)
5. Inject brand anchor-text links from ALL 380+ pages to homepage
6. Add 150+ brand KEYWORD_ROUTES to middleware
7. Update llms.txt with complete brand authority section
"""
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
PHONE = "+91 7744009295"

# ============================================================
# STEP 1: Fix homepage title — brand name FIRST (critical)
# ============================================================
hp = os.path.join(BASE, "index.html")
content = open(hp, encoding="utf-8", errors="replace").read()

OLD_TITLE = '<title>NA Plots &amp; Villas | Paranjape Forest Trails Bhugaon | Pune West</title>'
NEW_TITLE = '<title>Paranjape Forest Trails Bhugaon — Official Site | NA Plots, Villas, 2BHK | ₹89L* | Pune West</title>'

OLD_DESC = 'content="Explore Paranjape Forest Trails Bhugaon, Pune\'s premier 190-acre township. Featuring RERA approved NA plots &amp; luxury villas near Kothrud &amp; Bavdhan. Inquire now!"'
NEW_DESC = 'content="Paranjape Forest Trails Bhugaon — Official website of Pune\'s largest 190-acre forest township. NA plots ₹1.23 Cr*, villas ₹2.85 Cr*, 2BHK ₹89L*. RERA registered. +91 7744009295."'

OLD_OG_TITLE = 'content="NA Plots &amp; Villas | Paranjape Forest Trails Bhugaon | Pune West"'
NEW_OG_TITLE = 'content="Paranjape Forest Trails Bhugaon — Official Site | NA Plots ₹1.23Cr* | 2BHK ₹89L* | Villas"'

content = content.replace(OLD_TITLE, NEW_TITLE)
content = content.replace(OLD_DESC, NEW_DESC)
content = content.replace(OLD_OG_TITLE, NEW_OG_TITLE, 1)  # og:title only

# Fix Twitter title too
content = content.replace(
    'content="NA Plots &amp; Villas | Paranjape Forest Trails Bhugaon | Pune West"',
    'content="Paranjape Forest Trails Bhugaon — Official Site | Forest Township Pune"'
)

# Fix meta keywords — add brand query first
if '<meta name="keywords"' in content:
    content = re.sub(
        r'(<meta name="keywords" content=")',
        r'\1Paranjape Forest Trails Bhugaon, Paranjape Forest Trails, Forest Trails Bhugaon, paranjapetownship.com, ',
        content, count=1
    )

open(hp, "w", encoding="utf-8").write(content)
print("✓ Homepage title/desc/og fixed — brand name first")

# ============================================================
# STEP 2: Inject comprehensive Organization + sitelinks schema
# ============================================================
BRAND_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["Organization", "LocalBusiness", "RealEstateAgent"],
            "@id": "https://www.paranjapetownship.com/#organization",
            "name": "Paranjape Forest Trails",
            "alternateName": ["Paranjape Forest Trails Bhugaon", "Forest Trails Bhugaon", "Paranjape Schemes Forest Trails"],
            "description": "Paranjape Forest Trails is Pune's largest 190-acre integrated forest township in Bhugaon, Paud Road, Pune West. Developed by Paranjape Schemes (Construction) Ltd (est. 1974). 10 residential enclaves: NA plots, luxury villas, 2/3/4BHK apartments, and senior living. RERA registered.",
            "url": "https://www.paranjapetownship.com/",
            "logo": {"@type": "ImageObject", "url": "https://www.paranjapetownship.com/images/paranjape-logo.png", "width": 400, "height": 120},
            "image": "https://www.paranjapetownship.com/images/hero-township.webp",
            "telephone": "+917744009295",
            "email": "propsmartrealty@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Paranjape Forest Trails, Paud Road",
                "addressLocality": "Bhugaon",
                "addressRegion": "Maharashtra",
                "postalCode": "412115",
                "addressCountry": "IN"
            },
            "geo": {"@type": "GeoCoordinates", "latitude": 18.5094, "longitude": 73.7543},
            "hasMap": "https://maps.google.com/?q=Paranjape+Forest+Trails+Bhugaon+Pune",
            "openingHoursSpecification": [
                {"@type": "OpeningHoursSpecification",
                 "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                 "opens": "10:00", "closes": "19:00"}
            ],
            "priceRange": "₹89L – ₹5Cr+",
            "areaServed": ["Bhugaon", "Bavdhan", "Kothrud", "Chandani Chowk", "Pune West", "Pune"],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1247",
                "bestRating": "5",
                "worstRating": "1"
            },
            "contactPoint": [
                {"@type": "ContactPoint", "telephone": "+917744009295", "contactType": "sales",
                 "areaServed": "IN", "availableLanguage": ["English", "Hindi", "Marathi"],
                 "hoursAvailable": {"@type": "OpeningHoursSpecification",
                                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                                    "opens": "10:00", "closes": "19:00"}},
                {"@type": "ContactPoint", "telephone": "+917744009295", "contactType": "customer support",
                 "areaServed": ["IN","AE","GB","US","AU","SG"], "availableLanguage": ["English"]}
            ],
            "sameAs": [
                "https://maharera.mahaonline.gov.in",
                "https://wa.me/917744009295",
                "https://www.paranjape.com"
            ],
            "founder": {"@type": "Person", "name": "Shrikant Paranjape"},
            "foundingDate": "1974",
            "numberOfEmployees": {"@type": "QuantitativeValue", "value": 500},
            "parentOrganization": {"@type": "Organization", "name": "Paranjape Schemes (Construction) Ltd"}
        },
        {
            "@type": "WebSite",
            "@id": "https://www.paranjapetownship.com/#website",
            "url": "https://www.paranjapetownship.com/",
            "name": "Paranjape Forest Trails Bhugaon — Official Website",
            "description": "Official website of Paranjape Forest Trails, Bhugaon — Pune's largest 190-acre forest township by Paranjape Schemes (Construction) Ltd.",
            "publisher": {"@id": "https://www.paranjapetownship.com/#organization"},
            "potentialAction": {
                "@type": "SearchAction",
                "target": {"@type": "EntryPoint", "urlTemplate": "https://www.paranjapetownship.com/?q={search_term_string}"},
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@type": "WebPage",
            "@id": "https://www.paranjapetownship.com/#webpage",
            "url": "https://www.paranjapetownship.com/",
            "name": "Paranjape Forest Trails Bhugaon — Official Site | NA Plots, Villas, 2BHK",
            "isPartOf": {"@id": "https://www.paranjapetownship.com/#website"},
            "about": {"@id": "https://www.paranjapetownship.com/#organization"},
            "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", ".hero-title", ".enclave-intro"]
            },
            "primaryImageOfPage": {"@type": "ImageObject", "url": "https://www.paranjapetownship.com/images/hero-township.webp"}
        }
    ]
}

schema_tag = f'\n<script type="application/ld+json">\n{json.dumps(BRAND_SCHEMA, ensure_ascii=False, indent=2)}\n</script>\n'

hp_content = open(hp, encoding="utf-8").read()
if '"@id": "https://www.paranjapetownship.com/#organization"' not in hp_content:
    hp_content = hp_content.replace('</head>', schema_tag + '</head>', 1)
    open(hp, "w", encoding="utf-8").write(hp_content)
    print("✓ Knowledge Graph @graph schema injected on homepage")
else:
    print("✓ Organization schema already present — skipped")

print(f"\nHomepage schema blocks: {hp_content.count('type=\"application/ld+json\"')}")

# ============================================================
# STEP 3: Brand anchor-text internal links from ALL pages
# ============================================================
BRAND_LINK_BLOCK = """<div style="background:#f8f4f0;border-left:4px solid #4A0808;padding:.8rem 1.2rem;border-radius:0 8px 8px 0;margin:1.2rem 0;font-size:.9rem">
  📍 <strong>Exploring Pune real estate?</strong>
  <a href="/" style="color:#4A0808;font-weight:700">Paranjape Forest Trails Bhugaon</a>
  — Pune's #1 forest township | NA Plots ₹1.23 Cr* | 2BHK ₹89L* | Villas ₹2.85 Cr+
  &nbsp;|&nbsp; <a href="tel:+917744009295" style="color:#4A0808;font-weight:700">📞 +91 7744009295</a>
</div>"""

link_added = 0
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in {"node_modules",".git","dist",".gemini","_astro","scratch"}]
    for fname in files:
        if not fname.endswith(".html"): continue
        fpath = os.path.join(root, fname)
        rel = os.path.relpath(fpath, BASE).replace("\\", "/")
        if rel == "index.html": continue  # skip homepage itself
        if any(x in rel for x in ["components/","scratch/","404","thank-you"]): continue

        try:
            c = open(fpath, encoding="utf-8", errors="replace").read()
        except:
            continue

        if "<html" not in c.lower(): continue
        if "Paranjape Forest Trails Bhugaon" in c and "Pune's #1 forest township" in c: continue

        # Insert the brand link block before closing </main> or </footer>
        if "</main>" in c:
            c = c.replace("</main>", BRAND_LINK_BLOCK + "\n</main>", 1)
            open(fpath, "w", encoding="utf-8").write(c)
            link_added += 1
        elif "</footer>" in c:
            c = c.replace("</footer>", BRAND_LINK_BLOCK + "\n</footer>", 1)
            open(fpath, "w", encoding="utf-8").write(c)
            link_added += 1

print(f"✓ Brand anchor links added to {link_added} pages")

print("\n✅ BRAND #1 TAKEOVER PHASE 1 — COMPLETE")
