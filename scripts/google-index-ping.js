#!/usr/bin/env node
/**
 * Google & Bing Indexing Ping Script
 * Pings Google Sitemap API, Bing Webmaster, and IndexNow API
 * Run: node scripts/google-index-ping.js
 */

const https = require('https');
const http = require('http');

const SITE = 'https://paranjape-mistygreens.in';
const SITEMAP = `${SITE}/sitemap.xml`;
const INDEXNOW_KEY = 'f4b43b355de0414f991ceafbe5aa411a';

// All pages to submit for indexing
const ALL_URLS = [
    '/',
    '/luxury-forest-villas-bhugaon/',
    '/premium-apartments-forest-trails/',
    '/na-bungalow-plots-bhugaon/',
    '/kaleidoscope-apartments-bhugaon/',
    '/verandah-luxury-flats-bhugaon/',
    '/whistling-meadows-villas-bhugaon/',
    '/misty-greens-plots-pune/',
    '/property-investment-bhugaon-pune/',
    '/forest-trails-location-proximity/',
    '/forest-trails-price-list-brochure/',
    '/paranjape-schemes-forest-trails-bhugaon/',
    '/paranjape-schemes-forest-trails-plots/',
    '/paranjape-schemes-forest-trails-villas/',
    '/paranjape-schemes-forest-trails-bungalows/',
    '/paranjape-schemes-forest-trails-apartments/',
    '/paranjape-schemes-forest-trails-price/',
    '/blogs/na-bungalow-plots-pune-west-guide/',
    '/blogs/misty-greens-na-plots-review/',
    '/blogs/kaleidoscope-na-bungalow-plots/',
    '/blogs/kothrud-vs-bhugaon-na-bungalow-plots/',
    '/blogs/forest-trails-na-bungalow-plots-advantage/',
    '/blogs/bavdhan-na-bungalow-plots-investment/',
];

function httpGet(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        }).on('error', reject);
    });
}

function httpPost(url, body) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        const options = {
            hostname: parsed.hostname,
            path: parsed.pathname + parsed.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
            },
        };
        const client = url.startsWith('https') ? https : http;
        const req = client.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

async function pingGoogle() {
    console.log('\n🤖 GOOGLE SITEMAP PING');
    console.log('─'.repeat(50));
    try {
        const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`;
        const res = await httpGet(url);
        console.log(`  ✅ Google Ping: HTTP ${res.status}`);
        return true;
    } catch (err) {
        console.log(`  ❌ Google Ping FAILED: ${err.message}`);
        return false;
    }
}

async function pingBing() {
    console.log('\n🔍 BING WEBMASTER PING');
    console.log('─'.repeat(50));
    try {
        const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`;
        const res = await httpGet(url);
        console.log(`  ✅ Bing Ping: HTTP ${res.status}`);
        return true;
    } catch (err) {
        console.log(`  ❌ Bing Ping FAILED: ${err.message}`);
        return false;
    }
}

async function pingIndexNow() {
    console.log('\n⚡ INDEXNOW BATCH SUBMISSION');
    console.log('─'.repeat(50));
    try {
        const payload = JSON.stringify({
            host: 'paranjape-mistygreens.in',
            key: INDEXNOW_KEY,
            keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
            urlList: ALL_URLS.map(path => `${SITE}${path}`),
        });

        // Submit to multiple IndexNow endpoints
        const endpoints = [
            'https://api.indexnow.org/indexnow',
            'https://www.bing.com/indexnow',
            'https://yandex.com/indexnow',
        ];

        for (const endpoint of endpoints) {
            try {
                const res = await httpPost(endpoint, payload);
                const engine = new URL(endpoint).hostname;
                console.log(`  ✅ ${engine}: HTTP ${res.status} (${ALL_URLS.length} URLs submitted)`);
            } catch (err) {
                const engine = new URL(endpoint).hostname;
                console.log(`  ⚠️  ${engine}: ${err.message}`);
            }
        }
        return true;
    } catch (err) {
        console.log(`  ❌ IndexNow FAILED: ${err.message}`);
        return false;
    }
}

async function pingGoogleURLs() {
    console.log('\n🌐 GOOGLE INDIVIDUAL URL INSPECTION (via search)');
    console.log('─'.repeat(50));
    // Google doesn't have a public URL submission API without OAuth,
    // but we can trigger discovery via sitemap + RSS.
    console.log('  ℹ️  Individual URL indexing requires Google Search Console.');
    console.log('  ℹ️  Sitemap ping + IndexNow will trigger crawl for new pages.');
    console.log(`  ℹ️  ${ALL_URLS.length} URLs covered via sitemap.xml`);
}

async function main() {
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║  PARANJAPE FOREST TRAILS — SEO INDEXING ENGINE  ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log(`\n📅 ${new Date().toISOString()}`);
    console.log(`🌐 Site: ${SITE}`);
    console.log(`📋 URLs: ${ALL_URLS.length}`);

    await pingGoogle();
    await pingBing();
    await pingIndexNow();
    await pingGoogleURLs();

    console.log('\n╔══════════════════════════════════════════════════╗');
    console.log('║  ✅ INDEXING PIPELINE COMPLETE                   ║');
    console.log('╚══════════════════════════════════════════════════╝\n');
}

main().catch(console.error);
