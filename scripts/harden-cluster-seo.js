#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');

const CLUSTER_DEF = {
    'misty-greens': { name: 'Misty Greens Plots', desc: 'Premium NA Bungalow Plots at Misty Greens inside Paranjape Forest Trails Township, Bhugaon, Pune West. Starting ₹1.23 Cr*.' },
    'the-cove': { name: 'The Cove Villas', desc: 'Ultra Luxury Forest Villas at The Cove inside Paranjape Forest Trails, Bhugaon. Exclusive community living.' },
    'the-highlands': { name: 'The Highlands Apartments', desc: 'Premium 2 & 3 BHK Apartments at The Highlands, Paranjape Forest Trails Bhugaon. Unobstructed nature views.' },
    'canopy-apartments': { name: 'The Canopy Apartments', desc: 'Spacious Apartments at The Canopy inside Paranjape Forest Trails Township Bhugaon. Pune West connectivity.' },
    'codename-alpha': { name: 'Everglades II', desc: 'New Launch Everglades II Apartments at Paranjape Forest Trails Bhugaon Pune.' },
    'highgardens': { name: 'High Gardens', desc: 'Exquisite High Gardens Apartments at Paranjape Forest Trails Bhugaon Pune.' },
    'rivolo': { name: 'The Rivolo Villas', desc: 'The Rivolo Premium Luxury Villas at Paranjape Forest Trails Bhugaon Pune. Ultimate exclusivity.' },
    'verandah': { name: 'Verandah Luxury Flats', desc: 'Verandah Luxury Flats inside Paranjape Forest Trails Township Bhugaon Pune.' },
    'athashri': { name: 'Athashri Senior Living', desc: 'Premium Senior Living at Athashri inside Paranjape Forest Trails Bhugaon Pune. Safe, connected community.' }
};

