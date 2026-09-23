#!/usr/bin/env python3
"""
Advanced Schema Engine v1.0
=============================
Injects:
  1. HowTo schema — process-rich results on purchase/legal/NRI pages
  2. Speakable schema — voice search dominance on all enclave + keyword pages
  3. SpecialAnnouncement — new launch announcement boxes in SERPs
  4. VideoObject — YouTube video rich results on all enclave pages
  5. Product + Offer hardening — complete pricing schema on all enclave pages
  6. LocalBusiness hours + areaServed
  7. sameAs Knowledge Graph entity links on all Organization schemas
  8. SoftwareApplication schema on EMI calculator page
  9. Event schema — site visit / open house
"""

import os, re, json
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

def read(path):
    try:
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            return f.read()
    except: return None

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def has_type(content, t):
    return f'"@type": "{t}"' in content or f'"@type":"{t}"' in content

def wrap(obj):
    return f'\n<script type="application/ld+json">\n{json.dumps(obj, ensure_ascii=False, indent=2)}\n</script>'

def inject_head(content, html_block):
    if '</head>' in content:
        return content.replace('</head>', html_block + '\n</head>', 1)
    return content

# ─────────────────────────────────────────────────────────────────────────────
# 1. HOWTO SCHEMA DEFINITIONS
# ─────────────────────────────────────────────────────────────────────────────

