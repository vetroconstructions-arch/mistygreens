const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// 0. Sovereign Key Discovery (Multi-Key Logic)
function findKeyFiles() {
    const rootDir = path.join(__dirname, '..');
    const rootFiles = fs.readdirSync(rootDir);
    const keys = [];
    
    for (const file of rootFiles) {
        if (file.endsWith('.json') && !['package.json', 'package-lock.json', 'search-index.json', 'manifest.json'].includes(file)) {
            try {
                const content = JSON.parse(fs.readFileSync(path.join(rootDir, file), 'utf8'));
                if (content.type === 'service_account') {
                    keys.push({ path: path.join(rootDir, file), email: content.client_email });
                }
            } catch (e) {}
        }
    }
    return keys;
}

const KEYS = findKeyFiles();
const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const AUTH_URL = 'https://oauth2.googleapis.com/token';
const API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const LEDGER_PATH = path.join(__dirname, '.indexing-history.json');

// 1. Persistence Ledger (Sovereign Authority)
function getLedger() {
    try {
        if (fs.existsSync(LEDGER_PATH)) return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
    } catch (e) {}
    return { indexed: {} };
}

function saveLedger(ledger) {
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
}

async function getAccessToken(keyConfig) {
    const key = JSON.parse(fs.readFileSync(keyConfig.path, 'utf8'));
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

async function publishUrl(url, token, retries = 0) {
    return new Promise((resolve) => {
        const postData = JSON.stringify({ url: url, type: 'URL_UPDATED' });
        const req = https.request(API_URL, { 
            method: 'POST', 
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } 
        }, (res) => {
            res.on('data', () => {});
            res.on('end', async () => {
                if (res.statusCode === 200) {
                    console.log(` ✅ Indexed: ${url}`);
                    resolve({ success: true });
                } else if (res.statusCode === 429 && retries < 3) {
                    const wait = Math.pow(2, retries + 1) * 1000;
                    console.log(` ⏳ Rate Limited (429). Backing off ${wait}ms...`);
                    await new Promise(r => setTimeout(r, wait));
                    resolve(await publishUrl(url, token, retries + 1));
                } else {
                    console.error(` ❌ Failed [${res.statusCode}]: ${url}`);
                    resolve({ success: false, status: res.statusCode });
                }
            });
        });
        req.on('error', () => resolve({ success: false }));
        req.write(postData);
        req.end();
    });
}

async function run() {
    if (KEYS.length === 0) {
        console.log(" ⚠️ SKIPPED: No service-account JSONs found.");
        process.exit(0);
    }

    console.log(`🚀 Sovereign Indexer v2.0: Resilient Hard-Force Engine (${KEYS.length} Projects Detected)`);
    const ledger = getLedger();
    const SITE = 'https://www.paranjapetownship.com';
    const ROOT = path.join(__dirname, '..');
    
    function getPriorityUrls(dir, urlList = []) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (!['node_modules', '.git', 'scripts', 'images', 'assets', 'styles', 'components'].includes(file)) getPriorityUrls(fullPath, urlList);
            } else if (file.endsWith('.html')) {
                const relative = path.relative(ROOT, fullPath);
                const url = `${SITE}/${relative.replace('index.html', '').replace(/\\/g, '/')}`;
                
                let score = 10;
                if (url.includes('growth-ledger')) score += 100;
                if (url.includes('everglades')) score += 50;
                if (url.includes('misty-greens')) score += 40;
                if (url.split('/').length < 4) score += 20;

                // Check Feshness
                const mtime = fs.statSync(fullPath).mtimeMs;
                if (Date.now() - mtime < 24 * 3600 * 1000) score += 100;

                urlList.push({ url, score, mtime });
            }
        });
        return urlList;
    }

    const discovered = getPriorityUrls(ROOT).sort((a,b) => b.score - a.score);
    const force = process.argv.includes('--force');
    const history = ledger.indexed;
    const now = Date.now();

    // Filter by Ledger (Skip if indexed in last 24h, unless --force is used)
    const pendingUrls = discovered.filter(item => {
        if (force) return true;
        if (!history[item.url]) return true;
        return (now - history[item.url]) > 24 * 3600 * 1000;
    });

    if (force) console.log(" ⚡ HARD-FORCE: Bypassing cooldown for absolute site-wide refresh.");

    console.log(`\n📦 Nodes: ${discovered.length} | Pending: ${pendingUrls.length} | Keys: ${KEYS.length}`);
    
    let keyIndex = 0;
    let quotaCounter = 0;
    const QUOTA_PER_KEY = 150; // Safety margin for 200 limit

    for (const item of pendingUrls) {
        if (quotaCounter >= QUOTA_PER_KEY) {
            keyIndex++;
            quotaCounter = 0;
            if (keyIndex >= KEYS.length) {
                console.log("\n🛑 All daily project quotas exhausted. Stopping pass.");
                break;
            }
            console.log(`\n🔄 Switching to Project Key #${keyIndex + 1} (${KEYS[keyIndex].email})`);
        }

        const token = await getAccessToken(KEYS[keyIndex]);
        const result = await publishUrl(item.url, token);
        
        if (result.success) {
            history[item.url] = now;
            quotaCounter++;
        }
        
        // Base throttle
        await new Promise(r => setTimeout(r, 1000));
    }

    saveLedger(ledger);
    console.log("\n✅ Sovereign Indexing Pass Complete.");
}

run();