function cleanName(folderName) {
    let name = folderName.replace(/-/g, ' ').trim();
    let words = name.split(/\s+/);
    
    const replacements = {
        'it': 'IT',
        'nri': 'NRI',
        'roi': 'ROI',
        'pmrda': 'PMRDA',
        'rera': 'RERA',
        'vs': 'vs',
        'bhk': 'BHK',
        'na': 'NA',
        'ssrvm': 'SSRVM',
        'pune': 'Pune',
        'bhugaon': 'Bhugaon',
        'kothrud': 'Kothrud',
        'bavdhan': 'Bavdhan',
        'magarpatta': 'Magarpatta',
        'hinjewadi': 'Hinjewadi',
        'paud': 'Paud',
        'baner': 'Baner',
        'aundh': 'Aundh',
        'karve': 'Karve',
        'mumbai': 'Mumbai',
        'co': 'Co'
    };
    
    let cleaned = words.map(word => {
        let wl = word.toLowerCase();
        if (replacements[wl]) {
            return replacements[wl];
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    
    return cleaned.join(' ');
}

function walkDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scripts' && file !== 'brain' && file !== 'components') {
                walkDir(filePath, fileList);
            }
        } else if (file.endsWith('.html') && filePath !== path.join(BASE_DIR, 'index.html') && file !== '404.html' && file !== 'thank-you.html') {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function processFiles() {
    console.log("🚀 Starting Advanced SEO Metadata Hardening & Rankings Protection...");
    const files = walkDir(BASE_DIR);
    let changed = 0;

    files.forEach(file => {
        let html = fs.readFileSync(file, 'utf8');
        const relativePath = path.relative(BASE_DIR, file).replace(/\\/g, '/');
        const urlLower = relativePath.toLowerCase();
        
        // Determine folder display name
        let dirName = path.basename(path.dirname(file));
        if (!dirName || dirName === '.' || dirName === 'paranjapeplots') {
            dirName = path.basename(file).replace('.html', '');
        }
        
        let display_name = cleanName(dirName);
        let title = `${display_name} | Paranjape Forest Trails Bhugaon`;
        let description = `Detailed guide to ${display_name} in the 190-acre nature-themed gated township of Paranjape Forest Trails, Bhugaon, Pune West. Get pricing and layouts.`;
        
        // Apply matching categories
        if (urlLower.includes('comparisons') || urlLower.includes('-vs-') || urlLower.includes('vs-')) {
            title = `${display_name} Comparison | Paranjape Forest Trails`;
            description = `Detailed real estate comparison of ${display_name} near Kothrud and Bavdhan. Explore pricing, ROI potential, and connectivity metrics at Forest Trails Bhugaon.`;
        } else if (urlLower.includes('investment') || urlLower.includes('growth-ledger') || urlLower.includes('appreciation') || urlLower.includes('rental-yield') || urlLower.includes('tax-benefits') || urlLower.includes('pmrda')) {
            title = `${display_name} ROI Forecast | Bhugaon Plots & Villas`;
            description = `Analyze ${display_name} in West Pune. Explore developer track record, PMRDA infrastructure updates, and NRI tax benefits for bungalow plots.`;
        } else if (urlLower.includes('blogs') || urlLower.includes('blog/')) {
            title = `${display_name} | Forest Trails Bhugaon Blog`;
            description = `Read our latest article on ${display_name}. Stay updated on gated community guidelines, school admissions, and West Pune property insights.`;
        } else if (urlLower.includes('sectors') || urlLower.includes('bungalows') || urlLower.includes('villas') || urlLower.includes('apartments')) {
            title = `${display_name} Enclave | Paranjape Forest Trails`;
            description = `Detailed layout, specifications, floor plans, and pricing for ${display_name} inside the 190-acre gated township of Paranjape Forest Trails, Bhugaon.`;
        } else if (urlLower.includes('amenities') || urlLower.includes('cliff-lifestyle-hub') || urlLower.includes('the-cove') || urlLower.includes('verandah') || urlLower.includes('highgardens') || urlLower.includes('highlands') || urlLower.includes('the-cliff-club') || urlLower.includes('equestrian') || urlLower.includes('school') || urlLower.includes('spa-retreat')) {
            title = `${display_name} Clubhouse & Amenities | Forest Trails Pune`;
            description = `Explore the world-class features of ${display_name} inside Forest Trails Bhugaon. Access equestrian training, SSRVM school, and Olympic swimming pools.`;
        } else if (urlLower.includes('location') || urlLower.includes('connectivity') || urlLower.includes('near-') || urlLower.includes('proximity')) {
            title = `${display_name} Proximity & Route Guide | Forest Trails`;
            description = `Commute and travel times for {display_name}. Learn how Paranjape Forest Trails connects you to Bavdhan, Kothrud, Hinjewadi IT Hub, and the Ring Road.`;
        } else if (urlLower.includes('legal')) {
            title = `${display_name} Legal Guide | Forest Trails Bhugaon`;
            description = `RERA registration numbers, NA bungalow plot purchase checklist, and verified legal records for Paranjape Forest Trails project in West Pune.`;
        } else {
            // Check CLUSTER_DEF specific enclaves
            let matched = false;
            for (const [key, val] of Object.entries(CLUSTER_DEF)) {
                if (urlLower.includes(key)) {
                    title = `${val.name} at Paranjape Forest Trails Bhugaon | Pune West`;
                    description = val.desc;
                    matched = true;
                    break;
                }
            }
        }
        
        // Enforce max 65 chars length for search engine display
        if (title.length > 65) {
            const suffix = " | Forest Trails";
            const maxPrefix = 65 - suffix.length;
            title = display_name.slice(0, maxPrefix).trim() + suffix;
        }

        let original = html;

        // 1. Replace Title Tag
        let titlePattern = /<title>.*?<\/title>/i;
        let newTitleTag = `<title>${title}</title>`;
        if (titlePattern.test(html)) {
            html = html.replace(titlePattern, newTitleTag);
        }
        
        // 2. Replace Meta Description
        let descPattern = /<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/i;
        let newDescTag = `<meta name="description" content="${description}">`;
        if (descPattern.test(html)) {
            html = html.replace(descPattern, newDescTag);
        }
        
        // 3. Replace OG Title
        let ogTitlePattern = /<meta\s+property=["']og:title["']\s+content=["'](.*?)["']\s*\/?>/i;
        let newOgTitleTag = `<meta property="og:title" content="${title}">`;
        if (ogTitlePattern.test(html)) {
            html = html.replace(ogTitlePattern, newOgTitleTag);
        }
        
        // 4. Replace OG Description
        let ogDescPattern = /<meta\s+property=["']og:description["']\s+content=["'](.*?)["']\s*\/?>/i;
        let newOgDescTag = `<meta property="og:description" content="${description}">`;
        if (ogDescPattern.test(html)) {
            html = html.replace(ogDescPattern, newOgDescTag);
        }
        
        // 5. Replace Twitter Title
        let twTitlePattern = /<meta\s+name=["']twitter:title["']\s+content=["'](.*?)["']\s*\/?>/i;
        let newTwTitleTag = `<meta name="twitter:title" content="${title}">`;
        if (twTitlePattern.test(html)) {
            html = html.replace(twTitlePattern, newTwTitleTag);
        }
        
        // 6. Replace Twitter Description
        let twDescPattern = /<meta\s+name=["']twitter:description["']\s+content=["'](.*?)["']\s*\/?>/i;
        let newTwDescTag = `<meta name="twitter:description" content="${description}">`;
        if (twDescPattern.test(html)) {
            html = html.replace(twDescPattern, newTwDescTag);
        }

        if (html !== original) {
            fs.writeFileSync(file, html, 'utf8');
            changed++;
        }
    });

    console.log(`✅ Hardened & Protected SEO Metadata on ${changed} landing pages.`);
}

processFiles();
