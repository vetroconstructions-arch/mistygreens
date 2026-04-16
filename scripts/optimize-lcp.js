#!/usr/bin/env node
/**
 * SEO Phase 8: LCP Performance Optimizer
 * Injects fetchpriority="high" and preloads for hero images to achieve sub-second LCP.
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/vikasyewle/paranjapeplots';

const targetPages = [
    'index.html',
    'misty-greens/index.html',
    'verandah/index.html',
    'luxury-forest-villas-bhugaon/index.html',
    'The Canopy-apartments-bhugaon/index.html',
    'premium-apartments-forest-trails/index.html',
    // Blogs
    'blogs/bavdhan-na-bungalow-plots-investment/index.html',
    'blogs/forest-trails-na-bungalow-plots-advantage/index.html',
    'blogs/The Canopy-na-bungalow-plots/index.html',
    'blogs/kothrud-vs-bhugaon-na-bungalow-plots/index.html',
    'blogs/misty-greens-na-plots-review/index.html',
    'blogs/na-bungalow-plots-pune-west-guide/index.html'
];

let updatedCount = 0;

targetPages.forEach(relPath => {
    const filePath = path.join(BASE_DIR, relPath);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Identify Hero Image URL
    // Look for background-image in hero-bg or similar
    // Or look for <img> in hero-section
    let heroImageUrl = null;
    const bgImageMatch = content.match(/style="[^"]*background(?:-image)?:\s*url\(['"]?([^'"]+)['"]?\)/);
    if (bgImageMatch) {
        heroImageUrl = bgImageMatch[1];
    } else {
        const imgMatch = content.match(/<img[^>]+src=['"]?([^'"]+)['"]?[^>]*class="[^"]*hero[^"]*"/);
        if (imgMatch) heroImageUrl = imgMatch[1];
    }

    if (heroImageUrl) {
        // Correct path if it's relative
        let preloadUrl = heroImageUrl;
        if (!preloadUrl.startsWith('http') && !preloadUrl.startsWith('/')) {
            // If we are in a subfolder, and the image is in images/, we need to resolve it
            // This is just for the <link rel="preload">
            const depth = relPath.split('/').length - 1;
            const prefix = '../'.repeat(depth);
            // heroImageUrl might already have ../
        }

        // 2. Add fetchpriority="high" to the element
        // Match div or img with class containing hero-bg or similar and containing the image url
        const heroElemRegex = new RegExp(`(<(div|img)[^>]+class="[^"]*hero[^"]*"[^>]+style="[^"]*${heroImageUrl}[^"]*"[^>]*>)`, 'i');
        if (content.match(heroElemRegex)) {
            if (!content.includes('fetchpriority="high"')) {
                content = content.replace(heroElemRegex, (match) => {
                     return match.replace(/>$/, ' fetchpriority="high">');
                });
            }
        } else {
            // Try simpler match for any hero element
            const simpleHeroRegex = /<(div|img)[^>]+class="[^"]*hero[^"]*"[^>]*>/;
            if (content.match(simpleHeroRegex)) {
                 if (!content.includes('fetchpriority="high"')) {
                    content = content.replace(simpleHeroRegex, (match) => {
                         return match.replace(/>$/, ' fetchpriority="high">');
                    });
                }
            }
        }

        // 3. Add <link rel="preload"> to <head>
        if (!content.includes(`rel="preload" as="image" href="${heroImageUrl}"`)) {
            const preloadTag = `\n    <link rel="preload" as="image" href="${heroImageUrl}" fetchpriority="high">`;
            content = content.replace('</head>', preloadTag + '\n</head>');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`🚀 LCP optimized: ${relPath}`);
    }
});

console.log(`\n🎯 Successfully optimized LCP for ${updatedCount} pages.`);
