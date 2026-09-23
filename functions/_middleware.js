/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Cloudflare Pages Edge SEO Dominance Engine v5.0
 * Domain: https://www.paranjapetownship.com
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Ultra-Advanced HTMLRewriter Pipeline:
 *  1. Domain & Protocol Canonicalization (301)
 *  2. 4-Tier Crawler Intelligence Classification
 *  3. 6x Streaming HTMLRewriter Transformations
 *  4. Edge Performance Instrumentation (Server-Timing)
 *  5. Hardened Security Header Matrix
 *  6. Tiered Edge Cache Strategy (Assets / HTML / XML)
 *  7. Geo & Language Intelligence (cf.country)
 *  8. Network Error Logging (NEL)
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const CANONICAL_HOSTNAME = "www.paranjapetownship.com";
const CANONICAL_ORIGIN = "https://www.paranjapetownship.com";

// Permanent canonical routing for legacy enclaves & facilities
const PERMALINK_REDIRECTS = {
  "/misty-greens": "/paranjape-forest-trails-township-bhugaon-misty-greens/",
  "/the-rivolo": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
  "/rivolo-residences": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
  "/the-canopy": "/paranjape-forest-trails-township-bhugaon-the-canopy/",
  "/canopy-apartments-bhugaon": "/paranjape-forest-trails-township-bhugaon-the-canopy/",
  "/athashri": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
  "/the-highgardens": "/paranjape-forest-trails-township-bhugaon-highgardens/",
  "/highgardens": "/paranjape-forest-trails-township-bhugaon-highgardens/",
  "/the-cove": "/paranjape-forest-trails-township-bhugaon-the-cove/",
  "/everglades": "/paranjape-forest-trails-township-bhugaon-everglades/",
  "/verandah": "/paranjape-forest-trails-township-bhugaon-verandah/",
  "/orchard": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
  "/swaniketan": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
  "/the-cliff-lifestyle-hub": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/cliff-club": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/sri-sri-ravishankar-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/ssrvm-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/equestrian-academy": "/paranjape-forest-trails-township-bhugaon-amenities/equestrian-academy-pune/",
  "/paranjape-forest-trails-township-bhugaon-villas-plots.html": "/paranjape-forest-trails-township-bhugaon-villas-plots/",
  "/paranjape-forest-trails-township-bhugaon-facilities.html": "/paranjape-forest-trails-township-bhugaon-facilities/",
};

// ─── Edge Keyword Routing Table ───────────────────────────────────────────────
// Maps URL path prefixes → page-specific keyword cluster injected at edge
const BRAND_KW = "Paranjape Schemes Construction Ltd, Paranjape Forest Trails Bhugaon, Misty Greens NA Plots, The Rivolo Villas, The Canopy Apartments, Highgardens, The Cove Bungalows, Athashri Senior Living, Everglades Bavdhan, RERA approved Bhugaon, MahaRERA P52100053834, 190-acre gated township Pune West";

