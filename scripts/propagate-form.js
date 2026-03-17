#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE_DIR = process.cwd();
const VERSION = '1.1'; // Increment this to bust cache site-wide

// Elite Global Navbar HTML (Sync from index.html)
const NAVBAR_HTML = `
    <!-- Architectural Navigation (Propagated Phase 25) -->
    <header class="header-main">
        <div class="heritage-ticker">
            <div class="ticker-content">
                <div class="ticker-item">New Milestone: 2,000+ Resident Families</div>
                <div class="ticker-item">Plots Booking Rapidly: 85% Sold Case in Misty Greens</div>
                <div class="ticker-item">The Cliff Club: Voted Pune's Best Township Amenity</div>
                <div class="ticker-item">Connectivity Update: Ring Road Phase 1 Operational</div>
                <div class="ticker-item">New Milestone: 2,000+ Resident Families</div>
                <div class="ticker-item">Plots Booking Rapidly: 85% Sold Case in Misty Greens</div>
            </div>
        </div>

        <nav class="nav-main">
        <div class="container nav-content">
            <a href="/" class="nav-brand">
                <div class="brand-logo-text">
                    <span class="brand-main">Paranjape</span>
                    <span class="brand-sub">Forest Trails</span>
                </div>
            </a>

            <div class="nav-search-box">
                <div class="search-proxy" role="navigation" aria-label="Main Navigation">
                    <div class="search-links">
                        <a href="/paranjape-schemes-forest-trails-bhugaon/" class="nav-item-new">TOWNSHIP</a>
                        <a href="/na-bungalow-plots-bhugaon/" class="nav-item-new">CLUSTERS</a>
                        <a href="/amenities/the-cliff-club/" class="nav-item-new">LIFESTYLE</a>
                        <a href="/forest-trails-location-proximity/" class="nav-item-new">LOCATION</a>
                        <a href="/property-investment-bhugaon-pune/" class="nav-item-new">INTELLIGENCE</a>
                        <a href="/blogs/na-bungalow-plots-pune-west-guide/" class="nav-item-new">JOURNAL</a>
                    </div>
                </div>
            </div>

            <div class="nav-actions">
                <a href="https://wa.me/917744009295?text=Hi%2C%20I%27m%20interested%20in%20Forest%20Trails%20Bhugaon%20plots.%20Please%20share%20details." target="_blank" rel="noopener" class="whatsapp-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span>WHATSAPP</span>
                </a>
                <button class="nav-item-new open-enquiry-modal tour-btn" id="nav-enquire" data-project="General Township" aria-label="Open global enquiry form">ENQUIRY</button>
            </div>
        </div>
    </nav>
    </header>
`;

