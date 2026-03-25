import os
import re
from urllib.parse import urljoin, urlparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_FILES = []

def get_html_files(dir_path):
    for root, dirs, files in os.walk(dir_path):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if '.git' in dirs: dirs.remove('.git')
        if 'scripts' in dirs: dirs.remove('scripts')
        for file in files:
            if file.endswith('.html'):
                PROJECT_FILES.append(os.path.join(root, file))

def check_links_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple regex to find hrefs
    links = re.findall(r'href=["\'](.*?)["\']', content)
    broken = []
    
    for link in links:
        if link.startswith(('http', 'https', 'tel:', 'mailto:', 'javascript:')) or link.startswith('#'):
            continue
        
        # Strip query strings and fragments
        clean_link = link.split('?')[0].split('#')[0]
        if not clean_link: continue

        # Normalize relative paths to absolute-root
        if not clean_link.startswith('/'):
            rel_dir = os.path.dirname(os.path.relpath(file_path, BASE_DIR))
            normalized = os.path.normpath(os.path.join('/', rel_dir, clean_link))
        else:
            normalized = os.path.normpath(clean_link)

        # Remove trailing slash for path check
        target_path = normalized.lstrip('/')
        if target_path == '': 
            full_target = os.path.join(BASE_DIR, 'index.html')
        else:
            full_target = os.path.join(BASE_DIR, target_path)
        
        # Check if it's a file or a directory with index.html
        exists = os.path.exists(full_target)
        if not exists:
            # Try index.html for directories
            exists = os.path.exists(os.path.join(full_target, 'index.html'))
        
        if not exists:
            broken.append(link)
            
    return broken

get_html_files(BASE_DIR)

print(f"🔍 Auditing {len(PROJECT_FILES)} pages for broken internal links...")
total_broken = 0
for file in PROJECT_FILES:
    broken = check_links_in_file(file)
    if broken:
        rel_path = os.path.relpath(file, BASE_DIR)
        print(f"❌ {rel_path}:")
        for b in set(broken):
            print(f"  - {b}")
        total_broken += len(set(broken))

print(f"\n✅ Audit Complete. Total unique broken links found: {total_broken}")