const KEYWORD_ROUTES = {
  "/": `NA plots Bhugaon, luxury villas Bhugaon, 2BHK in Bhugaon, 3BHK Pune West, property in Bhugaon, gated township Pune West, NA bungalow plots Pune, buy property near Kothrud Bavdhan, NRI investment Bhugaon, RERA approved plots Bhugaon, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-misty-greens": `NA plots in Bhugaon, NA bungalow plots Bhugaon, buy NA plots Bhugaon, NA plots price Bhugaon 2026, RERA NA plots Bhugaon P52100053834, Misty Greens NA plots, plots near Chandani Chowk, plots near Bavdhan Kothrud, ${BRAND_KW}`,
  "/misty-greens": `NA plots in Bhugaon, NA bungalow plots Bhugaon, Misty Greens NA plots, RERA NA plots P52100053834, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-rivolo-residences": `luxury villas Bhugaon, luxury forest villas Pune, 4BHK villa Bhugaon, 5BHK villa Bhugaon, Rivolo villas price 2026, NRI luxury villa Bhugaon, luxury villa near Bavdhan Kothrud, RERA villa Bhugaon P52100031560, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-the-cove": `twin bungalows Bhugaon, twin bungalow price Bhugaon 2026, 4BHK twin bungalow Pune West, The Cove bungalows Forest Trails, bungalow near Bavdhan Kothrud, RERA bungalow P52100048536, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-the-canopy": `2BHK in Bhugaon, 3BHK in Bhugaon, 2BHK near Bavdhan, 3BHK near Kothrud, The Canopy apartments Bhugaon, RERA apartments P52100079518, apartments near Chandani Chowk, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-highgardens": `2BHK in Bhugaon, apartments Bhugaon, Highgardens apartments price 2026, RERA apartments P52100053310, 2BHK near Bavdhan, 2BHK near Chandani Chowk, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon": `senior living Bhugaon, Athashri senior living Pune, retirement homes Bhugaon, senior citizen homes Pune West, assisted living Bhugaon, RERA senior living P52100077686, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-verandah": `luxury apartments Bhugaon, Verandah Forest Trails price, apartments near Bavdhan Kothrud, RERA apartments P52100002194, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-orchard-residences": `apartments Bhugaon, Orchard Residences price, RERA apartments P52100055710, apartments near Chandani Chowk Bavdhan, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-swaniketan": `apartments Bhugaon, Swaniketan price, RERA apartments P52100052124, flats near Bavdhan Kothrud, ${BRAND_KW}`,
  "/1-bhk-flats-near-bavdhan": `1BHK near Bavdhan, 1 BHK flats near Bavdhan Pune, 1BHK apartments Bavdhan, 1BHK price Bavdhan 2026, affordable 1BHK Bavdhan, 1BHK near Chandani Chowk, ${BRAND_KW}`,
  "/1-bhk-flats-near-kothrud": `1BHK near Kothrud, 1 BHK flats Kothrud, 1BHK price Kothrud 2026, affordable 1BHK Kothrud, ${BRAND_KW}`,
  "/1-bhk-flats-near-hinjewadi": `1BHK near Hinjewadi, 1 BHK flats Hinjewadi IT Park, 1BHK price Hinjewadi 2026, ${BRAND_KW}`,
  "/2-bhk-flats-near-bavdhan": `2BHK near Bavdhan, 2 BHK flats near Bavdhan Pune, 2BHK apartments Bavdhan, 2BHK price Bavdhan 2026, 2BHK RERA Bavdhan, 2BHK near Chandani Chowk, ${BRAND_KW}`,
  "/2-bhk-flats-near-kothrud": `2BHK near Kothrud, 2 BHK flats Kothrud, 2BHK apartments Kothrud, 2BHK price Kothrud 2026, 2BHK RERA Kothrud, 2BHK Kothrud extension, ${BRAND_KW}`,
  "/2-bhk-flats-near-baner": `2BHK near Baner, 2 BHK flats Baner, 2BHK apartments Baner, 2BHK price Baner 2026, ${BRAND_KW}`,
  "/3-bhk-flats-near-bavdhan": `3BHK near Bavdhan, 3 BHK flats near Bavdhan Pune, 3BHK apartments Bavdhan, 3BHK price Bavdhan 2026, luxury 3BHK Bavdhan, 3BHK near Chandani Chowk, ${BRAND_KW}`,
  "/3-bhk-flats-near-kothrud": `3BHK near Kothrud, 3 BHK flats Kothrud, 3BHK apartments Kothrud, 3BHK price Kothrud 2026, luxury 3BHK Kothrud, ${BRAND_KW}`,
  "/4-bhk-luxury-apartments-pune-west": `4BHK luxury apartments Pune West, 4 BHK flats Pune West, 4BHK price Pune West 2026, luxury 4BHK Bhugaon, ${BRAND_KW}`,
  "/2bhk-in-bhugaon": `2BHK in Bhugaon, 2 BHK flat Bhugaon, 2BHK apartment Bhugaon, buy 2BHK Bhugaon, 2BHK price Bhugaon 2026, 2BHK RERA Bhugaon, ${BRAND_KW}`,
  "/3bhk-in-pune": `3BHK in Pune, 3 BHK flat Pune, 3BHK apartment Pune, buy 3BHK Pune West, 3BHK price Pune 2026, ${BRAND_KW}`,
  "/3bhk-in-kothrud": `3BHK in Kothrud, 3 BHK flat Kothrud Pune, buy 3BHK Kothrud, 3BHK price Kothrud 2026, ${BRAND_KW}`,
  "/3bhk-near-chandani-chowk": `3BHK near Chandani Chowk, 3 BHK flat Chandani Chowk, buy 3BHK Chandani Chowk, 3BHK price Chandani Chowk 2026, ${BRAND_KW}`,
  "/na-plots-in-bhugaon": `NA plots in Bhugaon, NA bungalow plots Bhugaon, buy NA plots Bhugaon, NA plots price Bhugaon 2026, RERA NA plots Bhugaon P52100053834, ${BRAND_KW}`,
  "/na-plots-in-pune": `NA plots in Pune, NA bungalow plots Pune West, buy NA plots Pune, NA plots price Pune 2026, ${BRAND_KW}`,
  "/plots-in-pune-west": `plots in Pune West, buy plots Pune West, bungalow plots Pune West, NA plots Pune West 2026, ${BRAND_KW}`,
  "/rera-approved-plots-bhugaon": `RERA approved plots Bhugaon, MahaRERA plots Bhugaon, MahaRERA P52100053834, RERA certified plots Pune, ${BRAND_KW}`,
  "/property-in-bhugaon": `property in Bhugaon, buy property Bhugaon Pune, flats in Bhugaon, villas in Bhugaon, plots in Bhugaon, Bhugaon property price 2026, ${BRAND_KW}`,
  "/property-near-chandani-chowk": `property near Chandani Chowk, buy property Chandani Chowk Pune, flats near Chandani Chowk, property price Chandani Chowk 2026, ${BRAND_KW}`,
  "/luxury-villas-bhugaon": `luxury villas Bhugaon, luxury forest villas Bhugaon, 4BHK villa Bhugaon, 5BHK villa Bhugaon, Rivolo villas Bhugaon, ${BRAND_KW}`,
  "/5bhk-villas-pune-west": `5BHK villa Pune West, 5BHK bungalow Pune West, 5BHK luxury villa Bhugaon, ${BRAND_KW}`,
  "/senior-living-bhugaon": `senior living Bhugaon, retirement homes Bhugaon Pune, Athashri Bhugaon, senior citizen homes Pune West, ${BRAND_KW}`,
  "/nri-investment-bhugaon": `NRI investment Bhugaon, NRI property Bhugaon Pune, NRI plots Bhugaon, NRI villas Bhugaon, NRI real estate Pune West, ${BRAND_KW}`,
  "/ready-to-move-flats-bavdhan": `ready to move flats Bavdhan, ready possession flats Bavdhan, ready to move 2BHK Bavdhan, ready possession Chandani Chowk, ${BRAND_KW}`,
  "/under-construction-projects-bhugaon": `under construction projects Bhugaon, new launch Bhugaon Pune, under construction flats Bhugaon, new project Bhugaon 2026, ${BRAND_KW}`,
  "/bavdhan-vs-bhugaon-property-appreciation": `Bavdhan vs Bhugaon property, Bavdhan vs Bhugaon investment, price comparison Pune West 2026, best locality Pune West 2026, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-price": `Paranjape Forest Trails price list 2026, NA plots price Bhugaon, luxury villas price Bhugaon, 2BHK price Bhugaon, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-location-proximity": `Forest Trails location proximity, Bhugaon near Chandani Chowk, Bhugaon near Bavdhan, Bhugaon near Kothrud, ${BRAND_KW}`,
  // ─── Paranjape Schemes Full Brand + Project Ecosystem ────────────────────────
  "/paranjape-schemes-all-projects-pune": `Paranjape Schemes Pune, all Paranjape projects 2026, Paranjape Schemes Construction, Paranjape builder Pune, Paranjape real estate Pune, Paranjape projects list, best builder Pune, Paranjape Schemes review 2026, ${BRAND_KW}`,
  "/paranjape-blue-ridge-hinjewadi": `Paranjape Blue Ridge, Blue Ridge Hinjewadi Pune, Paranjape Blue Ridge price 2026, 2BHK Hinjewadi, 3BHK Hinjewadi, Paranjape Schemes Hinjewadi, Blue Ridge apartments Pune, ${BRAND_KW}`,
  "/paranjape-athashri-pune-projects": `Paranjape Athashri, Athashri Pune, Athashri senior living, Paranjape senior living Pune, retirement homes Pune, Athashri Bhugaon, Athashri price 2026, senior citizen apartments Pune, ${BRAND_KW}`,
  "/paranjape-aspire-pune": `Paranjape Aspire, Aspire Pune, Paranjape Aspire price 2026, affordable flats Pune Paranjape, 1BHK Pune Paranjape, 2BHK affordable Pune, Paranjape Schemes affordable housing, ${BRAND_KW}`,
  "/paranjape-schemes-wakad-pune": `Paranjape Schemes Wakad, Paranjape Wakad, Paranjape projects Wakad Pune, 2BHK Wakad Pune, Paranjape builder Wakad, flats Wakad Paranjape 2026, ${BRAND_KW}`,
  "/paranjape-schemes-baner-pune": `Paranjape Schemes Baner, Paranjape Baner Pune, Paranjape projects Baner, 3BHK Baner Paranjape, luxury apartments Baner Pune Paranjape, ${BRAND_KW}`,
  "/paranjape-schemes-kothrud-pune": `Paranjape Schemes Kothrud, Paranjape Kothrud Pune, Paranjape projects Kothrud, 3BHK Kothrud Paranjape, premium apartments Kothrud Pune Paranjape, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-complete-guide": `Paranjape Forest Trails Bhugaon, Forest Trails complete guide, Forest Trails all enclaves, Paranjape Forest Trails review 2026, Forest Trails township Bhugaon, ${BRAND_KW}`,

  // ─── Brand Intent Dominance Routes ──────────────────────────────────────────
  "/paranjape-forest-trails-bhugaon-price-2026": `Paranjape Forest Trails Bhugaon price 2026, Forest Trails Bhugaon price list, Paranjape Forest Trails price, Forest Trails plot price 2026, Forest Trails villa price, Forest Trails apartment price, paranjapetownship price list, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-location-map": `Paranjape Forest Trails Bhugaon location, Forest Trails Bhugaon map, how to reach Forest Trails Bhugaon, Forest Trails Bhugaon address, Forest Trails Bhugaon directions, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-floor-plan-2026": `Paranjape Forest Trails Bhugaon floor plan, Forest Trails floor plan 2026, Forest Trails Bhugaon plan, Forest Trails 2BHK floor plan, Forest Trails villa floor plan, Forest Trails NA plot layout, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-review": `Paranjape Forest Trails Bhugaon review, Forest Trails Bhugaon review 2026, Forest Trails Bhugaon rating, is Forest Trails worth buying, Forest Trails Bhugaon buyer review, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-site-visit": `Forest Trails Bhugaon site visit, Paranjape Forest Trails site visit booking, Forest Trails Bhugaon visit, book site visit Forest Trails, Forest Trails tour Bhugaon, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-rera": `Paranjape Forest Trails RERA number, Forest Trails Bhugaon MahaRERA, Forest Trails RERA P52100053834, Forest Trails RERA registration, paranjapetownship MahaRERA verified, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-amenities-complete": `Paranjape Forest Trails Bhugaon amenities, Forest Trails amenities list, Forest Trails Bhugaon facilities, Forest Trails club house, Forest Trails sports complex, ${BRAND_KW}`,


  // ─── High-Converting Hub Routes ─────────────────────────────────────────────
  "/nri-property-pune-west": `NRI property Pune, NRI real estate Pune 2026, buy property in India from USA UK Dubai, FEMA rules property India, NRI NA plots Pune, Paranjape NRI desk, ${BRAND_KW}`,
  "/senior-living-pune-west": `senior living Pune, retirement homes Pune West 2026, Athashri Bhugaon, senior citizen flats Pune, assisted living Pune, Paranjape senior housing, ${BRAND_KW}`,
  "/property-vs-stocks-vs-gold-pune": `property vs stocks India 2026, real estate vs gold ROI Pune, land investment vs mutual funds, Pune NA plots appreciation rate, best investment Pune 2026, ${BRAND_KW}`,
  "/rera-status-forest-trails": `Forest Trails RERA number, MahaRERA P52100053834, Forest Trails possession date 2026, Paranjape RERA certificate, Bhugaon RERA approved projects, ${BRAND_KW}`,

  // ─── Permutation Routes (auto-generated)
  "/2bhk-near-bavdhan": `2BHK near Bavdhan, 2BHK flat near Bavdhan Pune, buy 2BHK near Bavdhan, 2BHK price near Bavdhan 2026, 2BHK apartment near Bavdhan, ready to move 2BHK near Bavdhan, 2BHK 3BHK near Bavdhan Pune, Forest Trails 2BHK Bavdhan, Paranjape 2BHK near Bavdhan, RERA 2BHK near Bavdhan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-paud-road": `2BHK near Paud Road, 2BHK flat near Paud Road Pune, buy 2BHK near Paud Road, 2BHK price near Paud Road 2026, 2BHK apartment near Paud Road, ready to move 2BHK near Paud Road, 2BHK 3BHK near Paud Road Pune, Forest Trails 2BHK Paud Road, Paranjape 2BHK near Paud Road, RERA 2BHK near Paud Road, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-aundh": `2BHK near Aundh, 2BHK flat near Aundh Pune, buy 2BHK near Aundh, 2BHK price near Aundh 2026, 2BHK apartment near Aundh, ready to move 2BHK near Aundh, 2BHK 3BHK near Aundh Pune, Forest Trails 2BHK Aundh, Paranjape 2BHK near Aundh, RERA 2BHK near Aundh, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-warje": `2BHK near Warje, 2BHK flat near Warje Pune, buy 2BHK near Warje, 2BHK price near Warje 2026, 2BHK apartment near Warje, ready to move 2BHK near Warje, 2BHK 3BHK near Warje Pune, Forest Trails 2BHK Warje, Paranjape 2BHK near Warje, RERA 2BHK near Warje, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-karve-nagar": `2BHK near Karve Nagar, 2BHK flat near Karve Nagar Pune, buy 2BHK near Karve Nagar, 2BHK price near Karve Nagar 2026, 2BHK apartment near Karve Nagar, ready to move 2BHK near Karve Nagar, 2BHK 3BHK near Karve Nagar Pune, Forest Trails 2BHK Karve Nagar, Paranjape 2BHK near Karve Nagar, RERA 2BHK near Karve Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-shivaji-nagar": `2BHK near Shivaji Nagar, 2BHK flat near Shivaji Nagar Pune, buy 2BHK near Shivaji Nagar, 2BHK price near Shivaji Nagar 2026, 2BHK apartment near Shivaji Nagar, ready to move 2BHK near Shivaji Nagar, 2BHK 3BHK near Shivaji Nagar Pune, Forest Trails 2BHK Shivaji Nagar, Paranjape 2BHK near Shivaji Nagar, RERA 2BHK near Shivaji Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-hinjewadi": `2BHK near Hinjewadi, 2BHK flat near Hinjewadi Pune, buy 2BHK near Hinjewadi, 2BHK price near Hinjewadi 2026, 2BHK apartment near Hinjewadi, ready to move 2BHK near Hinjewadi, 2BHK 3BHK near Hinjewadi Pune, Forest Trails 2BHK Hinjewadi, Paranjape 2BHK near Hinjewadi, RERA 2BHK near Hinjewadi, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-wakad": `2BHK near Wakad, 2BHK flat near Wakad Pune, buy 2BHK near Wakad, 2BHK price near Wakad 2026, 2BHK apartment near Wakad, ready to move 2BHK near Wakad, 2BHK 3BHK near Wakad Pune, Forest Trails 2BHK Wakad, Paranjape 2BHK near Wakad, RERA 2BHK near Wakad, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-baner": `2BHK near Baner, 2BHK flat near Baner Pune, buy 2BHK near Baner, 2BHK price near Baner 2026, 2BHK apartment near Baner, ready to move 2BHK near Baner, 2BHK 3BHK near Baner Pune, Forest Trails 2BHK Baner, Paranjape 2BHK near Baner, RERA 2BHK near Baner, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/2bhk-near-pashan": `2BHK near Pashan, 2BHK flat near Pashan Pune, buy 2BHK near Pashan, 2BHK price near Pashan 2026, 2BHK apartment near Pashan, ready to move 2BHK near Pashan, 2BHK 3BHK near Pashan Pune, Forest Trails 2BHK Pashan, Paranjape 2BHK near Pashan, RERA 2BHK near Pashan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-bavdhan": `3BHK near Bavdhan, 3BHK flat near Bavdhan Pune, buy 3BHK near Bavdhan, 3BHK price near Bavdhan 2026, 3BHK apartment near Bavdhan, ready to move 3BHK near Bavdhan, 2BHK 3BHK near Bavdhan Pune, Forest Trails 3BHK Bavdhan, Paranjape 3BHK near Bavdhan, RERA 3BHK near Bavdhan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-paud-road": `3BHK near Paud Road, 3BHK flat near Paud Road Pune, buy 3BHK near Paud Road, 3BHK price near Paud Road 2026, 3BHK apartment near Paud Road, ready to move 3BHK near Paud Road, 2BHK 3BHK near Paud Road Pune, Forest Trails 3BHK Paud Road, Paranjape 3BHK near Paud Road, RERA 3BHK near Paud Road, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-aundh": `3BHK near Aundh, 3BHK flat near Aundh Pune, buy 3BHK near Aundh, 3BHK price near Aundh 2026, 3BHK apartment near Aundh, ready to move 3BHK near Aundh, 2BHK 3BHK near Aundh Pune, Forest Trails 3BHK Aundh, Paranjape 3BHK near Aundh, RERA 3BHK near Aundh, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-warje": `3BHK near Warje, 3BHK flat near Warje Pune, buy 3BHK near Warje, 3BHK price near Warje 2026, 3BHK apartment near Warje, ready to move 3BHK near Warje, 2BHK 3BHK near Warje Pune, Forest Trails 3BHK Warje, Paranjape 3BHK near Warje, RERA 3BHK near Warje, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-karve-nagar": `3BHK near Karve Nagar, 3BHK flat near Karve Nagar Pune, buy 3BHK near Karve Nagar, 3BHK price near Karve Nagar 2026, 3BHK apartment near Karve Nagar, ready to move 3BHK near Karve Nagar, 2BHK 3BHK near Karve Nagar Pune, Forest Trails 3BHK Karve Nagar, Paranjape 3BHK near Karve Nagar, RERA 3BHK near Karve Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-shivaji-nagar": `3BHK near Shivaji Nagar, 3BHK flat near Shivaji Nagar Pune, buy 3BHK near Shivaji Nagar, 3BHK price near Shivaji Nagar 2026, 3BHK apartment near Shivaji Nagar, ready to move 3BHK near Shivaji Nagar, 2BHK 3BHK near Shivaji Nagar Pune, Forest Trails 3BHK Shivaji Nagar, Paranjape 3BHK near Shivaji Nagar, RERA 3BHK near Shivaji Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-hinjewadi": `3BHK near Hinjewadi, 3BHK flat near Hinjewadi Pune, buy 3BHK near Hinjewadi, 3BHK price near Hinjewadi 2026, 3BHK apartment near Hinjewadi, ready to move 3BHK near Hinjewadi, 2BHK 3BHK near Hinjewadi Pune, Forest Trails 3BHK Hinjewadi, Paranjape 3BHK near Hinjewadi, RERA 3BHK near Hinjewadi, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-wakad": `3BHK near Wakad, 3BHK flat near Wakad Pune, buy 3BHK near Wakad, 3BHK price near Wakad 2026, 3BHK apartment near Wakad, ready to move 3BHK near Wakad, 2BHK 3BHK near Wakad Pune, Forest Trails 3BHK Wakad, Paranjape 3BHK near Wakad, RERA 3BHK near Wakad, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-baner": `3BHK near Baner, 3BHK flat near Baner Pune, buy 3BHK near Baner, 3BHK price near Baner 2026, 3BHK apartment near Baner, ready to move 3BHK near Baner, 2BHK 3BHK near Baner Pune, Forest Trails 3BHK Baner, Paranjape 3BHK near Baner, RERA 3BHK near Baner, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/3bhk-near-pashan": `3BHK near Pashan, 3BHK flat near Pashan Pune, buy 3BHK near Pashan, 3BHK price near Pashan 2026, 3BHK apartment near Pashan, ready to move 3BHK near Pashan, 2BHK 3BHK near Pashan Pune, Forest Trails 3BHK Pashan, Paranjape 3BHK near Pashan, RERA 3BHK near Pashan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-bavdhan": `4BHK near Bavdhan, 4BHK flat near Bavdhan Pune, buy 4BHK near Bavdhan, 4BHK price near Bavdhan 2026, 4BHK apartment near Bavdhan, ready to move 4BHK near Bavdhan, 2BHK 3BHK near Bavdhan Pune, Forest Trails 4BHK Bavdhan, Paranjape 4BHK near Bavdhan, RERA 4BHK near Bavdhan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-paud-road": `4BHK near Paud Road, 4BHK flat near Paud Road Pune, buy 4BHK near Paud Road, 4BHK price near Paud Road 2026, 4BHK apartment near Paud Road, ready to move 4BHK near Paud Road, 2BHK 3BHK near Paud Road Pune, Forest Trails 4BHK Paud Road, Paranjape 4BHK near Paud Road, RERA 4BHK near Paud Road, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-aundh": `4BHK near Aundh, 4BHK flat near Aundh Pune, buy 4BHK near Aundh, 4BHK price near Aundh 2026, 4BHK apartment near Aundh, ready to move 4BHK near Aundh, 2BHK 3BHK near Aundh Pune, Forest Trails 4BHK Aundh, Paranjape 4BHK near Aundh, RERA 4BHK near Aundh, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-warje": `4BHK near Warje, 4BHK flat near Warje Pune, buy 4BHK near Warje, 4BHK price near Warje 2026, 4BHK apartment near Warje, ready to move 4BHK near Warje, 2BHK 3BHK near Warje Pune, Forest Trails 4BHK Warje, Paranjape 4BHK near Warje, RERA 4BHK near Warje, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-karve-nagar": `4BHK near Karve Nagar, 4BHK flat near Karve Nagar Pune, buy 4BHK near Karve Nagar, 4BHK price near Karve Nagar 2026, 4BHK apartment near Karve Nagar, ready to move 4BHK near Karve Nagar, 2BHK 3BHK near Karve Nagar Pune, Forest Trails 4BHK Karve Nagar, Paranjape 4BHK near Karve Nagar, RERA 4BHK near Karve Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-shivaji-nagar": `4BHK near Shivaji Nagar, 4BHK flat near Shivaji Nagar Pune, buy 4BHK near Shivaji Nagar, 4BHK price near Shivaji Nagar 2026, 4BHK apartment near Shivaji Nagar, ready to move 4BHK near Shivaji Nagar, 2BHK 3BHK near Shivaji Nagar Pune, Forest Trails 4BHK Shivaji Nagar, Paranjape 4BHK near Shivaji Nagar, RERA 4BHK near Shivaji Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-hinjewadi": `4BHK near Hinjewadi, 4BHK flat near Hinjewadi Pune, buy 4BHK near Hinjewadi, 4BHK price near Hinjewadi 2026, 4BHK apartment near Hinjewadi, ready to move 4BHK near Hinjewadi, 2BHK 3BHK near Hinjewadi Pune, Forest Trails 4BHK Hinjewadi, Paranjape 4BHK near Hinjewadi, RERA 4BHK near Hinjewadi, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-wakad": `4BHK near Wakad, 4BHK flat near Wakad Pune, buy 4BHK near Wakad, 4BHK price near Wakad 2026, 4BHK apartment near Wakad, ready to move 4BHK near Wakad, 2BHK 3BHK near Wakad Pune, Forest Trails 4BHK Wakad, Paranjape 4BHK near Wakad, RERA 4BHK near Wakad, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-baner": `4BHK near Baner, 4BHK flat near Baner Pune, buy 4BHK near Baner, 4BHK price near Baner 2026, 4BHK apartment near Baner, ready to move 4BHK near Baner, 2BHK 3BHK near Baner Pune, Forest Trails 4BHK Baner, Paranjape 4BHK near Baner, RERA 4BHK near Baner, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/4bhk-near-pashan": `4BHK near Pashan, 4BHK flat near Pashan Pune, buy 4BHK near Pashan, 4BHK price near Pashan 2026, 4BHK apartment near Pashan, ready to move 4BHK near Pashan, 2BHK 3BHK near Pashan Pune, Forest Trails 4BHK Pashan, Paranjape 4BHK near Pashan, RERA 4BHK near Pashan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-bavdhan": `5BHK near Bavdhan, 5BHK flat near Bavdhan Pune, buy 5BHK near Bavdhan, 5BHK price near Bavdhan 2026, 5BHK apartment near Bavdhan, ready to move 5BHK near Bavdhan, 2BHK 3BHK near Bavdhan Pune, Forest Trails 5BHK Bavdhan, Paranjape 5BHK near Bavdhan, RERA 5BHK near Bavdhan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-paud-road": `5BHK near Paud Road, 5BHK flat near Paud Road Pune, buy 5BHK near Paud Road, 5BHK price near Paud Road 2026, 5BHK apartment near Paud Road, ready to move 5BHK near Paud Road, 2BHK 3BHK near Paud Road Pune, Forest Trails 5BHK Paud Road, Paranjape 5BHK near Paud Road, RERA 5BHK near Paud Road, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-aundh": `5BHK near Aundh, 5BHK flat near Aundh Pune, buy 5BHK near Aundh, 5BHK price near Aundh 2026, 5BHK apartment near Aundh, ready to move 5BHK near Aundh, 2BHK 3BHK near Aundh Pune, Forest Trails 5BHK Aundh, Paranjape 5BHK near Aundh, RERA 5BHK near Aundh, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-warje": `5BHK near Warje, 5BHK flat near Warje Pune, buy 5BHK near Warje, 5BHK price near Warje 2026, 5BHK apartment near Warje, ready to move 5BHK near Warje, 2BHK 3BHK near Warje Pune, Forest Trails 5BHK Warje, Paranjape 5BHK near Warje, RERA 5BHK near Warje, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-karve-nagar": `5BHK near Karve Nagar, 5BHK flat near Karve Nagar Pune, buy 5BHK near Karve Nagar, 5BHK price near Karve Nagar 2026, 5BHK apartment near Karve Nagar, ready to move 5BHK near Karve Nagar, 2BHK 3BHK near Karve Nagar Pune, Forest Trails 5BHK Karve Nagar, Paranjape 5BHK near Karve Nagar, RERA 5BHK near Karve Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-shivaji-nagar": `5BHK near Shivaji Nagar, 5BHK flat near Shivaji Nagar Pune, buy 5BHK near Shivaji Nagar, 5BHK price near Shivaji Nagar 2026, 5BHK apartment near Shivaji Nagar, ready to move 5BHK near Shivaji Nagar, 2BHK 3BHK near Shivaji Nagar Pune, Forest Trails 5BHK Shivaji Nagar, Paranjape 5BHK near Shivaji Nagar, RERA 5BHK near Shivaji Nagar, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-hinjewadi": `5BHK near Hinjewadi, 5BHK flat near Hinjewadi Pune, buy 5BHK near Hinjewadi, 5BHK price near Hinjewadi 2026, 5BHK apartment near Hinjewadi, ready to move 5BHK near Hinjewadi, 2BHK 3BHK near Hinjewadi Pune, Forest Trails 5BHK Hinjewadi, Paranjape 5BHK near Hinjewadi, RERA 5BHK near Hinjewadi, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-wakad": `5BHK near Wakad, 5BHK flat near Wakad Pune, buy 5BHK near Wakad, 5BHK price near Wakad 2026, 5BHK apartment near Wakad, ready to move 5BHK near Wakad, 2BHK 3BHK near Wakad Pune, Forest Trails 5BHK Wakad, Paranjape 5BHK near Wakad, RERA 5BHK near Wakad, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-baner": `5BHK near Baner, 5BHK flat near Baner Pune, buy 5BHK near Baner, 5BHK price near Baner 2026, 5BHK apartment near Baner, ready to move 5BHK near Baner, 2BHK 3BHK near Baner Pune, Forest Trails 5BHK Baner, Paranjape 5BHK near Baner, RERA 5BHK near Baner, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/5bhk-near-pashan": `5BHK near Pashan, 5BHK flat near Pashan Pune, buy 5BHK near Pashan, 5BHK price near Pashan 2026, 5BHK apartment near Pashan, ready to move 5BHK near Pashan, 2BHK 3BHK near Pashan Pune, Forest Trails 5BHK Pashan, Paranjape 5BHK near Pashan, RERA 5BHK near Pashan, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/flats-under-1-crore-pune-west": `flats under 1 crore Pune West, apartments under 1 crore Pune, 2BHK under 1 crore Bhugaon, ready to move under 1 crore Pune West, RERA flat under 1 crore Pune, affordable flat Pune West 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/property-under-90-lakhs-pune-west": `property under 90 lakhs Pune West, flat under 90 lakhs Pune, 2BHK under 90 lakhs Bhugaon, apartment under 90 lakhs Pune West, affordable flat Bavdhan proximity, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/luxury-villa-above-2-crore-pune-west": `luxury villa above 2 crore Pune, villa above 2 crore Pune West, 4BHK villa Pune West 2026, 5BHK luxury villa Pune, premium villa Bhugaon, forest villa Pune above 2 crore, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/na-plot-under-2-crore-pune-west": `NA plot under 2 crore Pune, bungalow plot under 2 crore Pune West, NA plot Bhugaon under 2 crore, buy NA plot under 2 crore Pune, RERA plot under 2 crore Pune West 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/investment-property-above-1-crore-pune": `investment property above 1 crore Pune, buy property above 1 crore Pune West, best ROI property Pune above 1 crore, premium property investment Pune 2026, NA plot investment above 1 crore Pune, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/property-near-hinjewadi-it-park": `property near Hinjewadi IT Park, flat near Hinjewadi Pune, buy property near Hinjewadi, 2BHK near Hinjewadi, NA plot near Hinjewadi, investment property near Hinjewadi 2026, affordable flat near Hinjewadi IT park, RERA property Hinjewadi proximity, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/property-near-ssrvm-school-bhugaon": `property near SSRVM school Bhugaon, flat near SSRVM school Pune, buy property near SSRVM, school near Forest Trails Bhugaon, SSRVM International School property nearby, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/property-near-ruby-hall-clinic-pune": `property near Ruby Hall Clinic, flat near Ruby Hall Pune, apartment near Ruby Hall Clinic, senior living near hospital Pune, property near hospital Pune West 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/gated-community-pune-west-2026": `gated community Pune West 2026, best gated community Pune, gated township Pune West, gated society Bhugaon, largest gated community Pune, RERA gated township Pune West 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/forest-view-property-pune": `forest view property Pune, property with forest view Pune, forest facing flat Pune, villa with forest view Pune, nature view property Pune West, forest township Pune 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/weekend-home-pune-2026": `weekend home near Pune, weekend villa near Pune 2026, second home near Pune, farmhouse near Pune, nature home near Pune, holiday home Bhugaon Pune, forest bungalow near Pune, weekend retreat Pune West, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/property-investment-pune-west-2026": `property investment Pune West 2026, best investment Pune West, invest in property Pune West, high ROI property Pune 2026, property appreciation Pune West, NA plot investment Pune 2026, CAGR property Pune West, infrastructure boom Pune West property, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/bhugaon-na-plot-kharidna": `bhugaon mein NA plot, bhugaon mein plot kharidna, pune west mein NA plot, NA plot bhugaon price hindi, Paranjape misty greens hindi, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/pune-mein-2bhk-price": `pune mein 2bhk price, pune west 2bhk hindi, 2BHK flat pune 2026 hindi, bhugaon mein 2bhk kharidna, Paranjape 2bhk hindi, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/pune-mein-ghar-2026": `pune mein ghar kharidna 2026, pune mein property kaise khariden, pune west mein ghar 2026, paranjape forest trails hindi guide, pune mein plot ya flat, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/bhugaon-na-plot-kimat-2026": `bhugaon na plot kimat 2026, bhugaon plot price marathi, na plot bhugaon marathi, misty greens plot kimat, paranjape bhugaon marathi 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/na-plot-vs-flat-pune-marathi": `na plot vs flat pune marathi, plot ki flat kharidna marathi, na plot vs 2bhk pune 2026 marathi, plot investment marathi pune, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/bhugaon-sampurna-mahiti": `bhugaon sampurna mahiti, bhugaon pune marathi guide, bhugaon paud road mahiti, bhugaon property marathi, bhugaon area guide marathi, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/pune-mein-property-tax-2026": `pune property tax 2026 marathi, PMRDA property tax marathi, bhugaon property tax how to pay, pune madhe property tax 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/carpet-area-vs-built-up-area-pune": `carpet area vs built up area Pune, carpet area vs super built up area, what is carpet area RERA India, built up vs super built up Pune 2026, carpet area calculation Pune flat, RERA carpet area disclosure Pune, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/7-12-extract-pune-property": `7/12 extract Pune property, satbara utara Pune, how to get 7/12 extract Maharashtra, check 7/12 online Maharashtra, NA plot 7/12 extract Pune, bhulekh Pune 7/12, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/index-2-property-registration-pune": `index 2 property Pune, index 2 Maharashtra registration, how to get index 2 Pune, index 2 download Maharashtra, index 2 for NA plot Pune, property encumbrance certificate Pune, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/mutation-property-pune": `property mutation Pune, mutation certificate Pune, khata transfer Pune, ferfar Pune property, mutation after property registration Pune 2026, how to do mutation Maharashtra, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/joint-registration-property-pune": `joint registration property Pune, joint ownership property Maharashtra, female co-owner stamp duty concession Pune, joint property registration benefits India, husband wife property registration Pune 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/gift-deed-property-pune": `gift deed property Pune, gift deed stamp duty Maharashtra 2026, transfer property via gift deed Pune, gift deed vs sale deed Pune, gift deed family property Maharashtra, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/pmrda-vs-pmc-property-pune": `PMRDA vs PMC Pune property, PMRDA area Pune property rules, PMC vs PMRDA tax difference, Bhugaon PMRDA or PMC, PMRDA property tax Pune, buy property PMRDA area Pune 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/hinjewadi-it-hub-property-investment-2026": `Hinjewadi IT hub property investment 2026, best property near Hinjewadi IT park, investment near Hinjewadi, flat near Hinjewadi for IT professionals, property ROI near Hinjewadi 2026, Hinjewadi property appreciation 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,
  "/luxury-property-pune-2026": `luxury property Pune 2026, luxury villa Pune above 2 crore, premium property Pune West, luxury bungalow Pune, high end property Pune, ultra luxury property Pune West 2026, Paranjape Forest Trails Bhugaon, Paranjape Schemes Pune, Forest Trails township`,

  // ─── Pune Market Domination Routes ──────────────────────────────────────────
  "/pune-real-estate-2026": `Pune real estate 2026, property rates Pune 2026, buy property Pune, best area Pune property, top builders Pune 2026, Pune property investment, real estate market Pune`,
  "/property-rates-pune-2026": `property rates Pune 2026, Pune flat rate per sqft, area wise property rate Pune, stamp duty Pune 2026, property price Pune area wise, Pune property price index 2026`,
  "/top-builders-pune-2026": `top builders Pune 2026, best builder Pune, trusted builder Pune, Paranjape Schemes ranking, builder review Pune 2026, reputed builder Pune`,
  "/pune-metro-impact-property-2026": `Pune Metro property prices 2026, Pune Metro Phase 2 real estate, property near Pune Metro, Hinjewadi Metro property, Metro impact Pune West`,
  "/property-in-bhugaon-pune": `property in Bhugaon Pune, Bhugaon property rate 2026, buy flat Bhugaon, Bhugaon real estate 2026, property investment Bhugaon`,
  "/property-in-bavdhan-pune": `property in Bavdhan Pune, Bavdhan property rate 2026, buy flat Bavdhan, Bavdhan real estate 2026, 2BHK Bavdhan Pune`,
  "/property-in-baner-pune": `property in Baner Pune, Baner property rate 2026, buy flat Baner, Baner real estate 2026, 3BHK Baner Pune luxury`,
  "/property-in-hinjewadi-pune": `property in Hinjewadi Pune, Hinjewadi property rate 2026, buy flat near Hinjewadi IT park, Hinjewadi real estate 2026, IT professional flat Hinjewadi`,
  "/property-in-wakad-pune": `property in Wakad Pune, Wakad property rate 2026, buy flat Wakad Pune, Wakad real estate 2026, 2BHK Wakad near Hinjewadi`,
  "/property-in-kothrud-pune": `property in Kothrud Pune, Kothrud property rate 2026, buy flat Kothrud, Kothrud real estate 2026, premium 3BHK Kothrud`,
  "/property-in-kharadi-pune": `property in Kharadi Pune, Kharadi property rate 2026, buy flat Kharadi, Kharadi real estate 2026, IT east Pune property`,
  "/property-in-hadapsar-pune": `property in Hadapsar Pune, Hadapsar property rate 2026, buy flat Hadapsar, Hadapsar real estate 2026, affordable 2BHK Hadapsar`,
  "/property-in-viman-nagar-pune": `property in Viman Nagar Pune, Viman Nagar property rate 2026, buy flat near airport Pune, Viman Nagar real estate 2026`,
  "/property-in-aundh-pune": `property in Aundh Pune, Aundh property rate 2026, buy flat Aundh, Aundh real estate 2026, luxury flat Aundh Pune`,
  "/property-in-wagholi-pune": `property in Wagholi Pune, Wagholi property rate 2026, affordable flat Wagholi, Wagholi real estate 2026, budget flat Pune east`,
  "/property-in-sus-road-pune": `property near Sus Road Pune, Sus Road property rate 2026, emerging Pune West, Sus Pashan property 2026, buy flat Sus Road`,
  "/property-in-undri-pune": `property in Undri Pune, NIBM property Pune, Undri real estate 2026, affordable south Pune property, buy flat Undri NIBM`,
  "/property-in-kondhwa-pune": `property in Kondhwa Pune, Kondhwa property rate 2026, buy flat Kondhwa, south Pune property 2026, affordable flat Kondhwa`,
  "/property-in-paud-road-pune": `property on Paud Road Pune, Paud Road property rate 2026, buy NA plot Paud Road, bungalow Paud Road Pune, Forest Trails Paud Road`,
  // ─── Pune Market Broad Queries ────────────────────────────────────────────────
  "/pune-property": `Pune property, property in Pune, real estate Pune, buy property Pune 2026, Pune flat, Pune villa, Pune plot`,
  "/new-projects-pune-2026": `new projects Pune 2026, new launch Pune, upcoming projects Pune, new residential projects Pune 2026, new flats Pune 2026`,
  "/ready-to-move-flats-pune": `ready to move flats Pune, ready possession apartments Pune, immediate possession flat Pune 2026, ready to move in Pune`,
  "/best-localities-pune-investment-2026": `best localities Pune investment 2026, best area buy property Pune, top investment areas Pune 2026, highest ROI Pune localities`,
  "/nri-property-pune-2026": `NRI property investment Pune 2026, NRI buy property Pune, FEMA property Pune, NRI real estate Pune, NRI investment Pune West 2026`,

  // ─── Paranjape Brand Vanity Slugs ────────────────────────────────────────────
  "/paranjape-schemes": `Paranjape Schemes, Paranjape Schemes Construction Ltd, Paranjape builder Pune, Paranjape real estate, Paranjape projects Pune 2026, ${BRAND_KW}`,
  "/paranjape-schemes-review": `Paranjape Schemes review, Paranjape Schemes customer review 2026, Paranjape builder review, is Paranjape Schemes good, Paranjape Schemes rating, ${BRAND_KW}`,
  "/paranjape-schemes-contact": `Paranjape Schemes contact number, Paranjape Schemes phone number Pune, Paranjape builder contact, Forest Trails contact, +91 7744009295, ${BRAND_KW}`,
  "/paranjape-forest-trails-review": `Paranjape Forest Trails review, Forest Trails Bhugaon review, Forest Trails rating 2026, Forest Trails buyer review, is Forest Trails good investment, ${BRAND_KW}`,
  "/paranjape-nri-investment": `Paranjape Schemes NRI investment, Paranjape NRI property Pune, NRI buy Forest Trails, Paranjape Schemes FEMA, NRI real estate Paranjape Pune, ${BRAND_KW}`,
};


