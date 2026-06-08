import os
import re

def audit_site(directory):
    html_files = []
    for root, _, files in os.walk(directory):
        # Exclude internal architecture
        if any(x in root.replace(os.sep, '/') for x in ['node_modules', '.git', '.wrangler', 'components', 'scripts']):
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    print(f"Auditing {len(html_files)} HTML files...\n")
    
    broken_links = []
    missing_assets = []
    seo_issues = []

    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 1. SEO Meta Checks
            if '<title>' not in content.lower():
                seo_issues.append(f"File: {file_path} | Missing <title>")
            if '<meta name="description"' not in content.lower():
                seo_issues.append(f"File: {file_path} | Missing meta description")
                
            # 2. Semantic & Navigation Hardening Checks
            if 'mobile-sticky-bar' not in content:
                seo_issues.append(f"File: {file_path} | WARNING: Missing Mobile Conversion Sticky Bar")

            h1_matches = re.findall(r'<h1', content, re.IGNORECASE)
            if len(h1_matches) == 0:
                seo_issues.append(f"File: {file_path} | CRITICAL: Missing <h1> tag")
            elif len(h1_matches) > 1:
                 seo_issues.append(f"File: {file_path} | WARNING: Multiple <h1> tags found ({len(h1_matches)})")

            # Check for keyword cluster density (100+ keywords check)
            if len(re.findall(r'Bhugaon|Forest Trails|Pune|Paranjape|Plots|Township|Investment', content, re.IGNORECASE)) < 100:
                 seo_issues.append(f"File: {file_path} | WARNING: Low keyword density for Pune Real Estate market")

            # Check for images missing alt tags
            img_tags = re.findall(r'<img\s+([^>]+)>', content, re.IGNORECASE)
            for img in img_tags:
                if 'alt=' not in img.lower():
                    seo_issues.append(f"File: {file_path} | Missing ALT tag on <img>")

            # Check for SEO Mesh Footer
            if 'seo-mesh-footer' not in content:
                 seo_issues.append(f"File: {file_path} | Missing Internal Link Mesh")
            
            # 3. Link Checks
            hrefs = re.findall(r'href=["\'](?!http|mailto|tel|#)(.*?)["\']', content)
            for href in hrefs:
                clean_href = href.split('?')[0].split('#')[0]
                if not clean_href: continue
                
                if clean_href.startswith('/'):
                    target_path = os.path.join(directory, clean_href.lstrip('/'))
                else:
                    target_path = os.path.join(os.path.dirname(file_path), clean_href)
                    
                if os.path.isdir(target_path):
                    target_path = os.path.join(target_path, 'index.html')
                
                if not os.path.exists(target_path):
                    broken_links.append(f"File: {file_path} | Broken Link: {href}")

            # 4. Asset Checks
            srcs = re.findall(r'src=["\'](?!http|//|data)(.*?)["\']', content)
            for src in srcs:
                 clean_src = src.split('?')[0].split('#')[0]
                 if not clean_src: continue
                 
                 if clean_src.startswith('/'):
                     target_path = os.path.join(directory, clean_src.lstrip('/'))
                 else:
                     target_path = os.path.join(os.path.dirname(file_path), clean_src)
                     
                 if not os.path.exists(target_path):
                     missing_assets.append(f"File: {file_path} | Missing Asset: {src}")

        except Exception as e:
            print(f"Error parsing {file_path}: {e}")

    # Print Report
    print(f"\n=== AUDIT RESULTS FOR {len(html_files)} FILES ===\n")
    
    print(f"--- SEO & Semantic Issues ({len(seo_issues)}) ---")
    for issue in seo_issues: print(issue)
    
    print(f"\n--- Broken Links ({len(broken_links)}) ---")
    for link in broken_links: print(link)
    
    print(f"\n--- Missing Assets ({len(missing_assets)}) ---")
    for asset in missing_assets: print(asset)

if __name__ == "__main__":
    audit_site('.')
