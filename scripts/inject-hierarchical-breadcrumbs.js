const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../');

const categories = {
    'amenities': {
        label: 'Township Amenities',
        path: '/township-facilities.html'
    },
    'legal': {
        label: 'RERA & Legal',
        path: '/legal/rera-compliance-guide/'
    },
    'investment': {
        label: 'Investment Insights',
        path: '/property-investment-bhugaon-pune/'
    },
    'blogs': {
        label: 'Insights & Blogs',
        path: '/blogs/na-bungalow-plots-pune-west-guide/'
    },
    'sectors': {
        label: 'Township Sectors',
        path: '/township-facilities.html'
    },
    'comparisons': {
        label: 'Real Estate Comparison',
        path: '/why-choose-forest-trails-bhugaon/'
    },
    'location': {
        label: 'Location Guide',
        path: '/forest-trails-location-proximity/'
    }
};

const GENERIC_DESC = "Explore Paranjape Forest Trails Township, a 190-acre Integrated Township in Bhugaon Pune by Paranjape Schemes. Discover premium real estate in West Pune featuring NA bungalow plots, luxury villas, and 2, 3 & 4 BHK premium apartments.";

function getFiles(dir, fileList = [], isRoot = false) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'scripts' && file !== 'node_modules' && file !== '.git') {
                getFiles(filePath, fileList, false);
            }
        } else if (file.endsWith('.html')) {
            if (isRoot && (file === 'index.html' || file === '404.html' || file === 'thank-you.html')) return;
            fileList.push(filePath);
        }
    });
    return fileList;
}

function processFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(BASE_DIR, filePath);
    const fileName = path.basename(relativePath);
    const dirName = path.dirname(relativePath).split(path.sep)[0];
    
    // Determine Category
    let category = categories[dirName];
    if (!category && (relativePath.includes('rera-compliance') || relativePath.includes('legal'))) category = categories['legal'];
    if (!category && (relativePath.includes('price-list') || relativePath.includes('investment'))) category = categories['investment'];
    if (!category && (relativePath.includes('why-choose') || relativePath.includes('township'))) category = { label: 'Township', path: '/township-facilities.html' };
    if (!category && (fileName.startsWith('amenities-') || fileName === 'township-facilities.html')) category = categories['amenities'];

    if (!category) return; // Skip files not in a targeted category

    console.log(`Processing: ${relativePath} (Category: ${category.label})`);

    // 1. Specialize Meta Description
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].split('|')[0].trim() : "Forest Trails";
    
    if (html.includes(GENERIC_DESC)) {
        const newDesc = `Explore ${pageTitle} at Paranjape Forest Trails Bhugaon. Discover the 190-acre Sovereign township legacy, premium NA plots, and world-class ${category.label.toLowerCase()} in West Pune.`;
        html = html.replace(GENERIC_DESC, newDesc);
        console.log(`  ✅ Specialized Meta Description`);
    }

    // 2. Inject/Update Visual Breadcrumb
    const breadcrumbUI = `
    <!-- Breadcrumb UI (Phase 33 Hierarchical Mesh) -->
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <div class="container">
            <ol class="breadcrumb-list">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-separator">/</li>
                <li class="breadcrumb-item"><a href="${category.path}">${category.label}</a></li>
                <li class="breadcrumb-separator">/</li>
                <li class="breadcrumb-item active" aria-current="page">${pageTitle}</li>
            </ol>
        </div>
    </nav>
    `;

    // Remove existing breadcrumb-nav if any
    html = html.replace(/<nav class="breadcrumb-nav"[\s\S]*?<\/nav>/i, '');
    
    // Inject after header
    if (html.includes('</header>')) {
        html = html.replace('</header>', `</header>\n${breadcrumbUI}`);
        console.log(`  ✅ Injected Visual Breadcrumb`);
    }

    // 3. Inject JSON-LD BreadcrumbList
    const breadcrumbSchema = `
    <!-- BreadcrumbList Schema (Phase 33) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Forest Trails", "item": "https://paranjape-mistygreens.in/" },
            { "@type": "ListItem", "position": 2, "name": "${category.label}", "item": "https://paranjape-mistygreens.in${category.path}" },
            { "@type": "ListItem", "position": 3, "name": "${pageTitle}", "item": "https://paranjape-mistygreens.in/${relativePath.replace('index.html', '')}" }
        ]
    }
    </script>
    `;

    // Avoid duplicating breadcrumb schema
    if (!html.includes('"@type": "BreadcrumbList"')) {
        html = html.replace('</head>', `${breadcrumbSchema}\n</head>`);
        console.log(`  ✅ Injected JSON-LD Breadcrumb`);
    } else {
        // Update existing one if possible or warn
        console.warn(`  ⚠️ BreadcrumbList already exists in ${relativePath}, skipping schema injection.`);
    }

    fs.writeFileSync(filePath, html, 'utf-8');
}

const allFiles = getFiles(BASE_DIR);
allFiles.forEach(processFile);

console.log("🚀 Hierarchical Mesh Synchronization Complete!");
