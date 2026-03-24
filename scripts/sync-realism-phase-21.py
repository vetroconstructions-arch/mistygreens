import os
import re

# Mapping of directory patterns to hero image replacements
HERO_MAPPING = {
    'codename-alpha-apartments-bhugaon': 'alpha-realistic.jpg',
    'highgardens-apartments-bhugaon': 'highgardens-realistic.jpg',
    'canopy-apartments-bhugaon': 'canopy-realistic.jpg',
    'atmost-apartments-bhugaon': 'atmos-realistic.jpg', # Note: check spelling
    'pebbles-apartments-bhugaon': 'pebbles-realistic.jpg',
    'athashri-senior-living-bhugaon': 'athashri-realistic.jpg',
    'verandah-luxury-flats-bhugaon': 'verandah-pool-lifestyle.jpg',
    'misty-greens-plots-pune': 'misty-greens-gate.jpg'
}

# Global Replacements for Cluster Grids (Common patterns across all pages)
GLOBAL_REPLACEMENTS = [
    (r'images/misty-greens-gate-day\.webp', 'images/misty-greens-gate.jpg'),
    (r'images/villas-exterior-1\.webp', 'images/highgardens-realistic.jpg'),
    (r'images/villas-pool-night\.webp', 'images/verandah-pool-lifestyle.jpg'),
    (r'images/apartments-verandah-realistic\.jpg', 'images/verandah-pool-lifestyle.jpg'),
    (r'images/land-exterior-1\.webp', 'images/misty-greens-gate.jpg')
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # Handle Hero Replacements (Specific to cluster folders)
    for folder, new_img in HERO_MAPPING.items():
        if folder in filepath:
            # Replace ANY .webp in the hero background or preload with the specific one
            content = re.sub(r'url\([\'"]?\/images\/[^\.]+\.webp[\'"]?\)', f"url('/images/{new_img}')", content)
            # Also handle link rel="preload" as="image"
            content = re.sub(r'href=[\'"]?\/images\/[^\.]+\.webp[\'"]?', f'href="/images/{new_img}"', content)

    # Handle Global Cluster Grid Replacements
    for old, new in GLOBAL_REPLACEMENTS:
        # Match both /images/ and images/
        content = re.sub(r'\/images\/' + old.split('/')[-1].replace('.', r'\.'), f'/images/{new.split("/")[-1]}', content)
        content = re.sub(r'images\/' + old.split('/')[-1].replace('.', r'\.'), f'images/{new.split("/")[-1]}', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    base_dir = '.'
    files_updated = 0
    total_files = 0
    
    for root, dirs, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or 'brain' in root:
            continue
            
        for file in files:
            if file.endswith('.html'):
                total_files += 1
                if process_file(os.path.join(root, file)):
                    files_updated += 1
                    print(f"Updated: {os.path.join(root, file)}")

    print(f"\nPhase 21 Sync Complete.")
    print(f"Total HTML files scanned: {total_files}")
    print(f"Files updated with realistic visuals: {files_updated}")

if __name__ == "__main__":
    main()
