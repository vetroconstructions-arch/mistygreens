#!/usr/bin/env node
/**
 * IndexNow Full-Site Instant Search Engine Broadcast Engine v2026
 * Dynamically harvests all canonical URLs from sitemaps and broadcasts them to IndexNow endpoints (Bing, Yandex, Seznam, Naver).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.paranjapetownship.com';
const KEY = 'c4d1685458394e80820063db1a48c6fb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BASE_DIR = path.resolve(__dirname, '..');

// Ensure key file exists in public root
const keyFilePath = path.join(BASE_DIR, `${KEY}.txt`);
if (!fs.existsSync(keyFilePath)) {
  fs.writeFileSync(keyFilePath, KEY, 'utf-8');
}

function getAllCanonicalUrls() {
  const urlSet = new Set();
  const sitemapFiles = fs.readdirSync(BASE_DIR).filter(f => f.startsWith('sitemap-') && f.endsWith('.xml') && !f.includes('images') && !f.includes('news'));

  for (const sf of sitemapFiles) {
    try {
      const content = fs.readFileSync(path.join(BASE_DIR, sf), 'utf-8');
      const matches = content.match(/<loc>(https:\/\/www\.paranjapetownship\.com[^<]+)<\/loc>/g);
      if (matches) {
        for (const m of matches) {
          const u = m.replace('<loc>', '').replace('</loc>', '').trim();
          if (!u.endsWith('.xml') && !u.includes('404') && !u.includes('thank-you')) {
            urlSet.add(u);
          }
        }
      }
    } catch (e) {
      console.warn(`Warning reading ${sf}:`, e.message);
    }
  }

  // Fallback if sitemaps not found
  if (urlSet.size === 0) {
    urlSet.add(`https://${HOST}/`);
  }

  return Array.from(urlSet).sort();
}

async function submitIndexNow() {
  const urlList = getAllCanonicalUrls();
  console.log(`⚡ Broadcasting ${urlList.length} canonical URLs across the full site via IndexNow protocol...`);

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  });

  const endpoints = ['api.indexnow.org', 'www.bing.com', 'yandex.com'];

  for (const endpoint of endpoints) {
    const options = {
      hostname: endpoint,
      port: 443,
      path: '/IndexNow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      console.log(`  🚀 IndexNow Response [${endpoint}]: HTTP ${res.statusCode}`);
    });

    req.on('error', (e) => {
      console.warn(`  ⚠️ IndexNow Notice [${endpoint}]: ${e.message}`);
    });

    req.write(payload);
    req.end();
  }
}

submitIndexNow();