// Crawler detection patterns by tier
const CRAWLER_TIERS = {
  tier1: /Googlebot|Google-InspectionTool|Googlebot-Image|Googlebot-Video|Googlebot-News|Mediapartners-Google|AdsBot-Google|Google-Safety|GoogleOther/i,
  tier2: /bingbot|BingPreview|Applebot|DuckDuckBot|Baiduspider|YandexBot|Slurp|SeznamBot/i,
  tier3: /ChatGPT-User|GPTBot|PerplexityBot|ClaudeBot|Bytespider|CCBot|anthropic-ai|cohere-ai|Google-Extended|OAI-SearchBot/i,
  tier4: /WhatsApp|TelegramBot|Slackbot|Discordbot|facebookexternalhit|Twitterbot|LinkedInBot|Pinterestbot/i,
};

// Early Hints preconnect matrix
const EARLY_HINTS_LINKS = [
  "<https://fonts.googleapis.com>; rel=preconnect; crossorigin",
  "<https://fonts.gstatic.com>; rel=preconnect; crossorigin",
  "<https://www.googletagmanager.com>; rel=preconnect",
  "<https://www.google-analytics.com>; rel=preconnect",
];

// ─── Crawler Classification ──────────────────────────────────────────────────

function classifyCrawler(ua) {
  if (CRAWLER_TIERS.tier1.test(ua)) return { tier: 1, label: "google", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier2.test(ua)) return { tier: 2, label: "major-search", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier3.test(ua)) return { tier: 3, label: "ai-crawler", isSearch: false, isSocial: false };
  if (CRAWLER_TIERS.tier4.test(ua)) return { tier: 4, label: "social-preview", isSearch: false, isSocial: true };
  return { tier: 0, label: "user", isSearch: false, isSocial: false };
}

