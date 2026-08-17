import os
import re
from datetime import datetime, timezone

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
                html_files.append((full_path, final_url, rel_path))
                
    # 2. Sync Canonicals
    modified_count = 0
    canonical_pattern = re.compile(r'<link\s+rel="canonical"\s+href="[^"]*"\s*/?>', re.IGNORECASE)
    
    for file_path, strict_url, _ in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_tag = f'<link rel="canonical" href="{strict_url}">'
            
            if canonical_pattern.search(content):
                new_content = canonical_pattern.sub(new_tag, content)
            else:
                new_content = re.sub(r'</head>', f'    {new_tag}\n</head>', content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                modified_count += 1
                
        except Exception as e:
            print(f"Error canonicalizing {file_path}: {e}")

    print(f"Synced strict canonical URLs on {modified_count} HTML files.")
    
    # 3. Categorize URLs for the Advanced Sitemap Index
    categories = {
        "core": [],
        "sectors": [],
        "amenities": [],
        "blogs": [],
        "connectivity": [],
        "comparisons": [],
        "investment": [],
        "legal": []
    }
    
    for file_path, strict_url, rel_path in html_files:
        # Don't index 404 or thank you pages
        if "404" in strict_url or "thank-you" in strict_url:
            continue
            
        url_lower = strict_url.lower()
        
        # Classification rules
        if rel_path in ['index.html', 'paranjape-forest-trails-township-bhugaon-villas-plots.html', 'paranjape-forest-trails-township-bhugaon-facilities.html', 'bhugaon-growth-ledger.html']:
            categories["core"].append((strict_url, "1.0", "daily"))
        elif any(x in url_lower for x in ["comparisons", "-vs-", "vs-"]):
            categories["comparisons"].append((strict_url, "0.85", "weekly"))
        elif any(x in url_lower for x in ["investment", "growth-ledger", "appreciation-forecast", "rental-yield", "tax-benefits", "pmrda-ring-road"]):
            categories["investment"].append((strict_url, "0.85", "weekly"))
        elif any(x in url_lower for x in ["blogs", "blog/"]):
            categories["blogs"].append((strict_url, "0.8", "weekly"))
        elif any(x in url_lower for x in ["sectors", "bungalows", "villas", "apartments"]):
            categories["sectors"].append((strict_url, "0.9", "weekly"))
        elif any(x in url_lower for x in ["amenities", "cliff-lifestyle-hub", "the-cove", "verandah", "highgardens", "highlands", "the-cliff-club", "equestrian", "school", "spa-retreat"]):
            categories["amenities"].append((strict_url, "0.8", "weekly"))
        elif any(x in url_lower for x in ["location", "connectivity", "near-", "proximity"]):
            categories["connectivity"].append((strict_url, "0.8", "weekly"))
        elif "legal" in url_lower:
            categories["legal"].append((strict_url, "0.5", "monthly"))
        else:
            # Fallback
            categories["core"].append((strict_url, "0.7", "weekly"))

    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")
    
    # 4. Generate Sub-Sitemaps
    active_categories = []
    for cat_name, items in categories.items():
        if not items:
            continue
        
        active_categories.append(cat_name)
        sitemap_lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        ]
        
        for strict_url, priority, changefreq in items:
            sitemap_lines.append("  <url>")
            sitemap_lines.append(f"    <loc>{strict_url}</loc>")
            sitemap_lines.append(f"    <lastmod>{date_str}</lastmod>")
            sitemap_lines.append(f"    <changefreq>{changefreq}</changefreq>")
            sitemap_lines.append(f"    <priority>{priority}</priority>")
            sitemap_lines.append("  </url>")
            
        sitemap_lines.append("</urlset>")
        
        cat_file = f"sitemap-{cat_name}.xml"
        with open(os.path.join(base_dir, cat_file), 'w', encoding='utf-8') as f:
            f.write("\n".join(sitemap_lines))
        print(f"Generated sitemap-{cat_name}.xml with {len(items)} entries.")
        
    # 5. Generate Master Sitemap Index (sitemap.xml)
    index_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    
    for cat_name in active_categories:
        index_lines.append("  <sitemap>")
        index_lines.append(f"    <loc>{DOMAIN}/sitemap-{cat_name}.xml</loc>")
        index_lines.append(f"    <lastmod>{date_str}</lastmod>")
        index_lines.append("  </sitemap>")
        
    index_lines.append("</sitemapindex>")
    
    with open(os.path.join(base_dir, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write("\n".join(index_lines))
    print(f"Generated master sitemap index sitemap.xml pointing to {len(active_categories)} sub-sitemaps.")
    
    # 6. Generate Sovereign Hardened Robots.txt
    robots_content = f"""# Sovereign Search & AI Robot Directive Architecture v8.0
# Domain: {DOMAIN}

# 1. Global Search Engine Crawlers
User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: Googlebot-Video
User-agent: Googlebot-Mobile
User-agent: Bingbot
User-agent: Slurp
User-agent: DuckDuckBot
User-agent: Baiduspider
User-agent: YandexBot
Allow: /
Disallow: /components/
Disallow: /scratch/
Disallow: /scripts/
Disallow: /404.html
Disallow: /thank-you.html

# 2. Modern AI & LLM Search Crawlers
User-agent: Google-Extended
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: ClaudeBot
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /components/
Disallow: /scratch/
Disallow: /scripts/

# 3. Default Rule for All Other Crawlers
User-agent: *
Allow: /
Disallow: /components/
Disallow: /scratch/
Disallow: /scripts/
Disallow: /404.html
Disallow: /thank-you.html

# 4. Master Sitemap Index & Host Reference
Host: {DOMAIN}
Sitemap: {DOMAIN}/sitemap.xml
"""
    with open(os.path.join(base_dir, 'robots.txt'), 'w', encoding='utf-8') as f:
        f.write(robots_content)
    print("Generated sovereign hardened robots.txt.")

if __name__ == "__main__":
    generate_seo_matrix('.')

