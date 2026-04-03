#!/usr/bin/env node
/**
 * Sovereign Sitemap Generator (Phase 13.1)
 * Generates an SEO-optimized sitemap for the 190-acre township platform.
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://paranjapetownship.com';
const PROJECT_ROOT = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'sitemap.xml');

function getFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Include pSEO categories
            if (!file.startsWith('.') && !['node_modules', 'scripts', 'brain', 'images', '.git', '.wrangler'].includes(file)) {
                getFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html') && !file.includes('thank-you')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function generateSitemap() {
    console.log("🗺️ Starting Sovereign Sitemap Generation...");
    const files = getFiles(PROJECT_ROOT);
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.1">
`;

    files.forEach(file => {
        const relativePath = path.relative(PROJECT_ROOT, file);
        const urlPath = relativePath.replace('index.html', '').replace(/\\/g, '/');
        const url = `${BASE_URL}/${urlPath}`;
        const lastmod = fs.statSync(file).mtime.toISOString().split('T')[0];
        
        let priority = 0.6;
        let freq = 'monthly';

        if (relativePath === 'index.html') {
            priority = 1.0;
            freq = 'daily';
        } else if (relativePath.includes('paranjape-schemes-forest-trails-')) {
            priority = 0.9;
            freq = 'weekly';
        } else if (relativePath.includes('insights/')) {
            priority = 0.85;
            freq = 'weekly';
        }

        xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>\n`;
    });

    xml += `</urlset>`;
    
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
    console.log(`✅ Sitemap created with ${files.length} URLs at: ${OUTPUT_FILE}`);
}

generateSitemap();
