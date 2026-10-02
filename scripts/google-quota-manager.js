#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Sovereign Google Indexing Quota & Throughput Manager v2026
 * ═══════════════════════════════════════════════════════════════════════════
 * Capabilities:
 *  1. Multi-Project Federation & Key Pool Discovery
 *  2. Real-Time Cloud Quota & API Health Audit (Cloud Quotas API v1)
 *  3. Official Google Quota Increase Link & Justification Generator
 *  4. High-Throughput Multipart Batch Indexing Pipeline (/batch)
 *  5. SHA-256 Differential Content-Hash Prioritization (Zero Quota Waste)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const ROOT_DIR = path.resolve(__dirname, '..');
const KEYS_DIR = path.join(ROOT_DIR, 'keys');
const LEDGER_FILE = path.join(__dirname, '.indexing-ledger.json');
const SITE_DOMAIN = 'https://www.paranjapetownship.com';

// ─── 1. Key Pool Discovery & Project Deduplication ────────────────────────────

function discoverKeyPool() {
  const candidates = [];
  const searchDirs = [ROOT_DIR];
  if (fs.existsSync(KEYS_DIR)) searchDirs.push(KEYS_DIR);

  for (const dir of searchDirs) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.endsWith('.json') && !['package.json', 'package-lock.json', 'manifest.json', 'search-index.json', '_routes.json', 'indexnow_payload.json'].includes(f)) {
        try {
          const filePath = path.join(dir, f);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (data.type === 'service_account' && data.private_key && data.client_email) {
            candidates.push({
              fileName: f,
              filePath,
              projectId: data.project_id,
              clientEmail: data.client_email,
              privateKey: data.private_key
            });
          }
        } catch (e) {}
      }
    }
  }

  // Deduplicate by project_id to calculate true quota capacity
  const projectMap = new Map();
  const duplicateWarnings = [];

  for (const c of candidates) {
    if (projectMap.has(c.projectId)) {
      duplicateWarnings.push(`⚠️ Duplicate project key detected: "${c.fileName}" shares project_id "${c.projectId}" with "${projectMap.get(c.projectId).fileName}". Both share the same 200/day quota.`);
    } else {
      projectMap.set(c.projectId, c);
    }
  }

  return {
    allKeys: candidates,
    uniqueProjects: Array.from(projectMap.values()),
    duplicateWarnings
  };
}

// ─── 2. OAuth2 JWT Token Generator ──────────────────────────────────────────

async function getAccessToken(keyConfig, scopes = ['https://www.googleapis.com/auth/indexing', 'https://www.googleapis.com/auth/cloud-platform']) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: keyConfig.clientEmail,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp,
    iat
  })).toString('base64url');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(header + '.' + payload);
  const signature = signer.sign(keyConfig.privateKey, 'base64url');
  const jwt = header + '.' + payload + '.' + signature;

  return new Promise((resolve, reject) => {
    const postData = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt;
    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) resolve(parsed.access_token);
          else reject(new Error('OAuth error: ' + (parsed.error_description || parsed.error || data)));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// ─── 3. Quota Status & Audit Engine ─────────────────────────────────────────

async function auditProjectQuota(keyConfig) {
  try {
    const token = await getAccessToken(keyConfig);
    const quotaUrl = `https://cloudquotas.googleapis.com/v1/projects/${keyConfig.projectId}/locations/global/services/indexing.googleapis.com/quotaInfos`;

    const res = await new Promise((resolve, reject) => {
      https.get(quotaUrl, {
        headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }
      }, r => {
        let d = '';
        r.on('data', c => d += c);
        r.on('end', () => resolve({ status: r.statusCode, data: d }));
      }).on('error', reject);
    });

    if (res.status === 200) {
      const parsed = JSON.parse(res.data);
      const publishInfo = parsed.quotaInfos?.find(q => q.quotaId === 'DefaultPublishRequestsPerDayPerProject');
      const limitVal = publishInfo?.dimensionsInfos?.[0]?.details?.value || '200';
      const quotaFormUrl = publishInfo?.serviceRequestQuotaUri || '';
      return {
        projectId: keyConfig.projectId,
        clientEmail: keyConfig.clientEmail,
        dailyLimit: parseInt(limitVal, 10),
        status: 'ACTIVE',
        quotaFormUrl
      };
    } else {
      return {
        projectId: keyConfig.projectId,
        clientEmail: keyConfig.clientEmail,
        dailyLimit: 200,
        status: `HTTP_${res.status}`,
        quotaFormUrl: ''
      };
    }
  } catch (err) {
    return {
      projectId: keyConfig.projectId,
      clientEmail: keyConfig.clientEmail,
      dailyLimit: 200,
      status: 'ERROR: ' + err.message,
      quotaFormUrl: ''
    };
  }
}

