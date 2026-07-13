#!/usr/bin/env node
/**
 * Fallback shell wrapper calling generate_seo_matrix.py to ensure 100% consistent sitemaps.
 */
const { execSync } = require('child_process');
const path = require('path');

try {
    const pythonScript = path.join(__dirname, 'generate_seo_matrix.py');
    console.log(`🗺️  Calling generate_seo_matrix.py via Node.js wrapper...`);
    execSync(`python3 "${pythonScript}"`, { stdio: 'inherit' });
    console.log(`✅ fallback wrapper finished successfully.`);
} catch (e) {
    console.error(`❌ generate-sitemap.js wrapper encountered an error:`, e.message);
    process.exit(1);
}
