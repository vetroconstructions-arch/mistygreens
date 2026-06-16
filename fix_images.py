import os, re

def process_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()

    def fix_hero(match):
        img_tag = match.group(0)
        img_tag = re.sub(r' loading=["\']lazy["\']', '', img_tag)
        img_tag = re.sub(r' fetchpriority=["\']high["\']', '', img_tag)
        return img_tag.replace('<img ', '<img fetchpriority="high" ')

    new_content = re.sub(r'<img[^>]*src=["\'][^"\']*hero[^"\']*["\'][^>]*>', fix_hero, content)

    def add_lazy(match):
        img_tag = match.group(0)
        if 'fetchpriority="high"' in img_tag or 'hero' in img_tag.lower():
            return img_tag
        if 'loading=' not in img_tag:
            return img_tag.replace('<img ', '<img loading="lazy" ')
        return img_tag

    new_content = re.sub(r'<img[^>]*>', add_lazy, new_content)
    
    if new_content != content:
        with open(filepath, "w") as f:
            f.write(new_content)
        return True
    return False

c = 0
for root, _, files in os.walk("."):
    if ".git" in root or "node_modules" in root: continue
    for f in files:
        if f.endswith(".html"):
            if process_file(os.path.join(root, f)):
                c += 1
print(f"Fixed Web Vitals images in {c} files")