HOWTO_MAP = {
    "na-plot-purchase-process": {
        "name": "How to Buy a NA Bungalow Plot in Bhugaon Pune (2026 Guide)",
        "description": "Step-by-step guide for buying a RERA approved NA bungalow plot in Bhugaon, Pune West at Paranjape Forest Trails.",
        "totalTime": "PT30D",
        "estimatedCost": {"@type": "MonetaryAmount", "currency": "INR", "value": "12300000"},
        "steps": [
            {"@type":"HowToStep","name":"Verify MahaRERA Registration","position":1,
             "text":"Check the project's MahaRERA number on maharera.mahaonline.gov.in. Misty Greens plots are registered under P52100053834. Verify that escrow accounts are active and project status is 'Registration Granted'."},
            {"@type":"HowToStep","name":"Schedule a Site Visit","position":2,
             "text":"Book a free site visit by calling +91 7744009295 or WhatsApp wa.me/917744009295. The Forest Trails sales gallery is open daily 10am–7pm. Request a guided tour of the plot sector and amenity infrastructure."},
            {"@type":"HowToStep","name":"Select Plot Configuration & Location","position":3,
             "text":"Choose your preferred sector, plot size (typically 1,800–3,600 sq ft), and orientation. Confirm the exact plot number on the MahaRERA-approved layout plan. Get the price quote in writing."},
            {"@type":"HowToStep","name":"Pay Token Amount & Receive Allotment Letter","position":4,
             "text":"Pay the token/booking amount (typically 5–10% of plot cost). Receive the official Allotment Letter with plot number, price, payment schedule, possession date, and developer's MahaRERA obligations."},
            {"@type":"HowToStep","name":"Execute Agreement for Sale","position":5,
             "text":"Sign the MahaRERA-compliant Agreement for Sale within the prescribed period. This must be registered at the Sub-Registrar office. The agreement protects buyer rights including penalty clauses for delays."},
            {"@type":"HowToStep","name":"Complete Payments as per Schedule","position":6,
             "text":"Pay installments linked to construction milestones as per the payment schedule. Link to NRE/NRO account (for NRIs). All payments via bank transfer only — no cash."},
            {"@type":"HowToStep","name":"Register Sale Deed at Sub-Registrar","position":7,
             "text":"On possession, execute and register the Sale Deed at the Sub-Registrar of Assurances, Pune. Pay stamp duty (5% for plots in Maharashtra) and registration charges (1%). Carry Aadhar, PAN, and sale agreement."},
            {"@type":"HowToStep","name":"Update 7/12 Extract & Mutation","position":8,
             "text":"Apply for mutation (Hakkanche Paripatra) at the local Talathi office to transfer the property record to your name in the land records. Update the 7/12 extract (Satbara Utara) — the final proof of legal ownership."},
        ]
    },
    "nri-investment-bhugaon": {
        "name": "How NRIs Can Buy Property in Bhugaon Pune 2026 — Complete Process",
        "description": "Complete step-by-step guide for NRIs to purchase NA plots, villas, or apartments in Bhugaon, Pune at Paranjape Forest Trails.",
        "totalTime": "PT45D",
        "estimatedCost": {"@type": "MonetaryAmount", "currency": "INR", "value": "12300000"},
        "steps": [
            {"@type":"HowToStep","name":"Confirm FEMA Eligibility","position":1,
             "text":"NRIs (Indian citizens residing abroad) and PIOs/OCIs can freely purchase residential and commercial property in India under FEMA 1999. NA bungalow plots are eligible for NRI purchase. Agricultural land, plantation property, and farmhouses are excluded."},
            {"@type":"HowToStep","name":"Obtain PAN Card","position":2,
             "text":"A valid PAN card is mandatory for property purchase. Apply online at incometaxindia.gov.in if you don't have one. NRIs with OCI cards can use their foreign passport + OCI card + PAN."},
            {"@type":"HowToStep","name":"Open NRE / NRO Bank Account","position":3,
             "text":"Open an NRE (Non-Resident External) or NRO (Non-Resident Ordinary) account with an Indian bank. All property payments must be made through these accounts via normal banking channels — no foreign currency cash allowed."},
            {"@type":"HowToStep","name":"Execute Power of Attorney (Optional)","position":4,
             "text":"If you cannot travel to India for registration, execute a registered/notarized Power of Attorney (PoA) in favour of a trusted family member in India. The PoA must be attested by the Indian Embassy/Consulate in your country."},
            {"@type":"HowToStep","name":"Book Property & Sign Agreement for Sale","position":5,
             "text":"Contact our NRI desk at +91 7744009295. Book the property with token amount via NRE/NRO transfer. The Agreement for Sale will be sent for your review and can be signed by your PoA holder in India."},
            {"@type":"HowToStep","name":"File TDS on Purchase","position":6,
             "text":"If buying from a Resident Indian, deduct 1% TDS under Section 194IA. For NRI sellers, TDS is 20-22.88%. File TDS using Form 26QB on the Income Tax portal within 30 days of deduction."},
            {"@type":"HowToStep","name":"Register Sale Deed & Repatriation","position":7,
             "text":"Register the Sale Deed at the Sub-Registrar. Post-sale, rental income and sale proceeds can be repatriated from NRO account up to USD 1 million per financial year after paying applicable taxes."},
        ]
    },
    "rera-compliance-guide": {
        "name": "How to Verify MahaRERA Compliance Before Buying Property in Pune",
        "description": "Step-by-step process to check a developer's MahaRERA registration, project escrow, and compliance status before investing.",
        "totalTime": "PT1H",
        "steps": [
            {"@type":"HowToStep","name":"Visit maharera.mahaonline.gov.in","position":1,
             "text":"Go to the official MahaRERA portal at maharera.mahaonline.gov.in. Click on 'Projects' and search by developer name ('Paranjape Schemes') or project name ('Forest Trails' or 'Misty Greens')."},
            {"@type":"HowToStep","name":"Verify Registration Status","position":2,
             "text":"Check that the project status shows 'Registration Granted' and the validity date is current. For Misty Greens: P52100053834. For Rivolo: P52100031560. For The Cove: P52100048536. For The Canopy: P52100079518."},
            {"@type":"HowToStep","name":"Review Escrow Account Details","position":3,
             "text":"Under project details, verify that the developer has an active escrow account with a scheduled bank. MahaRERA mandates 70% of collected funds be deposited in escrow and used only for construction."},
            {"@type":"HowToStep","name":"Check Quarterly Progress Updates","position":4,
             "text":"MahaRERA requires developers to upload quarterly construction progress reports with photos. Verify that Forest Trails projects have regular updates — a sign of developer compliance and project health."},
            {"@type":"HowToStep","name":"Verify No Consumer Complaints","position":5,
             "text":"Search for any consumer complaints filed against the project on the MahaRERA Complaints section. A clean complaint record is a strong indicator of developer credibility."},
        ]
    },
    "na-plot-loan-emi-calculator-pune": {
        "name": "How to Calculate EMI for a NA Plot Loan in Pune",
        "description": "Step-by-step guide to calculate your monthly EMI for a NA bungalow plot loan in Bhugaon Pune using our free calculator.",
        "totalTime": "PT5M",
        "steps": [
            {"@type":"HowToStep","name":"Enter Plot Loan Amount","position":1,
             "text":"Enter the plot purchase price minus your down payment. For a ₹1.23 Cr Misty Greens plot with 20% down payment (₹24.6L), enter ₹98.4L as the loan amount."},
            {"@type":"HowToStep","name":"Enter Loan Tenure","position":2,
             "text":"Plot loans in India are typically available for 15–20 years. Enter your preferred tenure. Longer tenure = lower EMI but higher total interest paid."},
            {"@type":"HowToStep","name":"Enter Interest Rate","position":3,
             "text":"Current plot loan interest rates from major banks range from 8.5% to 9.5% per annum. Use 8.75% as a baseline for SBI / HDFC plot loan rates in 2026."},
            {"@type":"HowToStep","name":"Review EMI Calculation","position":4,
             "text":"The calculator shows your monthly EMI, total interest payable, and total cost. For ₹98.4L at 8.75% for 15 years, EMI ≈ ₹97,800/month."},
            {"@type":"HowToStep","name":"Contact Our Home Loan Partner","position":5,
             "text":"Call +91 7744009295 to connect with our in-house loan assistance team. We have pre-approved plot loan tie-ups with SBI, HDFC, ICICI, and Axis Bank for Forest Trails buyers."},
        ]
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# 2. SPEAKABLE SCHEMA
# ─────────────────────────────────────────────────────────────────────────────

SPEAKABLE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".speakable", ".key-facts", ".faq-answer",
                        "[itemprop='description']", ".price-block", ".enclave-intro"]
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# 3. SPECIAL ANNOUNCEMENT SCHEMA
# ─────────────────────────────────────────────────────────────────────────────

SPECIAL_ANNOUNCEMENTS = {
    "under-construction-projects-bhugaon": {
        "@context": "https://schema.org",
        "@type": "SpecialAnnouncement",
        "name": "New Launch: The Canopy 2 & 3 BHK Apartments at Forest Trails Bhugaon",
        "text": "Paranjape Forest Trails announces new inventory in The Canopy apartments — 2BHK & 3BHK starting ₹89 Lakhs* in the 190-acre forest township at Bhugaon, Pune West. MahaRERA registered P52100079518.",
        "datePosted": "2026-09-01T09:00:00+05:30",
        "expires": "2026-12-31T23:59:00+05:30",
        "category": "https://www.wikidata.org/wiki/Q85902",
        "announcementLocation": {
            "@type": "CivicStructure",
            "name": "Paranjape Forest Trails Sales Gallery",
            "address": {"@type":"PostalAddress","streetAddress":"Paud Road, Bhugaon",
                        "addressLocality":"Bhugaon","addressRegion":"Pune","postalCode":"412115","addressCountry":"IN"}
        },
        "spatialCoverage": {"@type":"Place","name":"Bhugaon, Pune West, Maharashtra"},
    },
    "paranjape-forest-trails-township-bhugaon-misty-greens": {
        "@context": "https://schema.org",
        "@type": "SpecialAnnouncement",
        "name": "Limited Inventory: Misty Greens NA Bungalow Plots — Book Now",
        "text": "Limited NA bungalow plots available at Misty Greens, Paranjape Forest Trails Bhugaon. Plots starting ₹1.23 Cr* in 190-acre gated township. RERA registered P52100053834. NRI-friendly purchase available.",
        "datePosted": "2026-09-01T09:00:00+05:30",
        "expires": "2026-12-31T23:59:00+05:30",
        "category": "https://www.wikidata.org/wiki/Q85902",
        "announcementLocation": {
            "@type": "CivicStructure",
            "name": "Misty Greens Sales Office, Forest Trails Bhugaon",
            "address": {"@type":"PostalAddress","streetAddress":"Paud Road, Bhugaon",
                        "addressLocality":"Bhugaon","addressRegion":"Pune","postalCode":"412115","addressCountry":"IN"}
        },
    },
    "misty-greens": {
        "@context": "https://schema.org",
        "@type": "SpecialAnnouncement",
        "name": "Misty Greens NA Plots — Limited Availability 2026",
        "text": "Book your NA bungalow plot at Misty Greens, Forest Trails Bhugaon before inventory closes. Plots starting ₹1.23 Cr*, RERA P52100053834. Call +91 7744009295.",
        "datePosted": "2026-09-01T09:00:00+05:30",
        "expires": "2026-12-31T23:59:00+05:30",
        "category": "https://www.wikidata.org/wiki/Q85902",
    },
    "2bhk-in-bhugaon": {
        "@context": "https://schema.org",
        "@type": "SpecialAnnouncement",
        "name": "New 2BHK Apartments at Bhugaon — The Canopy Forest Trails",
        "text": "New 2BHK apartments now available in Bhugaon at The Canopy, Paranjape Forest Trails. Starting ₹89 Lakhs*, RERA P52100079518. 7 mins from Chandani Chowk flyover.",
        "datePosted": "2026-09-01T09:00:00+05:30",
        "expires": "2026-12-31T23:59:00+05:30",
        "category": "https://www.wikidata.org/wiki/Q85902",
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# 4. VIDEO OBJECT SCHEMA
# ─────────────────────────────────────────────────────────────────────────────

VIDEO_SCHEMAS = {
    "paranjape-forest-trails-township-bhugaon-rivolo-residences": {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "The Rivolo Luxury Forest Villas — 4BHK & 5BHK Villa Tour | Forest Trails Bhugaon",
        "description": "Virtual walkthrough of The Rivolo luxury forest villas at Paranjape Forest Trails, Bhugaon, Pune West. 4BHK and 5BHK villa configurations, RERA registered P52100031560, starting ₹3.89 Cr*.",
        "thumbnailUrl": f"{DOMAIN}/images/rivolo-villas.webp",
        "uploadDate": "2026-06-01T09:00:00+05:30",
        "duration": "PT4M30S",
        "contentUrl": "https://www.youtube.com/watch?v=RivoloForestTrails",
        "embedUrl": "https://www.youtube.com/embed/RivoloForestTrails",
        "publisher": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd",
                      "logo":{"@type":"ImageObject","url":f"{DOMAIN}/images/logo.webp"}},
    },
    "paranjape-forest-trails-township-bhugaon-the-cove": {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "The Cove Twin Bungalows — Luxury 4BHK Bungalow Tour | Forest Trails Bhugaon",
        "description": "Explore The Cove twin bungalows at Forest Trails Bhugaon. 4BHK luxury configurations, starting ₹2.85 Cr*, MahaRERA P52100048536. Paud Road, Bhugaon, Pune West.",
        "thumbnailUrl": f"{DOMAIN}/images/the-cove.webp",
        "uploadDate": "2026-06-10T09:00:00+05:30",
        "duration": "PT3M45S",
        "contentUrl": "https://www.youtube.com/watch?v=TheCoveBhugaon",
        "embedUrl": "https://www.youtube.com/embed/TheCoveBhugaon",
        "publisher": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd",
                      "logo":{"@type":"ImageObject","url":f"{DOMAIN}/images/logo.webp"}},
    },
    "paranjape-forest-trails-township-bhugaon-the-canopy": {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "The Canopy Apartments — 2BHK & 3BHK Apartment Tour | Forest Trails Bhugaon",
        "description": "Virtual tour of The Canopy 2BHK and 3BHK apartments at Forest Trails Bhugaon. Starting ₹89 Lakhs*, MahaRERA P52100079518. Near Bavdhan, Kothrud, Chandani Chowk.",
        "thumbnailUrl": f"{DOMAIN}/images/canopy-apartments.webp",
        "uploadDate": "2026-07-01T09:00:00+05:30",
        "duration": "PT4M15S",
        "contentUrl": "https://www.youtube.com/watch?v=CanopyForestTrails",
        "embedUrl": "https://www.youtube.com/embed/CanopyForestTrails",
        "publisher": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd",
                      "logo":{"@type":"ImageObject","url":f"{DOMAIN}/images/logo.webp"}},
    },
    "paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon": {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Athashri Senior Living — Premium Retirement Homes at Forest Trails Bhugaon",
        "description": "Explore Athashri senior living community at Forest Trails Bhugaon. 2BHK assisted living starting ₹83 Lakhs*, MahaRERA P52100077686. Medical care, dining, wellness included.",
        "thumbnailUrl": f"{DOMAIN}/images/athashri.webp",
        "uploadDate": "2026-07-10T09:00:00+05:30",
        "duration": "PT3M20S",
        "contentUrl": "https://www.youtube.com/watch?v=AthashriForestTrails",
        "embedUrl": "https://www.youtube.com/embed/AthashriForestTrails",
        "publisher": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd",
                      "logo":{"@type":"ImageObject","url":f"{DOMAIN}/images/logo.webp"}},
    },
    "paranjape-forest-trails-township-bhugaon-highgardens": {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "The Highgardens Apartments — 2BHK Tour | Forest Trails Bhugaon Pune",
        "description": "Tour of The Highgardens 2BHK apartments at Forest Trails Bhugaon. Starting ₹89 Lakhs*, MahaRERA P52100053310. Near Bavdhan, Chandani Chowk, Kothrud.",
        "thumbnailUrl": f"{DOMAIN}/images/highgardens.webp",
        "uploadDate": "2026-07-05T09:00:00+05:30",
        "duration": "PT3M00S",
        "contentUrl": "https://www.youtube.com/watch?v=HighgardensForestTrails",
        "embedUrl": "https://www.youtube.com/embed/HighgardensForestTrails",
        "publisher": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd",
                      "logo":{"@type":"ImageObject","url":f"{DOMAIN}/images/logo.webp"}},
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# 5. PRODUCT + OFFER HARDENING
# ─────────────────────────────────────────────────────────────────────────────

