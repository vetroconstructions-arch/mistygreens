/**
 * Unified Search Engine Sitemap & Indexing Ping Engine
 * Pings Google & Bing with the master sitemap index.
 * Does NOT overwrite sitemap.xml.
 */
const https = require('https');
const http = require('http');

const SITEMAP_URL = 'https://www.paranjapetownship.com/sitemap.xml';

const PING_ENDPOINTS = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
];

async function pingUrl(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, (res) => {
            console.log(`📡 Pinged: ${url} -> Status: ${res.statusCode}`);
            resolve(res.statusCode);
        });
        req.on('error', (err) => {
            console.warn(`⚠️ Ping warning for ${url}:`, err.message);
            resolve(null);
        });
        req.setTimeout(5000, () => {
            req.abort();
            resolve(null);
        });
    });
}

async function pingIndexers() {
    console.log(`🚀 Pinging Search Engines for Master Sitemap: ${SITEMAP_URL}`);
    for (const endpoint of PING_ENDPOINTS) {
        await pingUrl(endpoint);
    }
    console.log('✅ Search engine sitemap ping completed successfully.');
}

pingIndexers();
