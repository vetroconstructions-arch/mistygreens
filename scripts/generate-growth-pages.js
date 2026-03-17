/**
 * Phase 20: SEO Growth Engine
 * Generates 50+ hyper-granular SEO landing pages for Paranjape Forest Trails.
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://paranjape-mistygreens.in/';
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

        fs.writeFileSync(path.join(targetDir, 'index.html'), pageContent);
        console.log(`✅ Generated: ${page.path}`);
    });
}

generatePages();
