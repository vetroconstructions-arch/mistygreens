#!/usr/bin/env python3
"""
scripts/remove_exposed_emails.py
Removes all exposed email addresses (propsmartrealty@gmail.com, placeholder emails, etc.)
from all UI/UX surfaces, footers, forms, and Schema.org JSON-LD across the entire codebase.
"""

import os
import re
import json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def sanitize_json_ld(content):
    """
    Remove "email": "..." from JSON-LD script blocks while preserving valid JSON.
    """
    def repl_script(m):
        block = m.group(1)
        # Check if email is in block
        if 'propsmartrealty@gmail.com' not in block:
            return m.group(0)
        
        # Regex to remove "email": "..." with preceding or trailing comma
        # 1. Comma after: "email": "...",\s*
        cleaned = re.sub(r'\"email\":\s*\"(?:<!--email_off-->)?propsmartrealty@gmail\.com(?:<!--/email_off-->)?\",\s*', '', block)
        # 2. Comma before: ,\s*"email": "..."
        cleaned = re.sub(r',\s*\"email\":\s*\"(?:<!--email_off-->)?propsmartrealty@gmail\.com(?:<!--/email_off-->)?\"', '', cleaned)
        # 3. Bare: "email": "..."
        cleaned = re.sub(r'\"email\":\s*\"(?:<!--email_off-->)?propsmartrealty@gmail\.com(?:<!--/email_off-->)?\"', '', cleaned)
        
        return f'<script type="application/ld+json">{cleaned}</script>'

    return re.sub(r'<script type="application/ld\+json">([\s\S]*?)</script>', repl_script, content)

