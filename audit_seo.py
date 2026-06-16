import os, re
from collections import defaultdict

stats = defaultdict(int)
issues = defaultdict(list)

for root, _, files in os.walk("."):
    if ".git" in root or "node_modules" in root: continue
    for f in files:
        if f.endswith(".html"):
            stats["total_html"] += 1
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8") as html_file:
                content = html_file.read()
                
                # Check title
                if not re.search(r"<title>.*?</title>", content):
                    issues["Missing <title>"].append(filepath)
                
                # Check meta description
                if not re.search(r"<meta\s+name=[\"']description[\"']", content, re.I):
                    issues["Missing meta description"].append(filepath)
                    
                # Check canonical
                if not re.search(r"<link\s+rel=[\"']canonical[\"']", content, re.I):
                    issues["Missing canonical tag"].append(filepath)
                    
                # Check H1
                h1_count = len(re.findall(r"<h1[^>]*>.*?</h1>", content, re.I | re.DOTALL))
                if h1_count == 0:
                    issues["Missing <h1>"].append(filepath)
                elif h1_count > 1:
                    issues["Multiple <h1> tags"].append(f"{filepath} ({h1_count})")
                    
                # Check image alt tags
                imgs = re.findall(r"<img[^>]+>", content, re.I)
                for img in imgs:
                    if "alt=" not in img:
                        issues["Missing alt tag"].append(f"{filepath}: {img[:50]}...")
                        
                # Check Open Graph
                if not re.search(r"<meta\s+property=[\"']og:title[\"']", content, re.I):
                    issues["Missing og:title"].append(filepath)

print(f"Audited {stats['total_html']} HTML files.")
for issue_type, files in issues.items():
    print(f"\n{issue_type}: {len(files)} files")
    for f in files[:5]:
        print(f"  - {f}")
    if len(files) > 5:
        print(f"  - ... and {len(files) - 5} more")