// ─── HTMLRewriter Handler Classes ────────────────────────────────────────────

/**
 * Handler 1: Canonical URL Enforcer
 * Rewrites <link rel="canonical"> to enforce https://www.paranjapetownship.com
 */
class CanonicalEnforcer {
  constructor(pathname) {
    this.pathname = pathname;
  }
  element(el) {
    const href = el.getAttribute("href");
    if (href) {
      // Normalize: force canonical origin, strip trailing index.html
      let cleanPath = this.pathname
        .replace(/\/index\.html$/, "/")
        .replace(/\/$/, "") || "/";
      // Ensure single trailing slash for directories (except root)
      if (cleanPath !== "/" && !cleanPath.includes(".")) {
        cleanPath += "/";
      }
      el.setAttribute("href", CANONICAL_ORIGIN + cleanPath);
    }
  }
}

/**
 * Handler 2: <head> Meta & Resource Injector
 * Appends geo tags, preconnect hints, and hreflang
 */
class HeadMetaInjector {
  constructor(pathname, crawlerInfo, cfData) {
    this.pathname = pathname;
    this.crawlerInfo = crawlerInfo;
    this.cfData = cfData;
  }
  element(head) {
    const cleanPath = this.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    const canonicalUrl = CANONICAL_ORIGIN + (cleanPath === "/" ? "/" : cleanPath + "/");

    // Geo-location meta tags
    const geoBlock = `
<!-- CF Edge SEO Engine v5.0 -->
<meta name="geo.region" content="IN-MH">
<meta name="geo.placename" content="Bhugaon, Pune West, Maharashtra, India">
<meta name="geo.position" content="18.5050;73.7406">
<meta name="ICBM" content="18.5050, 73.7406">
<meta name="author" content="Paranjape Schemes (Construction) Ltd.">
<meta name="copyright" content="© 2026 Paranjape Forest Trails. All Rights Reserved.">`;

    // Preconnect & DNS-prefetch hints
    const preconnectBlock = `
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://formsubmit.co">`;

    // Hreflang for international SEO
    const hreflangBlock = `
<link rel="alternate" hreflang="en-IN" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`;

    head.append(geoBlock + preconnectBlock + hreflangBlock, { html: true });
  }
}

