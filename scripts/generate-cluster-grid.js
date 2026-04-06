const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const projects = [
    {
        name: "Misty Greens",
        type: "NA Bungalow Plots",
        status: "85% Sold Out",
        usp: "100% Gated NA Plots in Bhugaon",
        link: "/paranjape-forest-trails-township-bhugaon-misty-greens-plots-pune/",
        image: "/images/plots.jpg",
        badge: "Bestseller"
    },
    {
        name: "Athashri",
        type: "Senior Living",
        status: "New Launch",
        usp: "Best Retirement Community in West Pune",
        link: "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
        image: "/images/lifestyle.jpg",
        badge: "New Launch"
    },
    {
        name: "The Canopy",
        type: "2 & 3 BHK Apartments",
        status: "Ready to Move",
        usp: "Hill-Top Luxury with Nature Immersion",
        link: "/paranjape-forest-trails-township-bhugaon-the-canopy-apartments-bhugaon/",
        image: "/images/canopy-realistic.webp",
        badge: "Ready Possession"
    },
    {
        name: "Verandah",
        type: "Luxury Flats",
        status: "Sovereign Living",
        usp: "Large Decks & Forest Views",
        link: "/paranjape-forest-trails-township-bhugaon-verandah-luxury-flats-bhugaon/",
        image: "/images/verandah-pool-lifestyle.webp",
        badge: "Premium"
    },
    {
        name: "The Rivolo",
        type: "Ultra-Luxury Villas",
        status: "Heritage Grade",
        usp: "Private Pool & Bespoke Architecture",
        link: "/paranjape-forest-trails-township-bhugaon-therivolo-luxury-villas-bhugaon/",
        image: "/images/landscape.jpg",
        badge: "Elite"
    },
    {
        name: "The Highlands",
        type: "Ready Apartments",
        status: "Limited Units",
        usp: "Near Chandani Chowk Connectivity",
        link: "/paranjape-forest-trails-township-bhugaon-the-highlands-forest-trails/",
        image: "/images/hero-township.webp",
        badge: "Limited"
    },
    {
        name: "The Cove",
        type: "3 BHK Bungalows",
        status: "Riverside Mastery",
        usp: "Duplex Bungalows with Gated Security",
        link: "/paranjape-forest-trails-township-bhugaon-the-cove-villas-bhugaon/",
        image: "/images/verandah-pool-lifestyle.webp",
        badge: "Featured"
    },
    {
        name: "Codename Alpha",
        type: "Next-Gen Flats",
        status: "Pre-Launch",
        usp: "Smart Homes with Forest Scape",
        link: "/paranjape-forest-trails-township-bhugaon-codename-alpha-apartments-bhugaon/",
        image: "/images/hero-township.webp",
        badge: "Upcoming"
    },
    {
        name: "Highgardens",
        type: "Elevated Residences",
        status: "Construction in Swing",
        usp: "Sovereign Heights & Low Density",
        link: "/paranjape-forest-trails-township-bhugaon-highgardens-apartments-bhugaon/",
        image: "/images/highgardens-realistic.webp",
        badge: "Hot Deal"
    }
];

function generateGridHTML() {
    let cards = projects.map(p => `
        <div class="cluster-card" data-aos="fade-up">
            <div class="cluster-img-wrap">
                <img src="${p.image}" alt="${p.name} Forest Trails - ${p.usp}" loading="lazy">
                <span class="cluster-badge">${p.badge}</span>
            </div>
            <div class="cluster-info">
                <h3 class="cluster-title">${p.name}</h3>
                <div class="cluster-meta">
                    <span>📍 Bhugaon, Pune</span>
                    <span>🏗️ ${p.type}</span>
                </div>
                <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 1.5rem;">${p.usp}</p>
                <div class="cluster-footer">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #d4af37;">${p.status}</span>
                    <a href="${p.link}" class="cluster-btn">VIEW DETAILS &rarr;</a>
                </div>
            </div>
        </div>
    `).join('');

    return `
<!-- Sovereign Cluster Grid (V2) -->
<section class="cluster-grid-section" id="township-clusters">
    <div class="container">
        <div style="text-align: center; margin-bottom: 4rem;">
            <span style="color: #d4af37; font-weight: 900; letter-spacing: 0.3rem; text-transform: uppercase; font-size: 0.7rem;">✦ Individual Projects</span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 3rem; margin-top: 1rem; color: #fff;">Explore <i style="color: #d4af37;">Sovereign</i> Clusters</h2>
            <p style="color: rgba(255,255,255,0.6); max-width: 600px; margin: 1.5rem auto 0;">The 190-acre Forest Trails township is divided into exclusive residential sectors, each with its own niche identity and premium lifestyle.</p>
        </div>
        <div class="cluster-grid">
            ${cards}
        </div>
    </div>
</section>
<!-- /Sovereign Cluster Grid (V2) -->
    `;
}

const gridHTML = generateGridHTML();

// Target Files
const targetFiles = [
    'index.html',
    'paranjape-forest-trails-township-bhugaon-apartments/index.html',
    'paranjape-forest-trails-township-bhugaon-plots/index.html',
    'paranjape-forest-trails-township-bhugaon-villas/index.html'
];

targetFiles.forEach(file => {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Force Overwrite: If V1 or V2 exists, replace it.
    if (content.includes('id="township-clusters"')) {
        // Simple regex to find the section
        content = content.replace(/<!-- Sovereign Cluster Grid [\s\S]*?\/Sovereign Cluster Grid [\s\S]*?-->/g, gridHTML.trim());
        // If that didn't work (no comments), try raw section replacement
        if (content === original) {
           content = content.replace(/<section class="cluster-grid-section" id="township-clusters">[\s\S]*?<\/section>/g, gridHTML.trim());
        }
    } else {
        // Fresh Injection
        content = content.replace('<section class="seo-mesh-footer"', `${gridHTML.trim()}\n<section class="seo-mesh-footer"`);
    }

    // Ensure CSS
    if (!content.includes('cluster-dominance.css')) {
        content = content.replace('</head>', '    <link rel="stylesheet" href="/styles/cluster-dominance.css">\n</head>');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated Cluster Grid in ${file}`);
    } else {
        console.log(`⚠️ No changes needed for ${file}`);
    }
});
