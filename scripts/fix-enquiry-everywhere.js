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
        <div class="concierge-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);"></div>
        <div class="concierge-panel" style="position: relative; background: #ffffff; width: 100%; max-width: 520px; border-radius: 20px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.4); border: none; padding: 0; animation: enquiry-modal-entry 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="height: 6px; background: linear-gradient(90deg, var(--pscl-maroon), var(--pscl-gold), var(--pscl-maroon)); background-size: 200% 100%; animation: enquiry-gradient-shift 4s ease infinite;"></div>
            <div style="padding: 4rem 3.5rem 3.5rem; max-height: 90vh; overflow-y: auto;">
                <button id="concierge-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: #f5f5f0; border: none; color: #000; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; transition: all 0.3s; opacity: 0.6;">&times;</button>
                <div class="form-header" style="text-align: center; margin-bottom: 2.5rem;">
                    <div style="display: inline-block; background: rgba(140,115,47,0.08); border: 1px solid rgba(140,115,47,0.2); padding: 0.5rem 1.5rem; border-radius: 50px; margin-bottom: 1.5rem;">
                        <span style="color: var(--pscl-gold); font-weight: 800; font-size: 0.65rem; letter-spacing: 0.3rem; text-transform: uppercase;">✦ Direct Advisory</span>
                    </div>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 2.6rem; margin-top: 0.5rem; color: #1a1a1a; line-height: 1.1;">Request <i style="color: var(--pscl-gold);">Callback</i></h3>
                    <p style="color: #666; font-size: 0.9rem; margin-top: 1rem; letter-spacing: 0.02em;">Secure exclusive pricing & priority site-visit guidance.</p>
                </div>
                <form id="enquiry-form-modal" method="POST" action="https://formsubmit.co/propsmartrealty@gmail.com" style="display: flex; flex-direction: column; gap: 1.2rem;">
                    <input type="hidden" name="_next" value="https://paranjapetownship.com/thank-you.html">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_subject" value="New Website Enquiry - Paranjape Forest Trails">
                    <style>
                        .concierge-panel input::placeholder { color: #999 !important; font-size: 0.8rem; letter-spacing: 0.05em; }
                        .concierge-panel select { color: #1a1a1a; font-size: 0.85rem; }
                        .concierge-panel select:invalid { color: #999; }
                        @keyframes enquiry-modal-entry { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                        .enquiry-input-premium { width: 100%; padding: 1.2rem 1.5rem; background: #f5f5f0; border: 2px solid #b0a890; color: #1a1a1a; border-radius: 12px; font-size: 0.9rem; outline: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                        .enquiry-input-premium:focus { border-color: var(--pscl-gold); background: #fff; box-shadow: 0 0 0 4px rgba(140,115,47,0.15); }
                    </style>
                    <input type="text" name="name" placeholder="FULL NAME *" required class="enquiry-input-premium" style="border-left: 4px solid var(--pscl-gold);">
                    <input type="tel" name="phone" id="concierge-phone" placeholder="MOBILE NUMBER *" required class="enquiry-input-premium">
                    <input type="email" name="email" placeholder="EMAIL ADDRESS" class="enquiry-input-premium">
                    <div style="position: relative;">
                        <select name="interest" required class="enquiry-input-premium" style="appearance: none; -webkit-appearance: none;">
                            <option value="">SELECT INTEREST *</option>
                            <option value="plots">NA Bungalow Plots</option>
                            <option value="villas">Independent Villas</option>
                            <option value="apartments">Luxury Apartments</option>
                            <option value="visit">Schedule Site Visit</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 1rem; margin-top: 0.5rem; background: #fffcf0; padding: 1.2rem; border: 1px solid #f9f1d0; border-radius: 12px;">
                        <input type="checkbox" name="whatsapp_optin" id="wa-optin" checked style="margin-top: 0.3rem; width: 18px; height: 18px; accent-color: var(--pscl-maroon);">
                        <label for="wa-optin" style="font-size: 0.75rem; line-height: 1.5; color: #555; cursor: pointer; font-weight: 500;">I agree to receive the brochure, price list and updates on WhatsApp.</label>
                    </div>
                    <button type="submit" style="width: 100%; padding: 1.5rem; background: linear-gradient(135deg, var(--pscl-maroon), #8B1A1A); color: #fff; border: none; border-radius: 12px; font-weight: 800; font-size: 0.95rem; letter-spacing: 0.2rem; text-transform: uppercase; cursor: pointer; transition: all 0.4s; margin-top: 0.5rem; box-shadow: 0 15px 35px rgba(107,13,13,0.35);">⬥ SECURE ADVISORY ⬥</button>
                    <input type="hidden" name="source" value="Global Enquiry Modal">
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

    // 4. Check if modal exists at all (has action form inside)
    if (content.includes('heritage-concierge') && !content.includes('enquiry-form-modal') && !content.includes('formsubmit.co')) {
        // It has the modal div but no form inside - replace entirely
        const emptyModalRegex = /<div class="concierge-modal" id="heritage-concierge"[^>]*>[\s\S]*?<\/div>\s*(?=<div class="conversion-pill|<script|<\/body)/;
        if (emptyModalRegex.test(content)) {
            content = content.replace(emptyModalRegex, FULL_MODAL + '\n');
            changed = true;
            console.log(`  📝 Injected full enquiry form into ${rel}`);
        }
    }

    // 5. Fix missing floating enquiry trigger
    if (!content.includes('concierge-trigger') && !content.includes('concierge-open')) {
        // Insert before the modal
        if (content.includes('heritage-concierge')) {
            content = content.replace('<div class="concierge-modal"', ENQUIRY_TRIGGER + '\n    <div class="concierge-modal"');
            changed = true;
            console.log(`  🔘 Added floating enquiry trigger to ${rel}`);
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed: ${rel}`);
    }
}

console.log(`\n🎯 Fixed ${fixedCount} files. Total scanned: ${files.length}`);
