const fs = require('fs');
const path = require('path');
const { getFaqSchema } = require('./generate-faq-schema');

const VERSION = "3.2.1";
const BASE_DOMAIN = "https://www.paranjapetownship.com";

function getClusterType(filePath) {
    const f = filePath.toLowerCase();
    if (f.includes('plot')) return 'plots';
    if (f.includes('villa') || f.includes('bungalow')) return 'villas';
    if (f.includes('apartment') || f.includes('highgardens') || f.includes('canopy')) return 'apartments';
    return 'connectivity';
}

function getLocalizedH1(clusterType, originalH1) {
    if (clusterType === 'plots') return "Premium NA Bungalow Plots Bhugaon | Paranjape Forest Trails Legacy";
    if (clusterType === 'villas') return "Luxury Forest Villas & Bungalows Pune | Sovereign Forest Trails";
    if (clusterType === 'apartments') return "Premium 2 & 3 BHK Apartments Bhugaon | Forest Trails Integrated Township";
    return originalH1;
}

const ROOT = process.cwd();
const SKIP_DIRS = [
    '.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', 
    '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.wrangler'
];

/**
 * Sovereign Mastery Engine (V3 - Structural Refinement)
 * Purpose: Ensures site-wide meta-data harmony after directory migration.
 */
function processFiles() {
    let files = [];

    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (SKIP_DIRS.includes(file)) return;
                walk(fullPath);
            } else if (file.endsWith('.html')) {
                files.push(fullPath);
            }
        });
    }

    walk(ROOT);
    console.log(`📡 Sovereign Mastery Engine: Harmonizing ${files.length} nodes...`);

    files.forEach(filePath => {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            const original = content;
            const relativePath = path.relative(ROOT, filePath);
            const folderName = path.dirname(relativePath);
            
            // 1. DYNAMIC CANONICAL HARDENING
            // Ensure canonical URL reflects the clean slug directory structure
            const canonicalUrl = folderName === '.' 
                ? 'https://www.paranjapetownship.com/' 
                : `https://www.paranjapetownship.com/${folderName}/`;
            
            content = content.replace(/<link rel="canonical" href="[^"]*">/g, `<link rel="canonical" href="${canonicalUrl}">`);
            if (!content.includes('<link rel="canonical"')) {
                content = content.replace('</title>', `</title>\n    <link rel="canonical" href="${canonicalUrl}">`);
            }

            // 2. META DATA HARMONY
            // Standardize Site Name and Branding
            content = content.replace(/<meta property="og:site_name" content="[^"]*">/g, '<meta property="og:site_name" content="Paranjape Forest Trails Bhugaon">');
            if (!content.includes('og:site_name')) {
                content = content.replace('</head>', '    <meta property="og:site_name" content="Paranjape Forest Trails Bhugaon">\n</head>');
            }

            // 3. LEGACY LINK PURGE (Synchronized Redirection)
            // Fix references to old .html files that were migrated to directories
            content = content.replace(/href="\/amenities-equestrian.html"/g, 'href="/paranjape-forest-trails-township-bhugaon-amenities/equestrian-academy-pune/"');
            content = content.replace(/href="\/amenities-the-cliff-club.html"/g, 'href="/paranjape-forest-trails-township-bhugaon-the-cliff-lifestyle-hub-bhugaon/"');
            content = content.replace(/href="\/amenities-sri-sri-school.html"/g, 'href="/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/"');
            content = content.replace(/href="\/paranjape-forest-trails-township-bhugaon-apartments-pune.html"/g, 'href="/paranjape-forest-trails-township-bhugaon-apartments/"');

            // 4. SCHEMA & OG HARMONIZATION (Universal Identity)
            // Ensure all authors are "Paranjape Schemes" or "Heritage Advisor"
            content = content.replace(/"author":\s*\{\s*"@type":\s*"Person"\s*\}/g, '"author": { "@type": "Person", "name": "Paranjape Forest Trails Advisor" }');

            // 5. GLOBAL DOMAIN STANDARDIZATION (Resolve WWW)
            // Absolute replacement to ensure GSC compliance
            content = content.split('https://paranjapetownship.com').join('https://www.paranjapetownship.com');

            // 6. MASTER PLAN MODAL INTEGRATION
            // Ensure the newly restored modal is accessible on all nodes
            if (!content.includes('components/master-plan-modal.html')) {
                const modalInclusion = '<!-- Master Plan Modal Injection -->\n    <div id="master-plan-container"></div>\n    <script>\n        fetch(\'/components/master-plan-modal.html\')\n            .then(response => response.text())\n            .then(data => {\n                document.getElementById(\'master-plan-container\').innerHTML = data;\n                // Re-trigger the script inside the modal\n                const scripts = document.getElementById(\'master-plan-container\').querySelectorAll(\'script\');\n                scripts.forEach(oldScript => {\n                    const newScript = document.createElement(\'script\');\n                    newScript.textContent = oldScript.textContent;\n                    document.body.appendChild(newScript);\n                });\n            });\n    </script>';
                content = content.replace('</body>', `${modalInclusion}\n</body>`);
            }

            // 7. DOM CLEANUP (Remove Legacy Mobile Menus)
            // Resolving the "Double Menu" anomaly to improve PageSpeed
            const legacyMenuRegex = /(?:[ \t]*<!--[ \t]*Mobile Off-Canvas Navigation \(Phase 1: Overhaul\)[ \t]*-->\r?\n)?[ \t]*<div class="mobile-menu" id="mobile-menu">[\s\S]*?<div class="mobile-menu-actions">[\s\S]*?<\/div>\r?\n?[ \t]*<\/div>\r?\n/g;
            content = content.replace(legacyMenuRegex, '');

            // 8. WEB VITALS HARDENING (Image Optimization)
            // Ensure 100% alt-tag and lazy-loading compliance across the mesh
            content = content.replace(/<img (?![^>]*alt=)([^>]+)>/g, '<img alt="Paranjape Forest Trails Township Bhugaon Pune" $1>');
            content = content.replace(/<img (?![^>]*loading=)([^>]+)>/g, '<img loading="lazy" $1>');

            // 9. TOTAL DOMINANCE: FAQ SCHEMA INJECTION
            const clusterType = getClusterType(filePath);
            if (!content.includes('application/ld+json" id="faq-schema"')) {
                const faqSchema = JSON.stringify(getFaqSchema(clusterType));
                const schemaHtml = `\n    <script type="application/ld+json" id="faq-schema">${faqSchema}</script>`;
                content = content.replace('</head>', `${schemaHtml}\n</head>`);
            }

            // 10. SOVEREIGN MESH (Related Intelligence)
            if (!content.includes('id="sovereign-mesh"')) {
                const footerMesh = `
    <!-- Sovereign Mesh (Sync v${VERSION}) -->
    <section class="sovereign-mesh" id="sovereign-mesh" style="padding: 4rem 2rem; background: #fafaf8; border-top: 1px solid #eee; margin-top: 5rem;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #1a1a1a; margin-bottom: 2rem; border-bottom: 2px solid #d4af37; display: inline-block;">Sovereign Connectivity & Intelligence Matrix</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
                <a href="/paranjape-forest-trails-township-bhugaon-plots/" style="color: #444; font-size: 0.9rem; text-decoration: none; padding: 10px; border-radius: 8px; background: #fff; border: 1px solid #eee; transition: all 0.3s ease;">NA Bungalow Plots in Bhugaon &rarr;</a>
                <a href="/paranjape-forest-trails-township-bhugaon-villas/" style="color: #444; font-size: 0.9rem; text-decoration: none; padding: 10px; border-radius: 8px; background: #fff; border: 1px solid #eee; transition: all 0.3s ease;">Luxury Forest Villas Pune &rarr;</a>
                <a href="/paranjape-forest-trails-township-bhugaon-apartments/" style="color: #444; font-size: 0.9rem; text-decoration: none; padding: 10px; border-radius: 8px; background: #fff; border: 1px solid #eee; transition: all 0.3s ease;">Premium Apartments Bhugaon &rarr;</a>
                <a href="/paranjape-forest-trails-township-bhugaon-connectivity-kothrud-nal-stop/" style="color: #444; font-size: 0.9rem; text-decoration: none; padding: 10px; border-radius: 8px; background: #fff; border: 1px solid #eee; transition: all 0.3s ease;">Kothrud & Nal Stop Proximity &rarr;</a>
                <a href="/paranjape-forest-trails-township-bhugaon-investment/pmrda-ring-road-impact/" style="color: #444; font-size: 0.9rem; text-decoration: none; padding: 10px; border-radius: 8px; background: #fff; border: 1px solid #eee; transition: all 0.3s ease;">PMRDA Ring Road Appreciation &rarr;</a>
            </div>
        </div>
    </section>
    <!-- /Sovereign Mesh -->`;
                content = content.replace('</body>', `${footerMesh}\n</body>`);
            }

            // 11. HYPER-LOCALIZED H1 OPTIMIZATION
            const h1Match = content.match(/<h1[^>]*?>(.*?)<\/h1>/i);
            if (h1Match) {
                const optimizedH1 = getLocalizedH1(clusterType, h1Match[1]);
                content = content.replace(/<h1[^>]*?>.*?<\/h1>/i, `<h1 id="voice-ready-h1" class="hero-title">${optimizedH1}</h1>`);
            }

                    // 12. COMPETITIVE COMPARISON LEDGER (The Authority Signal)
            if (!content.includes('id="competitive-ledger"')) {
                const comparisonLedger = `
    <!-- Competitive Comparison Ledger (Sync v${VERSION}) -->
    <section class="section comparison-ledger" id="competitive-ledger" style="padding: 6rem 2rem; background: #fff;">
        <div style="max-width: 1000px; margin: 0 auto; border: 1px solid #eee; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.05);">
            <div style="background: var(--pscl-maroon); color: #fff; padding: 2rem; text-align: center;">
                <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0;">Sovereign Comparison Ledger</h2>
                <p style="font-size: 0.8rem; opacity: 0.8; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px;">Forest Trails vs Regional Western Pune Projects</p>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="background: #f9f9f9; border-bottom: 2px solid #eee;">
                            <th style="padding: 1.5rem;">Authority Metric</th>
                            <th style="padding: 1.5rem; color: var(--pscl-maroon); font-weight: 800;">Forest Trails Bhugaon</th>
                            <th style="padding: 1.5rem;">Average Bavdhan/Kothrud</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 1.2rem; font-weight: 700;">Township Scale</td>
                            <td style="padding: 1.2rem; color: #155724; font-weight: 700;">190-Acre Universe</td>
                            <td style="padding: 1.2rem;">2-10 Acre Clusters</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 1.2rem; font-weight: 700;">Greenery Offset</td>
                            <td style="padding: 1.2rem; color: #155724; font-weight: 700;">30,000+ Oxygen Trees</td>
                            <td style="padding: 1.2rem;">Standard Landscaping</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 1.2rem; font-weight: 700;">Air Quality (AQI)</td>
                            <td style="padding: 1.2rem; color: #155724; font-weight: 700;">~20-40 (Pristine)</td>
                            <td style="padding: 1.2rem;">~80-120 (Urban)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 1.2rem; font-weight: 700;">Infrastructure</td>
                            <td style="padding: 1.2rem; color: #155724; font-weight: 700;">Equestrian & Cliff Club</td>
                            <td style="padding: 1.2rem;">Basic Clubhouse</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <!-- /Competitive Comparison Ledger -->`;
                content = content.replace('</body>', `${comparisonLedger}\n</body>`);
            }

            // 13. SOVEREIGN BAVBAR (Phase 59 Sync: Dynamic UI)
            // Systematically purge legacy bars and inject the premium conversion pill
            const legacyBavBarRegex = /<!-- Mobile High-Conversion Sticky Bar -->[\s\S]*?<div class="mobile-sticky-bar">[\s\S]*?<\/div>[\s\S]*?<\/style>/g;
            content = content.replace(legacyBavBarRegex, '');
            
            if (!content.includes('id="sovereign-bavbar"')) {
                const sovereignBavBar = `
    <!-- Sovereign BavBar (Sync v${VERSION}) -->
    <div class="mobile-sticky-bar" id="sovereign-bavbar">
        <a href="https://wa.me/917744009295" target="_blank" rel="noopener" class="bav-pill bav-pill-wa">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
        </a>
        <button class="bav-pill bav-pill-enq open-enquiry-modal">
            <i class="fas fa-envelope"></i>
            <span>Enquiry</span>
        </button>
        <button class="bav-pill bav-pill-eco open-global-search">
            <i class="fas fa-satellite-dish"></i>
            <span>Ecosystem</span>
        </button>
    </div>
    <!-- /Sovereign BavBar -->`;
                content = content.replace('</body>', `${sovereignBavBar}\n</body>`);
            }

            if (content !== original) {
                fs.writeFileSync(filePath, content);
            }
        } catch (e) {
            console.error(`❌ Error refining ${filePath}: ${e.message}`);
        }
    });

    console.log('✅ Sovereign Mastery Engine: Global Meta-Data Refinement Complete.');
}

processFiles();
