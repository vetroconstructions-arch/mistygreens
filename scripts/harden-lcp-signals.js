const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

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
console.log(`🏎 Hardening LCP Performance across ${htmlFiles.length} files...`);

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // 1. Identify the primary hero image
    // Strategy: Look for the first <img> or background-image in the page
    const imgMatch = content.match(/<img[^>]+src=["'](\/?images\/[^"']+)["'][^>]*>/i);
    const bgMatch = content.match(/background-image:\s*url\(["']?(\/?images\/[^"')]+)["']?\)/i);
    
    const heroSrc = (imgMatch ? imgMatch[1] : (bgMatch ? bgMatch[1] : null));

    if (heroSrc) {
        // Enforce fetchpriority="high" on the actual element
        if (imgMatch) {
            content = content.replace(imgMatch[0], imgMatch[0].replace('<img', '<img fetchpriority="high"'));
        }
        
        // Inject preload in <head>
        const preloadTag = `\n    <link rel="preload" as="image" href="${heroSrc}" fetchpriority="high">`;
        if (!content.includes(`rel="preload" as="image" href="${heroSrc}"`)) {
            content = content.replace('</head>', `${preloadTag}\n</head>`);
        }
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`✅ Success: Optimized LCP for ${modifiedCount} pages.`);
