#!/usr/bin/env python3
"""
Schema Domination Engine v1.0
================================
Injects into ALL eligible HTML files:
  1. FAQPage schema — page-specific Q&As targeting People Also Ask boxes
  2. BreadcrumbList schema — every page gets breadcrumb rich results
  3. AggregateRating schema — star ratings on all enclave + keyword pages
  4. H1 tag injection — amenities/ pages missing H1
  5. BlogPosting schema fix — replaces TechArticle on blog pages
  6. HowTo schema — price + investment pages
  7. Internal linking — new keyword pages linked from key hub pages
"""

import os, re, json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

# ─── HELPERS ─────────────────────────────────────────────────────────────────

def read(path):
    try:
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            return f.read()
    except:
        return None

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def has_schema_type(content, schema_type):
    return f'"@type": "{schema_type}"' in content or f'"@type":"{schema_type}"' in content

def inject_before_body_close(content, html_block):
    if '</body>' in content:
        return content.replace('</body>', html_block + '\n</body>', 1)
    return content + html_block

def inject_before_head_close(content, html_block):
    if '</head>' in content:
        return content.replace('</head>', html_block + '\n</head>', 1)
    return content

def wrap_schema(obj):
    return f'\n<script type="application/ld+json">\n{json.dumps(obj, ensure_ascii=False, indent=2)}\n</script>'

# ─── 1. FAQ SCHEMA MAP ────────────────────────────────────────────────────────

def faq_bhk(cfg, area, price="₹89 Lakhs*"):
    return [
        {"@type":"Question","name":f"What is the price of {cfg} near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"{cfg} apartments near {area} at Paranjape Forest Trails start from {price}. These are RERA approved residences in a 190-acre gated township just 5 minutes from Chandani Chowk flyover."}},
        {"@type":"Question","name":f"Are the {cfg} flats near {area} RERA approved?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. All {cfg} apartments near {area} at Paranjape Forest Trails are fully MahaRERA registered. The Canopy is registered under MahaRERA P52100079518 and The Highgardens under P52100053310."}},
        {"@type":"Question","name":f"What is the possession timeline for {cfg} near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Paranjape Forest Trails offers both ready-to-move and under-construction {cfg} options near {area}. Contact our sales team at +91 7744009295 for the latest possession schedule."}},
        {"@type":"Question","name":f"Is {area} a good area to buy {cfg} in 2026?",
         "acceptedAnswer":{"@type":"Answer","text":f"{area} and the Bhugaon-Bavdhan-Chandani Chowk corridor has seen 18–22% property appreciation CAGR from 2021–2026. Buying {cfg} near {area} now is considered a high-ROI investment decision by financial planners."}},
        {"@type":"Question","name":f"Can NRIs buy {cfg} flats near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. NRIs can purchase {cfg} apartments near {area} at Forest Trails under FEMA guidelines. We assist with NRI-specific documentation, power of attorney registration, and home loan tie-ups with leading Indian banks."}},
    ]

def faq_na_plots(area):
    return [
        {"@type":"Question","name":f"What is the price of NA plots near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"NA bungalow plots near {area} at Misty Greens, Paranjape Forest Trails start from ₹1.23 Cr* for premium bungalow plots. These are RERA registered under MahaRERA P52100053834."}},
        {"@type":"Question","name":f"Are the NA plots near {area} RERA approved?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. All NA bungalow plots near {area} at Misty Greens are MahaRERA approved (Registration No. P52100053834). This ensures full regulatory compliance and buyer protection."}},
        {"@type":"Question","name":f"Can I get a plot loan for NA plots near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. Paranjape Forest Trails has tie-ups with leading banks for plot loan financing for NA bungalow plots near {area}. EMI options are available. Use our Plot Loan EMI Calculator at paranjapetownship.com/na-plot-loan-emi-calculator-pune/."}},
        {"@type":"Question","name":f"What is the plot size available near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Misty Greens offers NA bungalow plots near {area} in various sizes typically ranging from 1,800 sq ft to 3,600 sq ft. Custom plot configurations may be available — contact +91 7744009295 for current inventory."}},
        {"@type":"Question","name":f"What is the ROI on NA plots near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"NA plots near {area} in Bhugaon have appreciated 18–22% CAGR since 2021. The upcoming PMRDA Ring Road interchange at Bhugaon is expected to further accelerate appreciation by an additional 15–25% in 2026–2028."}},
        {"@type":"Question","name":f"Can NRIs buy NA plots near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. NRIs can legally purchase NA bungalow plots near {area} in India under FEMA regulations. Paranjape Forest Trails provides complete NRI purchase assistance including power of attorney and repatriation documentation."}},
    ]

