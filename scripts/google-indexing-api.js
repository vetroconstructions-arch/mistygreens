#!/usr/bin/env node
/**
 * Official Google Indexing API Engine (Phase 51)
 * Purpose: Notifies Google of URL updates for instant crawling.
 * Required: service-account.json
 */
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SITE = 'https://paranjapetownship.com';
const ROOT = path.join(__dirname, '..');
const KEY_FILE = path.join(ROOT, 'service-account.json');

// 1. Discover all production-ready HTML URLs
function getInventory(dir, urls = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (['node_modules', '.git', '.wrangler', 'components', 'scripts', 'brain', 'images'].includes(file)) continue;
            getInventory(fullPath, urls);
        } else if (file.endsWith('.html') && !file.includes('thank-you')) {
            let rel = path.relative(ROOT, fullPath).replace(/\\/g, '/');
            if (rel === 'index.html') rel = '';
            else rel = rel.replace('/index.html', '/').replace('index.html', '');
            urls.push(`${SITE}/${rel}`);
        }
    }
    return urls;
}

async function run() {
    console.log("🚀 Initializing Google Indexing API Auth...");
    
    if (!fs.existsSync(KEY_FILE)) {
        console.error("❌ CRITICAL: service-account.json not found. Place it in the root to activate.");
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });

    const urls = [...new Set(getInventory(ROOT))];
    console.log(`\n📦 Discovered ${urls.length} indexable entities.`);

    for (const targetUrl of urls) {
        try {
            console.log(`  📡 Notifying Google: ${targetUrl}`);
            const res = await indexing.urlNotifications.publish({
                requestBody: {
                    url: targetUrl,
                    type: 'URL_UPDATED',
                },
            });
            console.log(`  ✅ Status: ${res.statusText} (${res.status})`);
        } catch (err) {
            console.error(`  ❌ Error: ${targetUrl} -> ${err.message}`);
            // If quota is reached, stop. (Standard limit is 200/day)
            if (err.message.includes('quota')) {
                console.log("\n⚠️ Quota reached. Resume tomorrow.");
                break;
            }
        }
    }

    console.log("\n🎯 Global Indexing Payload Dispatched.");
}

run();
