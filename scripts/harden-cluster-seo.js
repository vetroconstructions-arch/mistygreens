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

function getProjectContext(dirPath) {
    for (const [key, val] of Object.entries(CLUSTER_DEF)) {
        if (dirPath.includes(key)) return val;
    }
    return { name: 'Paranjape Forest Trails', desc: '190-Acre Paranjape Forest Trails Township in Bhugaon, Pune West. Plots, Villas, Apartments.' };
}

function walkDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scripts' && file !== 'brain') {
                walkDir(filePath, fileList);
            }
        } else if (file.endsWith('.html') && filePath !== path.join(BASE_DIR, 'index.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function processFiles() {
    console.log("🚀 Starting Absolute SEO Metadata Hardening...");
    const files = walkDir(BASE_DIR);
    let changed = 0;

    files.forEach(file => {
        let html = fs.readFileSync(file, 'utf8');
        const context = getProjectContext(file);
        
        let titlePattern = /<title>.*?<\/title>/i;
        let newTitle = `<title>${context.name} at Paranjape Forest Trails Bhugaon | Pune West</title>`;
        
        if (titlePattern.test(html)) {
            html = html.replace(titlePattern, newTitle);
        } else if (html.includes('</head>')) {
            html = html.replace('</head>', `    ${newTitle}\n</head>`);
        }

        let descPattern = /<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/i;
        let newDesc = `<meta name="description" content="${context.desc}">`;

        if (descPattern.test(html)) {
            html = html.replace(descPattern, newDesc);
        } else if (html.includes('</head>')) {
            html = html.replace('</head>', `    ${newDesc}\n</head>`);
        }

        fs.writeFileSync(file, html, 'utf8');
        changed++;
    });

    console.log(`✅ Hardened SEO <title> and <meta> tags on ${changed} programmatic landing pages.`);
}

processFiles();