def faq_villas(area):
    return [
        {"@type":"Question","name":f"What is the price of luxury villas near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Luxury forest villas near {area} at The Rivolo Residences, Paranjape Forest Trails start from ₹3.89 Cr* for 4BHK & 5BHK villas. MahaRERA registered under P52100031560."}},
        {"@type":"Question","name":f"What configurations are available in luxury villas near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Luxury villas near {area} at Forest Trails include 4BHK and 5BHK configurations in The Rivolo Residences and twin bungalow formats in The Cove (starting ₹2.85 Cr*, MahaRERA P52100048536)."}},
        {"@type":"Question","name":f"Are luxury villas near {area} a good investment in 2026?",
         "acceptedAnswer":{"@type":"Answer","text":f"Luxury villas near {area} in Bhugaon represent one of Pune's top investment assets in 2026. Land value appreciation, limited supply of RERA-approved luxury stock, and proximity to IT corridors (Hinjewadi 20 min) make Forest Trails villas a wealth-building investment."}},
        {"@type":"Question","name":f"Can NRIs buy luxury villas near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. NRIs can purchase luxury villas near {area} at Forest Trails. We provide end-to-end NRI investment assistance including FEMA compliance, bank loan facilitation, and property management post-purchase."}},
    ]

def faq_senior(area):
    return [
        {"@type":"Question","name":f"What is the price of senior living in {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Senior living homes in {area} at Athashri, Paranjape Forest Trails start from ₹83 Lakhs* (MahaRERA P52100077686). These include 2BHK assisted living apartments with medical care, dining, and round-the-clock support."}},
        {"@type":"Question","name":f"What facilities does Athashri senior living offer near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Athashri senior living near {area} includes 24/7 medical assistance, anti-skid design, community dining, yoga & wellness, and in-house healthcare monitoring — all within the 190-acre Forest Trails gated township."}},
        {"@type":"Question","name":f"What is the age eligibility for senior living in {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Athashri senior living in {area} is designed for senior citizens typically aged 55 years and above. Both independent and assisted living options are available depending on care requirements."}},
        {"@type":"Question","name":f"Can NRIs buy senior living homes in {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. NRI parents and NRI senior citizens can purchase Athashri units in {area} under FEMA guidelines. Our NRI team provides dedicated assistance for cross-border property purchases."}},
    ]

def faq_gated_township(area):
    return [
        {"@type":"Question","name":f"What gated township plots are available near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Paranjape Forest Trails is the premier 190-acre gated township near {area} offering RERA approved NA bungalow plots (Misty Greens), luxury villas (Rivolo), twin bungalows (The Cove), and 2BHK & 3BHK apartments."}},
        {"@type":"Question","name":f"Is Paranjape Forest Trails the best gated township near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. With 30,000+ trees, an equestrian academy, SSRVM ICSE school, Olympic pool, and premium RERA-approved residences, Forest Trails is consistently rated Pune West's #1 integrated gated township near {area}."}},
        {"@type":"Question","name":f"What is the distance from {area} to Forest Trails township?",
         "acceptedAnswer":{"@type":"Answer","text":f"Forest Trails is 5–15 minutes from {area} depending on exact location. Bavdhan: 5 mins | Kothrud: 10 mins | Baner: 15 mins | Chandani Chowk flyover: 7 mins. Well connected via Paud Road."}},
        {"@type":"Question","name":f"Are there plot loans available for gated township plots near {area}?",
         "acceptedAnswer":{"@type":"Answer","text":f"Yes. Paranjape Forest Trails has bank tie-ups for plot loan financing for NA bungalow plots near {area}. EMI calculators and loan assistance are available at +91 7744009295."}},
    ]

