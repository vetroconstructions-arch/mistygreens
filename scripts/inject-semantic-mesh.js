const fs = require('fs');
const path = require('path');

const clusters = [
    {
        id: 'alpha',
        path: '/codename-alpha-apartments-bhugaon/',
        name: 'Codename Alpha',
        tag: 'Premium 2 & 3 BHK',
        image: 'images/misty-greens.webp'
    },
    {
        id: 'canopy',
        path: '/canopy-apartments-bhugaon/',
        name: 'Canopy Apartments',
        tag: 'Nature-Immersive 2 BHK',
        image: 'images/villas-exterior-1.webp'
    },
    {
        id: 'highgardens',
        path: '/highgardens-apartments-bhugaon/',
        name: 'Highgardens',
        tag: 'Elevated 3 BHK Residences',
        image: 'images/condo-1.webp'
    },
    {
        id: 'pebbles',
        path: '/pebbles-apartments-bhugaon/',
        name: 'Pebbles',
        tag: 'Boutique 2 BHK Homes',
        image: 'images/villas-pool-night.webp'
    },
    {
        id: 'atmos',
        path: '/atmos-smart-homes-bhugaon/',
        name: 'Atmos Smart Homes',
        tag: 'Tech-Enabled 3 BHK',
        image: 'images/living-room-1.webp'
    },
    {
        id: 'highlands',
        path: '/the-highlands-forest-trails/',
        name: 'The Highlands',
        tag: 'Bespoke Bungalows',
        image: 'images/the-highlands-villas.webp'
    },
    {
        id: 'cove',
        path: '/the-cove-villas-bhugaon/',
        name: 'The Cove Duet Villas',
        tag: 'Twin Luxury Villas',
        image: 'images/cove-duet.webp'
    },
    {
        id: 'athashri',
        path: '/athashri-senior-living-bhugaon/',
        name: 'Athashri Senior Living',
        tag: 'Award-Winning Senior Homes',
        image: 'images/athashri.webp'
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
            <!-- Sibling Cluster Card -->
            <a href="${sc.path}" class="cluster-card sibling-card" style="text-decoration: none; color: inherit; display: block; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.4s; background: #fff;">
                <div style="position: relative; overflow: hidden; height: 200px;">
                    <img src="/${sc.image}" alt="${sc.tag} at ${sc.name} Bhugaon" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s;">
                    <div style="position: absolute; top: 1rem; right: 1rem; background: var(--pscl-dark); color: #fff; padding: 0.3rem 0.8rem; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;">
                        ${sc.tag}
                    </div>
                </div>
                <div style="padding: 1.5rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--pscl-maroon);">${sc.name}</h4>
                    <p style="font-size: 0.75rem; color: var(--pscl-muted); letter-spacing: 0.05em; text-transform: uppercase; font-weight: 600; margin-bottom: 1rem;">View Premium Availability &rarr;</p>
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
