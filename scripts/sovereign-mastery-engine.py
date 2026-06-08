import os
import re

VERSION = "4.5.0"
ROOT = os.getcwd()
SKIP_DIRS = [
    '.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', 
    '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.wrangler'
]

PRICING_MATRIX = {
    "everglades": "₹46.99 Lakhs*",
    "plots": "₹1.23 Cr*",
    "villas": "₹3.50 Cr*",
    "apartments": "₹85 Lakhs*",
    "highgardens": "₹1.60 Cr*",
    "default": "₹1.23 Cr*"
}

def get_cluster_type(file_path):
    f = file_path.lower()
    if 'everglades' in f: return 'everglades'
    if 'highgardens' in f: return 'highgardens'
    if 'plot' in f: return 'plots'
    if 'villa' in f or 'bungalow' in f: return 'villas'
    if 'apartment' in f or 'canopy' in f: return 'apartments'
    return 'connectivity'

def get_whatsapp_text(cluster_type):
    texts = {
        "everglades": "Hi, I am interested in Paranjape Forest Trails Everglades II 1 & 2 BHK Apartments starting ₹46.99L*.",
        "plots": "Hi, I am interested in Paranjape Forest Trails Misty Greens NA Bungalow Plots starting ₹1.23 Cr*.",
        "villas": "Hi, I am interested in Paranjape Forest Trails Sovereign Forest Villas starting ₹3.50 Cr*.",
        "apartments": "Hi, I am interested in Premium Apartments at Paranjape Forest Trails.",
        "highgardens": "Hi, I am interested in Paranjape Forest Trails Highgardens Apartments starting ₹1.60 Cr*."
    }
    msg = texts.get(cluster_type, "Hi, I am interested in Paranjape Forest Trails Bhugaon.")
    import urllib.parse
    return urllib.parse.quote(msg)

def process_files():
    print(f"📡 Sovereign Mastery Engine v{VERSION} (Hard-Force Sync): Global Visual Refinement...")
    
    for root, dirs, files in os.walk(ROOT):
        # Prune skip dirs
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original = content
                    cluster_type = get_cluster_type(file_path)
                    folder_name = os.path.relpath(os.path.dirname(file_path), ROOT)
                    wa_text = get_whatsapp_text(cluster_type)
                    attribution_label = 'Township Hub' if folder_name == '.' else folder_name.split('-')[-1].upper()

                    # --- 1. HARD-FORCE LOGO TRANSPARENCY & CACHE BUSTING ---
                    if 'class="nav-brand"' in content:
                        content = content.replace('class="nav-brand"', 'class="nav-brand" style="background: transparent !important; background-color: transparent !important; border: none !important; box-shadow: none !important;"')
                    if 'class="header-logo"' in content:
                        content = content.replace('class="header-logo"', 'class="header-logo" style="background: transparent !important; background-color: transparent !important; border: none !important; box-shadow: none !important;"')
                    
                    # Cache Busting (v2.3 for the circular update)
                    content = content.replace('style.min.css?v=2.2', 'style.min.css?v=2.3')
                    content = content.replace('style.min.css?v=2.1', 'style.min.css?v=2.3')
                    
                    # Ensure SVG branding
                    content = content.replace('src="/assets/branding/logo.png"', 'src="/assets/branding/logo.svg"')

                    # --- 2. UX SAFETY BLANKET (PHASE 81: CIRCULAR CTAs) ---
                    safety_blanket = f"""
    <!-- Sovereign UX Safety Blanket (Sync v{VERSION}) -->
    <style>
        :root {{ --zi-bavbar: 10001; --zi-modal: 10005; }}
        #sovereign-bavbar {{ z-index: var(--zi-bavbar) !important; bottom: 0; left: 0; right: 0; }}
        .concierge-modal, #master-plan-modal, #exit-intent-modal, .swal2-container {{ z-index: var(--zi-modal) !important; }}
        .header-main {{ z-index: 10002 !important; }}
        .heritage-ticker:nth-of-type(n+2) {{ display: none !important; }}
        .nav-brand, .header-logo {{ background: transparent !important; border: none !important; box-shadow: none !important; }}
        
        /* Phase 81: Global Circular WhatsApp Refinement */
        .whatsapp-btn, .bav-pill-wa {{ 
            border-radius: 50% !important; 
            width: 44px !important; 
            height: 44px !important; 
            display: flex !important; 
            align-items: center !important; 
            justify-content: center !important; 
            padding: 0 !important; 
            overflow: hidden !important;
            flex-shrink: 0 !important;
        }}
    </style>"""
                    
                    if 'Sovereign UX Safety Blanket' in content:
                        content = re.sub(r'<!-- Sovereign UX Safety Blanket.*?-->.*?<!-- /Sovereign UX Safety Blanket -->', safety_blanket, content, flags=re.DOTALL)
                    else:
                        content = content.replace('</head>', f'{safety_blanket}\n</head>')

                    # --- 3. BAVBAR REFINEMENT (PHASE 81: CIRCULAR) ---
                    bavbar_pattern = r'<!-- Sovereign BavBar.*?-->.*?<!-- /Sovereign BavBar -->'
                    content = re.sub(bavbar_pattern, '', content, flags=re.DOTALL)
                    
                    sovereign_bavbar = f"""
    <!-- Sovereign BavBar (Sync v{VERSION}) -->
    <div class="mobile-sticky-bar" id="sovereign-bavbar">
        <a href="https://wa.me/917744009295?text={wa_text}&utm_cluster={attribution_label}" target="_blank" rel="noopener" class="bav-pill bav-pill-wa">
            <i class="fab fa-whatsapp" style="font-size: 1.6rem;"></i>
        </a>
        <button class="bav-pill bav-pill-enq open-enquiry-modal">
            <i class="fas fa-envelope"></i>
            <span>Enquiry</span>
        </button>
        <button class="bav-pill-eco" onclick="window.location.href='/investment/growth-ledger/'" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: none; border: none; color: #fff; cursor: pointer;">
            <i class="fas fa-chart-line" style="font-size: 1.2rem; margin-bottom: 2px; color: #8C732F;"></i>
            <span style="font-size: 0.6rem; font-weight: 800; text-transform: uppercase;">Growth</span>
        </button>
    </div>
    <!-- /Sovereign BavBar -->"""
                    content = content.replace('</body>', f'{sovereign_bavbar}\n</body>')

                    if content != original:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                            
                except Exception as e:
                    print(f"❌ Error refining {file_path}: {str(e)}")

    print(f"✅ Sovereign Mastery Engine v{VERSION}: Visual Purge Complete.")

if __name__ == "__main__":
    process_files()
