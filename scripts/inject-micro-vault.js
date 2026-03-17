#!/usr/bin/env node
/**
 * SEO Phase 9: Micro-Project Keyword Domination
 * Generates and injects a hyper-granular keyword vault for all sub-projects within Forest Trails.
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/vikasyewle/paranjapeplots';

const clusterKeywords = {
    'general': [
        "Paranjape Forest Trails clusters", "Forest Trails micro projects", "Paranjape Bhugaon sub projects",
        "Paranjape Forest Trails all phases", "Paranjape Forest Trails township map", "Paranjape Forest Trails review 2026"
    ],
    'misty-greens': [
        "Misty Greens Bhugaon price", "Misty Greens NA plots Forest Trails", "Misty Greens RERA number",
        "Misty Greens resale plots Bhugaon", "Misty Greens Forest Trails brochure", "Misty Greens plotting layout"
    ],
    'kaleidoscope': [
        "Kaleidoscope Forest Trails price", "Kaleidoscope Bhugaon plots for sale", "Kaleidoscope Paranjape reviews",
        "Kaleidoscope NA bungalow plots", "Kaleidoscope Forest Trails resale", "Kaleidoscope phase 2 Bhugaon"
    ],
    'verandah': [
        "Verandah Forest Trails floor plan", "Verandah luxury apartments Bhugaon", "Verandah Paranjape price list",
        "Verandah 2BHK Forest Trails", "Verandah 3BHK Bhugaon flat", "Verandah possession date"
    ],
    'whistling-meadows': [
        "Whistling Meadows forest villas", "Whistling Meadows Bhugaon price", "Whistling Meadows Paranjape bungalow",
        "Whistling Meadows villa resale", "Whistling Meadows Forest Trails location", "Whistling Meadows RERA"
    ],
    'pebble-bay': [
        "Pebble Bay Forest Trails plots", "Pebble Bay Bhugaon price", "Pebble Bay residential plots Pune",
        "Pebble Bay Paranjape location", "Pebble Bay plot sizes", "Pebble Bay Bhugaon reviews"
    ],
    'atmos': [
        "Atmos Forest Trails Bhugaon", "Atmos Paranjape price", "Atmos residential project Pune",
        "Atmos Forest Trails amenities", "Atmos Bhugaon location", "Atmos Paranjape floor plan"
    ],
    'cascade-crescent': [
        "Cascade villas Forest Trails", "Crescent villas Bhugaon", "Cascade Paranjape price",
        "Crescent Forest Trails resale", "Cascade and Crescent villas Pune", "Paranjape heritage villas Bhugaon"
    ],
    'evergreen': [
        "Evergreen Forest Trails senior living", "Evergreen Bhugaon Paranjape", "Evergreen residential Pune",
        "Evergreen Forest Trails price", "Evergreen Paranjape possession"
    ],
    'the-cliff': [
        "The Cliff Club Forest Trails membership", "The Cliff Bhugaon restaurant", "The Cliff Forest Trails amenities",
        "The Cliff club house Pune", "The Cliff Paranjape contact"
    ]
};

const allKeywords = Object.values(clusterKeywords).flat();
const vaultHtml = `
        <!-- Micro-Project Semantic Vault (SEO Phase 9) -->
        <div style="display: none;" aria-hidden="true">
            <p>${allKeywords.join(', ')}.</p>
        </div>`;

function injectVault(filePath, keywords = null) {
    let content = fs.readFileSync(filePath, 'utf8');
    const targetVault = keywords ? `
        <!-- Local Micro-Project Vault (SEO Phase 9) -->
        <div style="display: none;" aria-hidden="true">
            <p>${keywords.join(', ')}.</p>
        </div>` : vaultHtml;

    // Inject before the footer or at end of body
    if (!content.includes('Micro-Project Semantic Vault') && !content.includes('Local Micro-Project Vault')) {
        content = content.replace('</body>', targetVault + '\n</body>');
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

console.log('🚀 Starting Micro-Project Keyword Injection...');

// 1. Inject everything into index.html
if (injectVault(path.join(BASE_DIR, 'index.html'))) {
    console.log('✅ Injected Global Vault into index.html');
}

// 2. Inject targeted vaults into satellite pages
const mapping = {
    'misty-greens-plots-pune/index.html': clusterKeywords['misty-greens'],
    'verandah-luxury-flats-bhugaon/index.html': clusterKeywords['verandah'],
    'whistling-meadows-villas-bhugaon/index.html': clusterKeywords['whistling-meadows'],
    'kaleidoscope-apartments-bhugaon/index.html': clusterKeywords['kaleidoscope']
};

for (const [relPath, keywords] of Object.entries(mapping)) {
    const fullPath = path.join(BASE_DIR, relPath);
    if (fs.existsSync(fullPath)) {
        if (injectVault(fullPath, keywords)) {
            console.log(`✅ Injected Local Vault: ${relPath}`);
        }
    }
}

console.log(`\n🎯 Finished! Keyword domination active.`);
