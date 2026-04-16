#!/usr/bin/env node
/**
 * Dynamic Social Proof Pulse (Phase 50)
 * Injects 'Trust Toasts' to create occupancy vibrancy.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const SOCIAL_PROOF_HTML = `
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
                toast.style.transform = "translateX(0)";
                // Hide after 6s
                setTimeout(() => {
                    toast.style.transform = "translateX(-150%)";
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
`;

function injectSocialProof(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    
    if (!html.includes('id="sovereign-toast"')) {
        html = html.replace('</body>', `${SOCIAL_PROOF_HTML}\n</body>`);
    }

    if (html !== originalHtml) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ Social Proof Pulse Injected for: ${path.relative(ROOT, filePath)}`);
    }
}

console.log("🚀 Starting Social Proof Rhythms site-wide...");
function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.')) walkDir(filePath);
        } else if (file.endsWith('.html')) {
            injectSocialProof(filePath);
        }
    });
}
walkDir(ROOT);
console.log("\n🎯 Social Proof Trust Pulse established.");
