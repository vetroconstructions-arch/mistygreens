const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let updated = 0;

walkDir('/Users/vikasyewle/paranjapeplots', function(filePath) {
    if ((filePath.endsWith('.html') || filePath.endsWith('.js')) && !filePath.includes('node_modules')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace 768px with 1024px for the mobile sticky bar media query
        const regex = /(\.mobile-sticky-bar\s*\{\s*display:\s*none;?\s*\}\s*)@media\s*\(\s*max-width:\s*768px\s*\)\s*\{/g;
        
        content = content.replace(regex, '$1@media(max-width: 1024px) {');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
            updated++;
        }
    }
});

console.log(`Total files updated: ${updated}`);
