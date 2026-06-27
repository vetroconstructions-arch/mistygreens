import re

with open('style.css', 'r') as f:
    content = f.read()

# Replace typical hardcoded section paddings with variables
content = re.sub(r'padding:\s*100px\s*0;', 'padding: var(--section-pad-desktop);', content)
content = re.sub(r'padding:\s*4rem\s*0;', 'padding: var(--section-pad-desktop);', content)
content = re.sub(r'padding:\s*3rem\s*0;', 'padding: var(--space-lg) 0;', content)

# Some inner component padding
content = re.sub(r'padding:\s*3rem\s*2rem;', 'padding: var(--space-lg) var(--space-md);', content)
content = re.sub(r'padding:\s*2\.5rem\s*3rem;', 'padding: var(--space-lg);', content)

with open('style.css', 'w') as f:
    f.write(content)