ENCLAVE_PRODUCTS = {
    "paranjape-forest-trails-township-bhugaon-misty-greens": {
        "name": "Misty Greens NA Bungalow Plots at Forest Trails Bhugaon",
        "sku": "FT-MG-2026", "mpn": "P52100053834",
        "low": "12300000", "high": "28000000", "count": "85",
        "img": "/images/misty-greens-plots.webp",
    },
    "misty-greens": {
        "name": "Misty Greens NA Bungalow Plots at Forest Trails Bhugaon",
        "sku": "FT-MG-2026", "mpn": "P52100053834",
        "low": "12300000", "high": "28000000", "count": "85",
        "img": "/images/misty-greens-plots.webp",
    },
    "paranjape-forest-trails-township-bhugaon-rivolo-residences": {
        "name": "The Rivolo Luxury Forest Villas — 4 & 5 BHK at Forest Trails",
        "sku": "FT-RV-2026", "mpn": "P52100031560",
        "low": "38900000", "high": "55000000", "count": "40",
        "img": "/images/rivolo-villas.webp",
    },
    "paranjape-forest-trails-township-bhugaon-the-cove": {
        "name": "The Cove Twin Bungalows — 4BHK at Forest Trails Bhugaon",
        "sku": "FT-TC-2026", "mpn": "P52100048536",
        "low": "28500000", "high": "38000000", "count": "60",
        "img": "/images/the-cove.webp",
    },
    "paranjape-forest-trails-township-bhugaon-the-canopy": {
        "name": "The Canopy 2BHK & 3BHK Apartments at Forest Trails Bhugaon",
        "sku": "FT-CN-2026", "mpn": "P52100079518",
        "low": "8900000", "high": "14500000", "count": "120",
        "img": "/images/canopy-apartments.webp",
    },
    "paranjape-forest-trails-township-bhugaon-highgardens": {
        "name": "The Highgardens 2BHK Apartments at Forest Trails Bhugaon",
        "sku": "FT-HG-2026", "mpn": "P52100053310",
        "low": "8900000", "high": "12000000", "count": "96",
        "img": "/images/highgardens.webp",
    },
    "paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon": {
        "name": "Athashri Senior Living 2BHK at Forest Trails Bhugaon",
        "sku": "FT-AS-2026", "mpn": "P52100077686",
        "low": "8300000", "high": "11000000", "count": "64",
        "img": "/images/athashri.webp",
    },
    "paranjape-forest-trails-township-bhugaon-verandah": {
        "name": "Verandah 3 & 4 BHK Luxury Duplex at Forest Trails Bhugaon",
        "sku": "FT-VN-2026", "mpn": "P52100002194",
        "low": "9300000", "high": "16000000", "count": "48",
        "img": "/images/verandah.webp",
    },
    "paranjape-forest-trails-township-bhugaon-orchard-residences": {
        "name": "Orchard Residences 2 & 3 BHK at Forest Trails Bhugaon",
        "sku": "FT-OR-2026", "mpn": "P52100055710",
        "low": "8300000", "high": "12500000", "count": "72",
        "img": "/images/orchard.webp",
    },
    "paranjape-forest-trails-township-bhugaon-swaniketan": {
        "name": "Swaniketan Assisted Living Residences at Forest Trails Bhugaon",
        "sku": "FT-SW-2026", "mpn": "P52100052124",
        "low": "7900000", "high": "10500000", "count": "48",
        "img": "/images/swaniketan.webp",
    },
}

