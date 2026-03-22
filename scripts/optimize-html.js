const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (file === 'node_modules' || file === '.git') return;
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.html')) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

const dir = path.join(__dirname, '../');
const files = getAllHtmlFiles(dir);

const STICKY_MOBILE_BAR_HTML = `
    <!-- Mobile High-Conversion Sticky Bar -->
    <div class="mobile-sticky-bar">
        <a href="https://wa.me/917744009295" target="_blank" rel="noopener" class="mobile-sticky-btn" style="background: #25D366; color: #fff; border-right: 1px solid rgba(255,255,255,0.2);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
        </a>
        <button class="mobile-sticky-btn open-enquiry-modal" style="background: var(--pscl-dark); color: var(--pscl-gold);">
            Enquire Now
        </button>
    </div>
    <style>
        .mobile-sticky-bar { display: none; }
        @media(max-width: 768px) {
            .mobile-sticky-bar { display: flex !important; position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; box-shadow: 0 -10px 30px rgba(0,0,0,0.15); height: 65px; }
            .mobile-sticky-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 800; font-size: 0.95rem; text-transform: uppercase; border: none; text-decoration: none; font-family: 'Inter', sans-serif; cursor: pointer; letter-spacing: 0.1em; transition: background 0.3s; }
            body { padding-bottom: 65px; } 
        }
    </style>
`;

for (let filePath of files) {
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Replace .jpg with .webp specifically for images/ prefix
    html = html.replace(/images\/([^"']+)\.jpg/g, (match, p1) => {
        if (p1 === 'hero-township_test') return match;
        return `images/${p1}.webp`;
    });

    // Add loading="lazy" if missing across any <img> tags (naive approach)
    html = html.replace(/<img([^>]+)>/g, (match, p1) => {
        if (p1.includes('loading') || p1.includes('hero')) return match;
        return `<img${p1} loading="lazy" decoding="async">`;
    });

    // Inject sticky mobile bar if not present
    if (!html.includes('<!-- Mobile High-Conversion Sticky Bar -->')) {
        html = html.replace('</body>', `\n${STICKY_MOBILE_BAR_HTML}\n</body>`);
    }

    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`✅ Optimized HTML: ${filePath}`);
}