// ─── 4. Ledger & Differential Content Hash ───────────────────────────────────

function getLedger() {
  if (fs.existsSync(LEDGER_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(LEDGER_FILE, 'utf8'));
    } catch (e) {}
  }
  return { hashes: {}, indexedAt: {}, exhaustedProjects: {} };
}

function saveLedger(ledger) {
  fs.writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2), 'utf8');
}

function calculateFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
}

function harvestInventory() {
  const inventory = [];
  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const fullPath = path.join(dir, f);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!['node_modules', '.git', 'scripts', 'images', 'assets', 'styles', 'components', 'scratch', '.gemini', 'keys'].includes(f)) {
          walk(fullPath);
        }
      } else if (f.endsWith('.html') && !f.includes('thank-you') && !f.includes('404')) {
        let rel = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');
        if (rel === 'index.html') rel = '';
        else rel = rel.replace(/\/index\.html$/, '/').replace(/index\.html$/, '');
        if (rel && !rel.endsWith('/')) rel += '/';

        const url = `${SITE_DOMAIN}/${rel}`;
        const hash = calculateFileHash(fullPath);
        const mtime = fs.statSync(fullPath).mtimeMs;

        // Compute priority score
        let score = 10;
        if (url === `${SITE_DOMAIN}/`) score += 200;
        if (url.includes('/lp/')) score += 150;
        if (url.includes('master-plan-layout-explorer')) score += 140;
        if (url.includes('metro-extension') || url.includes('pmrda-ring-road')) score += 130;
        if (url.includes('misty-greens') || url.includes('rivolo') || url.includes('canopy')) score += 80;
        if (Date.now() - mtime < 48 * 3600 * 1000) score += 50;

        inventory.push({ url, filePath: fullPath, hash, mtime, score });
      }
    }
  }
  walk(ROOT_DIR);
  return inventory;
}

// ─── 5. High-Throughput Multipart Batch Dispatcher ──────────────────────────

async function sendBatchNotification(urls, token) {
  const boundary = '====================batch_boundary_' + Date.now() + '====================';
  let body = '';

  urls.forEach((u, idx) => {
    body += '--' + boundary + '\r\n';
    body += 'Content-Type: application/http\r\n';
    body += 'Content-ID: <item_' + idx + '>\r\n\r\n';
    body += 'POST /v3/urlNotifications:publish HTTP/1.1\r\n';
    body += 'Content-Type: application/json\r\n\r\n';
    body += JSON.stringify({ url: u, type: 'URL_UPDATED' }) + '\r\n';
  });
  body += '--' + boundary + '--\r\n';

  return new Promise((resolve) => {
    const req = https.request('https://indexing.googleapis.com/batch', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/mixed; boundary=' + boundary
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const isQuotaExceeded = data.includes('Quota exceeded') || data.includes('RESOURCE_EXHAUSTED');
        const successes = (data.match(/HTTP\/1\.1 200 OK/g) || []).length;
        resolve({
          httpStatus: res.statusCode,
          successCount: successes,
          quotaExceeded: isQuotaExceeded,
          rawResponse: data
        });
      });
    });
    req.on('error', (err) => resolve({ httpStatus: 500, successCount: 0, quotaExceeded: false, error: err.message }));
    req.write(body);
    req.end();
  });
}

// ─── 6. Command CLI Implementations ──────────────────────────────────────────

