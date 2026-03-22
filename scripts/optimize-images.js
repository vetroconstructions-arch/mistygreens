const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../images');

async function optimizeImages() {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const ext = path.extname(file);
            const base = path.basename(file, ext);
            const inputPath = path.join(dir, file);
            const outputPath = path.join(dir, `${base}.webp`);
            
            try {
                await sharp(inputPath)
                    .webp({ quality: 80, effort: 6 })
                    .toFile(outputPath);
                console.log(`Converted: ${file} -> ${base}.webp`);
                // Optional: remove original after conversion to save space and force usage of webp.
                // fs.unlinkSync(inputPath);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

optimizeImages().then(() => console.log('Image optimization complete!'));
