#!/usr/bin/env python3
"""
Internal Link Mesh Injector v1.0
Injects contextual internal links to new keyword pages from:
- Homepage (index.html)
- Price page
- Location page
- Each enclave page
- Relevant comparison/investment pages
"""
import os, re

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

# ─── LINK BLOCKS TO INJECT ───────────────────────────────────────────────────

NEW_KEYWORD_LINKS_HTML = """
<!-- Internal Link Mesh: New Keyword Pages v1.0 -->
<section style="background:#f9f9f9;padding:2.5rem 1.5rem;margin:2rem 0;border-top:2px solid #4A0808;">
  <div style="max-width:1100px;margin:0 auto;">
    <h2 style="font-size:1.5rem;font-weight:700;color:#1a1a1a;margin-bottom:1.2rem;">
      Explore Properties by Location & Configuration
    </h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0.75rem;">
      <a href="/2bhk-in-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">2BHK in Bhugaon</a>
      <a href="/3bhk-in-pune/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">3BHK in Pune West</a>
      <a href="/3bhk-in-kothrud/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">3BHK in Kothrud</a>
      <a href="/3bhk-near-chandani-chowk/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">3BHK near Chandani Chowk</a>
      <a href="/na-plots-in-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">NA Plots in Bhugaon</a>
      <a href="/na-plots-in-pune/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">NA Plots in Pune</a>
      <a href="/plots-in-pune-west/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">Plots in Pune West</a>
      <a href="/rera-approved-plots-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">RERA Approved Plots Bhugaon</a>
      <a href="/property-in-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">Property in Bhugaon</a>
      <a href="/property-near-chandani-chowk/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">Property near Chandani Chowk</a>
      <a href="/luxury-villas-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">Luxury Villas in Bhugaon</a>
      <a href="/5bhk-villas-pune-west/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">5BHK Villas Pune West</a>
      <a href="/senior-living-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">Senior Living Bhugaon</a>
      <a href="/nri-investment-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">NRI Investment Bhugaon</a>
      <a href="/ready-to-move-flats-bavdhan/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">Ready to Move Flats Bavdhan</a>
      <a href="/under-construction-projects-bhugaon/" style="color:#4A0808;text-decoration:none;padding:0.5rem;border:1px solid #ddd;border-radius:6px;display:block;font-weight:500;">Under Construction Bhugaon</a>
    </div>
  </div>
</section>
<!-- /Internal Link Mesh -->
"""

CONNECTIVITY_LINKS_HTML = """
<!-- Internal Link: Connectivity Pages -->
<div style="margin:1.5rem 0;padding:1rem;background:#fff8f0;border-left:3px solid #4A0808;border-radius:4px;">
  <p style="margin:0;font-size:0.95rem;color:#333;">
    Also explore:
    <a href="/2-bhk-flats-near-bavdhan/" style="color:#4A0808;font-weight:600;margin:0 0.4rem;">2BHK near Bavdhan</a> ·
    <a href="/3-bhk-flats-near-kothrud/" style="color:#4A0808;font-weight:600;margin:0 0.4rem;">3BHK near Kothrud</a> ·
    <a href="/na-bungalow-plots-near-chandani-chowk/" style="color:#4A0808;font-weight:600;margin:0 0.4rem;">NA Plots Chandani Chowk</a> ·
    <a href="/luxury-forest-villas-near-bavdhan/" style="color:#4A0808;font-weight:600;margin:0 0.4rem;">Luxury Villas near Bavdhan</a> ·
    <a href="/gated-township-plots-near-kothrud/" style="color:#4A0808;font-weight:600;margin:0 0.4rem;">Gated Township near Kothrud</a>
  </p>
</div>
"""

# ─── TARGET PAGES ────────────────────────────────────────────────────────────

TARGET_FILES = [
    "index.html",
    "paranjape-forest-trails-township-bhugaon-price/index.html",
    "paranjape-forest-trails-township-bhugaon-pune/index.html",
    "paranjape-forest-trails-township-bhugaon-location-proximity/index.html",
    "paranjape-forest-trails-township-bhugaon-plots/index.html",
    "paranjape-forest-trails-township-bhugaon-villas/index.html",
    "paranjape-forest-trails-township-bhugaon-bungalows/index.html",
    "paranjape-forest-trails-township-bhugaon-misty-greens/index.html",
    "paranjape-forest-trails-township-bhugaon-rivolo-residences/index.html",
    "paranjape-forest-trails-township-bhugaon-the-canopy/index.html",
    "paranjape-forest-trails-township-bhugaon-highgardens/index.html",
    "paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/index.html",
    "paranjape-forest-trails-township-bhugaon-investment/index.html",
    "paranjape-forest-trails-township-bhugaon-price-list-brochure/index.html",
    "misty-greens/index.html",
    "the-cove/index.html",
    "swaniketan/index.html",
    "verandah/index.html",
]

MARKER = "<!-- /Internal Link Mesh -->"

def inject_links(fpath, links_html):
    content = read(fpath)
    if not content:
        return False
    if MARKER in content:
        return False  # Already injected
    # Inject before </body>
    if '</body>' in content:
        content = content.replace('</body>', links_html + '\n</body>', 1)
        write(fpath, content)
        return True
    return False

def main():
    print("=" * 60)
    print("Internal Link Mesh Injector v1.0")
    print("=" * 60)
    injected = 0
    skipped = 0

    for rel_path in TARGET_FILES:
        fpath = os.path.join(BASE_DIR, rel_path)
        if not os.path.exists(fpath):
            print(f"  SKIP (not found): {rel_path}")
            skipped += 1
            continue
        result = inject_links(fpath, NEW_KEYWORD_LINKS_HTML)
        if result:
            print(f"  ✓ LINKED: {rel_path}")
            injected += 1
        else:
            print(f"  — ALREADY DONE: {rel_path}")
            skipped += 1

    # Inject lighter connectivity links on all existing BHK / plot pages
    for slug in [
        "2-bhk-flats-near-bavdhan","2-bhk-flats-near-kothrud","3-bhk-flats-near-bavdhan",
        "3-bhk-flats-near-kothrud","na-bungalow-plots-near-bhugaon",
        "na-bungalow-plots-near-bavdhan","na-bungalow-plots-near-kothrud",
        "luxury-forest-villas-near-bhugaon","twin-bungalows-forest-trails-bhugaon",
    ]:
        fpath = os.path.join(BASE_DIR, slug, "index.html")
        if os.path.exists(fpath):
            result = inject_links(fpath, CONNECTIVITY_LINKS_HTML.replace(MARKER,""))
            if result:
                injected += 1

    print(f"\n  Done: {injected} pages linked, {skipped} skipped.")
    print("=" * 60)

if __name__ == "__main__":
    main()
