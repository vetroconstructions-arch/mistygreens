#!/usr/bin/env node
/**
 * Exit-Intent 'Black-Book' Lead Magnet (Phase 50)
 * Captures bouncing visitors with high-value elite content.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const EXIT_MODAL_HTML = `
    <!-- Phase 50: Exit-Intent Black-Book Modal -->
    <div id="exit-intent-modal" style="display: none; position: fixed; inset: 0; z-index: 10001; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); align-items: center; justify-content: center; padding: 2rem;">
        <div class="modal-card" style="background: #fff; max-width: 500px; width: 100%; padding: 4rem 3rem; border-radius: 12px; position: relative; text-align: center;">
            <button id="exit-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #999;">&times;</button>
            <span style="text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.2em; color: var(--pscl-gold); font-weight: 800;">Exclusive Access</span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; margin: 1.5rem 0; color: #1a1a1a;">The 2026 <i>Black-Book</i> Inventory.</h2>
            <p style="color: #666; font-size: 0.95rem; line-height: 1.8; margin-bottom: 2.5rem;">Before you go, secure your copy of the confidential West Pune inventory list, featuring pre-launch plots and off-market villas.</p>
            
            <form action="https://formsubmit.co/9eb74fc7102e3b160241074e2d36371f" method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="hidden" name="_subject" value="BLACK-BOOK INVENTORY REQUESTED">
                <input type="email" name="email" placeholder="Your Professional Email" required style="padding: 1.2rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                <input type="tel" name="phone" placeholder="Mobile Number" required style="padding: 1.2rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
                <button type="submit" style="background: #1a1a1a; color: #fff; padding: 1.2rem; border: none; border-radius: 4px; font-weight: 800; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; transition: background 0.3s;">Secure My Copy ✦</button>
            </form>
        </div>
    </div>

    <script>
    (function() {
        const modal = document.getElementById('exit-intent-modal');
        const closeBtn = document.getElementById('exit-close');
        
        if (!modal) return;

        const showModal = () => {
            if (localStorage.getItem('exit_modal_seen')) return;
            modal.style.display = 'flex';
            if (typeof gsap !== 'undefined') {
                gsap.from(modal.querySelector('.modal-card'), { 
                    scale: 0.9, opacity: 0, y: 30, duration: 0.8, ease: "expo.out" 
                });
            }
            localStorage.setItem('exit_modal_seen', 'true');
        };

        // Detect Exit Intent
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) showModal();
        });

        closeBtn?.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    })();
    </script>
`;

function injectExitIntent(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    
    if (!html.includes('id="exit-intent-modal"')) {
        html = html.replace('</body>', `${EXIT_MODAL_HTML}\n</body>`);
    }

    if (html !== originalHtml) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ Exit-Intent Hardened for: ${path.relative(ROOT, filePath)}`);
    }
}

console.log("🚀 Starting Exit-Intent Logic site-wide...");
function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.')) walkDir(filePath);
        } else if (file.endsWith('.html')) {
            injectExitIntent(filePath);
        }
    });
}
walkDir(ROOT);
console.log("\n🎯 Exit-Intent 'Black-Book' established.");
