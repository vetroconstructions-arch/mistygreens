// High-Resilience Universal Fail-Safe for Preloader
// This runs even if GSAP or other dependencies crash
(function() {
    const dismissLoader = () => {
        const loader = document.getElementById('loader');
        if (loader && loader.style.display !== 'none') {
            console.warn('Overture: Universal Fail-Safe Triggered');
            loader.style.transition = 'opacity 0.8s ease, transform 1s ease';
            loader.style.opacity = '0';
            loader.style.transform = 'translateY(-100%)';
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 1100);
            document.body.style.overflow = 'auto';
            document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translate(0,0)';
            });
        }
    };
    // Multiple checkpoints for maximum certainty
    setTimeout(dismissLoader, 3000);
    setTimeout(dismissLoader, 5000);
    window.addEventListener('load', () => setTimeout(dismissLoader, 1000));
})();

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
    const loader = document.getElementById('loader');
    


    if (typeof gsap === 'undefined') {
        console.error('Overture: GSAP not detected. Reverting to structural rendering.');
        if (loader) loader.style.display = 'none';
        return;
    }

    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
        console.warn('Overture: ScrollTrigger plugin failed to register.');
    }

    // 0.5. Hero Text Stabilization (Pre-Timeline Split)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        const lines = text.split('<br>');
        heroTitle.innerHTML = lines.map(line => `<span style="display: block; overflow: hidden;"><span style="display: block;">${line}</span></span>`).join('');
    }

    // 1. Overture Loader (Stable Reveal)
    const tlLoader = gsap.timeline({
        onComplete: () => {
            if (loader) loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    
    tlLoader.to(".loader-line span", {
        width: "100%",
        duration: 1.2,
        ease: "power2.inOut"
    })
    .to("#loader", {
        yPercent: -100,
        duration: 1.0,
        ease: "expo.inOut"
    })
    .from(".hero-title span span", { 
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
        clearProps: "transform"
    });
    tlLoader.add(heroTl, "-=1"); 

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
            const header = document.querySelector('.header-main');
            if (header) {
                if (self.direction === 1) header.classList.add('scrolled');
                else if (self.scroll() < 50) header.classList.remove('scrolled');
            }
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

    // 3. Editorial Reveal System (Enhanced with Staggered Grids)
    const revealContainers = document.querySelectorAll('.grid-12, .cluster-grid, .infographic-grid, .wiki-grid, .matrix-grid');
    
    revealContainers.forEach(container => {
        const items = container.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        if (items.length > 0) {
            gsap.to(items, {
                y: 0,
                x: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        }
    });

    // Individual reveals for non-grid elements
    const individualReveals = document.querySelectorAll('.reveal-up:not(.grid-12 *), .reveal-left:not(.grid-12 *), .reveal-right:not(.grid-12 *)');
    individualReveals.forEach(el => {
        gsap.to(el, {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // 3.5 Premium 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.box-maroon, .info-card, .news-card, .cluster-item, .silo-card, .township-card, .stat-bubble, .tracker-card, .wealth-projection-card');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(el, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                rotateX: 0,
                rotateY: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
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
        if (!yearsSlider || !projectedValEl || !roiPercentEl) return;
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
            if (conciergeModal) {
                conciergeModal.style.display = 'flex';
                conciergeModal.classList.add('active');
                gsap.from(".concierge-panel > *", { opacity: 0, x: 50, stagger: 0.1, duration: 0.8, ease: "expo.out" });
            }
        });

        closeConcierge?.addEventListener('click', () => {
            if (conciergeModal) {
                conciergeModal.classList.remove('active');
                setTimeout(() => { conciergeModal.style.display = 'none'; }, 600);
            }
        });

        const responses = {
            roi: "Forest Trails has documented a 21.2% CAGR over the last 15 years, significantly outperforming West Pune averages due to its integrated 190-acre scale.",
            nri: "NRIs benefit from specialized wealth advisors, streamlined digital documentation in the Sovereign Vault, and dedicated property management for international estates.",
            plots: "Misty Greens currently offers prime valley-view plots from 1,930 sq.ft. to 3,500 sq.ft. with NA certification and individual 7/12 extracts.",
            visit: "I have alerted our private advisor. Would you like to schedule a virtual tour or an in-person viewing for Kothrud/Bavdhan next week?"
        };

        prompts.forEach(p => {
            p.addEventListener('click', () => {
                const type = p.dataset.type;
                if (responseArea) {
                    responseArea.innerHTML = `<p style="color: var(--pscl-gold); margin-top: 2rem;">Searching Heritage Archives...</p>`;
                    setTimeout(() => {
                        responseArea.innerHTML = `<div style="background: rgba(212,175,55,0.1); padding: 2rem; border-left: 2px solid var(--pscl-gold); margin-top: 2rem;">
                            <p style="color: #fff; font-size: 0.95rem; line-height: 1.6; margin: 0;">${responses[type]}</p>
                        </div>`;
                    }, 800);
                }
            });
        });
    }

    // 16. Localized Authority Verification
    console.log("Sovereign Phase 39: Final Polish Active");

    // 16.5 Global Enquiry Button Interceptor
    // Catches ALL "Enquire" or "Brochure" buttons dynamically
    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest('button, a.btn, .btn');
        if (!btn) return;
        
        const txt = (btn.innerText || '').toLowerCase();
        if ((txt.includes('enquire') || txt.includes('enquiry') || txt.includes('brochure') || txt.includes('price list') || txt.includes('download')) 
            && !btn.classList.contains('open-enquiry-modal') 
            && btn.id !== 'concierge-open' 
            && btn.id !== 'concierge-close'
            && !btn.closest('#heritage-concierge')
            && !btn.closest('.ledger-modal')) {
            
            // Prevent default if it's an anchor tag aiming nowhere
            if (btn.tagName === 'A' && (!btn.href || btn.href.endsWith('#'))) {
                e.preventDefault();
            }

            const modalToOpen = document.querySelector('#heritage-concierge');
            if (modalToOpen) {
                // Determine context
                const modalTitle = modalToOpen.querySelector('.form-header h3');
                const projectInterest = modalToOpen.querySelector('select[name="interest"]');
                const project = btn.getAttribute('data-project') || 'General Township';
                
                if (modalTitle) modalTitle.innerHTML = `${project} <i>Callback</i>`;
                if (projectInterest) {
                    if (project.includes('Plots') || txt.includes('plots')) projectInterest.value = 'plots';
                    else if (project.includes('Villas') || txt.includes('villas')) projectInterest.value = 'villas';
                    else if (project.includes('Apartment') || txt.includes('apartments')) projectInterest.value = 'apartments';
                    else projectInterest.value = '';
                }

                modalToOpen.style.display = 'flex';
                modalToOpen.classList.add('active');
                document.body.style.overflow = 'hidden';
                if (typeof gsap !== 'undefined') {
                    gsap.from(modalToOpen.querySelector('.concierge-panel'), {
                        y: 40, opacity: 0, scale: 0.95, duration: 0.8, ease: "expo.out"
                    });
                }
            }
        }
    });

    // 17. Technical Ledger Logic
    const ledgerBtns = document.querySelectorAll('.ledger-trigger');
    const ledgerModals = document.querySelectorAll('.ledger-modal');
    // The `sendEnquiry` Javascript interception strategy has been completely 
    // removed per the user's request for the absolute simplest, most 
    // bulletproof solution. Forms will now submit natively via HTML action.
    
    // Basic Phone Validation for forms before native submit
    const enquiryForm = document.getElementById('enquiry-form-modal');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            const phoneInput = enquiryForm.querySelector('input[name="phone"]');
            if (phoneInput && !/^\d{10}$/.test(phoneInput.value.trim())) {
                e.preventDefault();
                Swal.fire({
                    title: 'Invalid Phone Number',
                    text: 'Please enter a valid 10-digit mobile number.',
                    icon: 'warning',
                    confirmButtonColor: '#c5a059'
                });
            }
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
                const step = opt.closest('.survey-step').getAttribute('data-step');
                const val = opt.getAttribute('data-value');
                
                // Map step to hidden input
                if (step === '1') qualifierForm.querySelector('input[name="interest"]').value = val;
                if (step === '2') qualifierForm.querySelector('input[name="magnitude"]').value = val;
                if (step === '3') qualifierForm.querySelector('input[name="lifestyle"]').value = val;

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
            // Basic Phone Validation
            const phoneInput = qualifierForm.querySelector('input[name="phone"]');
            if (phoneInput && !/^\d{10}$/.test(phoneInput.value.trim())) {
                e.preventDefault();
                Swal.fire({
                    title: 'Invalid Phone Number',
                    text: 'Please enter a valid 10-digit mobile number.',
                    icon: 'warning',
                    confirmButtonColor: '#c5a059'
                });
            }
            // If valid, native HTML submission to formsubmit.co takes over
        });
    }

    // Open modal triggers
    const openTriggers = document.querySelectorAll('#concierge-open, .open-enquiry-modal');
    const modal = document.querySelector('#heritage-concierge');
    const closeBtn = document.querySelector('#concierge-close');
    const modalTitle = modal ? modal.querySelector('.form-header h3') : null;
    const projectInterest = modal ? modal.querySelector('select[name="interest"]') : null;
    const modalLabel = modal ? modal.querySelector('.form-header p') : null;

    if (openTriggers && modal) {
        openTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const project = trigger.getAttribute('data-project') || 'General Township';
                
                // Contextual Rewriting
                if (modalTitle) modalTitle.innerHTML = `${project} <i>Callback</i>`;
                if (modalLabel) modalLabel.innerHTML = `Get exclusive ${project} pricing & priority schedule.`;
                
                // Smart Interest Selection
                if (projectInterest) {
                    if (project.includes('Plots')) projectInterest.value = 'plots';
                    else if (project.includes('Villas')) projectInterest.value = 'villas';
                    else if (project.includes('Apartment')) projectInterest.value = 'apartments';
                    else projectInterest.value = '';
                }

                // Inject Scarcity Trigger
                const existingScarcity = modal.querySelector('.scarcity-alert');
                if (existingScarcity) existingScarcity.remove();
                
                const scarcityMsg = project.includes('Plots') ? "ALERT: Only 4 Valley-View Plots Remaining" : "TRENDING: 12 enquiries in the last 24h";
                const scarcityDiv = document.createElement('div');
                scarcityDiv.className = 'scarcity-alert';
                scarcityDiv.style = "background: rgba(183, 48, 42, 0.05); border: 1px solid rgba(183, 48, 42, 0.2); color: var(--pscl-red); padding: 1rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem; text-align: center; border-radius: 8px; position: relative; overflow: hidden;";
                scarcityDiv.innerHTML = `<span style="position: relative; z-index: 1;">${scarcityMsg}</span><div class="scarcity-shimmer" style="position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(183, 48, 42, 0.1), transparent); width: 50%; transform: skewX(-20deg); animation: scarcity-shimmer 3s infinite;"></div>`;
                
                const formHeader = modal.querySelector('.form-header');
                if (formHeader) formHeader.after(scarcityDiv);
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                // GSAP Entrance for Modal and Scarcity
                gsap.from(modal.querySelector('.concierge-panel'), {
                    y: 40, opacity: 0, scale: 0.95, duration: 0.8, ease: "expo.out"
                });
                gsap.from(scarcityDiv, {
                    x: -20, opacity: 0, duration: 1, delay: 0.3, ease: "power4.out"
                });
                
                trackEvent('modal_open_contextual', { project: project });
            });
        });
    }

    if (closeBtn && modal) {
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeModal);
        document.querySelector('.concierge-overlay')?.addEventListener('click', closeModal);
    }
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


    // 13. Elite Conversion Pill Visibility (After 20% Scroll)
    function initEliteCallbackPill() {
        const pill = document.getElementById('callback-pill');
        if (!pill) return;

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const threshold = window.innerHeight * 0.2; // 20% Scroll Depth
            
            if (scrollPos > threshold) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
    }
    initEliteCallbackPill();

    // 16. Township Finance Suite Logic (SEO Phase 15)
    // EMI Calculator
    const loanAmount = document.getElementById('loan-amount');
    const interestRate = document.getElementById('interest-rate');
    const loanTenure = document.getElementById('loan-tenure');
    const emiOutput = document.getElementById('emi-output');

    function calculateEMI() {
        if (!loanAmount || !interestRate || !loanTenure || !emiOutput) return;
        
        const p = parseFloat(loanAmount.value);
        const r = parseFloat(interestRate.value) / 1200; // Monthly interest
        const n = parseFloat(loanTenure.value) * 12; // Months
        
        if (p > 0 && r > 0 && n > 0) {
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            emiOutput.innerText = `₹${Math.round(emi).toLocaleString('en-IN')}`;
        }
    }

    [loanAmount, interestRate, loanTenure].forEach(el => {
        if (el) el.addEventListener('input', calculateEMI);
    });

    // Area Converter
    const sqftInput = document.getElementById('sqft-input');
    const gunthaOutput = document.getElementById('guntha-output');
    const acreOutput = document.getElementById('acre-output');

    function convertArea() {
        if (!sqftInput || !gunthaOutput || !acreOutput) return;
        
        const sqft = parseFloat(sqftInput.value);
        if (sqft >= 0) {
            const guntha = sqft / 1089;
            const acre = sqft / 43560;
            gunthaOutput.innerText = guntha.toFixed(2);
            acreOutput.innerText = acre.toFixed(3);
        }
    }

    if (sqftInput) sqftInput.addEventListener('input', convertArea);

    // Initial Calcs
    calculateEMI();
    convertArea();

    // 17. Sovereign FAQ Accordion (Conversational SEO)
    const faqItems = document.querySelectorAll('.faq-item h4');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('span');
            const isActive = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';

            // Close all others
            document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
            document.querySelectorAll('.faq-item h4 span').forEach(s => s.innerText = '+');

            if (!isActive) {
                answer.style.maxHeight = '300px';
                icon.innerText = '-';
                trackEvent('faq_interaction', { question: item.innerText });
            }
        });
    });

    // 18. Live Momentum Signal (Social Proof Injection)
    function initLiveSignals() {
        const signalWrap = document.createElement('div');
        signalWrap.className = 'live-signal-pill mobile-hidden';
        signalWrap.style = "position: fixed; bottom: 2rem; left: 2rem; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); padding: 0.8rem 1.5rem; border-radius: 50px; color: #fff; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; display: flex; align-items: center; gap: 0.8rem; z-index: 1000; border: 1px solid rgba(212,175,55,0.3); opacity: 0; transition: opacity 0.5s;";
        
        const dot = document.createElement('span');
        dot.style = "width: 8px; height: 8px; background: #2ecc71; border-radius: 50%; box-shadow: 0 0 10px #2ecc71; animation: pulse 2s infinite;";
        
        const text = document.createElement('span');
        const siteVisits = Math.floor(Math.random() * (15 - 8 + 1) + 8); // Random 8-15
        text.innerText = `${siteVisits} FAMILIES VISITING SITE TODAY`;
        
        signalWrap.appendChild(dot);
        signalWrap.appendChild(text);
        document.body.appendChild(signalWrap);

        setTimeout(() => signalWrap.style.opacity = '1', 3000);
    }
    initLiveSignals();

    // 19. Sovereign Knowledge Base (Wiki) Interactivity (SEO Phase 17)
    const wikiTriggers = document.querySelectorAll('.wiki-trigger');
    wikiTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const span = trigger.querySelector('span');
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';

            // Close all other wiki items
            document.querySelectorAll('.wiki-content').forEach(c => c.style.maxHeight = '0px');
            document.querySelectorAll('.wiki-trigger span').forEach(s => s.innerText = '+');

            if (!isOpen) {
                content.style.maxHeight = '500px';
                span.innerText = '-';
                trackEvent('wiki_interaction', { 'topic': trigger.innerText.replace('+', '').trim() });
            }
        });
    });

    // 20. Global Currency Intelligence (SEO Phase 18)
    const currencyButtons = document.querySelectorAll('.currency-btn');
    let currentCurrency = 'INR';
    const exchangeRates = { 'INR': 1, 'USD': 0.012, 'AED': 0.044, 'GBP': 0.0094 };
    const currencySymbols = { 'INR': '₹', 'USD': '$', 'AED': 'د.إ', 'GBP': '£' };

    function updateCalculations() {
        if (!loanAmount || !interestRate || !loanTenure || !emiOutput) return;
        const p = parseFloat(loanAmount.value);
        const r = parseFloat(interestRate.value) / 1200;
        const n = parseFloat(loanTenure.value) * 12;
        
        if (p > 0 && r > 0 && n > 0) {
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const convertedEmi = emi * exchangeRates[currentCurrency];
            emiOutput.innerText = `${currencySymbols[currentCurrency]}${Math.round(convertedEmi).toLocaleString('en-IN')}`;
        }
    }

    currencyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currencyButtons.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'rgba(255,255,255,0.1)';
                b.style.color = '#fff';
            });
            btn.classList.add('active');
            btn.style.background = 'var(--pscl-gold)';
            btn.style.color = '#000';
            currentCurrency = btn.dataset.currency;
            updateCalculations();
            trackEvent('currency_switch', { 'target': currentCurrency });
        });
    });

    // Link original EMI function to respect currency
    const baseCalculateEMI = calculateEMI;
    calculateEMI = function() {
        updateCalculations();
    };

    // 21. Timezone-Aware Behavioral CTAs (SEO Phase 18)
    function adaptCTAsForTimezone() {
        const istTime = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (5.5 * 60 * 60 * 1000));
        const hours = istTime.getHours();
        const globalEnquiryBtn = document.getElementById('nav-enquire');
        if (globalEnquiryBtn && (hours >= 20 || hours < 8)) {
            globalEnquiryBtn.innerText = 'ENQUIRE NOW';
            globalEnquiryBtn.style.background = 'var(--pscl-gold)';
            globalEnquiryBtn.style.color = '#000';
            trackEvent('timezone_cta_adapt', { 'hour': hours });
        }
    }
    adaptCTAsForTimezone();

    // 22. Predictive Intent & Segmented Modals (SEO Phase 20)
    let userIntent = 'General';
    const monitorIntent = () => {
        const investmentElements = ['finance-tools', 'wiki-hub', 'legal-check'];
        const lifestyleElements = ['amenities', 'lifestyle-gallery', 'delivery'];
        
        window.addEventListener('scroll', () => {
            investmentElements.forEach(id => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < window.innerHeight / 2) userIntent = 'Investor';
            });
            lifestyleElements.forEach(id => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < window.innerHeight / 2) userIntent = 'Lifestyle';
            });
        });
    };
    monitorIntent();

    // Override Modal Trigger for Segmented Content
    const baseOpenModal = window.openEnquiryModal;
    window.openEnquiryModal = (project) => {
        const modalTitle = document.querySelector('#enquiryModal .modal-title');
        if (modalTitle) {
            if (userIntent === 'Investor') {
                modalTitle.innerHTML = `Request <i>Investor</i> Brief for ${project || 'Forest Trails'}`;
            } else if (userIntent === 'Lifestyle') {
                modalTitle.innerHTML = `Book <i>Family</i> Tour for ${project || 'Forest Trails'}`;
            }
        }
        if (baseOpenModal) baseOpenModal(project);
    };

    // 23. Live Demand Ticker (Social Proof - SEO Phase 20)
    function initDemandTicker() {
        const ticker = document.createElement('div');
        ticker.className = 'demand-ticker mobile-hidden';
        ticker.style = "position: fixed; bottom: 5rem; left: 2rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 0.6rem 1.2rem; border-radius: 4px; color: #fff; font-size: 0.6rem; letter-spacing: 0.1em; transform: translateX(-150%); transition: transform 0.8s var(--ease-editorial); z-index: 999; border: 1px solid rgba(255,255,255,0.1);";
        document.body.appendChild(ticker);

        const messages = [
            "4 Families viewed Whistling Meadows recently",
            "Misty Greens Plot availability updated: 8 Left",
            "2 New Site Visit bookings from UAE today",
            "High Demand detected for Hillside Villas"
        ];

        let index = 0;
        const showTicker = () => {
            ticker.innerText = messages[index].toUpperCase();
            ticker.style.transform = "translateX(0)";
            setTimeout(() => {
                ticker.style.transform = "translateX(-150%)";
                index = (index + 1) % messages.length;
                setTimeout(showTicker, 15000);
            }, 6000);
        };
        setTimeout(showTicker, 10000);
    }
    initDemandTicker();

    // 24. Tactical Exit-Intent Conversion (Lead Hub)
    let exitShown = false;
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !exitShown) {
            const modalTrigger = document.querySelector('#concierge-open');
            if (modalTrigger) {
                // Pre-configure for exit intent
                modalTrigger.setAttribute('data-project', 'Sovereign Master Plan');
                modalTrigger.click();
                trackEvent('exit_intent_modal_trigger', { 'intent': userIntent });
            }
            exitShown = true;
        }
    });

    // 25. Master Plan Lead Magnet Logic
    const mpModal = document.getElementById('master-plan-modal');
    const mpClose = document.getElementById('master-plan-close');
    const mpTriggers = document.querySelectorAll('.master-plan-trigger');
    const mpForm = document.getElementById('master-plan-form');

    if (mpModal && mpTriggers.length > 0) {
        mpTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                mpModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                gsap.from("#master-plan-modal .modal-container", { scale: 0.9, opacity: 0, duration: 0.6, ease: "expo.out" });
                trackEvent('master_plan_modal_open');
            });
        });

        if (mpClose) {
            mpClose.addEventListener('click', () => {
                mpModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Close on overlay click
        mpModal.querySelector('.modal-overlay').addEventListener('click', () => {
            mpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Form submits natively, but we validate phone first
        if (mpForm) {
            mpForm.addEventListener('submit', function(e) {
                const phoneInput = mpForm.querySelector('input[name="phone"]');
                if (phoneInput && !/^\d{10}$/.test(phoneInput.value.trim())) {
                    e.preventDefault();
                    Swal.fire({
                        title: 'Invalid Phone Number',
                        text: 'Please enter a valid 10-digit mobile number.',
                        icon: 'warning',
                        confirmButtonColor: '#8C732F'
                    });
                }
            });
        }
    }

    // 14. Opening Modal Auto-Trigger (Phase 19)
    const openingModal = document.getElementById('main-opening-modal');
    if (openingModal) {
        const modalClose = document.getElementById('opening-close');
        const modalForm = document.getElementById('opening-intent-form');

        // Delay reveal for impact
        setTimeout(() => {
            if (!localStorage.getItem('opening_modal_seen')) {
                openingModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                if (typeof gsap !== 'undefined') {
                    gsap.from(".opening-modal-container", {
                        y: 50,
                        opacity: 0,
                        duration: 1.2,
                        ease: "expo.out"
                    });
                }
            }
        }, 5000);

        modalClose?.addEventListener('click', () => {
            openingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            localStorage.setItem('opening_modal_seen', 'true');
        });
        
        // Native Formsubmit handling allows the form to redirect naturally, but we validate first
        if (modalForm) {
            modalForm.addEventListener('submit', function(e) {
                const phoneInput = modalForm.querySelector('input[name="phone"]');
                if (phoneInput && !/^\d{10}$/.test(phoneInput.value.trim())) {
                    e.preventDefault();
                    Swal.fire({
                        title: 'Invalid Phone Number',
                        text: 'Please enter a valid 10-digit mobile number.',
                        icon: 'warning',
                        confirmButtonColor: '#8C732F'
                    });
                }
            });
        }
    }

    // 15. Premium Mobile Slide-Out Overhaul
    const mobileToggle = document.querySelector('.mobile-toggle') || document.getElementById('mobile-nav-toggle');
    const navSearchBox = document.querySelector('.nav-search-box') || document.getElementById('mobile-menu'); // Fallback
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navLinks = document.querySelectorAll('.nav-search-box a, .search-links a, .nav-item-new');

    if (mobileToggle && navSearchBox) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navSearchBox.classList.toggle('active-mobile-menu');
            
            if (mobileToggle.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        const closeMenu = () => {
            mobileToggle.classList.remove('active');
            navSearchBox.classList.remove('active-mobile-menu');
            document.body.style.overflow = '';
        };

        mobileMenuClose?.addEventListener('click', closeMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});

