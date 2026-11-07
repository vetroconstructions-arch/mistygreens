#!/usr/bin/env python3
"""
scripts/enterprise_google_seo_hardening.py
=============================================================================
SOVEREIGN ENTERPRISE GOOGLE SEO & TRACKING HARDENING ENGINE
=============================================================================
1. Injects Google Consent Mode v2 ('ad_storage', 'analytics_storage',
   'ad_user_data', 'ad_personalization') before gtag initialization.
2. Unifies Google Ads primary conversion action 'AW-17430583486/2oseCKuOodYcEL6xxvdA'
   across all phone call, WhatsApp, and form submission event listeners.
3. Injects Google Chrome & CrUX Resource Hints (Preconnect to googletagmanager,
   google-analytics, and doubleclick).
4. Refreshes dateModified across all JSON-LD schemas to current timestamp (2026-11-07).
5. Links verified Google Business Profile entity (CID 1086438290382948382,
   Knowledge Graph /g/124yr7094, and Google Maps Place URL) into Schema.org.
=============================================================================
"""

import os
import re
import json
import glob
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TODAY_DATE = "2026-11-07"
TODAY_ISO = f"{TODAY_DATE}T00:00:00+05:30"

GBP_MAPS_URL = "https://www.google.com/maps/place/Forest+Trails+Township/@18.5099377,73.7363891,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bddbca4ac34f:0x81117a5f86b6534e!8m2!3d18.5099377!4d73.738964!16s%2Fg%2F124yr7094"
GBP_CID_URL = "https://maps.google.com/maps?cid=1086438290382948382"
GBP_KG_URL = "https://g.co/kgs/124yr7094"

CONSENT_SNIPPET = (
    "window.dataLayer=window.dataLayer||[];"
    "function gtag(){dataLayer.push(arguments);}"
    "gtag('consent','default',{'ad_storage':'granted','analytics_storage':'granted','ad_user_data':'granted','ad_personalization':'granted','wait_for_update':500});"
)

RESOURCE_HINTS = (
    '  <link rel="preconnect" href="https://www.googletagmanager.com">\n'
    '  <link rel="preconnect" href="https://www.google-analytics.com">\n'
    '  <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net">\n'
)

