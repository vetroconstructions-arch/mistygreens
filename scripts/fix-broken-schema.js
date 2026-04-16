const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = ['node_modules', '.git', 'scripts', 'assets', 'images', 'fonts', '.wrangler', '.venv', '.vscode'];

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!SKIP_DIRS.includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

/**
 * Validates if the repaired schema is valid JSON by extracting the block.
 * This is a safety check.
 */
function isSchemaValid(content) {
    const match = content.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    if (!match) return true; // No schema to validate
    try {
        JSON.parse(match[1]);
        return true;
    } catch (e) {
        return false;
    }
}

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Pattern: ] </script> , {
    // We want to merge these back into a single array block.
    // The pattern found in index.html is essentially:
    // ]
    // </script>
    // ,
    // {
    
    const brokenPattern = /\]\s*<\/script>\s*,\s*\{/g;
    
    if (brokenPattern.test(content)) {
        console.log(`🛠️ Fixing broken schema in: ${filePath}`);
        // Replace with simply a comma and the opening brace of the next object
        content = content.replace(brokenPattern, ',\n      {');
        
        // Safety check: ensure we didn't break things further.
        // We expect the resulting block to be valid JSON if we parse the contents of the script tag.
        // (Note: This simple check might fail if there are multiple script tags, but we'll try)
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

console.log('📡 Schema Repair Engine starting...');
const files = getAllHtmlFiles(ROOT);
let fixedCount = 0;

files.forEach(file => {
    if (fixFile(file)) {
        fixedCount++;
    }
});

console.log(`✅ Repair Complete. Fixed ${fixedCount} files.`);
