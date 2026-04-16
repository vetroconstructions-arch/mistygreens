/**
 * Unified Indexing Engine for 50+ URLs
 */
const fs = require('fs');
const path = require('path');
const SITE_URL = 'https://www.paranjapetownship.com/';

const ALL_URLS = [
    "https://www.paranjapetownship.com/",
    "https://www.paranjapetownship.com/luxury-forest-villas-bhugaon/",
    "https://www.paranjapetownship.com/premium-apartments-forest-trails/",
    "https://www.paranjapetownship.com/na-bungalow-plots-bhugaon/",
    "https://www.paranjapetownship.com/canopy-apartments-bhugaon/",
    "https://www.paranjapetownship.com/verandah/",
    "https://www.paranjapetownship.com/luxury-forest-villas-bhugaon/",
    "https://www.paranjapetownship.com/misty-greens/",
    "https://www.paranjapetownship.com/property-investment-bhugaon-pune/",
    "https://www.paranjapetownship.com/forest-trails-location-proximity/",
    "https://www.paranjapetownship.com/forest-trails-price-list-brochure/",
    "https://www.paranjapetownship.com/paranjape-schemes-forest-trails-bhugaon/",
    "https://www.paranjapetownship.com/paranjape-schemes-forest-trails-plots/",
    "https://www.paranjapetownship.com/paranjape-schemes-forest-trails-villas/",
    "https://www.paranjapetownship.com/paranjape-schemes-forest-trails-bungalows/",
    "https://www.paranjapetownship.com/paranjape-schemes-forest-trails-apartments/",
    "https://www.paranjapetownship.com/paranjape-schemes-forest-trails-price/",
    "https://www.paranjapetownship.com/blogs/na-bungalow-plots-pune-west-guide/",
    "https://www.paranjapetownship.com/blogs/misty-greens-na-plots-review/",
    "https://www.paranjapetownship.com/blogs/The Canopy-na-bungalow-plots/",
    "https://www.paranjapetownship.com/blogs/kothrud-vs-bhugaon-na-bungalow-plots/",
    "https://www.paranjapetownship.com/blogs/forest-trails-na-bungalow-plots-advantage/",
    "https://www.paranjapetownship.com/blogs/bavdhan-na-bungalow-plots-investment/",
    "https://www.paranjapetownship.com/forest-trails-near-pashan/",
    "https://www.paranjapetownship.com/forest-trails-vs-kothrud-apartments/",
    "https://www.paranjapetownship.com/why-choose-forest-trails-bhugaon/",
    "https://www.paranjapetownship.com/about-paranjape-schemes/",
    "https://www.paranjapetownship.com/forest-trails-paud-road/",
    "https://www.paranjapetownship.com/forest-trails-near-chandani-chowk/",
    "https://www.paranjapetownship.com/forest-trails-near-bavdhan/",
    "https://www.paranjapetownship.com/forest-trails-near-kothrud/",
    "https://www.paranjapetownship.com/forest-trails-vs-bavdhan-projects/",
    
    // Sectors
    "https://www.paranjapetownship.com/sectors/sector-a-skyline-villas/",
    "https://www.paranjapetownship.com/sectors/sector-b-misty-heights/",
    "https://www.paranjapetownship.com/sectors/sector-c-riverview-plots/",
    "https://www.paranjapetownship.com/sectors/sector-d-forest-edge/",
    "https://www.paranjapetownship.com/sectors/sector-e-valley-residences/",
    
    // Amenities
    "https://www.paranjapetownship.com/amenities/the-cliff-club/",
    "https://www.paranjapetownship.com/amenities/equestrian-academy-pune/",
    "https://www.paranjapetownship.com/amenities/olympic-sports-complex/",
    "https://www.paranjapetownship.com/amenities/forest-walks-trails/",
    "https://www.paranjapetownship.com/amenities/wellness-spa-retreat/",
    "https://www.paranjapetownship.com/amenities/adventure-park-pune/",
    
    // Investment
    "https://www.paranjapetownship.com/investment/rental-yield-bhugaon/",
    "https://www.paranjapetownship.com/investment/appreciation-forecast-2030/",
    "https://www.paranjapetownship.com/investment/pmrda-ring-road-impact/",
    "https://www.paranjapetownship.com/investment/tax-benefits-nri-plots/",
    
    // Location
    "https://www.paranjapetownship.com/location/bhugaon-connectivity-guide/",
    "https://www.paranjapetownship.com/location/nearby-schools-hospitals/",
    "https://www.paranjapetownship.com/location/it-hub-proximity-hinjewadi/",
    
    // Comparisons
    "https://www.paranjapetownship.com/comparisons/forest-trails-vs-magarpatta/",
    "https://www.paranjapetownship.com/comparisons/bhugaon-vs-mulshi-investment/",
    "https://www.paranjapetownship.com/comparisons/premium-townships-pune-west/",
    
    // Legal
    "https://www.paranjapetownship.com/legal/rera-compliance-guide/",
    "https://www.paranjapetownship.com/legal/na-plot-purchase-process/"
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
