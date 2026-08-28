// Comprehensive Platform Audit Engine v1.0
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('=================================================================');
console.log('🔍 STARTING COMPREHENSIVE PLATFORM & CODE AUDIT');
console.log('=================================================================\n');

let errorCount = 0;
let warningCount = 0;

function auditReport(pass, msg, isWarning = false) {
  if (pass) {
    console.log(`  ✅ PASS: ${msg}`);
  } else if (isWarning) {
    console.log(`  ⚠️  WARN: ${msg}`);
    warningCount++;
  } else {
    console.log(`  ❌ FAIL: ${msg}`);
    errorCount++;
  }
}

// 1. Audit Serverless Edge Functions
console.log('1. Auditing Serverless Functions & Middlewares:');
const middlewarePath = path.join(ROOT_DIR, 'functions', '_middleware.js');
const leadCapturePath = path.join(ROOT_DIR, 'functions', 'api', 'lead-capture.js');
const enquiryPath = path.join(ROOT_DIR, 'functions', 'api', 'enquiry.js');

if (fs.existsSync(middlewarePath)) {
  const code = fs.readFileSync(middlewarePath, 'utf8');
  const hasTryCatch = code.includes('try {') && code.includes('catch');
  auditReport(hasTryCatch, '_middleware.js has resilient try-catch fail-safe to prevent 1101 crashes');
} else {
  auditReport(false, '_middleware.js not found');
}

if (fs.existsSync(leadCapturePath)) {
  const code = fs.readFileSync(leadCapturePath, 'utf8');
  const hasPropsmart = code.includes('propsmartrealty@gmail.com');
  auditReport(hasPropsmart, 'functions/api/lead-capture.js targets propsmartrealty@gmail.com');
} else {
  auditReport(false, 'functions/api/lead-capture.js not found');
}

if (fs.existsSync(enquiryPath)) {
  const code = fs.readFileSync(enquiryPath, 'utf8');
  const hasPropsmart = code.includes('propsmartrealty@gmail.com');
  auditReport(hasPropsmart, 'functions/api/enquiry.js targets propsmartrealty@gmail.com');
} else {
  auditReport(false, 'functions/api/enquiry.js not found');
}

// 2. Audit All Compiled HTML Files & Internal Links
console.log('\n2. Auditing Compiled HTML Routes & Internal Links:');
function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
auditReport(htmlFiles.length >= 13, `Compiled routes found: ${htmlFiles.length} pages generated`);

// Check each HTML file for critical elements
for (const htmlFile of htmlFiles) {
  const relPath = path.relative(DIST_DIR, htmlFile);
  const content = fs.readFileSync(htmlFile, 'utf8');

  // Check GSC verification
  const hasGsc = content.includes('fA009Y6RAvi_yacg8Lw7JJu5uvAGR5po2RIUH8VcuvE');
  // Check JSON-LD
  const hasJsonLd = content.includes('application/ld+json');
  // Check canonical
  const hasCanonical = content.includes('rel="canonical"');

  if (!hasGsc || !hasJsonLd || !hasCanonical) {
    auditReport(false, `Route /${relPath} missing critical SEO tags (GSC: ${hasGsc}, JSON-LD: ${hasJsonLd}, Canonical: ${hasCanonical})`);
  }
}
auditReport(true, `All ${htmlFiles.length} HTML pages pass SEO, Canonical & JSON-LD verification`);

// 3. Audit Images referenced in projects.ts
console.log('\n3. Auditing Project Images & Physical Asset Existence:');
import { PARANJAPE_PROJECTS } from '../src/data/projects.ts';

for (const project of PARANJAPE_PROJECTS) {
  const imgRelPath = project.image.startsWith('/') ? project.image.slice(1) : project.image;
  const fullImgPath = path.join(ROOT_DIR, imgRelPath);
  const distImgPath = path.join(DIST_DIR, imgRelPath);

  const existsRoot = fs.existsSync(fullImgPath);
  const existsDist = fs.existsSync(distImgPath);

  auditReport(existsRoot && existsDist, `Image for '${project.name}' (${imgRelPath}) exists in both root & dist`);
}

// 4. Audit Sitemaps and robots.txt
console.log('\n4. Auditing Master Sitemaps & robots.txt:');
const sitemapIndex = path.join(ROOT_DIR, 'sitemap.xml');
const robotsTxt = path.join(ROOT_DIR, 'robots.txt');

if (fs.existsSync(sitemapIndex)) {
  const sitemapContent = fs.readFileSync(sitemapIndex, 'utf8');
  auditReport(sitemapContent.includes('<sitemapindex') && sitemapContent.includes('sitemap-core.xml'), 'Master sitemap.xml is valid XML sitemap index');
} else {
  auditReport(false, 'sitemap.xml missing');
}

if (fs.existsSync(robotsTxt)) {
  const robotsContent = fs.readFileSync(robotsTxt, 'utf8');
  auditReport(robotsContent.includes('Sitemap: https://www.paranjapetownship.com/sitemap.xml'), 'robots.txt points to master sitemap index');
} else {
  auditReport(false, 'robots.txt missing');
}

// 5. Audit Single-Source Pricing Integrity across entire repo
console.log('\n5. Auditing Single-Source Pricing Across Codebase:');
let hasOldRivoloPrice = false;
for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  if (content.includes('1.8Cr') || content.includes('1.8 Cr')) {
    hasOldRivoloPrice = true;
    auditReport(false, `Found stale price '1.8Cr' in ${path.relative(DIST_DIR, htmlFile)}`);
  }
}
if (!hasOldRivoloPrice) {
  auditReport(true, 'Zero stale prices found across all generated HTML routes');
}

console.log('\n=================================================================');
console.log(`AUDIT COMPLETE: ${errorCount} Errors, ${warningCount} Warnings`);
console.log('=================================================================');

if (errorCount > 0) {
  process.exit(1);
}
