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
console.log(`🏎 Refining LCP Performance across ${htmlFiles.length} files...`);

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // 1. Identify the primary hero image
    const imgMatch = content.match(/<img[^>]+src=["'](\/?images\/[^"']+)["'][^>]*>/i);
    const bgMatch = content.match(/background-image:\s*url\(["']?(\/?images\/[^"')]+)["']?\)/i);
    
    let heroSrc = (imgMatch ? imgMatch[1] : (bgMatch ? bgMatch[1] : null));

    if (heroSrc) {
        // Clean the path for physical check
        const cleanPath = heroSrc.startsWith('/') ? heroSrc.slice(1) : heroSrc;
        const physicalPath = path.join(ROOT, cleanPath);

        // Verification: If the identified hero doesn't exist (e.g. .webp auto-replacement failed), fallback to original .jpg
        if (!fs.existsSync(physicalPath)) {
            const fallback = cleanPath.replace('.webp', '.jpg');
            if (fs.existsSync(path.join(ROOT, fallback))) {
                 heroSrc = '/' + fallback;
            } else {
                 console.log(`⚠️ Warning: No physical hero found for ${path.relative(ROOT, file)} at ${cleanPath}`);
                 heroSrc = null;
            }
        }
    }

    if (heroSrc) {
        // Enforce fetchpriority="high" on the actual element
        if (imgMatch) {
            content = content.replace(imgMatch[0], imgMatch[0].replace('<img', '<img fetchpriority="high"'));
        }
        
        // Remove old preloads (cleanup)
        content = content.replace(/<link rel=["']preload["'] as=["']image["'] href=["']\/images\/[^"']+["'] fetchpriority=["']high["']>/g, '');

        // Inject verified preload in <head>
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

console.log(`✅ Success: Verified and optimized LCP for ${modifiedCount} pages.`);
