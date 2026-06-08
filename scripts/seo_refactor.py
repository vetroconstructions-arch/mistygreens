import os
import shutil

dir_map = {
    'canopy-apartments-bhugaon': 'paranjape-forest-trails-township-bhugaon-canopy-apartments',
    'misty-greens': 'paranjape-forest-trails-township-bhugaon-misty-greens-plots',
    'the-cove': 'paranjape-forest-trails-township-bhugaon-the-cove-villas',
    'pebbles': 'paranjape-forest-trails-township-bhugaon-pebbles-apartments',
    'highgardens': 'paranjape-forest-trails-township-bhugaon-highgardens-apartments',
    'the-highlands-forest-trails': 'paranjape-forest-trails-township-bhugaon-the-highlands',
    'verandah': 'paranjape-forest-trails-township-bhugaon-verandah-flats',
    'paranjape-forest-trails-township-bhugaon-everglades': 'paranjape-forest-trails-township-bhugaon-codename-alpha-apartments',
    'athashri-senior-living-bhugaon': 'paranjape-forest-trails-township-bhugaon-athashri-senior-living'
}

def rename_directories(base_dir):
    for old_name, new_name in dir_map.items():
        old_path = os.path.join(base_dir, old_name)
        new_path = os.path.join(base_dir, new_name)
        if os.path.isdir(old_path):
            os.rename(old_path, new_path)
            print(f"Renamed {old_name} -> {new_name}")

def update_html_references(base_dir):
    html_files = []
    for root, _, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or '.wrangler' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    count = 0
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Map old to new and also "insights/" to "blogs/"
            for old_name, new_name in dir_map.items():
                content = content.replace(f'href="{old_name}/"', f'href="{new_name}/"')
                content = content.replace(f'href="/{old_name}/"', f'href="/{new_name}/"')
                # If they have anchor texts without "paranjape forest trails", let's inject it. But that's risky.
                # Let's target specific known anchor tags dynamically if needed later. But at least URLs must update.

            content = content.replace('href="insights/', 'href="blogs/')
            content = content.replace('href="/insights/', 'href="/blogs/')
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            
    print(f"Updated {count} HTML files for URLs.")

def merge_insights_to_blogs(base_dir):
    insights_dir = os.path.join(base_dir, 'insights')
    blogs_dir = os.path.join(base_dir, 'blogs')
    
    if os.path.isdir(insights_dir):
        if not os.path.isdir(blogs_dir):
            os.makedirs(blogs_dir)
        for item in os.listdir(insights_dir):
            s = os.path.join(insights_dir, item)
            d = os.path.join(blogs_dir, item)
            if not os.path.exists(d):
                shutil.move(s, d)
        shutil.rmtree(insights_dir)
        print("Merged insights into blogs.")

if __name__ == "__main__":
    rename_directories('.')
    merge_insights_to_blogs('.')
    update_html_references('.')
