import re

with open('style.css', 'r') as f:
    content = f.read()

# Replace specific large clamps and hardcoded titles first
content = re.sub(r'font-size:\s*clamp\(.*?\);\s*/\*\s*Conservative desktop scaling\s*\*/', 'font-size: var(--text-xl);', content)
content = re.sub(r'font-size:\s*clamp\(.*?\);\s*/\*\s*Capped to prevent overflow distortion\s*\*/', 'font-size: var(--text-display);', content)

# Broad scale replacements (only replacing exact font-size rules)
replacements = [
    (r'font-size:\s*(0\.6|0\.7|0\.75)rem;', 'font-size: var(--text-xs);'),
    (r'font-size:\s*(0\.8|0\.85)rem;', 'font-size: var(--text-sm);'),
    (r'font-size:\s*(0\.9|1)rem;', 'font-size: var(--text-base);'),
    (r'font-size:\s*(1\.1|1\.2|1\.25)rem;', 'font-size: var(--text-md);'),
    (r'font-size:\s*(1\.5|1\.8|2)rem;', 'font-size: var(--text-lg);'),
    (r'font-size:\s*(2\.5|3)rem;', 'font-size: var(--text-xl);'),
    (r'font-size:\s*(3\.5|4|5|6)rem;', 'font-size: var(--text-display);'),
    (r'font-size:\s*16px;', 'font-size: var(--text-base);'),
]

for old, new in replacements:
    content = re.sub(old, new, content)

with open('style.css', 'w') as f:
    f.write(content)
