import os
import re
from datetime import datetime

today = datetime.now().strftime('%Y-%m-%d')
ROOT = '.'
DOMAIN = 'https://www.paranjapetownship.com'

# Priority tiers
HIGH_PRIORITY = ['index.html']
MEDIUM_DIRS = ['paranjape-forest-trails-township-bhugaon', 'scripts']

urls = []

for root, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'components', '.github', 'brain', 'images', 'assets', 'vendor', 'styles']]
    for f in files:
        if f.endswith('.html') and f not in ['thank-you.html', '404.html']:
            filepath = os.path.join(root, f)
            rel = os.path.relpath(filepath, ROOT)
            
            # Build URL
            url_path = rel.replace('index.html', '').replace('\\', '/')
            if url_path and not url_path.endswith('/'):
                url_path += '/'
            url = f"{DOMAIN}/{url_path}"
            
            # Assign priority
            if rel == 'index.html':
                priority = '1.0'
                changefreq = 'daily'
            elif any(d in rel for d in MEDIUM_DIRS):
                priority = '0.9'
                changefreq = 'weekly'
            else:
                priority = '0.8'
                changefreq = 'weekly'
            
            urls.append((url, today, changefreq, priority))

# Sort: homepage first, then by priority desc
urls.sort(key=lambda x: (x[3] != '1.0', x[3] != '0.9', x[0]))

# Generate XML
xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>']
xml_lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for url, lastmod, changefreq, priority in urls:
    xml_lines.append(f'  <url>')
    xml_lines.append(f'    <loc>{url}</loc>')
    xml_lines.append(f'    <lastmod>{lastmod}</lastmod>')
    xml_lines.append(f'    <changefreq>{changefreq}</changefreq>')
    xml_lines.append(f'    <priority>{priority}</priority>')
    xml_lines.append(f'  </url>')

xml_lines.append('</urlset>')

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml_lines) + '\n')

print(f"✅ Sitemap regenerated with {len(urls)} URLs, all dated {today}")
