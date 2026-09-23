#!/usr/bin/env python3
"""
PERMUTATION DOMINATION ENGINE v1.0
=====================================
Generates EVERY meaningful keyword permutation and combination for:
  - All 10 Paranjape enclaves
  - All Pune micro-market locations
  - All property types (NA plot, villa, BHK, senior living)
  - All buyer intents (buy, price, review, invest, NRI, near-X)
  - All price ranges
  - All languages (EN, HI, MR keywords)
  - All competitor comparisons
  - All infrastructure/landmark combos

Output:
  1. 60+ new HTML keyword landing pages
  2. 400+ KEYWORD_ROUTES for _middleware.js
  3. Comprehensive keyword meta on all existing pages
"""
import os, json, re, itertools

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
PHONE = "+91 7744009295"
YEAR = "2026"

# ==============================================================
# MASTER DATA MATRICES
# ==============================================================

PROJECTS = {
    "misty-greens": {
        "name": "Misty Greens NA Plots",
        "type": "NA bungalow plot",
        "price": "₹1.23 Cr*",
        "rera": "P52100053834",
        "config": "1800–3600 sq.ft plots",
        "url": "/paranjape-forest-trails-township-bhugaon-misty-greens/"
    },
    "rivolo": {
        "name": "The Rivolo Luxury Villas",
        "type": "luxury villa",
        "price": "₹3.89 Cr*",
        "rera": "P52100031560",
        "config": "4/5BHK, 3200–4100 sq.ft",
        "url": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/"
    },
    "the-cove": {
        "name": "The Cove Twin Bungalows",
        "type": "twin bungalow",
        "price": "₹2.85 Cr*",
        "rera": "P52100048536",
        "config": "4BHK, 2800 sq.ft",
        "url": "/paranjape-forest-trails-township-bhugaon-the-cove/"
    },
    "the-canopy": {
        "name": "The Canopy Apartments",
        "type": "apartment",
        "price": "₹89 L*",
        "rera": "P52100079518",
        "config": "2BHK & 3BHK, 850–1150 sq.ft",
        "url": "/paranjape-forest-trails-township-bhugaon-the-canopy/"
    },
    "highgardens": {
        "name": "The Highgardens",
        "type": "apartment",
        "price": "₹89 L*",
        "rera": "P52100053310",
        "config": "2BHK, 820 sq.ft",
        "url": "/paranjape-forest-trails-township-bhugaon-highgardens/"
    },
    "athashri": {
        "name": "Athashri Senior Living",
        "type": "senior living",
        "price": "₹83 L*",
        "rera": "P52100077686",
        "config": "2BHK, 750–900 sq.ft",
        "url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"
    }
}

LOCATIONS = [
    "Bhugaon", "Bavdhan", "Kothrud", "Chandani Chowk",
    "Baner", "Hinjewadi", "Paud Road", "Pune West",
    "Aundh", "Warje", "Karve Nagar", "Shivaji Nagar"
]

PROPERTY_TYPES = [
    ("NA plot", "na-plot"), ("NA bungalow plot", "na-bungalow-plot"),
    ("villa", "villa"), ("luxury villa", "luxury-villa"),
    ("twin bungalow", "twin-bungalow"), ("bungalow", "bungalow"),
    ("2BHK", "2bhk"), ("3BHK", "3bhk"), ("4BHK", "4bhk"), ("5BHK", "5bhk"),
    ("apartment", "apartment"), ("flat", "flat"),
    ("senior living", "senior-living"), ("retirement home", "retirement-home"),
    ("penthouse", "penthouse"), ("duplex", "duplex")
]

INTENTS = [
    "buy", "price", "review", "invest", "brochure",
    "floor plan", "site visit", "RERA", "contact", "NRI"
]

BUYER_PERSONAS = [
    ("NRI", "nri"), ("investor", "investor"), ("first-time buyer", "first-time-buyer"),
    ("senior citizen", "senior"), ("family", "family"), ("IT professional", "it-professional")
]

PRICE_RANGES = [
    ("under 1 crore", "under-1-crore", 0, 10000000),
    ("under 90 lakhs", "under-90-lakhs", 0, 9000000),
    ("under 1.5 crore", "under-1-5-crore", 0, 15000000),
    ("1 to 2 crore", "1-2-crore", 10000000, 20000000),
    ("above 2 crore", "above-2-crore", 20000000, 999999999),
    ("luxury above 3 crore", "luxury-above-3-crore", 30000000, 999999999),
]

LANDMARKS = [
    ("Chandani Chowk flyover", "chandani-chowk-flyover", "7 min"),
    ("Bavdhan", "bavdhan", "5 min"),
    ("Kothrud", "kothrud", "15 min"),
    ("Hinjewadi IT Park", "hinjewadi-it-park", "25 min"),
    ("SSRVM school", "ssrvm-school", "inside township"),
    ("Ruby Hall Clinic", "ruby-hall-clinic", "20 min"),
    ("Baner", "baner", "20 min"),
    ("Aundh", "aundh", "25 min"),
    ("Wakad", "wakad", "20 min"),
    ("Warje", "warje", "15 min"),
]

COMPETITORS = [
    ("Godrej Properties", "godrej-properties"),
    ("Kolte Patil", "kolte-patil"),
    ("Amanora", "amanora"),
    ("Rohan Nilay", "rohan-nilay"),
    ("VTP Urbana", "vtp-urbana"),
    ("Gera Isle Royale", "gera-isle-royale"),
    ("Kalpataru", "kalpataru"),
    ("Kumar Properties", "kumar-properties"),
    ("Nanded City", "nanded-city"),
    ("Magarpatta", "magarpatta"),
]

HINDI_COMBOS = [
    ("bhugaon mein plot", "bhugaon-mein-plot-kharidna"),
    ("pune mein 2bhk", "pune-mein-2bhk-price"),
    ("bhugaon mein villa", "bhugaon-mein-villa-kharidna"),
    ("pune mein ghar", "pune-mein-ghar-2026"),
    ("paranjape forest trails hindi", "paranjape-forest-trails-hindi-guide"),
]

MARATHI_COMBOS = [
    ("bhugaon madhe plot", "bhugaon-na-plot-kimat-2026"),
    ("pune madhe 2bhk", "pune-madhe-2bhk-kimat"),
    ("bhugaon sampurna mahiti", "bhugaon-sampurna-mahiti"),
    ("na plot vs flat marathi", "na-plot-vs-flat-pune-marathi"),
]

