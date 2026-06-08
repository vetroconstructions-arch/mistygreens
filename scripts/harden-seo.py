import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

CLUSTER_DEF = {
    'misty-greens': {'name': 'Misty Greens Plots', 'desc': 'Premium NA Bungalow Plots at Misty Greens inside Paranjape Forest Trails Township, Bhugaon, Pune West. Starting ₹1.23 Cr*.'},
    'the-cove': {'name': 'The Cove Villas', 'desc': 'Ultra Luxury Forest Villas at The Cove inside Paranjape Forest Trails, Bhugaon. Exclusive community living.'},
    'the-highlands': {'name': 'The Highlands Apartments', 'desc': 'Premium 2 & 3 BHK Apartments at The Highlands, Paranjape Forest Trails Bhugaon. Unobstructed nature views.'},
    'canopy-apartments': {'name': 'The Canopy Apartments', 'desc': 'Spacious Apartments at The Canopy inside Paranjape Forest Trails Township Bhugaon. Pune West connectivity.'},
    'codename-alpha': {'name': 'Everglades II', 'desc': 'New Launch Everglades II Apartments at Paranjape Forest Trails Bhugaon Pune.'},
    'highgardens': {'name': 'High Gardens', 'desc': 'Exquisite High Gardens Apartments at Paranjape Forest Trails Bhugaon Pune.'},
    'rivolo': {'name': 'The Rivolo Villas', 'desc': 'The Rivolo Premium Luxury Villas at Paranjape Forest Trails Bhugaon Pune. Ultimate exclusivity.'},
    'verandah': {'name': 'Verandah Luxury Flats', 'desc': 'Verandah Luxury Flats inside Paranjape Forest Trails Township Bhugaon Pune.'},
    'athashri': {'name': 'Athashri Senior Living', 'desc': 'Premium Senior Living at Athashri inside Paranjape Forest Trails Bhugaon Pune. Safe, connected community.'}
}

def get_project_context(dir_path):
    for key, val in CLUSTER_DEF.items():
        if key in dir_path:
            return val
    return {'name': 'Paranjape Forest Trails', 'desc': '190-Acre Paranjape Forest Trails Township in Bhugaon, Pune West. Plots, Villas, Apartments.'}

def walk_dir(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        # Exclude hidden directories, node_modules, etc
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('node_modules', 'scripts', 'brain')]
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if file_path != os.path.join(BASE_DIR, 'index.html'):
                    file_list.append(file_path)
    return file_list

import re

def process_files():
    print("🚀 Starting Absolute SEO Metadata Hardening using Python Engine...")
    files = walk_dir(BASE_DIR)
    changed = 0

    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            html = f.read()
            
        original_html = html
        context = get_project_context(file)
        
        new_title = f"<title>{context['name']} at Paranjape Forest Trails Bhugaon | Pune West</title>"
        new_desc = f'<meta name="description" content="{context["desc"]}">'
        
        # Replace title
        title_pattern = re.compile(r'<title>.*?</title>', re.IGNORECASE | re.DOTALL)
        if title_pattern.search(html):
            html = title_pattern.sub(new_title, html)
        elif '</head>' in html:
            html = html.replace('</head>', f'    {new_title}\n</head>')

        # Replace description
        desc_pattern = re.compile(r'<meta\s+name=[\'"]description[\'"]\s+content=[\'"](.*?)[\'"]\s*/?>', re.IGNORECASE)
        if desc_pattern.search(html):
            html = desc_pattern.sub(new_desc, html)
        elif '</head>' in html:
            html = html.replace('</head>', f'    {new_desc}\n</head>')

        if html != original_html:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(html)
            changed += 1

    print(f"✅ Hardened SEO <title> and <meta> tags on {changed} programmatic landing pages.")

if __name__ == '__main__':
    process_files()
