#!/usr/bin/env node
/**
 * Universal Enquiry Fix Script
 * Ensures every HTML page has:
 * 1. GSAP + ScrollTrigger CDN
 * 2. SweetAlert2 CDN
 * 3. Complete enquiry modal HTML (not empty placeholder)
 * 4. Floating enquiry trigger
 */
const fs = require('fs');
const path = require('path');

const BASE = '/Users/vikasyewle/paranjapeplots';

// Find all HTML files recursively, excluding node_modules
function findHtmlFiles(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !['node_modules', '.git', '.gemini', 'scripts'].includes(entry.name)) {
            results = results.concat(findHtmlFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'thank-you.html') {
            results.push(fullPath);
        }
    }
    return results;
}

const GSAP_BLOCK = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>`;
const SWAL_BLOCK = `
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>`;

const ENQUIRY_TRIGGER = `
    <div class="concierge-trigger" id="concierge-open" role="button" aria-label="Open Enquiry Form">
        <div class="concierge-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <span class="concierge-label">ENQUIRE</span>
    </div>`;

const FULL_MODAL = `
    <div class="concierge-modal" id="heritage-concierge" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="concierge-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);"></div>
        <div class="concierge-panel" style="position: relative; background: #ffffff; width: 100%; max-width: 520px; border-radius: 20px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.5); border: 1px solid rgba(0,0,0,0.1); padding: 0;">
            <div style="height: 6px; background: linear-gradient(90deg, var(--pscl-maroon), var(--pscl-gold), var(--pscl-maroon));"></div>
            <div style="padding: 4rem 3.5rem 3.5rem; max-height: 90vh; overflow-y: auto;">
                <button id="concierge-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: #eee; border: none; color: #000; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center;">&times;</button>
                <div class="form-header" style="text-align: center; margin-bottom: 2.5rem;">
                    <span style="color: var(--pscl-gold); font-weight: 900; font-size: 0.65rem; letter-spacing: 0.3rem; text-transform: uppercase;">✦ Direct Advisory</span>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; margin-top: 0.5rem; color: #000; line-height: 1.1;">Request <i style="color: var(--pscl-gold);">Callback</i></h3>
                    <p style="color: #444; font-size: 0.95rem; margin-top: 1rem;">Get exclusive <strong>Paranjape Forest Trails Price</strong> & Brochure.</p>
                </div>
                <form id="enquiry-form-modal" method="POST" action="https://formsubmit.co/propsmartrealty@gmail.com">
                    <input type="hidden" name="_next" value="https://www.paranjapetownship.com/thank-you.html">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_subject" value="New Website Enquiry - Paranjape Forest Trails">
                    <input type="hidden" name="project_context" value="Forest Trails Legacy">
                    
                    <!-- Step 1: Configuration Preference (SEO Hardened) -->
                    <div class="advisory-step active" data-step="1">
                        <h4 style="font-family: 'Playfair Display', serif; color: #000; font-size: 1.35rem; font-weight: 700; margin-bottom: 20px;">Architecture Preference?</h4>
                        <div style="display: grid; gap: 12px; margin-bottom: 30px;">
                            <label class="advisory-opt" style="display: flex; align-items: center; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                                <input type="radio" name="interest" value="plots" style="margin-right: 15px; accent-color: var(--pscl-maroon);" required checked>
                                <span style="font-weight: 800; color: #1a1a1a; font-size: 0.95rem;">NA Bungalow Plots Bhugaon Pune</span>
                            </label>
                            <label class="advisory-opt" style="display: flex; align-items: center; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                                <input type="radio" name="interest" value="villas" style="margin-right: 15px; accent-color: var(--pscl-maroon);">
                                <span style="font-weight: 800; color: #1a1a1a; font-size: 0.95rem;">Luxury 190 Acre Township Villas</span>
                            </label>
                            <label class="advisory-opt" style="display: flex; align-items: center; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                                <input type="radio" name="interest" value="apartments" style="margin-right: 15px; accent-color: var(--pscl-maroon);">
                                <span style="font-weight: 800; color: #1a1a1a; font-size: 0.95rem;">Forest Trails Premium Apartments</span>
                            </label>
                        </div>
                        <button type="button" class="btn-next-advisory" style="width: 100%; padding: 1.2rem; background: #1a1a1a; color: #fff; border: none; border-radius: 10px; font-weight: 800; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase;">Continue Advisory ✦</button>
                    </div>

                    <!-- Step 2: Location Alignment (High Volume Proximity Clusters) -->
                    <div class="advisory-step" data-step="2" style="display: none;">
                        <div style="margin-bottom: 25px;">
                            <span style="font-size: 0.73rem; font-weight: 900; color: #c5a059; letter-spacing: 0.2em; display: block; margin-bottom: 15px;">QUALIFIER 02/03</span>
                            <h4 style="font-family: 'Playfair Display', serif; color: #000; font-size: 1.35rem; font-weight: 700;">Resident Choice Proximity?</h4>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 30px;">
                            <label class="advisory-opt" style="padding: 1rem; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center;">
                                <input type="radio" name="location_context" value="Kothrud" style="display: none;">
                                <span style="font-size: 0.8rem; font-weight: 700;">Near Kothrud</span>
                            </label>
                            <label class="advisory-opt" style="padding: 1rem; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center;">
                                <input type="radio" name="location_context" value="Bavdhan" style="display: none;">
                                <span style="font-size: 0.8rem; font-weight: 700;">Near Bavdhan</span>
                            </label>
                            <label class="advisory-opt" style="padding: 1rem; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center;">
                                <input type="radio" name="location_context" value="Baner/Aundh" style="display: none;">
                                <span style="font-size: 0.8rem; font-weight: 700;">Baner / Aundh</span>
                            </label>
                            <label class="advisory-opt" style="padding: 1rem; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center;">
                                <input type="radio" name="location_context" value="Nal Stop" style="display: none;">
                                <span style="font-size: 0.8rem; font-weight: 700;">Nal Stop / Karve Nagar</span>
                            </label>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button type="button" class="btn-prev-advisory" style="flex: 1; padding: 1.2rem; background: #eee; color: #1a1a1a; border: none; border-radius: 10px; font-weight: 800; cursor: pointer;">Back</button>
                            <button type="button" class="btn-next-advisory" style="flex: 2; padding: 1.2rem; background: #1a1a1a; color: #fff; border: none; border-radius: 10px; font-weight: 800; cursor: pointer; text-transform: uppercase;">Next Step ✦</button>
                        </div>
                    </div>

                    <!-- Step 3: Contact Protocol -->
                    <div class="advisory-step" data-step="3" style="display: none;">
                        <div style="margin-bottom: 25px;">
                            <span style="font-size: 0.73rem; font-weight: 900; color: #c5a059; letter-spacing: 0.2em; display: block; margin-bottom: 15px;">FINAL STEP 03/03</span>
                            <h4 style="font-family: 'Playfair Display', serif; color: #000; font-size: 1.35rem; font-weight: 700;">Advisory Contact Protocol</h4>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
                            <input type="text" name="name" placeholder="Full Name *" required style="padding: 1.2rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem; width: 100%;">
                            <input type="tel" name="phone" placeholder="Mobile Number *" required style="padding: 1.2rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem; width: 100%;">
                            <input type="email" name="email" placeholder="Professional Email (Optional)" style="padding: 1.2rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem; width: 100%;">
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button type="button" class="btn-prev-advisory" style="flex: 1; padding: 1.2rem; background: #eee; color: #1a1a1a; border: none; border-radius: 10px; font-weight: 800; cursor: pointer;">Back</button>
                            <button type="submit" style="flex: 2; padding: 1.2rem; background: var(--pscl-maroon); color: #fff; border: none; border-radius: 10px; font-weight: 800; cursor: pointer; text-transform: uppercase; letter-spacing: 0.1em;">Schedule Advisory ✦</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>`;

const files = findHtmlFiles(BASE);
let fixedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    const rel = path.relative(BASE, file);

    // Skip if it doesn't have a </body> tag (not a real page)
    if (!content.includes('</body>')) continue;
    
    // Skip if it doesn't have script.js (not a real page using our system)
    if (!content.includes('script.js')) continue;

    // 1. Fix missing GSAP
    if (!content.includes('gsap.min.js')) {
        // Insert GSAP before script.js
        content = content.replace(/<script src="[^"]*script\.js[^"]*"[^>]*><\/script>/, GSAP_BLOCK + SWAL_BLOCK + '\n$&');
        changed = true;
        console.log(`  📦 Added GSAP + SweetAlert2 to ${rel}`);
    }

    // 2. Fix missing SweetAlert2
    if (!content.includes('sweetalert2') && !content.includes('cdn.jsdelivr.net/npm/sweetalert2')) {
        content = content.replace(/<script src="[^"]*script\.js[^"]*"[^>]*><\/script>/, SWAL_BLOCK + '\n$&');
        changed = true;
        console.log(`  📦 Added SweetAlert2 to ${rel}`);
    }

    // 3. Fix empty/missing enquiry modal (has heritage-concierge but it's empty)
    const emptyModal = '<div class="concierge-modal" id="heritage-concierge" style="display:none;"></div>';
    if (content.includes(emptyModal)) {
        content = content.replace(emptyModal, FULL_MODAL);
        changed = true;
        console.log(`  📝 Replaced empty modal with full form in ${rel}`);
    }

    // 4. Check if modal exists at all
    if (!content.includes('heritage-concierge')) {
        // Modal is completely missing - inject before </body>
        content = content.replace('</body>', FULL_MODAL + '\n' + ENQUIRY_TRIGGER + '\n</body>');
        changed = true;
        console.log(`  🏗️  Injected FULL 3-STEP MODAL into ${rel}`);
    } else if (!content.includes('advisory-step')) {
        // Modal exists but is likely the old 1-step version - replace it
        // Search for the concierge-modal div and replace it
        const oldModalRegex = /<div class="concierge-modal" id="heritage-concierge"[^>]*>[\s\S]*?<\/div>/;
        if (oldModalRegex.test(content)) {
            content = content.replace(oldModalRegex, FULL_MODAL);
            changed = true;
            console.log(`  🔄 Upgraded to 3-STEP MODAL in ${rel}`);
        }
    }

    // 5. Ensure floating trigger exists
    if (!content.includes('concierge-open')) {
        if (!content.includes(ENQUIRY_TRIGGER.trim())) {
             content = content.replace('</body>', ENQUIRY_TRIGGER + '\n</body>');
             changed = true;
             console.log(`  🔘 Added missing floating trigger to ${rel}`);
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed: ${rel}`);
    }
}

console.log(`\n🎯 Fixed ${fixedCount} files. Total scanned: ${files.length}`);
