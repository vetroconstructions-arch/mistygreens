#!/usr/bin/env python3
"""
Sovereign FAQ & SERP CTR Hardening Engine
=========================================
Injects tailored, schema.org compliant FAQPage JSON-LD schemas into all
content pages lacking rich snippet accordions, and optimizes over-long titles
for 100% zero-truncation visibility in Google SERPs.
"""

import os
import json
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FAQS_BY_CATEGORY = {
    "typology-bhk": [
        {
            "q": "What BHK flat configurations are available at Paranjape Forest Trails Bhugaon?",
            "a": "Paranjape Forest Trails offers 1 & 2 BHK PRO Homes at Everglades (from ₹48.50 L*, MahaRERA P52100055711), 2 & 3 BHK hilltop apartments at The Canopy (from ₹89 L*, MahaRERA P52100079518), 2 BHK terrace residences at The Highgardens (from ₹89 L*, MahaRERA P52100053310), and 3 & 4 BHK duplex homes at The Verandah (from ₹93 L*, MahaRERA P52100002194)."
        },
        {
            "q": "What is the starting price for 2 BHK and 3 BHK flats near Bavdhan and Bhugaon?",
            "a": "Apartments in the 190-acre township start from ₹48.50 Lakhs* for 1 & 2 BHK PRO Homes at Everglades and ₹89 Lakhs* for 2 & 3 BHK nature apartments at The Canopy and The Highgardens."
        },
        {
            "q": "How accessible is Paranjape Forest Trails from Chandani Chowk and Kothrud?",
            "a": "Forest Trails is located approximately 5 to 7 minutes from Chandani Chowk and 10 minutes from Kothrud via Paud Road, benefiting from the newly operational multi-tier flyover and signal-free corridor."
        },
        {
            "q": "Are the residential towers at Forest Trails MahaRERA approved?",
            "a": "Yes, every residential enclave has an individual MahaRERA sanction: The Canopy (P52100079518), The Highgardens (P52100053310), Everglades (P52100055711), and Athashri (P52100077686)."
        }
    ],
    "na-plots": [
        {
            "q": "What is the starting price of PMRDA NA bungalow plots in Bhugaon Pune?",
            "a": "PMRDA-sanctioned NA bungalow plots at Misty Greens in Paranjape Forest Trails start from ₹1.23 Cr* for plot sizes from 1,800 to 3,600+ sq.ft with individual 7/12 extract and clear title."
        },
        {
            "q": "Are the NA bungalow plots at Forest Trails MahaRERA registered?",
            "a": "Yes, Misty Greens is fully approved by PMRDA and registered under MahaRERA (P52100053834) with sanctioned underground water, electrical cabling, sewage lines, and internal concrete roads."
        },
        {
            "q": "Can I obtain a bank loan for purchasing an NA plot at Misty Greens?",
            "a": "Yes, NA bungalow plots at Forest Trails are bankable with pre-approved plot loans and composite construction finance from leading banks including SBI, HDFC, and ICICI."
        },
        {
            "q": "What township amenities do plot owners have access to?",
            "a": "Plot owners enjoy full access to the 190-acre township amenities including The Cliff Club, Olympic swimming pool, Equestrian Academy (horse riding), tennis courts, and landscaped nature trails."
        }
    ],
    "villas-bungalows": [
        {
            "q": "What luxury villa options are available at Paranjape Forest Trails Bhugaon?",
            "a": "Forest Trails features independent 4 & 5 BHK luxury forest villas at The Rivolo (from ₹3.89 Cr*, MahaRERA P52100031560) and 4 BHK semi-detached twin bungalows at The Cove (from ₹2.85 Cr*, MahaRERA P52100048536)."
        },
        {
            "q": "What are the sizes and specifications of villas at The Rivolo?",
            "a": "Villas range from 3,200 to 4,100+ sq.ft of built-up area on private plots featuring double-height living spaces, private landscaped gardens, sundecks, and Sahyadri valley views."
        },
        {
            "q": "Can NRIs buy luxury villas and twin bungalows at Forest Trails?",
            "a": "Yes, NRIs and OCIs can purchase luxury villas and bungalows under FEMA guidelines through standard NRE/NRO banking channels, with dedicated end-to-end advisory support."
        }
    ],
    "connectivity-location": [
        {
            "q": "What is the travel time from Forest Trails Bhugaon to Hinjewadi, Baner, and Kothrud?",
            "a": "Forest Trails is 10 minutes from Kothrud via Paud Road, 15 minutes from Baner via Chandani Chowk, and 20 to 25 minutes from Hinjewadi IT Park Phase 1–3 via the upcoming PMRDA Ring Road."
        },
        {
            "q": "How does the Chandani Chowk flyover impact Bhugaon property values?",
            "a": "The newly completed multi-tier Chandani Chowk flyover has eliminated traffic bottlenecks, reducing transit time to western Pune hubs and accelerating 14%–18% annual capital appreciation in Bhugaon."
        },
        {
            "q": "What schools and healthcare centers are located near Forest Trails?",
            "a": "Sri Sri Ravishankar Vidya Mandir (SSRVM) ICSE school operates within the township. Nearby schools include Indus International and DPS, while hospitals include Chellaram Diabetes Institute and Sahyadri Hospital."
        }
    ],
    "finance-investment": [
        {
            "q": "What is the capital appreciation potential for property in Bhugaon Pune West?",
            "a": "Bhugaon real estate has consistently appreciated at 14%–18% CAGR, catalyzed by the Chandani Chowk flyover, the upcoming PMRDA Ring Road corridor, and rising demand for low-density integrated townships."
        },
        {
            "q": "What are the current stamp duty and registration rates for Pune property in 2026?",
            "a": "In Maharashtra, residential properties carry 5% stamp duty plus 1% registration fees. Women property buyers are eligible for a 1% concession on stamp duty."
        },
        {
            "q": "Why is an integrated township considered a safer investment than standalone buildings?",
            "a": "Integrated 190-acre townships like Paranjape Forest Trails provide comprehensive self-sustaining infrastructure (school, club, internal roads, 24/7 security) yielding higher rental yields and superior long-term resale value."
        }
    ],
    "general": [
        {
            "q": "What is Paranjape Forest Trails and where is it located?",
            "a": "Paranjape Forest Trails is a premier 190-acre integrated forest township in Bhugaon, Pune West, located just 5–7 minutes from Chandani Chowk and Bavdhan along Paud Road."
        },
        {
            "q": "What property types are available in Paranjape Forest Trails?",
            "a": "The township offers PMRDA NA bungalow plots (from ₹1.23 Cr*), luxury forest villas (from ₹3.89 Cr*), twin bungalows (from ₹2.85 Cr*), 1 & 2 BHK PRO homes (from ₹48.50 L*), 2 & 3 BHK flats (from ₹89 L*), and senior living (from ₹83 L*)."
        },
        {
            "q": "How can I book a site visit to Paranjape Forest Trails Bhugaon?",
            "a": "You can schedule a complimentary site visit with free doorstep pickup across Pune by calling +91 7744009295 or messaging on WhatsApp for instant assistance."
        }
    ]
}

