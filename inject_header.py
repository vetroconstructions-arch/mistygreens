import os
import re

source_file = "paranjape-forest-trails-township-bhugaon-plots/index.html"
target_file = "index.html"

# Read source file
with open(source_file, "r") as f:
    source_content = f.read()

# Extract header block
header_match = re.search(r'(<header class="header-main">.*?</header>)', source_content, re.DOTALL)
if header_match:
    header_html = header_match.group(1)
    
    # Read target file
    with open(target_file, "r") as f:
        target_content = f.read()
        
    # Check if header already exists
    if '<header class="header-main">' not in target_content:
        # Inject right after <body>
        new_content = target_content.replace('<body>', f'<body>\n{header_html}')
        
        with open(target_file, "w") as f:
            f.write(new_content)
        print("Successfully injected header into index.html")
    else:
        print("Header already exists in index.html")
else:
    print("Could not find header in source file")
