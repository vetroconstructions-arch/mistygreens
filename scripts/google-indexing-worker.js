const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// 0. Auto-Detection for Google Service Account Key
function findKeyFile() {
    const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
    const jsonFiles = rootFiles.filter(f => f.endsWith('.json') && !['package.json', 'package-lock.json', 'search-index.json'].includes(f));
    for (const file of jsonFiles) {
        try {
            const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'));
            if (content.type === 'service_account') return path.join(__dirname, '..', file);
        } catch (e) {}
    }
    return null;
}

const KEY_FILE = findKeyFile();
const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const AUTH_URL = 'https://oauth2.googleapis.com/token';
const API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

async function getAccessToken(key) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({ iss: key.client_email, scope: SCOPES.join(' '), aud: AUTH_URL, exp, iat })).toString('base64url');
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(`${header}.${payload}`);
    const signature = signer.sign(key.private_key, 'base64url');
    const jwt = `${header}.${payload}.${signature}`;

    return new Promise((resolve, reject) => {
        const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;
        const req = https.request(AUTH_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => resolve(JSON.parse(data).access_token));
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

async function publishUrl(url, token) {
    return new Promise((resolve) => {
        const postData = JSON.stringify({ url: url, type: 'URL_UPDATED' });
        const req = https.request(API_URL, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }, (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                if (res.statusCode === 200) console.log(` ✅ Indexed: ${url}`);
                else console.error(` ❌ Failed [${res.statusCode}]: ${url}`);
                resolve();
            });
        });
        req.on('error', resolve);
        req.write(postData);
        req.end();
    });
}

async function run() {
    if (!KEY_FILE) {
        console.log(" ⚠️ SKIPPED: No service-account.json found.");
        process.exit(0);
    }

    const key = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    console.log("🚀 Stage 52 Priority Indexing: Scaling Visibility...");
    
    try {
        const token = await getAccessToken(key);
        const SITE = 'https://www.paranjapetownship.com';
        const ROOT = path.join(__dirname, '..');
        
        function getPriorityUrls(dir, urlList = []) {
            fs.readdirSync(dir).forEach(file => {
                const fullPath = path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    if (!['node_modules', '.git', 'scripts', 'images', 'assets'].includes(file)) getPriorityUrls(fullPath, urlList);
                } else if (file.endsWith('.html')) {
                    const relative = path.relative(ROOT, filePath = fullPath);
                    const url = `${SITE}/${relative.replace('index.html', '').replace(/\\/g, '/')}`;
                    
                    // Priority Scoring logic
                    let score = 10;
                    if (url.includes('growth-ledger')) score += 100;
                    if (url.includes('everglades')) score += 50;
                    if (url.includes('misty-greens')) score += 40;
                    if (url.split('/').length < 4) score += 20; // Hub pages

                    urlList.push({ url, score });
                }
            });
            return urlList;
        }

        const discovered = getPriorityUrls(ROOT).sort((a,b) => b.score - a.score);
        const targetUrls = discovered.slice(0, 100); 

        console.log(`\n📦 Discovered ${discovered.length} nodes. Submitting top ${targetUrls.length} priority targets...\n`);

        for (const item of targetUrls) {
            await publishUrl(item.url, token);
            await new Promise(r => setTimeout(r, 200));
        }

        console.log("\n✅ Stage 52 Priority Indexing Complete.");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}

if (require.main === module) run();
