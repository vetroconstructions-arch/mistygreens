const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://paranjapetownship.com';
const IMAGE = `${SITE}/images/drone-aerial.webp`;

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
console.log(`📡 Mirroring Social Graph across ${htmlFiles.length} files...`);

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    const pageTitle = content.match(/<title>([^<]+)<\/title>/)?.[1] || 'Forest Trails Bhugaon';
    const pageDesc = content.match(/<meta name="description" content="([^"]+)">/i)?.[1] || '190-acre nature township in Bhugaon Pune.';
    const rel = path.relative(ROOT, file);
    const url = `${SITE}/${rel.replace('index.html', '').replace(/\\/g, '/')}`;

    const socialTags = `
    <!-- Sovereign Social Graph (Sync v1.12.1) -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDesc}">
    <meta property="og:image" content="${IMAGE}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${url}">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageDesc}">
    <meta name="twitter:image" content="${IMAGE}">
    `;

    // Remove existing og/twitter tags if partial
    content = content.replace(/<meta property=["']og:[\s\S]*?>/g, '');
    content = content.replace(/<meta name=["']twitter:[\s\S]*?>/g, '');
    content = content.replace(/<!-- Sovereign Social Graph [\s\S]*?-->/g, '');

    // Inject before closing </head>
    content = content.replace('</head>', `${socialTags}\n</head>`);

    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`✅ Success: Mirrored Social Graph for ${modifiedCount} pages.`);
