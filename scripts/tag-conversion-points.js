#!/usr/bin/env node
/**
 * Conversion Heatmap Tagging (CRO)
 * Injects unique tracking IDs into every CTA on the platform.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let count = 0;

function tagCTAs(filePath) {
    if (filePath.includes('node_modules') || filePath.includes('brain') || filePath.includes('scripts')) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    const pageSlug = path.relative(ROOT, filePath).replace('/index.html', '').replace('.html', '').replace(/\//g, '-');

    // 1. Tag main Enquiry buttons
    html = html.replace(/<button([^>]*?)class="([^"]*?open-enquiry-modal[^"]*?)"([^>]*?)>/g, (match, p1, p2, p3) => {
        if (p1.includes('id=') || p3.includes('id=')) return match; // Already tagged
        return `<button${p1}class="${p2}" id="cta-${pageSlug}-enquire"${p3}>`;
    });

    // 2. Tag Whatsapp links
    html = html.replace(/<a([^>]*?)class="([^"]*?whatsapp-btn[^"]*?)"([^>]*?)>/g, (match, p1, p2, p3) => {
        if (p1.includes('id=') || p3.includes('id=')) return match; // Already tagged
        return `<a${p1}class="${p2}" id="wa-${pageSlug}-chat"${p3}>`;
    });

    if (html !== originalHtml) {
        fs.writeFileSync(filePath, html, 'utf8');
        count++;
        console.log(`✅ Tagged CRO Points for: ${path.relative(ROOT, filePath)}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.')) walkDir(filePath);
        } else if (file.endsWith('.html')) {
            tagCTAs(filePath);
        }
    });
}

console.log("🚀 Starting CRO Conversion Tagging...");
walkDir(ROOT);
console.log(`\n🎯 Successfully tagged ${count} pages for conversion tracking.`);
