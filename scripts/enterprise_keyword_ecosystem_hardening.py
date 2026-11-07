#!/usr/bin/env python3
"""
scripts/enterprise_keyword_ecosystem_hardening.py
=============================================================================
SOVEREIGN ENTERPRISE KEYWORD ECOSYSTEM HARDENING & INJECTION ENGINE
=============================================================================
Hardens and injects the complete Paranjape Forest Trails keyword ecosystem
across all 458+ production HTML pages, JSON-LD Schema entities, and client-side
search index. Enforces strict compliance with:
  - Everglades: strictly 1 & 2 BHK PRO Homes from ₹48.50 L* (MahaRERA: P52100055711)
  - Athashri: 2 & 3 BHK Senior Living from ₹83 L* (MahaRERA: P52100077686)
  - Swaniketan: 2 & 3 BHK Assisted Living from ₹79 L* (MahaRERA: P52100052124)
  - PropSmart Realty MahaRERA Agent: A031262401295
  - Mandatory asterisk (*) across all property pricing
=============================================================================
"""

import os
import re
import json
import glob
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ─── 1. CORE BRAND & ENCLAVE KEYWORD DEFINITIONS ────────────────────────────

UNIVERSAL_BRAND_KEYWORDS = [
    "Paranjape Forest Trails",
    "Paranjape Forest Trails Bhugaon",
    "Forest Trails Pune",
    "Forest Trails Bhugaon",
    "Paranjape Schemes Forest Trails",
    "Paranjape Schemes",
    "Paranjape Schemes Construction Ltd",
    "Paranjape builder Pune",
    "Paranjape Schemes projects Pune",
    "Forest Trails Paud Road Pune",
    "Paranjape Township Bhugaon",
    "PropSmart Realty MahaRERA A031262401295",
    "190 acre township Pune West",
    "gated community near Chandani Chowk"
]

ENCLAVE_KEYWORD_MATRIX = {
    "misty-greens": [
        "Misty Greens NA Plots",
        "Misty Greens Forest Trails",
        "Paranjape Misty Greens Bhugaon",
        "PMRDA sanctioned plots Bhugaon",
        "NA bungalow plots near Chandani Chowk",
        "collector sanctioned plots Pune West",
        "freehold plots Bhugaon Paud Road",
        "Misty Greens price list 2026",
        "MahaRERA P52100053834",
        "bungalow plots near Bavdhan Kothrud"
    ],
    "rivolo": [
        "The Rivolo Luxury Forest Villas",
        "Rivolo Forest Trails Bhugaon",
        "Paranjape Rivolo price 2026",
        "4 BHK luxury villas Bhugaon",
        "5 BHK bespoke forest villas Pune",
        "luxury hillside villas Sahyadri",
        "MahaRERA P52100031560",
        "custom forest villas near Chandani Chowk"
    ],
    "the-cove": [
        "The Cove Twin Bungalows",
        "The Cove Forest Trails",
        "4 BHK twin duet bungalows Bhugaon",
        "semi-detached luxury villas Pune West",
        "The Cove price list 2026",
        "MahaRERA P52100048536",
        "duet homes near Bavdhan"
    ],
    "the-canopy": [
        "The Canopy nature apartments",
        "The Canopy Forest Trails Bhugaon",
        "2 BHK flats in Bhugaon",
        "3 BHK valley view flats Bhugaon",
        "The Canopy price starting 89 Lakhs*",
        "MahaRERA P52100079518",
        "nature homes near Chandani Chowk"
    ],
    "highgardens": [
        "The Highgardens Forest Trails",
        "Highgardens stepped terrace apartments",
        "2 BHK terrace flats Bhugaon",
        "3 BHK panoramic view apartments",
        "Highgardens price starting 89 Lakhs*",
        "MahaRERA P52100053310"
    ],
    "everglades": [
        "Everglades Bavdhan Forest Trails",
        "Everglades 1 BHK PRO homes",
        "Everglades 2 BHK PRO homes",
        "flats under 50 lakhs near Bavdhan",
        "Everglades price starting 48.50 Lakhs*",
        "MahaRERA P52100055711",
        "smart compact homes Pune West"
    ],
    "athashri": [
        "Athashri Senior Living Bhugaon",
        "Paranjape Athashri Forest Trails",
        "2 BHK senior citizen apartments",
        "3 BHK retirement homes Pune West",
        "senior living with medical care",
        "Athashri starting 83 Lakhs*",
        "MahaRERA P52100077686",
        "geriatric care community Bavdhan Kothrud"
    ],
    "swaniketan": [
        "Swaniketan Assisted Living",
        "Swaniketan Forest Trails Bhugaon",
        "2 BHK assisted care senior apartments",
        "3 BHK assisted living Pune West",
        "Swaniketan starting 79 Lakhs*",
        "MahaRERA P52100052124",
        "special care retirement homes"
    ],
    "verandah": [
        "The Verandah Duplex Homes",
        "Verandah Forest Trails Bhugaon",
        "3 BHK luxury duplex Pune West",
        "4 BHK duplex with private verandah",
        "Verandah starting 93 Lakhs*",
        "MahaRERA P52100002194"
    ],
    "orchard": [
        "Orchard Residences Bhugaon",
        "Orchard Forest Trails apartments",
        "2 BHK hillside apartments",
        "3 BHK forest view homes",
        "Orchard starting 83 Lakhs*",
        "MahaRERA P52100055710"
    ]
}