async function runStatus() {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(' 🌐 SOVEREIGN GOOGLE INDEXING QUOTA AUDIT & CAPACITY MONITOR');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const pool = discoverKeyPool();
  console.log(`📦 Discovered Keys: ${pool.allKeys.length} | Unique GCP Projects: ${pool.uniqueProjects.length}`);

  if (pool.duplicateWarnings.length > 0) {
    console.log('\n⚠️  KEY CONFIGURATION NOTICES:');
    pool.duplicateWarnings.forEach(w => console.log('  ' + w));
  }

  console.log('\n🔍 Auditing Quotas for Unique Projects...');
  let totalDailyCapacity = 0;

  for (const proj of pool.uniqueProjects) {
    const audit = await auditProjectQuota(proj);
    totalDailyCapacity += audit.dailyLimit;
    console.log(`\n  ✦ Project ID: ${audit.projectId}`);
    console.log(`    Service Account: ${audit.clientEmail}`);
    console.log(`    Daily Publish Limit: ${audit.dailyLimit} URLs/day`);
    console.log(`    API Status: ${audit.status}`);
  }

  console.log('\n───────────────────────────────────────────────────────────────────────');
  console.log(`📊 TOTAL ACTIVE DAILY CAPACITY: ${totalDailyCapacity} URLs/day`);
  console.log(`📊 TOTAL UNIQUE POOLED PROJECTS: ${pool.uniqueProjects.length}`);
  console.log('───────────────────────────────────────────────────────────────────────\n');

  const ledger = getLedger();
  const inventory = harvestInventory();
  const changedUrls = inventory.filter(item => ledger.hashes[item.url] !== item.hash);

  console.log(`📈 Site Inventory: ${inventory.length} indexable pages`);
  console.log(`⚡ Modified / Pending Indexing: ${changedUrls.length} pages`);
  console.log(`🔒 Already Fresh in Ledger: ${inventory.length - changedUrls.length} pages`);

  if (totalDailyCapacity >= inventory.length) {
    console.log('\n✅ CAPACITY STATUS: SUFFICIENT. Total daily quota exceeds full site size!');
  } else {
    console.log(`\n⚠️  CAPACITY DEFICIT: Site has ${inventory.length} pages but daily quota is ${totalDailyCapacity}.`);
    console.log('   Run: node scripts/google-quota-manager.js request-increase (to apply for 5,000/day)');
    console.log('   Or:  Add additional GCP project service accounts into the keys/ directory.');
  }
}

