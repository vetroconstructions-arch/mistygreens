import re

filepath = "index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

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

# The structure is:
# <div class="cluster-card" ...>
#     <div class="cluster-img-wrap">
#         <img ...>
#         <span class="cluster-badge">...</span>
#     </div>
#     <div class="cluster-info">
#         <h3 class="cluster-title">CLUSTER NAME</h3>

# We will iterate through each cluster card and inject the RERA badge inside cluster-img-wrap

def inject_badge(match):
    full_card = match.group(0)
    
    # Extract the cluster title
    title_match = re.search(r'<h3 class="cluster-title">(.*?)</h3>', full_card)
    if not title_match:
        return full_card
        
    title = title_match.group(1).strip()
    rera_num = rera_mapping.get(title)
    
    if not rera_num:
        print(f"Warning: No RERA mapped for {title}")
        return full_card
        
    # If already injected, skip
    if "maha-rera-badge" in full_card:
        return full_card
        
    badge_html = f'''
                <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" class="maha-rera-badge" aria-label="MahaRERA Registration">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MahaRERA:{rera_num}" alt="QR Code" width="45" height="45">
                    <span>{rera_num}</span>
                </a>'''
                
    # Inject just before the closing </div> of cluster-img-wrap
    # Since we can't easily find the closing div of cluster-img-wrap without a full HTML parser, 
    # we can just inject it right after the <div class="cluster-img-wrap">
    
    new_card = re.sub(r'(<div class="cluster-img-wrap">)', r'\1' + badge_html, full_card, count=1)
    
    print(f"Injected RERA {rera_num} for {title}")
    return new_card

new_content = re.sub(r'<div class="cluster-card".*?(?:<h3 class="cluster-title">.*?</h3>).*?</div>\s*</div>\s*</div>', inject_badge, content, flags=re.I | re.DOTALL)

# Let's try a safer regex pattern: match from <div class="cluster-card" to the <h3 class="cluster-title">
# Actually, the safest way is to split by `<div class="cluster-card"`
parts = content.split('<div class="cluster-card"')
final_parts = [parts[0]]

for part in parts[1:]:
    card_html = '<div class="cluster-card"' + part
    title_match = re.search(r'<h3 class="cluster-title">(.*?)</h3>', card_html)
    
    if title_match and "maha-rera-badge" not in card_html:
        title = title_match.group(1).strip()
        rera_num = rera_mapping.get(title)
        
        if rera_num:
            badge_html = f'''
                <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" class="maha-rera-badge" aria-label="MahaRERA Registration">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MahaRERA:{rera_num}" alt="QR Code" width="45" height="45">
                    <span>{rera_num}</span>
                </a>'''
            card_html = card_html.replace('<div class="cluster-img-wrap">', f'<div class="cluster-img-wrap">{badge_html}', 1)
            print(f"Injected RERA {rera_num} for {title}")
    
    final_parts.append(card_html)

# We have to join with empty string because the split removed `<div class="cluster-card"` but we put it back
new_content = "".join(final_parts)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Injection complete.")
