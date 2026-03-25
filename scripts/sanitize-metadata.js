const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();

function sanitizeFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Sanitize <title> tags
    content = content.replace(/<title>(.*?)<\/title>/gi, (match, titleContent) => {
        const plainText = titleContent.replace(/<[^>]*>/g, '').trim();
        if (titleContent !== plainText) {
            modified = true;
            console.log(`[TITLE FIX] ${path.relative(ROOT_DIR, filePath)}: "${plainText}"`);
            return `<title>${plainText}</title>`;
        }
        return match;
    });

    // 2. Sanitize <meta name="description" content="..."> tags
    content = content.replace(/(<meta name="description" content=")(.*?)(")/gi, (match, prefix, metaContent, suffix) => {
        const plainText = metaContent.replace(/<[^>]*>/g, '').trim();
        if (metaContent !== plainText) {
            modified = true;
            console.log(`[DESC FIX] ${path.relative(ROOT_DIR, filePath)}`);
            return `${prefix}${plainText}${suffix}`;
        }
        return match;
    });

    // 3. Sanitize <meta name="keywords" content="..."> tags
    content = content.replace(/(<meta name="keywords" content=")(.*?)(")/gi, (match, prefix, metaContent, suffix) => {
        const plainText = metaContent.replace(/<[^>]*>/g, '').trim();
        if (metaContent !== plainText) {
            modified = true;
            console.log(`[KEYWORDS FIX] ${path.relative(ROOT_DIR, filePath)}`);
            return `${prefix}${plainText}${suffix}`;
        }
        return match;
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scripts') {
                walkDir(fullPath);
            }
        } else if (file.endsWith('.html')) {
            sanitizeFile(fullPath);
        }
    });
}

console.log('🛡️ Starting GSC Metadata Sanitization...');
// Process root index separately if needed, but walkDir should cover it
sanitizeFile(path.join(ROOT_DIR, 'index.html'));
walkDir(ROOT_DIR);
console.log('✅ Metadata Sanitization Complete.');
