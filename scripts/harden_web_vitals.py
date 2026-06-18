import os
import re
import json

def minify_asset(src, dest, is_css=False):
    if not os.path.exists(src): return
    with open(src, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if is_css:
        # Simple CSS minifier
        content = re.sub(r'/\*[\s\S]*?\*/', '', content) # Remove comments
        content = re.sub(r'\s+', ' ', content) # Collapse whitespace
        content = content.replace(' {', '{').replace('{ ', '{').replace(' }', '}').replace('} ', '}')
        content = content.replace(': ', ':').replace('; ', ';')
    else:
        # Basic JS shrink (safer string handling needed for full minification, but we can do a light pass)
        content = re.sub(r'//.*', '', content) # single line
        content = re.sub(r'/\*[\s\S]*?\*/', '', content) # block
        content = re.sub(r'\n+', '\n', content)
        content = re.sub(r'^\s+', '', content, flags=re.MULTILINE)

    with open(dest, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Minified {src} -> {dest}")

def generate_headers(base_dir):
    content = """/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https://api.qrserver.com https://www.googletagmanager.com; connect-src 'self' https://formsubmit.co https://www.google-analytics.com; frame-src 'self' https://www.youtube.com https://www.google.com/maps/; form-action 'self' https://formsubmit.co; object-src 'none'; base-uri 'self';
/images/*
  Cache-Control: public, max-age=31536000, immutable
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/scripts/*
  Cache-Control: public, max-age=86400
/styles/*
  Cache-Control: public, max-age=86400
/*.css
  Cache-Control: public, max-age=86400
/*.js
  Cache-Control: public, max-age=86400
"""
    with open(os.path.join(base_dir, '_headers'), 'w', encoding='utf-8') as f:
        f.write(content)
    print("Generated Cloudflare _headers file.")

def generate_faq_schema(cluster_name):
    # Dynamic generation based on the cluster
    name = cluster_name.replace('-', ' ').title()
    if 'Canopy' in name:
        q1 = "What is the price of Canopy Apartments in Bhugaon?"
        a1 = "Canopy Apartments offers premium 2, 3 & 4 BHK luxury flats. Please request a callback for the most up-to-date Paranjape Forest Trails pricing."
        q2 = "Is Canopy located inside Paranjape Forest Trails?"
        a2 = "Yes, Canopy is a newly launched premium apartment cluster securely located within the 190-acre Paranjape Forest Trails township in Bhugaon."
    elif 'Misty' in name:
        q1 = "Are there NA Bungalow Plots available in Bhugaon?"
        a1 = "Yes, Misty Greens within Paranjape Forest Trails offers legally clear, RERA-compliant NA Bungalow plots ranging across multiple dimensions."
        q2 = "What amenities do Misty Greens Plot owners get?"
        a2 = "Plot owners gain exclusive access to the 190-acre township infrastructure, including The Cliff Club, Equestrian Centre, and 24/7 security."
    elif 'Cove' in name:
        q1 = "Does Paranjape Forest Trails have luxury villas?"
        a1 = "The Cove Duplex Villas is our flagship luxury standalone living cluster situated inside the premium zones of the township."
        q2 = "How far is The Cove from Kothrud?"
        a2 = "The Cove Duplex Villas are located within Paranjape Forest Trails, Bhugaon, just a signal-free 10-15 minute drive from the Kothrud intersection."
    else:
        return "" # Don't inject for generic pages

    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": q1,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": a1
          }
        },
        {
          "@type": "Question",
          "name": q2,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": a2
          }
        }
      ]
    }
    return f'\n    <script type="application/ld+json">\n    {json.dumps(schema, indent=2)}\n    </script>\n'

def process_html_files(base_dir):
    html_files = []
    for root, _, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or '.wrangler' in root: continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
                
    mod_count = 0
    img_tag_pattern = re.compile(r'<img\s+([^>]+)>', re.IGNORECASE)
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            
            # Sub Asset Links
            content = content.replace('/style.css', '/style.min.css')
            content = content.replace('href="style.css', 'href="style.min.css')
            content = content.replace('/script.js', '/script.min.js')
            content = content.replace('src="script.js', 'src="script.min.js')
            
            # Dynamic FAQ injection for Cluster Pages
            if 'paranjape-forest-trails-township-bhugaon-' in file_path:
                cluster_name = file_path.split('township-bhugaon-')[1].split('/')[0]
                faq = generate_faq_schema(cluster_name)
                if faq and 'FAQPage' not in content:
                    content = re.sub(r'</head>', f'{faq}</head>', content, flags=re.IGNORECASE)
            
            # Lazy Loading Enforcement
            # We want to add loading="lazy" decoding="async" to images IF they don't already have it AND they aren't critical heroes
            def img_repl(match):
                inner = match.group(1)
                # Ignore heroes and logos which must load instantly (LCP)
                if 'hero' in inner.lower() or 'logo' in inner.lower() or 'loading=' in inner.lower():
                    return match.group(0)
                # Ensure we don't duplicate
                new_inner = inner + ' loading="lazy" decoding="async"'
                return f'<img {new_inner}>'
                
            content = img_tag_pattern.sub(img_repl, content)
            
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                mod_count += 1
                
        except Exception as e:
            print(f"Error on {file_path}: {e}")

    print(f"Updated {mod_count} HTML files containing minified routes, FAQs, and lazy-loading parameters.")

if __name__ == "__main__":
    minify_asset('style.css', 'style.min.css', is_css=True)
    minify_asset('script.js', 'script.min.js', is_css=False)
    generate_headers('.')
    process_html_files('.')
