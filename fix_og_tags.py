import os, re

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if og:title already exists
    if re.search(r"<meta\s+property=[\"']og:title[\"']", content, re.I):
        return False

    # Extract <title>
    title_match = re.search(r"<title>(.*?)</title>", content, re.I | re.DOTALL)
    if not title_match:
        return False
    
    title_text = title_match.group(1).strip()
    og_tag = f'\n    <meta property="og:title" content="{title_text}">'

    # Inject og:title right after <title>
    new_content = re.sub(r"(<title>.*?</title>)", r"\1" + og_tag, content, flags=re.I | re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    return True

fixed_count = 0
for root, _, files in os.walk("."):
    if ".git" in root or "node_modules" in root or "components" in root: continue
    for f in files:
        if f.endswith(".html"):
            filepath = os.path.join(root, f)
            if process_file(filepath):
                fixed_count += 1
                print(f"Fixed og:title in {filepath}")

print(f"Total files fixed: {fixed_count}")