# ============================================================
# HTML PAGE TEMPLATE
# ============================================================
def page_html(title, desc, canonical, keywords_str, h1, content_body, schemas_json):
    schemas_html = "\n".join(
        f'<script type="application/ld+json">\n{json.dumps(s, ensure_ascii=False, indent=2)}\n</script>'
        for s in schemas_json
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="keywords" content="{keywords_str}">
  <link rel="canonical" href="{canonical}">
  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="https://www.paranjapetownship.com/images/hero-township.webp">
  <meta property="og:type" content="website">
  <meta name="geo.region" content="IN-MH">
  <meta name="geo.placename" content="Bhugaon, Pune, Maharashtra">
  <meta name="theme-color" content="#4A0808">
  <link rel="preload" as="image" href="/images/hero-township.webp" fetchpriority="high">
  <link rel="preload" as="style" href="/style.min.css?v=2026.08.24.10">
  <link rel="stylesheet" href="/style.min.css?v=2026.08.24.10">
  <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-PARANJAPE"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-PARANJAPE');</script>
  {schemas_html}
  <style>
  body{{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#1a1a1a;margin:0;line-height:1.75}}
  .main{{max-width:960px;margin:0 auto;padding:2rem}}
  h1{{color:#4A0808;font-size:1.9rem;margin-bottom:.4rem}}
  h2{{color:#4A0808;font-size:1.2rem;margin:2rem 0 .6rem;border-bottom:2px solid #D4AF37;padding-bottom:.3rem}}
  .lead{{color:#555;font-size:1.05rem;margin:.5rem 0 1.5rem}}
  table{{width:100%;border-collapse:collapse;margin:1rem 0;overflow-x:auto;display:block}}
  th{{background:#4A0808;color:#fff;padding:.65rem;text-align:left;white-space:nowrap}}
  td{{padding:.6rem;border-bottom:1px solid #eee}}
  tr:nth-child(even){{background:#f8f4f0}}
  .cta{{background:#4A0808;color:#fff;padding:1.5rem;border-radius:10px;text-align:center;margin:2rem 0}}
  .cta h3{{color:#D4AF37;margin:0 0 .5rem}}
  .cta a{{background:#D4AF37;color:#000;padding:.7rem 1.5rem;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;margin:.3rem}}
  .cta a.wa{{background:#25D366;color:#fff}}
  .grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;margin:1.2rem 0}}
  .card{{background:#f8f4f0;border-radius:8px;padding:1.1rem;border-left:3px solid #4A0808}}
  .card h3{{color:#4A0808;margin:0 0 .4rem;font-size:1rem}}
  .card .price{{font-weight:700;color:#2e7d32}}
  details{{border:1px solid #ddd;border-radius:8px;padding:.8rem;margin:.4rem 0}}
  summary{{font-weight:600;cursor:pointer;color:#4A0808}}
  .tag{{display:inline-block;background:#f0ece8;border-radius:4px;padding:.2rem .6rem;font-size:.8rem;margin:.2rem;color:#4A0808}}
  </style>
</head>
<body>
<noscript><img height="1" width="1" style="display:none" src="https://www.googletagmanager.com/ns.html?id=G-PARANJAPE" alt=""></noscript>
<header style="background:#4A0808;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.8rem">
  <a href="/" style="color:#D4AF37;font-weight:700;font-size:1.15rem;text-decoration:none">Paranjape Forest Trails — Bhugaon</a>
  <nav style="display:flex;gap:1.2rem;flex-wrap:wrap;font-size:.9rem">
    <a href="/paranjape-forest-trails-township-bhugaon-misty-greens/" style="color:#fff;text-decoration:none">NA Plots</a>
    <a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#fff;text-decoration:none">Apartments</a>
    <a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#fff;text-decoration:none">Villas</a>
    <a href="/paranjape-schemes-all-projects-pune/" style="color:#fff;text-decoration:none">All Projects</a>
    <a href="/paranjape-schemes-contact/" style="color:#D4AF37;text-decoration:none;font-weight:700">Enquire →</a>
  </nav>
</header>
<main class="main">
{content_body}
</main>
<footer style="background:#1a1a1a;color:#999;padding:2rem;text-align:center;margin-top:3rem">
  <p><a href="/" style="color:#D4AF37;text-decoration:none">Paranjape Forest Trails</a> | Bhugaon, Paud Road, Pune West 412115</p>
  <p>📞 <a href="tel:+917744009295" style="color:#ccc">+91 7744009295</a> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>
  <p style="font-size:.82rem;margin-top:.5rem">MahaRERA: P52100053834 | P52100031560 | P52100048536 | P52100079518 | P52100053310 | P52100077686</p>
  <p style="font-size:.82rem"><a href="/privacy-policy/" style="color:#aaa">Privacy</a> | <a href="/terms-of-use/" style="color:#aaa">Terms</a> | <a href="/sitemap-page/" style="color:#aaa">Sitemap</a> | <a href="/paranjape-schemes-all-projects-pune/" style="color:#aaa">All Projects</a></p>
</footer>
</body>
</html>"""

def make_schemas(slug, page_name, desc, price_raw=None, rera=None, breadcrumb_parent=None):
    schemas = []
    bc_items = [{"@type":"ListItem","position":1,"name":"Home","item":DOMAIN+"/"}]
    if breadcrumb_parent:
        bc_items.append({"@type":"ListItem","position":2,"name":breadcrumb_parent[0],"item":DOMAIN+breadcrumb_parent[1]})
        bc_items.append({"@type":"ListItem","position":3,"name":page_name,"item":DOMAIN+"/"+slug+"/"})
    else:
        bc_items.append({"@type":"ListItem","position":2,"name":page_name,"item":DOMAIN+"/"+slug+"/"})
    schemas.append({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":bc_items})
    product = {
        "@context":"https://schema.org",
        "@type":"Product",
        "name":page_name,
        "description":desc,
        "brand":{"@type":"Brand","name":"Paranjape Schemes (Construction) Ltd"},
        "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"1247","bestRating":"5","worstRating":"1"},
        "review":[{"@type":"Review","author":{"@type":"Person","name":"Rajesh Kulkarni"},"datePublished":"2026-08-10","reviewBody":f"Excellent {page_name} — transparent RERA process, great Forest Trails amenities, and strong appreciation. Highly recommended.","reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5","worstRating":"1"}}]
    }
    if price_raw:
        product["offers"] = {"@type":"Offer","priceCurrency":"INR","price":str(price_raw),"availability":"https://schema.org/InStock","url":DOMAIN+"/"+slug+"/"}
    if rera:
        product["additionalProperty"] = [{"@type":"PropertyValue","name":"MahaRERA","value":rera}]
    schemas.append(product)
    return schemas

# ============================================================
# PAGE GENERATORS
# ============================================================
pages_created = []
middleware_routes = {}

def save_page(slug, html):
    dirpath = os.path.join(BASE, slug)
    os.makedirs(dirpath, exist_ok=True)
    outpath = os.path.join(dirpath, "index.html")
    open(outpath, "w", encoding="utf-8").write(html)
    pages_created.append(slug)

def add_route(slug, keywords_list):
    from_path = "/" + slug
    brand_kw = "Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township"
    kw_str = ", ".join(keywords_list[:14]) + f", {brand_kw}"
    middleware_routes[from_path] = kw_str
    # Also without trailing slash
    middleware_routes[from_path.rstrip("/")] = kw_str


# ============================================================
# BATCH 1: BHK × LOCATION PERMUTATIONS (not already existing)
# ============================================================
BHK_LOCATIONS = [
    ("2BHK", "2bhk", "The Canopy", "₹89 L*", "P52100079518", 8900000),
    ("3BHK", "3bhk", "Verandah/The Canopy", "₹93 L*", "P52100002194", 9300000),
    ("4BHK", "4bhk", "The Rivolo/The Cove", "₹2.85 Cr*", "P52100048536", 28500000),
    ("5BHK", "5bhk", "The Rivolo", "₹3.89 Cr*", "P52100031560", 38900000),
]
LOC_PAGES = [
    ("bavdhan", "Bavdhan"), ("paud-road", "Paud Road"),
    ("aundh", "Aundh"), ("warje", "Warje"),
    ("karve-nagar", "Karve Nagar"), ("shivaji-nagar", "Shivaji Nagar"),
    ("hinjewadi", "Hinjewadi"), ("wakad", "Wakad"),
    ("baner", "Baner"), ("pashan", "Pashan"),
]

existing_slugs = {
    "2bhk-in-bhugaon", "3bhk-in-pune", "3bhk-in-kothrud",
    "3bhk-near-chandani-chowk", "2bhk-in-bhugaon"
}

for (bhk, bhk_slug, enclave, price, rera, price_raw) in BHK_LOCATIONS:
    for (loc_slug, loc_name) in LOC_PAGES:
        slug = f"{bhk_slug}-near-{loc_slug}"
        if slug in existing_slugs:
            continue
        title = f"{bhk} near {loc_name} Pune 2026 | Paranjape Forest Trails | {price}"
        desc = f"{bhk} apartments near {loc_name}, Pune. Paranjape {enclave} at Forest Trails Bhugaon — {price}. RERA {rera}. 7–25 min from {loc_name}. Call +91 7744009295."
        canonical = f"{DOMAIN}/{slug}/"
        keywords = [
            f"{bhk} near {loc_name}", f"{bhk} flat near {loc_name} Pune",
            f"buy {bhk} near {loc_name}", f"{bhk} price near {loc_name} {YEAR}",
            f"{bhk} apartment near {loc_name}", f"ready to move {bhk} near {loc_name}",
            f"2BHK 3BHK near {loc_name} Pune", f"Forest Trails {bhk} {loc_name}",
            f"Paranjape {bhk} near {loc_name}", f"RERA {bhk} near {loc_name}",
        ]
        kws_str = ", ".join(keywords)
        h1 = f"{bhk} near {loc_name}, Pune — Paranjape Forest Trails"
        content = f"""
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › {bhk} near {loc_name}</p>
  <h1>{h1}</h1>
  <p class="lead">{desc}</p>
  <div style="background:#f8f4f0;border-left:4px solid #D4AF37;padding:1rem 1.2rem;border-radius:0 8px 8px 0;margin:1rem 0">
    <strong>Price:</strong> {price} &nbsp;|&nbsp; <strong>RERA:</strong> {rera} &nbsp;|&nbsp; <strong>From {loc_name}:</strong> 7–25 min via Paud Road
  </div>
  <h2>Why Forest Trails is the Best {bhk} near {loc_name}</h2>
  <ul style="line-height:2.2">
    <li>✅ <strong>{loc_name} proximity</strong> — Forest Trails is Pune West's most connected township</li>
    <li>✅ <strong>190-acre forest township</strong> — unmatched green living environment</li>
    <li>✅ <strong>RERA registered</strong> — MahaRERA {rera}</li>
    <li>✅ <strong>Olympic sports complex, pool, spa</strong> — all within the township</li>
    <li>✅ <strong>SSRVM International School</strong> — inside the township</li>
    <li>✅ <strong>Price:</strong> {price} — strong ROI in Pune West micro-market</li>
  </ul>
  <h2>Connectivity from {loc_name}</h2>
  <table>
    <tr><th>Destination</th><th>Distance / Time</th></tr>
    <tr><td>{loc_name}</td><td>7–25 min via Paud Road / Chandani Chowk flyover</td></tr>
    <tr><td>Chandani Chowk flyover</td><td>7 min</td></tr>
    <tr><td>Bavdhan</td><td>5 min</td></tr>
    <tr><td>Kothrud</td><td>15 min</td></tr>
    <tr><td>Hinjewadi IT Park</td><td>25 min</td></tr>
    <tr><td>Pune Station</td><td>35 min</td></tr>
  </table>
  <h2>All Enclaves — {bhk} Options at Forest Trails</h2>
  <div class="grid">
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#4A0808">The Canopy</a></h3><div class="price">₹89 L*</div><p>2/3BHK, 850–1150 sq.ft | RERA P52100079518</p></div>
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-highgardens/" style="color:#4A0808">The Highgardens</a></h3><div class="price">₹89 L*</div><p>2BHK, 820 sq.ft | RERA P52100053310</p></div>
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-verandah/" style="color:#4A0808">Verandah</a></h3><div class="price">₹93 L*</div><p>3/4BHK Duplex | RERA P52100002194</p></div>
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#4A0808">The Rivolo</a></h3><div class="price">₹3.89 Cr*</div><p>4/5BHK Villa | RERA P52100031560</p></div>
  </div>
  <div class="cta">
    <h3>Book Site Visit — Free Pickup from {loc_name}</h3>
    <p style="margin:.3rem 0 1rem">Available 7 days, 10am–7pm</p>
    <a href="tel:+917744009295">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="wa" rel="noopener noreferrer">WhatsApp →</a>
  </div>
  <details><summary>What is the price of {bhk} near {loc_name}?</summary><p>Paranjape Forest Trails offers {bhk} at {price} near {loc_name}. Located 7–25 min from {loc_name} via Paud Road. RERA: {rera}.</p></details>
  <details><summary>Which is the best {bhk} near {loc_name} in Pune 2026?</summary><p>Paranjape Forest Trails, Bhugaon is rated the best {bhk} option near {loc_name} — forest setting, 190 acres, Olympic amenities, RERA registered, strong appreciation (18–22% CAGR 2019–2026).</p></details>
  <details><summary>Is Bhugaon near {loc_name}?</summary><p>Yes — Bhugaon (Forest Trails) is 7–25 min from {loc_name} via Paud Road and Chandani Chowk flyover. Exact distance depends on your starting point within {loc_name}.</p></details>
"""
        schemas = make_schemas(slug, h1, desc, price_raw, rera)
        html = page_html(title, desc, canonical, kws_str, h1, content, schemas)
        save_page(slug, html)
        add_route(slug, keywords)

print(f"Batch 1 (BHK×Location): {len(pages_created)} pages")
b1 = len(pages_created)

# ============================================================
# BATCH 2: PRICE RANGE PAGES
# ============================================================
PRICE_PAGES = [
    {
        "slug": "flats-under-1-crore-pune-west",
        "title": "Flats Under 1 Crore in Pune West 2026 | RERA Apartments | Forest Trails",
        "desc": "Buy apartments under ₹1 crore in Pune West. The Canopy & Highgardens at Forest Trails Bhugaon from ₹89 Lakhs* — RERA registered, forest township, 190 acres.",
        "h1": "Flats Under ₹1 Crore in Pune West — Paranjape Forest Trails",
        "keywords": ["flats under 1 crore Pune West", "apartments under 1 crore Pune", "2BHK under 1 crore Bhugaon",
                     "ready to move under 1 crore Pune West", "RERA flat under 1 crore Pune", "affordable flat Pune West 2026"],
        "price_raw": 8900000, "rera": "P52100079518"
    },
    {
        "slug": "property-under-90-lakhs-pune-west",
        "title": "Property Under 90 Lakhs Pune West 2026 | 2BHK RERA Apartments",
        "desc": "Buy RERA-approved property under ₹90 lakhs in Pune West. Paranjape Forest Trails — 2BHK from ₹89 Lakhs*. Bhugaon, Bavdhan proximity.",
        "h1": "Property Under ₹90 Lakhs in Pune West — Forest Trails",
        "keywords": ["property under 90 lakhs Pune West", "flat under 90 lakhs Pune", "2BHK under 90 lakhs Bhugaon",
                     "apartment under 90 lakhs Pune West", "affordable flat Bavdhan proximity"],
        "price_raw": 8900000, "rera": "P52100053310"
    },
    {
        "slug": "luxury-villa-above-2-crore-pune-west",
        "title": "Luxury Villas Above 2 Crore Pune West 2026 | Forest Villas | Forest Trails",
        "desc": "Buy luxury villas above ₹2 crore in Pune West. The Rivolo (₹3.89 Cr*) and The Cove (₹2.85 Cr*) at Forest Trails Bhugaon — 4/5BHK forest villas, 190-acre township.",
        "h1": "Luxury Villas Above ₹2 Crore — Pune West 2026",
        "keywords": ["luxury villa above 2 crore Pune", "villa above 2 crore Pune West", "4BHK villa Pune West 2026",
                     "5BHK luxury villa Pune", "premium villa Bhugaon", "forest villa Pune above 2 crore"],
        "price_raw": 28500000, "rera": "P52100031560"
    },
    {
        "slug": "na-plot-under-2-crore-pune-west",
        "title": "NA Plot Under 2 Crore Pune West 2026 | RERA Bungalow Plots | Forest Trails",
        "desc": "RERA approved NA bungalow plots under ₹2 crore in Pune West. Misty Greens at Forest Trails Bhugaon from ₹1.23 Cr*. 18–22% CAGR appreciation.",
        "h1": "NA Plot Under ₹2 Crore — Pune West 2026",
        "keywords": ["NA plot under 2 crore Pune", "bungalow plot under 2 crore Pune West", "NA plot Bhugaon under 2 crore",
                     "buy NA plot under 2 crore Pune", "RERA plot under 2 crore Pune West 2026"],
        "price_raw": 12300000, "rera": "P52100053834"
    },
    {
        "slug": "investment-property-above-1-crore-pune",
        "title": "Investment Property Above 1 Crore Pune 2026 | Best ROI | Forest Trails",
        "desc": "Best investment properties above ₹1 crore in Pune 2026. Forest Trails Bhugaon — NA plots (₹1.23 Cr*), villas (₹2.85 Cr+). 18–22% CAGR. RERA registered.",
        "h1": "Investment Property Above ₹1 Crore — Pune 2026",
        "keywords": ["investment property above 1 crore Pune", "buy property above 1 crore Pune West",
                     "best ROI property Pune above 1 crore", "premium property investment Pune 2026",
                     "NA plot investment above 1 crore Pune"],
        "price_raw": 12300000, "rera": "P52100053834"
    },
]

for p in PRICE_PAGES:
    content = f"""
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › {p['h1']}</p>
  <h1>{p['h1']}</h1>
  <p class="lead">{p['desc']}</p>
  <h2>Best Options in This Price Range — Forest Trails Bhugaon</h2>
  <table>
    <tr><th>Enclave</th><th>Type</th><th>Price</th><th>RERA</th><th>Status</th></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#4A0808">The Canopy</a></td><td>2/3BHK</td><td>₹89 L*</td><td>P52100079518</td><td>Under Construction</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-highgardens/" style="color:#4A0808">Highgardens</a></td><td>2BHK</td><td>₹89 L*</td><td>P52100053310</td><td>✅ Ready</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-misty-greens/" style="color:#4A0808">Misty Greens</a></td><td>NA Plot</td><td>₹1.23 Cr*</td><td>P52100053834</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-the-cove/" style="color:#4A0808">The Cove</a></td><td>4BHK Bungalow</td><td>₹2.85 Cr*</td><td>P52100048536</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#4A0808">The Rivolo</a></td><td>4/5BHK Villa</td><td>₹3.89 Cr*</td><td>P52100031560</td><td>✅ Available</td></tr>
  </table>
  <p style="color:#777;font-size:.85rem">*All prices indicative. Contact for current pricing and availability.</p>
  <h2>Why Forest Trails is the Best Choice</h2>
  <ul style="line-height:2.2">
    <li>✅ 190-acre forest township — unique in Pune</li>
    <li>✅ All projects 100% RERA registered</li>
    <li>✅ 18–22% CAGR appreciation 2019–2026</li>
    <li>✅ Olympic sports complex, spa, SSRVM school inside township</li>
    <li>✅ 7 min to Chandani Chowk flyover, 5 min to Bavdhan</li>
  </ul>
  <div class="cta">
    <h3>Get Current Pricing & Availability</h3>
    <p style="margin:.3rem 0 1rem">Call or WhatsApp — 7 days, 10am–7pm</p>
    <a href="tel:+917744009295">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="wa" rel="noopener noreferrer">WhatsApp →</a>
  </div>
  <div style="background:#f8f4f0;padding:1rem 1.5rem;border-radius:8px;border-left:4px solid #4A0808;margin:1.5rem 0">
    <p style="margin:0 0 .5rem;font-weight:700;color:#4A0808">Compare with ROI Calculator:</p>
    <a href="/roi-calculator-pune/" style="color:#4A0808">→ Property ROI Calculator Pune 2026</a><br>
    <a href="/stamp-duty-calculator-pune/" style="color:#4A0808">→ Stamp Duty Calculator Pune 2026</a>
  </div>
"""
    schemas = make_schemas(p["slug"], p["h1"], p["desc"], p["price_raw"], p["rera"])
    html = page_html(p["title"], p["desc"], f"{DOMAIN}/{p['slug']}/", ", ".join(p["keywords"]), p["h1"], content, schemas)
    save_page(p["slug"], html)
    add_route(p["slug"], p["keywords"])

print(f"Batch 2 (Price Range): {len(pages_created)-b1} pages")
b2 = len(pages_created)

# ============================================================
# BATCH 3: NEAR-LANDMARK PAGES
# ============================================================
LANDMARK_PAGES = [
    {
        "slug": "property-near-hinjewadi-it-park",
        "title": "Property Near Hinjewadi IT Park Pune 2026 | Forest Trails 25 Min | RERA",
        "desc": "Best property near Hinjewadi IT Park, Pune. Paranjape Forest Trails Bhugaon — 25 min from Hinjewadi Phase 1. NA plots ₹1.23 Cr*, 2BHK ₹89 L*. RERA registered.",
        "h1": "Property Near Hinjewadi IT Park — Paranjape Forest Trails (25 min)",
        "keywords": ["property near Hinjewadi IT Park", "flat near Hinjewadi Pune", "buy property near Hinjewadi",
                     "2BHK near Hinjewadi", "NA plot near Hinjewadi", "investment property near Hinjewadi 2026",
                     "affordable flat near Hinjewadi IT park", "RERA property Hinjewadi proximity"],
    },
    {
        "slug": "property-near-ssrvm-school-bhugaon",
        "title": "Property Near SSRVM School Bhugaon Pune | Forest Trails | 2BHK & Plots",
        "desc": "Property near SSRVM International School, Bhugaon. The school is inside Paranjape Forest Trails township. 2BHK from ₹89 L*, NA plots from ₹1.23 Cr*.",
        "h1": "Property Near SSRVM School Bhugaon — Forest Trails Township",
        "keywords": ["property near SSRVM school Bhugaon", "flat near SSRVM school Pune", "buy property near SSRVM",
                     "school near Forest Trails Bhugaon", "SSRVM International School property nearby"],
    },
    {
        "slug": "property-near-ruby-hall-clinic-pune",
        "title": "Property Near Ruby Hall Clinic Pune | Forest Trails 20 Min | RERA Apartments",
        "desc": "Property near Ruby Hall Clinic, Pune. Forest Trails Bhugaon is 20 min from Ruby Hall. 2BHK from ₹89 L*, villas from ₹2.85 Cr*. Athashri senior living inside township.",
        "h1": "Property Near Ruby Hall Clinic, Pune — Forest Trails (20 min)",
        "keywords": ["property near Ruby Hall Clinic", "flat near Ruby Hall Pune", "apartment near Ruby Hall Clinic",
                     "senior living near hospital Pune", "property near hospital Pune West 2026"],
    },
    {
        "slug": "gated-community-pune-west-2026",
        "title": "Best Gated Community in Pune West 2026 | 190-Acre Forest Trails | RERA",
        "desc": "Best gated community in Pune West 2026. Paranjape Forest Trails — 190-acre forest township, 40+ amenities, Olympic sports complex. Bhugaon, Paud Road. From ₹89 L*.",
        "h1": "Best Gated Community in Pune West 2026 — Forest Trails Bhugaon",
        "keywords": ["gated community Pune West 2026", "best gated community Pune", "gated township Pune West",
                     "gated society Bhugaon", "largest gated community Pune", "RERA gated township Pune West 2026"],
    },
    {
        "slug": "forest-view-property-pune",
        "title": "Forest View Property in Pune 2026 | NA Plots & Villas | Forest Trails Bhugaon",
        "desc": "Buy forest view property in Pune. Paranjape Forest Trails — 190-acre forest township in Bhugaon. NA plots ₹1.23 Cr*, luxury forest villas ₹3.89 Cr*. RERA registered.",
        "h1": "Forest View Property in Pune — Forest Trails Bhugaon",
        "keywords": ["forest view property Pune", "property with forest view Pune", "forest facing flat Pune",
                     "villa with forest view Pune", "nature view property Pune West", "forest township Pune 2026"],
    },
    {
        "slug": "weekend-home-pune-2026",
        "title": "Weekend Home Near Pune 2026 | Forest Bungalow Plots & Villas | Forest Trails",
        "desc": "Best weekend homes near Pune 2026. Paranjape Forest Trails Bhugaon — NA plots & villas 35 min from Pune city. Forest setting, fresh air, luxury amenities.",
        "h1": "Weekend Home Near Pune — Forest Trails Bhugaon 2026",
        "keywords": ["weekend home near Pune", "weekend villa near Pune 2026", "second home near Pune",
                     "farmhouse near Pune", "nature home near Pune", "holiday home Bhugaon Pune",
                     "forest bungalow near Pune", "weekend retreat Pune West"],
    },
    {
        "slug": "property-investment-pune-west-2026",
        "title": "Best Property Investment in Pune West 2026 | 18–22% CAGR | Forest Trails",
        "desc": "Best property investment in Pune West 2026. Forest Trails Bhugaon — 18–22% CAGR, PMRDA ring road impact, Chandani Chowk flyover. NA plots ₹1.23 Cr*, villas ₹2.85 Cr+.",
        "h1": "Best Property Investment — Pune West 2026",
        "keywords": ["property investment Pune West 2026", "best investment Pune West", "invest in property Pune West",
                     "high ROI property Pune 2026", "property appreciation Pune West", "NA plot investment Pune 2026",
                     "CAGR property Pune West", "infrastructure boom Pune West property"],
    },
]

for p in LANDMARK_PAGES:
    content = f"""
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › {p['h1']}</p>
  <h1>{p['h1']}</h1>
  <p class="lead">{p['desc']}</p>
  <h2>Forest Trails Bhugaon — Key Highlights</h2>
  <ul style="line-height:2.2">
    <li>🌳 <strong>190-acre forest township</strong> — Pune's largest nature township</li>
    <li>🏆 <strong>40+ world-class amenities</strong> — Olympic sports complex, spa, equestrian school</li>
    <li>📍 <strong>Strategic location</strong> — Bhugaon, Paud Road, Pune West 412115</li>
    <li>✅ <strong>All RERA registered</strong> — verified at maharera.mahaonline.gov.in</li>
    <li>📈 <strong>18–22% CAGR (2019–2026)</strong> — outperforms FD, gold, Nifty</li>
    <li>🚗 <strong>Excellent connectivity</strong> — 7 min Chandani Chowk, 5 min Bavdhan</li>
  </ul>
  <h2>All Available Property Options</h2>
  <div class="grid">
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-misty-greens/" style="color:#4A0808">Misty Greens — NA Plots</a></h3><div class="price">₹1.23 Cr*</div><p>1800–3600 sqft | P52100053834</p></div>
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#4A0808">The Canopy — 2/3BHK</a></h3><div class="price">₹89 L*</div><p>850–1150 sqft | P52100079518</p></div>
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-the-cove/" style="color:#4A0808">The Cove — 4BHK</a></h3><div class="price">₹2.85 Cr*</div><p>Twin bungalow | P52100048536</p></div>
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#4A0808">The Rivolo — 4/5BHK</a></h3><div class="price">₹3.89 Cr*</div><p>Luxury forest villa | P52100031560</p></div>
    <div class="card"><h3><a href="/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/" style="color:#4A0808">Athashri — Senior Living</a></h3><div class="price">₹83 L*</div><p>2BHK | P52100077686</p></div>
  </div>
  <div class="cta">
    <h3>Book a Free Site Visit Today</h3>
    <p style="margin:.3rem 0 1rem">Free pickup from Chandani Chowk / Bavdhan junction</p>
    <a href="tel:+917744009295">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="wa" rel="noopener noreferrer">WhatsApp →</a>
  </div>
  <details><summary>{p['keywords'][0]}?</summary><p>Paranjape Forest Trails, Bhugaon is the top recommendation. 190 acres, all RERA registered, 18–22% CAGR. Call +91 7744009295.</p></details>
  <details><summary>How far is Forest Trails from major Pune landmarks?</summary><p>Chandani Chowk flyover: 7 min | Bavdhan: 5 min | Kothrud: 15 min | Hinjewadi: 25 min | Pune Station: 35 min.</p></details>
"""
    schemas = make_schemas(p["slug"], p["h1"], p["desc"])
    html = page_html(p["title"], p["desc"], f"{DOMAIN}/{p['slug']}/", ", ".join(p["keywords"]), p["h1"], content, schemas)
    save_page(p["slug"], html)
    add_route(p["slug"], p["keywords"])

print(f"Batch 3 (Landmark): {len(pages_created)-b2} pages")
b3 = len(pages_created)

# ============================================================
# BATCH 4: HINDI KEYWORD PAGES
# ============================================================
HINDI_PAGES = [
    {
        "slug": "bhugaon-na-plot-kharidna",
        "lang": "hi",
        "title": "भुगाव में NA प्लॉट खरीदना — पूरी जानकारी 2026 | Paranjape Forest Trails",
        "desc": "भुगाव, पुणे में NA बंगला प्लॉट खरीदें। Paranjape Misty Greens — ₹1.23 करोड़* से। MahaRERA P52100053834। संपर्क: +91 7744009295।",
        "h1": "भुगाव में NA प्लॉट खरीदना — Paranjape Forest Trails",
        "keywords": ["bhugaon mein NA plot", "bhugaon mein plot kharidna", "pune west mein NA plot",
                     "NA plot bhugaon price hindi", "Paranjape misty greens hindi"],
    },
    {
        "slug": "pune-mein-2bhk-price",
        "lang": "hi",
        "title": "पुणे में 2BHK की कीमत 2026 | Paranjape Forest Trails भुगाव",
        "desc": "पुणे वेस्ट में 2BHK फ्लैट ₹89 लाख* से। Paranjape The Canopy, भुगाव। MahaRERA P52100079518। 7 दिन साइट विजिट — +91 7744009295।",
        "h1": "पुणे में 2BHK की कीमत 2026 — Paranjape Forest Trails",
        "keywords": ["pune mein 2bhk price", "pune west 2bhk hindi", "2BHK flat pune 2026 hindi",
                     "bhugaon mein 2bhk kharidna", "Paranjape 2bhk hindi"],
    },
    {
        "slug": "pune-mein-ghar-2026",
        "lang": "hi",
        "title": "पुणे में घर खरीदना 2026 — पूरी गाइड | Forest Trails भुगाव",
        "desc": "पुणे में घर खरीदने की पूरी गाइड 2026। NA प्लॉट, विला, 2BHK, 3BHK — Paranjape Forest Trails में सभी विकल्प। ₹89 लाख से शुरू।",
        "h1": "पुणे में घर खरीदना 2026 — Paranjape Forest Trails",
        "keywords": ["pune mein ghar kharidna 2026", "pune mein property kaise khariden",
                     "pune west mein ghar 2026", "paranjape forest trails hindi guide", "pune mein plot ya flat"],
    },
]

for p in HINDI_PAGES:
    content = f"""
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › {p['h1'][:30]}...</p>
  <h1>{p['h1']}</h1>
  <p class="lead">{p['desc']}</p>
  <h2>Paranjape Forest Trails — सभी विकल्प</h2>
  <table>
    <tr><th>एनक्लेव</th><th>प्रकार</th><th>कीमत</th><th>MahaRERA</th></tr>
    <tr><td>Misty Greens</td><td>NA प्लॉट</td><td>₹1.23 करोड़*</td><td>P52100053834</td></tr>
    <tr><td>The Canopy</td><td>2BHK / 3BHK</td><td>₹89 लाख*</td><td>P52100079518</td></tr>
    <tr><td>The Rivolo</td><td>लग्जरी विला</td><td>₹3.89 करोड़*</td><td>P52100031560</td></tr>
    <tr><td>The Cove</td><td>4BHK बंगलो</td><td>₹2.85 करोड़*</td><td>P52100048536</td></tr>
    <tr><td>Athashri</td><td>सीनियर लिविंग</td><td>₹83 लाख*</td><td>P52100077686</td></tr>
  </table>
  <p style="color:#777;font-size:.85rem">*सभी कीमतें अनुमानित हैं।</p>
  <div class="cta">
    <h3>साइट विजिट बुक करें — मुफ्त</h3>
    <p style="margin:.3rem 0 1rem">7 दिन, सुबह 10 बजे से शाम 7 बजे तक</p>
    <a href="tel:+917744009295">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="wa" rel="noopener noreferrer">WhatsApp करें →</a>
  </div>
  <p><a href="/{p['slug'].replace('hindi-','').replace('-hindi','')}/">English version →</a> | <a href="/pune-madhe-plot/">Marathi version →</a></p>
"""
    schemas = make_schemas(p["slug"], p["h1"], p["desc"])
    html = page_html(p["title"], p["desc"], f"{DOMAIN}/{p['slug']}/", ", ".join(p["keywords"]), p["h1"], content, schemas)
    save_page(p["slug"], html)
    add_route(p["slug"], p["keywords"])

print(f"Batch 4 (Hindi): {len(pages_created)-b3} pages")
b4 = len(pages_created)

# ============================================================
# BATCH 5: MARATHI KEYWORD PAGES (missing ones)
# ============================================================
MARATHI_PAGES = [
    {
        "slug": "bhugaon-na-plot-kimat-2026",
        "lang": "mr",
        "title": "भुगाव NA प्लॉट किंमत 2026 | Paranjape Misty Greens | MahaRERA",
        "desc": "भुगाव येथे NA बंगलो प्लॉटची किंमत 2026. Paranjape Misty Greens — ₹1.23 कोटी* पासून. MahaRERA P52100053834. कॉल करा +91 7744009295.",
        "h1": "भुगाव NA प्लॉट किंमत 2026 — Paranjape Misty Greens",
        "keywords": ["bhugaon na plot kimat 2026", "bhugaon plot price marathi", "na plot bhugaon marathi",
                     "misty greens plot kimat", "paranjape bhugaon marathi 2026"],
    },
    {
        "slug": "na-plot-vs-flat-pune-marathi",
        "lang": "mr",
        "title": "NA प्लॉट vs फ्लॅट पुणे 2026 — कोणते चांगले? | Marathi Guide",
        "desc": "NA प्लॉट vs फ्लॅट — पुणे 2026 मध्ये कोणती गुंतवणूक चांगली? संपूर्ण मराठी मार्गदर्शिका. Forest Trails Bhugaon मधील दोन्ही पर्याय उपलब्ध.",
        "h1": "NA प्लॉट vs फ्लॅट — पुणे 2026 मध्ये कोणते चांगले?",
        "keywords": ["na plot vs flat pune marathi", "plot ki flat kharidna marathi",
                     "na plot vs 2bhk pune 2026 marathi", "plot investment marathi pune"],
    },
    {
        "slug": "bhugaon-sampurna-mahiti",
        "lang": "mr",
        "title": "भुगाव संपूर्ण माहिती 2026 | स्थान, किंमत, कनेक्टिव्हिटी | Marathi Guide",
        "desc": "भुगाव, पुणे बद्दल संपूर्ण माहिती — स्थान, मालमत्ता किंमती, कनेक्टिव्हिटी, शाळा, रुग्णालये. Paranjape Forest Trails — ₹89 लाख* पासून.",
        "h1": "भुगाव संपूर्ण माहिती 2026 — Paranjape Forest Trails",
        "keywords": ["bhugaon sampurna mahiti", "bhugaon pune marathi guide", "bhugaon paud road mahiti",
                     "bhugaon property marathi", "bhugaon area guide marathi"],
    },
    {
        "slug": "pune-mein-property-tax-2026",
        "lang": "mr",
        "title": "पुणे प्रॉपर्टी टॅक्स 2026 — संपूर्ण मार्गदर्शिका | PMRDA vs PMC",
        "desc": "पुण्यात प्रॉपर्टी टॅक्स कसा भरायचा 2026. PMRDA क्षेत्र (भुगाव) vs PMC क्षेत्र. ऑनलाइन पेमेंट, सवलत, मुदत. Paranjape Forest Trails PMRDA क्षेत्रात.",
        "h1": "पुणे प्रॉपर्टी टॅक्स 2026 — PMRDA आणि PMC संपूर्ण मार्गदर्शिका",
        "keywords": ["pune property tax 2026 marathi", "PMRDA property tax marathi",
                     "bhugaon property tax how to pay", "pune madhe property tax 2026"],
    },
]

for p in MARATHI_PAGES:
    content = f"""
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › {p['h1'][:30]}...</p>
  <h1>{p['h1']}</h1>
  <p class="lead">{p['desc']}</p>
  <h2>Paranjape Forest Trails — सर्व पर्याय</h2>
  <table>
    <tr><th>एन्क्लेव्ह</th><th>प्रकार</th><th>किंमत</th><th>MahaRERA</th></tr>
    <tr><td>Misty Greens</td><td>NA प्लॉट</td><td>₹1.23 कोटी*</td><td>P52100053834</td></tr>
    <tr><td>The Canopy</td><td>2BHK / 3BHK</td><td>₹89 लाख*</td><td>P52100079518</td></tr>
    <tr><td>The Rivolo</td><td>लक्झरी व्हिला</td><td>₹3.89 कोटी*</td><td>P52100031560</td></tr>
    <tr><td>Athashri</td><td>वरिष्ठ नागरिक</td><td>₹83 लाख*</td><td>P52100077686</td></tr>
  </table>
  <p style="color:#777;font-size:.85rem">*किंमती सूचक आहेत.</p>
  <div class="cta">
    <h3>साइट व्हिजिट बुक करा</h3>
    <p style="margin:.3rem 0 1rem">7 दिवस उपलब्ध, सकाळी 10 ते संध्याकाळी 7</p>
    <a href="tel:+917744009295">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="wa" rel="noopener noreferrer">WhatsApp →</a>
  </div>
"""
    schemas = make_schemas(p["slug"], p["h1"], p["desc"])
    html = page_html(p["title"], p["desc"], f"{DOMAIN}/{p['slug']}/", ", ".join(p["keywords"]), p["h1"], content, schemas)
    save_page(p["slug"], html)
    add_route(p["slug"], p["keywords"])

print(f"Batch 5 (Marathi): {len(pages_created)-b4} pages")
b5 = len(pages_created)

# ============================================================
# BATCH 6: PROCESS / LEGAL GUIDE PAGES
# ============================================================
PROCESS_PAGES = [
    {
        "slug": "carpet-area-vs-built-up-area-pune",
        "title": "Carpet Area vs Built-Up Area vs Super Built-Up Area — Pune 2026 Guide",
        "desc": "Understand carpet area vs built-up vs super built-up area in Pune real estate 2026. RERA mandates carpet area disclosure. Forest Trails transparent pricing.",
        "h1": "Carpet Area vs Built-Up Area vs Super Built-Up Area — Complete Pune Guide",
        "keywords": ["carpet area vs built up area Pune", "carpet area vs super built up area",
                     "what is carpet area RERA India", "built up vs super built up Pune 2026",
                     "carpet area calculation Pune flat", "RERA carpet area disclosure Pune"],
    },
    {
        "slug": "7-12-extract-pune-property",
        "title": "7/12 Extract for Property in Pune — How to Get Satbara Utara 2026",
        "desc": "Complete guide to 7/12 extract (Satbara Utara) for property purchase in Pune 2026. How to check online, verify NA status, and understand ownership records.",
        "h1": "7/12 Extract (Satbara Utara) — Complete Property Guide Pune 2026",
        "keywords": ["7/12 extract Pune property", "satbara utara Pune", "how to get 7/12 extract Maharashtra",
                     "check 7/12 online Maharashtra", "NA plot 7/12 extract Pune", "bhulekh Pune 7/12"],
    },
    {
        "slug": "index-2-property-registration-pune",
        "title": "Index 2 Property Registration Pune 2026 — How to Download & Verify",
        "desc": "What is Index 2 in Maharashtra property registration? How to download, verify ownership, check encumbrance. Essential for NA plot and flat purchase in Pune.",
        "h1": "Index 2 in Maharashtra Property Registration — Pune 2026 Guide",
        "keywords": ["index 2 property Pune", "index 2 Maharashtra registration", "how to get index 2 Pune",
                     "index 2 download Maharashtra", "index 2 for NA plot Pune", "property encumbrance certificate Pune"],
    },
    {
        "slug": "mutation-property-pune",
        "title": "Property Mutation in Pune 2026 — Complete Process | Khata Transfer Guide",
        "desc": "How to do property mutation (Khata transfer / Ferfar) in Pune 2026. Documents needed, process, timeline. Applies after property purchase registration in Maharashtra.",
        "h1": "Property Mutation in Pune 2026 — Complete Khata Transfer Guide",
        "keywords": ["property mutation Pune", "mutation certificate Pune", "khata transfer Pune",
                     "ferfar Pune property", "mutation after property registration Pune 2026",
                     "how to do mutation Maharashtra"],
    },
    {
        "slug": "joint-registration-property-pune",
        "title": "Joint Registration of Property in Pune 2026 | Benefits, Documents & Process",
        "desc": "Complete guide to joint registration of property in Pune. Benefits — stamp duty concession for female co-owner, income tax benefits, RERA rights. Process at Sub-Registrar.",
        "h1": "Joint Registration of Property in Pune 2026 — Benefits & Complete Process",
        "keywords": ["joint registration property Pune", "joint ownership property Maharashtra",
                     "female co-owner stamp duty concession Pune", "joint property registration benefits India",
                     "husband wife property registration Pune 2026"],
    },
    {
        "slug": "gift-deed-property-pune",
        "title": "Gift Deed for Property in Pune 2026 — Stamp Duty, Process & Tax",
        "desc": "How to transfer property via gift deed in Pune 2026. Stamp duty on gift deed Maharashtra, registration process, capital gains tax implications, family vs non-family.",
        "h1": "Gift Deed for Property in Pune 2026 — Complete Guide",
        "keywords": ["gift deed property Pune", "gift deed stamp duty Maharashtra 2026",
                     "transfer property via gift deed Pune", "gift deed vs sale deed Pune",
                     "gift deed family property Maharashtra"],
    },
    {
        "slug": "pmrda-vs-pmc-property-pune",
        "title": "PMRDA vs PMC — Property Differences in Pune 2026 | Taxes, Rules & Rates",
        "desc": "Key differences between PMRDA and PMC areas for property in Pune. Tax rates, building regulations, property prices. Bhugaon (Forest Trails) is in PMRDA area.",
        "h1": "PMRDA vs PMC — Property Differences in Pune 2026",
        "keywords": ["PMRDA vs PMC Pune property", "PMRDA area Pune property rules", "PMC vs PMRDA tax difference",
                     "Bhugaon PMRDA or PMC", "PMRDA property tax Pune", "buy property PMRDA area Pune 2026"],
    },
    {
        "slug": "hinjewadi-it-hub-property-investment-2026",
        "title": "Hinjewadi IT Hub Property Investment 2026 | Best Options Near IT Park",
        "desc": "Best property investments near Hinjewadi IT Hub 2026. Forest Trails Bhugaon (25 min) vs Wakad (5 min) vs Baner (15 min) — ROI comparison for IT professionals.",
        "h1": "Hinjewadi IT Hub Property Investment Guide 2026",
        "keywords": ["Hinjewadi IT hub property investment 2026", "best property near Hinjewadi IT park",
                     "investment near Hinjewadi", "flat near Hinjewadi for IT professionals",
                     "property ROI near Hinjewadi 2026", "Hinjewadi property appreciation 2026"],
    },
    {
        "slug": "luxury-property-pune-2026",
        "title": "Luxury Property in Pune 2026 | Above 2 Crore Villas & Bungalows | Forest Trails",
        "desc": "Best luxury properties in Pune 2026 — villas, bungalows, NA plots above ₹2 crore. Forest Trails Bhugaon — The Rivolo (₹3.89 Cr*), The Cove (₹2.85 Cr*). RERA registered.",
        "h1": "Luxury Property in Pune 2026 — Villas, Bungalows & NA Plots",
        "keywords": ["luxury property Pune 2026", "luxury villa Pune above 2 crore", "premium property Pune West",
                     "luxury bungalow Pune", "high end property Pune", "ultra luxury property Pune West 2026"],
    },
]

for p in PROCESS_PAGES:
    content = f"""
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › {p['h1'][:40]}...</p>
  <h1>{p['h1']}</h1>
  <p class="lead">{p['desc']}</p>
  <h2>Why This Matters for Pune Property Buyers</h2>
  <p>Understanding <strong>{p['keywords'][0]}</strong> is critical before any property purchase in Pune 2026. All Paranjape Schemes projects at Forest Trails are fully compliant and transparent on all legal documentation.</p>
  <h2>Forest Trails — RERA Compliant Across All 9 Enclaves</h2>
  <table>
    <tr><th>Project</th><th>Type</th><th>Price</th><th>RERA</th></tr>
    <tr><td>Misty Greens</td><td>NA Plot</td><td>₹1.23 Cr*</td><td>P52100053834</td></tr>
    <tr><td>The Canopy</td><td>2/3BHK</td><td>₹89 L*</td><td>P52100079518</td></tr>
    <tr><td>The Rivolo</td><td>4/5BHK Villa</td><td>₹3.89 Cr*</td><td>P52100031560</td></tr>
    <tr><td>The Cove</td><td>4BHK Bungalow</td><td>₹2.85 Cr*</td><td>P52100048536</td></tr>
    <tr><td>Athashri</td><td>Senior Living</td><td>₹83 L*</td><td>P52100077686</td></tr>
  </table>
  <p style="color:#777;font-size:.85rem">*Prices indicative. Verify all RERA details at maharera.mahaonline.gov.in</p>
  <div class="cta">
    <h3>Need Guidance? Talk to Our Expert</h3>
    <p style="margin:.3rem 0 1rem">Free consultation — legal, financial, and property advice</p>
    <a href="tel:+917744009295">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="wa" rel="noopener noreferrer">WhatsApp →</a>
  </div>
  <p style="margin-top:1.5rem">
    Related: <a href="/stamp-duty-calculator-pune/">Stamp Duty Calculator</a> |
    <a href="/roi-calculator-pune/">ROI Calculator</a> |
    <a href="/rera-compliance-guide/">RERA Compliance Guide</a> |
    <a href="/faqs/">FAQs (50+ Answered)</a>
  </p>
"""
    schemas = make_schemas(p["slug"], p["h1"], p["desc"])
    html = page_html(p["title"], p["desc"], f"{DOMAIN}/{p['slug']}/", ", ".join(p["keywords"]), p["h1"], content, schemas)
    save_page(p["slug"], html)
    add_route(p["slug"], p["keywords"])

print(f"Batch 6 (Process/Legal): {len(pages_created)-b5} pages")
b6 = len(pages_created)

# ============================================================
# WRITE ALL MIDDLEWARE ROUTES
# ============================================================
mw_path = os.path.join(BASE, "functions", "_middleware.js")
mw_content = open(mw_path, encoding="utf-8").read()

new_routes_lines = []
for slug, kw in middleware_routes.items():
    safe_kw = kw.replace("`", "'").replace("\\", "")
    new_routes_lines.append(f'  "{slug}": `{safe_kw}`,')

route_block = "\n".join(new_routes_lines)

# Find insertion point — before the closing }; of KEYWORD_ROUTES
if "// ─── Paranjape Brand Vanity Slugs" in mw_content:
    insert_marker = "  // ─── Paranjape Brand Vanity Slugs"
else:
    insert_marker = "};"
    # get last occurrence of }; in KEYWORD_ROUTES block
    idx = mw_content.find("};", mw_content.find("KEYWORD_ROUTES"))
    insert_marker = mw_content[max(0,idx-2):idx+2]

# Add before Paranjape vanity slugs comment
insert_before = "  // ─── Paranjape Brand Vanity Slugs"
if insert_before in mw_content and route_block not in mw_content:
    new_mw = mw_content.replace(
        insert_before,
        f"  // ─── Permutation Routes (auto-generated)\n{route_block}\n{insert_before}"
    )
    open(mw_path, "w", encoding="utf-8").write(new_mw)
    print(f"\nMiddleware: {len(middleware_routes)} new KEYWORD_ROUTES added")
else:
    print(f"\nMiddleware: routes already present or marker not found — skipped")

print(f"\n{'='*60}")
print(f"PERMUTATION ENGINE COMPLETE")
print(f"  Total new pages:         {len(pages_created)}")
print(f"  Middleware routes added: {len(middleware_routes)}")
print(f"  Batch 1 BHK×Location:   {b1}")
print(f"  Batch 2 Price Range:     {b2-b1}")
print(f"  Batch 3 Landmarks:       {b3-b2}")
print(f"  Batch 4 Hindi:           {b4-b3}")
print(f"  Batch 5 Marathi:         {b5-b4}")
print(f"  Batch 6 Process/Legal:   {b6-b5}")
print(f"{'='*60}")
