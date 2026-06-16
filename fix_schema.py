import os
import json
import re

def process_obj(obj):
    if isinstance(obj, dict):
        obj_type = obj.get('@type', '')
        if obj_type in ['RealEstateProject', 'RealEstateListing', 'LocalBusiness', 'Organization']:
            if 'aggregateRating' in obj:
                del obj['aggregateRating']
            if 'review' in obj:
                del obj['review']
        for k, v in list(obj.items()):
            process_obj(v)
    elif isinstance(obj, list):
        for item in obj:
            process_obj(item)

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    pattern = r'(<script type="application/ld\+json">)(.*?)(</script>)'
    
    def replacer(match):
        prefix = match.group(1)
        json_str = match.group(2)
        suffix = match.group(3)
        try:
            data = json.loads(json_str)
            process_obj(data)
            return prefix + '\n    ' + json.dumps(data, indent=2) + '\n    ' + suffix
        except json.JSONDecodeError:
            return match.group(0)
            
    new_content = re.sub(pattern, replacer, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

count = 0
for root, _, files in os.walk("."):
    if ".git" in root or "node_modules" in root:
        continue
    for f in files:
        if f.endswith(".html"):
            if fix_file(os.path.join(root, f)):
                count += 1

print(f"Successfully fixed schema in {count} HTML files.")