// Sleek Light Centered Modal HTML
const MODAL_HTML = `
    <!-- Sleek Light Centered Modal -->
    <div class="concierge-modal" id="heritage-concierge" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="concierge-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"></div>
        
        <div class="concierge-panel" style="position: relative; background: #ffffff; width: 100%; max-width: 480px; border-radius: 12px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.3); border: none; padding: 3rem; animation: modal-entry 0.5s cubic-bezier(0.16, 1, 0.3, 1);">
            <button id="concierge-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: #000; font-size: 2rem; cursor: pointer; z-index: 10; opacity: 0.5; transition: opacity 0.3s;">&times;</button>
            
            <div class="form-header" style="text-align: center; margin-bottom: 2.5rem;">
                <span style="color: var(--pscl-gold); font-weight: 800; font-size: 0.65rem; letter-spacing: 0.2rem; text-transform: uppercase;">Direct Advisory</span>
                <h3 style="font-family: var(--font-heading); font-size: 2.2rem; margin-top: 0.5rem; color: #000; line-height: 1;">Request <i>Callback</i></h3>
                <p style="color: #666; font-size: 0.85rem; margin-top: 1rem;">Get exclusive pricing & priority site-visit schedule.</p>
            </div>

            <form id="enquiry-form-modal" method="POST" action="https://formspree.io/f/xvgznoal" style="display: flex; flex-direction: column; gap: 1.2rem;">
                <style>
                    .concierge-panel input::placeholder { color: #999 !important; }
                    .concierge-panel select:invalid { color: #999 !important; }
                    @keyframes modal-entry {
                        from { opacity: 0; transform: scale(0.9) translateY(20px); }
                        to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                </style>
                <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                    <input type="text" name="name" aria-label="Full Name" placeholder="FULL NAME" required style="width: 100%; padding: 1.2rem; background: #f8f8f8; border: 1px solid #eee; color: #000; border-radius: 6px; font-size: 0.9rem; outline: none; transition: all 0.3s ease; border-left: 4px solid var(--pscl-gold);">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                    <input type="tel" name="phone" aria-label="Mobile Number" placeholder="MOBILE NUMBER" required style="width: 100%; padding: 1.2rem; background: #f8f8f8; border: 1px solid #eee; color: #000; border-radius: 6px; font-size: 0.9rem; outline: none; transition: all 0.3s ease;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                    <input type="email" name="email" aria-label="Email Address" placeholder="EMAIL ADDRESS" style="width: 100%; padding: 1.2rem; background: #f8f8f8; border: 1px solid #eee; color: #000; border-radius: 6px; font-size: 0.9rem; outline: none; transition: all 0.3s ease;">
                </div>
                
                <select name="interest" required style="width: 100%; padding: 1.2rem; background: #f8f8f8; border: 1px solid #eee; color: #000; border-radius: 6px; font-size: 0.9rem; appearance: none; -webkit-appearance: none; outline: none;">
                    <option value="">SELECT INTEREST *</option>
                    <option value="plots">NA Bungalow Plots</option>
                    <option value="villas">Independent Villas</option>
                    <option value="apartments">Luxury Apartments</option>
                    <option value="visit">Schedule Site Visit</option>
                </select>

                <div style="display: flex; align-items: flex-start; gap: 1rem; margin-top: 0.5rem; background: #fffbeb; padding: 1rem; border: 1px solid #fef3c7; border-radius: 6px;">
                    <input type="checkbox" name="whatsapp_optin" id="wa-optin" checked style="margin-top: 0.3rem; accent-color: var(--pscl-gold);">
                    <label for="wa-optin" style="font-size: 0.75rem; line-height: 1.4; color: #444; cursor: pointer;">I agree to receive the brochure, price list and updates on WhatsApp.</label>
                </div>

                <input type="hidden" name="_subject" value="Callback Request - Forest Trails (Global Sync)">
                <input type="hidden" name="source" value="Sleek Light Centered Modal - Global Sync">

                <button type="submit" style="width: 100%; padding: 1.4rem; background: #000; color: #fff; border: none; font-weight: 800; font-size: 0.9rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; border-radius: 6px; margin-top: 0.5rem;">Secure Callback</button>
            </form>
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

// Master Plan Lead Magnet Modal
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
                    <button type="submit" style="background: var(--pscl-maroon); color: #fff; padding: 1.2rem; border: none; border-radius: 4px; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; margin-top: 1rem; box-shadow: 0 10px 30px rgba(128,0,0,0.2);">Download Master Plan</button>
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
        } else if (file === 'index.html' || file === '404.html') {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const allFiles = getAllHTMLFiles(BASE_DIR);
console.log(`🔍 Found ${allFiles.length} HTML files to update.`);

allFiles.forEach(filePath => {
    let html = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(BASE_DIR, filePath);
    
    // 1. Cache-Busting: Append version to style.css and script.js
    html = html.replace(/style\.css(\?v=[^"]*)?/g, `style.css?v=${VERSION}`);
    html = html.replace(/script\.js(\?v=[^"]*)?/g, `script.js?v=${VERSION}`);

    // 2. Global Navbar Sync
    // Find the entire <header> block and replace it
    if (html.includes('<header class="header-main">')) {
        const headerRegex = /<header class="header-main">[\s\S]*?<\/header>/;
        html = html.replace(headerRegex, NAVBAR_HTML.trim());
    } else if (html.includes('<nav class="nav-main">')) {
        // Fallback for subpages with different structure
        const navRegex = /<nav class="nav-main">[\s\S]*?<\/nav>/;
        html = html.replace(navRegex, NAVBAR_HTML.trim());
    }

    // 3. Conversion Components Sync
    // Clean old ones first
    html = html.replace(/<!-- Sleek Light Centered Modal -->[\s\S]*?<!-- Elite Conversion Pill -->[\s\S]*?<link rel="stylesheet" href="\/conversion-pill.css">/, '');
    html = html.replace(/<div class="concierge-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
    html = html.replace(/<div class="master-plan-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
    html = html.replace(/<div class="conversion-pill[\s\S]*?<\/div>/, '');
    html = html.replace(/<link rel="stylesheet" href="\/conversion-pill.css">/g, '');

    const COMBINED_COMPONENTS = `
    ${MODAL_HTML}
    ${MASTER_PLAN_HTML}
    ${PILL_HTML}
    `;

    if (html.includes('</body>')) {
        // Double check for body tag
        html = html.replace('</body>', `${COMBINED_COMPONENTS}\n</body>`);
        console.log(`✅ Fully Synchronized: ${relativePath}`);
    } else {
        console.warn(`⚠️  No </body> tag found in: ${relativePath}`);
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
});

console.log('✨ Global Architecture Sync (Navbar + Components + Cache-Busting) Complete.');