/**
 * Handler 7: Keyword Meta Injector
 * Injects page-specific <meta name="keywords"> at the edge using KEYWORD_ROUTES.
 * Runs on ALL HTML responses — covers Astro pages, legacy static files, and new keyword pages.
 * Uses prefix matching so /path/ and /path/index.html both resolve.
 */
class KeywordMetaInjector {
  constructor(pathname) {
    // Normalize: strip trailing slash, strip index.html
    this.cleanPath = pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  }
  element(head) {
    // Exact match first, then prefix match
    let keywords = KEYWORD_ROUTES[this.cleanPath] || KEYWORD_ROUTES[this.cleanPath + "/"] || null;

    // Prefix fallback: find longest matching prefix
    if (!keywords) {
      let bestLen = 0;
      for (const [route, kw] of Object.entries(KEYWORD_ROUTES)) {
        if (route !== "/" && this.cleanPath.startsWith(route) && route.length > bestLen) {
          bestLen = route.length;
          keywords = kw;
        }
      }
    }

    if (keywords) {
      head.append(
        `\n<meta name="keywords" content="${keywords.replace(/"/g, "&quot;")}">`,
        { html: true }
      );
    }
  }
}

/**
 * Handler 3: OG Image Absolutifier
 * Converts relative og:image and twitter:image paths to absolute URLs
 */
