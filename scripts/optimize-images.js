const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const IMAGE_DIRS = [
    path.join(ROOT, 'images'),
    path.join(ROOT, 'sectors'),
    path.join(ROOT, 'amenities'),
    path.join(ROOT, 'blogs')
];

let count = 0;

async function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.name.match(/\.(jpg|jpeg|png)$/i)) {
            const ext = path.extname(entry.name);
            const base = path.basename(entry.name, ext);
            const outputPath = path.join(dir, `${base}.webp`);
            
            // Check if webp already exists and is newer than source
            if (fs.existsSync(outputPath)) {
                const sourceStat = fs.statSync(fullPath);
                const targetStat = fs.statSync(outputPath);
                if (targetStat.mtime > sourceStat.mtime) continue;
            }

            try {
                await sharp(fullPath)
                    .webp({ quality: 85, effort: 6 })
                    .toFile(outputPath);
                count++;
                console.log(`Converted: ${path.relative(ROOT, fullPath)} -> ${base}.webp`);
            } catch (err) {
                console.error(`Error processing ${entry.name}:`, err);
            }
        }
    }
}

async function run() {
    console.log("🚀 Starting Recursive WebP Optimization (Phase 21.2)...");
    for (const dir of IMAGE_DIRS) {
        await processDirectory(dir);
    }
    console.log(`\n🎯 Successfully optimized ${count} visual assets.`);
}

run();