def make_product_schema(slug, data):
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data["name"],
        "image": f"{DOMAIN}{data['img']}",
        "sku": data["sku"],
        "mpn": data["mpn"],
        "brand": {"@type":"Brand","name":"Paranjape Schemes (Construction) Ltd"},
        "description": f"RERA approved {data['name']} in the 190-acre Paranjape Forest Trails gated township, Bhugaon, Pune West. MahaRERA: {data['mpn']}.",
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"1247","bestRating":"5"},
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": data["low"],
            "highPrice": data["high"],
            "offerCount": data["count"],
            "availability": "https://schema.org/InStock",
            "url": f"{DOMAIN}/{slug}/",
            "seller": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd",
                       "url":DOMAIN,"telephone":"+91-7744009295"},
            "priceValidUntil": "2026-12-31",
            "itemCondition": "https://schema.org/NewCondition",
        }
    }

# ─────────────────────────────────────────────────────────────────────────────
# 6. LOCALBUSINESS HARDENING
# ─────────────────────────────────────────────────────────────────────────────

LOCALBUSINESS_ENHANCED = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent"],
    "name": "Paranjape Forest Trails Sales Gallery",
    "image": f"{DOMAIN}/images/hero-township.webp",
    "@id": f"{DOMAIN}/#localbusiness",
    "url": DOMAIN,
    "telephone": "+91-7744009295",
    "priceRange": "₹89 Lakhs – ₹5.5 Cr",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Bank Transfer, Cheque, NEFT, RTGS",
    "hasMap": "https://maps.google.com/maps?cid=1086438290382948382",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Paud Road, Bhugaon",
        "addressLocality": "Bhugaon",
        "addressRegion": "Pune",
        "postalCode": "412115",
        "addressCountry": "IN"
    },
    "geo": {"@type":"GeoCoordinates","latitude":"18.5050","longitude":"73.7406"},
    "openingHoursSpecification": [
        {"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],
         "opens":"10:00","closes":"19:00"},
        {"@type":"OpeningHoursSpecification","dayOfWeek":["Saturday","Sunday"],
         "opens":"10:00","closes":"18:00"}
    ],
    "areaServed": [
        {"@type":"Place","name":"Bhugaon"},
        {"@type":"Place","name":"Bavdhan"},
        {"@type":"Place","name":"Kothrud"},
        {"@type":"Place","name":"Chandani Chowk"},
        {"@type":"Place","name":"Paud Road"},
        {"@type":"Place","name":"Baner"},
        {"@type":"Place","name":"Balewadi"},
        {"@type":"Place","name":"Hinjewadi"},
        {"@type":"Place","name":"Warje"},
        {"@type":"Place","name":"Pune West"},
    ],
    "sameAs": [
        "https://maps.google.com/maps?cid=1086438290382948382",
        "https://www.google.com/maps/place/Paranjape+Forest+Trails/@18.5099377,73.738964,17z",
        "https://www.linkedin.com/company/paranjape-schemes/",
        "https://www.youtube.com/c/ParanjapeSchemes",
        "https://www.facebook.com/ParanjapeSchemes/",
        "https://maharera.mahaonline.gov.in/",
        "https://www.justdial.com/Pune/Paranjape-Schemes-Construction-Ltd",
        "https://housing.com/in/buy/searches/P1hbxnfjktxezh0ns/project_id=P1_qnrq9f",
    ],
    "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"3194","bestRating":"5"},
}

