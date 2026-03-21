/**
 * Sitemap Generator for Paranjape Forest Trails
 * Scans all 63+ HTML files and generates a fresh sitemap.xml
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = process.cwd();
const SITE_URL = 'https://paranjape-mistygreens.in';
const OUTPUT_FILE = 'sitemap.xml';

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['node_modules', 'assets', 'images', 'brain', 'scripts', '.git', '.wrangler', 'fonts', 'styles'].includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function generateSitemap() {
    const allFiles = getAllHtmlFiles(BASE_DIR);
    console.log(`🔍 Found ${allFiles.length} HTML files for sitemap.`);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allFiles.forEach(filePath => {
        const relativePath = path.relative(BASE_DIR, filePath);
        let urlPath = relativePath.replace(/\\/g, '/');
        
        // Clean up URL: remove index.html and handle root
        if (urlPath === 'index.html') {
            urlPath = '';
        } else if (urlPath.endsWith('/index.html')) {
            urlPath = urlPath.replace('index.html', '');
        } else if (urlPath.endsWith('.html')) {
            // Keep .html if it's not index.html, unless user wants clean URLs
            // The existing sitemap uses trailing slashes for folders
            // Let's match the existing pattern: root/folder/
        }

        const loc = `${SITE_URL}/${urlPath}`;
        const priority = urlPath === '' ? '1.0' : '0.8';
        
        xml += `  <url><loc>${loc}</loc><priority>${priority}</priority></url>\n`;
    });

    xml += '</urlset>';

    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
    console.log(`✨ Sitemap generated: ${OUTPUT_FILE} with ${allFiles.length} URLs.`);
}

generateSitemap();