def sanitize_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    original = content

    # 1. Sanitize JSON-LD schema blocks
    content = sanitize_json_ld(content)

    # 2. Form actions and ajax fetches
    content = content.replace('action="https://formsubmit.co/<!--email_off-->propsmartrealty@gmail.com<!--/email_off-->"', 'action="/api/lead-capture"')
    content = content.replace('action="https://formsubmit.co/propsmartrealty@gmail.com"', 'action="/api/lead-capture"')
    content = content.replace('action="https://formsubmit.co/ajax/propsmartrealty@gmail.com"', 'action="/api/lead-capture"')
    content = content.replace("fetch('https://formsubmit.co/ajax/<!--email_off-->propsmartrealty@gmail.com<!--/email_off-->'", "fetch('/api/lead-capture'")
    content = content.replace("fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com'", "fetch('/api/lead-capture'")
    content = content.replace('fetch("https://formsubmit.co/ajax/propsmartrealty@gmail.com"', 'fetch("/api/lead-capture"')

    # 3. Input placeholders
    content = content.replace('placeholder="e.g. yourname@gmail.com"', 'placeholder="Enter your email address"')
    content = content.replace('placeholder="yourname@gmail.com"', 'placeholder="Enter your email address"')
    content = content.replace('placeholder="name@domain.com"', 'placeholder="Enter your email address"')
    content = content.replace('placeholder="e.g. rahul@gmail.com"', 'placeholder="Enter your email address"')
    content = content.replace('placeholder="rahul@gmail.com"', 'placeholder="Enter your email address"')

    # 4. Footer contact block (index.html, enclaves, etc.)
    footer_pattern = (
        r'<p style="color:\s*#F1F5F9;\s*font-size:\s*0\.8rem;\s*line-height:\s*1\.5;">'
        r'<!--email_off-->✉️ Email:\s*<a href="mailto:&lt;!--email_off--&gt;propsmartrealty@gmail\.com&lt;!--/email_off--&gt;"[^>]*>'
        r'<!--email_off-->propsmartrealty@gmail\.com<!--/email_off--></a><!--/email_off--></p>'
    )
    footer_replacement = (
        '<p style="color: #F1F5F9; font-size: 0.8rem; line-height: 1.5; margin-bottom: 0.8rem;">💬 WhatsApp: <a href="https://wa.me/917744009295" target="_blank" rel="noopener" style="color: #25D366; text-decoration: underline; min-height: 48px; display: inline-flex; align-items: center; padding: 0.4rem 0.2rem;">+91 7744009295 ↗</a></p>\n'
        '                    <p style="color: #F1F5F9; font-size: 0.8rem; line-height: 1.5;">🔒 Direct Advisory: <button type="button" onclick="window.openEnquiryModal(\'Footer Sales Advisory\')" style="background:none;border:none;color:#D4AF37;font-weight:700;text-decoration:underline;cursor:pointer;padding:0.4rem 0.2rem;font-size:0.8rem;font-family:inherit;min-height:48px;display:inline-flex;align-items:center;">Schedule Site Visit ↗</button></p>'
    )
    content = re.sub(footer_pattern, footer_replacement, content)

    # 5. Body advisory and text variations
    content = content.replace(
        '<p style="margin:0;font-size:0.92rem;"><strong>Sales Advisory Contact:</strong> For inquiries, floor plans, and verified pricing at Paranjape Forest Trails, call direct sales advisory at <a href="tel:+917744009295" style="color:#4A0808;font-weight:700;">+91 7744009295</a> or email <!--email_off-->propsmartrealty@gmail.com<!--/email_off-->.</p>',
        '<p style="margin:0;font-size:0.92rem;"><strong>Sales Advisory Contact:</strong> For inquiries, floor plans, and verified pricing at Paranjape Forest Trails, call direct sales advisory at <a href="tel:+917744009295" style="color:#4A0808;font-weight:700;">+91 7744009295</a> or WhatsApp <a href="https://wa.me/917744009295" style="color:#25D366;font-weight:700;" target="_blank" rel="noopener">+91 7744009295 ↗</a>.</p>'
    )

    content = content.replace(
        '<p>📞 <a href="tel:+917744009295" style="color:#ccc">+91 7744009295</a> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p>📞 <a href="tel:+917744009295" style="color:#ccc">+91 7744009295</a> | 💬 <a href="https://wa.me/917744009295" style="color:#25D366;text-decoration:none;" target="_blank" rel="noopener">WhatsApp Sales Desk</a></p>'
    )

    content = content.replace(
        '<p style="margin:0 0 0.5rem; font-size:0.85rem;">📞 <a href="tel:+917744009295" style="color:#ccc; text-decoration:none;">+91 7744009295</a> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p style="margin:0 0 0.5rem; font-size:0.85rem;">📞 <a href="tel:+917744009295" style="color:#ccc; text-decoration:none;">+91 7744009295</a> | 💬 <a href="https://wa.me/917744009295" style="color:#25D366; text-decoration:none;" target="_blank" rel="noopener">WhatsApp</a></p>'
    )

    content = content.replace(
        '<p>Contact: <span itemprop="telephone">+91 7744009295</span> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p>Contact: <span itemprop="telephone">+91 7744009295</span> | 💬 <a href="https://wa.me/917744009295" style="color:inherit;text-decoration:none;" target="_blank" rel="noopener">WhatsApp Desk</a></p>'
    )

    content = content.replace(
        '<span>Contact: <span itemprop="telephone">+91 7744009295</span> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></span>',
        '<span>Contact: <span itemprop="telephone">+91 7744009295</span> | 💬 <a href="https://wa.me/917744009295" style="color:inherit;text-decoration:none;" target="_blank" rel="noopener">WhatsApp Desk</a></span>'
    )

    content = content.replace(
        '<p style="margin-bottom: 0.6rem;">Contact Sales Desk: <a href="tel:+917744009295" style="color: #D4AF37; font-weight: 700;">+91 7744009295</a> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p style="margin-bottom: 0.6rem;">Contact Sales Desk: <a href="tel:+917744009295" style="color: #D4AF37; font-weight: 700;">+91 7744009295</a> | 💬 <a href="https://wa.me/917744009295" style="color: #25D366; font-weight: 700; text-decoration: none;" target="_blank" rel="noopener">WhatsApp ↗</a></p>'
    )

    content = content.replace(
        '<p>📞 <a href="tel:+917744009295" style="color:#ccc;text-decoration:none">+91 7744009295</a> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p>📞 <a href="tel:+917744009295" style="color:#ccc;text-decoration:none">+91 7744009295</a> | 💬 <a href="https://wa.me/917744009295" style="color:#25D366;text-decoration:none;" target="_blank" rel="noopener">WhatsApp</a></p>'
    )

    content = content.replace(
        '*Disclaimer: Indicative rates only. Contact: <a href="tel:+917744009295" style="color: var(--gold); text-decoration: none;">+91 7744009295</a> | Email: <!--email_off-->propsmartrealty@gmail.com<!--/email_off--> | <a href="/privacy-policy/" style="color: rgba(255,255,255,0.5);">Privacy Policy</a>',
        '*Disclaimer: Indicative rates only. Contact: <a href="tel:+917744009295" style="color: var(--gold); text-decoration: none;">+91 7744009295</a> | 💬 <a href="https://wa.me/917744009295" style="color: #25D366; text-decoration: none;" target="_blank" rel="noopener">WhatsApp</a> | <a href="/privacy-policy/" style="color: rgba(255,255,255,0.5);">Privacy Policy</a>'
    )

    content = content.replace(
        '*Disclaimer: Indicative rates only. Contact: <a href="tel:+917744009295" style="color: var(--gold); text-decoration: none;">+91 7744009295</a> | Email: <!--email_off-->propsmartrealty@gmail.com<!--/email_off--> | <a href="/web-stories/" style="color: var(--gold); text-decoration: none;">Web Stories</a> | <a href="/privacy-policy/" style="color: rgba(255,255,255,0.5);">Privacy Policy</a>',
        '*Disclaimer: Indicative rates only. Contact: <a href="tel:+917744009295" style="color: var(--gold); text-decoration: none;">+91 7744009295</a> | 💬 <a href="https://wa.me/917744009295" style="color: #25D366; text-decoration: none;" target="_blank" rel="noopener">WhatsApp</a> | <a href="/web-stories/" style="color: var(--gold); text-decoration: none;">Web Stories</a> | <a href="/privacy-policy/" style="color: rgba(255,255,255,0.5);">Privacy Policy</a>'
    )

    content = content.replace(
        'Direct Contact: <a href="tel:+917744009295" style="color: var(--gold); text-decoration: none;">+91 7744009295</a> | Email: <!--email_off-->propsmartrealty@gmail.com<!--/email_off--> | <a href="/privacy-policy/" style="color: rgba(255,255,255,0.5);">Privacy Policy</a>',
        'Direct Contact: <a href="tel:+917744009295" style="color: var(--gold); text-decoration: none;">+91 7744009295</a> | 💬 <a href="https://wa.me/917744009295" style="color: #25D366; text-decoration: none;" target="_blank" rel="noopener">WhatsApp</a> | <a href="/privacy-policy/" style="color: rgba(255,255,255,0.5);">Privacy Policy</a>'
    )

    content = content.replace(
        '📞 <a href="tel:+917744009295" style="color:#fff;text-decoration:none;font-weight:600">+91 7744009295</a> &nbsp;|&nbsp; ✉️ <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '📞 <a href="tel:+917744009295" style="color:#fff;text-decoration:none;font-weight:600">+91 7744009295</a> &nbsp;|&nbsp; 💬 <a href="https://wa.me/917744009295" style="color:#25D366;text-decoration:none;font-weight:600" target="_blank" rel="noopener">WhatsApp Desk</a></p>'
    )

    content = content.replace(
        '📞 <a href="tel:+917744009295" style="color:#fff;text-decoration:none;font-weight:600">+91 7744009295</a> &nbsp;|&nbsp; ✉️ <!--email_off-->propsmartrealty@gmail.com<!--/email_off-->',
        '📞 <a href="tel:+917744009295" style="color:#fff;text-decoration:none;font-weight:600">+91 7744009295</a> &nbsp;|&nbsp; 💬 <a href="https://wa.me/917744009295" style="color:#25D366;text-decoration:none;font-weight:600" target="_blank" rel="noopener">WhatsApp Desk</a>'
    )

    content = content.replace(
        '<p>For queries regarding these Terms: <strong>+91 7744009295</strong> | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--><br>',
        '<p>For queries regarding these Terms: <strong>+91 7744009295</strong> | 💬 <a href="https://wa.me/917744009295" target="_blank" rel="noopener">WhatsApp Support</a><br>'
    )

    content = content.replace(
        '<p style="margin-top:1.25rem;">To exercise any of these rights, please email us at: <strong><!--email_off-->propsmartrealty@gmail.com<!--/email_off--></strong> with the subject line <em>"Privacy Request — [Your Name]"</em>. We will respond within <strong>30 days</strong>. We may need to verify your identity before processing your request.</p>',
        '<p style="margin-top:1.25rem;">To exercise any of these rights, please contact our Data Grievance Desk at: <strong>+91 7744009295</strong> or via our online advisory desk with the reference <em>"Privacy Request — [Your Name]"</em>. We will respond within <strong>30 days</strong>. We may need to verify your identity before processing your request.</p>'
    )

    content = content.replace(
        '<p>If you are a parent or guardian and believe that your child has submitted personal data to us, please contact us immediately at <!--email_off-->propsmartrealty@gmail.com<!--/email_off--> and we will promptly delete such information.</p>',
        '<p>If you are a parent or guardian and believe that your child has submitted personal data to us, please contact our advisory desk immediately at +91 7744009295 or via WhatsApp at <a href="https://wa.me/917744009295" target="_blank" rel="noopener">+91 7744009295</a> and we will promptly delete such information.</p>'
    )

    content = content.replace(
        '<span>✉️ Email: <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></span>',
        '<span>💬 WhatsApp: <a href="https://wa.me/917744009295" style="color:inherit;text-decoration:underline;" target="_blank" rel="noopener">+91 7744009295 ↗</a></span>'
    )

    content = content.replace(
        '<li>✉️ <strong>Email:</strong> <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></li>',
        '<li>💬 <strong>WhatsApp:</strong> <a href="https://wa.me/917744009295" target="_blank" rel="noopener">+91 7744009295 ↗</a></li>'
    )

    content = content.replace(
        '<p>For email inquiries, write to: <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p>For instant inquiries, WhatsApp us at: <a href="https://wa.me/917744009295" target="_blank" rel="noopener">+91 7744009295 ↗</a></p>'
    )

    content = content.replace(
        '<p style="margin:.3rem 0;color:#555"><!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p style="margin:.3rem 0;color:#555">💬 <a href="https://wa.me/917744009295" style="color:#555;text-decoration:none" target="_blank" rel="noopener">WhatsApp Sales Desk</a></p>'
    )

    content = content.replace(
        '<p style="margin: 0;">Contact: +91 7744009295 | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--> | All prices indicative (*)</p>',
        '<p style="margin: 0;">Contact: +91 7744009295 | 💬 <a href="https://wa.me/917744009295" style="color:inherit;text-decoration:none" target="_blank" rel="noopener">WhatsApp</a> | All prices indicative (*)</p>'
    )

    content = content.replace(
        '<li style="font-size:0.85rem;color:#555;"><!--email_off-->propsmartrealty@gmail.com<!--/email_off--></li>',
        '<li style="font-size:0.85rem;color:#555;">💬 <a href="https://wa.me/917744009295" style="color:#555;text-decoration:none" target="_blank" rel="noopener">WhatsApp Support Desk</a></li>'
    )

    content = content.replace(
        '📧 <!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '💬 <a href="https://wa.me/917744009295" style="color:#25D366;text-decoration:none" target="_blank" rel="noopener">WhatsApp Sales Desk</a></p>'
    )

    content = content.replace(
        '<p><!--email_off-->propsmartrealty@gmail.com<!--/email_off--></p>',
        '<p>💬 <a href="https://wa.me/917744009295" style="color:#25D366;text-decoration:none" target="_blank" rel="noopener">WhatsApp Desk: +91 7744009295</a></p>'
    )

    content = content.replace(
        '"text": "To book a site visit: Call +91 7744009295 (available 9 AM – 8 PM daily), WhatsApp us at the same number, or email propsmartrealty@gmail.com. We will arrange a dedicated Relationship Manager to escort you through the site. Complimentary pickup from Chandani Chowk is available on request."',
        '"text": "To book a site visit: Call +91 7744009295 (available 9 AM – 8 PM daily), WhatsApp us at the same number, or schedule an online site visit advisory. We will arrange a dedicated Relationship Manager to escort you through the site. Complimentary pickup from Chandani Chowk is available on request."'
    )

    content = content.replace(
        '"text": "For email inquiries, write to propsmartrealty@gmail.com. Please mention your preferred enclave, budget, and contact number in your email. Our sales team responds within 24 hours on business days."',
        '"text": "For sales inquiries, connect directly on WhatsApp at +91 7744009295. Please mention your preferred enclave, budget, and contact number. Our sales team responds promptly on business days."'
    )

    # 6. Any other stray mailto links
    content = re.sub(
        r'<a\s+href=[\'\"]mailto:(?:&lt;!--email_off--&gt;|<!--email_off-->)?propsmartrealty@gmail\.com(?:&lt;!--/email_off--&gt;|<!--/email_off-->)?[\'\"][^>]*>[\s\S]*?</a>',
        '<a href="https://wa.me/917744009295" target="_blank" rel="noopener" style="color: #25D366; text-decoration: underline;">+91 7744009295 ↗</a>',
        content
    )

    # 7. Any remaining raw occurrences in body text
    content = content.replace('<!--email_off-->propsmartrealty@gmail.com<!--/email_off-->', '💬 <a href="https://wa.me/917744009295" style="color:inherit;text-decoration:none" target="_blank" rel="noopener">WhatsApp Sales Desk</a>')
    content = content.replace('propsmartrealty@gmail.com', 'sales advisory')

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def sanitize_static_files():
    modified = 0
    total = 0
    for root, dirs, files in os.walk(ROOT):
        if '.git' in dirs: dirs.remove('.git')
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if '.venv' in dirs: dirs.remove('.venv')
        for f in files:
            if f.endswith('.html'):
                total += 1
                p = os.path.join(root, f)
                if sanitize_html_file(p):
                    modified += 1
    print(f'HTML Sanitization: modified {modified} of {total} files.')

