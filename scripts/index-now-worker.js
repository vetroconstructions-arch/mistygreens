#!/usr/bin/env node
/**
 * IndexNow (Bing/Yandex) Worker
 * pSEO Phase 51: Instant Search Visibility for Paranjape Forest Trails
 */

const fs = require('fs');
const https = require('https');
const crypto = require('crypto');
const path = require('path');

const SITE_DOMAIN = 'www.paranjapetownship.com';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const ROOT = path.join(__dirname, '..');

// 1. Key Management: Hardened Verified Production Key
function ensureIndexNowKey() {
    const key = 'c4d1685458394e80820063db1a48c6fb';
    fs.writeFileSync(path.join(ROOT, 'indexnow_key.txt'), key);
    fs.writeFileSync(path.join(ROOT, `${key}.txt`), key);
    console.log(` 🚀 Verification file ${key}.txt synchronized at root.`);
    return key;
}

// 2. Discover Canonical URLs from Sitemaps (0 Redirects)
function getAllUrls(dir) {
    const urlSet = new Set();
    const sitemapFiles = fs.readdirSync(ROOT).filter(f => f.startsWith('sitemap-') && f.endsWith('.xml') && !f.includes('images') && !f.includes('news'));
    for (const sf of sitemapFiles) {
        try {
            const content = fs.readFileSync(path.join(ROOT, sf), 'utf8');
            const matches = content.match(/<loc>(https:\/\/www\.paranjapetownship\.com[^<]+)<\/loc>/g);
            if (matches) {
                for (const m of matches) {
                    const u = m.replace('<loc>', '').replace('</loc>', '').trim();
                    if (!u.endsWith('.xml') && !u.includes('404') && !u.includes('thank-you')) {
                        urlSet.add(u);
                    }
                }
            }
        } catch (e) {}
    }
    if (urlSet.size === 0) urlSet.add(`https://${SITE_DOMAIN}/`);
    return Array.from(urlSet).sort();
}

// 3. Execution Engine
async function run() {
    console.log("🚀 Starting Stage 51 IndexNow Worker...");
    
    const key = ensureIndexNowKey();
    const urls = getAllUrls(ROOT);
    console.log(`📦 Discovered ${urls.length} URLs for submission.`);

    const postData = JSON.stringify({
        host: SITE_DOMAIN,
        key: key,
        keyLocation: `https://${SITE_DOMAIN}/${key}.txt`,
        urlList: urls
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(INDEXNOW_API, options, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 202) {
                    console.log(` ✅ IndexNow Success [${res.statusCode}]: Submitted ${urls.length} URLs to Bing/Yandex Cluster.`);
                    resolve(true);
                } else {
                    console.error(` ❌ IndexNow Failure [${res.statusCode}]: ${data}`);
                    resolve(false);
                }
            });
        });
        req.on('error', (e) => {
            console.error(` ❌ Hardware Error: ${e.message}`);
            resolve(false);
        });
        req.write(postData);
        req.end();
    });
}

if (require.main === module) run();
