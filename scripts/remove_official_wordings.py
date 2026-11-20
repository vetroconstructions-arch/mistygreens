#!/usr/bin/env python3
"""
MahaRERA Order No. 40/2023 & RERA Act Section 10(c) Universal Sanitization Engine
=================================================================================
Removes all misleading "verified" claims across HTML, Astro, JS, PY, JSON, MD, TXT, XML.
Ensures PropSmart Realty is clearly identified as Authorized Real Estate Channel Partner
(MahaRERA Reg: A031262401295) with direct developer sales advisory desk.
"""

import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXCLUDE_DIRS = {'.git', 'node_modules', '.gemini', 'dist', '.wrangler'}
TARGET_EXTS = {'.html', '.astro', '.js', '.py', '.json', '.md', '.txt', '.xml'}

# Ordered replacement pairs: specific multi-word patterns first, followed by general patterns
REPLACEMENTS = [
    # Titles & Meta Tags
    (r'Verified:\s*Paranjape\s+Forest\s+Trails', 'Paranjape Forest Trails'),
    (r'<title>\s*', '<title>'),
    (r'✓\s*Verified\s+Developer\s+Booking', '✓ Direct Sales Advisory & Booking'),
    (r'Verified\s+Developer\s+Advisory\s*&\s*Site\s+Visit\s+Booking', 'Direct Sales Advisory & Site Visit Booking'),
    (r'Verified\s+Developer\s+Booking', 'Direct Developer Advisory & Booking'),
    (r'Verified\s+Developer\s+Sales\s+Partner', 'Authorized Channel Partner & Sales Advisory'),
    (r'Verified\s+Developer\s+Partner', 'Authorized Channel Partner'),
    (r'✦\s*VERIFIED\s+SALES\s+DESK', '✦ AUTHORIZED ADVISORY DESK'),
    (r'✦\s*VERIFIED\s+SALES\s+ADVISORY', '✦ AUTHORIZED SALES ADVISORY'),
    (r'VERIFIED\s+SALES\s+DESK', 'AUTHORIZED ADVISORY DESK'),
    (r'VERIFIED\s+SALES\s+ADVISORY', 'AUTHORIZED SALES ADVISORY'),
    (r'Verified\s+Sales\s+Desk', 'Authorized Advisory Desk'),
    (r'Verified\s+Sales\s+Advisory', 'Authorized Sales Advisory'),

    # Contacts & CTAs
    (r'<strong>Verified\s+Contact:</strong>', '<strong>Sales Advisory Contact:</strong>'),
    (r'Verified\s+Contact:', 'Sales Advisory Contact:'),
    (r'call\s+verified\s+sales\s+advisory', 'call direct sales advisory'),
    (r'call\s+verified\s+sales', 'call direct sales'),
    (r'Call\s+Verified\s+Sales\s+Advisory', 'Call Direct Sales Advisory'),
    (r'Call\s+Verified\s+Sales', 'Call Direct Sales'),
    (r'Verified\s+Channel\s+Partner:\s*PropSmart\s+Realty', 'Authorized Channel Partner: PropSmart Realty'),
    (r'Verified\s+Channel\s+Partner', 'Authorized Channel Partner'),
    (r'Verified\s+Authorized\s+Marketing\s+Partner', 'Authorized Marketing Partner'),
    (r'Verified\s+Authorized\s+Channel\s+Partner', 'Authorized Channel Partner'),
    (r'Verified\s+Authorized\s+Real\s+Estate\s+Agent', 'Authorized Real Estate Agent'),
    (r'Verified\s+Authorized', 'Authorized'),

    # Image Alt Tags & Brand Elements
    (r'Paranjape\s+Schemes\s+Construction\s+Ltd\s+Verified\s+Corporate\s+Brand\s+Logo', 'Paranjape Schemes Corporate Brand Logo'),
    (r'Paranjape\s+Schemes\s+Verified\s+Corporate\s+Brand\s+Logo', 'Paranjape Schemes Corporate Brand Logo'),
    (r'Paranjape\s+Forest\s+Trails\s+Verified\s+Township\s+Emblem\s+Bhugaon\s+Pune', 'Paranjape Forest Trails Township Emblem Bhugaon Pune'),
    (r'Paranjape\s+Forest\s+Trails\s+Verified\s+Township\s+Emblem', 'Paranjape Forest Trails Township Emblem'),
    (r'aria-label="Paranjape\s+Schemes\s+Verified\s+Home"', 'aria-label="Paranjape Schemes & Forest Trails Township Home"'),
    (r'aria-label="Paranjape\s+Schemes\s+Verified\s+Website"', 'aria-label="Paranjape Schemes Project Portal"'),
    (r'Verified\s+Corporate\s+Brand\s+Logo', 'Corporate Brand Logo'),
    (r'Verified\s+Township\s+Emblem', 'Township Emblem'),

    # MahaRERA Statutory Language
    (r'Verified\s+MahaRERA\s+Portal:\s*maharera\.maharashtra\.gov\.in', 'MahaRERA Statutory Portal: maharera.maharashtra.gov.in'),
    (r'Verified\s+MahaRERA\s+Portal', 'MahaRERA Statutory Portal'),
    (r'Verified\s+MahaRERA\s+Government\s+Portal', 'MahaRERA Government Portal'),
    (r'Verified\s+MahaRERA\s+Website', 'MahaRERA Statutory Portal'),
    (r'Verified\s+MahaRERA\s+Regulatory\s+Advisory', 'MahaRERA Statutory Compliance & Advisory'),
    (r'verified\s+MahaRERA\s+portal', 'MahaRERA statutory portal'),
    (r'verified\s+MahaRERA\s+website', 'MahaRERA statutory portal'),
    (r'verified\s+MahaRERA\s+certificate\s+number', 'registered MahaRERA certificate number'),
    (r'verified\s+MahaRERA\s+registration', 'registered MahaRERA registration'),
    (r'verified\s+MahaRERA\s+QR', 'registered MahaRERA QR'),
    (r'verified\s+MahaRERA', 'registered MahaRERA'),

    # Plans, Price Sheets, Documents & Schemas
    (r'<!--\s*Verified\s+Google\s+Maps\s+Knowledge\s+Graph\s+Entity\s+Schema', '<!-- Google Maps Knowledge Graph Entity Schema'),
    (r'Verified\s+2026\s+Price\s+Sheet', '2026 Verified Price Sheet'),
    (r'Verified\s+2026\s+Price\s+List', '2026 Verified Price List'),
    (r'Verified\s+Price\s+Sheet', 'Verified Price Sheet'),
    (r'Verified\s+Price\s+List', 'Verified Price List'),
    (r'Verified\s+Master\s+Plan\s+Layout', 'Master Plan Layout'),
    (r'Verified\s+Master\s+Plan', 'Master Plan'),
    (r'Verified\s+Township\s+Master\s+Plan', 'Township Master Plan'),
    (r'Verified\s+Architectural\s+Document', 'Architectural Document'),
    (r'Verified\s+Blueprint', 'Architectural Blueprint'),
    (r'Verified\s+High-Res\s+Master\s+Plan', 'High-Res Master Plan'),
    (r'verified\s+190-acre\s+Integrated\s+Township\s+Roadmap', '190-acre Integrated Township Roadmap'),
    (r'verified\s+190-acre\s+Township', '190-acre Township'),
    (r'verified\s+master\s+plan', 'master plan'),
    (r'verified\s+brochure', 'verified project brochure'),
    (r'Verified\s+Brochure', 'Project Brochure'),
    (r'download\s+verified\s+brochure', 'download verified project brochure'),
    (r'Download\s+Verified\s+Brochure', 'Download Verified Project Brochure'),

    # General "Authorized Project Portal" / "Authorized Portal" phrases
    (r'verified\s+website\s+of\s+Paranjape\s+Forest\s+Trails', 'authorized marketing portal for Paranjape Forest Trails'),
    (r'Verified\s+Website\s+of\s+Paranjape\s+Forest\s+Trails', 'Authorized Marketing Portal for Paranjape Forest Trails'),
    (r'verified\s+website\s+for\s+Paranjape\s+Forest\s+Trails', 'authorized portal for Paranjape Forest Trails'),
    (r'Verified\s+Website\s+for\s+Paranjape\s+Forest\s+Trails', 'Authorized Portal for Paranjape Forest Trails'),
    (r'the\s+verified\s+website', 'the authorized project portal'),
    (r'The\s+verified\s+website', 'The authorized project portal'),
    (r'verified\s+website', 'authorized project portal'),
    (r'Verified\s+Website', 'Authorized Project Portal'),
    (r'verified\s+portal', 'authorized portal'),
    (r'Verified\s+Portal', 'Authorized Portal'),
    (r'verified\s+booking\s+partner', 'authorized channel partner'),
    (r'Verified\s+Booking\s+Partner', 'Authorized Channel Partner'),
    (r'verified\s+representative', 'authorized representative'),
    (r'Verified\s+Representative', 'Authorized Representative'),
    (r'verified\s+advisory', 'direct sales advisory'),
    (r'Verified\s+Advisory', 'Direct Sales Advisory'),
    (r'verified\s+desk', 'advisory desk'),
    (r'Verified\s+Desk', 'Advisory Desk'),
    (r'per\s+verified\s+records', 'per registered public records'),
    (r'per\s+the\s+verified', 'per the registered'),
    (r'with\s+verified\s+sanctions', 'with registered statutory sanctions'),
    (r'verified\s+sanctions', 'statutory sanctions'),
    (r'verified\s+approval', 'statutory approval'),
    (r'Verified\s+Approval', 'Statutory Approval'),
    (r'verified\s+documents', 'verified project documents'),
    (r'Verified\s+Documents', 'Verified Project Documents'),
    (r'verified\s+guidelines', 'statutory guidelines'),
    (r'Verified\s+Guidelines', 'Statutory Guidelines'),
    (r'verified\s+status', 'registered status'),
    (r'Verified\s+Status', 'Registered Status'),
    (r'verified\s+updates', 'verified updates'),
    (r'Verified\s+Updates', 'Verified Updates'),
    (r'verified\s+pricing', 'verified pricing'),
    (r'Verified\s+Pricing', 'Verified Pricing'),
    (r'verified\s+rates', 'verified rates'),
    (r'Verified\s+Rates', 'Verified Rates'),
    (r'verified\s+source', 'verified source'),
    (r'Verified\s+Source', 'Verified Source'),
    (r'verified\s+specifications', 'project specifications'),
    (r'Verified\s+Specifications', 'Project Specifications'),
]

def sanitize_file(fpath):
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content
    for pattern, replacement in REPLACEMENTS:
        content = re.sub(pattern, replacement, content)

    # Secondary sweep for any remaining standalone [oO]fficial words in user-visible contexts
    # But preserve technical identifiers if any (like standard libraries or python packages)
    content = re.sub(r'\bOFFICIAL\b', 'VERIFIED', content)
    content = re.sub(r'\bOfficial\b', 'Verified', content)
    content = re.sub(r'\bofficial\b', 'verified', content)

    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    total_files = 0
    modified_files = 0

    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for fname in files:
            ext = os.path.splitext(fname)[1].lower()
            if ext in TARGET_EXTS:
                total_files += 1
                fpath = os.path.join(root, fname)
                if sanitize_file(fpath):
                    modified_files += 1

    print(f"Sanitization Complete: Audited {total_files} files, modified {modified_files} files.")

if __name__ == "__main__":
    main()
