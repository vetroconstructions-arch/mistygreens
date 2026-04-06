const fs = require('fs');
const path = require('path');

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
                ? 'https://paranjapetownship.com/' 
                : `https://paranjapetownship.com/${folderName}/`;
            
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

            // 4. SCHEMA HARMONIZATION (Universal Identity)
            // Ensure all authors are "Paranjape Schemes" or "Heritage Advisor"
            content = content.replace(/"author":\s*\{\s*"@type":\s*"Person"\s*\}/g, '"author": { "@type": "Person", "name": "Paranjape Forest Trails Advisor" }');

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
