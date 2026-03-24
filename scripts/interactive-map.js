/**
 * Interactive Master Plan (Phase 11)
 * High-Performance SVG Overlay & Hotspot Engine
 */

class InteractiveSovereignMap {
    constructor() {
        this.container = document.querySelector('.master-plan-wrap');
        this.preview = document.getElementById('hotspot-preview');
        this.previewTitle = document.getElementById('preview-title');
        this.previewDesc = document.getElementById('preview-desc');
        this.previewImg = this.preview?.querySelector('img');
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log("🗺️ Sovereign Map Engine: Initializing SVG Overlay...");
        this.setupSVGOverlay();
    }

    setupSVGOverlay() {
        const paths = document.querySelectorAll('.plan-path');
        paths.forEach(path => {
            path.addEventListener('mouseenter', () => {
                const title = path.getAttribute('data-title');
                const desc = path.getAttribute('data-desc');
                const img = path.getAttribute('data-img');
                const ledger = JSON.parse(path.getAttribute('data-ledger') || '{}');
                
                this.updatePreview(title, desc, img, ledger);
                this.highlightPath(path);
                
                // Contextual Intelligence Hook (Phase 11.2)
                window.dispatchEvent(new CustomEvent('sovereign-context-change', { 
                    detail: { title, ledger } 
                }));
            });
        });
    }

    updatePreview(title, desc, img, ledger) {
        if (!this.preview) return;

        const ledgerHtml = ledger.rera ? `
            <div class="ledger-mini-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05);">
                <div class="ledger-item">
                    <span style="font-size: 0.6rem; opacity: 0.5; text-transform: uppercase;">RERA Status</span>
                    <strong style="display: block; font-size: 0.75rem; color: var(--pscl-maroon);">${ledger.rera}</strong>
                </div>
                <div class="ledger-item">
                    <span style="font-size: 0.6rem; opacity: 0.5; text-transform: uppercase;">Possession</span>
                    <strong style="display: block; font-size: 0.75rem; color: var(--pscl-dark);">${ledger.possession}</strong>
                </div>
            </div>
        ` : '';

        // Elegant transition using GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.to(this.preview, { opacity: 0, y: 10, duration: 0.2, onComplete: () => {
                if (this.previewTitle) this.previewTitle.innerText = title;
                if (this.previewDesc) this.previewDesc.innerHTML = desc + ledgerHtml;
                if (this.previewImg) this.previewImg.src = img;
                
                gsap.to(this.preview, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
            }});
        } else {
            if (this.previewTitle) this.previewTitle.innerText = title;
            if (this.previewDesc) this.previewDesc.innerHTML = desc + ledgerHtml;
            if (this.previewImg) this.previewImg.src = img;
        }
    }

    highlightPath(activePath) {
        document.querySelectorAll('.plan-path').forEach(p => p.classList.remove('active-pulse'));
        activePath.classList.add('active-pulse');
    }
}

// Exit Intent (Phase 11.3)
class SovereignCRO {
    constructor() {
        this.initExitIntent();
        this.initConcierge();
    }

    initExitIntent() {
        let modalTriggered = false;
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0 && !modalTriggered && !sessionStorage.getItem('exit_intent_seen')) {
                console.log("🛑 Exit Intent Detected: Triggering Sovereign Brochure...");
                const modal = document.getElementById('master-plan-modal') || document.getElementById('enquiry-form-modal'); 
                if (modal) {
                    const title = modal.querySelector('h2') || modal.querySelector('.modal-title');
                    if (title) title.innerHTML = "Wait! Don't Miss the <i>Sovereign</i> Plan.";
                    modal.style.display = 'flex';
                    modalTriggered = true;
                    sessionStorage.setItem('exit_intent_seen', 'true');
                }
            }
        });
    }

    initConcierge() {
        if (document.getElementById('sovereign-concierge-bubble')) return;

        const bubble = document.createElement('div');
        bubble.id = 'sovereign-concierge-bubble';
        bubble.innerHTML = `
            <div class="concierge-avatar">
                <img src="images/logo.png" alt="Sovereign Concierge" style="object-fit: contain; background: #fff; padding: 5px;">
                <div class="online-indicator"></div>
            </div>
            <div class="concierge-content">
                <p class="concierge-msg" id="concierge-text">"Hello! 190 acres can be a lot to explore. Shall I guide you to the best plot?"</p>
                <button class="open-enquiry-modal concierge-btn" data-project="Personal Concierge">GET ADVICE</button>
            </div>
        `;
        document.body.appendChild(bubble);

        // Contextual Intelligence Listener (Phase 11.2)
        window.addEventListener('sovereign-context-change', (e) => {
            const { title, ledger } = e.detail;
            const msgEl = document.getElementById('concierge-text');
            const btnEl = bubble.querySelector('.concierge-btn');
            
            if (msgEl) {
                msgEl.innerText = `"Interested in ${title}? It's ${ledger.status || 'limited'}. Shall I share the details?"`;
            }
            if (btnEl) {
                btnEl.setAttribute('data-project', title);
            }
            
            // Re-trigger visual cues
            bubble.classList.add('active');

            // Tracking sovereignty (Phase 12.1)
            this.trackEvent('concierge_context_update', { project: title });
        });

        // Auto-show after 15 seconds if not already shown
        setTimeout(() => {
            bubble.classList.add('active');
            this.trackEvent('concierge_autoshow', {});
        }, 15000);

        this.initQuickNav();
    }

    initQuickNav() {
        if (window.innerWidth > 1024 || document.getElementById('sovereign-quick-nav')) return;

        const nav = document.createElement('div');
        nav.id = 'sovereign-quick-nav';
        nav.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(10px);
            padding: 10px 20px;
            border-radius: 50px;
            z-index: 9998;
            display: flex;
            gap: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        `;

        nav.innerHTML = `
            <a href="#master-plan" style="color: #fff; text-decoration: none; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <span style="font-size: 1.2rem;">🗺️</span> PLAN
            </a>
            <a href="#amenities" style="color: #fff; text-decoration: none; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <span style="font-size: 1.2rem;">🏯</span> AMENITY
            </a>
            <a href="#" class="open-enquiry-modal" data-project="Quick Nav" style="color: var(--pscl-gold); text-decoration: none; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <span style="font-size: 1.2rem;">📞</span> ADVISORY
            </a>
        `;

        document.body.appendChild(nav);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 800) {
                nav.style.transform = 'translateX(-50%) translateY(0)';
            } else {
                nav.style.transform = 'translateX(-50%) translateY(100px)';
            }
        });
    }

    trackEvent(name, params) {
        if (typeof gtag === 'function') {
            gtag('event', name, params);
        } else if (window.dataLayer) {
            window.dataLayer.push({ event: name, ...params });
        }
        console.log(`📊 Sovereign Analytics: ${name}`, params);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InteractiveSovereignMap();
    new SovereignCRO();
});
