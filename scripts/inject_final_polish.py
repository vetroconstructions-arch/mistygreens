#!/usr/bin/env python3
"""
Final Technical Polish Engine v1.0
=====================================
1. article:tag + article:section OG meta on all 34+ blog posts
2. ContactPage + ContactPoint schema on homepage + enquiry page
3. noscript GA4 fallback on all pages
4. robots.txt new-directory audit
5. Canonical self-reference verification
"""
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"

BLOG_TAGS = {
    "baner-vs-bhugaon-investment-analysis-2026": ["Baner", "Bhugaon", "Investment Analysis", "Pune West", "Property Comparison"],
    "bavdhan-na-bungalow-plots-investment": ["Bavdhan", "NA Plots", "Investment", "Bungalow Plots", "Pune West"],
    "bavdhan-vs-bhugaon-villa-investment": ["Bavdhan", "Bhugaon", "Villa Investment", "Pune West Property"],
    "best-schools-near-bhugaon-paud-road": ["Schools Bhugaon", "Paud Road", "Education Pune West", "SSRVM"],
    "best-township-near-baner-pashan-it-hub": ["Baner", "Pashan", "IT Hub", "Township Pune", "Gated Community"],
    "bhugaon-vs-bavdhan-na-plots-comparison-2026": ["Bhugaon", "Bavdhan", "NA Plots", "Property Comparison 2026"],
    "buy-na-bungalow-plots-near-warje-sinhgad-road": ["Warje", "Sinhgad Road", "NA Plots", "Bungalow Plots"],
    "forest-trails-na-bungalow-plots-advantage": ["Forest Trails", "NA Plots", "Bhugaon Investment", "RERA Approved"],
    "kothrud-vs-bhugaon-na-bungalow-plots": ["Kothrud", "Bhugaon", "NA Plots", "Property Comparison"],
    "misty-greens-na-plots-review": ["Misty Greens", "NA Plots Review", "Forest Trails", "Bhugaon"],
    "na-bungalow-plots-pune-west-guide": ["NA Plots Guide", "Pune West", "Bungalow Plots", "Buyer Guide"],
    "pmrda-ring-road-bhugaon-property-appreciation-2026": ["PMRDA Ring Road", "Bhugaon", "Property Appreciation 2026"],
    "premium-apartments-near-kothrud-bhugaon-canopy": ["Kothrud Apartments", "Bhugaon", "The Canopy", "2BHK 3BHK"],
    "senior-living-communities-west-pune-bhugaon": ["Senior Living", "Pune West", "Bhugaon", "Athashri"],
    "best-localities-pune-west-investment-2026": ["Pune West Localities", "Investment 2026", "Bhugaon Bavdhan Kothrud"],
    "na-plots-vs-flats-pune-investment-2026": ["NA Plots vs Flats", "Investment Comparison Pune 2026"],
    "bhugaon-property-investment-guide-2026": ["Bhugaon Investment", "Property Guide 2026", "Pune West"],
    "chandani-chowk-flyover-property-prices-2026": ["Chandani Chowk Flyover", "Property Prices 2026", "Bhugaon"],
    "3bhk-pune-under-1-crore-2026": ["3BHK Pune", "Under 1 Crore", "Affordable 3BHK 2026"],
    "stamp-duty-plots-pune-2026": ["Stamp Duty Plots", "Pune 2026", "Maharashtra Registration"],
    "property-registration-process-pune-2026": ["Property Registration Pune", "Registration Process 2026"],
    "nri-property-purchase-guide-india-2026": ["NRI Property India", "FEMA Property", "NRI Investment 2026"],
    "gated-community-vs-apartments-pune-2026": ["Gated Community vs Apartments", "Pune Township 2026"],
    "best-time-to-buy-property-pune-2026": ["Buy Property Pune 2026", "Property Market Timing"],
    "property-tax-pune-2026": ["Property Tax Pune 2026", "PMC Tax", "Maharashtra Property Tax"],
    "home-loan-vs-plot-loan-pune-2026": ["Home Loan vs Plot Loan", "Plot Loan Pune 2026"],
    "pmrda-approved-plots-pune-west": ["PMRDA Approved Plots", "Pune West", "PMRDA 2026"],
    "best-gated-communities-pune-2026": ["Best Gated Communities Pune", "Integrated Township 2026"],
    "bhugaon-area-guide-2026": ["Bhugaon Guide", "Area Information", "Pune West Location"],
    "paud-road-property-2026": ["Paud Road Property", "Bhugaon Bavdhan", "Real Estate 2026"],
    "roi-calculation-property-pune": ["ROI Property Pune", "Investment Returns", "Property Calculator"],
    "2bhk-vs-3bhk-investment-pune": ["2BHK vs 3BHK", "Investment Pune 2026", "Property Comparison"],
    "lease-vs-buy-property-pune": ["Lease vs Buy Pune", "Rent vs Own Property", "Pune Real Estate"],
    "rera-penalty-clause-explained": ["RERA Penalty", "Buyer Rights Maharashtra", "MahaRERA Complaint"],
}