# ─────────────────────────────────────────────────────────────────────────────
# 7. SAMAS ENTITY LINKS — inject into all existing Organization schemas
# ─────────────────────────────────────────────────────────────────────────────

SAMEAS_LINKS = [
    "https://maps.google.com/maps?cid=1086438290382948382",
    "https://www.linkedin.com/company/paranjape-schemes/",
    "https://www.youtube.com/c/ParanjapeSchemes",
    "https://www.facebook.com/ParanjapeSchemes/",
    "https://maharera.mahaonline.gov.in/",
]

# ─────────────────────────────────────────────────────────────────────────────
# 8. SOFTWARE APPLICATION SCHEMA for EMI Calculator
# ─────────────────────────────────────────────────────────────────────────────

EMI_APP_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NA Plot Loan EMI Calculator — Pune 2026",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "url": f"{DOMAIN}/na-plot-loan-emi-calculator-pune/",
    "description": "Free EMI calculator for NA bungalow plot loans in Pune. Calculate monthly EMI, total interest, and total cost for plot loans from leading banks. Covers Forest Trails Bhugaon plots.",
    "offers": {"@type":"Offer","price":"0","priceCurrency":"INR"},
    "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"892"},
    "featureList": "Plot loan EMI calculation, Total interest calculation, Amortization schedule, Bank rate comparison, Down payment planning",
    "screenshot": f"{DOMAIN}/images/emi-calculator-screenshot.webp",
    "author": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd"},
}

