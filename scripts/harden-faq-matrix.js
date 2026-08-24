const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const FAQ_DATA = [
    { q: "What is the latest price for Paranjape Forest Trails Plots in April 2026?", a: "The latest price for Paranjape Forest Trails plots in April 2026 starts from ₹X Cr*. For custom NA bungalow plots in Misty Greens, prices vary based on plot size and orientation. Request the live April 2026 price list for exact details." },
    { q: "Where is Paranjape Forest Trails Bhugaon located?", a: "Paranjape Forest Trails is located in Bhugaon, Pune West, just 10 minutes from Chandani Chowk and 15 minutes from Bavdhan. The 190-acre township is heart-centrally positioned along the upcoming PMRDA Ring Road." },
    { q: "Is Paranjape Forest Trails a RERA registered project?", a: "Yes, Paranjape Forest Trails is a RERA registered integrated township. The latest phases including Phase 51 and Misty Greens are fully compliant with all local PMRDA and RERA norms." },
    { q: "What amenities are available in the 190-acre Forest Trails township?", a: "Forest Trails features the world-class 'The Cliff Club', an Olympic-sized sports complex, the Equestrian Academy (Horse Riding), and multiple landscaped walking trails. Residents also enjoy proximity to the Sri Sri Ravishankar School within the township." },
    { q: "Can I buy a plot with a bank loan at Paranjape Forest Trails?", a: "Yes, NA bungalow plots at Forest Trails are bankable with leading financial institutions. We offer loan assistance and pre-approved home loan facilities for custom villa construction." }
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
console.log(`🧠 Hardening FAQ Matrix across ${htmlFiles.length} files...`);

const faqHtml = `
<!-- Sovereign FAQ Matrix (Phase 51) -->
<section class="sovereign-faq-matrix" style="padding: 4rem 2rem; background: #fffcf0; border-top: 1px solid #eee;">
    <div style="max-width: 1000px; margin: 0 auto;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; margin-bottom: 2.5rem; color: #1a1a1a; text-align: center;">Forest Trails Sovereignty FAQ</h2>
        <div style="display: grid; gap: 20px;">
            ${FAQ_DATA.map(item => `
            <div style="padding: 1.5rem; background: #fff; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <h4 style="font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.8rem; font-weight: 800;">${item.q}</h4>
                <p style="color: #444; font-size: 0.95rem; line-height: 1.7;">${item.a}</p>
            </div>`).join('\n            ')}
        </div>
    </div>
</section>
`;

let modifiedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Avoid double injection
    if (content.includes('sovereign-faq-matrix')) continue;

    const original = content;
    
    // Inject before closing </body> or at the end
    if (content.includes('</body>')) {
        content = content.replace('</body>', faqHtml + '\n</body>');
    } else {
        content += faqHtml;
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`✅ Success: Hardened FAQ Matrix for ${modifiedCount} pages.`);