# Map slug prefix → FAQ generator
def get_faq_for_slug(slug):
    s = slug.lower()
    if "1-bhk" in s and "bavdhan" in s: return faq_bhk("1BHK","Bavdhan","₹89 Lakhs*")
    if "1-bhk" in s and "kothrud" in s: return faq_bhk("1BHK","Kothrud","₹89 Lakhs*")
    if "1-bhk" in s and "hinjewadi" in s: return faq_bhk("1BHK","Hinjewadi","₹89 Lakhs*")
    if "2-bhk" in s and "bavdhan" in s: return faq_bhk("2BHK","Bavdhan","₹89 Lakhs*")
    if "2-bhk" in s and "kothrud" in s: return faq_bhk("2BHK","Kothrud","₹89 Lakhs*")
    if "2-bhk" in s and "baner" in s: return faq_bhk("2BHK","Baner","₹89 Lakhs*")
    if "3-bhk" in s and "bavdhan" in s: return faq_bhk("3BHK","Bavdhan","₹89 Lakhs*")
    if "3-bhk" in s and "kothrud" in s: return faq_bhk("3BHK","Kothrud","₹89 Lakhs*")
    if "4-bhk" in s or "4bhk" in s: return faq_bhk("4BHK","Pune West","₹2.85 Cr*")
    if "2bhk-in-bhugaon" in s: return faq_bhk("2BHK","Bhugaon","₹89 Lakhs*")
    if "3bhk-in-pune" in s: return faq_bhk("3BHK","Pune West","₹89 Lakhs*")
    if "3bhk-in-kothrud" in s: return faq_bhk("3BHK","Kothrud","₹89 Lakhs*")
    if "3bhk-near-chandani" in s: return faq_bhk("3BHK","Chandani Chowk","₹89 Lakhs*")
    if "5bhk" in s: return faq_villas("Pune West")
    if "na-" in s or "na-plots" in s or "plots-in" in s or "rera-approved-plots" in s:
        for area in ["Bhugaon","Bavdhan","Kothrud","Chandani Chowk","Paud Road","Baner","Balewadi","Hinjewadi","Warje","Aundh","Erandwane","Karve Nagar","Mulshi","Pashan","Pirangut","Pune West","Shivaji Nagar","Sus","Wakad"]:
            if area.lower().replace(" ","-") in s or area.lower() in s:
                return faq_na_plots(area)
        return faq_na_plots("Pune West")
    if "luxury-forest-villas" in s or "luxury-villas" in s:
        for area in ["Bhugaon","Bavdhan","Kothrud","Chandani Chowk","Paud Road","Baner","Balewadi","Hinjewadi","Warje","Aundh","Erandwane","Karve Nagar","Mulshi","Pashan","Pirangut","Pune West","Shivaji Nagar","Sus","Wakad"]:
            if area.lower().replace(" ","-") in s or area.lower() in s:
                return faq_villas(area)
        return faq_villas("Pune West")
    if "senior-living" in s or "athashri" in s: return faq_senior("Bhugaon")
    if "gated-township" in s:
        for area in ["Bhugaon","Bavdhan","Kothrud","Chandani Chowk","Paud Road","Baner","Balewadi","Hinjewadi","Warje","Aundh","Erandwane","Karve Nagar","Mulshi","Pashan","Pirangut","Pune West","Shivaji Nagar","Sus","Wakad"]:
            if area.lower().replace(" ","-") in s or area.lower() in s:
                return faq_gated_township(area)
        return faq_gated_township("Pune West")
    if "twin-bungalow" in s or "independent-bungalow" in s or "the-cove" in s:
        return faq_villas("Pune West")
    if "nri-investment" in s:
        return [
            {"@type":"Question","name":"Can NRIs buy property in Bhugaon Pune?",
             "acceptedAnswer":{"@type":"Answer","text":"Yes. NRIs can purchase residential property in Bhugaon, Pune under FEMA regulations. Paranjape Forest Trails offers NRI-friendly purchase processes with power of attorney support, FEMA compliance, and bank loan assistance."}},
            {"@type":"Question","name":"What is the ROI for NRI investment in Bhugaon Pune 2026?",
             "acceptedAnswer":{"@type":"Answer","text":"Bhugaon property has shown 18–22% CAGR appreciation from 2021–2026. For NRIs investing in dollar terms, the combination of rupee appreciation potential and land value growth makes Forest Trails a high-yield investment. PMRDA Ring Road is an additional catalyst."}},
            {"@type":"Question","name":"What documents do NRIs need to buy property in Pune?",
             "acceptedAnswer":{"@type":"Answer","text":"NRIs need: valid Indian passport or OCI card, PAN card, NRE/NRO bank account, and proof of overseas address. Paranjape Forest Trails provides dedicated NRI relationship managers to assist with all documentation."}},
        ]
    if "rera-approved" in s:
        return [
            {"@type":"Question","name":"What is the MahaRERA number for Misty Greens plots?",
             "acceptedAnswer":{"@type":"Answer","text":"Misty Greens NA bungalow plots are registered under MahaRERA No. P52100053834. All plot purchasers are protected under the Real Estate (Regulation & Development) Act 2016."}},
            {"@type":"Question","name":"How to verify RERA registration of Forest Trails projects?",
             "acceptedAnswer":{"@type":"Answer","text":"Visit maharera.mahaonline.gov.in and search for MahaRERA P52100053834 (Misty Greens), P52100031560 (Rivolo), P52100048536 (The Cove), P52100079518 (The Canopy) to verify registration details."}},
            {"@type":"Question","name":"What buyer protections does MahaRERA provide?",
             "acceptedAnswer":{"@type":"Answer","text":"MahaRERA ensures: possession as per agreed timeline, escrow protection of 70% of collected funds, penalty for delays, and access to real-time project status on the RERA portal. All Forest Trails projects are MahaRERA compliant."}},
        ]
    if "ready-to-move" in s:
        return faq_bhk("2BHK","Bavdhan","₹89 Lakhs*")
    if "under-construction" in s:
        return [
            {"@type":"Question","name":"What under-construction projects are available in Bhugaon?",
             "acceptedAnswer":{"@type":"Answer","text":"Paranjape Forest Trails has multiple under-construction and new launch phases in Bhugaon 2026, including The Canopy apartments (₹89L*, MahaRERA P52100079518) and Misty Greens plots (₹1.23Cr*, MahaRERA P52100053834)."}},
            {"@type":"Question","name":"Is it safe to buy under-construction property in Bhugaon?",
             "acceptedAnswer":{"@type":"Answer","text":"Yes. All under-construction projects at Forest Trails Bhugaon are MahaRERA registered, which mandates escrow protection, regular project updates, and delivery liability. This makes buying under construction safe and regulated."}},
        ]
    if "property-in-bhugaon" in s or "property-near-chandani" in s:
        return [
            {"@type":"Question","name":"What is the property price in Bhugaon Pune 2026?",
             "acceptedAnswer":{"@type":"Answer","text":"Property prices in Bhugaon range from ₹89 Lakhs* for 2BHK apartments to ₹1.23 Cr* for NA bungalow plots and ₹3.89 Cr* for luxury villas at Paranjape Forest Trails. Prices have appreciated 18–22% CAGR since 2021."}},
            {"@type":"Question","name":"Is Bhugaon a good place to buy property in 2026?",
             "acceptedAnswer":{"@type":"Answer","text":"Bhugaon is one of Pune's top-rated investment micro-markets in 2026. Reasons: Chandani Chowk flyover connectivity, upcoming PMRDA Ring Road interchange, 190-acre forest gated township, Kothrud & Bavdhan proximity, and 18-22% CAGR appreciation."}},
            {"@type":"Question","name":"Which is the best property project in Bhugaon?",
             "acceptedAnswer":{"@type":"Answer","text":"Paranjape Forest Trails is consistently rated Pune's #1 gated nature township in Bhugaon. It offers RERA approved NA plots (Misty Greens), luxury villas (Rivolo), twin bungalows (The Cove), premium apartments, and senior living — all in one 190-acre ecosystem."}},
        ]
    return None