class OGImageAbsolutifier {
  element(el) {
    const content = el.getAttribute("content");
    if (content && content.startsWith("/")) {
      el.setAttribute("content", CANONICAL_ORIGIN + content);
    }
  }
}

/**
 * Handler 4: Performance Resource Hint Injector
 * Injects critical typography preload directives and PWA meta
 */
class PerformanceHintInjector {
  element(head) {
    const perfHints = `
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" as="style" crossorigin>
<meta name="theme-color" content="#4A0808">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=yes">
<meta http-equiv="x-dns-prefetch-control" content="on">`;
    head.append(perfHints, { html: true });
  }
}

/**
 * Handler 5: Trailing-Slash <a> Normalizer (Internal Links)
 * Ensures internal navigation links use consistent trailing-slash format
 */
class InternalLinkNormalizer {
  element(el) {
    const href = el.getAttribute("href");
    if (href && href.startsWith("/") && !href.includes(".") && !href.endsWith("/") && href !== "/") {
      el.setAttribute("href", href + "/");
    }
  }
}

/**
 * Handler 6: Image Lazy-Load & Decoding Enforcer
 * Ensures all images below the fold have loading="lazy" and decoding="async"
 */
class ImageOptimizer {
  constructor() {
    this.imageCount = 0;
  }
  element(el) {
    this.imageCount++;
    // First 2 images are above-the-fold: eager load, high priority
    if (this.imageCount <= 2) {
      el.setAttribute("loading", "eager");
      el.setAttribute("fetchpriority", "high");
      el.removeAttribute("decoding");
    } else {
      // Below the fold: lazy load
      if (!el.getAttribute("loading")) {
        el.setAttribute("loading", "lazy");
      }
      if (!el.getAttribute("decoding")) {
        el.setAttribute("decoding", "async");
      }
    }
  }
}

