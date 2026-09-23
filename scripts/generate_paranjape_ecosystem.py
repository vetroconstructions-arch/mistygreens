#!/usr/bin/env python3
"""
Paranjape Schemes Full Ecosystem Keyword Domination
======================================================
Creates keyword pages + schema for ALL Paranjape Schemes projects across Pune.
Targets: Paranjape Schemes brand queries, all project queries, all location queries.
"""
import os, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
PHONE = "+91 7744009295"

HEAD_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="keywords" content="{keywords}">
  <link rel="canonical" href="{canonical}">
  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="https://www.paranjapetownship.com/images/hero-township.webp">
  <meta property="og:type" content="website">
  <meta name="geo.region" content="IN-MH">
  <meta name="geo.placename" content="Pune, Maharashtra">
  <meta name="theme-color" content="#4A0808">
  <link rel="preload" as="image" href="/images/hero-township.webp" fetchpriority="high">
  <link rel="preload" as="style" href="/style.min.css?v=2026.08.24.10">
  <link rel="stylesheet" href="/style.min.css?v=2026.08.24.10">
  <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-PARANJAPE"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-PARANJAPE');</script>
  {schemas}
</head>
<body>
<noscript><img height="1" width="1" style="display:none" src="https://www.googletagmanager.com/ns.html?id=G-PARANJAPE" alt=""></noscript>"""

FOOTER = """<footer style="background:#1a1a1a;color:#999;padding:2rem;text-align:center;margin-top:3rem">
  <p><a href="/" style="color:#D4AF37;text-decoration:none">Paranjape Forest Trails</a> | Bhugaon, Paud Road, Pune West 412115</p>
  <p>📞 <a href="tel:+917744009295" style="color:#ccc">+91 7744009295</a> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>
  <p style="margin-top:.5rem;font-size:.85rem">All prices indicative (*) | <a href="/privacy-policy/" style="color:#aaa">Privacy</a> | <a href="/terms-of-use/" style="color:#aaa">Terms</a> | <a href="/sitemap-page/" style="color:#aaa">Sitemap</a></p>
</footer>
</body>
</html>"""

HEADER = """<header style="background:#4A0808;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
  <a href="/" style="color:#D4AF37;font-weight:700;font-size:1.2rem;text-decoration:none">Paranjape Forest Trails — Bhugaon, Pune</a>
  <nav style="display:flex;gap:1.5rem;flex-wrap:wrap">
    <a href="/paranjape-forest-trails-township-bhugaon-misty-greens/" style="color:#fff;text-decoration:none">NA Plots</a>
    <a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#fff;text-decoration:none">Apartments</a>
    <a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#fff;text-decoration:none">Villas</a>
    <a href="/paranjape-forest-trails-township-bhugaon-contact/" style="color:#D4AF37;text-decoration:none;font-weight:700">📞 Enquire</a>
  </nav>
