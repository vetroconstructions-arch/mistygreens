import os
import re

def clean_name(folder_name):
    # If the name is index.html, get the parent folder's name
    name = folder_name.replace('-', ' ').strip()
    
    # Capitalize words
    words = name.split()
    cleaned_words = []
    
    replacements = {
        'it': 'IT',
        'nri': 'NRI',
        'roi': 'ROI',
        'pmrda': 'PMRDA',
        'rera': 'RERA',
        'vs': 'vs',
        'bhk': 'BHK',
        'na': 'NA',
        'ssrvm': 'SSRVM',
        'pune': 'Pune',
        'bhugaon': 'Bhugaon',
        'kothrud': 'Kothrud',
        'bavdhan': 'Bavdhan',
        'magarpatta': 'Magarpatta',
        'hinjewadi': 'Hinjewadi',
        'paud': 'Paud',
        'baner': 'Baner',
        'aundh': 'Aundh',
        'karve': 'Karve',
        'mumbai': 'Mumbai',
        'co': 'Co'
    }
    
    for word in words:
        wl = word.lower()
        if wl in replacements:
            cleaned_words.append(replacements[wl])
        else:
            cleaned_words.append(word.capitalize())
            
    return ' '.join(cleaned_words)

def process_file(filepath, rel_path):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine fallback display name
    dir_name = os.path.basename(os.path.dirname(filepath))
    if not dir_name or dir_name == '.':
        dir_name = os.path.basename(filepath).replace('.html', '')
        
    display_name = clean_name(dir_name)
    url_lower = rel_path.lower()
    
    title = f"{display_name} | Paranjape Forest Trails Bhugaon"
    description = f"Detailed guide to {display_name} in the 190-acre nature-themed gated township of Paranjape Forest Trails, Bhugaon, Pune West. Get verified brochures and details."
    
    # Categorized metadata generation
    if any(x in url_lower for x in ["comparisons", "-vs-", "vs-"]):
        title = f"{display_name} Comparison | Paranjape Forest Trails"
        description = f"Detailed real estate comparison of {display_name} near Kothrud and Bavdhan. Explore pricing, ROI potential, and connectivity metrics at Forest Trails Bhugaon."
    elif any(x in url_lower for x in ["investment", "growth-ledger", "appreciation", "rental-yield", "tax-benefits", "pmrda"]):
        title = f"{display_name} ROI Forecast | Bhugaon Plots & Villas"
        description = f"Analyze {display_name} in West Pune. Explore developer track record, PMRDA infrastructure updates, and NRI tax benefits for bungalow plots."
    elif any(x in url_lower for x in ["blogs", "blog/"]):
        title = f"{display_name} | Forest Trails Bhugaon Blog"
        description = f"Read our latest article on {display_name}. Stay updated on gated community guidelines, school admissions, and West Pune property insights."
    elif any(x in url_lower for x in ["sectors", "bungalows", "villas", "apartments"]):
        title = f"{display_name} Enclave | Paranjape Forest Trails"
        description = f"Detailed layout, specifications, floor plans, and pricing for {display_name} inside the 190-acre gated township of Paranjape Forest Trails, Bhugaon."
    elif any(x in url_lower for x in ["amenities", "cliff-lifestyle-hub", "the-cove", "verandah", "highgardens", "highlands", "the-cliff-club", "equestrian", "school", "spa-retreat"]):
        title = f"{display_name} Clubhouse & Amenities | Forest Trails Pune"
        description = f"Explore the world-class features of {display_name} inside Forest Trails Bhugaon. Access equestrian training, SSRVM school, and Olympic swimming pools."
    elif any(x in url_lower for x in ["location", "connectivity", "near-", "proximity"]):
        title = f"{display_name} Proximity & Route Guide | Forest Trails"
        description = f"Commute and travel times for {display_name}. Learn how Paranjape Forest Trails connects you to Bavdhan, Kothrud, Hinjewadi IT Hub, and the Ring Road."
    elif "legal" in url_lower:
        title = f"{display_name} Legal Guide | Forest Trails Bhugaon"
        description = f"RERA registration numbers, NA bungalow plot purchase checklist, and verified legal records for Paranjape Forest Trails project in West Pune."

    # Make sure title is within safe length limits (max 65)
    if len(title) > 65:
        # Trim but keep branding
        suffix = " | Forest Trails"
        max_prefix = 65 - len(suffix)
        title = display_name[:max_prefix].strip() + suffix

    original = content
    
    # 1. Replace Title Tag
    title_pattern = re.compile(r'<title>.*?</title>', re.IGNORECASE | re.DOTALL)
    if title_pattern.search(content):
        content = title_pattern.sub(f"<title>{title}</title>", content)
        
    # 2. Replace Meta Description
    desc_pattern = re.compile(r'<meta\s+name=[\"\']description[\"\']\s+content="[^"]*"\s*/?>', re.IGNORECASE)
    new_desc_tag = f'<meta name="description" content="{description}">'
    if desc_pattern.search(content):
        content = desc_pattern.sub(new_desc_tag, content)
        
    # 3. Replace OG Title
    og_title_pattern = re.compile(r'<meta\s+property=[\"\']og:title[\"\']\s+content="[^"]*"\s*/?>', re.IGNORECASE)
    new_og_title_tag = f'<meta property="og:title" content="{title}">'
    if og_title_pattern.search(content):
        content = og_title_pattern.sub(new_og_title_tag, content)
        
    # 4. Replace OG Description
    og_desc_pattern = re.compile(r'<meta\s+property=[\"\']og:description[\"\']\s+content="[^"]*"\s*/?>', re.IGNORECASE)
    new_og_desc_tag = f'<meta property="og:description" content="{description}">'
    if og_desc_pattern.search(content):
        content = og_desc_pattern.sub(new_og_desc_tag, content)
        
    # 5. Replace Twitter Title
    tw_title_pattern = re.compile(r'<meta\s+name=[\"\']twitter:title[\"\']\s+content="[^"]*"\s*/?>', re.IGNORECASE)
    new_tw_title_tag = f'<meta name="twitter:title" content="{title}">'
    if tw_title_pattern.search(content):
        content = tw_title_pattern.sub(new_tw_title_tag, content)
        
    # 6. Replace Twitter Description
    tw_desc_pattern = re.compile(r'<meta\s+name=[\"\']twitter:description[\"\']\s+content="[^"]*"\s*/?>', re.IGNORECASE)
    new_tw_desc_tag = f'<meta name="twitter:description" content="{description}">'
    if tw_desc_pattern.search(content):
        content = tw_desc_pattern.sub(new_tw_desc_tag, content)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    root_dir = '.'
    modified_count = 0
    
    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in root or '.git' in root or '.wrangler' in root or '/components' in root.replace(os.sep, '/') or root.endswith('components') or '/scripts' in root.replace(os.sep, '/') or root.endswith('scripts'):
            continue
            
        for file in files:
            if file.endswith('.html'):
                # Skip home page, 404, and thank you
                if file in ['404.html', 'thank-you.html']:
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, root_dir)
                
                if rel_path == 'index.html':
                    continue # Keep pristine home page SEO
                    
                try:
                    if process_file(full_path, rel_path):
                        modified_count += 1
                        print(f"Fixed SEO Metadata in: {rel_path}")
                except Exception as e:
                    print(f"Error processing {rel_path}: {e}")
                    
    print(f"Total HTML files fixed with unique SEO titles/descriptions: {modified_count}")

if __name__ == '__main__':
    main()
