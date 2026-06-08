import os
import re

def extract_title(content):
    match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    if match:
        # Extract title and remove brand fluff for the H1
        title = match.group(1).split('|')[0].strip()
        title = title.replace('Paranjape Forest Trails', '').replace('Bhugaon', '').replace('Pune', '').replace('-', '').strip()
        if not title:
             title = "Paranjape Forest Trails Township"
        return title
    return "Paranjape Forest Trails Township"

def harden_fortress(directory):
    html_files = []
    for root, _, files in os.walk(directory):
        if any(x in root.replace(os.sep, '/') for x in ['node_modules', '.git', '.wrangler', 'components', 'scripts']):
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
            
            # 1. Structural Link Hardening (Regex and absolute mapping)
            # Map the phantom apartments page to the correct cluster
            content = re.sub(r'href=["\']/?paranjape-forest-trails-township-bhugaon-apartments-pune\.html["\']', 'href="/paranjape-forest-trails-township-bhugaon-apartments/"', content)
            
            # Map amenities
            content = re.sub(r'href=["\']/?amenities-the-cliff-club\.html["\']', 'href="/amenities/the-cliff-club/"', content)
            content = re.sub(r'href=["\']/?amenities-equestrian\.html["\']', 'href="/amenities/equestrian-academy-pune/"', content)
            
            # Fix relative image paths in nested directories to absolute
            if 'images/' in file_path or 'assets/' in file_path:
                pass # Don't touch actual image files or asset files if they were html
            
            # Force all relative image references to root-absolute
            content = re.sub(r'src=["\']\./images/(.*?)["\']', r'src="/images/\1"', content)
            content = re.sub(r'src=["\']\.\./images/(.*?)["\']', r'src="/images/\1"', content)
            content = re.sub(r'href=["\']\./images/(.*?)["\']', r'href="/images/\1"', content)
            content = re.sub(r'href=["\']\.\./images/(.*?)["\']', r'href="/images/\1"', content)

            # Map the broken na-bungalow links
            content = re.sub(r'href=["\']/?na-bungalow-plots-bhugaon/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-na-bungalow-plots-bhugaon/"', content)
            content = re.sub(r'href=["\']/?luxury-forest-villas-bhugaon/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-luxury-forest-villas-bhugaon/"', content)
            content = re.sub(r'href=["\']/?premium-apartments-forest-trails/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-premium-apartments-forest-trails/"', content)
            content = re.sub(r'href=["\']/?property-investment-bhugaon-pune/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-property-investment-bhugaon-pune/"', content)
            content = re.sub(r'href=["\']/?paranjape-schemes-forest-trails-bhugaon/?["\']', 'href="/paranjape-forest-trails-township-bhugaon-about-paranjape-schemes/"', content)

            # 2. Semantic H1 Injection
            h1_matches = re.findall(r'<h1', content, re.IGNORECASE)
            if len(h1_matches) == 0:
                h1_title = extract_title(content)
                # Inject right after <div class="content"> or <body>
                h1_html = f'\n    <h1 style="text-align: center; font-size: 2.5rem; margin: 2rem 0; color: #2c3e50;">{h1_title}</h1>\n'
                
                if '<div class="content">' in content:
                    content = content.replace('<div class="content">', f'<div class="content">{h1_html}', 1)
                elif '<div class="container">' in content:
                    content = content.replace('<div class="container">', f'<div class="container">{h1_html}', 1)
                elif '<main>' in content:
                    content = content.replace('<main>', f'<main>{h1_html}', 1)
                elif '<body>' in content:
                    content = content.replace('<body>', f'<body>{h1_html}', 1)

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    print(f"Fortress Engine: Successfully hardened {count} files.")

if __name__ == "__main__":
    harden_fortress('.')
