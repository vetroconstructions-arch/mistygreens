import os
import re
from datetime import datetime

DOMAIN = "https://www.paranjapetownship.com"

def generate_seo_matrix(base_dir):
    html_files = []
    
    # 1. Walk directory and map all HTML files
    for root, dirs, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or '.wrangler' in root or '/components' in root.replace(os.sep, '/') or root.endswith('components') or '/scripts' in root.replace(os.sep, '/') or root.endswith('scripts'):
            continue
        for file in files:
            if file.endswith('.html'):
                full_path = os.path.join(root, file)
                # Compute relative URL path
                rel_path = os.path.relpath(full_path, base_dir)
                url_path = rel_path.replace(os.sep, '/')
                
                # Turn 'dir/index.html' into 'dir/' and 'index.html' into ''
                if url_path == 'index.html':
                    url_path = ''
                elif url_path.endswith('/index.html'):
                    url_path = url_path[:-10]
                elif url_path.endswith('index.html'):
                    url_path = url_path[:-10]
                
                final_url = f"{DOMAIN}/{url_path}"
                html_files.append((full_path, final_url))
                
    # 2. Sync Canonicals
    modified_count = 0
    canonical_pattern = re.compile(r'<link\s+rel="canonical"\s+href="[^"]*"\s*/?>', re.IGNORECASE)
    
    for file_path, strict_url in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_tag = f'<link rel="canonical" href="{strict_url}">'
            
            if canonical_pattern.search(content):
                new_content = canonical_pattern.sub(new_tag, content)
            else:
                # If no canonical exists, let's just attempt to inject it before </head>
                new_content = re.sub(r'</head>', f'    {new_tag}\n</head>', content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                modified_count += 1
                
        except Exception as e:
            print(f"Error canonicalizing {file_path}: {e}")

    print(f"Synced strict canonical URLs on {modified_count} HTML files.")
    
    # 3. Generate XML Sitemap
    date_str = datetime.now().strftime("%Y-%m-%dT%H:%M:%S+00:00")
    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    
    for file_path, strict_url in html_files:
        # Determine Priority
        priority = "0.5" # Default
        if strict_url == DOMAIN + "/":
            priority = "1.0"
        elif "blogs/" in strict_url:
            priority = "0.8"
        elif "paranjape-forest-trails-township" in strict_url:
            priority = "0.9"
        elif "amenities" in strict_url:
            priority = "0.7"
        elif "404" in strict_url or "thank-you" in strict_url:
            continue # Don't index these
            
        sitemap_lines.append("  <url>")
        sitemap_lines.append(f"    <loc>{strict_url}</loc>")
        sitemap_lines.append(f"    <lastmod>{date_str}</lastmod>")
        sitemap_lines.append("    <changefreq>weekly</changefreq>")
        sitemap_lines.append(f"    <priority>{priority}</priority>")
        sitemap_lines.append("  </url>")
        
    sitemap_lines.append("</urlset>")
    
    with open(os.path.join(base_dir, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write("\n".join(sitemap_lines))
    print(f"Generated pristine sitemap.xml with {len([l for l in sitemap_lines if '<loc>' in l])} prioritized entries.")
    
    # 4. Generate Robots.txt
    robots_content = f"""User-agent: *
Allow: /
Disallow: /components/
Disallow: /404.html
Disallow: /thank-you.html

Sitemap: {DOMAIN}/sitemap.xml
"""
    with open(os.path.join(base_dir, 'robots.txt'), 'w', encoding='utf-8') as f:
        f.write(robots_content)
    print("Generated explicit robots.txt.")

if __name__ == "__main__":
    generate_seo_matrix('.')
