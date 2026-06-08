import os
import re

def apply_branding(directory):
    favicon_html = """
    <link rel="icon" type="image/png" href="/assets/branding/favicon.png">
    <link rel="apple-touch-icon" href="/assets/branding/apple-touch-icon.png">
    """
    
    # Navigation logo replacement (Clean text logo with tagline)
    nav_pattern = re.compile(r'<div class="brand-logo-text">.*?</div>', re.DOTALL)
    # Using the new refined logo at 50px height for legibility
    nav_replacement = '<img src="/assets/branding/logo.png" alt="Paranjape Forest Trails Logo" style="height: 65px; width: auto; display: block;">'
    
    # Navigation brand link fallback
    brand_link_pattern = re.compile(r'<a href="/" class="nav-brand">.*?</a>', re.DOTALL)
    brand_link_replacement = f'<a href="/" class="nav-brand"><img src="/assets/branding/logo.png" alt="Paranjape Forest Trails Logo" style="height: 65px; width: auto; display: block;"></a>'

    # Loader logo replacement
    loader_pattern = re.compile(r'<div class="loader-logo">.*?</div>', re.DOTALL)
    loader_replacement = '<div class="loader-logo"><img src="/assets/branding/logo.png" alt="Paranjape Logo" style="height: 45px; width: auto;"></div>'

    html_files = []
    for root, dirs, files in os.walk(directory):
        if any(d in root for d in ["node_modules", ".git", ".venv"]): continue
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))

    print(f"Found {len(html_files)} HTML files. Re-applying refined branding (Refined Text + Tagline)...")

    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update Favicon (if missing)
        if 'rel="icon"' not in content and '<head>' in content:
            if '<meta charset="UTF-8">' in content:
                content = content.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">' + favicon_html)
            else:
                content = content.replace('<head>', '<head>' + favicon_html)

        # Update Nav Brand content
        if re.search(nav_pattern, content):
            content = nav_pattern.sub(nav_replacement, content)
        elif re.search(brand_link_pattern, content):
            content = brand_link_pattern.sub(brand_link_replacement, content)
            
        # Update Loader Logo
        content = loader_pattern.sub(loader_replacement, content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    print("Refined branding refinement complete.")

if __name__ == "__main__":
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    apply_branding(project_root)