# ─── 2. UPDATE KEYWORD DOMINANCE MAP JSON ───────────────────────────────────

def update_keyword_dominance_map():
    map_path = os.path.join(BASE_DIR, "scripts", "keyword-dominance-map.json")
    data = {
        "master_township": {
            "name": "Paranjape Forest Trails",
            "location": "Bhugaon, Paud Road, Pune West 412115",
            "developer": "Paranjape Schemes (Construction) Ltd",
            "marketingPartner": "PropSmart Realty (MahaRERA Agent: A031262401295)",
            "size": "190 Acres",
            "trees": "30,000+ Indigenous Living Trees",
            "keywords": UNIVERSAL_BRAND_KEYWORDS
        },
        "clusters": {
            "misty-greens": {
                "name": "Misty Greens NA Plots",
                "typology": "Collector & PMRDA Sanctioned NA Bungalow Plots",
                "price": "₹1.23 Cr*",
                "maharera": "P52100053834",
                "keywords": ENCLAVE_KEYWORD_MATRIX["misty-greens"]
            },
            "rivolo": {
                "name": "The Rivolo Luxury Forest Villas",
                "typology": "4 & 5 BHK Independent Bespoke Forest Villas",
                "price": "₹3.89 Cr*",
                "maharera": "P52100031560",
                "keywords": ENCLAVE_KEYWORD_MATRIX["rivolo"]
            },
            "the-cove": {
                "name": "The Cove Twin Bungalows",
                "typology": "4 BHK Duet & Twin Villas",
                "price": "₹2.85 Cr*",
                "maharera": "P52100048536",
                "keywords": ENCLAVE_KEYWORD_MATRIX["the-cove"]
            },
            "the-canopy": {
                "name": "The Canopy Hillside Apartments",
                "typology": "2 & 3 BHK Nature Apartments with Valley Views",
                "price": "₹89 L*",
                "maharera": "P52100079518",
                "keywords": ENCLAVE_KEYWORD_MATRIX["the-canopy"]
            },
            "highgardens": {
                "name": "The Highgardens Terrace Homes",
                "typology": "2 & 3 BHK Stepped Terrace Apartments",
                "price": "₹89 L*",
                "maharera": "P52100053310",
                "keywords": ENCLAVE_KEYWORD_MATRIX["highgardens"]
            },
            "everglades": {
                "name": "Everglades Bavdhan",
                "typology": "1 & 2 BHK PRO Efficient Smart Homes",
                "price": "₹48.50 L*",
                "maharera": "P52100055711",
                "keywords": ENCLAVE_KEYWORD_MATRIX["everglades"]
            },
            "athashri": {
                "name": "Athashri Senior Living",
                "typology": "2 & 3 BHK Senior Citizen Living with Medical Care",
                "price": "₹83 L*",
                "maharera": "P52100077686",
                "keywords": ENCLAVE_KEYWORD_MATRIX["athashri"]
            },
            "swaniketan": {
                "name": "Swaniketan Assisted Living",
                "typology": "2 & 3 BHK Assisted Care Residences for Seniors & Differently-Abled",
                "price": "₹79 L*",
                "maharera": "P52100052124",
                "keywords": ENCLAVE_KEYWORD_MATRIX["swaniketan"]
            },
            "verandah": {
                "name": "The Verandah Duplex Homes",
                "typology": "3 & 4 BHK Luxury Duplexes with Private Verandahs",
                "price": "₹93 L*",
                "maharera": "P52100002194",
                "keywords": ENCLAVE_KEYWORD_MATRIX["verandah"]
            },
            "orchard": {
                "name": "Orchard Residences",
                "typology": "2 & 3 BHK Hillside Nature Apartments",
                "price": "₹83 L*",
                "maharera": "P52100055710",
                "keywords": ENCLAVE_KEYWORD_MATRIX["orchard"]
            }
        },
        "intent_clusters": {
            "transactional": [
                "buy NA plots in Bhugaon Pune",
                "Paranjape Forest Trails price list 2026",
                "Paranjape Forest Trails brochure pdf download",
                "Paranjape Forest Trails floor plan 2 BHK 3 BHK",
                "Paranjape Forest Trails resale flats and villas",
                "plots in Bhugaon near Chandani Chowk",
                "flats near Bavdhan under 50 lakhs",
                "luxury villas in Pune with mountain view"
            ],
            "connectivity": [
                "Chandani Chowk Flyover to Forest Trails commute time",
                "Bhugaon Paud Road Metro connectivity 2026",
                "PMRDA Ring Road Bhugaon interchange growth",
                "Forest Trails distance to Hinjewadi IT Park",
                "Forest Trails distance to Kothrud Nal Stop",
                "property near SSRVM school Bhugaon"
            ],
            "vernacular": [
                "परांजपे फॉरेस्ट ट्रेल्स भुगाव",
                "भुगावात 2BHK 3BHK फ्लॅट",
                "पुण्यात एनए प्लॉट खरेदी",
                "पुण्यात लक्झरी व्हिला",
                "पुणे में प्लॉट कीमत 2026",
                "भुगाव में 2BHK फ्लैट्स"
            ]
        }
    }

    with open(map_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("✅ Updated scripts/keyword-dominance-map.json with 2026 verified authority matrix.")

# ─── 3. INJECT & HARDEN KEYWORDS IN ALL HTML PAGES ──────────────────────────

def determine_page_keywords(rel_path, content):
    keywords = list(UNIVERSAL_BRAND_KEYWORDS)
    rel_lower = rel_path.lower()

    for k, kw_list in ENCLAVE_KEYWORD_MATRIX.items():
        if k in rel_lower or k in content.lower():
            keywords.extend(kw_list[:4])

    if "bavdhan" in rel_lower:
        keywords.extend(["property in Bavdhan", "flats near Bavdhan", "Bavdhan Pune real estate"])
    if "kothrud" in rel_lower:
        keywords.extend(["property in Kothrud", "flats near Kothrud", "Kothrud corridor property"])
    if "chandani-chowk" in rel_lower:
        keywords.extend(["Chandani Chowk property", "flats near Chandani Chowk flyover", "connectivity to Chandani Chowk"])
    if "hinjewadi" in rel_lower:
        keywords.extend(["property near Hinjewadi IT Park", "Hinjewadi commute township", "flats for IT professionals"])
    if "plots" in rel_lower or "na-plot" in rel_lower:
        keywords.extend(["NA bungalow plots Pune West", "collector sanctioned plots", "PMRDA approved plots"])
    if "villa" in rel_lower:
        keywords.extend(["luxury villas Pune", "4 BHK villas Bhugaon", "5 BHK forest villas"])
    if any(m in rel_lower for m in ["madhe", "sampurna", "pune-mein", "bhugaon-mein"]):
        keywords.extend(["परांजपे फॉरेस्ट ट्रेल्स भुगाव", "भुगावात फ्लॅट", "पुण्यात एनए प्लॉट", "पुणे में प्लॉट"])

    # Deduplicate while preserving order
    seen = set()
    deduped = []
    for kw in keywords:
        kw_clean = kw.strip()
        if kw_clean.lower() not in seen:
            seen.add(kw_clean.lower())
            deduped.append(kw_clean)

    return ", ".join(deduped[:25])

def harden_html_keywords():
    html_files = [f for f in glob.glob("**/*.html", recursive=True) if not f.startswith(('scripts/', 'scratch/', 'dist/', '.gemini/', 'node_modules/'))]
    print(f"Discovered {len(html_files)} production HTML files for keyword hardening.")

    injected_count = 0
    updated_count = 0
    cleaned_syntax_count = 0

    for fpath in html_files:
        rel = os.path.relpath(fpath, BASE_DIR).replace('\\', '/')
        if rel.startswith(('googlef', 'components/')):
            continue

        with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        file_modified = False

        # Fix broken syntax like `Paranjape Blue Ridge">>`
        if '">>' in content:
            content = content.replace('">>', '">')
            file_modified = True
            cleaned_syntax_count += 1

        # Determine target keywords for this page
        page_kws = determine_page_keywords(rel, content)

        # 1. Update or Inject <meta name="keywords">
        kw_match = re.search(r'<meta\s+name=[\'"]keywords[\'"]\s+content=[\'"](.*?)[\'"]\s*/?>', content, re.IGNORECASE)
        if kw_match:
            existing_kw = kw_match.group(1)
            # Ensure universal brand keywords are present
            if "Paranjape Forest Trails" not in existing_kw:
                new_kw_tag = f'<meta name="keywords" content="{page_kws}">'
                content = content.replace(kw_match.group(0), new_kw_tag, 1)
                file_modified = True
                updated_count += 1
        else:
            # Inject meta keywords right after <title> or <meta name="description">
            kw_tag = f'\n  <meta name="keywords" content="{page_kws}">'
            if '<meta name="description"' in content:
                content = re.sub(r'(<meta name="description"[^>]*>)', r'\1' + kw_tag, content, count=1, flags=re.IGNORECASE)
                file_modified = True
                injected_count += 1
            elif '<title>' in content:
                content = re.sub(r'(</title>)', r'\1' + kw_tag, content, count=1, flags=re.IGNORECASE)
                file_modified = True
                injected_count += 1

        # 2. Check JSON-LD Schemas for Schema.org "keywords"
        # If RealEstateProject schema exists and lacks "keywords" property, inject it
        if '"@type": "RealEstateProject"' in content and '"keywords":' not in content:
            schema_target = '"@type": "RealEstateProject",'
            kw_json = f'"@type": "RealEstateProject",\n      "keywords": "{page_kws}",'
            content = content.replace(schema_target, kw_json, 1)
            file_modified = True

        # 3. Ensure Price Asterisk compliance: ₹XX L* or ₹XX Cr*
        price_pattern = re.compile(r'(₹\s*\d+(?:\.\d+)?\s*(?:Crores?|Lakhs?|Cr|L)\b)(?!\*)', re.IGNORECASE)
        new_content, n_prices = price_pattern.subn(r'\1*', content)
        if n_prices > 0:
            content = new_content
            file_modified = True

        if file_modified:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)

    print(f"✅ HTML Keyword Hardening Complete:")
    print(f"  • Pages with Meta Keywords newly injected: {injected_count}")
    print(f"  • Pages with Meta Keywords updated/augmented: {updated_count}")
    print(f"  • Pages with syntax errors fixed: {cleaned_syntax_count}")

# ─── 4. REGENERATE CLIENT-SIDE SEARCH INDEX ─────────────────────────────────

def regenerate_search_index():
    print("\n🔍 Regenerating client-side search-index.json...")
    script_path = os.path.join(BASE_DIR, "scripts", "generate-search-index.js")
    if os.path.exists(script_path):
        res = subprocess.run(["node", script_path], capture_output=True, text=True)
        print(f"  {res.stdout.strip()}")

# ─── MAIN ───────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=====================================================================")
    print(" 🚀 STARTING ENTERPRISE KEYWORD ECOSYSTEM HARDENING & INJECTION")
    print("=====================================================================")
    update_keyword_dominance_map()
    harden_html_keywords()
    regenerate_search_index()
    print("=====================================================================")
    print(" ✅ ENTERPRISE KEYWORD ECOSYSTEM HARDENING COMPLETE!")
    print("=====================================================================")
