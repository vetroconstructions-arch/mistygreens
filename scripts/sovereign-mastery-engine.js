const fs = require('fs');
const path = require('path');
const { getFaqSchema } = require('./generate-faq-schema');

const VERSION = "4.3.0";
const BASE_DOMAIN = "https://www.paranjapetownship.com";

// PRICING MATRIX
const PRICING_MATRIX = {
    "everglades": "₹48.50 Lakhs*",
    "plots": "₹1.23 Cr*",
    "villas": "₹3.50 Cr*",
    "apartments": "₹85 Lakhs*",
    "highgardens": "₹1.60 Cr*",
    "default": "₹1.23 Cr*"
};

function getClusterType(filePath) {
    const f = filePath.toLowerCase();
    if (f.includes('everglades')) return 'everglades';
    if (f.includes('highgardens')) return 'highgardens';
    if (f.includes('plot')) return 'plots';
    if (f.includes('villa') || f.includes('bungalow')) return 'villas';
    if (f.includes('apartment') || f.includes('canopy')) return 'apartments';
    return 'connectivity';
}

function getWhatsAppText(clusterType) {
    const texts = {
        "everglades": "Hi, I am interested in Paranjape Forest Trails Everglades II 1 & 2 BHK Apartments starting ₹46.99L*.",
        "plots": "Hi, I am interested in Paranjape Forest Trails Misty Greens NA Bungalow Plots starting ₹1.23 Cr*.",
        "villas": "Hi, I am interested in Paranjape Forest Trails Sovereign Forest Villas starting ₹3.50 Cr*.",
        "apartments": "Hi, I am interested in Premium Apartments at Paranjape Forest Trails.",
        "highgardens": "Hi, I am interested in Paranjape Forest Trails Highgardens Apartments starting ₹1.60 Cr*."
    };
    return encodeURIComponent(texts[clusterType] || "Hi, I am interested in Paranjape Forest Trails Bhugaon.");
}

const ROOT = process.cwd();
const SKIP_DIRS = [
    '.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', 
    '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.wrangler'
];

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
    console.log(`📡 Sovereign Mastery Engine v${VERSION}: Full Restoration & UX Polish...`);

    files.forEach(filePath => {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            const original = content;
            const clusterType = getClusterType(filePath);
            const folderName = path.dirname(path.relative(ROOT, filePath));
            const waText = getWhatsAppText(clusterType);
            const masterPrice = PRICING_MATRIX[clusterType] || PRICING_MATRIX.default;
            const attributionLabel = folderName === '.' ? 'Township Hub' : folderName.split('-').pop().toUpperCase();

            // --- 0. UX SAFETY BLANKET (Z-INDEX MASTER) ---
            const safetyBlanket = `
    <!-- Sovereign UX Safety Blanket (Sync v${VERSION}) -->
    <style>
        :root { --zi-bavbar: 10001; --zi-modal: 10005; }
        #sovereign-bavbar { z-index: var(--zi-bavbar) !important; bottom: 0; left: 0; right: 0; }
        .concierge-modal, #master-plan-modal, #exit-intent-modal, .swal2-container { z-index: var(--zi-modal) !important; }
        .header-main { z-index: 10002 !important; }
        /* Prevent layout shift from duplicate tickers */
        .heritage-ticker:nth-of-type(n+2) { display: none !important; }
    </style>`;
            if (!content.includes('Sovereign UX Safety Blanket')) {
                content = content.replace('</head>', `${safetyBlanket}\n</head>`);
            }

            // --- 1. PAYLOAD PURGE & ATTRIBUTION INJECTION ---
            content = content.replace(/<input type="hidden" name="cluster_attribution"[^>]*?>/g, '');
            content = content.replace(/(<form[^>]*?>)/g, `$1\n                    <input type="hidden" name="cluster_attribution" value="${attributionLabel}">`);
            
            // --- 2. WHATSAPP ATTRIBUTION ---
            // Append utm_cluster to all WA links for salesperson context
            content = content.replace(/wa\.me\/917744009295(?:\?text=[^"&]*)?(&utm_cluster=[^"]*)?/g, `wa.me/917744009295?text=${waText}&utm_cluster=${attributionLabel}`);

            // --- 3. LCP & LOGO HARDENING ---
            content = content.replace(/src="\/assets\/branding\/logo\.png"/g, 'src="/assets/branding/logo.png"');
            content = content.replace(/href="\/style\.min\.css"/g, 'href="/style.min.css"');
            content = content.replace(/(class="hero-bg"[^>]*?style="[^"]*?")/g, `$1 fetchpriority="high" loading="eager"`);
            content = content.replace(/<img[^>]*?src="\/assets\/branding\/logo\.png"[^>]*?>/g, '<img src="/assets/branding/logo.png" alt="Paranjape Forest Trails Logo" class="header-logo" width="180" height="60" loading="eager" fetchpriority="high">');

            // --- 4. DATASET SCHEMA ---
            if (!content.includes('"@type": "Dataset"')) {
                const canonicalUrl = folderName === '.' ? 'https://www.paranjapetownship.com/' : `https://www.paranjapetownship.com/${folderName}/`;
                const datasetSchema = `\n    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Dataset","name":"Paranjape Forest Trails Investment Ledger 2026","description":"Consolidated appreciation data for the 190-acre Forest Trails township in Bhugaon.","url":"${canonicalUrl}","creator":{"@type":"Organization","name":"Paranjape Schemes"},"variableMeasured":[{"@type":"PropertyValue","name":"Annual Appreciation","value":"12.5%","unitText":"PERCENT"}]}</script>`;
                content = content.replace('</head>', `${datasetSchema}\n</head>`);
            }

            // --- 5. SOVEREIGN BAVBAR (UIP v2.2 Attribution Sync) ---
            // Purge legacy BavBars
            content = content.replace(/<!-- Sovereign BavBar[^>]*?-->[\s\S]*?<!-- \/Sovereign BavBar -->/g, '');
            const sovereignBavBar = `
    <!-- Sovereign BavBar (Sync v${VERSION}) -->
    <div class="mobile-sticky-bar" id="sovereign-bavbar">
        <a href="https://wa.me/917744009295?text=${waText}&utm_cluster=${attributionLabel}" target="_blank" rel="noopener" class="bav-pill bav-pill-wa">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
        </a>
        <button class="bav-pill bav-pill-enq open-enquiry-modal">
            <i class="fas fa-envelope"></i>
            <span>Enquiry</span>
        </button>
        <button class="bav-pill-eco" onclick="window.location.href='/investment/growth-ledger/'" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: none; border: none; color: #fff; cursor: pointer;">
            <i class="fas fa-chart-line" style="font-size: 1.2rem; margin-bottom: 2px; color: var(--pscl-gold);"></i>
            <span style="font-size: 0.6rem; font-weight: 800; text-transform: uppercase;">Growth</span>
        </button>
    </div>
    <!-- /Sovereign BavBar -->`;
            content = content.replace('</body>', `${sovereignBavBar}\n</body>`);

            if (content !== original) {
                fs.writeFileSync(filePath, content);
            }
        } catch (e) {
            console.error(`❌ Error refining ${filePath}: ${e.message}`);
        }
    });

    console.log(`✅ Sovereign Mastery Engine v${VERSION}: Global Restoration Complete.`);
}

processFiles();
