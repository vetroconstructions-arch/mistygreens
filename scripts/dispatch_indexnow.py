#!/usr/bin/env python3
"""
scripts/dispatch_indexnow.py
===================================================
SOVEREIGN CLOUDFLARE & FEDERATED SEARCH INDEXNOW DISPATCHER
===================================================
Dispatches instant URL indexing notifications with the verified global key
to Bing, Yandex, Seznam, Naver, and IndexNow API endpoints for ALL canonical pages.
"""
import os
import json
import glob
import urllib.request
import urllib.error

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
HOST = "www.paranjapetownship.com"
KEY = "c4d1685458394e80820063db1a48c6fb"
KEY_LOCATION = f"{DOMAIN}/{KEY}.txt"

# 1. Ensure verification key file exists in repository root
key_file_path = os.path.join(BASE, f"{KEY}.txt")
with open(key_file_path, "w", encoding="utf-8") as f:
    f.write(KEY + "\n")
print(f"✓ Verified IndexNow Global Key File: /{KEY}.txt")

# 2. Collect all canonical HTML page URLs
canonical_urls = set()
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'scripts', '.wrangler', 'dist', 'scratch', '.gemini', 'components'}]
    for fname in files:
        if fname == 'index.html':
            rel = os.path.relpath(root, BASE).replace('\\', '/')
            if rel == '.':
                canonical_urls.add(f"{DOMAIN}/")
            else:
                canonical_urls.add(f"{DOMAIN}/{rel}/")
        elif fname.endswith('.html') and fname not in ['404.html', 'thank-you.html'] and not fname.startswith('google'):
            rel = os.path.relpath(os.path.join(root, fname), BASE).replace('\\', '/')
            canonical_urls.add(f"{DOMAIN}/{rel}")

sorted_urls = sorted(list(canonical_urls))
print(f"✓ Discovered {len(sorted_urls)} canonical URLs for IndexNow syndication.")

payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOCATION,
    "urlList": sorted_urls
}

# Write payload file
output_submission = os.path.join(BASE, "indexnow_payload.json")
with open(output_submission, "w", encoding="utf-8") as f:
    f.write(json.dumps(payload, indent=2))
print("✓ Written full syndication payload to indexnow_payload.json")

# 3. Dispatch to IndexNow endpoints
ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow"
]

data = json.dumps(payload).encode('utf-8')

for endpoint in ENDPOINTS:
    try:
        req = urllib.request.Request(
            endpoint,
            data=data,
            headers={
                "Content-Type": "application/json; charset=utf-8",
                "User-Agent": "ParanjapeEnterpriseIndexer/3.0"
            }
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            status = response.getcode()
            print(f"  ⚡ IndexNow [{endpoint}]: HTTP {status} (Accepted for crawling)")
    except urllib.error.HTTPError as e:
        print(f"  ⚠️ IndexNow [{endpoint}] HTTP {e.code}: {e.reason}")
    except Exception as e:
        print(f"  ℹ️ IndexNow [{endpoint}] Network Notice: {e}")

print("✅ IndexNow Global Key Dispatch Complete.")