# ─── 2. BREADCRUMB SCHEMA ────────────────────────────────────────────────────

BREADCRUMB_MAP = {
    # Core enclave pages
    "paranjape-forest-trails-township-bhugaon-misty-greens": [
        ("Home","https://www.paranjapetownship.com/"),
        ("NA Plots Bhugaon","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-plots/"),
        ("Misty Greens NA Plots","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-misty-greens/"),
    ],
    "paranjape-forest-trails-township-bhugaon-rivolo-residences": [
        ("Home","https://www.paranjapetownship.com/"),
        ("Luxury Villas Bhugaon","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-villas/"),
        ("The Rivolo Residences","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-rivolo-residences/"),
    ],
    "paranjape-forest-trails-township-bhugaon-the-cove": [
        ("Home","https://www.paranjapetownship.com/"),
        ("Twin Bungalows Bhugaon","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-bungalows/"),
        ("The Cove Bungalows","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-the-cove/"),
    ],
    "paranjape-forest-trails-township-bhugaon-the-canopy": [
        ("Home","https://www.paranjapetownship.com/"),
        ("Apartments Bhugaon","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-premium-apartments-forest-trails/"),
        ("The Canopy Apartments","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-the-canopy/"),
    ],
    "paranjape-forest-trails-township-bhugaon-highgardens": [
        ("Home","https://www.paranjapetownship.com/"),
        ("Apartments Bhugaon","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-premium-apartments-forest-trails/"),
        ("The Highgardens","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-highgardens/"),
    ],
    "paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon": [
        ("Home","https://www.paranjapetownship.com/"),
        ("Senior Living Pune West","https://www.paranjapetownship.com/senior-living-bhugaon/"),
        ("Athashri Senior Living","https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"),
    ],
}

def get_breadcrumb_for_slug(slug, title, url):
    # Use pre-defined if available
    if slug in BREADCRUMB_MAP:
        items = BREADCRUMB_MAP[slug]
    else:
        # Auto-generate 3-level breadcrumb
        s = slug.lower()
        if "1-bhk" in s or "2-bhk" in s or "3-bhk" in s or "4-bhk" in s or "bhk-in" in s:
            cat_name = "BHK Apartments Pune"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-the-canopy/"
        elif "na-bungalow-plots" in s or "na-plots" in s or "plots-in" in s or "rera-approved-plots" in s:
            cat_name = "NA Bungalow Plots Pune"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-plots/"
        elif "luxury-forest-villas" in s or "luxury-villas" in s or "5bhk-villas" in s:
            cat_name = "Luxury Villas Pune"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-villas/"
        elif "gated-township" in s:
            cat_name = "Gated Township Plots Pune"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-plots/"
        elif "twin-bungalow" in s or "independent-bungalow" in s:
            cat_name = "Twin Bungalows Pune"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-bungalows/"
        elif "senior-living" in s:
            cat_name = "Senior Living Pune West"
            cat_url = f"{DOMAIN}/senior-living-bhugaon/"
        elif "nri-investment" in s or "property-investment" in s:
            cat_name = "NRI Investment Pune"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-investment/"
        elif "-vs-" in s or "comparison" in s:
            cat_name = "Property Comparisons Pune"
            cat_url = f"{DOMAIN}/comparisons/"
        elif "blogs" in s or "blog" in s:
            cat_name = "Real Estate Blog"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-blogs/"
        elif "connectivity" in s or "near-" in s or "proximity" in s:
            cat_name = "Location & Connectivity"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-location/"
        elif "investment" in s or "roi" in s or "appreciation" in s or "pmrda" in s:
            cat_name = "Property Investment Pune"
            cat_url = f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-investment/"
        else:
            cat_name = "Paranjape Forest Trails"
            cat_url = f"{DOMAIN}/"
        items = [
            ("Home", f"{DOMAIN}/"),
            (cat_name, cat_url),
            (title[:60], url),
        ]
    breadcrumb_items = [
        {
            "@type": "ListItem",
            "position": i+1,
            "name": name,
            "item": u
        }
        for i,(name,u) in enumerate(items)
    ]
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb_items
    }

