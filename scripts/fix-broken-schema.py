import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SKIP_DIRS = ['node_modules', '.git', 'scripts', 'assets', 'images', 'fonts', '.wrangler', '.venv', '.vscode']

def get_all_html_files(directory):
    html_files = []
    for root, dirs, files in os.walk(directory):
        # Filter directories to skip
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def fix_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    original = content
    
    # Pattern: ] </script> , {
    # We want to replace it with , { (to merge the array)
    # Using regex with \s* to handle varied whitespace/newlines
    broken_pattern = re.compile(r'\]\s*</script>\s*,\s*\{', re.IGNORECASE | re.DOTALL)
    
    if broken_pattern.search(content):
        print(f"🛠️ Fixing broken schema in: {file_path}")
        # Replace with a comma and the opening brace, preserving some indentation if possible
        # For simplicity, we'll use a standard replacement
        content = broken_pattern.sub(',\n      {', content)
        
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"❌ Error writing {file_path}: {e}")
            return False
            
    return False

def main():
    print("📡 Schema Repair Engine (Python) starting...")
    files = get_all_html_files(ROOT)
    fixed_count = 0
    
    for file in files:
        if fix_file(file):
            fixed_count += 1
            
    print(f"✅ Repair Complete. Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()
