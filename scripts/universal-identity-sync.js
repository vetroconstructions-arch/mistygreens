const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PREFIX = 'paranjape-forest-trails-township-bhugaon';

/**
 * 1. Global Identity Map (Partial -> Exact)
 */
const IDENTITY_MAP = {
    '/paranjape-forest-trails-township-bhugaon-misty-greens-plots/': '/paranjape-forest-trails-township-bhugaon-misty-greens/',
    '/paranjape-forest-trails-township-bhugaon-canopy-apartments/': '/paranjape-forest-trails-township-bhugaon-the-canopy/',
    '/paranjape-forest-trails-township-bhugaon-verandah-flats/': '/paranjape-forest-trails-township-bhugaon-verandah/',
    '/paranjape-forest-trails-township-bhugaon-villas/': '/paranjape-forest-trails-township-bhugaon-luxury-forest-villas-bhugaon/',
    '/paranjape-forest-trails-township-bhugaon-villas-plots/': '/paranjape-forest-trails-township-bhugaon-villas-plots.html',
    '/paranjape-forest-trails-township-bhugaon-apartments/': '/paranjape-forest-trails-township-bhugaon-apartments-pune.html',
    '/paranjape-forest-trails-township-bhugaon-facilities/': '/paranjape-forest-trails-township-bhugaon-facilities.html'
};

const SKIP_DIRS = ['.git', 'node_modules', 'scripts', 'images', 'assets', 'fonts', '.well-known', 'components', 'styles', 'brain', '.venv', '.vscode', '.antigravityignore', '.github'];

function finalizeIdentity() {
    const files = [];
    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (SKIP_DIRS.includes(file)) return;
                walk(fullPath);
            } else if (file.endsWith('.html') || file.endsWith('.xml') || file.endsWith('.js')) {
                files.push(fullPath);
            }
        });
    }
    walk(ROOT);

    console.log(`🔍 Finalizing Identity for ${files.length} files...`);

    let updatedCount = 0;
    files.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        for (const [partial, exact] of Object.entries(IDENTITY_MAP)) {
            // Match "partial" or 'partial' 
            const escaped = partial.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(["'])${escaped}(["'])`, 'g');
            content = content.replace(regex, `$1${exact}$2`);
        }

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            updatedCount++;
        }
    });

    console.log(`✅ Universal Identity Sync complete for ${updatedCount} files.`);
}

finalizeIdentity();
