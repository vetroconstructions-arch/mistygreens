import re

filepath = "index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Step 1: Remove ALL existing maha-rera-badge elements (the <a> tag and its contents)
content = re.sub(
    r'\s*<a href="https://maharera\.maharashtra\.gov\.in/"[^>]*class="maha-rera-badge"[^>]*>.*?</a>\s*',
    '\n',
    content,
    flags=re.DOTALL
)

print("Step 1: Removed all existing maha-rera-badge elements.")

# Step 2: Re-inject as direct child of cluster-card (NOT inside cluster-img-wrap)
rera_mapping = {
    "Misty Greens": "P52100080947",
    "Athashri": "P52100077686",
    "The Canopy": "P52100079518",
    "Verandah": "P52100000067",
    "The Rivolo": "P52100031560",
    "The Highlands": "P52100000066",
    "The Cove": "P52100048536",
    "Everglades II": "P52100022655",
    "Highgardens": "P52100053310"
}

parts = content.split('<div class="cluster-card"')
final_parts = [parts[0]]
injected = 0

for part in parts[1:]:
    card_html = '<div class="cluster-card"' + part
    title_match = re.search(r'<h3 class="cluster-title">(.*?)</h3>', card_html)
    
    if title_match and "maha-rera-badge" not in card_html:
        title = title_match.group(1).strip()
        rera_num = rera_mapping.get(title)
        
        if rera_num:
            # Inject the badge right after the opening <div class="cluster-card" ...>
            # Find the end of the opening tag
            badge_html = f'''
            <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" class="maha-rera-badge" aria-label="MahaRERA {rera_num}">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://maharera.maharashtra.gov.in/project/{rera_num}" alt="MahaRERA QR" class="rera-qr-img">
                <span class="rera-num">{rera_num}</span>
            </a>'''
            
            # Insert after the first > of the cluster-card div
            first_close = card_html.index('>') + 1
            card_html = card_html[:first_close] + badge_html + card_html[first_close:]
            injected += 1
            print(f"Injected RERA {rera_num} for {title}")
    
    final_parts.append(card_html)

new_content = "".join(final_parts)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"\nTotal injected: {injected}")
