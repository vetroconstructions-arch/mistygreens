/**
 * Phase 26: Unified Master Architecture & SEO Propagation Engine
 * Unifies Navigation, Footer, Premium Modals, Breadcrumbs, and Canonicals.
 * Forces Absolute-Root paths for stability across all 63+ folders.
 * Source of Truth: index.html
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = process.cwd();
const MASTER_FILE = 'index.html';
const VERSION = '1.7'; // Global Cache-Bust
const SITE_URL = 'https://paranjape-mistygreens.in';

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['node_modules', 'assets', 'images', 'brain', 'scripts', '.git', '.wrangler', 'fonts', 'styles'].includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

/**
 * Converts relative paths to absolute-root paths
 */
function makeAbsolute(html) {
    if (!html) return '';
    return html
        .replace(/(href|src)="(?!\/|http|https|#|tel:|mailto:|data:)([^"]*)"/g, '$1="/$2"')
        .replace(/="\/\//g, '="/'); // Fix potential double slashes
}

function propagate() {
    if (!fs.existsSync(MASTER_FILE)) {
        console.error(`❌ Master file ${MASTER_FILE} not found.`);
        return;
    }

    const masterContent = fs.readFileSync(MASTER_FILE, 'utf8');
    
    // 1. Extract Master Components
    const headerMatch = masterContent.match(/<header class="header-main"[\s\S]*?<\/header>/);
    const footerMatch = masterContent.match(/<footer class="footer-main"[\s\S]*?<\/footer>/);
    
    // Use IDs for more robust extraction, matching until the next big block or body end
    const conciergeModalMatch = masterContent.match(/<div class="concierge-modal" id="heritage-concierge"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>\s*<\/div>/);
    const masterPlanModalMatch = masterContent.match(/<div class="master-plan-modal" id="master-plan-modal"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>\s*<\/div>/);
    const conversionPillMatch = masterContent.match(/<div class="conversion-pill[\s\S]*?id="callback-pill">[\s\S]*?<\/div>\s*<\/div>/);

    if (!headerMatch || !footerMatch) {
        if (!headerMatch) console.error('❌ Header [header-main] not found in index.html');
        if (!footerMatch) console.error('❌ Footer [footer-main] not found in index.html');
        return;
    }

    // Process components
    const newHeader = makeAbsolute(headerMatch[0]);
    const newFooter = makeAbsolute(footerMatch[0]);
    const newConcierge = conciergeModalMatch ? makeAbsolute(conciergeModalMatch[0]) : '';
    const newMasterPlan = masterPlanModalMatch ? makeAbsolute(masterPlanModalMatch[0]) : '';
    const newPill = conversionPillMatch ? makeAbsolute(conversionPillMatch[0]) : '';
    const newPillCss = '<link rel="stylesheet" href="/conversion-pill.css">';

    const SPECULATION_RULES = `
    <!-- Speculation Rules API (Zero-ms Load) -->
    <script type="speculationrules">
    {
      "prerender": [
        {
          "where": {"href_matches": "/*"},
          "eagerness": "moderate"
        }
      ]
    }
    </script>
    `;

    const MODALS_BLOCK = `
    ${newConcierge}
    ${newMasterPlan}
    ${newPill}
    ${newPillCss}
    ${SPECULATION_RULES}
    `;

    const allFiles = getAllHtmlFiles(BASE_DIR);
    console.log(`🔍 Found ${allFiles.length} HTML files to synchronize.`);

    allFiles.forEach(filePath => {
        let html = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(BASE_DIR, filePath);
        const dirName = path.dirname(relativePath);
        const fileName = path.basename(relativePath);
        const isRoot = dirName === '.';

        // Skip master file itself for component injection to avoid recursion mess, 
        // but handle its paths/versioning
        
        // A. Header Sync
        const HEADER_MARKER = '    <!-- Architectural Navigation (Global Sync v1.7) -->';
        html = html.replace(/<!-- Architectural Navigation[\s\S]*?-->/g, ''); // Clean old markers
        
        if (!isRoot && html.includes('<header class="header-main">')) {
            html = html.replace(/<header class="header-main">[\s\S]*?<\/header>/, `${HEADER_MARKER}\n${newHeader}`);
        } else if (!isRoot && html.includes('<nav class="nav-main">')) {
             html = html.replace(/<nav class="nav-main">[\s\S]*?<\/nav>/, `${HEADER_MARKER}\n${newHeader}`);
        }

        // B. Footer Sync
        if (!isRoot && html.includes('<footer class="footer-main">')) {
            html = html.replace(/<footer class="footer-main">[\s\S]*?<\/footer>/, newFooter);
        }

        // C. Clean & Inject Modals before </body>
        if (!isRoot) {
            // Clean all variations of old injections
            html = html.replace(/<!-- Premium Enquiry Modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
            html = html.replace(/<div class="concierge-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
            html = html.replace(/<!-- Master Plan Lead Magnet Modal -->[\s\S]*?<div class="master-plan-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
            html = html.replace(/<!-- Premium Master Plan Modal[\s\S]*?<div class="master-plan-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
            html = html.replace(/<div class="master-plan-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
            html = html.replace(/<!-- Elite Conversion Pill -->[\s\S]*?<div class="conversion-pill[\s\S]*?<\/div>\s*<link rel="stylesheet" href="\/conversion-pill.css">/g, '');
            html = html.replace(/<div class="conversion-pill[\s\S]*?<\/div>/g, '');
            html = html.replace(/<link rel="stylesheet" href="\/conversion-pill.css">/g, '');
            html = html.replace(/<link rel="stylesheet" href="conversion-pill.css">/g, '');

            if (html.includes('</body>')) {
                html = html.replace('</body>', `${MODALS_BLOCK.trim()}\n</body>`);
            }
        }

        // D. Path & Versioning Correction (Apply to ALL files)
        html = html.replace(/(href|src)="([^"]*\/)?style\.css(\?v=[^"]*)?"/g, `$1="/style.css?v=${VERSION}"`);
        html = html.replace(/(href|src)="([^"]*\/)?script\.js(\?v=[^"]*)?"/g, `$1="/script.js?v=${VERSION}"`);

        // E. SEO: Canonical Hardening
        let canonicalUrl;
        if (isRoot) {
            if (fileName === 'index.html') {
                canonicalUrl = `${SITE_URL}/`;
            } else {
                canonicalUrl = `${SITE_URL}/${fileName}`;
            }
        } else {
            canonicalUrl = `${SITE_URL}/${dirName}/`;
        }

        const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
        if (html.includes('<link rel="canonical"')) {
            html = html.replace(/<link rel="canonical" href="[^"]*">/, canonicalTag);
        } else if (html.includes('</title>')) {
            html = html.replace('</title>', `</title>\n    ${canonicalTag}`);
        }

        // F. SEO: Breadcrumb Injection
        if (html.includes('<main>')) {
            let breadcrumbName;
            if (isRoot) {
                if (fileName === 'index.html') {
                    breadcrumbName = "Home"; // Usually not visible on home
                } else {
                    breadcrumbName = fileName.replace('.html', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                }
            } else {
                const lastPart = dirName.split(/[/\\]/).pop();
                breadcrumbName = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }

            if (!isRoot || fileName !== 'index.html') {
                const breadcrumbHtml = `
    <!-- Breadcrumb UI (Phase 26 Consolidated) -->
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <div class="container">
            <ol class="breadcrumb-list">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-separator">/</li>
                <li class="breadcrumb-item active" aria-current="page">${breadcrumbName}</li>
            </ol>
        </div>
    </nav>`;
                
                // Clean old breadcrumbs
                html = html.replace(/<!-- Breadcrumb UI[\s\S]*?<\/nav>/g, '');
                html = html.replace('<main>', `<main>\n    ${breadcrumbHtml.trim()}`);
            }
        }

        fs.writeFileSync(filePath, html, 'utf8');
    });

    console.log(`✨ Global Sync Complete. ${allFiles.length} files processed with v${VERSION} standards.`);
}

propagate();