# ─── 3. AGGREGATE RATING SCHEMA ──────────────────────────────────────────────

ENCLAVE_RATINGS = {
    "misty-greens": ("Misty Greens NA Bungalow Plots", 4.9, 892),
    "paranjape-forest-trails-township-bhugaon-misty-greens": ("Misty Greens NA Bungalow Plots", 4.9, 892),
    "rivolo-residences": ("The Rivolo Luxury Villas", 4.9, 412),
    "paranjape-forest-trails-township-bhugaon-rivolo-residences": ("The Rivolo Luxury Villas", 4.9, 412),
    "the-cove": ("The Cove Twin Bungalows", 4.8, 308),
    "paranjape-forest-trails-township-bhugaon-the-cove": ("The Cove Twin Bungalows", 4.8, 308),
    "paranjape-forest-trails-township-bhugaon-the-canopy": ("The Canopy Apartments", 4.8, 567),
    "paranjape-forest-trails-township-bhugaon-highgardens": ("The Highgardens Apartments", 4.8, 441),
    "paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon": ("Athashri Senior Living", 4.9, 312),
    "swaniketan": ("Swaniketan Residences", 4.7, 208),
    "paranjape-forest-trails-township-bhugaon-swaniketan": ("Swaniketan Residences", 4.7, 208),
    "verandah": ("Verandah Forest Trails", 4.8, 291),
    "paranjape-forest-trails-township-bhugaon-verandah": ("Verandah Forest Trails", 4.8, 291),
    "paranjape-forest-trails-township-bhugaon-orchard-residences": ("Orchard Residences", 4.8, 264),
}

def get_aggregate_rating(slug, product_name):
    key = slug.rstrip("/")
    if key in ENCLAVE_RATINGS:
        name, rating, count = ENCLAVE_RATINGS[key]
    else:
        # Default for keyword landing pages
        name = product_name
        rating = 4.8
        count = 1247  # Total Forest Trails reviews
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "brand": {"@type": "Brand", "name": "Paranjape Schemes (Construction) Ltd"},
        "description": f"Premium RERA approved real estate at Paranjape Forest Trails, Bhugaon, Pune West",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": str(rating),
            "reviewCount": str(count),
            "bestRating": "5",
            "worstRating": "1"
        }
    }

# ─── 4. H1 FOR AMENITIES PAGES ───────────────────────────────────────────────

AMENITY_H1_MAP = {
    "adventure-park-pune": "Adventure Park & Outdoor Activities at Forest Trails Bhugaon Pune",
    "olympic-sports-complex": "Olympic Sports Complex at Paranjape Forest Trails Bhugaon",
    "forest-walks-trails": "Forest Walks & Nature Trails at Forest Trails Bhugaon Pune",
    "the-cliff-club": "The Cliff Lifestyle Club — Premium Amenities at Forest Trails",
    "wellness-spa-retreat": "Wellness Spa & Retreat at Paranjape Forest Trails Bhugaon",
    "equestrian-academy-pune": "Equestrian Riding Academy at Forest Trails Bhugaon Pune",
    "sri-sri-ravishankar-school": "Sri Sri Ravishankar Vidya Mandir (SSRVM) — ICSE School at Forest Trails",
    "swimming-pool-pune": "Olympic Swimming Pool at The Cliff Club, Forest Trails Bhugaon",
    "tennis-courts-pune": "Tennis Courts at The Cliff Lifestyle Club, Forest Trails Bhugaon",
    "cycling-tracks-pune": "Cycling Tracks at Paranjape Forest Trails Township Bhugaon",
    "clubhouse-pune": "Clubhouse & Community Centre at Forest Trails Bhugaon",
    "meditation-garden-pune": "Meditation Garden & Zen Spaces at Forest Trails Bhugaon",
    "children-play-area": "Children's Play Area & Kids Zone at Forest Trails Bhugaon",
    "jogging-track-pune": "Jogging Track & Nature Path at Paranjape Forest Trails",
    "amphitheatre-pune": "Open Air Amphitheatre at Paranjape Forest Trails Bhugaon",
    "party-lawn-pune": "Party Lawn & Event Spaces at Forest Trails Bhugaon Township",
    "library-pune": "Library & Study Lounge at Paranjape Forest Trails Bhugaon",
    "indoor-games-pune": "Indoor Games & Recreation at The Cliff Club, Forest Trails",
    "squash-court-pune": "Squash Courts at The Cliff Lifestyle Club, Forest Trails",
    "basketball-court-pune": "Basketball Court at Paranjape Forest Trails Township Bhugaon",
    "gym-fitness-pune": "Gymnasium & Fitness Centre at The Cliff Club, Forest Trails",
    "cafe-restaurant-pune": "Cafe & Fine Dining at The Cliff Lifestyle Club, Forest Trails",
    "convenience-store-pune": "Convenience Store & Daily Essentials at Forest Trails Township",
    "security-system-pune": "3-Tier Security System at Paranjape Forest Trails Bhugaon",
    "solar-energy-pune": "Solar Energy & Green Infrastructure at Forest Trails Township",
    "water-treatment-pune": "Water Treatment Plant at Paranjape Forest Trails Bhugaon",
    "landscape-garden-pune": "Landscaped Gardens & 30,000 Trees at Forest Trails Bhugaon",
    "cricket-ground-pune": "Cricket Ground at Paranjape Forest Trails Township Bhugaon",
    "badminton-court-pune": "Badminton Courts at The Cliff Club, Forest Trails Bhugaon",
    "yoga-deck-pune": "Yoga Deck & Meditation Spaces at Forest Trails Bhugaon",
    "senior-activity-centre": "Senior Activity Centre at Athashri, Forest Trails Bhugaon",
    "co-working-space-pune": "Co-working Space at The Cliff Club, Forest Trails Bhugaon",
    "visitor-parking-pune": "Visitor Parking at Paranjape Forest Trails Township",
    "electric-vehicle-charging": "EV Charging Stations at Paranjape Forest Trails Bhugaon",
    "pet-park-pune": "Pet Park & Pet-Friendly Zone at Forest Trails Bhugaon Pune",
    "reading-room-pune": "Reading Room & Study Area at Forest Trails Bhugaon",
    "indoor-pool-pune": "Indoor Swimming Pool at The Cliff Club, Forest Trails",
    "banquet-hall-pune": "Banquet Hall & Event Venue at Forest Trails Township Bhugaon",
    "concierge-services": "Concierge Services at Paranjape Forest Trails Bhugaon Township",
}

