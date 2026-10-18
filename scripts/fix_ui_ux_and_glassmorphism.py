#!/usr/bin/env python3
"""
scripts/fix_ui_ux_and_glassmorphism.py
1. Fixes giant brand logos in header (.nav-brand-pill) and footer (.footer-brand-container).
2. Removes duplicate WhatsApp button in footer across ~193 pages.
3. Eliminates 'height: auto !important;' from embedded CSS to restore inline/attribute sizing.
4. Adds ultra-advanced glassmorphic animations and CWV 100% hardening rules to style.min.css.
5. Keeps all tracking, JSON-LD schemas, and internal links 100% intact.
"""

import os
import glob
import re
import shutil

CSS_FILE = "style.min.css"
DIST_CSS = "dist/style.min.css"

GLASS_AND_CWV_CSS = """
/* ═══════════════════════════════════════════════════════════════════
   DUAL BRAND PILLS & LOGOS GLOBAL SIZING ENFORCEMENTS (0-CLS)
   ═══════════════════════════════════════════════════════════════════ */
.nav-brand-pill, .footer-brand-container, .nav-brand-container {
  display: inline-flex !important;
  align-items: center !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
  overflow: hidden !important;
  vertical-align: middle !important;
}
.nav-brand-pill {
  height: 38px !important;
  max-height: 38px !important;
  padding: 4px 14px !important;
  border-radius: 50px !important;
  background: #ffffff !important;
  border: 1.5px solid #D4AF37 !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
  text-decoration: none !important;
  gap: 10px !important;
}
.nav-brand-pill img,
.nav-brand-pill img:first-child,
.nav-brand-pill img:last-child {
  height: 22px !important;
  max-height: 22px !important;
  width: auto !important;
  max-width: 120px !important;
  object-fit: contain !important;
  display: block !important;
}
.nav-brand-pill img:first-child {
  height: 22px !important;
}
.nav-brand-pill img:last-child {
  height: 24px !important;
}
.footer-brand-container {
  height: 46px !important;
  max-height: 46px !important;
  padding: 6px 18px !important;
  border-radius: 50px !important;
  background: #ffffff !important;
  border: 1.5px solid #D4AF37 !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4) !important;
  text-decoration: none !important;
  gap: 12px !important;
}
.footer-brand-container img,
.footer-brand-container img:first-child,
.footer-brand-container img:last-child {
  height: 28px !important;
  max-height: 28px !important;
  width: auto !important;
  max-width: 140px !important;
  object-fit: contain !important;
  display: block !important;
}
@media (max-width: 640px) {
  .nav-brand-pill {
    height: 32px !important;
    max-height: 32px !important;
    padding: 2px 8px !important;
    gap: 6px !important;
  }
  .nav-brand-pill img,
  .nav-brand-pill img:first-child {
    height: 18px !important;
    max-height: 18px !important;
  }
  .nav-brand-pill img:last-child {
    height: 20px !important;
    max-height: 20px !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   ULTRA-ADVANCED GLASSMORPHIC ANIMATIONS SUITE (GPU-ACCELERATED)
   ═══════════════════════════════════════════════════════════════════ */
.desktop-nav-capsule {
  background: rgba(14, 12, 20, 0.6) !important;
  backdrop-filter: blur(16px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(160%) !important;
  border: 1px solid rgba(212, 175, 55, 0.4) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.desktop-nav-capsule:hover {
  border-color: rgba(212, 175, 55, 0.7) !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), 0 0 20px rgba(212, 175, 55, 0.25) !important;
}

.glass-card, .glass-panel, .glass-dock {
  background: rgba(255, 255, 255, 0.04) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(212, 175, 55, 0.28) !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  border-radius: 20px !important;
  transform: translateZ(0);
}

@keyframes glass-shimmer-sweep {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.glass-shimmer {
  background: linear-gradient(110deg, rgba(255,255,255,0.02) 10%, rgba(212,175,55,0.18) 25%, rgba(255,255,255,0.02) 40%) !important;
  background-size: 200% 100% !important;
  animation: glass-shimmer-sweep 7s ease-in-out infinite !important;
}

@keyframes glass-float-subtle {
  0%, 100% { transform: translateY(0px) translateZ(0); }
  50% { transform: translateY(-4px) translateZ(0); }
}
.glass-float {
  animation: glass-float-subtle 6s ease-in-out infinite !important;
  will-change: transform;
}

@keyframes gold-halo-glow {
  0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 12px rgba(212, 175, 55, 0.2); }
  50% { box-shadow: 0 8px 30px rgba(0,0,0,0.4), 0 0 25px rgba(212, 175, 55, 0.45); }
}
.glass-gold-halo {
  animation: gold-halo-glow 4s ease-in-out infinite !important;
}

.glass-interactive {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease !important;
}
.glass-interactive:hover {
  transform: translateY(-3px) scale(1.01) !important;
  border-color: rgba(212, 175, 55, 0.65) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 22px rgba(212, 175, 55, 0.28) !important;
}

/* ═══════════════════════════════════════════════════════════════════
   CORE WEB VITALS 100% HARDENING ENFORCEMENTS
   ═══════════════════════════════════════════════════════════════════ */
/* 0-CLS Layout Stability */
img, picture, video, canvas, svg {
  vertical-align: middle;
}
/* Optimize rendering pipeline for below-the-fold content */
@supports (content-visibility: auto) {
  section:not(:first-of-type):not(.hero-section):not(.hero):not(#township-clusters) {
    content-visibility: auto;
    contain-intrinsic-size: 1px 700px;
  }
}
/* Accessibility & Performance: respect user reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
"""

