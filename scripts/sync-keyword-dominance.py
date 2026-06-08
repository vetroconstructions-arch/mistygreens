import os
import re

ROOT = os.getcwd()

KEYWORD_MATRIX = {
    "index": {
        "title": "NA Plots Forest Trails Bhugaon | Residential Plots Pune West | Paranjape Forest Trails Township",
        "keywords": "Paranjape Forest Trails Bhugaon, Forest Trails Pune Township, Paranjape Forest Trails price, Forest Trails Bhugaon Pune 190 acre township, Luxury township in Bhugaon Pune, Forest Trails near Bavdhan, Forest Trails near Kothrud, Paranjape Schemes Forest Trails Pune, Forest Trails investment Pune West, Premium gated township Bhugaon Pune, Nature township Pune luxury homes, Forest Trails master plan Bhugaon, Forest Trails brochure download, property near Chandani Chowk Pune, real estate near Bavdhan Pune, Bhugaon real estate investment, Pune west luxury properties, Paranjape Schemes Pune projects, top real estate developers in Pune, best township in Pune West 2026, luxury gated communities Pune",
        "faqs": [
            {"q": "What is the largest township in Bhugaon Pune?", "a": "Paranjape Forest Trails is the largest 190-acre integrated forest township in Bhugaon, Pune West."},
            {"q": "Who is the developer of Forest Trails Bhugaon?", "a": "Forest Trails is developed by Paranjape Schemes (Construction) Ltd, a premier developer with a 35+ year legacy."}
        ]
    },
    "rivolo-residences": {
        "title": "Rivolo Residences Bhugaon | Luxury Villas in Paranjape Forest Trails",
        "keywords": "Rivolo Residences Bhugaon, Rivolo 2 BHK price, Rivolo 3 BHK price, Rivolo luxury apartments Pune, Rivolo resale flats, Rivolo ready possession, Rivolo investment opportunity, Rivolo Forest Trails configuration, Rivolo near Chandani Chowk, Rivolo premium flats Pune, Rivolo Bhugaon price list, Rivolo apartments forest view, Rivolo homes for sale, Rivolo resale deals Pune, Rivolo project details, Rivolo 2 BHK under 80 lakhs, Rivolo 3 BHK premium homes, Rivolo 4 BHK luxury villas Bhugaon",
        "faqs": [
            {"q": "What is the configuration of Rivolo Residences?", "a": "Rivolo Residences offers premium independent villas and luxury apartments within the 190-acre Forest Trails township."},
            {"q": "Is Rivolo Bhugaon ready for possession?", "a": "Yes, Rivolo features ready-to-move-in luxury units with immediate registration and forest-facing views."}
        ]
    },
    "orchard-residences": {
        "title": "Orchard Residences Bhugaon | Premium Flats in Forest Trails",
        "keywords": "Orchard Residences Bhugaon, Orchard 2 BHK flats Pune, Orchard 3 BHK price Bhugaon, Orchard resale flats, Orchard Forest Trails pricing, Orchard ready homes Pune, Orchard near Bavdhan, Orchard apartments near Mulshi road, Orchard investment property, Orchard luxury flats Pune, Orchard society Bhugaon, Orchard resale deals, Orchard homes forest facing",
        "faqs": [
            {"q": "What is the starting price at Orchard Residences?", "a": "Pricing at Orchard Residences varies by configuration; request the April 2026 price list for the latest rates on forest-view flats."},
            {"q": "How far is Orchard Residences from Kothrud?", "a": "Orchard Residences is just 12 minutes from Kothrud via the upgraded Paud Road and Chandani Chowk flyover."}
        ]
    },
    "highgardens": {
        "title": "Highgardens Bhugaon | 3 & 4 BHK Luxury Flats in Forest Trails",
        "keywords": "Highgardens Bhugaon, Highgardens 3 BHK Pune, Highgardens 4 BHK luxury flats, Highgardens premium apartments, Highgardens resale units, Highgardens price Bhugaon, Highgardens forest view homes, Highgardens ready possession, Highgardens luxury living Pune, Highgardens investment flats",
        "faqs": [
            {"q": "Does Highgardens offer 4 BHK flats?", "a": "Yes, Highgardens is the premier cluster at Forest Trails offering ultra-spacious 3 and 4 BHK luxury apartments."},
            {"q": "Is the Cliff Club accessible from Highgardens?", "a": "Absolutely, Highgardens residents have full, lifetime access to the 1.5-acre Cliff Lifestyle Hub."}
        ]
    },
    "the-canopy": {
        "title": "The Canopy Bhugaon | Nature Homes in Paranjape Forest Trails",
        "keywords": "The Canopy Bhugaon, Canopy 2 BHK flats, Canopy 3 BHK price Pune, Canopy Forest Trails resale, Canopy ready possession, Canopy nature homes Pune, Canopy near Chandani Chowk, Canopy affordable luxury flats, Canopy investment property",
        "faqs": [
            {"q": "What makes The Canopy unique?", "a": "The Canopy is designed with 90% open spaces and direct proximity to the SSRVM school within the township."},
            {"q": "Are 2 BHK flats available at The Canopy?", "a": "The Canopy features optimized 2 and 3 BHK nature-facing apartments with premium finishing."}
        ]
    },
    "everglades": {
        "title": "Everglades II Forest Trails | Premium 1 & 2 BHK Apartments Bhugaon",
        "keywords": "Everglades II Forest Trails, Everglades 1 BHK price, Everglades 2 BHK Bhugaon, Paranjape Everglades II Pune, Everglades Forest Trails carpet area, Everglades II RERA number, investment in Everglades Bhugaon, 1 BHK under 50 lakhs Pune",
        "faqs": [
            {"q": "What is the RERA number for Everglades II?", "a": "Everglades II is MahaRERA registered under P52100055130, ensuring full regulatory security."},
            {"q": "What is the carpet area for 1 BHK at Everglades II?", "a": "The 1 BHK XL at Everglades II offers a generous 518 SQFT carpet area with a view-deck."}
        ]
    },
    "misty-greens": {
        "title": "Misty Greens Bhugaon | NA Bungalow Plots in Forest Trails",
        "keywords": "Misty Greens Bhugaon, Misty Greens villas, Misty Greens bungalow price, Misty Greens forest villas Pune, Misty Greens premium homes, Misty Greens resale properties, Misty Greens luxury living, Misty Greens NA plots Bhugaon price, plot investment Pune west",
        "faqs": [
            {"q": "Are the plots at Misty Greens NA certified?", "a": "Yes, all bungalow plots at Misty Greens are fully NA (Non-Agricultural) certified with individual 7/12 extract."},
            {"q": "Can I build my own villa at Misty Greens?", "a": "Yes, we offer both independent plots for custom construction and pre-designed luxury villa options."}
        ]
    }
}

