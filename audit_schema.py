import os, re, json

issues = []

for root, _, files in os.walk("."):
    if ".git" in root or "node_modules" in root: continue
    for f in files:
        if f.endswith(".html"):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8") as html_file:
                content = html_file.read()
                
                # Check JSON-LD
                scripts = re.findall(r'<script\s+type=[\"\']application/ld\+json[\"\']>.*?</script>', content, re.I | re.DOTALL)
                for script in scripts:
                    json_str = re.sub(r'<script\s+type=[\"\']application/ld\+json[\"\']>', '', script, flags=re.I)
                    json_str = re.sub(r'</script>', '', json_str, flags=re.I).strip()
                    try:
                        json.loads(json_str)
                    except json.JSONDecodeError as e:
                        issues.append(f"{filepath}: Invalid JSON-LD - {e}")

print(f"Found {len(issues)} JSON-LD issues.")
for issue in issues[:10]:
    print(" - " + issue)