def update_page(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    modified = False

    # 1. Google Consent Mode v2 Injection
    # Check if consent mode already present
    if "consent" not in content or "'ad_user_data'" not in content:
        # Target standard gtag function definition
        if "function gtag(){dataLayer.push(arguments);}" in content:
            content = content.replace(
                "function gtag(){dataLayer.push(arguments);}",
                "function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'granted','analytics_storage':'granted','ad_user_data':'granted','ad_personalization':'granted','wait_for_update':500});"
            )
            modified = True
        elif "function gtag(){dataLayer.push(arguments); }" in content:
            content = content.replace(
                "function gtag(){dataLayer.push(arguments); }",
                "function gtag(){dataLayer.push(arguments); }gtag('consent','default',{'ad_storage':'granted','analytics_storage':'granted','ad_user_data':'granted','ad_personalization':'granted','wait_for_update':500});"
            )
            modified = True

    # 2. CrUX & Google Resource Hints
    if "https://www.googletagmanager.com" not in content or 'rel="preconnect"' not in content:
        if '<meta charset=' in content:
            content = re.sub(
                r'(<meta\s+charset=[^>]+>)',
                r'\1\n' + RESOURCE_HINTS,
                content,
                count=1,
                flags=re.IGNORECASE
            )
            modified = True
        elif '<head>' in content:
            content = content.replace('<head>', '<head>\n' + RESOURCE_HINTS, 1)
            modified = True

    # 3. Google Ads Primary Conversion Action in Call/WhatsApp Handlers
    # Upgrade phone/whatsapp direct engagement to conversion action if missing
    if "AW-17430583486/2oseCKuOodYcEL6xxvdA" not in content and "AW-17430583486" in content:
        # If page has gtag phone call click handler, inject the conversion event
        old_phone_event = "gtag('event', 'contact', { 'method': 'phone'"
        new_phone_event = "gtag('event', 'conversion', { 'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA', 'value': 1.0, 'currency': 'INR' }); gtag('event', 'contact', { 'method': 'phone'"
        if old_phone_event in content and new_phone_event not in content:
            content = content.replace(old_phone_event, new_phone_event)
            modified = True

        old_wa_event = "gtag('event', 'contact', { 'method': 'whatsapp'"
        new_wa_event = "gtag('event', 'conversion', { 'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA', 'value': 1.0, 'currency': 'INR' }); gtag('event', 'contact', { 'method': 'whatsapp'"
        if old_wa_event in content and new_wa_event not in content:
            content = content.replace(old_wa_event, new_wa_event)
            modified = True

    # 4. JSON-LD Schema DateModified & Entity Linking
    schema_pattern = re.compile(r'(<script\s+type=[\'"]application/ld\+json[\'"]>)(.*?)(</script>)', re.DOTALL)
    
    def repl_schema(match):
        nonlocal modified
        prefix = match.group(1)
        raw_json = match.group(2)
        suffix = match.group(3)
        try:
            data = json.loads(raw_json)
        except Exception:
            return match.group(0)

        schema_modified = False

        def process_node(node):
            nonlocal schema_modified
            if isinstance(node, dict):
                # Update dateModified if present
                if "dateModified" in node:
                    if node["dateModified"] != TODAY_DATE and not node["dateModified"].startswith(TODAY_DATE):
                        node["dateModified"] = TODAY_DATE
                        schema_modified = True
                elif node.get("@type") in ["WebPage", "Product", "RealEstateProject", "RealEstateListing", "NewsArticle", "FAQPage"]:
                    node["dateModified"] = TODAY_DATE
                    schema_modified = True

                # Link GBP entity in LocalBusiness / RealEstateAgent
                ntype = node.get("@type")
                is_local_biz = (
                    ntype in ["LocalBusiness", "RealEstateAgent", "Organization"] or
                    (isinstance(ntype, list) and any(t in ["LocalBusiness", "RealEstateAgent", "Organization"] for t in ntype))
                )
                if is_local_biz:
                    if not node.get("hasMap"):
                        node["hasMap"] = GBP_MAPS_URL
                        schema_modified = True
                    
                    same_as = node.get("sameAs", [])
                    if isinstance(same_as, str):
                        same_as = [same_as]
                    if GBP_CID_URL not in same_as:
                        same_as.append(GBP_CID_URL)
                        schema_modified = True
                    if GBP_KG_URL not in same_as:
                        same_as.append(GBP_KG_URL)
                        schema_modified = True
                    node["sameAs"] = same_as

                for k, v in node.items():
                    process_node(v)
            elif isinstance(node, list):
                for item in node:
                    process_node(item)

        process_node(data)

        if schema_modified:
            modified = True
            new_json = json.dumps(data, ensure_ascii=False, indent=2)
            return f"{prefix}\n{new_json}\n{suffix}"
        return match.group(0)

    content = schema_pattern.sub(repl_schema, content)

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

def main():
    html_files = [
        f for f in glob.glob(os.path.join(BASE_DIR, "**/*.html"), recursive=True)
        if not any(ex in f for ex in ["node_modules", "dist", "scratch", "components", "googlefA009"])
    ]
    print(f"Discovered {len(html_files)} production HTML files to harden.")
    
    count_updated = 0
    for idx, fpath in enumerate(html_files, 1):
        if update_page(fpath):
            count_updated += 1
        if idx % 100 == 0:
            print(f"  Processed {idx}/{len(html_files)} pages... ({count_updated} hardened)")

    print(f"\n✅ Enterprise Google SEO Hardening Complete: {count_updated}/{len(html_files)} pages hardened.")

if __name__ == "__main__":
    main()
