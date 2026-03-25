const fs = require('fs');
const path = require('path');

const VERSION = "1.12.1";
const BASE_DIR = path.join(__dirname, '..');

const PROXIMITY_DATA = {
    'Misty Greens Plots': { school: '8 mins', club: '4 mins', equestrian: '6 mins', entry: '10 mins' },
    'The Cove Villas': { school: '5 mins', club: '2 mins', equestrian: '3 mins', entry: '12 mins' },
    'The Highlands Apartments': { school: '5 mins', club: '2 mins', equestrian: '3 mins', entry: '12 mins' },
    'The Canopy Apartments': { school: '3 mins', club: '1 min', equestrian: '2 mins', entry: '15 mins' },
    'High Gardens': { school: '4 mins', club: '2 mins', equestrian: '3 mins', entry: '14 mins' },
    'Codename Alpha': { school: '4 mins', club: '2 mins', equestrian: '3 mins', entry: '14 mins' },
    'Forest Trails Legacy': { school: '5 mins', club: '3 mins', equestrian: '4 mins', entry: '12 mins' }
};

function getProximityHtml(projectName) {
    const data = PROXIMITY_DATA[projectName] || PROXIMITY_DATA['Forest Trails Legacy'];
    return `
    <!-- Sovereign Proximity Ledger (Sync v1.12.1) -->
    <div class="proximity-mesh" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 50px; padding: 40px; background: rgba(0,0,0,0.03); border-radius: 15px; border: 1px solid rgba(0,0,0,0.05);">
        <div class="prox-item">
            <span style="color: var(--pscl-gold); font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; display: block; margin-bottom: 8px; text-transform: uppercase;">SSRVM School</span>
            <div style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #000; font-weight: 700;">${data.school}</div>
        </div>
        <div class="prox-item">
            <span style="color: var(--pscl-gold); font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; display: block; margin-bottom: 8px; text-transform: uppercase;">The Cliff Club</span>
            <div style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #000; font-weight: 700;">${data.club}</div>
        </div>
        <div class="prox-item">
            <span style="color: var(--pscl-gold); font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; display: block; margin-bottom: 8px; text-transform: uppercase;">Equestrian Academy</span>
            <div style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #000; font-weight: 700;">${data.equestrian}</div>
        </div>
        <div class="prox-item">
            <span style="color: var(--pscl-gold); font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; display: block; margin-bottom: 8px; text-transform: uppercase;">Bhugaon Entry</span>
            <div style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #000; font-weight: 700;">${data.entry}</div>
        </div>
    </div>
    <!-- /Sovereign Proximity Ledger -->`;
}

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && !file.startsWith('.')) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function getProjectContext(dir) {
    if (dir.includes('misty-greens')) return 'Misty Greens Plots';
    if (dir.includes('the-cove')) return 'The Cove Villas';
    if (dir.includes('the-highlands')) return 'The Highlands Apartments';
    if (dir.includes('canopy-apartments')) return 'The Canopy Apartments';
    if (dir.includes('codename-alpha')) return 'Codename Alpha';
    if (dir.includes('highgardens')) return 'High Gardens';
    return 'Forest Trails Legacy';
}

