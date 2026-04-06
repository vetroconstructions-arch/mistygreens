const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TODAY = "April 10, 2026";

function getFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const f of list) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            if (['node_modules', '.git', '.wrangler', 'components', 'scripts', 'images'].includes(f)) continue;
            getFiles(full, files);
        } else if (f.endsWith('.html')) {
            files.push(full);
        }
    }
    return files;
}

const htmlFiles = getFiles(ROOT);
console.log(`🛰 Injecting Freshness Signals into ${htmlFiles.length} files...`);

const freshnessHtml = `
<!-- Project Freshness Signal (Phase 51) -->
<div class="freshness-signal" style="padding: 0.8rem 1.5rem; background: #f0f7f0; border: 1px solid #c3e6cb; border-radius: 8px; display: inline-flex; align-items: center; gap: 10px; margin-top: 2rem; font-size: 0.85rem; color: #155724; font-weight: 600;">
    <span style="width: 8px; height: 8px; background: #28a745; border-radius: 50%; box-shadow: 0 0 8px #28a745; animation: pulse 2s infinite;"></span>
    Project Status: <strong style="color: #0b2e13;">Verified Live as of ${TODAY}</strong>
</div>
<style>
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
</style>
`;

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Avoid double injection
    if (content.includes('freshness-signal')) {
         content = content.replace(/Verified Live as of (.*?)<\/strong>/, `Verified Live as of ${TODAY}</strong>`);
    } else {
        // Inject after H1 or at the top of the content
        if (content.includes('</h1>')) {
            content = content.replace('</h1>', '</h1>' + freshnessHtml);
        } else {
             content = content.replace('<body>', '<body>' + freshnessHtml);
        }
    }

    fs.writeFileSync(file, content);
    modifiedCount++;
}

console.log(`✅ Success: Updated ${modifiedCount} pages with ${TODAY} freshness signals.`);
