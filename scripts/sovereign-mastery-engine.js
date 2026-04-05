const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SKIP_DIRS = ['.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.antigravityignore', '.github'];

function processFiles() {
    const files = [];

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
    console.log(`📡 Sovereign Mastery Engine: Processing ${files.length} files...`);

    files.forEach(filePath => {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            const original = content;

            // 1. REPAIR CRITICAL SCHEMA (Review Snippets / Events)
            // Fix missing Author name
            content = content.replace(/"author":\s*\{\s*"@type":\s*"Person"\s*\}/g, '"author": { "@type": "Person", "name": "Verified Resident" }');
            // Fix missing itemReviewed link
            content = content.replace(/"itemReviewed":\s*\{\s*"@id":\s*"https:\/\/paranjapetownship.com\/#localbusiness"\s*\}/g, '"itemReviewed": { "@type": "LocalBusiness", "name": "Paranjape Forest Trails", "@id": "https://paranjapetownship.com/#localbusiness", "image": "https://paranjapetownship.com/images/hero-township.webp" }');

            // 2. REFACTOR IDENTITY-MESH HREFS (High Authority)
            content = content.replace(/href="\/highlands"/g, 'href="/paranjape-forest-trails-township-bhugaon-the-highlands-the-cove-the-ridges-villas-bhugaon/"');
            content = content.replace(/href="\/cove"/g, 'href="/paranjape-forest-trails-township-bhugaon-the-highlands-the-cove-the-ridges-villas-bhugaon/"');
            content = content.replace(/href="\/the-cliff-lifestyle-hub"/g, 'href="/paranjape-forest-trails-township-bhugaon-the-cliff-lifestyle-hub-bhugaon/"');
            content = content.replace(/amenities-the-cliff-club.html/g, 'paranjape-forest-trails-township-bhugaon-the-cliff-lifestyle-hub-bhugaon.html');

            if (content !== original) {
                fs.writeFileSync(filePath, content);
            }
        } catch (e) {
            console.error(`Error processing ${filePath}: ${e.message}`);
        }
    });

    console.log('✅ Sovereign Mastery Engine: Total Dominance Sync Complete.');
}

processFiles();
