/**
 * Phase 20: Digital Mesh Propagation Engine
 * Unifies Navigation and Footer Mesh across all 55+ project pages.
 */
const fs = require('fs');
const path = require('path');

const MASTER_FILE = 'index.html';

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'assets' && file !== 'images');
}

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'assets' && file !== 'images') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html') && filePath !== path.join(process.cwd(), MASTER_FILE)) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function propagate() {
    const masterContent = fs.readFileSync(MASTER_FILE, 'utf8');
    
    // Extract Header (including ticker and nav)
    const headerMatch = masterContent.match(/<header class="header-main">[\s\S]*?<\/header>/);
    const contextNavMatch = masterContent.match(/<div class="secondary-silo-nav context-nav-fixed">[\s\S]*?<\/div>/);
    // Extract Footer
    const footerMatch = masterContent.match(/<footer class="footer-main">[\s\S]*?<\/footer>/);

    if (!headerMatch || !footerMatch) {
        console.error('❌ Failed to extract master components from index.html');
        return;
    }

    const newHeader = headerMatch[0];
    const newContextNav = contextNavMatch ? contextNavMatch[0] : '';
    const newFooter = footerMatch[0];

    const htmlFiles = getAllHtmlFiles(process.cwd());
    console.log(`Syncing ${htmlFiles.length} files...`);

    htmlFiles.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace Header
        if (content.includes('<header class="header-main">')) {
            content = content.replace(/<header class="header-main">[\s\S]*?<\/header>/, newHeader);
            modified = true;
        }

        // Replace Context Nav
        if (content.includes('<div class="secondary-silo-nav context-nav-fixed">')) {
            content = content.replace(/<div class="secondary-silo-nav context-nav-fixed">[\s\S]*?<\/div>/, newContextNav);
            modified = true;
        }

        // Replace Footer
        if (content.includes('<footer class="footer-main">')) {
            content = content.replace(/<footer class="footer-main">[\s\S]*?<\/footer>/, newFooter);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content);
            // console.log(`✅ Sync: ${path.relative(process.cwd(), filePath)}`);
        }
    });

    console.log('✨ Propagation Complete. 50+ URLs unified under the Digital Mesh architecture.');
}

propagate();
