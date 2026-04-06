const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const LINKS = [
    { name: "NA Bungalow Plots in Bhugaon", url: "/paranjape-forest-trails-township-bhugaon-plots/" },
    { name: "Misty Greens NA Plots Pune", url: "/paranjape-forest-trails-township-bhugaon-misty-greens-plots-pune/" },
    { name: "Luxury Forest Villas Bhugaon", url: "/paranjape-forest-trails-township-bhugaon-villas/" },
    { name: "The Rivolo Premium Villas", url: "/paranjape-forest-trails-township-bhugaon-therivolo-luxury-villas-bhugaon/" },
    { name: "The Canopy Apartments Bhugaon", url: "/paranjape-forest-trails-township-bhugaon-the-canopy-apartments-bhugaon/" },
    { name: "Verandah Luxury Flats Pune", url: "/paranjape-forest-trails-township-bhugaon-verandah-luxury-flats-bhugaon/" },
    { name: "Athashri Senior Living Bhugaon", url: "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/" },
    { name: "The Cliff Club Amenities", url: "/amenities-the-cliff-club.html" },
    { name: "Equestrian Academy Pune", url: "/amenities-equestrian.html" },
    { name: "Bhugaon Property Investment", url: "/paranjape-forest-trails-township-bhugaon-property-investment-bhugaon-pune/" }
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
console.log(`🕸 Injecting Semantic Mesh into ${htmlFiles.length} files...`);

const meshHtml = `
<!-- Semantic SEO Mesh (Phase 51) -->
<section class="seo-mesh-footer" style="padding: 4rem 2rem; background: #fafaf8; border-top: 1px solid #eee; margin-top: 5rem;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #1a1a1a; margin-bottom: 2rem; border-bottom: 2px solid #d4af37; display: inline-block;">Explore Forest Trails Clusters</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
            ${LINKS.map(link => `<a href="${link.url}" style="color: #444; font-size: 0.9rem; text-decoration: none; padding: 10px; border-radius: 8px; background: #fff; border: 1px solid #eee; transition: all 0.3s ease;">${link.name} &rarr;</a>`).join('\n            ')}
        </div>
    </div>
</section>
`;

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Avoid double injection
    if (content.includes('seo-mesh-footer')) continue;

    const original = content;
    
    // Inject before closing </body> or at the end
    if (content.includes('</body>')) {
        content = content.replace('</body>', meshHtml + '\n</body>');
    } else {
        content += meshHtml;
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`✅ Success: Interconnected ${modifiedCount} pages with Semantic Mesh.`);