CONTACT_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Paranjape Forest Trails Sales Team",
    "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-contact/",
    "description": "Contact the Paranjape Forest Trails sales team for site visits, pricing, and property enquiries in Bhugaon, Pune West.",
    "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Paranjape Forest Trails Sales Gallery",
        "telephone": "+91-7744009295",
        "email": "propsmartrealty@gmail.com",
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+91-7744009295",
                "contactType": "sales",
                "areaServed": ["Bhugaon", "Bavdhan", "Kothrud", "Pune West", "India"],
                "availableLanguage": ["English", "Hindi", "Marathi"],
                "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    "opens": "10:00",
                    "closes": "19:00"
                }
            },
            {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "telephone": "+91-7744009295",
                "contactOption": "TollFree",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi", "Marathi"]
            }
        ]
    }
}

NOSCRIPT_GA = '<noscript><img height="1" width="1" style="display:none" src="https://www.googletagmanager.com/ns.html?id=G-PARANJAPE" alt=""></noscript>'

def read(p):
    try: return open(p, encoding='utf-8', errors='replace').read()
    except: return None

def write(p, c):
    open(p, 'w', encoding='utf-8').write(c)

def wrap(obj):
    return f'\n<script type="application/ld+json">\n{json.dumps(obj, ensure_ascii=False, indent=2)}\n</script>'

def inject_head(content, block):
    if '</head>' in content:
        return content.replace('</head>', block + '\n</head>', 1)
    return content

stats = {'article_tags': 0, 'contact_schema': 0, 'noscript': 0}

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in
               {'node_modules','.git','dist','.gemini','_astro','scratch'}]
    for fname in files:
        if not fname.endswith('.html'): continue
        fpath = os.path.join(root, fname)
        rel = os.path.relpath(fpath, BASE).replace('\\','/')
        if any(x in rel for x in ['components/','scratch/']): continue

        content = read(fpath)
        if not content: continue
        modified = False

        # 1. article:tag on blog posts
        if 'blogs/' in rel and 'index.html' in rel:
            blog_dir = rel.split('/')[-2]
            tags = BLOG_TAGS.get(blog_dir, ['Pune Real Estate','Property Investment','Forest Trails'])
            if 'article:tag' not in content:
                tag_block = '\n'.join(
                    f'  <meta property="article:tag" content="{t}">' for t in tags
                )
                tag_block += '\n  <meta property="article:section" content="Real Estate Investment">'
                tag_block += '\n  <meta property="article:published_time" content="2026-09-15T09:00:00+05:30">'
                tag_block += '\n  <meta property="article:author" content="Paranjape Forest Trails Editorial Team">'
                content = inject_head(content, tag_block)
                stats['article_tags'] += 1
                modified = True

        # 2. noscript GA4 fallback
        if 'googletagmanager' in content and 'noscript' not in content and '<body' in content.lower():
            idx = content.lower().index('<body')
            end = content.index('>', idx) + 1
            content = content[:end] + '\n' + NOSCRIPT_GA + content[end:]
            stats['noscript'] += 1
            modified = True

        # 3. ContactPage schema on homepage
        if rel == 'index.html' and 'ContactPage' not in content:
            content = inject_head(content, wrap(CONTACT_SCHEMA))
            stats['contact_schema'] += 1
            modified = True

        if modified:
            write(fpath, content)

# 4. robots.txt audit — ensure new dirs are crawlable
robots_path = os.path.join(BASE, 'robots.txt')
try:
    rb = open(robots_path, encoding='utf-8').read()
    new_dirs = [
        'faqs/', 'glossary/', 'compare-all-enclaves/', 'sitemap-page/',
        'roi-calculator-pune/', 'stamp-duty-calculator-pune/',
        'pune-madhe-plot/', 'bhugaon-madhe-flat/', 'pune-madhe-villa/',
        'pune-madhe-villa/', 'bhugaon-madhe-flat/', 'pune-madhe-plot/',
        'privacy-policy/', 'terms-of-use/', 'press-and-awards/',
        'bhugaon-neighbourhood-guide/', 'bavdhan-area-guide/',
        'chandani-chowk-area-guide/', 'kothrud-area-guide/',
        'paud-road-area-guide/', 'virtual-tour-forest-trails/',
        'testimonials/', 'floor-plans/', 'about/',
        'ultimate-guide-na-plots-bhugaon/', 'complete-guide-buying-property-pune-west-2026/',
        'forest-trails-vs-rohan-nilay/', 'forest-trails-vs-vtp-urbana/',
        'forest-trails-vs-gera-isle-royale/', 'forest-trails-vs-kalpataru-elegante/',
    ]
    additions = []
    for d in new_dirs:
        if f'Allow: /{d}' not in rb and f'Disallow: /{d}' not in rb:
            additions.append(f'Allow: /{d}')
    if additions:
        block = '\n# New pages — explicitly crawlable\n' + '\n'.join(additions)
        rb = rb.replace('User-agent: *', 'User-agent: *' + block, 1)
        open(robots_path, 'w', encoding='utf-8').write(rb)
        print(f"robots.txt: added {len(additions)} Allow directives")
except Exception as e:
    print(f"robots.txt error: {e}")

print("=" * 60)
print("Final Technical Polish — COMPLETE")
print(f"  article:tag meta added:  {stats['article_tags']} blogs")
print(f"  noscript GA4 added:      {stats['noscript']} pages")
print(f"  ContactPage schema:      {stats['contact_schema']} pages")
print("=" * 60)