def update_stylesheet():
    if not os.path.exists(CSS_FILE):
        print(f"Error: {CSS_FILE} not found.")
        return False
    
    with open(CSS_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "DUAL BRAND PILLS & LOGOS GLOBAL SIZING ENFORCEMENTS" in content:
        print("CSS already contains brand pills rules. Replacing them with latest.")
        idx = content.find("/* ═══════════════════════════════════════════════════════════════════\n   DUAL BRAND PILLS & LOGOS GLOBAL SIZING ENFORCEMENTS")
        if idx != -1:
            content = content[:idx].strip() + "\n" + GLASS_AND_CWV_CSS
        else:
            content = content + "\n" + GLASS_AND_CWV_CSS
    else:
        content = content.rstrip() + "\n" + GLASS_AND_CWV_CSS

    with open(CSS_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {CSS_FILE} successfully.")

    if os.path.exists("dist"):
        shutil.copy(CSS_FILE, DIST_CSS)
        print(f"Synced {CSS_FILE} to {DIST_CSS}.")
    return True

def fix_html_pages():
    html_files = [f for f in glob.glob("**/*.html", recursive=True) if not f.startswith(("node_modules/", ".git/"))]
    print(f"Scanning {len(html_files)} HTML files...")

    # Pattern for duplicate WA button in footer
    dup_wa_pattern = re.compile(
        r'\s*<a\s+href=\"https://wa\.me/917744009295\?text=Hi%2C%20I%20am%20interested%20in%20Paranjape%20Forest%20Trails%20Bhugaon%20Township\.\"[^>]*aria-label=\"WhatsApp Enquiry Paranjape Forest Trails\"[^>]*>.*?WHATSAPP ENQUIRY\s*</a>',
        re.DOTALL
    )

    img_auto_fixed = 0
    dup_wa_fixed = 0
    header_logos_fixed = 0
    footer_logos_fixed = 0
    total_files_modified = 0

    for fpath in html_files:
        with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
            original = fp.read()

        modified = original

        # 1. Remove '!important' from 'height: auto !important;' in CSS
        if "height: auto !important;" in modified:
            modified = modified.replace("height: auto !important;", "height: auto;")
            img_auto_fixed += 1

        # 2. Remove duplicate WhatsApp button in footer
        if dup_wa_pattern.search(modified):
            modified = dup_wa_pattern.sub("", modified)
            dup_wa_fixed += 1

        # 3. Fix Header logo attributes inside nav-brand-pill
        # In nav-brand-pill:
        # replace width="280" height="84" on paranjape-corporate-logo.jpg with width="110" height="22"
        # and on forest-trails-emblem.png with width="24" height="24"
        def fix_nav_pill(m):
            pill_html = m.group(0)
            # Corporate logo in header: 110 x 22
            pill_html = re.sub(
                r'(src=[\"\']/assets/branding/paranjape-corporate-logo\.jpg[\"\'][^>]*?)width=[\"\']280[\"\']\s+height=[\"\']84[\"\']',
                r'\1width="110" height="22"',
                pill_html
            )
            # If width/height was before src:
            pill_html = re.sub(
                r'width=[\"\']280[\"\']\s+height=[\"\']84[\"\'](\s*/>|\s*>)(?=.*?src=[\"\']/assets/branding/paranjape-corporate-logo\.jpg[\"\'])',
                r'width="110" height="22"\1',
                pill_html
            )
            # Emblem in header: 24 x 24
            pill_html = re.sub(
                r'(src=[\"\']/assets/branding/forest-trails-emblem\.png[\"\'][^>]*?)width=[\"\']280[\"\']\s+height=[\"\']84[\"\']',
                r'\1width="24" height="24"',
                pill_html
            )
            pill_html = re.sub(
                r'width=[\"\']280[\"\']\s+height=[\"\']84[\"\'](\s*/>|\s*>)(?=.*?src=[\"\']/assets/branding/forest-trails-emblem\.png[\"\'])',
                r'width="24" height="24"\1',
                pill_html
            )
            return pill_html

        old_mod = modified
        modified = re.sub(r'<a[^>]*class=[\"\'][^\"\']*nav-brand-pill[^\"\']*[\"\'][^>]*>.*?</a>', fix_nav_pill, modified, flags=re.DOTALL)
        if modified != old_mod:
            header_logos_fixed += 1

        # 4. Fix Footer logo attributes inside footer-brand-container
        # In footer-brand-container:
        # replace width="280" height="84" on paranjape-corporate-logo.jpg with width="140" height="28"
        # and on forest-trails-emblem.png with width="28" height="28"
        def fix_footer_brand(m):
            footer_html = m.group(0)
            # Corporate logo in footer: 140 x 28
            footer_html = re.sub(
                r'(src=[\"\']/assets/branding/paranjape-corporate-logo\.jpg[\"\'][^>]*?)width=[\"\']280[\"\']\s+height=[\"\']84[\"\']',
                r'\1width="140" height="28"',
                footer_html
            )
            # Emblem in footer: 28 x 28
            footer_html = re.sub(
                r'(src=[\"\']/assets/branding/forest-trails-emblem\.png[\"\'][^>]*?)width=[\"\']280[\"\']\s+height=[\"\']84[\"\']',
                r'\1width="28" height="28"',
                footer_html
            )
            return footer_html

        old_mod = modified
        modified = re.sub(r'<a[^>]*class=[\"\'][^\"\']*footer-brand-container[^\"\']*[\"\'][^>]*>.*?</a>', fix_footer_brand, modified, flags=re.DOTALL)
        if modified != old_mod:
            footer_logos_fixed += 1

        if modified != original:
            with open(fpath, "w", encoding="utf-8") as fp:
                fp.write(modified)
            total_files_modified += 1

    print("\nBatch Fix Summary:")
    print(f"Total HTML files modified:       {total_files_modified}")
    print(f"Files with 'height: auto' fixed:  {img_auto_fixed}")
    print(f"Files with duplicate WA removed: {dup_wa_fixed}")
    print(f"Header logo pills fixed:         {header_logos_fixed}")
    print(f"Footer logo containers fixed:    {footer_logos_fixed}")

if __name__ == "__main__":
    update_stylesheet()
    fix_html_pages()
