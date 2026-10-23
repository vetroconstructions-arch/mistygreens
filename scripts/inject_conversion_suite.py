#!/usr/bin/env python3
"""
INJECT CONVERSION SUITE & COST VISUALIZER INTO PAGES
===================================================
1. Injects exit-intent-concierge.js into all key landing pages and enclave pages.
2. Injects Interactive Cost Visualizer CTA card into the 10 core enclave pages.
"""

import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ENCLAVE_PAGES = {
    'paranjape-forest-trails-township-bhugaon-misty-greens/index.html': 'misty-greens',
    'paranjape-forest-trails-township-bhugaon-rivolo-residences/index.html': 'rivolo',
    'paranjape-forest-trails-township-bhugaon-the-cove/index.html': 'the-cove',
    'paranjape-forest-trails-township-bhugaon-the-canopy/index.html': 'the-canopy',
    'paranjape-forest-trails-township-bhugaon-highgardens/index.html': 'highgardens',
    'paranjape-forest-trails-township-bhugaon-everglades/index.html': 'everglades',
    'paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/index.html': 'athashri',
    'paranjape-forest-trails-township-bhugaon-orchard-residences/index.html': 'orchard',
    'paranjape-forest-trails-township-bhugaon-swaniketan/index.html': 'swaniketan',
    'paranjape-forest-trails-township-bhugaon-verandah/index.html': 'verandah'
}

def create_calc_card(slug):
    return f'''
<!-- Interactive Enclave Cost & EMI Visualizer CTA Banner -->
<section style="background: linear-gradient(135deg, rgba(74,8,8,0.3) 0%, rgba(212,175,55,0.15) 100%); border: 1.5px solid #D4AF37; padding: 2rem 1.5rem; border-radius: 18px; margin: 2.5rem auto; max-width: 1200px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
  <span style="display: inline-block; background: rgba(212,175,55,0.2); color: #D4AF37; border: 1px solid #D4AF37; padding: 0.3rem 0.9rem; border-radius: 50px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;">🧮 Sovereign Financial &amp; Tax Visualizer</span>
  <h3 style="color: #ffffff; font-family: 'Playfair Display', serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); margin: 0 0 0.6rem;">Calculate Indicative Cost, Maharashtra Stamp Duty &amp; Monthly EMI</h3>
  <p style="color: rgba(255,255,255,0.85); font-size: 0.9rem; max-width: 680px; margin: 0 auto 1.4rem; line-height: 1.6;">Get an instant live breakdown of Base Agreement Value, Stamp Duty (with 1% concession for female buyers), Registration, and Bank EMI across ₹ INR, $ USD, and د.إ AED.</p>
  <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
    <button type="button" onclick="window.openCostVisualizerModal &amp;&amp; window.openCostVisualizerModal('{slug}')" style="background: linear-gradient(135deg, #6B0D0D, #8B1A1A); color: #fff; border: 1.5px solid #D4AF37; padding: 0.85rem 1.8rem; border-radius: 50px; font-weight: 800; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; box-shadow: 0 6px 20px rgba(107,13,13,0.5);">LAUNCH COST CALCULATOR &rarr;</button>
    <button type="button" onclick="window.openVipCabModal &amp;&amp; window.openVipCabModal()" style="background: #25D366; color: #fff; border: none; padding: 0.85rem 1.8rem; border-radius: 50px; font-weight: 800; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; box-shadow: 0 4px 15px rgba(37,211,102,0.4);">🚗 BOOK FREE VIP CAB VISIT</button>
  </div>
</section>
<!-- /Interactive Enclave Cost & EMI Visualizer CTA Banner -->
'''

def process():
    injected_count = 0
    card_count = 0

    # 1. First inject script tag into all html files in BASE (excluding node_modules, .git)
    for root, dirs, files in os.walk(BASE):
        dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', '.gemini', 'scratch', 'web-stories'}]
        for f in files:
            if not f.endswith('.html'):
                continue
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as fp:
                html = fp.read()

            modified = False

            # Inject script if missing
            if 'exit-intent-concierge.js' not in html and '</body>' in html:
                script_tag = '<script defer src="/exit-intent-concierge.js"></script>\n</body>'
                html = html.replace('</body>', script_tag)
                modified = True
                injected_count += 1

            # Check if enclave card should be added
            rel_path = os.path.relpath(fpath, BASE).replace('\\', '/')
            if rel_path.startswith('dist/'):
                rel_canonical = rel_path[5:]
            else:
                rel_canonical = rel_path

            if rel_canonical in ENCLAVE_PAGES and 'Interactive Enclave Cost & EMI Visualizer CTA Banner' not in html:
                slug = ENCLAVE_PAGES[rel_canonical]
                card_html = create_calc_card(slug)
                # Insert before </main> or before <!-- Internal Link Mesh
                if '</main>' in html:
                    html = html.replace('</main>', card_html + '\n</main>')
                    modified = True
                    card_count += 1
                elif '<!-- Internal Link Mesh' in html:
                    html = html.replace('<!-- Internal Link Mesh', card_html + '\n<!-- Internal Link Mesh')
                    modified = True
                    card_count += 1

            if modified:
                with open(fpath, 'w', encoding='utf-8') as fp:
                    fp.write(html)

    print(f"Total pages injected with exit-intent-concierge.js: {injected_count}")
    print(f"Total enclave pages injected with Cost Visualizer CTA Banner: {card_count}")

if __name__ == '__main__':
    process()
