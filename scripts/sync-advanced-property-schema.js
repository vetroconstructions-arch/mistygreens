const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://paranjapetownship.com';

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
console.log(`🏠 Syncing Advanced Property Schema Site-Wide...`);

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    const pageTitle = content.match(/<title>([^<]+)<\/title>/)?.[1] || 'Forest Trails Bhugaon';
    const rel = path.relative(ROOT, file);
    const url = `${SITE}/${rel.replace('index.html', '').replace(/\\/g, '/')}`;

    // Generate property-specific schema
    const propertySchema = `
    <!-- Sovereign RealEstateListing Schema (Phase 51) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "RealEstateListing",
                "@id": "${url}#listing",
                "name": "${pageTitle}",
                "url": "${url}",
                "datePosted": "2026-04-10",
                "contentLocation": {
                    "@type": "Place",
                    "name": "Bhugaon, Pune West",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Bhugaon",
                        "addressRegion": "Pune",
                        "postalCode": "412115",
                        "addressCountry": "IN"
                    }
                },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                         "@type": "Organization",
                         "name": "Paranjape Schemes",
                         "url": "${SITE}"
                    }
                }
            }
        ]
    }
    </script>
    `;

    // Inject before closing </head>
    if (!content.includes('RealEstateListing')) {
        content = content.replace('</head>', `${propertySchema}\n</head>`);
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`✅ Success: Injected Listing Schema into ${modifiedCount} pages.`);
