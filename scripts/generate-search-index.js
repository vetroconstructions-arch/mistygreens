const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(BASE_DIR, 'search-index.json');

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            const excludeDirs = ['node_modules', 'scripts', 'components', 'fonts', 'styles', 'assets', '.wrangler', '.venv', '.well-known'];
            if (!file.startsWith('.') && !excludeDirs.includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function extractMetadata(html, filePath) {
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const h1Match = html.match(/<h1>([\s\S]*?)<\/h1>/i);
    const metaDescMatch = html.match(/<meta name="description" content="([\s\S]*?)"/i);
    
    const relativePath = '/' + path.relative(BASE_DIR, filePath).replace(/\\/g, '/');
    const url = relativePath.endsWith('index.html') ? relativePath.replace('index.html', '') : relativePath;

    return {
        url: url,
        title: titleMatch ? titleMatch[1].trim() : '',
        h1: h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '',
        description: metaDescMatch ? metaDescMatch[1].trim() : '',
        category: url.split('/')[1] || 'General'
    };
}

function generateIndex() {
    console.log("🔍 Scanning ecosystem for Search Indexing...");
    const files = getAllHtmlFiles(BASE_DIR);
    const index = [];

    files.forEach(file => {
        const html = fs.readFileSync(file, 'utf8');
        index.push(extractMetadata(html, file));
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
    console.log(`✅ Search Index Generated: ${index.length} pages mapped to search-index.json`);
}

generateIndex();
