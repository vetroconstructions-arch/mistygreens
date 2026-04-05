const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ATHASHRI_TICKER = '<div class="ticker-item" style="color: #FFD700; font-weight: 800;">🎉 NEW LAUNCH: Athashri Senior Living @ Forest Trails - Launching Now</div>';
const ATHASHRI_OPTION = `<label class="advisory-opt" style="display: flex; align-items: center; padding: 1.2rem; border: 2px solid #ddd; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; background: #fffcf0; border-color: var(--pscl-gold);">
                                <input type="radio" name="interest" value="athashri-senior-living" style="margin-right: 15px; accent-color: var(--pscl-maroon);">
                                <span style="font-weight: 800; color: #1a1a1a; font-size: 0.95rem;">Brand New Athashri Senior Living (Launching Now)</span>
                            </label>`;

const SKIP_DIRS = ['.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.antigravityignore', '.github'];

function syncFiles() {
    const filesToSync = [];
    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (SKIP_DIRS.includes(file)) return;
                walk(fullPath);
            } else if (file.endsWith('.html')) {
                filesToSync.push(fullPath);
            }
        });
    }
    walk(ROOT);

    console.log(`📡 Syncing ${filesToSync.length} files for Athashri Launch & Performance...`);

    filesToSync.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // 1. Athashri Ticker Injection
        if (content.includes('ticker-content')) {
            if (!content.includes('ATHASHRI_TICKER')) {
                content = content.replace(/(<div class="ticker-content">)/, `$1\n                ${ATHASHRI_TICKER}`);
            }
        }

        // 2. Athashri Modal Option Injection
        if (content.includes('enquiry-form-modal')) {
            if (!content.includes('athashri-senior-living')) {
                // Try to inject as the first option
                content = content.replace(/(<h4[^>]*>Architecture Preference\?<\/h4>\s*<div[^>]*>)/, `$1\n                            ${ATHASHRI_OPTION}`);
                // Also check for select-based modals
                content = content.replace(/(<select name="interest"[^>]*>)/, `$1\n                            <option value="athashri-senior-living">Brand New Athashri Senior Living (Launching Now)</option>`);
            }
        }

        // 3. Performance: Image WebP Sync
        // Replace hero.jpg, lifestyle.jpg, master-plan.jpg with .webp if they exist
        content = content.replace(/hero-township\.jpg/g, 'hero-township.webp');
        content = content.replace(/hero\.jpg/g, 'hero-township.webp');
        content = content.replace(/lifestyle\.jpg/g, 'verandah-pool-lifestyle.webp');
        content = content.replace(/master-plan\.jpg/g, 'master-plan.webp');
        content = content.replace(/plots\.jpg/g, 'misty-greens-gate.webp');

        // 4. Performance: Minification Sync
        content = content.replace(/style\.css/g, 'style.min.css');
        content = content.replace(/script\.js/g, 'script.min.js');

        if (content !== original) {
            fs.writeFileSync(filePath, content);
        }
    });

    console.log("✅ Global Athashri & Performance Sync Complete.");
}

syncFiles();
