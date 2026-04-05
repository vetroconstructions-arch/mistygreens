const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PREFIX = 'paranjape-forest-trails-township-bhugaon';
const SITE = 'https://paranjapetownship.com';
const THANK_YOU = `${SITE}/thank-you.html`;

const SKIP_DIRS = ['.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.antigravityignore', '.github'];

/**
 * 1. Build Directory Map (Prefixing everything with the township string)
 */
function buildMap() {
    const map = {};
    const items = fs.readdirSync(ROOT);
    
    items.forEach(item => {
        const fullPath = path.join(ROOT, item);
        if (fs.statSync(fullPath).isDirectory()) {
            if (SKIP_DIRS.includes(item)) return;

            // Normalize and prefix
            let coreName = item.toLowerCase()
                .replace(/ /g, '-')
                .replace(/--+/g, '-')
                .replace(/^forest-trails-/, '')
                .replace(/^paranjape-schemes-forest-trails-/, '')
                .replace(/^premium-township-/, '')
                .replace(/^bhugaon-/, '');
                
            // Avoid double prefixing if it's already there
            if (coreName.startsWith(PREFIX)) {
                coreName = coreName.replace(PREFIX + '-', '');
            }

            const newName = `${PREFIX}-${coreName}`;
            
            if (item !== newName) {
                map[item] = newName;
            }
        }
    });
    return map;
}

/**
 * 2. Update All Files (Links, Canonical, Forms, Sitemap)
 */
function updateAllFiles(map) {
    const filesToAudit = [];
    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (SKIP_DIRS.includes(file)) return;
                walk(fullPath);
            } else if (file.endsWith('.html') || file.endsWith('.xml') || file.endsWith('.js') || file.endsWith('.css')) {
                filesToAudit.push(fullPath);
            }
        });
    }
    walk(ROOT);

    console.log(`🔍 Auditing ${filesToAudit.length} files for technical SEO & Conversion...`);

    let filesUpdated = 0;
    filesToAudit.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // A. Form Fix (Professionalsim)
        if (filePath.endsWith('.html')) {
            // Find all forms that use FormSubmit and ensure they have the _next hidden field
            if (content.includes('formsubmit.co')) {
                // Remove existing _next if present to ensure it's correct
                content = content.replace(/<input[^>]+name="_next"[^>]*>/g, '');
                // Inject fresh _next before the first button or end of form
                content = content.replace(/(<form[^>]*>)/, `$1\n    <input type="hidden" name="_next" value="${THANK_YOU}">\n    <input type="hidden" name="_captcha" value="false">`);
            }
        }

        // B. Mass URL Refactor
        for (const [oldRel, newRel] of Object.entries(map)) {
            // Match /oldRel/ "oldRel/" 'oldRel/' /oldRel "oldRel" 'oldRel'
            const escaped = oldRel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(["'/])${escaped}(["'/]?)`, 'g');
            content = content.replace(regex, (match, p1, p2) => {
                return `${p1}${newRel}${p2}`;
            });
        }

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            filesUpdated++;
        }
    });
    console.log(`✅ Technical SEO & Conversion applied to ${filesUpdated} files.`);
}

/**
 * 3. Execution Engine
 */
const finalMap = buildMap();
console.log(`📦 Targeted ${Object.keys(finalMap).length} directories for search dominance.`);

// Update file content while paths still exist
updateAllFiles(finalMap);

// Rename directories
for (const [oldDir, newDir] of Object.entries(finalMap)) {
    const oldPath = path.join(ROOT, oldDir);
    const newPath = path.join(ROOT, newDir);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(` 📂 MOVED: ${oldDir} -> ${newDir}`);
    }
}

console.log("\n🔥 Hard-Force SEO Sync Complete.");
console.log("Ready for Google Indexing API ping.");
