#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/vikasyewle/paranjapeplots';
const SUB_PAGES = [
    'about-paranjape-schemes',
    'forest-trails-location-proximity',
    'forest-trails-near-bavdhan',
    'forest-trails-near-chandani-chowk',
    'forest-trails-near-kothrud',
    'forest-trails-near-pashan',
    'forest-trails-paud-road',
    'forest-trails-price-list-brochure',
    'forest-trails-vs-bavdhan-projects',
    'forest-trails-vs-kothrud-apartments',
    'kaleidoscope-apartments-bhugaon',
    'luxury-forest-villas-bhugaon',
    'misty-greens-plots-pune',
    'na-bungalow-plots-bhugaon',
    'paranjape-schemes-forest-trails-apartments',
    'paranjape-schemes-forest-trails-bhugaon',
    'paranjape-schemes-forest-trails-bungalows',
    'paranjape-schemes-forest-trails-plots',
    'paranjape-schemes-forest-trails-price',
    'paranjape-schemes-forest-trails-villas',
    'premium-apartments-forest-trails',
    'property-investment-bhugaon-pune',
    'verandah-luxury-flats-bhugaon',
    'whistling-meadows-villas-bhugaon',
    'why-choose-forest-trails-bhugaon'
];

const MODAL_HTML = `
    <style>
        .concierge-panel input::placeholder, .concierge-panel select:invalid { color: rgba(255,255,255,0.5) !important; }
        .concierge-panel input:focus, .concierge-panel select:focus { border-color: #fff !important; box-shadow: 0 0 15px rgba(212,175,55,0.3); }
    </style>
    <div class="concierge-modal" id="heritage-concierge" aria-hidden="true">
        <div class="concierge-overlay"></div>
        <div class="concierge-panel">
            <div class="concierge-header">
                <h3>Enquiry <i>Form</i></h3>
                <button id="concierge-close" aria-label="Close Enquiry Form">&times;</button>
            </div>
            <div class="concierge-body" style="padding: 2rem;">
                <p style="color: var(--pscl-gold); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem;">Elite Investment Portfolio & Unit Details</p>
                <form id="enquiry-form-modal" method="POST" style="display: flex; flex-direction: column; gap: 1.2rem;">
                    <input type="text" name="name" aria-label="Full Name" placeholder="Full Name *" required style="background: #111 !important; border: 2px solid var(--pscl-gold) !important; color: #fff !important; padding: 1rem 1.2rem; font-size: 0.85rem; border-radius: 4px; outline: none; transition: all 0.3s ease;">
                    <input type="email" name="email" aria-label="Email Address" placeholder="Email Address *" required style="background: #111 !important; border: 2px solid var(--pscl-gold) !important; color: #fff !important; padding: 1rem 1.2rem; font-size: 0.85rem; border-radius: 4px; outline: none; transition: all 0.3s ease;">
                    <input type="tel" name="phone" aria-label="Phone Number" placeholder="Phone Number *" required style="background: #111 !important; border: 2px solid var(--pscl-gold) !important; color: #fff !important; padding: 1rem 1.2rem; font-size: 0.85rem; border-radius: 4px; outline: none; transition: all 0.3s ease;">
                    
                    <div style="display: flex; gap: 1rem;">
                        <select name="configuration" aria-label="Select Configuration" required style="flex: 1; background: #111 !important; border: 2px solid var(--pscl-gold) !important; color: #fff !important; padding: 1rem 1.2rem; font-size: 0.85rem; border-radius: 4px; outline: none; transition: all 0.3s ease; -webkit-appearance: none;">
                            <option value="">Requirement *</option>
                            <option value="1BHK">1BHK Prestige Apartment</option>
                            <option value="2BHK">2BHK Elite Apartment</option>
                            <option value="3BHK">3BHK Grande Apartment</option>
                            <option value="4BHK">4BHK Sovereign Apartment</option>
                            <option value="Villa">Independent Forest Villa</option>
                            <option value="Plots">NA Bungalow Plots</option>
                        </select>
                    </div>

                    <div style="display: flex; gap: 1rem;">
                        <select name="interest" aria-label="Select Interest" required style="flex: 1; background: #111 !important; border: 2px solid var(--pscl-gold) !important; color: #fff !important; padding: 1rem 1.2rem; font-size: 0.85rem; border-radius: 4px; outline: none; transition: all 0.3s ease; -webkit-appearance: none;">
                            <option value="">Purpose *</option>
                            <option value="self-use">Personal Residence</option>
                            <option value="investment">High ROI Investment</option>
                            <option value="nri">NRI Wealth Planning</option>
                            <option value="visit">Schedule Priority Site Visit</option>
                        </select>
                    </div>

                    <div style="display: flex; align-items: center; gap: 1rem; background: rgba(212,175,55,0.15); padding: 0.8rem; border: 1px solid var(--pscl-gold); border-radius: 4px;">
                        <input type="checkbox" name="whatsapp_optin" id="wa-optin" checked style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--pscl-gold);">
                        <label for="wa-optin" style="color: #fff; font-size: 0.7rem; cursor: pointer; font-weight: 500;">Send Premium Brochure & Pricing on WhatsApp</label>
                    </div>

                    <button type="submit" style="background: var(--pscl-red); color: #fff; padding: 1.1rem 2rem; border: none; cursor: pointer; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 4px; transition: all 0.3s; box-shadow: 0 10px 20px rgba(179, 48, 42, 0.4);">SECURE EXCLUSIVE ACCESS</button>

                    <div class="form-trust-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                        <div style="font-size: 0.6rem; color: #fff; letter-spacing: 0.1em; display: flex; align-items: center; gap: 0.5rem; opacity: 0.8;">
                             <img src="../images/logo.png" alt="PSCL" style="height: 12px; filter: brightness(5);"> 35+ Year Paranjape Trust
                        </div>
                        <div style="font-size: 0.6rem; color: var(--pscl-gold); font-weight: 700; opacity: 1;">RERA AUTHORIZED</div>
                    </div>
                </form>
            </div>
        </div>
    </div>`;