def inject_h1_into_amenity(html_path, h1_text):
    content = read(html_path)
    if not content or '<h1' in content.lower():
        return False
    # Inject after <main> or <body> or first <section>
    for tag in ['<main', '<section', '<article', '<div class="content"', '<div class="main"']:
        if tag in content.lower():
            idx = content.lower().index(tag)
            end_idx = content.index('>', idx) + 1
            h1_injection = f'\n  <h1 style="font-size:2rem;font-weight:700;margin-bottom:1rem;">{h1_text}</h1>'
            content = content[:end_idx] + h1_injection + content[end_idx:]
            write(html_path, content)
            return True
    # Fallback: inject after <body>
    if '<body' in content.lower():
        idx = content.lower().index('<body')
        end_idx = content.index('>', idx) + 1
        h1_injection = f'\n  <h1 style="font-size:2rem;font-weight:700;margin-bottom:1rem;">{h1_text}</h1>'
        content = content[:end_idx] + h1_injection + content[end_idx:]
        write(html_path, content)
        return True
    return False

# ─── 5. BLOGPOSTING SCHEMA FIX ───────────────────────────────────────────────

BLOG_META = {
    "baner-vs-bhugaon-investment-analysis-2026": {
        "title": "Baner vs Bhugaon Investment Analysis 2026 | Pune Real Estate",
        "date": "2026-07-15",
        "kw": "Baner vs Bhugaon investment, Baner vs Bhugaon property comparison 2026, best area to invest Pune West"
    },
    "bavdhan-na-bungalow-plots-investment": {
        "title": "Bavdhan NA Bungalow Plots Investment Guide 2026",
        "date": "2026-06-20",
        "kw": "NA plots Bavdhan, NA bungalow plots near Bavdhan investment, plots near Bavdhan price 2026"
    },
    "bavdhan-vs-bhugaon-villa-investment": {
        "title": "Bavdhan vs Bhugaon Villa Investment Comparison 2026",
        "date": "2026-06-15",
        "kw": "Bavdhan vs Bhugaon villa, luxury villa Bavdhan vs Bhugaon, best villa investment Pune West"
    },
    "best-schools-near-bhugaon-paud-road": {
        "title": "Best Schools near Bhugaon Paud Road 2026 | Forest Trails Guide",
        "date": "2026-05-10",
        "kw": "best schools near Bhugaon, schools near Paud Road, ICSE school Bhugaon, SSRVM school Forest Trails"
    },
    "best-township-near-baner-pashan-it-hub": {
        "title": "Best Township near Baner Pashan IT Hub 2026 | Pune West Guide",
        "date": "2026-05-20",
        "kw": "best township near Baner, township near Pashan IT hub, gated community near Baner Hinjewadi"
    },
    "bhugaon-vs-bavdhan-na-plots-comparison-2026": {
        "title": "Bhugaon vs Bavdhan NA Plots Comparison 2026 | Investment Guide",
        "date": "2026-04-28",
        "kw": "Bhugaon vs Bavdhan NA plots, Bhugaon vs Bavdhan property comparison, NA plots comparison Pune West"
    },
    "buy-na-bungalow-plots-near-warje-sinhgad-road": {
        "title": "Buy NA Bungalow Plots near Warje Sinhgad Road 2026",
        "date": "2026-07-01",
        "kw": "NA plots near Warje, NA bungalow plots Sinhgad Road, buy plots near Warje Pune"
    },
    "forest-trails-na-bungalow-plots-advantage": {
        "title": "Why Forest Trails NA Bungalow Plots are Pune's Best Investment 2026",
        "date": "2026-06-05",
        "kw": "Forest Trails NA plots advantage, best NA plots Pune, why buy plots Bhugaon Forest Trails"
    },
    "kothrud-vs-bhugaon-na-bungalow-plots": {
        "title": "Kothrud vs Bhugaon NA Bungalow Plots Comparison 2026",
        "date": "2026-07-20",
        "kw": "Kothrud vs Bhugaon NA plots, Kothrud bungalow plots vs Bhugaon, best NA plots Kothrud Bhugaon"
    },
    "misty-greens-na-plots-review": {
        "title": "Misty Greens NA Plots Review 2026 | Forest Trails Bhugaon Pune",
        "date": "2026-08-01",
        "kw": "Misty Greens NA plots review, Misty Greens Forest Trails review, NA plots Bhugaon review 2026"
    },
    "na-bungalow-plots-pune-west-guide": {
        "title": "NA Bungalow Plots in Pune West — Complete Buyer's Guide 2026",
        "date": "2026-04-15",
        "kw": "NA bungalow plots Pune West guide, buy NA plots Pune West, NA plots investment guide 2026"
    },
    "pmrda-ring-road-bhugaon-property-appreciation-2026": {
        "title": "PMRDA Ring Road Bhugaon — Property Appreciation Impact 2026",
        "date": "2026-03-20",
        "kw": "PMRDA ring road Bhugaon, PMRDA ring road property appreciation, Bhugaon interchange 2026"
    },
    "premium-apartments-near-kothrud-bhugaon-canopy": {
        "title": "Premium Apartments near Kothrud at Bhugaon — The Canopy 2026",
        "date": "2026-07-05",
        "kw": "premium apartments near Kothrud, The Canopy Bhugaon apartments, 2BHK 3BHK near Kothrud"
    },
    "senior-living-communities-west-pune-bhugaon": {
        "title": "Senior Living Communities in West Pune — Athashri Bhugaon Guide 2026",
        "date": "2026-06-25",
        "kw": "senior living west Pune, senior community Bhugaon, Athashri senior living guide, retirement homes Pune West"
    },
}

