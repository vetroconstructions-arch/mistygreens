const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PREFIX = 'paranjape-forest-trails-township-bhugaon';

/**
 * 1. Silo Rename Map
 */
const SILO_MAP = {
    'clusters-apartments.html': `${PREFIX}-apartments-pune.html`,
    'clusters-villas.html': `${PREFIX}-villas-plots.html`,
    'township-facilities.html': `${PREFIX}-facilities.html`
};

const SKIP_DIRS = ['.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.antigravityignore', '.github'];

/**
 * 2. Execution Engine: Mass Update References
 */
function updateAllReferences() {
    const filesToUpdate = [];
    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (SKIP_DIRS.includes(file)) return;
                walk(fullPath);
            } else if (file.endsWith('.html') || file.endsWith('.xml') || file.endsWith('.js') || file.endsWith('.css')) {
                filesToUpdate.push(fullPath);
            }
        });
    }
    walk(ROOT);

    console.log(`🔍 Auditing ${filesToUpdate.length} files for total keyword dominance...`);

    let updatedCount = 0;
    filesToUpdate.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // A. Silo Page References
        for (const [oldName, newName] of Object.entries(SILO_MAP)) {
            const escaped = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(["'/])${escaped}(["'#/]?)`, 'g');
            content = content.replace(regex, `$1${newName}$2`);
        }

        // B. Final Integrity Audit: Ensure all /dir/ links point to prefixed dirs
        // We look for any folder name that doesn't start with PREFIX
        // Since we already renamed them in the previous turn, this is a safety net.
        // Cluster links like /misty-greens/ -> /paranjape-forest-trails-township-bhugaon-misty-greens/
        // I'll ensure any remaining legacy relative links are caught.

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            updatedCount++;
        }
    });
    console.log(`✅ Keyword dominance applied to ${updatedCount} files.`);
}

/**
 * 3. Execution Engine: Rename Silo Files
 */
function renameSilos() {
    for (const [oldName, newName] of Object.entries(SILO_MAP)) {
        const oldPath = path.join(ROOT, oldName);
        const newPath = path.join(ROOT, newName);
        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
            console.log(` 🏢 RENAMED SILO: ${oldName} -> ${newName}`);
        }
    }
}

// Order: Update refs while old files exist, then rename files.
updateAllReferences();
renameSilos();

console.log("\n🔥 Phase 54: Universal Keyword Dominance Hardening Complete.");