def sanitize_other_assets():
    # 1. functions/_middleware.js
    mid_path = os.path.join(ROOT, 'functions', '_middleware.js')
    if os.path.exists(mid_path):
        with open(mid_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('"email": "propsmartrealty@gmail.com",\n', '')
        c = c.replace('"email": "propsmartrealty@gmail.com",', '')
        with open(mid_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('functions/_middleware.js sanitized.')

    # 2. functions/api/lead-capture.js
    lead_path = os.path.join(ROOT, 'functions', 'api', 'lead-capture.js')
    if os.path.exists(lead_path):
        with open(lead_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace("Lead captured & dispatched to propsmartrealty@gmail.com", "Lead captured & dispatched successfully")
        with open(lead_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('functions/api/lead-capture.js sanitized.')

    # 3. functions/api/enquiry.js
    enq_path = os.path.join(ROOT, 'functions', 'api', 'enquiry.js')
    if os.path.exists(enq_path):
        with open(enq_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace("Lead processed & dispatched to propsmartrealty@gmail.com successfully.", "Lead processed & dispatched successfully.")
        with open(enq_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('functions/api/enquiry.js sanitized.')

    # 4. .well-known/ai-agent.json
    ai_agent_path = os.path.join(ROOT, '.well-known', 'ai-agent.json')
    if os.path.exists(ai_agent_path):
        with open(ai_agent_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('"contactEmail": "propsmartrealty@gmail.com"', '"contactDesk": "https://www.paranjapetownship.com/contact-us/"')
        with open(ai_agent_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('.well-known/ai-agent.json sanitized.')

    # 5. .well-known/security.txt
    sec_path = os.path.join(ROOT, '.well-known', 'security.txt')
    if os.path.exists(sec_path):
        with open(sec_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('Contact: mailto:propsmartrealty@gmail.com', 'Contact: https://www.paranjapetownship.com/contact-us/')
        with open(sec_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('.well-known/security.txt sanitized.')

    # 6. ai-manifest.json
    ai_man = os.path.join(ROOT, 'ai-manifest.json')
    if os.path.exists(ai_man):
        with open(ai_man, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('"contactEmail": "propsmartrealty@gmail.com"', '"contactDesk": "https://www.paranjapetownship.com/contact-us/"')
        with open(ai_man, 'w', encoding='utf-8') as f:
            f.write(c)
        print('ai-manifest.json sanitized.')

    # 7. llms.txt & llms-full.txt
    for lfile in ['llms.txt', 'llms-full.txt']:
        lp = os.path.join(ROOT, lfile)
        if os.path.exists(lp):
            with open(lp, 'r', encoding='utf-8') as f:
                c = f.read()
            c = c.replace('propsmartrealty@gmail.com', 'Sales Advisory Desk: +91 7744009295')
            with open(lp, 'w', encoding='utf-8') as f:
                f.write(c)
            print(f'{lfile} sanitized.')

    # 8. web-stories/feed.xml
    ws_feed = os.path.join(ROOT, 'web-stories', 'feed.xml')
    if os.path.exists(ws_feed):
        with open(ws_feed, 'r', encoding='utf-8') as f:
            c = f.read()
        c = re.sub(r'<author>.*?propsmartrealty@gmail\.com.*?</author>', '<author>advisory@paranjapetownship.com (Paranjape Schemes)</author>', c)
        with open(ws_feed, 'w', encoding='utf-8') as f:
            f.write(c)
        print('web-stories/feed.xml sanitized.')

    # 9. src/components/Footer.astro
    fa = os.path.join(ROOT, 'src', 'components', 'Footer.astro')
    if os.path.exists(fa):
        with open(fa, 'r', encoding='utf-8') as f:
            c = f.read()
        c = re.sub(
            r'<!--email_off-->✉️ Email: <a href="mailto:propsmartrealty@gmail\.com"[^>]*>propsmartrealty@gmail\.com</a><!--/email_off-->',
            '💬 WhatsApp: <a href="https://wa.me/917744009295" target="_blank" rel="noopener" style="color: #25D366; text-decoration: underline;">+91 7744009295 ↗</a>',
            c
        )
        with open(fa, 'w', encoding='utf-8') as f:
            f.write(c)
        print('src/components/Footer.astro sanitized.')

    # 10. src/components/react/EnquiryModal.tsx
    em = os.path.join(ROOT, 'src', 'components', 'react', 'EnquiryModal.tsx')
    if os.path.exists(em):
        with open(em, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('https://formsubmit.co/ajax/propsmartrealty@gmail.com', '/api/lead-capture')
        c = c.replace('placeholder="e.g. rahul@gmail.com"', 'placeholder="Enter your email address"')
        with open(em, 'w', encoding='utf-8') as f:
            f.write(c)
        print('src/components/react/EnquiryModal.tsx sanitized.')

    # 11. exit-intent-concierge JS files
    concierge_files = [
        'exit-intent-concierge.src.js',
        'public/exit-intent-concierge.js',
        'public/scripts/exit-intent-concierge.js',
        'scripts/exit-intent-concierge.js'
    ]
    for cfile in concierge_files:
        cp = os.path.join(ROOT, cfile)
        if os.path.exists(cp):
            with open(cp, 'r', encoding='utf-8') as f:
                c = f.read()
            c = c.replace("fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com'", "fetch('/api/lead-capture'")
            c = c.replace('fetch("https://formsubmit.co/ajax/propsmartrealty@gmail.com"', 'fetch("/api/lead-capture"')
            c = c.replace("email: 'exit-concierge@paranjapetownship.com'", "email: ''")
            c = c.replace('placeholder="name@domain.com"', 'placeholder="Enter your email address"')
            c = c.replace('placeholder="e.g. rahul@gmail.com"', 'placeholder="Enter your email address"')
            with open(cp, 'w', encoding='utf-8') as f:
                f.write(c)
            print(f'{cfile} sanitized.')

if __name__ == '__main__':
    print('Starting universal email sanitization...')
    sanitize_static_files()
    sanitize_other_assets()
    print('Universal email sanitization complete!')