function cleanHead(html) {
    // Safe cleaning - only target Sovereign comments
    const headCleaningPattern = /<!-- Sovereign Intelligence Layer \(Sync v1\..*?\) -->[\s\S]*?<!-- \/Sovereign Intelligence Layer -->/gi;
    html = html.replace(headCleaningPattern, '');
    
    // Aggressive cleanup for legacy manual injections
    html = html.replace(/<script type="speculationrules">[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<link rel="stylesheet" href="\/trust-mesh\.css">/gi, '');
    html = html.replace(/<link rel="preload" as="image" href="\/images\/drone-aerial\.webp"[^>]*>/gi, '');

    const headInjections = `
    <!-- Sovereign Intelligence Layer (Sync v1.12.1) -->
    <link rel="stylesheet" href="/trust-mesh.css">
    <link rel="preload" as="image" href="/images/drone-aerial.webp" fetchpriority="high">
    <script type="speculationrules">
    {
      "prerender": [
        {
          "source": "list",
          "urls": ["/na-bungalow-plots-bhugaon/", "/premium-apartments-forest-trails/", "/luxury-forest-villas-bhugaon/", "/misty-greens-plots-pune/"],
          "eagerness": "moderate"
        }
      ]
    }
    </script>
    <!-- /Sovereign Intelligence Layer -->`;
    
    html = html.replace('</head>', `${headInjections}\n</head>`);
    return html;
}

function propagate() {
    console.log(`🚀 Starting Global Sync v${VERSION} (Safe Recovery Pass)...`);
    
    const masterPath = path.join(BASE_DIR, 'index.html');
    let masterHtml = fs.readFileSync(masterPath, 'utf8');

    const headerMatch = masterHtml.match(/<header[^>]*?class="header-main"[^>]*?>[\s\S]*?<\/header>/i);
    const footerMatch = masterHtml.match(/<footer[^>]*?class="footer-main"[^>]*?>[\s\S]*?<\/footer>/i);
    
    if (!headerMatch || !footerMatch) {
         console.error("❌ Critical components missing in index.html");
         return;
    }

    const allFiles = getAllHtmlFiles(BASE_DIR);

    allFiles.forEach(filePath => {
        let html = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(BASE_DIR, filePath);
        const dirName = path.dirname(relativePath);

        html = cleanHead(html);

        if (filePath !== masterPath) {
            if (html.includes('<header')) {
                html = html.replace(/<header[^>]*?class="header-main"[^>]*?>[\s\S]*?<\/header>/i, headerMatch[0]);
            }
            if (html.includes('<footer')) {
                html = html.replace(/<footer[^>]*?class="footer-main"[^>]*?>[\s\S]*?<\/footer>/i, footerMatch[0]);
            }
        }

        const projectName = getProjectContext(dirName);
        const proximityHtml = getProximityHtml(projectName);

        // Safe Proximity Injection
        if (html.includes('Connectivity</i>')) {
            // Cleanup existing
            html = html.replace(/<!-- Sovereign Proximity Ledger[\s\S]*?<!-- \/Sovereign Proximity Ledger -->/gi, '');
            // Inject after H2
            html = html.replace(/(<h2[^>]*?>Sovereign <i[^>]*?>Connectivity<\/i><\/h2>\s*<\/div>)/gi, `$1\n${proximityHtml}`);
        }

        const TRUST_MESH_HTML = `
    <!-- Sovereign Trust Mesh (Sync v1.12.1) -->
    <div class="trust-mesh-ticker" id="trust-mesh-ticker">
        <div class="trust-icon">✦</div>
        <div class="trust-content">
            <span class="trust-label">Direct Advisory</span>
            <span class="trust-data">Analyzing demand...</span>
        </div>
    </div>
    <!-- /Sovereign Trust Mesh -->`;

        const CONCIERGE_MODAL = `
    <!-- Sovereign Concierge Modal (Sync v1.12.1) -->
    <div class="concierge-modal" id="heritage-concierge" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="concierge-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);"></div>
        <div class="concierge-panel" style="position: relative; background: #ffffff; width: 100%; max-width: 520px; border-radius: 20px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.5); border: 1px solid rgba(0,0,0,0.1); padding: 0;">
            <div style="height: 6px; background: linear-gradient(90deg, var(--pscl-maroon), var(--pscl-gold), var(--pscl-maroon));"></div>
            <div style="padding: 4rem 3.5rem 3.5rem; max-height: 90vh; overflow-y: auto;">
                <button id="concierge-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: #eee; border: none; color: #000; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center;">&times;</button>
                <div class="form-header" style="text-align: center; margin-bottom: 2.5rem;">
                    <span style="color: var(--pscl-gold); font-weight: 900; font-size: 0.65rem; letter-spacing: 0.3rem; text-transform: uppercase;">✦ Direct Advisory</span>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; margin-top: 0.5rem; color: #000; line-height: 1.1;">Request <i style="color: var(--pscl-gold);">Callback</i></h3>
                    <p style="color: #444; font-size: 0.95rem; margin-top: 1rem;">Secure exclusive pricing for <strong>${projectName}</strong>.</p>
                </div>
                <form id="enquiry-form-modal" method="POST" action="https://formsubmit.co/propsmartrealty@gmail.com">
                    <input type="hidden" name="project_context" value="${projectName}">
                    <div class="advisory-step active" data-step="1">
                        <h4 style="font-family: var(--font-heading); color: #000; font-size: 1.35rem; font-weight: 700; margin-bottom: 20px;">What is your interest?</h4>
                        <div style="display: grid; gap: 12px; margin-bottom: 30px;">
                            <label class="advisory-opt" style="display: flex; align-items: center; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; cursor: pointer;"><input type="radio" name="interest" value="pricing" style="margin-right: 15px;" required checked> Pricing & Inventory</label>
                            <label class="advisory-opt" style="display: flex; align-items: center; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; cursor: pointer;"><input type="radio" name="interest" value="visit" style="margin-right: 15px;"> Schedule Site Visit</label>
                        </div>
                        <button type="button" class="btn-next-step" style="width: 100%; padding: 1.2rem; background: var(--pscl-maroon); color: #fff; font-weight: 900; border: none; border-radius: 12px; cursor: pointer; text-transform: uppercase;">Continue</button>
                    </div>
                    <div class="advisory-step" data-step="2" style="display: none;">
                        <input type="text" name="name" placeholder="Full Name" required style="width: 100%; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; margin-bottom: 1rem;">
                        <input type="tel" name="phone" placeholder="Mobile Number" required style="width: 100%; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; margin-bottom: 1rem;">
                        <div style="display: flex; gap: 12px; margin-top: 20px;">
                            <button type="button" class="btn-prev-step" style="flex: 1; padding: 1.2rem; border: 1px solid #bbb; border-radius: 12px; background: #eee; cursor: pointer;">BACK</button>
                            <button type="submit" style="flex: 2; padding: 1.2rem; background: var(--pscl-maroon); color: #fff; border: none; border-radius: 12px; font-weight: 900; cursor: pointer;">FINALIZE ADVISORY</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Sovereign Concierge Modal -->`;

        const CONVERSION_PILL = `
    <!-- Sovereign Conversion Pill (Sync v1.12.1) -->
    <div class="conversion-pill open-enquiry-modal" id="callback-pill" data-project="${projectName}"><div class="pill-icon">📞</div><div class="pill-text">Request Callback</div></div>
    <!-- /Sovereign Conversion Pill -->`;

        const SEARCH_V2_SCRIPT = `
    <!-- Sovereign Search Layer (Sync v1.12.1) -->
    <script src="/scripts/search-manager.js"></script>
    <!-- /Sovereign Search Layer -->`;

        // Safe Body Cleanup
        [
            /<!-- Sovereign Trust Mesh[\s\S]*?<!-- \/Sovereign Trust Mesh -->/gi,
            /<!-- Sovereign Concierge Modal[\s\S]*?<!-- \/Sovereign Concierge Modal -->/gi,
            /<!-- Sovereign Conversion Pill[\s\S]*?<!-- \/Sovereign Conversion Pill -->/gi,
            /<!-- Sovereign Search Layer[\s\S]*?<!-- \/Sovereign Search Layer -->/gi,
            /<!-- Sovereign Trust Mesh[\s\S]*?<\/div>/gi, // Legacy cleanup
            /<!-- Premium Enquiry Modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, // Legacy cleanup (DANGEROUS but limited to comments)
            /<!-- Elite Conversion Pill[\s\S]*?<\/div>/gi, // Legacy cleanup
            /<div class="conversion-pill[\s\S]*?<\/div>/gi // Ad-hoc cleanup
        ].forEach(r => html = html.replace(r, ''));

        if (html.includes('</body>')) {
            html = html.replace('</body>', `${TRUST_MESH_HTML}\n${CONCIERGE_MODAL}\n${CONVERSION_PILL}\n${SEARCH_V2_SCRIPT}\n</body>`);
        }

        fs.writeFileSync(filePath, html, 'utf8');
    });

    console.log(`✨ Status: Global Sync Complete (v${VERSION}). Processed ${allFiles.length} files.`);
}

propagate();