/**
 * Handler 8: External Link Security & SEO Optimizer
 * Automatically enforces rel="noopener noreferrer nofollow" on third-party links,
 * while ensuring internal domains and whitelisted authorities retain follow.
 */
class ExternalLinkOptimizer {
  element(el) {
    const href = el.getAttribute("href");
    if (!href) return;

    const isExternal = (href.startsWith("http://") || href.startsWith("https://")) &&
                       !href.includes("paranjapetownship.com") &&
                       !href.includes("paranjapeplots.com");

    if (isExternal) {
      if (!el.getAttribute("target")) {
        el.setAttribute("target", "_blank");
      }
      
      const currentRel = el.getAttribute("rel") || "";
      const relParts = new Set(currentRel.split(/\s+/).filter(Boolean));
      relParts.add("noopener");
      relParts.add("noreferrer");

      // Don't nofollow government or regulatory authorities (MahaRERA)
      if (!href.includes("maharera.mahaonline.gov.in") && !href.includes("wa.me") && !href.includes("maps.google.com")) {
        relParts.add("nofollow");
      }

      el.setAttribute("rel", Array.from(relParts).join(" "));
    }
  }
}

/**
 * Handler 9: Image Alt & Accessibility Guardian
 * Ensures all images have valid alt text for Googlebot Image search indexing
 */
class ImageAltA11yEnforcer {
  element(el) {
    const alt = el.getAttribute("alt");
    const src = el.getAttribute("src") || "";
    if (!alt || alt.trim() === "") {
      let derivedAlt = "Paranjape Forest Trails Township Bhugaon Pune";
      if (src.includes("misty-greens")) derivedAlt = "Misty Greens NA Plots Forest Trails Bhugaon";
      else if (src.includes("rivolo")) derivedAlt = "The Rivolo Luxury Villas Forest Trails Bhugaon";
      else if (src.includes("cove")) derivedAlt = "The Cove Twin Bungalows Forest Trails Bhugaon";
      else if (src.includes("canopy")) derivedAlt = "The Canopy Nature Apartments Forest Trails Bhugaon";
      else if (src.includes("athashri")) derivedAlt = "Athashri Senior Living Forest Trails Bhugaon";
      else if (src.includes("logo")) derivedAlt = "Paranjape Schemes Corporate Logo";
      el.setAttribute("alt", derivedAlt);
    }
  }
}

/**
 * Handler 10: Dynamic JSON-LD Breadcrumb & Semantic Microdata Injector
 * Dynamically synthesizes BreadcrumbList schema if not detected in static markup
 */
