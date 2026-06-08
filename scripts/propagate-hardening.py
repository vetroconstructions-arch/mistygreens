import os

ROOT = os.getcwd()

SOCIAL_PROOF_HTML = """
    <!-- Phase 60: Sovereign Trust Toast (Hardened) -->
    <div id="sovereign-toast" class="sovereign-toast-layer">
        <div class="toast-avatar" style="width: 40px; height: 40px; background: var(--pscl-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 0.8rem;">FT</div>
        <div class="toast-content">
            <div id="toast-message" style="font-size: 0.75rem; color: #1a1a1a; line-height: 1.4; font-weight: 600;">A family from Kothrud scheduled a site-visit.</div>
            <div id="toast-time" style="font-size: 0.6rem; color: #999; margin-top: 0.2rem; text-transform: uppercase; letter-spacing: 0.05em;">8 MINUTES AGO</div>
        </div>
    </div>

    <script>
    (function() {
        const toast = document.getElementById('sovereign-toast');
        const messageEl = document.getElementById('toast-message');
        const timeEl = document.getElementById('toast-time');
        
        if (!toast) return;

        const rhythms = [
            { msg: "14 families toured the Equestrian Center today.", time: "LIVE UPDATE" },
            { msg: "Misty Greens Phase 2 is now 85% Sold.", time: "REAL-TIME STATUS" },
            { msg: "A visitor from Kothrud scheduled a personal tour.", time: "12 MINUTES AGO" },
            { msg: "New 4BHK Villa booking confirmed in The Rivolo.", time: "2 HOURS AGO" },
            { msg: "8 prospective buyers from Baner requested ROI blueprints.", time: "JUST NOW" }
        ];

        let index = 0;
        const cycleToast = () => {
            const item = rhythms[index];
            messageEl.innerText = item.msg;
            timeEl.innerText = item.time;
            
            // Show
            setTimeout(() => {
                toast.classList.add('active');
                // Hide after 6s
                setTimeout(() => {
                    toast.classList.remove('active');
                    index = (index + 1) % rhythms.length;
                    // Cycle next after 15s
                    setTimeout(cycleToast, 15000);
                }, 6000);
            }, 3000);
        };

        // Start cycle after 10s initial delay
        setTimeout(cycleToast, 10000);
    })();
    </script>
"""

def harden_ui(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    import re
    
    # 1. Capture Page Title for Context
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    page_title = title_match.group(1).split('|')[0].strip() if title_match else "Forest Trails"

    # 2. Personalize WhatsApp Links
    # Matches href="https://wa.me/..." without text=
    wa_regex = r'href="(https://wa\.me/917744009295)(?![^"]*?text=)"'
    def wa_replacer(match):
        base_url = match.group(1)
        message = f"Hi, I'm interested in {page_title}. Please share details."
        import urllib.parse
        encoded_msg = urllib.parse.quote(message)
        return f'href="{base_url}?text={encoded_msg}"'
    
    html = re.sub(wa_regex, wa_replacer, html)

    # 3. Handle Social Proof / Toasts
    if 'id="sovereign-toast"' in html:
        html = re.sub(r'<!-- Phase 50: Sovereign Trust Toast -->.*?</div>.*?<script>.*?</script>', '', html, flags=re.DOTALL)
        html = re.sub(r'<!-- Phase 60: Sovereign Trust Toast \(Hardened\) -->.*?</div>.*?<script>.*?</script>', '', html, flags=re.DOTALL)

    if '</body>' in html:
        new_html = html.replace('</body>', SOCIAL_PROOF_HTML + '\n</body>')
        if new_html != html:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_html)
            return True
    return False

print("🚀 Starting Site-Wide UI Hardening & WhatsApp Personalization...")
count = 0
for root, dirs, files in os.walk(ROOT):
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if '.git' in dirs:
        dirs.remove('.git')
        
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            if harden_ui(file_path):
                count += 1

print(f"\n🎯 UI Hardened & WhatsApp Personalized across {count} pages.")
