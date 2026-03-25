const fs = require('fs');
const path = require('path');

const clusters = [
    {
        id: 'canopy',
        path: '/canopy-apartments-bhugaon/',
        name: 'The Canopy',
        tag: 'Hill-Top Luxury 2 BHK',
        image: 'images/canopy-realistic.jpg',
        intent: 'Nature-Immersive Lifestyle'
    },
    {
        id: 'highgardens',
        path: '/highgardens-apartments-bhugaon/',
        name: 'High Gardens',
        tag: 'Elevated 3 BHK Residences',
        image: 'images/highgardens-realistic.jpg',
        intent: 'Sovereign Family Estate'
    },
    {
        id: 'highlands',
        path: '/the-highlands-forest-trails/',
        name: 'Highlands',
        tag: 'Highland Towers',
        image: 'images/the-highlands-villas.webp',
        intent: 'Modern Vertical Living'
    },
    {
        id: 'rivolo',
        path: '/luxury-forest-villas-bhugaon/',
        name: 'The Rivolo',
        tag: 'Luxury Private Villas',
        image: 'images/alpha_realistic_final.jpg',
        intent: 'Absolute Seclusion'
    },
    {
        id: 'cove',
        path: '/the-cove-villas-bhugaon/',
        name: 'The Cove',
        tag: '3 BHK Bungalows',
        image: 'images/verandah-pool-lifestyle.jpg',
        intent: 'Gated Duplex Mastery'
    },
    {
        id: 'mistygreens',
        path: '/misty-greens-plots-pune/',
        name: 'Misty Greens',
        tag: 'Residential NA Plots',
        image: 'images/misty-greens-gate.jpg',
        intent: 'Bespoke Land Investment'
    },
    {
        id: 'athashri',
        path: '/athashri-senior-living-bhugaon/',
        name: 'Athashri',
        tag: 'Senior Living Leader',
        image: 'images/athashri-realistic.jpg',
        intent: 'Assisted Living Pioneer'
    }
];

const BASE_DIR = path.join(__dirname, '../');

function injectSemanticMesh() {
    console.log("🕸️ Initiating SEO Semantic Mesh Injection...");

    clusters.forEach((currentCluster) => {
        const indexPath = path.join(BASE_DIR, currentCluster.path, 'index.html');
        
        if (!fs.existsSync(indexPath)) {
            console.warn(`⚠️ Warning: Could not find ${indexPath}`);
            return;
        }

        let html = fs.readFileSync(indexPath, 'utf-8');

        // Select 3 random different clusters to link to
        const otherClusters = clusters.filter(c => c.id !== currentCluster.id);
        const shuffled = otherClusters.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        let cardsHtml = '';
        selected.forEach(sc => {
            cardsHtml += `
            <!-- Sibling Cluster Card (Sovereign SEO Mesh) -->
            <a href="${sc.path}" class="cluster-card sibling-card" style="text-decoration: none; color: inherit; display: block; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.4s; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                <div style="position: relative; overflow: hidden; height: 220px;">
                    <img src="/${sc.image}" alt="${sc.name} Bhugaon - ${sc.tag} ${sc.intent}" title="${sc.name}: ${sc.intent}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s;">
                    <div style="position: absolute; top: 1rem; right: 1rem; background: var(--pscl-maroon); color: #fff; padding: 0.4rem 1rem; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700; border-radius: 2px;">
                        ${sc.tag}
                    </div>
                </div>
                <div style="padding: 2rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.8rem; color: #1a1a1a;">${sc.name}</h4>
                    <p style="font-size: 0.8rem; color: var(--pscl-maroon); letter-spacing: 0.05em; text-transform: uppercase; font-weight: 800; margin-bottom: 0;">${sc.intent} &rarr;</p>
                </div>
            </a>
            `;
        });

        const meshSection = `
    <!-- ============================================== -->
    <!-- SEO SEMANTIC MESH ARCHITECTURE (PILLAR 4) -->
    <!-- ============================================== -->
    <section class="semantic-mesh section" style="background: var(--pscl-gray); padding: 6rem 0; border-top: 1px solid rgba(0,0,0,0.05);">
        <div class="container">
            <h2 class="section-title" style="font-size: clamp(2rem, 4vw, 3.5rem); text-align: center; margin-bottom: 4rem;">Explore Sister <i>Clusters</i></h2>
            <div class="grid-12" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                ${cardsHtml}
            </div>
        </div>
    </section>
    <!-- ============================================== -->
`;

        // Remove old mesh if it exists to prevent duplication
        html = html.replace(/<!-- ============================================== -->\s*<!-- SEO SEMANTIC MESH ARCHITECTURE[\s\S]*?<!-- ============================================== -->/g, '');

        // Inject right before the footer
        if (html.includes('<footer class="footer-main"')) {
            html = html.replace('<footer class="footer-main"', `${meshSection}\n    <footer class="footer-main"`);
            fs.writeFileSync(indexPath, html, 'utf-8');
            console.log(`✅ Injected Semantic Mesh into: ${currentCluster.name}`);
        } else {
            console.error(`❌ Could not find footer in ${currentCluster.name} to inject mesh.`);
        }
    });

    console.log("🕸️ Semantic Mesh Injection Complete! Google PageRank will now flow beautifully between clusters.");
}

injectSemanticMesh();
