const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const SCRIPTS = [
    '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>',
    '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>',
    '<script defer src="/scripts/trust-engine.js"></script>'
];

function getFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const f of list) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            if (['node_modules', '.git', '.wrangler', 'components', 'scripts', 'images'].includes(f)) continue;
            getFiles(full, files);
        } else if (f.endsWith('.html')) {
            files.push(full);
        }
    }
    return files;
}

const htmlFiles = getFiles(ROOT);
console.log(`🛡 Syncing Sovereign Trust Engine into ${htmlFiles.length} files...`);

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Check if scripts are already there
    const missingScripts = SCRIPTS.filter(s => !content.includes(path.basename(s.match(/src=["'](.*?)["']/)[1])));
    
    if (missingScripts.length > 0) {
        const injection = `\n    <!-- Sovereign Trust Mesh (Sync v1.12.1) -->\n    ${missingScripts.join('\n    ')}\n`;
        
        if (content.includes('</body>')) {
            content = content.replace('</body>', injection + '</body>');
        } else {
            content += injection;
        }
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`✅ Success: Deployed Trust Mesh to ${modifiedCount} pages.`);
