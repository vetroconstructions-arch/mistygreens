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
    'The Canopy': [
        "The Canopy Forest Trails price", "The Canopy Bhugaon plots for sale", "The Canopy Paranjape reviews",
        "The Canopy NA bungalow plots", "The Canopy Forest Trails resale", "The Canopy phase 2 Bhugaon"
    ],
    'verandah': [
        "Verandah Forest Trails floor plan", "Verandah luxury apartments Bhugaon", "Verandah Paranjape price list",
        "Verandah 2BHK Forest Trails", "Verandah 3BHK Bhugaon flat", "Verandah possession date"
    ],
    'whistling-meadows': [
        "The Rivolo forest villas", "The Rivolo Bhugaon price", "The Rivolo Paranjape bungalow",
        "The Rivolo villa resale", "The Rivolo Forest Trails location", "The Rivolo RERA"
    ],
    'pebble-bay': [
        "Misty Greens Forest Trails plots", "Misty Greens Bhugaon price", "Misty Greens residential plots Pune",
        "Misty Greens Paranjape location", "Misty Greens plot sizes", "Misty Greens Bhugaon reviews"
    ],
    'The Highlands': [
        "Highlands Forest Trails Bhugaon", "Highlands Paranjape price", "Highlands residential project Pune",
        "Highlands Forest Trails amenities", "Highlands Bhugaon location", "Highlands Paranjape floor plan"
    ],
    'The Rivolo-The Rivolo': [
        "The Rivolo villas Forest Trails", "The Rivolo villas Bhugaon", "The Rivolo Paranjape price",
        "The Rivolo Forest Trails resale", "The Rivolo villas Pune", "Paranjape heritage villas Bhugaon"
    ],
    'The Rivolo': [
        "The Rivolo Forest Trails senior living", "The Rivolo Bhugaon Paranjape", "The Rivolo residential Pune",
        "The Rivolo Forest Trails price", "The Rivolo Paranjape possession"
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
    'luxury-forest-villas-bhugaon/index.html': clusterKeywords['whistling-meadows'],
    'The Canopy-apartments-bhugaon/index.html': clusterKeywords['The Canopy']
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