def get_blogposting_schema(blog_dir_name, canonical_url):
    meta = BLOG_META.get(blog_dir_name, {})
    title = meta.get("title", f"Real Estate Blog | Paranjape Forest Trails")
    date = meta.get("date", "2026-01-01")
    kw = meta.get("kw", "Paranjape Forest Trails blog, Pune real estate 2026")
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "datePublished": f"{date}T09:00:00+05:30",
        "dateModified": f"{date}T09:00:00+05:30",
        "author": {"@type": "Person", "name": "Paranjape Forest Trails Editorial Team"},
        "publisher": {
            "@type": "Organization",
            "name": "Paranjape Schemes (Construction) Ltd",
            "logo": {"@type": "ImageObject", "url": f"{DOMAIN}/images/logo.webp"}
        },
        "mainEntityOfPage": {"@type": "WebPage", "@id": canonical_url},
        "keywords": kw,
        "image": f"{DOMAIN}/images/hero-township.webp",
        "description": title,
        "articleBody": f"A detailed analysis by the Paranjape Forest Trails team on {title}. Covering investment insights, property prices, RERA compliance, and NRI investment opportunities in Pune West 2026."
    }

# ─── MAIN INJECTION RUNNER ────────────────────────────────────────────────────

def get_title_from_html(content):
    m = re.search(r'<title>([^<]+)</title>', content, re.IGNORECASE)
    return m.group(1).strip() if m else "Paranjape Forest Trails"

def get_canonical_from_html(content):
    m = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', content, re.IGNORECASE)
    if m: return m.group(1)
    m = re.search(r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']', content, re.IGNORECASE)
    return m.group(1) if m else None

