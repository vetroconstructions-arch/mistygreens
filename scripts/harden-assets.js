#!/usr/bin/env node
/**
 * Sovereign Asset hardener (Phase 13.2)
 * Site-wide automated WebP/AVIF substitution for HTML files.
 */
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'images');

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scripts' && file !== 'brain' && file !== 'images') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function hardenAssets() {
    console.log("🚀 Starting Sovereign Asset Hardening...");
    const htmlFiles = getAllHtmlFiles(PROJECT_ROOT);
    let totalReplacements = 0;

    htmlFiles.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf-8');
        let fileChanged = false;

        // Handle both relative and absolute paths
        const imgRegex = /src=["'](\/?images\/[^"']+\.(jpg|png))["']/g;
        const bgRegex = /url\(["']?(\/?images\/[^"')]+\.(jpg|png))["']?\)/g;

        content = content.replace(imgRegex, (match, p1, p2) => {
            const cleanPath = p1.startsWith('/') ? p1.slice(1) : p1;
            const webpPath = p1.replace(`.${p2}`, '.webp');
            const physicalWebP = path.join(PROJECT_ROOT, cleanPath.replace(`.${p2}`, '.webp'));
            
            if (fs.existsSync(physicalWebP)) {
                fileChanged = true;
                totalReplacements++;
                return match.replace(p1, webpPath);
            }
            return match;
        });

        content = content.replace(bgRegex, (match, p1, p2) => {
            const webpPath = p1.replace(`.${p2}`, '.webp');
            if (fs.existsSync(path.join(PROJECT_ROOT, webpPath))) {
                fileChanged = true;
                totalReplacements++;
                return match.replace(p1, webpPath);
            }
            return match;
        });

        if (fileChanged) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`✅ Hardened: ${path.relative(PROJECT_ROOT, filePath)}`);
        }
    });

    console.log(`✨ Asset Hardening Complete. Total references upgraded: ${totalReplacements}`);
}

hardenAssets();
