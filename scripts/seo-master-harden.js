const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const CLUSTERS = {
    "plots": "NA Bungalow Plots in Bhugaon Pune | Misty Greens | Gated Township",
    "villas": "Luxury Forest Villas in Bhugaon Pune | The Rivolo & Cove | 190-Acre Heritage",
    "apartments": "Premium 2 & 3 BHK Apartments in Bhugaon Pune | The Canopy & Verandah at Forest Trails",
    "senior-living": "Athashri Senior Living Bhugaon Pune | Best Retirement Community in West Pune",
    "amenities": "World-Class Township Amenities at Forest Trails Bhugaon | The Cliff Club & Equestrian Academy",
    "default": "Paranjape Forest Trails Bhugaon | 190-Acre Integrated Nature Township Pune"
};

function getCluster(filePath) {
    const p = filePath.toLowerCase();
    if (p.includes('plot') || p.includes('misty-greens')) return 'plots';
    if (p.includes('villa') || p.includes('rivolo') || p.includes('cove')) return 'villas';
    if (p.includes('apart') || p.includes('canopy') || p.includes('verandah')) return 'apartments';
    if (p.includes('athashri') || p.includes('senior')) return 'senior-living';
    if (p.includes('amenities') || p.includes('club') || p.includes('school')) return 'amenities';
    return 'default';
}

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
console.log(`🛠 Starting Semantic Hardening on ${htmlFiles.length} files...`);

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    const rel = path.relative(ROOT, file);
    
    // 1. H1 Hardening
    const cluster = CLUSTERS[getCluster(rel)];
    const cleanName = path.basename(file === 'index.html' ? path.dirname(file) : file, '.html').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const h1Value = `${cluster} - ${cleanName}`;

    // Replace or Inject H1
    if (content.includes('<h1')) {
        content = content.replace(/<h1(.*?)>([\s\S]*?)<\/h1>/i, `<h1$1>${h1Value}</h1>`);
    } else {
        // Inject after <header> or <body>
        content = content.replace(/<\/header>/i, `</header>\n    <h1 style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;">${h1Value}</h1>`);
    }

    // 2. Image ALT Saturation
    // Look for images missing alt or with weak alts
    content = content.replace(/<img\s+(?![^>]*\balt=["'])([^>]+)>/gi, (match, p1) => {
        return `<img ${p1} alt="${h1Value} - Property Image">`;
    });

    // 3. Web Vitals: Lazy Loading
    content = content.replace(/<img\s+(?![^>]*\bloading=["'])([^>]+)>/gi, (match, p1) => {
        // If it's a hero image or in the first 2000 chars, don't lazy load? 
        // Simple heuristic: all images in subpages are non-critical
        return `<img ${p1} loading="lazy" decoding="async">`;
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`✅ Success: Hardened ${modifiedCount} files for Semantic Dominance.`);
