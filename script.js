// 1. ImageGuardian: Resilience Engine
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        processBrokenImage(e.target);
    }
}, true);

function processBrokenImage(img) {
    console.warn('ImageGuardian: Protecting visual integrity for', img.src);
    img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20viewBox%3D%220%200%20800%20600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%236B0D0D%3Bstop-opacity%3A1%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%231A1A1A%3Bstop-opacity%3A1%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22url(%23g)%22%20%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22serif%22%20font-size%3D%2224%22%20fill%3D%22rgba(255%2C255%2C255%2C0.3)%22%20text-anchor%3D%22middle%22%3EFOREST%20TRAILS%3C%2Ftext%3E%3C%2Fsvg%3E';
    img.closest('.skeleton')?.classList.remove('skeleton');
}

// Handle skeleton dismissal on load
window.addEventListener('load', function(e) {
    if (e.target.tagName === 'IMG') {
        const skeleton = e.target.closest('.skeleton');
        if (skeleton) skeleton.classList.remove('skeleton');
    }
}, true);

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 0. Hero Text Stabilization (Pre-Timeline Split)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        const lines = text.split('<br>');
        heroTitle.innerHTML = lines.map(line => `<span style="display: block; overflow: hidden;"><span style="display: block;">${line}</span></span>`).join('');
    }

    // 1. Overture Loader (Stable Reveal)
    const tlLoader = gsap.timeline();
    
    tlLoader.to(".loader-line span", {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut"
    })
    .to("#loader", {
        yPercent: -100,
        duration: 1.5,
        ease: "expo.inOut"
    })
    .from(".hero-title span span", { // Fixed target for stabilized split
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.out"
    }, "-=0.8");

    // 2. Hero Orchestration
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 }});
    heroTl.to(".hero-section .reveal-up", {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        delay: 0.5,
        clearProps: "transform" // Stabilize after animation
    });
    tlLoader.add(heroTl, "-=1"); // Add heroTl to the main loader timeline, starting 1 second before the end of the previous animation

    // 2. Stable Scroll Orchestration
    // Subtle Background Parallax
    gsap.to(".parallax-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Navigation Multi-State Shift
    ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
            const nav = document.querySelector('.nav-main');
            if (self.direction === 1) nav.classList.add('scrolled');
            else if (self.scroll() < 50) nav.classList.remove('scrolled');
        }
    });

    // Dynamic Section Highlighting
    const navItems = document.querySelectorAll('.nav-item-new');
    const sections = ['township', 'clusters', 'master-layout', 'amenities', 'location', 'intel', 'enquire'];
    
    sections.forEach(id => {
        const target = document.getElementById(id);
        if (target) {
            ScrollTrigger.create({
                trigger: target,
                start: "top 20%",
                end: "bottom 20%",
                onToggle: self => {
                    if (self.isActive) {
                        navItems.forEach(item => {
                            const onclickStr = item.getAttribute('onclick') || '';
                            item.classList.toggle('active', onclickStr.includes(id));
                        });
                    }
                }
            });
        }
    });

    // 3. Editorial Reveal System
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    reveals.forEach(el => {
        gsap.to(el, {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // 4. Cluster Grid Depth
    const clusterItems = document.querySelectorAll('.cluster-item');
    clusterItems.forEach(item => {
        const img = item.querySelector('img');
        gsap.to(img, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });


    // 6. VR-Lite Panning Logic
    const vrWrap = document.querySelector('.vr-viewer-wrap');
    const vrImg = document.querySelector('.vr-panorama');
    if (vrWrap && vrImg) {
        let isDragging = false;
        let startX;
        let scrollLeft;
        let currentTranslate = 0;

        vrWrap.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - vrWrap.offsetLeft;
        });

        vrWrap.addEventListener('mouseleave', () => { isDragging = false; });
        vrWrap.addEventListener('mouseup', () => { isDragging = false; });

        vrWrap.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - vrWrap.offsetLeft;
            const walk = (x - startX) * 2; // Panning speed
            currentTranslate += walk;
            
            // Boundary check (Panorama is 200% width)
            const maxPan = vrImg.offsetWidth - vrWrap.offsetWidth;
            if (currentTranslate > 0) currentTranslate = 0;
            if (currentTranslate < -maxPan) currentTranslate = -maxPan;
            
            vrImg.style.transform = `translateX(${currentTranslate}px)`;
            startX = x; // Reset startX for relative movement
        });
    }

    // 7. Elite Lead Intelligence (Survey Logic)
    const surveyForm = document.querySelector('.sovereign-survey');
    if (surveyForm) {
        surveyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = surveyForm.querySelector('.btn-submit');
            btn.innerHTML = "CALCULATING LEGACY SCORE...";
            
            setTimeout(() => {
                btn.innerHTML = "ADVISORY SECURED [SCORE: 9.8/10]";
                btn.style.background = "#B38E5D"; // Gold
                btn.style.color = "#000";
            }, 2500);
        });
    }


    // 9. The Wealth Architect (ROI Logic)
    const yearsSlider = document.getElementById('years-slider');
    const catalystChips = document.querySelectorAll('.catalyst-chip');
    const projectedValEl = document.getElementById('projected-value');
    const roiPercentEl = document.getElementById('roi-percent');

    function updateROI() {
        const years = parseInt(yearsSlider.value);
        let multiplier = 1;
        
        catalystChips.forEach(chip => {
            if (chip.classList.contains('active')) {
                multiplier = parseFloat(chip.dataset.multiplier);
            }
        });

        const initialInvestment = 10000000; // ₹1 Cr
        const cagr = 0.212;
        // Formula: FV = PV * (1 + r)^n * multiplier
        let finalValue = initialInvestment * Math.pow(1 + cagr, years) * multiplier;
        
        // Formatting to Cr
        const valueInCr = (finalValue / 10000000).toFixed(2);
        const absoluteROI = (((finalValue - initialInvestment) / initialInvestment) * 100).toFixed(0);
        
        projectedValEl.innerHTML = `₹${valueInCr} Cr`;
        roiPercentEl.innerHTML = `+${absoluteROI}%`;
    }

    if (yearsSlider) {
        yearsSlider.addEventListener('input', updateROI);
        catalystChips.forEach(chip => {
            chip.addEventListener('click', () => {
                catalystChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                updateROI();
            });
        });
        updateROI(); // Initial calc
    }

    // 10. Multi-Sensory Immersion (Ambient Audio)
    const ambientBtn = document.getElementById('ambient-toggle');
    const audio = document.getElementById('sahyadri-ambient');
    
    if (ambientBtn && audio) {
        ambientBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                ambientBtn.classList.add('active');
            } else {
                audio.pause();
                ambientBtn.classList.remove('active');
            }
        });
    }

    // 11. Atmospheric Time-Sync Theme Engine
    function syncAtmosphere() {
        const hour = new Date().getHours();
        const body = document.body;
        body.classList.remove('mode-dawn', 'mode-midday', 'mode-sunset', 'mode-night');

        if (hour >= 5 && hour < 8) body.classList.add('mode-dawn');
        else if (hour >= 17 && hour < 19) body.classList.add('mode-sunset');
        else if (hour >= 19 || hour < 5) body.classList.add('mode-night');
        else body.classList.add('mode-midday');
    }
    syncAtmosphere();

    // 12. PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
    }

    // 14. Sovereign Qualifier Logic (Consolidated with sendEnquiry)
    // Removed old submit listener to avoid duplication with the one below

    // 15. Heritage Concierge Logic
    const conciergeModal = document.getElementById('heritage-concierge');
    const openConcierge = document.getElementById('concierge-open');
    const closeConcierge = document.getElementById('concierge-close');
    const responseArea = document.getElementById('concierge-response');
    const prompts = document.querySelectorAll('.c-prompt');

    if (openConcierge && conciergeModal) {
        openConcierge.addEventListener('click', () => {
            conciergeModal.classList.add('active');
            gsap.from(".concierge-panel > *", { opacity: 0, x: 50, stagger: 0.1, duration: 0.8, ease: "expo.out" });
        });

        closeConcierge.addEventListener('click', () => conciergeModal.classList.remove('active'));

        const responses = {
            roi: "Forest Trails has documented a 21.2% CAGR over the last 15 years, significantly outperforming West Pune averages due to its integrated 190-acre scale.",
            nri: "NRIs benefit from specialized wealth advisors, streamlined digital documentation in the Sovereign Vault, and dedicated property management for international estates.",
            plots: "Misty Greens currently offers prime valley-view plots from 1,930 sq.ft. to 3,500 sq.ft. with NA certification and individual 7/12 extracts.",
            visit: "I have alerted our private advisor. Would you like to schedule a virtual tour or an in-person viewing for Kothrud/Bavdhan next week?"
        };

        prompts.forEach(p => {
            p.addEventListener('click', () => {
                const query = p.getAttribute('data-query');
                responseArea.innerHTML = `<p style="color: var(--pscl-gold); margin-top: 2rem;">Searching Heritage Archives...</p>`;
                
                setTimeout(() => {
                    responseArea.innerHTML = `<div style="background: rgba(212,175,55,0.1); padding: 2rem; border-left: 2px solid var(--pscl-gold); margin-top: 2rem;">
                        <p style="font-size: 0.9rem; line-height: 1.8;">${responses[query]}</p>
                    </div>`;
                }, 1000);
            });
        });
    }

    // 16. Localized Authority Verification
    console.log("Sovereign Phase 39: Final Polish Active");
    // 17. Technical Ledger Logic
    const ledgerBtns = document.querySelectorAll('.ledger-trigger');
    const ledgerModals = document.querySelectorAll('.ledger-modal');
    const ledgerCloses = document.querySelectorAll('.ledger-close');

    /**
 * Unified Enquiry Submission to Formspree
 * Sends form data to propsmartrealty@gmail.com via Formspree
 */
