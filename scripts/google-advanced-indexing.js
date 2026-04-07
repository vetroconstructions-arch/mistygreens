#!/usr/bin/env node
/**
 * Advanced Indexing Engine (pSEO Phase 21)
 * Multi-Index Discovery Suite for Paranjape Forest Trails.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE = 'https://www.paranjapetownship.com';
const SITEMAP_URL = `${SITE}/sitemap.xml`;
const ROOT = path.join(__dirname, '..');

// 1. Get ALL Public URLs from filesystem
function getAllUrls(dir, urlList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scripts' && file !== 'brain' && file !== 'images') {
                getAllUrls(filePath, urlList);
            }
        } else if (file.endsWith('.html') && !file.includes('thank-you')) {
            const relative = path.relative(ROOT, filePath);
            const url = `${SITE}/${relative.replace('index.html', '').replace(/\\/g, '/')}`;
            urlList.push(url);
        }
    });
    return urlList;
}

// 2. Ping Search Engines
async function ping(engine, url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            console.log(`  📡 Pinged ${engine}: ${res.statusCode}`);
            resolve(res.statusCode);
        }).on('error', (e) => {
            console.error(`  ❌ Failed ping to ${engine}: ${e.message}`);
            resolve(500);
        });
    });
}

async function run() {
    console.log("🚀 Starting Advanced Indexing Engine...");
    
    const urls = getAllUrls(ROOT);
    console.log(`\n📦 Discovered ${urls.length} target URLs in public domain.`);
    
    // Ping Sitemaps (Legacy but Effective)
    console.log("\n🌐 Pinging Sitemap to Search Engines...");
    await ping('Google', `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
    await ping('Bing', `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
    
    // Note: If you have a service-account.json, you would run the Google Indexing API here.
    console.log("\n💡 PRO TIP: For instant indexing, configure YOUR_GOOGLE_API_KEY for the official Indexing API.");
    
    console.log("\n🎯 Advanced Indexing Burst Complete.");
}

run();