class SemanticStructureGuardian {
  constructor(pathname) {
    this.pathname = pathname;
    this.hasSchema = false;
  }
  element(head) {
    const cleanPath = this.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
    if (cleanPath && cleanPath !== "") {
      const segments = cleanPath.split("/").filter(Boolean);
      const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": CANONICAL_ORIGIN + "/"
          }
        ]
      };

      let accum = "";
      segments.forEach((seg, idx) => {
        accum += "/" + seg;
        const name = seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        breadcrumbList.itemListElement.push({
          "@type": "ListItem",
          "position": idx + 2,
          "name": name,
          "item": CANONICAL_ORIGIN + accum + "/"
        });
      });

      head.append(
        `\n<!-- CF Edge Semantic Breadcrumb Guardian -->\n<script type="application/ld+json">\n${JSON.stringify(breadcrumbList, null, 2)}\n</script>\n`,
        { html: true }
      );
    }
  }
}

// ─── Cache Strategy ──────────────────────────────────────────────────────────

function applyCacheHeaders(headers, url) {
  const pathname = url.pathname;

  // Immutable hashed assets (_astro/*)
  if (pathname.startsWith("/_astro/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    return;
  }

  // Static media (images, assets, branding)
  if (pathname.startsWith("/images/") || pathname.startsWith("/assets/") || pathname.startsWith("/media/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    headers.set("Timing-Allow-Origin", "*");
    return;
  }

  // Sitemaps, robots.txt, RSS
  if (pathname.endsWith(".xml") || pathname === "/robots.txt" || pathname.endsWith(".txt")) {
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=86400");
    if (pathname.endsWith(".xml")) {
      headers.set("X-Robots-Tag", "noindex, follow");
    }
    return;
  }

  // CSS & JS bundles
  if (pathname.endsWith(".css") || pathname.endsWith(".js")) {
    headers.set("Cache-Control", "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=2592000");
    return;
  }

  // HTML pages
  headers.set("Cache-Control", "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=604800");
  headers.set("CDN-Cache-Control", "max-age=604800");
  headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
}

// ─── Security Headers ────────────────────────────────────────────────────────

function applySecurityHeaders(headers) {
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
}

// ─── Main Middleware ─────────────────────────────────────────────────────────

export async function onRequest(context) {
  const { request, next } = context;
  const startTime = Date.now();

  try {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    const crawlerInfo = classifyCrawler(userAgent);

    // ┌─────────────────────────────────────────────────────────┐
    // │ 1. Domain & Protocol Canonical Redirect (301)           │
    // └─────────────────────────────────────────────────────────┘
    if (
      url.hostname === "paranjapetownship.com" ||
      url.hostname === "paranjapeplots.com" ||
      url.hostname === "www.paranjapeplots.com" ||
      (url.protocol === "http:" && !url.hostname.includes("localhost") && !url.hostname.includes("127.0.0.1"))
    ) {
      const canonicalUrl = new URL(request.url);
      canonicalUrl.hostname = CANONICAL_HOSTNAME;
      canonicalUrl.protocol = "https:";
      return Response.redirect(canonicalUrl.toString(), 301);
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 1b. Legacy Permalink Edge 301 Canonical Routing         │
    // └─────────────────────────────────────────────────────────┘
    const cleanPath = url.pathname.replace(/\/$/, "");
    if (PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath]) {
      const target = PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath];
      return Response.redirect(`${CANONICAL_ORIGIN}${target}`, 301);
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 2. Fetch Origin Response                                │
    // └─────────────────────────────────────────────────────────┘
    const response = await next();
    const contentType = response.headers.get("content-type") || "";
    const isHTML = contentType.includes("text/html");

    // ┌─────────────────────────────────────────────────────────┐
    // │ 3. HTMLRewriter Pipeline (HTML responses only)           │
    // └─────────────────────────────────────────────────────────┘
    let transformedResponse = response;

    if (isHTML && response.status === 200) {
      // Extract Cloudflare geo data
      const cfData = {
        country: request.cf?.country || "IN",
        city: request.cf?.city || "Pune",
        colo: request.cf?.colo || "BOM",
        region: request.cf?.region || "Maharashtra",
      };

      const rewriter = new HTMLRewriter()
        // Handler 1: Canonical URL enforcement
        .on('link[rel="canonical"]', new CanonicalEnforcer(url.pathname))
        // Handler 2: Meta, geo, hreflang, and JSON-LD injection
        .on("head", new HeadMetaInjector(url.pathname, crawlerInfo, cfData))
        // Handler 3: OG image absolutification
        .on('meta[property="og:image"]', new OGImageAbsolutifier())
        .on('meta[name="twitter:image"]', new OGImageAbsolutifier())
        .on('meta[property="og:image:url"]', new OGImageAbsolutifier())
        // Handler 4: Performance resource hints
        .on("head", new PerformanceHintInjector())
        // Handler 5: Internal link trailing-slash normalization
        .on('a[href^="/"]', new InternalLinkNormalizer())
        // Handler 6: Image lazy-load optimization
        .on("img", new ImageOptimizer())
        // Handler 7: Page-specific keyword meta injection
        .on("head", new KeywordMetaInjector(url.pathname))
        // Handler 8: External link security and rel optimizer
        .on('a[href^="http"]', new ExternalLinkOptimizer())
        // Handler 9: Image accessibility and alt enforcement for Googlebot Image
        .on("img", new ImageAltA11yEnforcer());

      transformedResponse = rewriter.transform(response);
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 4. Build Edge Response Headers                          │
    // └─────────────────────────────────────────────────────────┘
    const headers = new Headers(transformedResponse.headers);

    // Security headers
    applySecurityHeaders(headers);

    // Cache strategy
    applyCacheHeaders(headers, url);

    // Early Hints & preconnect
    headers.set("Link", EARLY_HINTS_LINKS.join(", "));

    // Content-Language based on geo
    const country = request.cf?.country || "IN";
    headers.set("Content-Language", country === "IN" ? "en-IN" : "en");
    headers.set("Vary", "Accept-Encoding");

    // ┌─────────────────────────────────────────────────────────┐
    // │ 5. Performance Instrumentation                          │
    // └─────────────────────────────────────────────────────────┘
    const edgeDuration = Date.now() - startTime;
    headers.set("Server-Timing", `edge;dur=${edgeDuration};desc="CF Edge Rewriter"`);
    headers.set("X-Edge-Location", request.cf?.colo || "unknown");
    headers.set("X-Response-Source", "cf-edge-rewriter-v5");

    // ┌─────────────────────────────────────────────────────────┐
    // │ 6. Crawler-Specific Headers                             │
    // └─────────────────────────────────────────────────────────┘
    if (crawlerInfo.tier > 0) {
      headers.set("X-Crawler-Tier", `${crawlerInfo.tier}:${crawlerInfo.label}`);

      if (crawlerInfo.tier === 1) {
        headers.set("X-Googlebot-Edge", "accelerated;tier=priority;rewriter=active");
        headers.set("X-Google-Indexing-Protocol", "v3;supported");
      } else if (crawlerInfo.tier === 2) {
        headers.set("X-Search-Edge", "accelerated;tier=major;indexnow=enabled");
      } else if (crawlerInfo.tier === 3) {
        headers.set("X-AI-Citation-Policy", "allowed;attribution=Paranjape Schemes (Construction) Ltd");
      }
    }

    // ┌─────────────────────────────────────────────────────────┐
    // │ 7. Network Error Logging (NEL) for RUM                  │
    // └─────────────────────────────────────────────────────────┘
    headers.set("NEL", JSON.stringify({
      report_to: "default",
      max_age: 86400,
      include_subdomains: true,
      failure_fraction: 1.0,
    }));
    headers.set("Report-To", JSON.stringify({
      group: "default",
      max_age: 86400,
      endpoints: [{ url: `${CANONICAL_ORIGIN}/api/nel-report` }],
      include_subdomains: true,
    }));

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers,
    });

  } catch (err) {
    // ┌─────────────────────────────────────────────────────────┐
    // │ FAIL-SAFE: Never throw — always fall through to origin  │
    // └─────────────────────────────────────────────────────────┘
    console.error("CF Edge SEO Engine Exception:", err.message, err.stack);
    try {
      return await next();
    } catch (_) {
      return new Response("Service temporarily unavailable", { status: 503 });
    }
  }
}
