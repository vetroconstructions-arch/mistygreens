#!/usr/bin/env python3
"""
CROSS-INTERLINKING MESH INJECTOR
================================
Injects contextual links to the 4 High-Converting Hubs and Brand Pages across:
  - Locality Pages (/property-in-*-pune/)
  - BHK Permutation Pages (/2bhk-near-*/, etc.)
  - Brand Intent Pages
"""
import os, re, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INTERLINK_BLOCK = """
<div style="background:#f4ece1;border:1px solid #D4AF37;border-radius:8px;padding:1.2rem;margin:1.8rem 0">
  <p style="margin:0 0 .6rem;font-weight:700;color:#4A0808">Essential Real Estate & Investor Resources:</p>
  <div style="display:flex;flex-wrap:wrap;gap:.8rem;font-size:.9rem">
    <a href="/nri-property-pune-west/" style="color:#4A0808;font-weight:600">🌐 NRI Property & FEMA Guide</a> &bull;
    <a href="/senior-living-pune-west/" style="color:#4A0808;font-weight:600">🏡 Senior Living (Athashri)</a> &bull;
    <a href="/property-vs-stocks-vs-gold-pune/" style="color:#4A0808;font-weight:600">📊 Real Estate vs Stocks ROI</a> &bull;
    <a href="/rera-status-forest-trails/" style="color:#4A0808;font-weight:600">🛡️ MahaRERA Status Tracker</a> &bull;
    <a href="/paranjape-forest-trails-bhugaon-price-2026/" style="color:#4A0808;font-weight:600">💰 2026 Price List</a> &bull;
    <a href="/pune-real-estate-2026/" style="color:#4A0808;font-weight:600">📍 Pune Real Estate Overview</a>
  </div>
</div>
"""

updated = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        rel = os.path.relpath(fpath, BASE).replace('\\', '/')
        if rel in ['index.html', '404.html', 'thank-you.html']:
            continue
        
        # Target locality, bhk, brand intent, blog pages
        if any(rel.startswith(prefix) for prefix in [
            'property-in-', '2bhk-', '3bhk-', '4bhk-', '5bhk-',
            'flats-', 'paranjape-', 'luxury-', 'na-plot-', 'weekend-home'
        ]):
            try:
                content = open(fpath, encoding='utf-8', errors='ignore').read()
                if "Essential Real Estate & Investor Resources:" in content:
                    continue
                
                if "</main>" in content:
                    new_content = content.replace("</main>", INTERLINK_BLOCK + "\n</main>", 1)
                    open(fpath, 'w', encoding='utf-8').write(new_content)
                    updated += 1
                elif "</footer>" in content:
                    new_content = content.replace("</footer>", INTERLINK_BLOCK + "\n</footer>", 1)
                    open(fpath, 'w', encoding='utf-8').write(new_content)
                    updated += 1
            except Exception as e:
                print(f"Error on {fpath}: {e}")

print(f"✓ Injected cross-interlink mesh on {updated} high-intent pages!")
