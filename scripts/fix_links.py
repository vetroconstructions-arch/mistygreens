import os
import re

def fix_all(directory):
    html_files = []
    for root, _, files in os.walk(directory):
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
            
            # Replace broken links
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-amenities-the-cliff-club.html"', 'href="/amenities-the-cliff-club.html"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-amenities-equestrian.html"', 'href="/amenities-equestrian.html"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-amenities-sri-sri-school.html"', 'href="/amenities-sri-sri-school.html"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-the-highlands/"', 'href="/paranjape-forest-trails-township-bhugaon-the-highlands-forest-trails/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-the-cove-villas/"', 'href="/paranjape-forest-trails-township-bhugaon-the-cove/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-highgardens-apartments/"', 'href="/paranjape-forest-trails-township-bhugaon-highgardens/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-codename-alpha-apartments/"', 'href="/paranjape-forest-trails-township-bhugaon-everglades/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-pebbles-apartments/"', 'href="/paranjape-forest-trails-township-bhugaon-pebbles/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-athashri-senior-living/"', 'href="/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-canopy-apartments/"', 'href="/paranjape-forest-trails-township-bhugaon-canopy-apartments-bhugaon/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-misty-greens-plots/"', 'href="/paranjape-forest-trails-township-bhugaon-misty-greens/"')
            content = content.replace('href="/paranjape-forest-trails-township-bhugaon-verandah-flats/"', 'href="/paranjape-forest-trails-township-bhugaon-verandah/"')

            
            # Fix broken image references
            content = content.replace('src="/images/logo.webp"', 'src="/images/township-aerial.webp"')
            content = content.replace('src="images/logo.webp"', 'src="images/township-aerial.webp"')
            content = content.replace('src="../images/logo.webp"', 'src="../images/township-aerial.webp"')
            content = content.replace('src="/images/the-highlands-villas.webp"', 'src="/images/highgardens-realistic.webp"')
            content = content.replace('src="images/the-highlands-villas.webp"', 'src="images/highgardens-realistic.webp"')
            content = content.replace('images/alpha_realistic_final.jpg', 'images/everglades-new.jpg')
            content = content.replace('images/highlands-realistic.jpg', 'images/highgardens-realistic.jpg')
            content = content.replace('src="/images/plots.webp"', 'src="/images/plots.jpg"')
            content = content.replace('src="/images/landscape.webp"', 'src="/images/landscape.jpg"')
            content = content.replace('src="images/plots.webp"', 'src="images/plots.jpg"')
            content = content.replace('src="images/landscape.webp"', 'src="images/landscape.jpg"')
            
            # Same for href
            content = content.replace('href="/images/plots.webp"', 'href="/images/plots.jpg"')
            content = content.replace('href="/images/landscape.webp"', 'href="/images/landscape.jpg"')
            content = content.replace('href="images/plots.webp"', 'href="images/plots.jpg"')
            content = content.replace('href="images/landscape.webp"', 'href="images/landscape.jpg"')
            content = content.replace('href="/images/lifestyle.webp"', 'href="/images/lifestyle.jpg"')
            content = content.replace('href="/images/hero.webp"', 'href="/images/hero-township.jpg"')
            content = content.replace('href="../hero-township.webp"', 'href="../images/hero-township.jpg"')
            content = content.replace('href="/images/hero-township.webp"', 'href="/images/hero-township.jpg"')
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    print(f"Successfully processed {count} files with corrections.")

if __name__ == "__main__":
    fix_all('.')