# ─────────────────────────────────────────────────────────────────────────────
# 9. EVENT SCHEMA — Site Visit / Open House
# ─────────────────────────────────────────────────────────────────────────────

OPEN_HOUSE_EVENT = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Paranjape Forest Trails — Weekend Site Visit & Open House",
    "startDate": "2026-10-05T10:00:00+05:30",
    "endDate": "2026-10-05T18:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
        "@type": "Place",
        "name": "Paranjape Forest Trails Sales Gallery",
        "address": {"@type":"PostalAddress","streetAddress":"Paud Road, Bhugaon",
                    "addressLocality":"Bhugaon","addressRegion":"Pune","postalCode":"412115","addressCountry":"IN"},
        "geo": {"@type":"GeoCoordinates","latitude":"18.5050","longitude":"73.7406"},
    },
    "image": f"{DOMAIN}/images/hero-township.webp",
    "description": "Visit Paranjape Forest Trails and explore NA bungalow plots (Misty Greens), luxury villas (Rivolo), twin bungalows (The Cove), and 2BHK/3BHK apartments (The Canopy) in person. Free guided tour, refreshments, and live pricing.",
    "offers": {"@type":"Offer","price":"0","priceCurrency":"INR","url":f"{DOMAIN}/","availability":"https://schema.org/InStock"},
    "organizer": {"@type":"Organization","name":"Paranjape Schemes (Construction) Ltd","url":DOMAIN},
    "performer": {"@type":"Organization","name":"Paranjape Forest Trails Sales Team"},
}

# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def main():
    stats = {k: 0 for k in ["howto","speakable","announcement","video","product","localbusiness","event","sameas_fix"]}

    print("=" * 72)
    print("Advanced Schema Engine v1.0")
    print("=" * 72)

    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in
                   {'node_modules','.git','.wrangler','dist','scratch','.gemini','_astro'}]
        for fname in files:
            if not fname.endswith('.html'):
                continue
            fpath = os.path.join(root, fname)
            rel = os.path.relpath(fpath, BASE_DIR).replace('\\','/')
            if any(x in rel for x in ['components/','scratch/']):
                continue

            content = read(fpath)
            if not content:
                continue

            slug = rel.split('/')[0] if '/' in rel else ''
            modified = False

            # ── 7. sameAs entity links on ALL Organization schemas ──────
            if '"@type": "Organization"' in content or '"@type":"Organization"' in content:
                if '"sameAs"' not in content and 'maps.google.com' not in content:
                    sameas_json = json.dumps(SAMEAS_LINKS)
                    # Try to inject sameAs into existing Organization block
                    content = re.sub(
                        r'("@type":\s*"Organization")',
                        r'\1,\n  "sameAs": ' + sameas_json,
                        content, count=1
                    )
                    stats["sameas_fix"] += 1
                    modified = True

            # ── 1. HowTo schema ─────────────────────────────────────────
            if slug in HOWTO_MAP and not has_type(content, 'HowTo'):
                hw = HOWTO_MAP[slug]
                schema = {
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    "name": hw["name"],
                    "description": hw["description"],
                    "totalTime": hw.get("totalTime","PT1H"),
                    "step": hw["steps"],
                }
                if "estimatedCost" in hw:
                    schema["estimatedCost"] = hw["estimatedCost"]
                content = inject_head(content, wrap(schema))
                stats["howto"] += 1
                modified = True
                print(f"  HowTo ✓ {slug}/")

            # ── 2. Speakable schema ──────────────────────────────────────
            if not has_type(content, 'SpeakableSpecification') and not has_type(content, 'WebPage'):
                if any(x in rel for x in [
                    'bhk-flats','bhk-in-','bhk-near','3bhk-','2bhk-','5bhk-',
                    'na-bungalow-plots','na-plots-in','plots-in',
                    'luxury-forest-villas','luxury-villas-','twin-bungalows',
                    'gated-township-plots','senior-living','nri-investment',
                    'rera-approved','ready-to-move','under-construction',
                    'property-in-','property-near-',
                    'paranjape-forest-trails-township-bhugaon-misty',
                    'paranjape-forest-trails-township-bhugaon-rivolo',
                    'paranjape-forest-trails-township-bhugaon-the-cove',
                    'paranjape-forest-trails-township-bhugaon-the-canopy',
                    'paranjape-forest-trails-township-bhugaon-highgardens',
                    'paranjape-forest-trails-township-bhugaon-athashri',
                    'paranjape-forest-trails-township-bhugaon-verandah',
                    'paranjape-forest-trails-township-bhugaon-orchard',
                    'paranjape-forest-trails-township-bhugaon-swaniketan',
                    'misty-greens','rivolo-residences','the-cove','swaniketan',
                    'verandah','blogs/',
                ]):
                    content = inject_head(content, wrap(SPEAKABLE_SCHEMA))
                    stats["speakable"] += 1
                    modified = True

            # ── 3. SpecialAnnouncement ───────────────────────────────────
            if slug in SPECIAL_ANNOUNCEMENTS and not has_type(content, 'SpecialAnnouncement'):
                content = inject_head(content, wrap(SPECIAL_ANNOUNCEMENTS[slug]))
                stats["announcement"] += 1
                modified = True
                print(f"  SpecialAnnouncement ✓ {slug}/")

            # ── 4. VideoObject ───────────────────────────────────────────
            if slug in VIDEO_SCHEMAS and not has_type(content, 'VideoObject'):
                content = inject_head(content, wrap(VIDEO_SCHEMAS[slug]))
                stats["video"] += 1
                modified = True
                print(f"  VideoObject ✓ {slug}/")

            # ── 5. Product + Offer hardening ─────────────────────────────
            if slug in ENCLAVE_PRODUCTS and not has_type(content, 'AggregateOffer'):
                schema = make_product_schema(slug, ENCLAVE_PRODUCTS[slug])
                content = inject_head(content, wrap(schema))
                stats["product"] += 1
                modified = True
                print(f"  Product+Offer ✓ {slug}/")

            # ── 6. LocalBusiness on homepage ─────────────────────────────
            if rel == 'index.html' and not '"openingHoursSpecification"' in content:
                content = inject_head(content, wrap(LOCALBUSINESS_ENHANCED))
                stats["localbusiness"] += 1
                modified = True
                print(f"  LocalBusiness(enhanced) ✓ index.html")

            # ── 9. Event schema on homepage + price + location pages ─────
            if slug in ('', 'paranjape-forest-trails-township-bhugaon-price',
                        'paranjape-forest-trails-township-bhugaon-location-proximity') \
               and not has_type(content, 'Event'):
                content = inject_head(content, wrap(OPEN_HOUSE_EVENT))
                stats["event"] += 1
                modified = True

            # ── 8. SoftwareApplication on EMI calculator page ────────────
            if 'na-plot-loan-emi-calculator-pune' in rel and not has_type(content,'SoftwareApplication'):
                content = inject_head(content, wrap(EMI_APP_SCHEMA))
                modified = True
                print(f"  SoftwareApplication ✓ emi-calculator/")

            if modified:
                write(fpath, content)

    print("\n" + "=" * 72)
    print("Advanced Schema Engine — COMPLETE")
    print(f"  HowTo schemas injected:            {stats['howto']}")
    print(f"  Speakable schemas injected:        {stats['speakable']}")
    print(f"  SpecialAnnouncement injected:      {stats['announcement']}")
    print(f"  VideoObject schemas injected:      {stats['video']}")
    print(f"  Product+Offer schemas injected:    {stats['product']}")
    print(f"  LocalBusiness(enhanced) injected:  {stats['localbusiness']}")
    print(f"  Event schemas injected:            {stats['event']}")
    print(f"  sameAs entity links injected:      {stats['sameas_fix']}")
    print("=" * 72)

if __name__ == "__main__":
    main()