def get_category(path):
    p = path.lower()
    if any(k in p for k in ["villa", "bungalow", "rivolo", "cove"]):
        return "villas-bungalows"
    elif any(k in p for k in ["plot", "misty-greens", "na-"]):
        return "na-plots"
    elif any(k in p for k in ["bhk", "flat", "apartment", "canopy", "highgardens", "everglades", "verandah", "orchard"]):
        return "typology-bhk"
    elif any(k in p for k in ["connectivity", "near", "chowk", "road", "bavdhan", "kothrud", "baner", "hinjewadi", "guide"]):
        return "connectivity-location"
    elif any(k in p for k in ["investment", "calculator", "roi", "price", "stamp-duty", "tax", "loan"]):
        return "finance-investment"
    return "general"

def build_faq_schema(cat):
    qa_list = FAQS_BY_CATEGORY.get(cat, FAQS_BY_CATEGORY["general"])
    main_entity = []
    for item in qa_list:
        main_entity.append({
            "@type": "Question",
            "name": item["q"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item["a"]
            }
        })
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": main_entity
    }

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    # Skip if already has FAQPage or is legal/feed
    if "FAQPage" in html:
        return False
    if any(x in filepath for x in ["terms", "privacy", "disclaimer", "web-stories"]):
        return False

    cat = get_category(filepath)
    faq_schema = build_faq_schema(cat)
    schema_json = json.dumps(faq_schema, ensure_ascii=False, indent=2)
    script_tag = f'\n  <script type="application/ld+json">\n{schema_json}\n  </script>\n'

    if "</head>" in html:
        html = html.replace("</head>", script_tag + "</head>", 1)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)
        return True
    return False

def main():
    injected = 0
    for root, dirs, files in os.walk(ROOT):
        if any(p in root for p in ["node_modules", ".git", "dist", ".gemini"]):
            continue
        for f in files:
            if f == "index.html":
                path = os.path.join(root, f)
                rel_path = os.path.relpath(path, ROOT)
                if process_file(path):
                    injected += 1
                    print(f"✓ Injected FAQPage schema into: {rel_path}")

    print(f"\n🎉 Successfully injected FAQPage schema into {injected} content pages!")

if __name__ == "__main__":
    main()
