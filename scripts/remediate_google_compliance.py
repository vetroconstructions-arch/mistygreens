#!/usr/bin/env python3
"""
scripts/remediate_google_compliance.py
=============================================================================
AUTOMATED REMEDIATION FOR GOOGLE WEB POLICIES & GOOGLE ADS COMPLIANCE
=============================================================================
1. Form Privacy Consent: Injects clear Privacy Policy links and consent notices
   into all lead capture forms (sovereign-universal-form, enquiry-form-modal,
   master-plan-form, opening-intent-form, qualifier-form).
2. Footer Compliance: Ensures all pages feature clear Privacy Policy and Terms of Use
   links in their footer, alongside MahaRERA registration disclosures.
3. Investment Misrepresentation Guard: Adds statutory historical appreciation
   disclaimers on all pages citing 18–22% CAGR.
=============================================================================
"""

import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PRIVACY_FORM_CONSENT_DARK = """        <p style="font-size: 0.65rem; color: rgba(255,255,255,0.65); text-align: center; margin: 0.35rem 0 0; line-height: 1.4;">
          🔒 By submitting, you agree to our <a href="/privacy-policy/" target="_blank" rel="noopener" style="color: #D4AF37; text-decoration: underline;">Privacy Policy</a> &amp; authorize verified updates via Call/WhatsApp.
        </p>"""

PRIVACY_FORM_CONSENT_LIGHT = """        <p style="font-size: 0.65rem; color: #666; text-align: center; margin: 0.35rem 0 0; line-height: 1.4;">
          By submitting, you agree to our <a href="/privacy-policy/" target="_blank" rel="noopener" style="color: #6B0D0D; text-decoration: underline;">Privacy Policy</a> &amp; authorize verified updates.
        </p>"""

STATUTORY_CAGR_DISCLAIMER = """
<div class="statutory-cagr-disclaimer" style="background: rgba(212, 175, 55, 0.05); border-left: 3px solid #D4AF37; padding: 0.85rem 1.2rem; margin: 1.5rem auto; max-width: 1100px; border-radius: 4px; font-size: 0.75rem; color: #888888; line-height: 1.5;">
  <strong>*Statutory Investment Disclaimer:</strong> 18–22% CAGR represents historical land and property price appreciation recorded across the Bhugaon-Bavdhan corridor at Paranjape Forest Trails (2019–2026). Past performance is not a guarantee of future returns. Real estate values are subject to market conditions, PMRDA infrastructure delivery, and government regulations. Prices marked with an asterisk (*) are indicative base prices excluding statutory charges.
</div>
"""

STANDARD_COMPLIANT_FOOTER = """
<footer style="background:#111116; border-top:1px solid rgba(212,175,55,0.25); color:#999; padding:2rem 1.5rem; text-align:center; font-family:'Plus Jakarta Sans',sans-serif; margin-top:3rem;">
  <div style="max-width:1200px; margin:0 auto;">
    <p style="margin:0 0 0.5rem;"><a href="/" style="color:#D4AF37; text-decoration:none; font-weight:700;">Paranjape Forest Trails</a> — Pune's #1 Forest Township | Bhugaon, Paud Road, Pune West 412115</p>
    <p style="margin:0 0 0.5rem; font-size:0.85rem;">📞 <a href="tel:+917744009295" style="color:#ccc; text-decoration:none;">+91 7744009295</a> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>
    <p style="font-size:0.75rem; color:#777; margin:0 0 0.75rem; line-height:1.6;">
      MahaRERA: P52100053834 | P52100031560 | P52100048536 | P52100079518 | P52100053310 | P52100077686 | P52100055711 | P52100052124 | Official Portal: maharera.maharashtra.gov.in
    </p>
    <p style="font-size:0.78rem; margin:0;">
      <a href="/privacy-policy/" style="color:#aaa; text-decoration:none;">Privacy Policy</a> |
      <a href="/terms-of-use/" style="color:#aaa; text-decoration:none;">Terms of Use</a> |
      <a href="/paranjape-forest-trails-bhugaon-price-2026/" style="color:#aaa; text-decoration:none;">Price List</a> |
      <a href="/sitemap-page/" style="color:#aaa; text-decoration:none;">Sitemap</a>
    </p>
  </div>
</footer>
"""

modified_files = set()

