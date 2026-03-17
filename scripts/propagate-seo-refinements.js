#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const SITE_URL = 'https://paranjape-mistygreens.in/';

/**
 * Propagates Breadcrumb UI and Absolute Canonicals to all HTML files.
 */
function propagateRefinements() {
    const files = getHtmlFiles(ROOT_DIR);
    
    files.forEach(file => {
        if (file.includes('node_modules') || file.includes('.git')) return;
        
        let content = fs.readFileSync(file, 'utf8');
        const relativePath = path.relative(ROOT_DIR, file);
        const isRoot = relativePath === 'index.html' || relativePath === '404.html';
        
        // Determine Breadcrumb Name based on Directory
        let breadcrumbName = 'Explore';
        if (!isRoot) {
            const dir = path.dirname(relativePath).split(path.sep).pop();
            breadcrumbName = dir.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }

        // 1. Hardened Canonical
        const canonicalUrl = isRoot ? SITE_URL : `${SITE_URL}${path.dirname(relativePath)}/`;
        const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
        
        if (content.includes('<link rel="canonical"')) {
            content = content.replace(/<link rel="canonical" href="[^"]*">/, canonicalTag);
        } else {
            content = content.replace('</title>', `</title>\n    ${canonicalTag}`);
        }

        // 2. Breadcrumb UI Injection
        const breadcrumbHtml = `
        <!-- Breadcrumb UI (Phase 18) -->
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <div class="container">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="${SITE_URL}">Home</a></li>
                    <li class="breadcrumb-separator">/</li>
                    <li class="breadcrumb-item active" aria-current="page">${breadcrumbName}</li>
                </ol>
            </div>
        </nav>
`;

        if (content.includes('<main>') && !content.includes('class="breadcrumb-nav"')) {
            content = content.replace('<main>', `<main>${breadcrumbHtml}`);
        }

        fs.writeFileSync(file, content);
        console.log(`✅ Propagated to: ${relativePath}`);
    });
}

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

propagateRefinements();