LOGO_HTML = '<img src="/assets/branding/logo.png" alt="Paranjape Forest Trails Township Bhugaon Logo" style="height: 45px; width: auto; display: block;">'

def generate_faq_json(faq_list):
    if not faq_list: return ""
    items = []
    for item in faq_list:
        items.append(f'{{"@type":"Question","name":"{item["q"]}","acceptedAnswer":{{"@type":"Answer","text":"{item["a"]}"}}}}')
    
    return f'<script type="application/ld+json">{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{",".join(items)}]}}</script>'

def sync_page(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # 1. Standardize Header Logo (DISABLED: Keeping Premium Text Logo)
    # brand_regex = r'<div class="brand-logo-text">.*?</div>'
    # if re.search(brand_regex, content, re.DOTALL):
    #     content = re.sub(brand_regex, LOGO_HTML, content, flags=re.DOTALL)
    #     modified = True

    # 2. Inject Project Keywords & FAQ if path matches
    for slug, data in KEYWORD_MATRIX.items():
        if slug in file_path:
            # Update Title
            title_regex = r'<title>(.*?)</title>'
            new_title = f"<title>{data['title']} | Paranjape Forest Trails Township</title>"
            if re.search(title_regex, content):
                content = re.sub(title_regex, new_title, content)
                modified = True
            
            # Inject Semantic Mesh
            mesh_regex = r'<!-- Sovereign Cluster Mesh:.*?</div>'
            mesh_html = f'<!-- Sovereign Cluster Mesh: {slug} -->\n    <div class="seo-mesh-footer" style="display:none;" aria-hidden="true">\n        <h3>{data["title"]}</h3>\n        <p>{data["keywords"]}</p>\n    </div>'
            
            if re.search(mesh_regex, content, re.DOTALL):
                content = re.sub(mesh_regex, mesh_html, content, flags=re.DOTALL)
                modified = True
            elif '</body>' in content:
                content = content.replace('</body>', mesh_html + '\n</body>')
                modified = True

            # Standardize FAQ Schema
            if "faqs" in data:
                faq_html = generate_faq_json(data["faqs"])
                faq_regex = r'<!-- Sovereign FAQ Matrix.*?/section>'
                if re.search(faq_regex, content, re.DOTALL):
                    # We don't replace the section yet, just the head script
                    faq_script_regex = r'<script type="application/ld\+json">\s*{\s*"@context": "https://schema\.org",\s*"@type": "FAQPage".*?</script>'
                    if re.search(faq_script_regex, content, re.DOTALL):
                        content = re.sub(faq_script_regex, faq_html, content, flags=re.DOTALL)
                        modified = True
            
            break 

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

print("🚀 Starting Site-Wide Schema & FAQ Hardening Sync...")
count = 0
for root, dirs, files in os.walk(ROOT):
    if any(x in root for x in ['node_modules', '.git']):
        continue
    for file in files:
        if file.endswith('.html'):
            if sync_page(os.path.join(root, file)):
                count += 1

print(f"\n🎯 Schema Sovereignty Synced across {count} pages.")
