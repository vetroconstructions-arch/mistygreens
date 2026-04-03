#!/usr/bin/env node
/**
 * IndexNow (Bing/Yandex) Worker
 * pSEO Phase 51: Instant Search Visibility for Paranjape Forest Trails
 */

const fs = require('fs');
const https = require('https');
const crypto = require('crypto');
const path = require('path');

const SITE_DOMAIN = 'paranjapetownship.com';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const ROOT = path.join(__dirname, '..');

// 1. Key Management: Generate or Load IndexNow Key
function ensureIndexNowKey() {
    const keyFile = path.join(ROOT, 'indexnow_key.txt');
    let key;
    if (fs.existsSync(keyFile)) {
        key = fs.readFileSync(keyFile, 'utf8').trim();
    } else {
        key = crypto.randomUUID().replace(/-/g, '');
        fs.writeFileSync(keyFile, key);
        console.log(` ✅ Generated NEW IndexNow Key: ${key}`);
    }
    // Always ensure the verification file [key].txt exists at root
    fs.writeFileSync(path.join(ROOT, `${key}.txt`), key);
    console.log(` 🚀 Verification file ${key}.txt synchronized at root.`);
    return key;
}

// 2. Discover URLs
function getAllUrls(dir, urlList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!['node_modules', '.git', 'scripts', 'brain', 'images', 'assets', 'vendor'].includes(file)) {
                getAllUrls(filePath, urlList);
            }
        } else if (file.endsWith('.html') && !file.includes('thank-you')) {
            const relative = path.relative(ROOT, filePath);
            const url = `https://${SITE_DOMAIN}/${relative.replace('index.html', '').replace(/\\/g, '/')}`;
            urlList.push(url);
        }
    });
    return urlList;
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
