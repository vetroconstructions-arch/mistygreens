import os
import re

def update_rera(directory):
    pattern = re.compile(r'("name":\s*"Misty Greens Plots",\s*"identifier":\s*")P52100025341(")')
    count = 0
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or '.wrangler' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content, num_subs = pattern.subn(r'\g<1>P52100030283\g<2>', content)
                    
                    if num_subs > 0:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {file_path}")
                        count += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    print(f"Total files updated: {count}")

update_rera('.')