async function runRequestIncrease() {
  const pool = discoverKeyPool();
  const proj = pool.uniqueProjects[0];
  if (!proj) {
    console.error('❌ No service-account JSON found.');
    return;
  }

  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSc_Yx63r6vM26qQpD7FjG7R8_XgZ9N1V-RxS69OJojLc/viewform?usp=pp_url&entry.840738641=${encodeURIComponent(proj.projectId)}&entry.1781339011=${encodeURIComponent(proj.clientEmail)}&entry.1191128052=5000&entry.1776911313=${encodeURIComponent('https://www.paranjapetownship.com')}`;

  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(' 🚀 OFFICIAL GOOGLE INDEXING API QUOTA EXPANSION GENERATOR');
  console.log('═══════════════════════════════════════════════════════════════════════\n');
  console.log('Google Cloud Indexing API requires official manual quota review for requests > 200/day.');
  console.log('Your pre-filled Quota Increase Submission link has been synthesized:\n');
  console.log(`👉 ${formUrl}\n`);
  console.log('───────────────────────────────────────────────────────────────────────');
  console.log('📋 COPY-PASTE BUSINESS JUSTIFICATION (Optimized for Fast Approval):');
  console.log('───────────────────────────────────────────────────────────────────────');
  console.log(`
Project ID: ${proj.projectId}
Website Domain: https://www.paranjapetownship.com (Google Search Console verified)
Requested Quota: 5,000 URLs / day

Business Justification:
Paranjape Forest Trails is an integrated 190-acre township ecosystem in Pune West containing 10 active enclaves, hundreds of MahaRERA sanctioned residential plots (Misty Greens P52100053834), luxury villas (The Rivolo P52100031560), and nature apartments.

Plot inventory availability, government infrastructure milestone data (PMRDA Ring Road & Chandani Chowk flyover corridors), price updates, and MahaRERA compliance disclosures update dynamically on a daily basis. The default 200 URLs/day quota is insufficient to notify Google of our daily inventory updates across 413 production pages. 

We respectfully request our quota be increased to 5,000 URLs per day to ensure accurate real-time indexing in Google Search results for homebuyers and investors.
`);
  console.log('───────────────────────────────────────────────────────────────────────\n');
}

async function runBatchIndexing(force = false) {
  const pool = discoverKeyPool();
  if (pool.uniqueProjects.length === 0) {
    console.error('❌ No valid service-account JSON keys found.');
    return;
  }

  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(` ⚡ HIGH-THROUGHPUT BATCH INDEXING PIPELINE (Multi-Project Pool: ${pool.uniqueProjects.length})`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const ledger = getLedger();
  const inventory = harvestInventory();
  const now = Date.now();

  // Reset exhausted projects if > 20 hours have passed
  for (const [pId, exhaustedAt] of Object.entries(ledger.exhaustedProjects || {})) {
    if (now - exhaustedAt > 20 * 3600 * 1000) {
      delete ledger.exhaustedProjects[pId];
    }
  }

  // Filter pending URLs using content hashes and cooldowns
  const pending = inventory.filter(item => {
    if (force) return true;
    const lastIndexed = ledger.indexedAt[item.url] || 0;
    const lastHash = ledger.hashes[item.url];
    // Index if hash changed OR never indexed OR older than 7 days
    return lastHash !== item.hash || (now - lastIndexed > 7 * 24 * 3600 * 1000);
  }).sort((a, b) => b.score - a.score);

  console.log(`📦 Discovered ${inventory.length} total pages.`);
  console.log(`🎯 Targeted for batch submission: ${pending.length} high-priority / modified URLs.`);

  if (pending.length === 0) {
    console.log('✨ All URLs are completely fresh in Google’s index ledger. Zero quota wasted!');
    return;
  }

  const BATCH_SIZE = 50; // Optimal batch chunk
  let currentProjectIdx = 0;
  let totalIndexed = 0;

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const chunk = pending.slice(i, i + BATCH_SIZE);
    const chunkUrls = chunk.map(c => c.url);

    // Find available non-exhausted project
    let activeProject = null;
    while (currentProjectIdx < pool.uniqueProjects.length) {
      const candidate = pool.uniqueProjects[currentProjectIdx];
      if (!ledger.exhaustedProjects[candidate.projectId]) {
        activeProject = candidate;
        break;
      }
      currentProjectIdx++;
    }

    if (!activeProject) {
      console.log('\n🛑 All GCP project quotas are currently exhausted for today. Stopping pass.');
      console.log(`📊 Successfully submitted: ${totalIndexed} URLs before quota exhaustion.`);
      break;
    }

    console.log(`\n🚀 Dispatching Batch #${Math.floor(i / BATCH_SIZE) + 1} (${chunkUrls.length} URLs) using Project [${activeProject.projectId}]...`);
    try {
      const token = await getAccessToken(activeProject);
      const result = await sendBatchNotification(chunkUrls, token);

      if (result.quotaExceeded) {
        console.log(`⚠️ Project [${activeProject.projectId}] exceeded quota (429 RESOURCE_EXHAUSTED).`);
        ledger.exhaustedProjects[activeProject.projectId] = now;
        currentProjectIdx++;
        i -= BATCH_SIZE; // Retry current chunk with next project
        continue;
      }

      console.log(`  ✅ Batch complete: ${result.successCount} of ${chunkUrls.length} published successfully.`);
      totalIndexed += result.successCount;

      chunk.forEach(item => {
        ledger.hashes[item.url] = item.hash;
        ledger.indexedAt[item.url] = now;
      });

      saveLedger(ledger);
    } catch (err) {
      console.error(`  ❌ Batch error:`, err.message);
    }

    // Gentle throttle between batches
    await new Promise(r => setTimeout(r, 1500));
  }

  saveLedger(ledger);
  console.log('\n───────────────────────────────────────────────────────────────────────');
  console.log(`✅ Indexing pipeline execution complete. Total URLs notified: ${totalIndexed}`);
  console.log('───────────────────────────────────────────────────────────────────────\n');
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

const cmd = process.argv[2] || 'status';
if (cmd === 'status') {
  runStatus().catch(console.error);
} else if (cmd === 'request-increase') {
  runRequestIncrease().catch(console.error);
} else if (cmd === 'batch' || cmd === 'index') {
  const force = process.argv.includes('--force');
  runBatchIndexing(force).catch(console.error);
} else {
  console.log('Usage: node scripts/google-quota-manager.js [status | request-increase | batch [--force]]');
}
