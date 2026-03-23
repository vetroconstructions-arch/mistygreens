const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('/Users/vikasyewle/paranjapeplots', function(filePath) {
    if (filePath.endsWith('.html') && !filePath.includes('node_modules')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Regex to match the entire mobile-menu block including its preceding comment
        const regex = /(?:[ \t]*<!--[ \t]*Mobile Off-Canvas Navigation \(Phase 1: Overhaul\)[ \t]*-->\r?\n)?[ \t]*<div class="mobile-menu" id="mobile-menu">[\s\S]*?<div class="mobile-menu-actions">[\s\S]*?<\/div>\r?\n?[ \t]*<\/div>\r?\n/g;

        content = content.replace(regex, '');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
