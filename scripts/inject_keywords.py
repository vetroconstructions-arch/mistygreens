import os
import re

CLUSTERS = {
    "plots": {
        "title": "NA Bungalow Plots in Bhugaon Pune | Misty Greens | {filename}",
        "description": "Premium NA bungalow plots in Bhugaon Pune at Paranjape Forest Trails. Explore Misty Greens plots near Chandani Chowk. High ROI property 2026.",
        "keywords": "NA plots Bhugaon, bungalow plots Pune, Misty Greens Forest Trails"
    },
    "villas": {
        "title": "Luxury Forest Villas in Bhugaon Pune | {filename} | Forest Trails",
        "description": "Premium 4 & 5 BHK forest-themed villas in Bhugaon Pune at Paranjape Forest Trails. Gated villa township experience near Bavdhan.",
        "keywords": "luxury villas Bhugaon, forest villas Pune, The Rivolo Forest Trails"
    },
    "apartments": {
        "title": "Premium 2 & 3 BHK Apartments in Bhugaon Pune | {filename}",
        "description": "Luxury 2 & 3 BHK forest-view apartments in Bhugaon Pune. Explore The Canopy and Verandah at Paranjape Forest Trails.",
        "keywords": "apartments in Bhugaon, 2 BHK flats Bhugaon, Forest Trails Canopy"
    },
    "amenities": {
        "title": "Township Amenities | {filename} | Forest Trails Bhugaon",
        "description": "Explore 30+ luxury amenities at Paranjape Forest Trails Bhugaon, including The Cliff Club and Equestrian Academy.",
        "keywords": "township amenities Pune, Equestrian Academy Pune, The Cliff Club"
    },
    "default": {
        "title": "Paranjape Forest Trails Bhugaon | {filename}",
        "description": "190-acre nature township in Bhugaon Pune with NA plots, villas, and apartments.",
        "keywords": "Paranjape Forest Trails, Forest Trails Bhugaon, nature township Pune"
    }
}

def get_cluster(path):
    p = path.lower()
    if "plot" in p or "misty-greens" in p: return "plots"
    if "villa" in p or "rivolo" in p or "cove" in p: return "villas"
    if "apart" in p or "canopy" in p or "verandah" in p: return "apartments"
    if "amenit" in p or "school" in p or "club" in p: return "amenities"
    return "default"

def clean_name(f):
    n = os.path.splitext(f)[0]
    return n.replace('-', ' ').title() if n.lower() != "index" else ""

def run(directory):
    for root, _, files in os.walk(directory):
        if any(x in root for x in ['node_modules', '.git', '.wrangler', 'components', 'scripts']): continue
        for file in files:
            if not file.endswith('.html') or (root == directory and file == "index.html"): continue
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f: content = f.read()
            original = content
            c_key = get_cluster(file_path)
            c = CLUSTERS[c_key]
            fname = clean_name(file) if file != "index.html" else clean_name(os.path.basename(root))
            new_title = f"{c['title'].format(filename=fname)}".strip(" | ")
            content = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', content, flags=re.IGNORECASE)
            content = re.sub(r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{c["description"]}"', content, flags=re.IGNORECASE)
            content = re.sub(r'<meta name="keywords" content="[^"]*"', f'<meta name="keywords" content="{c["keywords"]}"', content, flags=re.IGNORECASE)
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f: f.write(content)
                print(f"Updated {file_path}")

if __name__ == "__main__":
    run('.')
    print("SEO Hardening Complete.")
