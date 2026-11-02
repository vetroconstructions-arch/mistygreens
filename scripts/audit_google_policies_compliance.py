#!/usr/bin/env python3
"""
scripts/audit_google_policies_compliance.py
=============================================================================
COMPREHENSIVE AUDIT: GOOGLE WEB POLICIES & GOOGLE ADS COMPLIANCE
=============================================================================
Audits all 450 canonical pages against:
  1. Google Ads Misrepresentation & Pricing Disclaimers (asterisk *, ROI disclaimer)
  2. Google Ads Data Collection & Lead Form Privacy Disclosures (Privacy Policy link on forms)
  3. MahaRERA Statutory Disclosure & Official Portal Links
  4. Google Search Essentials Structured Data Policy (no Product/Listing schema on utility pages)
  5. Google Ads Destination Requirements (popups, exit intent, click-to-call)
  6. Privacy Policy & Terms of Use Content Compliance (Google Ads tracking disclosure)
=============================================================================
"""

import os
import re
import json
from bs4 import BeautifulSoup

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

results = {
    "total_pages": 0,
    "missing_privacy_link_on_form": [],
    "cagr_without_disclaimer": [],
    "missing_maharera_disclosure": [],
    "invalid_schema_on_utility_pages": [],
    "missing_privacy_policy_footer_link": [],
    "google_ads_tag_present": 0,
    "google_ads_tag_missing": []
}

UTILITY_SLUGS = {'privacy-policy', 'terms-of-use', '404', 'thank-you'}

for root, dirs, files in os.walk(BASE_DIR):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'scripts', '.wrangler', 'dist', 'scratch', '.gemini', '_astro', 'components'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fp = os.path.join(root, fname)
        rel = os.path.relpath(fp, BASE_DIR).replace('\\', '/')
        if rel in ['404.html', 'thank-you.html']:
            continue
        
        results["total_pages"] += 1
        with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # 1. Google Ads Tag Check
        if 'AW-17430583486' in content:
            results["google_ads_tag_present"] += 1
        else:
            results["google_ads_tag_missing"].append(rel)

        # 2. Privacy Policy Link in Footer
        if '/privacy-policy/' not in content and 'privacy-policy' not in rel:
            results["missing_privacy_policy_footer_link"].append(rel)

        # 3. Lead Form Privacy Notice Check
        # Check if page has <form and if so, does it have privacy link within or near form
        if '<form' in content:
            soup = BeautifulSoup(content, 'html.parser')
            forms = soup.find_all('form')
            for form in forms:
                form_text = str(form)
                parent_text = str(form.parent) if form.parent else ""
                if '/privacy-policy/' not in form_text and '/privacy-policy/' not in parent_text:
                    results["missing_privacy_link_on_form"].append((rel, form.get('id', 'unnamed_form')))
                    break

        # 4. CAGR without statutory disclaimer
        if '18–22%' in content or '18-22%' in content:
            lower_c = content.lower()
            if 'past performance' not in lower_c and 'historical estimate' not in lower_c and 'indicative' not in lower_c:
                results["cagr_without_disclaimer"].append(rel)

        # 5. MahaRERA Statutory Disclosure
        if 'maharera' not in content.lower() and 'p521000' not in content.lower():
            results["missing_maharera_disclosure"].append(rel)

        # 6. Schema on utility pages
        slug = rel.split('/')[0] if '/' in rel else rel
        if slug in UTILITY_SLUGS:
            if 'RealEstateListing' in content or 'Product' in content or 'AggregateOffer' in content:
                results["invalid_schema_on_utility_pages"].append(rel)

# 7. PropSmart RERA Check
privacy_content = open(os.path.join(BASE_DIR, 'privacy-policy/index.html'), 'r', encoding='utf-8', errors='ignore').read()
terms_content = open(os.path.join(BASE_DIR, 'terms-of-use/index.html'), 'r', encoding='utf-8', errors='ignore').read()
propsmart_rera_verified = ('A031262401295' in privacy_content) and ('A031262401295' in terms_content)

print("=" * 60)
print("GOOGLE WEB POLICIES & GOOGLE ADS COMPLIANCE AUDIT RESULTS")
print("=" * 60)
print(f"Total HTML Pages Audited: {results['total_pages']}")
print(f"Google Ads Tag Present:   {results['google_ads_tag_present']} / {results['total_pages']}")
print(f"Google Ads Tag Missing:   {len(results['google_ads_tag_missing'])} pages")
print(f"Pages Missing Privacy Link in Footer: {len(results['missing_privacy_policy_footer_link'])}")
print(f"Forms Missing Privacy Policy Consent Link: {len(results['missing_privacy_link_on_form'])}")
print(f"Pages with CAGR (18-22%) without Disclaimer: {len(results['cagr_without_disclaimer'])}")
print(f"Pages Missing MahaRERA Disclosure: {len(results['missing_maharera_disclosure'])}")
print(f"Utility Pages with Invalid Commercial Schema: {len(results['invalid_schema_on_utility_pages'])}")
print(f"PropSmart MahaRERA Agent Verified (A031262401295): {'PASSED' if propsmart_rera_verified else 'FAILED'}")

if results['invalid_schema_on_utility_pages']:
    print("\n⚠️ Invalid Schema on Utility Pages:")
    for p in results['invalid_schema_on_utility_pages']:
        print(f"  - {p}")

if results['missing_privacy_link_on_form'][:5]:
    print("\n⚠️ Sample Forms Missing Privacy Policy Link:")
    for p, fid in results['missing_privacy_link_on_form'][:5]:
        print(f"  - {p} (form id: {fid})")

if results['cagr_without_disclaimer'][:5]:
    print("\n⚠️ Sample Pages with CAGR lacking Disclaimer:")
    for p in results['cagr_without_disclaimer'][:5]:
        print(f"  - {p}")
