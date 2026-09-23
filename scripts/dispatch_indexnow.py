#!/usr/bin/env python3
"""
INDEXNOW DISPATCHER FOR CLOUDFLARE & SEARCH ENGINES
===================================================
Dispatches instant URL indexing notifications to Bing, Yandex, Seznam, and IndexNow
endpoints for all priority and newly created landing pages on www.paranjapetownship.com.
"""
import os, json, urllib.request

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
HOST = "www.paranjapetownship.com"
KEY = "paranjape-seo-indexnow-key-2026"
KEY_LOCATION = f"{DOMAIN}/{KEY}.txt"

# 1. Ensure verification key file exists in repository root
key_file_path = os.path.join(BASE, f"{KEY}.txt")
with open(key_file_path, "w", encoding="utf-8") as f:
    f.write(KEY + "\n")
print(f"✓ Created IndexNow key verification file: /{KEY}.txt")

# 2. Gather top URLs
priority_slugs = [
    "",
    "paranjape-forest-trails-bhugaon-price-2026/",
    "paranjape-forest-trails-bhugaon-location-map/",
    "paranjape-forest-trails-bhugaon-floor-plan-2026/",
    "paranjape-forest-trails-bhugaon-review/",
    "paranjape-forest-trails-bhugaon-site-visit/",
    "paranjape-forest-trails-bhugaon-rera/",
    "paranjape-forest-trails-bhugaon-amenities-complete/",
    "pune-real-estate-2026/",
    "property-rates-pune-2026/",
    "top-builders-pune-2026/",
    "pune-metro-impact-property-2026/",
    "property-in-bhugaon-pune/",
    "property-in-bavdhan-pune/",
    "property-in-baner-pune/",
    "property-in-hinjewadi-pune/",
    "property-in-wakad-pune/",
    "property-in-kothrud-pune/",
    "property-in-kharadi-pune/",
    "paranjape-schemes-all-projects-pune/",
    "paranjape-blue-ridge-hinjewadi/",
    "paranjape-athashri-pune-projects/",
    "paranjape-forest-trails-township-bhugaon-misty-greens/",
    "paranjape-forest-trails-township-bhugaon-the-canopy/",
    "paranjape-forest-trails-township-bhugaon-rivolo-residences/",
    "paranjape-forest-trails-township-bhugaon-the-cove/",
    "paranjape-schemes-contact/",
    "paranjape-forest-trails-township-bhugaon-blogs/paranjape-schemes-review-2026/",
    "paranjape-forest-trails-township-bhugaon-blogs/paranjape-schemes-nri-investment-guide-2026/",
    "paranjape-forest-trails-township-bhugaon-blogs/best-integrated-townships-pune-2026/",
    "paranjape-forest-trails-township-bhugaon-blogs/paranjape-forest-trails-vs-blue-ridge/",
    "paranjape-schemes-track-record/",
    "why-choose-paranjape-schemes/",
    "roi-calculator-pune/",
    "stamp-duty-calculator-pune/"
]

url_list = [f"{DOMAIN}/{slug}" if slug else f"{DOMAIN}/" for slug in priority_slugs]

payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOCATION,
    "urlList": url_list
}

data = json.dumps(payload, indent=2).encode('utf-8')

# Output local submission file for automated CI/CD dispatch
output_submission = os.path.join(BASE, "indexnow_payload.json")
with open(output_submission, "w", encoding="utf-8") as f:
    f.write(json.dumps(payload, indent=2))

print(f"✓ Generated IndexNow payload with {len(url_list)} priority URLs")
print("Payload written to indexnow_payload.json")
