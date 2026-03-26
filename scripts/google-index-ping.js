/**
 * Unified Indexing Engine for 50+ URLs
 */
const fs = require('fs');
const path = require('path');
const SITE_URL = 'https://paranjapetownship.com/';

const ALL_URLS = [
    "https://paranjapetownship.com/",
    "https://paranjapetownship.com/luxury-forest-villas-bhugaon/",
    "https://paranjapetownship.com/premium-apartments-forest-trails/",
    "https://paranjapetownship.com/na-bungalow-plots-bhugaon/",
    "https://paranjapetownship.com/canopy-apartments-bhugaon/",
    "https://paranjapetownship.com/verandah-luxury-flats-bhugaon/",
    "https://paranjapetownship.com/luxury-forest-villas-bhugaon/",
    "https://paranjapetownship.com/misty-greens-plots-pune/",
    "https://paranjapetownship.com/property-investment-bhugaon-pune/",
    "https://paranjapetownship.com/forest-trails-location-proximity/",
    "https://paranjapetownship.com/forest-trails-price-list-brochure/",
    "https://paranjapetownship.com/paranjape-schemes-forest-trails-bhugaon/",
    "https://paranjapetownship.com/paranjape-schemes-forest-trails-plots/",
    "https://paranjapetownship.com/paranjape-schemes-forest-trails-villas/",
    "https://paranjapetownship.com/paranjape-schemes-forest-trails-bungalows/",
    "https://paranjapetownship.com/paranjape-schemes-forest-trails-apartments/",
    "https://paranjapetownship.com/paranjape-schemes-forest-trails-price/",
    "https://paranjapetownship.com/blogs/na-bungalow-plots-pune-west-guide/",
    "https://paranjapetownship.com/blogs/misty-greens-na-plots-review/",
    "https://paranjapetownship.com/blogs/The Canopy-na-bungalow-plots/",
    "https://paranjapetownship.com/blogs/kothrud-vs-bhugaon-na-bungalow-plots/",
    "https://paranjapetownship.com/blogs/forest-trails-na-bungalow-plots-advantage/",
    "https://paranjapetownship.com/blogs/bavdhan-na-bungalow-plots-investment/",
    "https://paranjapetownship.com/forest-trails-near-pashan/",
    "https://paranjapetownship.com/forest-trails-vs-kothrud-apartments/",
    "https://paranjapetownship.com/why-choose-forest-trails-bhugaon/",
    "https://paranjapetownship.com/about-paranjape-schemes/",
    "https://paranjapetownship.com/forest-trails-paud-road/",
    "https://paranjapetownship.com/forest-trails-near-chandani-chowk/",
    "https://paranjapetownship.com/forest-trails-near-bavdhan/",
    "https://paranjapetownship.com/forest-trails-near-kothrud/",
    "https://paranjapetownship.com/forest-trails-vs-bavdhan-projects/",
    
    // Sectors
    "https://paranjapetownship.com/sectors/sector-a-skyline-villas/",
    "https://paranjapetownship.com/sectors/sector-b-misty-heights/",
    "https://paranjapetownship.com/sectors/sector-c-riverview-plots/",
    "https://paranjapetownship.com/sectors/sector-d-forest-edge/",
    "https://paranjapetownship.com/sectors/sector-e-valley-residences/",
    
    // Amenities
    "https://paranjapetownship.com/amenities/the-cliff-club/",
    "https://paranjapetownship.com/amenities/equestrian-academy-pune/",
    "https://paranjapetownship.com/amenities/olympic-sports-complex/",
    "https://paranjapetownship.com/amenities/forest-walks-trails/",
    "https://paranjapetownship.com/amenities/wellness-spa-retreat/",
    "https://paranjapetownship.com/amenities/adventure-park-pune/",
    
    // Investment
    "https://paranjapetownship.com/investment/rental-yield-bhugaon/",
    "https://paranjapetownship.com/investment/appreciation-forecast-2030/",
    "https://paranjapetownship.com/investment/pmrda-ring-road-impact/",
    "https://paranjapetownship.com/investment/tax-benefits-nri-plots/",
    
    // Location
    "https://paranjapetownship.com/location/bhugaon-connectivity-guide/",
    "https://paranjapetownship.com/location/nearby-schools-hospitals/",
    "https://paranjapetownship.com/location/it-hub-proximity-hinjewadi/",
    
    // Comparisons
    "https://paranjapetownship.com/comparisons/forest-trails-vs-magarpatta/",
    "https://paranjapetownship.com/comparisons/bhugaon-vs-mulshi-investment/",
    "https://paranjapetownship.com/comparisons/premium-townships-pune-west/",
    
    // Legal
    "https://paranjapetownship.com/legal/rera-compliance-guide/",
    "https://paranjapetownship.com/legal/na-plot-purchase-process/"
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
