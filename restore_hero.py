import subprocess
import re

# Get the contents of index.html from commit 12f00380
result = subprocess.run(["git", "show", "12f00380:index.html"], capture_output=True, text=True)
old_content = result.stdout

# Extract the hero section
hero_match = re.search(r'(<section class="hero-section">.*?</section>)', old_content, re.DOTALL)

if hero_match:
    hero_html = hero_match.group(1)
    
    # Read current index.html
    with open("index.html", "r") as f:
        current_content = f.read()
        
    if '<section class="hero-section">' not in current_content:
        # We need to insert it right after the </header> we just added
        new_content = current_content.replace("</header>", f"</header>\n{hero_html}")
        with open("index.html", "w") as f:
            f.write(new_content)
        print("Hero section successfully restored!")
    else:
        print("Hero section already exists.")
else:
    print("Could not find hero section in the old commit.")