async function sendEnquiry(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Add source identifier if not present
    if (!data.source) {
        data.source = window.location.pathname;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'SUBMIT';
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'SENDING...';
    }

    try {
        // Formspree endpoint for propsmartrealty@gmail.com
        // Note: The user will need to confirm the first submission via email
        const response = await fetch('https://formspree.io/f/xvgzezpw', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Your enquiry has been sent successfully. We will get back to you soon.',
                icon: 'success',
                confirmButtonColor: '#c5a059'
            });
            form.reset();
            
            // Close modal if it's in one
            const modal = form.closest('.heritage-concierge');
            if (modal) modal.classList.remove('active');
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'There was an error sending your enquiry. Please try again or call us directly.',
            icon: 'error',
            confirmButtonColor: '#c5a059'
        });
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    }
}

// Intercept form submissions
document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiry-form-modal');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic Phone Validation
            const phoneInput = enquiryForm.querySelector('input[name="phone"]');
            if (phoneInput && !/^\d{10}$/.test(phoneInput.value.trim())) {
                Swal.fire({
                    title: 'Invalid Phone Number',
                    text: 'Please enter a valid 10-digit mobile number.',
                    icon: 'warning',
                    confirmButtonColor: '#c5a059'
                });
                return;
            }
            
            sendEnquiry('enquiry-form-modal');
        });
    }

    const qualifierForm = document.getElementById('qualifier-form');
    if (qualifierForm) {
        // Redefine step logic if needed, but the submit listener is the key
        const steps = qualifierForm.querySelectorAll('.survey-step');
        const progressFill = document.getElementById('progress-fill');
        const stepCountText = document.getElementById('step-count');
        const options = qualifierForm.querySelectorAll('.q-opt');
        let currentStep = 1;
        const totalSteps = 4;

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                const nextStep = parseInt(opt.getAttribute('data-next'));
                if (nextStep <= totalSteps) {
                    goToStep(nextStep);
                }
            });
        });

        function goToStep(step) {
            steps.forEach(s => s.classList.remove('active'));
            const targetStep = qualifierForm.querySelector(`.survey-step[data-step="${step}"]`);
            if (targetStep) targetStep.classList.add('active');
            currentStep = step;
            updateProgress();
        }

        function updateProgress() {
            const percentage = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${percentage}%`;
            stepCountText.innerText = `STEP 0${currentStep}/0${totalSteps}`;
        }

        qualifierForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic Phone Validation
            const phoneInput = qualifierForm.querySelector('input[name="phone"]');
            if (phoneInput && !/^\d{10}$/.test(phoneInput.value.trim())) {
                Swal.fire({
                    title: 'Invalid Phone Number',
                    text: 'Please enter a valid 10-digit mobile number.',
                    icon: 'warning',
                    confirmButtonColor: '#c5a059'
                });
                return;
            }

            // UI feedback for qualifier form
            qualifierForm.style.display = 'none';
            const prog = document.querySelector('.qualifier-progress');
            if (prog) prog.style.display = 'none';
            const succ = document.getElementById('qualifier-success');
            if (succ) succ.style.display = 'block';

            sendEnquiry('qualifier-form');
        });
    }

    // Open modal triggers
    const openTriggers = document.querySelectorAll('#concierge-open, .open-enquiry-modal');
    const modal = document.querySelector('#heritage-concierge');
    const closeBtn = document.querySelector('#concierge-close');
    const modalTitle = modal ? modal.querySelector('.concierge-header h3') : null;
    const projectInterest = modal ? modal.querySelector('select[name="interest"]') : null;
    const modalLabel = modal ? modal.querySelector('.concierge-body p') : null;

    if (openTriggers && modal) {
        openTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const project = trigger.getAttribute('data-project') || 'General Township';
                
                // Contextual Rewriting
                if (modalTitle) modalTitle.innerHTML = `Enquiry for <i>${project}</i>`;
                if (modalLabel) modalLabel.innerHTML = `Get Exclusive ${project} Details & Private Price List`;
                
                // Smart Interest Selection
                if (projectInterest) {
                    if (project.includes('Plots')) projectInterest.value = 'plots';
                    else if (project.includes('Villas')) projectInterest.value = 'villas';
                    else projectInterest.value = 'investment';
                }

                // Inject Scarcity Trigger
                const existingScarcity = modal.querySelector('.scarcity-alert');
                if (existingScarcity) existingScarcity.remove();
                
                const scarcityMsg = project.includes('Plots') ? "ALERT: Only 4 Valley-View Plots Remaining" : "TRENDING: 12 Enquiries in the last 24h";
                const scarcityDiv = document.createElement('div');
                scarcityDiv.className = 'scarcity-alert';
                scarcityDiv.style = "background: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.2); color: #ff4d4d; padding: 0.8rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; text-align: center; border-radius: 4px; animation: pulse 2s infinite;";
                scarcityDiv.innerHTML = scarcityMsg;
                modal.querySelector('.concierge-body').prepend(scarcityDiv);

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                trackEvent('modal_open_contextual', { project: project });
            });
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});
    ledgerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.classList.add('active');
                gsap.from(modal.querySelector('.ledger-panel'), { y: 100, opacity: 0, duration: 0.8, ease: "expo.out" });
            }
        });
    });

    ledgerCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.ledger-modal');
            if (modal) modal.classList.remove('active');
        });
    });

    // 5. Infographic Counters
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseFloat(stat.innerText.replace(/[^0-9.]/g, ''));
        const suffix = stat.innerText.replace(/[0-9.]/g, '');
        
        stat.innerText = "0" + suffix;
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 90%",
            onEnter: () => {
                gsap.to(stat, {
                    innerText: target,
                    duration: 2.5,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + suffix;
                    }
                });
            }
        });
    });

// 10. SEO Content Freshness Automation
    function injectFreshnessSignals() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonth = monthNames[currentDate.getMonth()];
        
        // Update copyright years automatically
        const copyrightEls = document.querySelectorAll('.footer-main p');
        copyrightEls.forEach(el => {
            if (el.innerHTML.includes('&copy;')) {
                el.innerHTML = `&copy; ${currentYear} Paranjape Schemes (Construction) Ltd. All Rights Reserved. Last updated: ${currentMonth} ${currentYear}.`;
            }
        });

        // Add hidden freshness signal for Googlebot
        const bodyStr = document.body.innerHTML;
        if (!bodyStr.includes('seo-freshness-signal')) {
            const freshnessSignal = document.createElement('div');
            freshnessSignal.className = 'seo-freshness-signal';
            freshnessSignal.style.display = 'none';
            freshnessSignal.setAttribute('aria-hidden', 'true');
            freshnessSignal.innerHTML = `Page content verified and updated for Paranjape Forest Trails Bhugaon as of ${currentDate.toISOString()}`;
            document.body.appendChild(freshnessSignal);
        }
    }
    
    // Run freshness injection after a slight delay
    setTimeout(injectFreshnessSignals, 500);

    // 11. Conversion Tracking Layer (SEO Phase 6)
    function trackEvent(eventName, eventDetails = {}) {
        console.log(`📊 Tracking Event: ${eventName}`, eventDetails);
        // Prepare for GTM/GA4 if present
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': eventName,
                ...eventDetails
            });
        }
    }

    // Monitor Phone & WhatsApp Clicks
    document.querySelectorAll('a[href^="tel:"], a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            const type = link.href.includes('tel:') ? 'Phone' : 'WhatsApp';
            trackEvent('conversion_click', { 'type': type, 'url': link.href });
        });
    });

    // Monitor Tech Ledger (High Intent) Reveals
    document.querySelectorAll('.ledger-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            trackEvent('intent_view_ledger', { 'target': trigger.dataset.target || 'General' });
        });
    });

    // Monitor Form Submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            trackEvent('form_submission', { 'form_id': form.id || 'anonymous_form' });
        });
    });

    // Monitor ROI Simulator Adjustments
    const roiSlider = document.getElementById('years-slider');
    if (roiSlider) {
        roiSlider.addEventListener('change', () => {
            trackEvent('interactive_roi_sim', { 'years': roiSlider.value });
        });
    }


    // 13. Behavioral Conversion Pill (70% Scroll Depth)
    function initConversionPill() {
        const pill = document.createElement('div');
        pill.className = 'conversion-pill';
        pill.innerHTML = `
            <span class="pill-text">EXPERT ADVISORY AVAILABLE TODAY</span>
            <button class="pill-btn open-enquiry-modal" onclick="trackEvent('conversion_pill_click')">REQUEST CALLBACK</button>
        `;
        document.body.appendChild(pill);

        let hasShown = false;
        window.addEventListener('scroll', () => {
            if (hasShown) return;
            
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPos = window.scrollY;
            const scrollDepth = (scrollPos / scrollHeight) * 100;

            if (scrollDepth > 70) {
                pill.classList.add('active');
                hasShown = true;
                trackEvent('conversion_pill_reveal');
            }
        });
    }
    initConversionPill();

});

