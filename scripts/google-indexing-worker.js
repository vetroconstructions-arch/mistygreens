#!/usr/bin/env node
/**
 * Google Indexing API (Hard-Force) Worker
 * pSEO Phase 51: Instant Search Visibility for Paranjape Forest Trails
 * Zero-Dependency JWT Implementation
 */

const fs = require('fs');
const https = require('https');
// 0. Auto-Detection for Google Service Account Key
function findKeyFile() {
    const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
    const jsonFiles = rootFiles.filter(f => f.endsWith('.json') && !['package.json', 'package-lock.json', 'search-index.json', 'manifest.json'].includes(f));
    
    for (const file of jsonFiles) {
        try {
            const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'));
            if (content.type === 'service_account') {
                console.log(` 🛡️  GUARDIAN DETECTED: Using key file '${file}'`);
                return path.join(__dirname, '..', file);
            }
        } catch (e) {}
    }
    return null;
}

const KEY_FILE = findKeyFile();
const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const AUTH_URL = 'https://oauth2.googleapis.com/token';
const API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

// 1. Auth: JWT Token Generation (from scratch)
async function getAccessToken(key) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;

    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({
        iss: key.client_email,
        scope: SCOPES.join(' '),
        aud: AUTH_URL,
        exp,
        iat
    })).toString('base64url');

    const signatureInput = `${header}.${payload}`;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = signer.sign(key.private_key, 'base64url');

    const jwt = `${signatureInput}.${signature}`;

    return new Promise((resolve, reject) => {
        const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;
        const req = https.request(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                const json = JSON.parse(data);
                if (json.access_token) resolve(json.access_token);
                else reject(new Error('Auth failed: ' + data));
            });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// 2. Publish: Submit URL to Indexing API
async function publishUrl(url, token) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            url: url,
            type: 'URL_UPDATED'
        });

        const req = https.request(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(` ✅ Indexed: ${url}`);
                    resolve(JSON.parse(data));
                } else {
                    console.error(` ❌ Failed [${res.statusCode}]: ${url}`);
                    console.debug(`    Detail: ${data}`);
                    resolve(null);
                }
            });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// 3. Execution Engine
async function run() {
    if (!fs.existsSync(KEY_FILE)) {
        console.error(` ⚠️  MISSING: '${path.basename(KEY_FILE)}' not found in root.`);
        console.log("    To enable Phase 51, please add your Google Cloud key to the root directory.\n");
        process.exit(1);
    }

    const key = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    console.log("🚀 Starting Stage 51 Hard-Force Indexing...");
    
    try {
        const token = await getAccessToken(key);
        console.log("  🔑 Auth Token secured.");

        // Harvest URLs from shared utility (mimic discovery)
        const SITE = 'https://paranjapetownship.com';
        const ROOT = path.join(__dirname, '..');
        
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
                    const url = `${SITE}/${relative.replace('index.html', '').replace(/\\/g, '/')}`;
                    urlList.push(url);
                }
            });
            return urlList;
        }

        const urls = getAllUrls(ROOT);
        console.log(`\n📦 Discovered ${urls.length} URLs for submission.`);

        // Regulation: Google allows 200 URLs per day for Indexing API
        const targetUrls = urls.slice(0, 100); 
        console.log(`🎯 Targeting top ${targetUrls.length} priority URLs today.\n`);

        for (const url of targetUrls) {
            await publishUrl(url, token);
            await new Promise(r => setTimeout(r, 100)); // Rate limiting safety
        }

        console.log("\n✅ Stage 51 Indexing Complete.");
    } catch (e) {
        console.error("\n ❌ HARDWARE CRASH: Indexing Engine Error.");
        console.error(e.message);
        process.exit(1);
    }
}

if (require.main === module) run();
