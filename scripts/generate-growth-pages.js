/**
 * Phase 20: SEO Growth Engine
 * Generates 50+ hyper-granular SEO landing pages for Paranjape Forest Trails.
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.paranjapetownship.com/';
const TEMPLATE_PATH = 'index.html'; // We'll use the root index.html as a design master

const NEW_PAGES = [
    // Sectors
    { path: 'sectors/sector-a-skyline-villas', title: 'Sector A: Skyline Villas | Forest Trails Bhugaon', label: 'Sector A Villas' },
    { path: 'sectors/sector-b-misty-heights', title: 'Sector B: Misty Heights Apartments | Forest Trails', label: 'Sector B Heights' },
    { path: 'sectors/sector-c-riverview-plots', title: 'Sector C: Riverview NA Plots | Forest Trails Bhugaon', label: 'Sector C Plots' },
    { path: 'sectors/sector-d-forest-edge', title: 'Sector D: Forest Edge Premium Homes | Bhugaon', label: 'Sector D Homes' },
    { path: 'sectors/sector-e-valley-residences', title: 'Sector E: Valley Residences | Forest Trails Pune', label: 'Sector E Valley' },
    
    // Amenities
    { path: 'amenities/the-cliff-club', title: 'The Cliff Club | Premium Lifestyle at Forest Trails Bhugaon', label: 'The Cliff Club' },
    { path: 'amenities/equestrian-academy-pune', title: 'Equestrian Academy Pune | Horse Riding at Forest Trails', label: 'Equestrian Academy' },
    { path: 'amenities/olympic-sports-complex', title: 'Olympic Sports Complex | Forest Trails Township Highlights', label: 'Sports Complex' },
    { path: 'amenities/forest-walks-trails', title: 'Forest Walks & Nature Trails | 190 Acre Living at Bhugaon', label: 'Nature Trails' },
    { path: 'amenities/wellness-spa-retreat', title: 'Wellness Spa & Retreat | Luxury Living at Forest Trails', label: 'Wellness Spa' },
    { path: 'amenities/adventure-park-pune', title: 'Adventure Park Pune | Fun & Activity at Forest Trails', label: 'Adventure Park' },
    
    // Investment
    { path: 'investment/rental-yield-bhugaon', title: 'Rental Yield Analysis Bhugaon | Forest Trails Investment', label: 'Rental Yield' },
    { path: 'investment/appreciation-forecast-2030', title: 'Bhugaon Real Estate Appreciation Forecast 2030', label: 'Appreciation' },
    { path: 'investment/pmrda-ring-road-impact', title: 'PMRDA Ring Road Impact on Bhugaon Property Prices', label: 'Ring Road Impact' },
    { path: 'investment/tax-benefits-nri-plots', title: 'NRI Tax Benefits on Plot Investment in Pune West', label: 'NRI Benefits' },
    
    // Location
    { path: 'location/bhugaon-connectivity-guide', title: 'Bhugaon Connectivity Guide | Paud Road & Ring Road', label: 'Connectivity' },
    { path: 'location/nearby-schools-hospitals', title: 'Top Schools & Hospitals near Forest Trails Bhugaon', label: 'Social Infra' },
    { path: 'location/it-hub-proximity-hinjewadi', title: 'Proximity to Hinjewadi IT Hub from Forest Trails Bhugaon', label: 'IT Proximity' },
    
    // Comparisons
    { path: 'comparisons/forest-trails-vs-magarpatta', title: 'Forest Trails vs Magarpatta City | Township Comparison', label: 'vs Magarpatta' },
    { path: 'comparisons/bhugaon-vs-mulshi-investment', title: 'Bhugaon vs Mulshi | Where to Buy Second Homes in Pune', label: 'vs Mulshi' },
    { path: 'comparisons/premium-townships-pune-west', title: 'Top 5 Premium Townships in Pune West | Forest Trails Review', label: 'Top Townships' },
    
    // Legal
    { path: 'legal/rera-compliance-guide', title: 'RERA Compliance Guide | Paranjape Schemes Integrity', label: 'RERA Guide' },
    { path: 'legal/na-plot-purchase-process', title: 'NA Plot Purchase Process in Pune | Legal Checklist', label: 'Purchase Process' }
];

const CONTENT_HUB = {
    'investment/pmrda-ring-road-impact': `
        <div class="intel-block" style="background: #fff; padding: 3rem; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border-left: 6px solid var(--pscl-gold);">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 2.4rem; margin-bottom: 1.5rem;">PMRDA Ring Road: The Bhugaon Catalyst</h3>
            <p style="font-size: 1.15rem; line-height: 1.8; color: #444;">
                The <strong>PMRDA West Ring Road (Phase 1)</strong> is the most significant infrastructure development for Pune West. Traversing directly through the Bhugaon corridor, this 128km project is set to slash travel times to Hinjawadi and the Mumbai-Pune Expressway by 50%. 
                <br><br>
                <strong>Current Status:</strong> The Western Segment (Phase 1) is scheduled for completion by <strong>May 2026</strong>. Properties within Paranjape Forest Trails are positioned for a direct capital appreciation spike as the "last-mile" connectivity becomes operational.
            </p>
        </div>`,
    'amenities/the-cliff-club': `
        <div class="intel-block" style="background: #fff; padding: 3rem; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border-left: 6px solid var(--pscl-maroon);">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 2.4rem; margin-bottom: 1.5rem;">The Cliff Club: 1.5 Acres of Elite Sovereignty</h3>
            <p style="font-size: 1.15rem; line-height: 1.8; color: #444;">
                Perched on the highest point of the 190-acre township, <strong>The Cliff Club</strong> is Pune's premier private sanctuary. Spanning 1.5 acres, it offers residents full access to an Olympic-size pool, high-tech gymnasium, and professional squash courts. 
                <br><br>
                <strong>Public Access:</strong> The club is also home to "The Cliff", a 180-seater multi-cuisine restaurant open to the public by reservation, making it a landmark social destination for West Pune elites.
            </p>
        </div>`,
    'location/nearby-schools-hospitals': `
        <div class="intel-block" style="background: #fff; padding: 3rem; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border-left: 6px solid var(--pscl-gold);">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 2.4rem; margin-bottom: 1.5rem;">Educational Anchor: SSRVM School</h3>
            <p style="font-size: 1.15rem; line-height: 1.8; color: #444;">
                Families at Forest Trails benefit from having the <strong>Shri Ravishankar Vidya Mandir (SSRVM) School</strong> located <strong>fully operational</strong> within the township gates. This eliminates school bus commutes and ensures a secure, world-class educational environment just a 2-minute drive from clusters like Highlands and Alpha.
            </p>
        </div>`,
    'amenities/equestrian-academy-pune': `
        <div class="intel-block" style="background: #fff; padding: 3rem; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border-left: 6px solid var(--pscl-maroon);">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 2.4rem; margin-bottom: 1.5rem;">Professional Equestrian Academy</h3>
            <p style="font-size: 1.15rem; line-height: 1.8; color: #444;">
                Forest Trails hosts one of Pune's only professional <strong>Equestrian Centers</strong>. Fully operational and staffed by expert trainers, the academy offers show jumping, tent pegging, and serene forest joy rides, providing a lifestyle amenity that is truly unique to the Paranjape legacy.
            </p>
        </div>`
};

function generatePages() {
    let masterContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    
    // Remove individual page scripts if any
    masterContent = masterContent.replace(/<link rel="canonical" href="[^"]*">/, '<!-- CANONICAL_PLACEHOLDER -->');
    
    NEW_PAGES.forEach(page => {
        const targetDir = path.join(process.cwd(), page.path);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        let pageContent = masterContent;
        
        // Update Title
        pageContent = pageContent.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
        
        // Update Canonical
        const canonical = `<link rel="canonical" href="${SITE_URL}${page.path}/">`;
        pageContent = pageContent.replace('<!-- CANONICAL_PLACEHOLDER -->', canonical);
        
        // Update Breadcrumb (Phase 18 compatible)
        const breadcrumb = `
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <div class="container">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="${SITE_URL}">Home</a></li>
                    <li class="breadcrumb-separator">/</li>
                    <li class="breadcrumb-item active" aria-current="page">${page.label}</li>
                </ol>
            </div>
        </nav>`;
        
        // Replace existing breadcrumb if present
        if (pageContent.includes('class="breadcrumb-nav"')) {
            pageContent = pageContent.replace(/<nav class="breadcrumb-nav"[\s\S]*?<\/nav>/, breadcrumb);
        } else {
            pageContent = pageContent.replace('<main>', `<main>${breadcrumb}`);
        }

        // Inject Unique Intelligence from Content Hub
        if (CONTENT_HUB[page.path]) {
            const injectionPoint = '<!-- CONTENT_INJECTION_POINT -->';
            if (pageContent.includes(injectionPoint)) {
                pageContent = pageContent.replace(injectionPoint, CONTENT_HUB[page.path]);
            } else {
                // Default: Inject after breadcrumb
                pageContent = pageContent.replace('</nav>', `</nav>\n\n<section class="section"><div class="container">${CONTENT_HUB[page.path]}</div></section>`);
            }
        }

        fs.writeFileSync(path.join(targetDir, 'index.html'), pageContent);
        console.log(`✅ Generated: ${page.path}`);
    });
}

generatePages();
