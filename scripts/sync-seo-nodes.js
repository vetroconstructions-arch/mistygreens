/**
 * Sovereign SEO Sync Node (v5.0.0)
 * Purpose: Propagate high-intent keyword ecosystem and Google Ecosystem schemas across all portal nodes.
 */

const fs = require('fs');
const path = require('path');

const HIGH_INTENT_KEYWORDS = "Paranjape Forest Trails Bhugaon, Forest Trails Pune, NA Plots Bhugaon, Luxury Villas Pune West, Ready to move flats Bhugaon, RERA approved plots Pune, Gated community plots near Bavdhan, Paranjape Schemes Bhugaon, Property near Kothrud, Forest Trails price list 2026, Best township in Pune, Real estate investment Bhugaon, NA bungalow plots West Pune, 2 BHK 3 BHK flats Bhugaon, PMRDA Ring Road connectivity, Chandni Chowk real estate";

const GLOBAL_SCHEMAS = `
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Paranjape Forest Trails NA Plots & Villas",
        "description": "Premium RERA approved NA bungalow plots and luxury villas in Bhugaon, Pune West. Part of the 190-acre Paranjape Forest Trails township.",
        "image": "https://www.paranjapetownship.com/images/hero-township.webp",
        "brand": { "@type": "Brand", "name": "Paranjape Schemes" },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "12300000",
          "offerCount": "85",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Paranjape Schemes Forest Trails Sales Gallery",
        "image": "https://www.paranjapetownship.com/images/hero-township.webp",
        "@id": "https://www.paranjapetownship.com/#localbusiness",
        "url": "https://www.paranjapetownship.com/",
        "telephone": "+91-7744009295",
        "priceRange": "₹1.23 Cr - ₹5.50 Cr",
        "hasMap": "https://maps.google.com/maps?cid=1086438290382948382",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Paud Road, Bhugaon",
          "addressLocality": "Bhugaon",
          "addressRegion": "Pune",
          "postalCode": "412115",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": "18.5050", "longitude": "73.7406" }
      }
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Keyword Hardening
    content = content.replace(/<meta name="keywords" content="[^"]*">/g, `<meta name="keywords" content="${HIGH_INTENT_KEYWORDS}">`);
    
    // 2. Title Hardening (If contains Forest Trails)
    if (content.includes('Forest Trails')) {
        content = content.replace(/<title>[^<]*<\/title>/, `<title>#1 Township in Pune | Paranjape Forest Trails Bhugaon | NA Plots & Villas 2026</title>`);
    }

    // 3. Schema Injection (Find the end of the first script type="application/ld+json" array)
    if (content.includes('application/ld+json')) {
        // Simple injection before the end of the JSON array or as a new script
        const schemaInjection = `<script type="application/ld+json">[${GLOBAL_SCHEMAS}]</script>`;
        if (!content.includes('Product')) {
            content = content.replace('</head>', `${schemaInjection}\n</head>`);
        }
    }

    fs.writeFileSync(filePath, content);
    console.log(`[SYNCED] ${filePath}`);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scripts' && file !== 'components') {
                walkDir(fullPath);
            }
        } else if (file.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

console.log("Starting Sovereign SEO Sync...");
walkDir('./');
console.log("Sovereign SEO Sync Complete.");
