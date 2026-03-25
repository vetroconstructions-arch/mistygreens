import os
import re

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return False

    original_content = content

    # 1. UI Text & Brand Names (Case-Insensitive -> Title Case)
    # We use non-word-boundary matches for names, but we'll be careful with slugs later
    name_replacements = [
        (r'Whistling Meadows Villas', 'Rivolo Private Villas'),
        (r'Whistling Meadows', 'The Rivolo'),
        (r'Kaleidoscope Apartments', 'Canopy Luxury Towers'),
        (r'Kaleidoscope', 'The Canopy'),
        (r'Atmos Smart Homes', 'Highland Towers'),
        (r'Atmos', 'The Highlands'),
        (r'Evergreen Bhugaon Luxury Bungalows', 'Rivolo Luxury Villas'),
        (r'Evergreen', 'The Rivolo'),
        (r'Cascade & Crescent Villas', 'Rivolo Private Villas'),
        (r'Cascade & Crescent', 'The Rivolo'),
        (r'Cascade and Crescent', 'The Rivolo'),
        (r'Cascade', 'The Rivolo'),
        (r'Crescent', 'The Rivolo'),
        (r'Pebble Bay', 'Misty Greens')
    ]

    # 2. URL Slugs & Assets (Strict lowercase replacement to prevent casing leaks)
    slug_replacements = [
        (r'whistling-meadows-villas-bhugaon/', 'luxury-forest-villas-bhugaon/'),
        (r'kaleidoscope-apartments-bhugaon/', 'canopy-apartments-bhugaon/'),
        (r'atmos-smart-homes-bhugaon/', 'the-highlands-forest-trails/'),
        (r'images/apartments-kaleidoscope-realistic.jpg', 'images/canopy-realistic.jpg'),
        (r'images/atmos-realistic.jpg', 'images/highlands-realistic.jpg'),
        (r'images/cascade-villas.webp', 'images/rivolo-luxury.jpg')
    ]

    # Process Slugs FIRST to prevent name-replacements from corrupting URLs
    for pattern, replacement in slug_replacements:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

    # Process names
    for pattern, replacement in name_replacements:
        # Avoid replacing within already-processed URLs if possible, 
        # but re.sub with IGNORECASE is generally safe here if we run slugs first.
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

    # 3. Specific Repetitive Cleanup (e.g., "The Rivolo and The Rivolo")
    content = content.replace('The Rivolo and The Rivolo', 'The Rivolo')

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    base_dir = '.'
    files_updated = 0
    total_files = 0
    
    target_extensions = ('.html', '.js', '.css', '.xml', '.md', '.json')
    
    for root, dirs, files in os.walk(base_dir):
        if any(d in root for d in ['node_modules', '.git', 'brain', '.wrangler']):
            continue
            
        for file in files:
            if file.endswith(target_extensions):
                total_files += 1
                if process_file(os.path.join(root, file)):
                    files_updated += 1

    print(f"\nSovereign Cluster Registry Hardening (V4: Split Logic) Complete.")
    print(f"Total files scanned: {total_files}")
    print(f"Files sanitized: {files_updated}")

if __name__ == "__main__":
    main()