const MASTER_PLAN_HTML = `
    <!-- Master Plan Lead Magnet Modal -->
    <div class="master-plan-modal" id="master-plan-modal" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="modal-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"></div>
        <div class="modal-container" style="position: relative; background: var(--pscl-bg); width: 100%; max-width: 1000px; display: grid; grid-template-columns: 1.2fr 1fr; border-radius: 4px; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.5); border: 1px solid rgba(212,175,55,0.2);">
            <button id="master-plan-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: var(--pscl-dark); font-size: 2rem; cursor: pointer; z-index: 10;">&times;</button>
            <div class="modal-visual" style="position: relative; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <img src="../images/master-plan.jpg" alt="Paranjape Forest Trails 190-Acre Master Plan" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
                <div class="visual-overlay" style="position: absolute; inset: 0; background: linear-gradient(45deg, rgba(128,0,0,0.4), transparent);"></div>
                <div class="visual-content" style="position: absolute; bottom: 3rem; left: 3rem; right: 3rem;">
                    <span style="background: var(--pscl-gold); color: #000; padding: 0.4rem 0.8rem; font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Exclusive Download</span>
                    <h2 style="color: #fff; font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-top: 1rem; line-height: 1.1;">Secure The <i>Blueprint</i> Of Your Future.</h2>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-top: 1.5rem;">Download the ultra high-resolution 190-acre master plan PDF and explore every cluster, trail, and amenity in detail.</p>
                </div>
            </div>
            <div class="modal-form-side" style="padding: 4rem 3.5rem; background: var(--pscl-white);">
                <div class="form-header" style="margin-bottom: 2.5rem;">
                    <span style="color: var(--pscl-maroon); font-weight: 700; font-size: 0.7rem; letter-spacing: 0.2rem; text-transform: uppercase;">Verification Required</span>
                    <h3 style="font-family: var(--font-heading); font-size: 1.8rem; margin-top: 0.5rem; color: var(--pscl-dark);">Capture High-Res Plan</h3>
                </div>
                <form id="master-plan-form" method="POST" action="https://formspree.io/f/xvgzezpw" style="display: flex; flex-direction: column; gap: 1.2rem;">
                    <input type="text" name="name" placeholder="Full Name *" required style="width: 100%; padding: 1rem 1.2rem; border: 1px solid rgba(0,0,0,0.1); background: var(--pscl-gray); border-radius: 4px; font-size: 0.85rem; outline: none; transition: border-color 0.3s;">
                    <input type="email" name="email" placeholder="Email Address *" required style="width: 100%; padding: 1rem 1.2rem; border: 1px solid rgba(0,0,0,0.1); background: var(--pscl-gray); border-radius: 4px; font-size: 0.85rem; outline: none; transition: border-color 0.3s;">
                    <input type="tel" name="phone" placeholder="Phone Number *" required style="width: 100%; padding: 1rem 1.2rem; border: 1px solid rgba(0,0,0,0.1); background: var(--pscl-gray); border-radius: 4px; font-size: 0.85rem; outline: none; transition: border-color 0.3s;">
                    <div style="display: flex; align-items: flex-start; gap: 0.8rem; margin-top: 0.5rem;">
                        <input type="checkbox" name="whatsapp_optin" id="mp-wa-optin" checked style="margin-top: 0.3rem; accent-color: var(--pscl-maroon);">
                        <label for="mp-wa-optin" style="font-size: 0.75rem; color: var(--pscl-muted); line-height: 1.4; cursor: pointer;">I agree to receive the high-res master plan and township updates on WhatsApp and Email.</label>
                    </div>
                    <input type="hidden" name="_subject" value="Master Plan Download Request - Forest Trails">
                    <input type="hidden" name="lead_type" value="Master Plan Lead Magnet">
                    <button type="submit" style="background: var(--pscl-maroon); color: #fff; padding: 1.2rem; border: none; border-radius: 4px; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; margin-top: 1rem; box-shadow: 0 10px 30px rgba(128,0,0,0.2);">Download Master Plan</button>
                    <p style="text-align: center; font-size: 0.65rem; color: var(--pscl-muted); margin-top: 1rem;">Immediate access to 300DPI 190-acre township layout.</p>
                </form>
            </div>
        </div>
    </div>`;

SUB_PAGES.forEach(folder => {
    const filePath = path.join(BASE_DIR, folder, 'index.html');
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Remove existing modals if any
        html = html.replace(/<div class="concierge-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
        html = html.replace(/<div class="master-plan-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
        
        // Safety: Disable speculationrules in subpages
        html = html.replace(/<script type="speculationrules">[\s\S]*?<\/script>/g, '<!-- SpeculationRules disabled by propagation -->');

        // Combined Injection
        const COMBINED_MODALS = MODAL_HTML + '\n' + MASTER_PLAN_HTML;

        if (html.includes('</body>')) {
            html = html.replace('</body>', COMBINED_MODALS + '\n</body>');
        }
        
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ Injected Both Modals into: ${folder}`);
    }
});
