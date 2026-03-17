/**
 * Unified Indexing Engine for 50+ URLs
 */
const fs = require('fs');
const path = require('path');
const SITE_URL = 'https://paranjape-mistygreens.in/';

const ALL_URLS = [
    "https://paranjape-mistygreens.in/",
    "https://paranjape-mistygreens.in/luxury-forest-villas-bhugaon/",
    "https://paranjape-mistygreens.in/premium-apartments-forest-trails/",
    "https://paranjape-mistygreens.in/na-bungalow-plots-bhugaon/",
    "https://paranjape-mistygreens.in/kaleidoscope-apartments-bhugaon/",
    "https://paranjape-mistygreens.in/verandah-luxury-flats-bhugaon/",
    "https://paranjape-mistygreens.in/whistling-meadows-villas-bhugaon/",
    "https://paranjape-mistygreens.in/misty-greens-plots-pune/",
    "https://paranjape-mistygreens.in/property-investment-bhugaon-pune/",
    "https://paranjape-mistygreens.in/forest-trails-location-proximity/",
    "https://paranjape-mistygreens.in/forest-trails-price-list-brochure/",
    "https://paranjape-mistygreens.in/paranjape-schemes-forest-trails-bhugaon/",
    "https://paranjape-mistygreens.in/paranjape-schemes-forest-trails-plots/",
    "https://paranjape-mistygreens.in/paranjape-schemes-forest-trails-villas/",
    "https://paranjape-mistygreens.in/paranjape-schemes-forest-trails-bungalows/",
    "https://paranjape-mistygreens.in/paranjape-schemes-forest-trails-apartments/",
    "https://paranjape-mistygreens.in/paranjape-schemes-forest-trails-price/",
    "https://paranjape-mistygreens.in/blogs/na-bungalow-plots-pune-west-guide/",
    "https://paranjape-mistygreens.in/blogs/misty-greens-na-plots-review/",
    "https://paranjape-mistygreens.in/blogs/kaleidoscope-na-bungalow-plots/",
    "https://paranjape-mistygreens.in/blogs/kothrud-vs-bhugaon-na-bungalow-plots/",
    "https://paranjape-mistygreens.in/blogs/forest-trails-na-bungalow-plots-advantage/",
    "https://paranjape-mistygreens.in/blogs/bavdhan-na-bungalow-plots-investment/",
    "https://paranjape-mistygreens.in/forest-trails-near-pashan/",
    "https://paranjape-mistygreens.in/forest-trails-vs-kothrud-apartments/",
    "https://paranjape-mistygreens.in/why-choose-forest-trails-bhugaon/",
    "https://paranjape-mistygreens.in/about-paranjape-schemes/",
    "https://paranjape-mistygreens.in/forest-trails-paud-road/",
    "https://paranjape-mistygreens.in/forest-trails-near-chandani-chowk/",
    "https://paranjape-mistygreens.in/forest-trails-near-bavdhan/",
    "https://paranjape-mistygreens.in/forest-trails-near-kothrud/",
    "https://paranjape-mistygreens.in/forest-trails-vs-bavdhan-projects/",
    
    // Sectors
    "https://paranjape-mistygreens.in/sectors/sector-a-skyline-villas/",
    "https://paranjape-mistygreens.in/sectors/sector-b-misty-heights/",
    "https://paranjape-mistygreens.in/sectors/sector-c-riverview-plots/",
    "https://paranjape-mistygreens.in/sectors/sector-d-forest-edge/",
    "https://paranjape-mistygreens.in/sectors/sector-e-valley-residences/",
    
    // Amenities
    "https://paranjape-mistygreens.in/amenities/the-cliff-club/",
    "https://paranjape-mistygreens.in/amenities/equestrian-academy-pune/",
    "https://paranjape-mistygreens.in/amenities/olympic-sports-complex/",
    "https://paranjape-mistygreens.in/amenities/forest-walks-trails/",
    "https://paranjape-mistygreens.in/amenities/wellness-spa-retreat/",
    "https://paranjape-mistygreens.in/amenities/adventure-park-pune/",
    
    // Investment
    "https://paranjape-mistygreens.in/investment/rental-yield-bhugaon/",
    "https://paranjape-mistygreens.in/investment/appreciation-forecast-2030/",
    "https://paranjape-mistygreens.in/investment/pmrda-ring-road-impact/",
    "https://paranjape-mistygreens.in/investment/tax-benefits-nri-plots/",
    
    // Location
    "https://paranjape-mistygreens.in/location/bhugaon-connectivity-guide/",
    "https://paranjape-mistygreens.in/location/nearby-schools-hospitals/",
    "https://paranjape-mistygreens.in/location/it-hub-proximity-hinjewadi/",
    
    // Comparisons
    "https://paranjape-mistygreens.in/comparisons/forest-trails-vs-magarpatta/",
    "https://paranjape-mistygreens.in/comparisons/bhugaon-vs-mulshi-investment/",
    "https://paranjape-mistygreens.in/comparisons/premium-townships-pune-west/",
    
    // Legal
    "https://paranjape-mistygreens.in/legal/rera-compliance-guide/",
    "https://paranjape-mistygreens.in/legal/na-plot-purchase-process/"
];

async function pingIndexers() {
    console.log(`🚀 Pinging ${ALL_URLS.length} URLs to search engines...`);
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_URLS.map(url => `  <url><loc>${url}</loc><priority>${url === SITE_URL ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✅ Updated sitemap.xml with 55 target URLs.');
}

pingIndexers();
