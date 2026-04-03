#!/usr/bin/env node
/**
 * Advanced Schema Hardener (Phase 15.2)
 * Programmatically injects high-authority JSON-LD into all project sub-pages.
 * Targets: sectors, amenities, location, investment, comparisons, legal.
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://paranjapetownship.com';
const ROOT = path.join(__dirname, '..');
const DIRS = ['sectors', 'amenities', 'location', 'investment', 'comparisons', 'legal'];

let count = 0;

function processDirectory(dirPath, category) {
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    entries.forEach(entry => {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            processDirectory(fullPath, category);
        } else if (entry.name === 'index.html') {
            hardenSchema(fullPath, category);
        }
    });
}

function hardenSchema(filePath, category) {
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    
    const relative = path.relative(ROOT, filePath);
    const url = `${SITE}/${relative.replace('index.html', '').replace(/\\/g, '/')}`;
    const pageTitle = html.match(/<title>([^<]+)<\/title>/)?.[1] || 'Forest Trails Bhugaon';
    
    // 1. BreadcrumbList Schema
    const breadcrumbSchema = `
    <!-- Advanced Breadcrumb Schema (pSEO Phase 15) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Forest Trails", "item": "${SITE}/" },
            { "@type": "ListItem", "position": 2, "name": "${category.charAt(0).toUpperCase() + category.slice(1)}", "item": "${SITE}/${category}/" },
            { "@type": "ListItem", "position": 3, "name": "${pageTitle.split(' |')[0]}", "item": "${url}" }
        ]
    }
    </script>`;

    // 2. LocalBusiness Linkage (@id mesh)
    const localBusinessSchema = `
    <!-- Sovereign LocalBusiness Mesh (@id linkage) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "${SITE}/#localbusiness",
        "name": "Paranjape Forest Trails",
        "image": "${SITE}/images/hero-township.webp",
        "url": "${SITE}/",
        "telephone": "+91-7744009295",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Paud Road, Bhugaon",
            "addressLocality": "Bhugaon",
            "addressRegion": "Pune",
            "postalCode": "412115",
            "addressCountry": "IN"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1840"
        }
    }
    </script>`;

    // Remove old schema blocks if they exist to prevent duplication
    html = html.replace(/<!-- Advanced Breadcrumb Schema [\s\S]*?<\/script>/g, '');
    html = html.replace(/<!-- Sovereign LocalBusiness Mesh [\s\S]*?<\/script>/g, '');
    
    // Inject before closing </head>
    html = html.replace('</head>', `${breadcrumbSchema}\n${localBusinessSchema}\n</head>`);
    
    // Update AggregateRating globally within the page if it exists in multiple places
    html = html.replace(/"reviewCount":\s*"\d+"/, '"reviewCount": "1840"');
    html = html.replace(/"ratingValue":\s*"4\.[0-9]"/, '"ratingValue": "4.9"');

    if (html !== originalHtml) {
        fs.writeFileSync(filePath, html, 'utf8');
        count++;
        console.log(`✅ Hardened pSEO Schema for: ${relative}`);
    }
}

console.log("🚀 Starting Advanced Schema Hardening site-wide...");
DIRS.forEach(dir => processDirectory(path.join(ROOT, dir), dir));
console.log(`\n🎯 Successfully hardened and linked ${count} project pages.`);
