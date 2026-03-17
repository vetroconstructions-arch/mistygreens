#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/vikasyewle/paranjapeplots';

// Redesigned Elite Modal HTML
const MODAL_HTML = `
    <!-- Elite Redesigned Modal -->
    <div class="concierge-modal" id="heritage-concierge" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="concierge-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);"></div>
        <div class="concierge-panel" style="position: relative; background: var(--pscl-bg); width: 100%; max-width: 1000px; display: grid; grid-template-columns: 1fr 1.2fr; border-radius: 4px; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.5); border: 1px solid rgba(212,175,55,0.2);">
            <button id="concierge-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: #fff; font-size: 2.5rem; cursor: pointer; z-index: 10;">&times;</button>
            <div class="concierge-visual" style="position: relative; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <img src="/images/amenities/cliff-club.jpg" alt="Paranjape Forest Trails Legacy" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
                <div class="visual-overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);"></div>
                <div class="visual-content" style="position: absolute; bottom: 3rem; left: 3rem; right: 3rem;">
                    <span style="color: var(--pscl-gold); font-weight: 800; font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;">The Sovereign Choice</span>
                    <h2 style="color: #fff; font-family: var(--font-heading); font-size: 2.8rem; margin-top: 1rem; line-height: 1.1;">Secure <i>Your</i> Legacy.</h2>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 1.5rem; line-height: 1.6;">Access the private inventory of NA Bungalow Plots and Bespoke Independent Villas in Bhugaon's most elite 190-acre forest township.</p>
                </div>
            </div>
            <div class="concierge-body" style="padding: 4.5rem; background: #0a0a0a;">
                <div class="form-header" style="margin-bottom: 3rem;">
                    <span style="color: var(--pscl-gold); font-weight: 700; font-size: 0.75rem; letter-spacing: 0.2rem; text-transform: uppercase;">Exclusive Advisory</span>
                    <h3 style="font-family: var(--font-heading); font-size: 2.2rem; margin-top: 0.5rem; color: #fff;">Request <i>Callback</i></h3>
                </div>
                <form id="enquiry-form-modal" method="POST" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <style>
                        .concierge-body input::placeholder { color: rgba(255,255,255,0.3) !important; }
                        .concierge-body select:invalid { color: rgba(255,255,255,0.3) !important; }
                        .concierge-body label { color: rgba(255,255,255,0.5); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; }
                    </style>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <input type="text" name="name" aria-label="Full Name" placeholder="FULL NAME" required style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.2); color: #fff; border-radius: 2px; font-size: 0.85rem; outline: none; transition: all 0.3s ease; border-left: 3px solid var(--pscl-gold);">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <input type="tel" name="phone" aria-label="Mobile Number" placeholder="MOBILE NUMBER" required style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.2); color: #fff; border-radius: 2px; font-size: 0.85rem; outline: none; transition: all 0.3s ease;">
                        <input type="email" name="email" aria-label="Email Address" placeholder="EMAIL ADDRESS" style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.2); color: #fff; border-radius: 2px; font-size: 0.85rem; outline: none; transition: all 0.3s ease;">
                    </div>
                    <select name="interest" required style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.2); color: #fff; border-radius: 2px; font-size: 0.85rem; appearance: none; -webkit-appearance: none; outline: none;">
                        <option value="">SELECT PREFERENCE *</option>
                        <option value="plots">NA Bungalow Plots</option>
                        <option value="villas">Independent Villas</option>
                        <option value="apartments">Luxury Apartments</option>
                        <option value="visit">Schedule Site Visit</option>
                    </select>
                    <div style="display: flex; align-items: flex-start; gap: 1rem; margin-top: 0.5rem; background: rgba(212,175,55,0.05); padding: 1.2rem; border: 1px dashed rgba(212,175,55,0.3);">
                        <input type="checkbox" name="whatsapp_optin" id="wa-optin" checked style="margin-top: 0.3rem; accent-color: var(--pscl-gold);">
                        <label for="wa-optin" style="font-size: 0.7rem; line-height: 1.4; color: rgba(255,255,255,0.6); cursor: pointer;">I agree to receive the elite brochure, price list and updates on WhatsApp and Phone.</label>
                    </div>
                    <input type="hidden" name="_subject" value="Elite Callback Request - Forest Trails">
                    <input type="hidden" name="source" value="Elite Redesigned Modal - Subpage">
                    <button type="submit" style="width: 100%; padding: 1.5rem; background: var(--pscl-gold); color: #000; border: none; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 15px 40px rgba(212,175,55,0.2); margin-top: 1rem;">Verify & Secure Callback</button>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; opacity: 0.5;">
                        <span style="font-size: 0.6rem; color: #fff;">🔒 Encrypted Submission</span>
                        <span style="font-size: 0.6rem; color: #fff;">Response within 60 mins</span>
                    </div>
                </form>
            </div>
        </div>
    </div>`;

// Elite Conversion Pill HTML
const PILL_HTML = `
    <!-- Elite Conversion Pill -->
    <div class="conversion-pill open-enquiry-modal" id="callback-pill">
        <div class="pill-icon">📞</div>
        <div class="pill-text">Request Callback</div>
    </div>
    <link rel="stylesheet" href="/conversion-pill.css">`;

// Existing Master Plan Lead Magnet Modal
const MASTER_PLAN_HTML = `
    <!-- Master Plan Lead Magnet Modal -->
    <div class="master-plan-modal" id="master-plan-modal" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="modal-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"></div>
        <div class="modal-container" style="position: relative; background: var(--pscl-bg); width: 100%; max-width: 1000px; display: grid; grid-template-columns: 1.2fr 1fr; border-radius: 4px; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.5); border: 1px solid rgba(212,175,55,0.2);">
            <button id="master-plan-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: var(--pscl-dark); font-size: 2rem; cursor: pointer; z-index: 10;">&times;</button>
            <div class="modal-visual" style="position: relative; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <img src="/images/master-plan.jpg" alt="Paranjape Forest Trails 190-Acre Master Plan" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
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

function getAllHTMLFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['node_modules', 'brain', 'scripts', 'images', 'assets', 'fonts', '.git'].includes(file)) {
                getAllHTMLFiles(filePath, fileList);
            }
        } else if (file === 'index.html' && filePath !== path.join(BASE_DIR, 'index.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const allFiles = getAllHTMLFiles(BASE_DIR);
console.log(`🔍 Found ${allFiles.length} subpages to update.`);

allFiles.forEach(filePath => {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Remove existing Elite components if any (to avoid duplicates)
    html = html.replace(/<!-- Elite Redesigned Modal -->[\s\S]*?<!-- Elite Conversion Pill -->[\s\S]*?<link rel="stylesheet" href="\/conversion-pill.css">/, '');
    // Remove older modal strings from previous iterations
    html = html.replace(/<div class="concierge-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
    html = html.replace(/<div class="master-plan-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
    html = html.replace(/<div class="conversion-pill[\s\S]*?<\/div>/, '');

    // Combined Injection
    const COMBINED_COMPONENTS = `
    ${MODAL_HTML}
    ${MASTER_PLAN_HTML}
    ${PILL_HTML}
    `;

    if (html.includes('</body>')) {
        html = html.replace('</body>', `${COMBINED_COMPONENTS}\n</body>`);
        console.log(`✅ Propagated Elite components to: ${path.relative(BASE_DIR, filePath)}`);
    } else {
        console.warn(`⚠️  No </body> tag found in: ${path.relative(BASE_DIR, filePath)}`);
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
});

console.log('✨ Architecture-wide Elite Conversion Propagation Complete.');