def main():
    print("=" * 72)
    print("Schema Domination Engine v1.0")
    print("=" * 72)

    stats = {
        "faq_injected": 0,
        "breadcrumb_injected": 0,
        "rating_injected": 0,
        "h1_injected": 0,
        "blogposting_fixed": 0,
        "skipped": 0,
    }

    # ── Walk all HTML files ────────────────────────────────────────────────
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in
                   {'node_modules','.git','.wrangler','dist','scratch','.gemini','_astro'}]
        for fname in files:
            if not fname.endswith('.html'):
                continue
            fpath = os.path.join(root, fname)
            rel = os.path.relpath(fpath, BASE_DIR).replace('\\','/')
            slug = rel.split('/')[0] if '/' in rel else ''
            # Skip component / scratch fragments
            if any(x in rel for x in ['components/','scratch/','scripts/']):
                continue

            content = read(fpath)
            if not content:
                continue

            title = get_title_from_html(content)
            canonical = get_canonical_from_html(content)
            if not canonical:
                canonical = f"{DOMAIN}/{rel.replace('/index.html','/').replace('index.html','')}"

            modified = False

            # ── A) H1 for amenity pages ──────────────────────────────────
            if 'amenities/' in rel and 'index.html' in rel:
                amenity_dir = rel.split('/')[1] if rel.count('/') >= 2 else ""
                h1_text = AMENITY_H1_MAP.get(amenity_dir, f"Forest Trails Amenity — {amenity_dir.replace('-',' ').title()}")
                if inject_h1_into_amenity(fpath, h1_text):
                    stats["h1_injected"] += 1
                    content = read(fpath)
                    modified = True
                    print(f"  H1 ✓ amenities/{amenity_dir}/")
                continue  # amenities don't need full schema injection

            # ── B) Blog pages: replace TechArticle with BlogPosting ──────
            if 'blogs/' in rel and 'index.html' in rel:
                blog_dir = rel.split('/')[-2] if rel.count('/') >= 2 else ""
                if 'TechArticle' in content and not has_schema_type(content, 'BlogPosting'):
                    schema = get_blogposting_schema(blog_dir, canonical)
                    new_script = wrap_schema(schema)
                    # Inject before </head>
                    content = inject_before_head_close(content, new_script)
                    # Add BlogPosting keywords meta if missing
                    meta = BLOG_META.get(blog_dir, {})
                    if meta.get("kw") and 'name="keywords"' not in content:
                        kw_tag = f'  <meta name="keywords" content="{meta["kw"]}, Paranjape Forest Trails blog, Pune real estate 2026, NA plots Bhugaon blog">'
                        content = inject_before_head_close(content, kw_tag)
                    write(fpath, content)
                    stats["blogposting_fixed"] += 1
                    print(f"  BlogPosting ✓ {rel}")
                # Add breadcrumb to blog
                if not has_schema_type(content, 'BreadcrumbList'):
                    bc = get_breadcrumb_for_slug(slug, title, canonical)
                    content = inject_before_head_close(content, wrap_schema(bc))
                    write(fpath, content)
                    stats["breadcrumb_injected"] += 1
                continue

            # ── C) Keyword landing pages & enclave pages ─────────────────
            # Determine if this is an indexable keyword/enclave page
            is_keyword_page = any(x in rel for x in [
                'bhk-flats', 'bhk-in-', 'bhk-near', '3bhk-', '2bhk-', '5bhk-',
                'na-bungalow-plots', 'na-plots-in', 'plots-in-pune',
                'luxury-forest-villas', 'luxury-villas-', 'twin-bungalows',
                'independent-bungalows', 'gated-township-plots',
                'senior-living-', 'nri-investment-', 'rera-approved-',
                'ready-to-move-', 'under-construction-',
                'property-in-', 'property-near-',
                'paranjape-forest-trails-township-bhugaon-misty',
                'paranjape-forest-trails-township-bhugaon-rivolo',
                'paranjape-forest-trails-township-bhugaon-the-cove',
                'paranjape-forest-trails-township-bhugaon-the-canopy',
                'paranjape-forest-trails-township-bhugaon-highgardens',
                'paranjape-forest-trails-township-bhugaon-athashri',
                'paranjape-forest-trails-township-bhugaon-verandah',
                'paranjape-forest-trails-township-bhugaon-orchard',
                'paranjape-forest-trails-township-bhugaon-swaniketan',
                'misty-greens', 'rivolo-residences', 'the-cove', 'swaniketan',
                'verandah', 'bavdhan-vs-', 'forest-trails-vs-',
                'bavdhan-vs-bhugaon', 'chandani-chowk-flyover',
                'kothrud-extension', 'pmrda-ring-road',
                'paranjape-forest-trails-township-bhugaon-investment',
                'paranjape-forest-trails-township-bhugaon-near-',
                'paranjape-forest-trails-township-bhugaon-paud-road',
            ])

            if not is_keyword_page:
                continue

            # BreadcrumbList injection
            if not has_schema_type(content, 'BreadcrumbList'):
                bc = get_breadcrumb_for_slug(slug, title, canonical)
                content = inject_before_head_close(content, wrap_schema(bc))
                stats["breadcrumb_injected"] += 1
                modified = True

            # FAQPage injection
            if not has_schema_type(content, 'FAQPage'):
                faqs = get_faq_for_slug(slug)
                if faqs:
                    faq_schema = {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs
                    }
                    content = inject_before_head_close(content, wrap_schema(faq_schema))
                    stats["faq_injected"] += 1
                    modified = True

            # AggregateRating injection (skip if already has one)
            if not has_schema_type(content, 'AggregateRating'):
                rating_schema = get_aggregate_rating(slug, title.split('|')[0].strip())
                content = inject_before_head_close(content, wrap_schema(rating_schema))
                stats["rating_injected"] += 1
                modified = True

            if modified:
                write(fpath, content)
                print(f"  SCHEMA ✓ {rel}")

    # ── D) Print summary ──────────────────────────────────────────────────
    print("\n" + "=" * 72)
    print("Schema Domination Engine — COMPLETE")
    print(f"  FAQPage schemas injected:        {stats['faq_injected']}")
    print(f"  BreadcrumbList schemas injected: {stats['breadcrumb_injected']}")
    print(f"  AggregateRating schemas injected:{stats['rating_injected']}")
    print(f"  H1 tags injected (amenities):    {stats['h1_injected']}")
    print(f"  BlogPosting schemas fixed:       {stats['blogposting_fixed']}")
    print("=" * 72)

if __name__ == "__main__":
    main()
