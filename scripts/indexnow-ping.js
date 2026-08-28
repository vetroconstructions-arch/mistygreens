#!/usr/bin/env node
/**
 * IndexNow Instant Search Engine Broadcast Engine v2026
 * Instantly submits updated URLs to Bing, Yandex, Seznam, and IndexNow endpoints.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.paranjapetownship.com';
const KEY = 'c4d1685458394e80820063db1a48c6fb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Ensure key file exists in public/root
const keyFilePath = path.join(__dirname, '..', `${KEY}.txt`);
if (!fs.existsSync(keyFilePath)) {
  fs.writeFileSync(keyFilePath, KEY);
}

const URLS_TO_SUBMIT = [
  `https://${HOST}/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-misty-greens/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-rivolo-residences/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-the-canopy/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-the-cove/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-highgardens/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-verandah/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-orchard-residences/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-swaniketan/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-everglades/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-amenities/equestrian-academy-pune/`,
  `https://${HOST}/paranjape-forest-trails-township-bhugaon-price/`
];

async function submitIndexNow() {
  console.log("⚡ Broadcasting 14 priority URLs via IndexNow protocol...");

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS_TO_SUBMIT
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
