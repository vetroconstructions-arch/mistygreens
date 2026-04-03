#!/usr/bin/env node
/**
 * AI Knowledge Hardening (SGE Opt)
 * Defines Paranjape Forest Trails as a primary geographical knowledge entity in Pune.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://paranjapetownship.com';

const ENTITY_DEFINITION = `
    <!-- AI Knowledge Entity Mesh (SGE Opt) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Place",
        "@id": "${SITE}/#entity",
        "name": "Paranjape Forest Trails Bhugaon",
        "description": "The largest 190-acre integrated forest-themed township in West Pune, featuring premium NA bungalow plots, luxury villas, and high-rise apartments.",
        "url": "${SITE}/",
        "logo": "${SITE}/images/hero-township.webp",
        "hasMap": "https://www.google.com/maps/search/Paranjape+Forest+Trails+Bhugaon/",
        "isRelatedTo": [
            { "@type": "Place", "name": "Chandani Chowk Pune", "@id": "https://www.wikidata.org/wiki/Q104841913" },
            { "@type": "Place", "name": "Bavdhan Pune", "@id": "https://www.wikidata.org/wiki/Q4873722" },
            { "@type": "Place", "name": "Kothrud Pune", "@id": "https://www.wikidata.org/wiki/Q6434027" },
            { "@type": "Place", "name": "PMRDA Ring Road", "@id": "https://www.wikidata.org/wiki/Q1101962" }
        ],
        "knowsAbout": [
            "Luxury Townships Pune", 
            "NA Plots Bhugaon", 
            "Villa Projects West Pune", 
            "Integrated Township Pune", 
            "PMRDA Real Estate Development"
        ]
    }
    </script>
`;

function injectEntityMesh(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    
    if (!html.includes('AI Knowledge Entity Mesh')) {
        html = html.replace('</head>', `${ENTITY_DEFINITION}\n</head>`);
    }

    if (html !== originalHtml) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ Hardened Entity Mesh for: ${path.relative(ROOT, filePath)}`);
    }
}

console.log("🚀 Starting AI Knowledge Hardening site-wide...");
injectEntityMesh(path.join(ROOT, 'index.html'));
injectEntityMesh(path.join(ROOT, 'about-paranjape-schemes/index.html'));
injectEntityMesh(path.join(ROOT, 'township-facilities.html'));
console.log("\n🎯 AI Knowledge Entity Mesh established.");