for root, dirs, files in os.walk(BASE_DIR):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'scripts', '.wrangler', 'dist', 'scratch', '.gemini', '_astro'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fp = os.path.join(root, fname)
        rel = os.path.relpath(fp, BASE_DIR).replace('\\', '/')
        if rel in ['404.html', 'thank-you.html', 'components/structural-vault.html', 'components/web-stories-tray.html', 'components/master-plan-modal.html']:
            continue

        with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
            original = f.read()

        content = original

        # -------------------------------------------------------------
        # 1. REMEDIATE FORMS: Add Privacy Link to Lead Forms
        # -------------------------------------------------------------
        # A) enquiry-form-modal
        if 'id="enquiry-form-modal"' in content:
            # Check if this form already has /privacy-policy/
            form_match = re.search(r'(<form[^>]*id="enquiry-form-modal"[^>]*>.*?</form>)', content, re.DOTALL)
            if form_match and '/privacy-policy/' not in form_match.group(1):
                # Target the trust badges closing div
                tb_pattern = r'(<span>📜 Zero Spam</span>\s*</div>)'
                if re.search(tb_pattern, content):
                    content = re.sub(tb_pattern, r'\1\n' + PRIVACY_FORM_CONSENT_DARK, content, count=1)
                else:
                    # Fallback before </form>
                    content = content.replace('</form>', PRIVACY_FORM_CONSENT_DARK + '\n</form>', 1)

        # B) sovereign-universal-form
        if 'id="sovereign-universal-form"' in content:
            form_match = re.search(r'(<form[^>]*id="sovereign-universal-form"[^>]*>.*?</form>)', content, re.DOTALL)
            if form_match and '/privacy-policy/' not in form_match.group(1):
                sub_pattern = r'(🔒 Direct Developer Desk\. Instant PDF Dispatch\. Zero Brokerage\.\s*</div>)'
                if re.search(sub_pattern, content):
                    content = re.sub(sub_pattern, r'\1\n' + PRIVACY_FORM_CONSENT_DARK, content, count=1)
                else:
                    content = content.replace('</form>', PRIVACY_FORM_CONSENT_DARK + '\n</form>', 1)

        # C) master-plan-form
        if 'id="master-plan-form"' in content:
            form_match = re.search(r'(<form[^>]*id="master-plan-form"[^>]*>.*?</form>)', content, re.DOTALL)
            if form_match and '/privacy-policy/' not in form_match.group(1):
                content = content.replace('</form>', PRIVACY_FORM_CONSENT_LIGHT + '\n</form>', 1)

        # D) opening-intent-form
        if 'id="opening-intent-form"' in content:
            form_match = re.search(r'(<form[^>]*id="opening-intent-form"[^>]*>.*?</form>)', content, re.DOTALL)
            if form_match and '/privacy-policy/' not in form_match.group(1):
                sub_pattern = r'(RERA AUTHORIZED &bull; 35\+ YEAR LEGACY\s*</div>)'
                if re.search(sub_pattern, content):
                    content = re.sub(sub_pattern, r'\1\n' + PRIVACY_FORM_CONSENT_DARK, content, count=1)
                else:
                    content = content.replace('</form>', PRIVACY_FORM_CONSENT_DARK + '\n</form>', 1)

        # E) qualifier-form
        if 'id="qualifier-form"' in content:
            form_match = re.search(r'(<form[^>]*id="qualifier-form"[^>]*>.*?</form>)', content, re.DOTALL)
            if form_match and '/privacy-policy/' not in form_match.group(1):
                content = content.replace('</form>', PRIVACY_FORM_CONSENT_DARK + '\n</form>', 1)

        # -------------------------------------------------------------
        # 2. REMEDIATE FOOTER: Ensure Privacy Policy in Footer
        # -------------------------------------------------------------
        if '/privacy-policy/' not in content and 'privacy-policy' not in rel:
            if '<footer' in content and '</footer>' in content:
                # Find footer and add links before </footer> or replace /sitemap-page/
                if '/sitemap-page/' in content:
                    content = content.replace(
                        '<a href="/sitemap-page/"',
                        '<a href="/privacy-policy/" style="color:#aaa;text-decoration:none">Privacy Policy</a> | <a href="/terms-of-use/" style="color:#aaa;text-decoration:none">Terms of Use</a> | <a href="/sitemap-page/"',
                        1
                    )
                elif '/sitemap.xml' in content:
                    content = content.replace(
                        '<a href="/sitemap.xml"',
                        '<a href="/privacy-policy/" style="color:#aaa;text-decoration:none">Privacy Policy</a> | <a href="/terms-of-use/" style="color:#aaa;text-decoration:none">Terms of Use</a> | <a href="/sitemap.xml"',
                        1
                    )
                else:
                    footer_close = '</footer>'
                    content = content.replace(
                        footer_close,
                        '<p style="font-size:0.78rem; text-align:center; margin-top:0.5rem;"><a href="/privacy-policy/" style="color:#aaa; text-decoration:none;">Privacy Policy</a> | <a href="/terms-of-use/" style="color:#aaa; text-decoration:none;">Terms of Use</a> | <a href="/sitemap-page/" style="color:#aaa; text-decoration:none;">Sitemap</a></p>\n' + footer_close,
                        1
                    )
            else:
                # No footer tag present: insert standard compliant footer
                if '</main>' in content:
                    content = content.replace('</main>', STANDARD_COMPLIANT_FOOTER + '\n</main>', 1)
                elif '<script defer src="/exit-intent-concierge.js"></script>' in content:
                    content = content.replace('<script defer src="/exit-intent-concierge.js"></script>', STANDARD_COMPLIANT_FOOTER + '\n<script defer src="/exit-intent-concierge.js"></script>', 1)
                elif '</body>' in content:
                    content = content.replace('</body>', STANDARD_COMPLIANT_FOOTER + '\n</body>', 1)

        # -------------------------------------------------------------
        # 3. REMEDIATE CAGR: Add Statutory Investment Disclaimer
        # -------------------------------------------------------------
        if '18–22%' in content or '18-22%' in content:
            lower_c = content.lower()
            if 'past performance' not in lower_c and 'historical estimate' not in lower_c and 'indicative base prices' not in lower_c:
                if '<footer' in content:
                    content = content.replace('<footer', STATUTORY_CAGR_DISCLAIMER + '\n<footer', 1)
                elif '</main>' in content:
                    content = content.replace('</main>', STATUTORY_CAGR_DISCLAIMER + '\n</main>', 1)
                elif '</body>' in content:
                    content = content.replace('</body>', STATUTORY_CAGR_DISCLAIMER + '\n</body>', 1)

        if content != original:
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(content)
            modified_files.add(rel)

print(f"Total files remediated: {len(modified_files)}")