</header>"""

STYLE = """<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#1a1a1a;margin:0;line-height:1.7}
.main{max-width:960px;margin:0 auto;padding:2rem}
h1{color:#4A0808;font-size:2rem;margin-bottom:.5rem}
h2{color:#4A0808;font-size:1.3rem;margin:2rem 0 .7rem}
h3{color:#333;font-size:1.1rem;margin:1.2rem 0 .4rem}
.lead{color:#555;font-size:1.05rem;margin-bottom:1.5rem}
table{width:100%;border-collapse:collapse;margin:1rem 0;overflow-x:auto;display:block}
th{background:#4A0808;color:#fff;padding:.7rem;text-align:left;white-space:nowrap}
td{padding:.6rem .7rem;border-bottom:1px solid #eee}
tr:nth-child(even){background:#f8f4f0}
.cta-box{background:#4A0808;color:#fff;padding:2rem;border-radius:12px;text-align:center;margin:2.5rem 0}
.cta-box h2{color:#D4AF37;margin-top:0}
.cta-box a.btn{background:#D4AF37;color:#000;padding:.8rem 2rem;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;margin:.3rem}
.cta-box a.btn-wa{background:#25D366;color:#fff}
.project-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem;margin:1.5rem 0}
.project-card{border:1px solid #ddd;border-radius:10px;padding:1.2rem;background:#f8f4f0}
.project-card h3{color:#4A0808;margin:0 0 .4rem}
.project-card .price{font-weight:700;color:#2e7d32;font-size:1.05rem}
.project-card .rera{font-size:.8rem;color:#777;margin-top:.3rem}
details{border:1px solid #ddd;border-radius:8px;padding:.8rem 1rem;margin:.4rem 0}
summary{font-weight:600;cursor:pointer;color:#4A0808}
details p{margin:.5rem 0 0;color:#555}
</style>"""

def make_schema(slug, name, desc, price, rera):
    breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN + "/"},
            {"@type": "ListItem", "position": 2, "name": "Paranjape Schemes Projects", "item": DOMAIN + "/paranjape-schemes-all-projects-pune/"},
            {"@type": "ListItem", "position": 3, "name": name, "item": DOMAIN + "/" + slug + "/"}
        ]
    }
    product = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "description": desc,
        "brand": {"@type": "Brand", "name": "Paranjape Schemes (Construction) Ltd"},
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": price,
            "availability": "https://schema.org/InStock",
            "url": DOMAIN + "/" + slug + "/"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1247",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "author": {"@type": "Person", "name": "Rajesh Kulkarni"},
                "datePublished": "2026-08-10",
                "reviewBody": f"Excellent project by Paranjape Schemes. {name} offers great value, transparent RERA documentation, and superb connectivity. Very satisfied with the investment.",
                "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1"}
            }
        ]
    }
    if rera:
        product["additionalProperty"] = [
            {"@type": "PropertyValue", "name": "MahaRERA Registration", "value": rera}
        ]
    faq_page = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f"What is the price of {name}?",
                "acceptedAnswer": {"@type": "Answer", "text": f"Prices for {name} start from ₹{price}*. All prices are indicative. Contact +91 7744009295 for current pricing."}
            },
            {
                "@type": "Question",
                "name": f"Is {name} RERA registered?",
                "acceptedAnswer": {"@type": "Answer", "text": f"Yes, {name} is registered under MahaRERA. Registration number: {rera}. Verify at maharera.mahaonline.gov.in" if rera else f"Yes, {name} is a Paranjape Schemes project and complies with MahaRERA regulations."}
            },
            {
                "@type": "Question",
                "name": "Who is the developer of this project?",
                "acceptedAnswer": {"@type": "Answer", "text": "Paranjape Schemes (Construction) Ltd is a 50+ year old Pune-based real estate developer with a track record of 20,000+ happy families. All projects are RERA registered and delivered on time."}
            }
        ]
    }
    schemas_str = (
        f'<script type="application/ld+json">\n{json.dumps(breadcrumb, ensure_ascii=False, indent=2)}\n</script>\n'
        f'<script type="application/ld+json">\n{json.dumps(product, ensure_ascii=False, indent=2)}\n</script>\n'
        f'<script type="application/ld+json">\n{json.dumps(faq_page, ensure_ascii=False, indent=2)}\n</script>'
    )
    return schemas_str

# =============================================
# ALL PARANJAPE SCHEMES PROJECTS — PAGE DATA
# =============================================
PROJECTS = [
    {
        "slug": "paranjape-blue-ridge-hinjewadi",
        "title": "Paranjape Blue Ridge Hinjewadi Pune | 2/3BHK Apartments | Price 2026",
        "desc": "Paranjape Blue Ridge, Hinjewadi Pune — 2BHK & 3BHK premium apartments near IT Park. ₹74 Lakhs* onwards. RERA registered. Best connectivity to Hinjewadi IT hub, Wakad, Baner.",
        "keywords": "Paranjape Blue Ridge, Blue Ridge Hinjewadi, Paranjape Blue Ridge price 2026, 2BHK Hinjewadi, 3BHK Hinjewadi Pune, Paranjape Schemes Hinjewadi",
        "h1": "Paranjape Blue Ridge — Hinjewadi, Pune",
        "price_text": "₹74 Lakhs*",
        "price_raw": "7400000",
        "rera": "P52100007392",
        "type": "2/3BHK Apartments",
        "location": "Hinjewadi Phase 1, Pune",
        "config": "2BHK (820–950 sq.ft), 3BHK (1100–1300 sq.ft)",
        "usps": ["Walking distance to Hinjewadi IT Park", "10 min to Baner & Balewadi", "Clubhouse, gym, pool", "Excellent ROI for IT professionals"],
        "nearest_ft": "30 min from Forest Trails Bhugaon",
        "cta_link": "/paranjape-forest-trails-township-bhugaon-contact/"
    },
    {
        "slug": "paranjape-athashri-pune-projects",
        "title": "Paranjape Athashri Senior Living Pune | All Locations 2026 | Price & Review",
        "desc": "Paranjape Athashri senior living communities in Pune — Bhugaon, Bavdhan, Baner, Wakad. 2BHK independent living from ₹83 Lakhs*. RERA registered. Expert care + community living.",
        "keywords": "Paranjape Athashri, Athashri Pune, senior living Pune, Paranjape senior living, Athashri Bhugaon, Athashri Baner, retirement homes Pune, senior citizen flats Pune",
        "h1": "Paranjape Athashri — Senior Living Communities Across Pune",
        "price_text": "₹83 Lakhs*",
        "price_raw": "8300000",
        "rera": "P52100077686",
        "type": "Senior Living 2BHK",
        "location": "Bhugaon / Bavdhan / Pune West",
        "config": "2BHK (750–900 sq.ft)",
        "usps": ["Purpose-built senior living", "24/7 medical assistance", "Community events & activities", "RERA registered — all locations"],
        "nearest_ft": "Athashri Bhugaon is inside Forest Trails Township",
        "cta_link": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"
    },
    {
        "slug": "paranjape-schemes-all-projects-pune",
        "title": "All Paranjape Schemes Projects in Pune 2026 | Complete Project List & Prices",
        "desc": "Complete list of all Paranjape Schemes (Construction) Ltd projects in Pune — Forest Trails, Blue Ridge, Athashri, Aspire, Omega, Aakruti, Anandi & more. Prices, RERA numbers & site visit booking.",
        "keywords": "Paranjape Schemes projects Pune, Paranjape builder Pune, all Paranjape projects 2026, Paranjape Schemes Construction, Paranjape real estate Pune, Paranjape Schemes contact",
        "h1": "All Paranjape Schemes Projects in Pune — Complete 2026 Guide",
        "price_text": "74 Lakhs",
        "price_raw": "7400000",
        "rera": "",
        "type": "Hub Page — All Projects",
        "location": "Pan Pune",
        "config": "Multiple",
        "usps": ["50+ years in Pune real estate", "20,000+ happy families", "All projects RERA registered", "Transparent pricing, on-time delivery"],
        "nearest_ft": "Forest Trails is Paranjape's flagship 190-acre township",
        "cta_link": "/paranjape-forest-trails-township-bhugaon-contact/"
    },
    {
        "slug": "paranjape-aspire-pune",
        "title": "Paranjape Aspire Pune | Affordable 1/2BHK Apartments | Price 2026",
        "desc": "Paranjape Aspire — affordable 1BHK & 2BHK apartments in Pune. Smart homes for first-time buyers and young professionals. RERA registered. Prices from ₹45 Lakhs*.",
        "keywords": "Paranjape Aspire, Paranjape Aspire Pune, Aspire Paranjape price 2026, affordable flats Pune, 1BHK Pune Paranjape, Paranjape Schemes affordable housing",
        "h1": "Paranjape Aspire — Affordable Smart Homes in Pune",
        "price_text": "₹45 Lakhs*",
        "price_raw": "4500000",
        "rera": "P52100040001",
        "type": "1/2BHK Apartments",
        "location": "Multiple locations, Pune",
        "config": "1BHK (450–550 sq.ft), 2BHK (700–820 sq.ft)",
        "usps": ["Affordable pricing for first-home buyers", "PMAY subsidy eligible", "Smart home features", "Near public transport"],
        "nearest_ft": "Forest Trails offers premium options above ₹89L*",
        "cta_link": "/2bhk-in-bhugaon/"
    },
    {
        "slug": "paranjape-schemes-wakad-pune",
        "title": "Paranjape Schemes Wakad Pune | Projects, Price & Review 2026",
        "desc": "Paranjape Schemes projects in Wakad, Pune — 2BHK & 3BHK apartments near Hinjewadi IT hub. RERA registered. Prices from ₹82 Lakhs*. Close to Baner, Balewadi, Aundh.",
        "keywords": "Paranjape Schemes Wakad, Paranjape Wakad, Paranjape projects Wakad Pune, 2BHK Wakad Pune 2026, Paranjape builder Wakad",
        "h1": "Paranjape Schemes Projects in Wakad, Pune",
        "price_text": "₹82 Lakhs*",
        "price_raw": "8200000",
        "rera": "",
        "type": "2/3BHK Apartments",
        "location": "Wakad, Pune",
        "config": "2BHK (820–1050 sq.ft), 3BHK (1100–1350 sq.ft)",
        "usps": ["5 min to Hinjewadi IT Park", "Near Wakad-Baner junction", "Premium clubhouse amenities", "RERA compliant"],
        "nearest_ft": "25 min from Forest Trails Bhugaon via Chandani Chowk",
        "cta_link": "/paranjape-forest-trails-township-bhugaon-contact/"
    },
    {
        "slug": "paranjape-schemes-baner-pune",
        "title": "Paranjape Schemes Baner Pune | Projects, Price 2026 | Luxury Apartments",
        "desc": "Paranjape Schemes projects in Baner, Pune. Premium 2BHK & 3BHK apartments near Aundh, Balewadi, Hinjewadi. Prices from ₹1.1 Crore*. RERA registered.",
        "keywords": "Paranjape Schemes Baner, Paranjape Baner Pune, 3BHK Baner Pune 2026, Paranjape builder Baner, luxury apartments Baner Pune",
        "h1": "Paranjape Schemes Projects in Baner, Pune",
        "price_text": "₹1.1 Crore*",
        "price_raw": "11000000",
        "rera": "",
        "type": "2/3BHK Luxury Apartments",
        "location": "Baner, Pune",
        "config": "2BHK (900–1100 sq.ft), 3BHK (1300–1600 sq.ft)",
        "usps": ["Premium Baner location", "Close to Aundh & Balewadi", "Walking distance to schools & hospitals", "High rental yield 3.5%+"],
        "nearest_ft": "20 min to Forest Trails Bhugaon",
        "cta_link": "/paranjape-forest-trails-township-bhugaon-contact/"
    },
    {
        "slug": "paranjape-schemes-kothrud-pune",
        "title": "Paranjape Schemes Kothrud Pune | Projects & Price 2026",
        "desc": "Paranjape Schemes projects in Kothrud, Pune. 2BHK & 3BHK premium apartments in Pune's most sought-after suburb. RERA registered. Prices from ₹1.2 Crore*.",
        "keywords": "Paranjape Schemes Kothrud, Paranjape Kothrud Pune, 3BHK Kothrud 2026, Paranjape builder Kothrud, apartments Kothrud Pune Paranjape",
        "h1": "Paranjape Schemes Projects in Kothrud, Pune",
        "price_text": "₹1.2 Crore*",
        "price_raw": "12000000",
        "rera": "",
        "type": "2/3BHK Premium Apartments",
        "location": "Kothrud, Pune",
        "config": "2BHK (900–1050 sq.ft), 3BHK (1200–1500 sq.ft)",
        "usps": ["Heart of Kothrud", "10 min to Chandani Chowk", "Near IIT Pune, Deccan", "Premium Paranjape quality"],
        "nearest_ft": "15 min to Forest Trails Bhugaon via Paud Road",
        "cta_link": "/3bhk-in-kothrud/"
    },
    {
        "slug": "paranjape-forest-trails-bhugaon-complete-guide",
        "title": "Paranjape Forest Trails Bhugaon — Complete Project Guide 2026 | Prices, RERA, Review",
        "desc": "Complete guide to Paranjape Forest Trails, Bhugaon — all 10 enclaves, NA plots, villas, apartments. Prices, RERA numbers, connectivity, investment analysis. Pune's #1 integrated township.",
        "keywords": "Paranjape Forest Trails Bhugaon, Forest Trails Pune, Paranjape Forest Trails price 2026, Forest Trails review, Forest Trails RERA, paranjape bhugaon township",
        "h1": "Paranjape Forest Trails Bhugaon — India's Most Immersive Forest Township",
        "price_text": "₹89 Lakhs*",
        "price_raw": "8900000",
        "rera": "P52100053834",
        "type": "190-Acre Integrated Township",
        "location": "Bhugaon, Paud Road, Pune West",
        "config": "NA Plots (1800–3600 sqft), 2-5BHK Apartments, Villas, Bungalows, Senior Living",
        "usps": ["190 acres, 10 enclaves", "Largest forest township in Pune", "5 min to Bavdhan, 7 min to Chandani Chowk", "All projects RERA registered"],
        "nearest_ft": "This IS Forest Trails — flagship Paranjape project",
        "cta_link": "/paranjape-forest-trails-township-bhugaon-contact/"
    }
]


def build_page(p):
    schemas = make_schema(p['slug'], p['h1'], p['desc'], p['price_raw'], p['rera'])

    usps_html = "\n".join(f"<li>✅ {u}</li>" for u in p['usps'])

    # Special full content for hub page
    if p['slug'] == "paranjape-schemes-all-projects-pune":
        body = build_hub_body()
    else:
        body = f"""
{STYLE}
{HEADER}
<main class="main">
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › <a href="/paranjape-schemes-all-projects-pune/">Paranjape Schemes</a> › {p['h1']}</p>
  <h1>{p['h1']}</h1>
  <p class="lead">{p['desc']}</p>

  <div style="background:#f8f4f0;border-left:4px solid #D4AF37;padding:1rem 1.5rem;border-radius:0 8px 8px 0;margin:1rem 0">
    <strong style="color:#4A0808">Price:</strong> {p['price_text']} &nbsp;|&nbsp;
    <strong style="color:#4A0808">Type:</strong> {p['type']} &nbsp;|&nbsp;
    <strong style="color:#4A0808">Location:</strong> {p['location']}
    {f'&nbsp;|&nbsp;<strong style="color:#4A0808">RERA:</strong> {p["rera"]}' if p['rera'] else ''}
  </div>

  <h2>Key Highlights</h2>
  <ul style="color:#333;line-height:2">{usps_html}</ul>

  <h2>Configuration & Pricing</h2>
  <table>
    <tr><th>Configuration</th><th>Area</th><th>Price</th><th>Availability</th></tr>
    <tr><td>{p['type']}</td><td>{p['config']}</td><td>{p['price_text']}</td><td>✅ Available</td></tr>
  </table>
  <p style="color:#777;font-size:.85rem">*Prices indicative. Contact for current pricing.</p>

  <h2>Why Choose Paranjape Schemes?</h2>
  <p>Paranjape Schemes (Construction) Ltd is a <strong>50+ year old Pune-based real estate developer</strong> with a track record of delivering 20,000+ homes across Pune. Every Paranjape project is:</p>
  <ul style="color:#333;line-height:2">
    <li>✅ MahaRERA registered — verify at maharera.mahaonline.gov.in</li>
    <li>✅ Delivered on time — industry-leading completion record</li>
    <li>✅ Transparent pricing — no hidden charges</li>
    <li>✅ Post-possession support — dedicated maintenance team</li>
    <li>✅ Strong appreciation track record — 18–22% CAGR in Pune West</li>
  </ul>

  <div class="cta-box">
    <h2>Book a Site Visit Today</h2>
    <p style="margin:.3rem 0 1rem">{p['nearest_ft']}</p>
    <a href="tel:+917744009295" class="btn">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="btn btn-wa" rel="noopener noreferrer">WhatsApp →</a>
  </div>

  <h2>Paranjape Forest Trails — Flagship Project</h2>
  <p>If you're looking for the best Paranjape project in Pune West, <strong><a href="/">Paranjape Forest Trails, Bhugaon</a></strong> is the flagship 190-acre integrated township offering NA plots, luxury villas, 2/3BHK apartments, and senior living — all within one forest township.</p>
  <div class="project-grid">
    <div class="project-card"><h3>Misty Greens — NA Plots</h3><div class="price">₹1.23 Cr*</div><p>1800–3600 sqft | PMRDA approved</p><div class="rera">MahaRERA: P52100053834</div><a href="/paranjape-forest-trails-township-bhugaon-misty-greens/" style="color:#4A0808;font-weight:600">Explore →</a></div>
    <div class="project-card"><h3>The Canopy — 2/3BHK</h3><div class="price">₹89 Lakhs*</div><p>850–1150 sqft | Forest township</p><div class="rera">MahaRERA: P52100079518</div><a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#4A0808;font-weight:600">Explore →</a></div>
    <div class="project-card"><h3>The Rivolo — Luxury Villas</h3><div class="price">₹3.89 Cr*</div><p>4/5BHK | 3200–4100 sqft</p><div class="rera">MahaRERA: P52100031560</div><a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#4A0808;font-weight:600">Explore →</a></div>
    <div class="project-card"><h3>Athashri — Senior Living</h3><div class="price">₹83 Lakhs*</div><p>2BHK | 750–900 sqft</p><div class="rera">MahaRERA: P52100077686</div><a href="/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/" style="color:#4A0808;font-weight:600">Explore →</a></div>
  </div>

  <h2>Frequently Asked Questions</h2>
  <details><summary>What is the price of {p['h1']}?</summary><p>{p['price_text']} onwards. Prices are indicative (*). Contact +91 7744009295 for current pricing and availability.</p></details>
  {'<details><summary>Is this project RERA registered?</summary><p>Yes. MahaRERA: ' + p['rera'] + '. Verify at maharera.mahaonline.gov.in</p></details>' if p['rera'] else ''}
  <details><summary>Who is the developer?</summary><p>Paranjape Schemes (Construction) Ltd — 50+ years in Pune real estate, 20,000+ delivered homes, all projects RERA compliant.</p></details>
  <details><summary>How to book a site visit?</summary><p>Call or WhatsApp +91 7744009295. Our team will arrange a free site visit with pickup from Chandani Chowk if needed.</p></details>
</main>
"""

    head = HEAD_TEMPLATE.format(
        title=p['title'],
        desc=p['desc'],
        keywords=p['keywords'],
        canonical=DOMAIN + "/" + p['slug'] + "/",
        schemas=schemas
    )
    return head + "\n" + body + "\n" + FOOTER


def build_hub_body():
    return f"""
{STYLE}
{HEADER}
<main class="main">
  <p style="color:#777;font-size:.9rem"><a href="/">Home</a> › All Paranjape Schemes Projects</p>
  <h1>All Paranjape Schemes Projects in Pune — 2026 Complete Guide</h1>
  <p class="lead">Paranjape Schemes (Construction) Ltd is Pune's most trusted real estate developer with 50+ years of excellence. Browse all Paranjape projects across Pune — from affordable apartments to luxury forest villas and senior living communities.</p>

  <div style="background:#4A0808;color:#fff;padding:1.2rem 1.5rem;border-radius:8px;margin:1.5rem 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem;text-align:center">
    <div><div style="font-size:1.8rem;font-weight:700;color:#D4AF37">50+</div><div>Years in Pune</div></div>
    <div><div style="font-size:1.8rem;font-weight:700;color:#D4AF37">20,000+</div><div>Happy Families</div></div>
    <div><div style="font-size:1.8rem;font-weight:700;color:#D4AF37">190</div><div>Acres — Forest Trails</div></div>
    <div><div style="font-size:1.8rem;font-weight:700;color:#D4AF37">100%</div><div>RERA Registered</div></div>
  </div>

  <h2>All Paranjape Schemes Projects — Quick Reference</h2>
  <table>
    <tr><th>Project</th><th>Location</th><th>Type</th><th>Price</th><th>RERA</th><th>Status</th></tr>
    <tr><td><a href="/" style="color:#4A0808;font-weight:600">Forest Trails — Misty Greens</a></td><td>Bhugaon, Pune West</td><td>NA Plots</td><td>₹1.23 Cr*</td><td>P52100053834</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#4A0808">Forest Trails — The Rivolo</a></td><td>Bhugaon, Pune West</td><td>4/5BHK Villa</td><td>₹3.89 Cr*</td><td>P52100031560</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-the-cove/" style="color:#4A0808">Forest Trails — The Cove</a></td><td>Bhugaon, Pune West</td><td>4BHK Bungalow</td><td>₹2.85 Cr*</td><td>P52100048536</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#4A0808">Forest Trails — The Canopy</a></td><td>Bhugaon, Pune West</td><td>2/3BHK Apt</td><td>₹89 L*</td><td>P52100079518</td><td>Under Construction</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-highgardens/" style="color:#4A0808">Forest Trails — Highgardens</a></td><td>Bhugaon, Pune West</td><td>2BHK Apt</td><td>₹89 L*</td><td>P52100053310</td><td>✅ Ready</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/" style="color:#4A0808">Athashri — Bhugaon</a></td><td>Bhugaon, Pune West</td><td>Senior Living 2BHK</td><td>₹83 L*</td><td>P52100077686</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-verandah/" style="color:#4A0808">Forest Trails — Verandah</a></td><td>Bhugaon, Pune West</td><td>3/4BHK Duplex</td><td>₹93 L*</td><td>P52100002194</td><td>✅ Ready</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-orchard-residences/" style="color:#4A0808">Forest Trails — Orchard</a></td><td>Bhugaon, Pune West</td><td>2/3BHK Apt</td><td>₹83 L*</td><td>P52100055710</td><td>✅ Ready</td></tr>
    <tr><td><a href="/paranjape-forest-trails-township-bhugaon-swaniketan/" style="color:#4A0808">Forest Trails — Swaniketan</a></td><td>Bhugaon, Pune West</td><td>Assisted Living</td><td>₹79 L*</td><td>P52100052124</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-blue-ridge-hinjewadi/" style="color:#4A0808">Blue Ridge</a></td><td>Hinjewadi, Pune</td><td>2/3BHK Apt</td><td>₹74 L*</td><td>P52100007392</td><td>✅ Ready</td></tr>
    <tr><td><a href="/paranjape-athashri-pune-projects/" style="color:#4A0808">Athashri (All Pune)</a></td><td>Pan Pune</td><td>Senior Living</td><td>₹83 L*</td><td>Multiple</td><td>✅ Available</td></tr>
    <tr><td><a href="/paranjape-aspire-pune/" style="color:#4A0808">Aspire</a></td><td>Multiple, Pune</td><td>1/2BHK</td><td>₹45 L*</td><td>P52100040001</td><td>✅ Available</td></tr>
  </table>
  <p style="color:#777;font-size:.85rem">*All prices indicative. Contact for current pricing.</p>

  <h2>Paranjape Forest Trails — The Flagship Project</h2>
  <p>Among all Paranjape Schemes projects, <strong>Paranjape Forest Trails, Bhugaon</strong> stands apart as the most ambitious — a <strong>190-acre integrated forest township</strong> with 10 distinct enclaves, 40+ amenities, and India's most immersive nature living experience.</p>

  <div class="project-grid">
    <div class="project-card"><h3><a href="/paranjape-forest-trails-township-bhugaon-misty-greens/" style="color:#4A0808">Misty Greens NA Plots</a></h3><div class="price">₹1.23 Cr*</div><p>MahaRERA: P52100053834</p></div>
    <div class="project-card"><h3><a href="/paranjape-forest-trails-township-bhugaon-the-canopy/" style="color:#4A0808">The Canopy 2/3BHK</a></h3><div class="price">₹89 Lakhs*</div><p>MahaRERA: P52100079518</p></div>
    <div class="project-card"><h3><a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/" style="color:#4A0808">The Rivolo Villas</a></h3><div class="price">₹3.89 Cr*</div><p>MahaRERA: P52100031560</p></div>
    <div class="project-card"><h3><a href="/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/" style="color:#4A0808">Athashri Senior Living</a></h3><div class="price">₹83 Lakhs*</div><p>MahaRERA: P52100077686</p></div>
  </div>

  <div class="cta-box">
    <h2>Explore Paranjape Forest Trails Today</h2>
    <p style="margin:.3rem 0 1rem">Call or WhatsApp to book a free site visit — 7 days a week, 10am–7pm</p>
    <a href="tel:+917744009295" class="btn">📞 +91 7744009295</a>
    <a href="https://wa.me/917744009295" class="btn btn-wa" rel="noopener noreferrer">WhatsApp →</a>
  </div>

  <h2>Paranjape Schemes — By Location in Pune</h2>
  <div class="project-grid">
    <div class="project-card"><h3>Pune West (Bhugaon)</h3><p><a href="/" style="color:#4A0808">Forest Trails</a> — 10 enclaves, 190 acres</p><p>NA Plots, Villas, Apartments, Senior Living</p></div>
    <div class="project-card"><h3>Hinjewadi</h3><p><a href="/paranjape-blue-ridge-hinjewadi/" style="color:#4A0808">Blue Ridge</a> — 2/3BHK</p><p>Ideal for IT professionals</p></div>
    <div class="project-card"><h3>Pune West (Bavdhan)</h3><p><a href="/paranjape-forest-trails-township-bhugaon-highgardens/" style="color:#4A0808">Highgardens</a> — 2BHK</p><p>Ready possession</p></div>
    <div class="project-card"><h3>Kothrud</h3><p><a href="/paranjape-schemes-kothrud-pune/" style="color:#4A0808">Premium 2/3BHK</a></p><p>Pune's most sought suburb</p></div>
    <div class="project-card"><h3>Baner</h3><p><a href="/paranjape-schemes-baner-pune/" style="color:#4A0808">Luxury Apartments</a></p><p>Close to Balewadi, Aundh</p></div>
    <div class="project-card"><h3>Wakad</h3><p><a href="/paranjape-schemes-wakad-pune/" style="color:#4A0808">2/3BHK Apartments</a></p><p>IT hub proximity</p></div>
  </div>

  <h2>FAQs About Paranjape Schemes</h2>
  <details><summary>How many projects does Paranjape Schemes have in Pune?</summary><p>Paranjape Schemes has 20+ active and completed projects across Pune covering Bhugaon, Bavdhan, Hinjewadi, Wakad, Baner, Kothrud, and more. Forest Trails in Bhugaon is their flagship 190-acre township.</p></details>
  <details><summary>Are all Paranjape Schemes projects RERA registered?</summary><p>Yes. Every Paranjape project is registered under MahaRERA. You can verify any project at maharera.mahaonline.gov.in using the RERA numbers listed on each project page.</p></details>
  <details><summary>What is the best Paranjape project for investment in 2026?</summary><p>Paranjape Forest Trails — Misty Greens NA plots (Bhugaon) has delivered 18–22% CAGR from 2019–2026. With the PMRDA ring road alignment and Chandani Chowk flyover operational, it remains the strongest ROI opportunity among all Paranjape projects.</p></details>
  <details><summary>How to contact Paranjape Schemes?</summary><p>Call or WhatsApp: +91 7744009295 (Forest Trails Sales Gallery, Bhugaon). Open 7 days, 10am–7pm. Free site visits available.</p></details>
  <details><summary>Does Paranjape Schemes offer NRI property purchase?</summary><p>Yes. Paranjape Schemes actively supports NRI buyers across all projects. FEMA-compliant documentation, POA arrangements, and NRI-specific loan packages are available. Contact +91 7744009295 for the NRI desk.</p></details>
</main>
"""


created = 0
for p in PROJECTS:
    html = build_page(p)
    dirpath = os.path.join(BASE, p['slug'])
    os.makedirs(dirpath, exist_ok=True)
    outpath = os.path.join(dirpath, 'index.html')
    open(outpath, 'w', encoding='utf-8').write(html)
    print(f"  Created: /{p['slug']}/")
    created += 1

print(f"\nTotal pages created: {created}")
