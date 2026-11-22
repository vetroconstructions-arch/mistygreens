#!/usr/bin/env python3
"""
scripts/harden_homepage_knowledge_graph.py
=============================================================================
Enriches Homepage Schema:
  1. Resolves duplicate WebSite entities in Schema.org @graph.
  2. Injects authoritative Knowledge Graph sameAs entity links (Wikidata, Wikipedia, Google Maps, MahaRERA).
  3. Enriches RealEstateProject with GeoCoordinates, PostalAddress, and areaServed entities.
=============================================================================
"""

import os
import json
from bs4 import BeautifulSoup

INDEX_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "index.html")

def harden_schema():
    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")
    script = soup.find("script", type="application/ld+json")
    if not script:
        print("No JSON-LD script found!")
        return

    data = json.loads(script.string)
    graph = data.get("@graph", [])

    new_graph = []
    unified_website = None

    for node in graph:
        ntype = node.get("@type")
        
        # Merge WebSite nodes
        if ntype == "WebSite":
            if unified_website is None:
                unified_website = {
                    "@type": "WebSite",
                    "@id": "https://www.paranjapetownship.com/#website",
                    "url": "https://www.paranjapetownship.com/",
                    "name": "Paranjape Forest Trails Bhugaon",
                    "alternateName": [
                        "Paranjape Schemes Forest Trails",
                        "Forest Trails Bhugaon",
                        "Paranjape Forest Trails Township Pune"
                    ],
                    "description": "190-Acre integrated nature township in Bhugaon, Pune West offering PMRDA-sanctioned NA plots, luxury villas, and hillside apartments.",
                    "publisher": {
                        "@id": "https://www.paranjapetownship.com/#organization"
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://www.paranjapetownship.com/?q={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    }
                }
                new_graph.append(unified_website)
            continue

        # Enrich RealEstateProject with Geo, Address, AreaServed, and sameAs
        if ntype == "RealEstateProject":
            node["geo"] = {
                "@type": "GeoCoordinates",
                "latitude": 18.5050,
                "longitude": 73.7406
            }
            node["address"] = {
                "@type": "PostalAddress",
                "streetAddress": "Paud Road, Bhugaon",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "412115",
                "addressCountry": "IN"
            }
            node["areaServed"] = [
                { "@type": "AdministrativeArea", "name": "Pune", "sameAs": "https://www.wikidata.org/wiki/Q1538" },
                { "@type": "AdministrativeArea", "name": "Maharashtra", "sameAs": "https://www.wikidata.org/wiki/Q1191" },
                { "@type": "Place", "name": "Bhugaon", "sameAs": "https://en.wikipedia.org/wiki/Bhugaon" },
                { "@type": "Place", "name": "Bavdhan" },
                { "@type": "Place", "name": "Kothrud" },
                { "@type": "Place", "name": "Hinjewadi" }
            ]
            node["sameAs"] = [
                "https://maps.google.com/maps?cid=1086438290382948382",
                "https://g.co/kgs/124yr7094",
                "https://en.wikipedia.org/wiki/Bhugaon",
                "https://maharera.maharashtra.gov.in/"
            ]

        new_graph.append(node)

    data["@graph"] = new_graph
    script.string = json.dumps(data, indent=2, ensure_ascii=False)

    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        f.write(str(soup))

    print(f"Schema hardened! Graph nodes unified: {len(new_graph)} nodes.")

if __name__ == "__main__":
    harden_schema()
