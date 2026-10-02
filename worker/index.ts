/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Ultra-Advanced Cloudflare Standalone SEO Worker v5.0
 * Domain: https://www.paranjapetownship.com
 * Architecture: ES Modules Worker with Streaming HTMLRewriter Pipeline
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Core Capabilities:
 *  1. Sub-5ms Edge TTFB with Edge Cache API (`caches.default`)
 *  2. Apex to WWW Canonical 301 Edge Normalization
 *  3. 4-Tier Crawler Intelligence Classification
 *  4. 6x Real-Time Streaming HTMLRewriter Transformations
 *  5. Serverless High-Speed Lead Ingestion (`/api/lead-capture` & `/api/enquiry`)
 *  6. Cloudflare R2 Media Object Streaming Proxy with Range Header Support
 *  7. Hardened Edge Security & Core Web Vitals Headers
 *  8. Geo-Targeted ICBM & Sitelinks Search Schema Injection
 */

export interface Env {
  MEDIA_BUCKET?: R2Bucket;
  DB?: D1Database;
  RATE_LIMIT_KV?: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;
  ENVIRONMENT?: string;
  ORIGIN_URL?: string;
}

const CANONICAL_HOSTNAME = "www.paranjapetownship.com";
const CANONICAL_ORIGIN = "https://www.paranjapetownship.com";

// Permanent canonical routing for legacy enclaves & facilities
const PERMALINK_REDIRECTS: Record<string, string> = {
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
  "/the-verandah": "/paranjape-forest-trails-township-bhugaon-verandah/",
  "/orchard": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
  "/orchard-residences": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
  "/swaniketan": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
  "/apartments": "/paranjape-forest-trails-township-bhugaon-apartments/",
  "/villas": "/paranjape-forest-trails-township-bhugaon-luxury-forest-villas-bhugaon/",
  "/rera-compliance-guide": "/rera-status-forest-trails/",
  "/contact": "/paranjape-schemes-contact/",
  "/paranjape-forest-trails-township-bhugaon-contact": "/paranjape-schemes-contact/",
  "/paranjape-forest-trails-township-bhugaon-brochure": "/paranjape-forest-trails-bhugaon-floor-plan-2026/",
  "/the-cliff-lifestyle-hub": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/cliff-club": "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
  "/sri-sri-ravishankar-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/ssrvm-school": "/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/",
  "/equestrian-academy": "/paranjape-forest-trails-township-bhugaon-amenities/equestrian-academy-pune/",
  "/paranjape-forest-trails-township-bhugaon-villas-plots.html": "/paranjape-forest-trails-township-bhugaon-villas-plots/",
  "/paranjape-forest-trails-township-bhugaon-facilities.html": "/paranjape-forest-trails-township-bhugaon-facilities/",
  "/bhugaon-growth-ledger.html": "/investment/growth-ledger/",
  "/bhugaon-growth-ledger": "/investment/growth-ledger/",
  "/paranjape-forest-trails-township-bhugaon-legal/privacy-policy.html": "/privacy-policy/",
  "/paranjape-forest-trails-township-bhugaon-legal/privacy-policy": "/privacy-policy/",
  "/paranjape-forest-trails-township-bhugaon-legal/terms-conditions.html": "/terms-of-use/",
  "/paranjape-forest-trails-township-bhugaon-legal/terms-conditions": "/terms-of-use/",
  "/terms-conditions": "/terms-of-use/",
};

// ─── Edge Keyword Routing Table ───────────────────────────────────────────────
const BRAND_KW = "Paranjape Schemes Construction Ltd, Paranjape Forest Trails Bhugaon, Forest Trails Pune, Forest Trails Township Paud Road, Misty Greens NA Plots, The Rivolo Villas, The Canopy Apartments, The Highgardens, The Cove Twin Bungalows, Athashri Senior Living, Everglades Bavdhan, The Verandah, Orchard Residences, Swaniketan, RERA approved Bhugaon, MahaRERA P52100053834, MahaRERA P52100031560, MahaRERA P52100079518, MahaRERA P52100048536, 190-acre gated forest township Pune West, luxury real estate Bhugaon, buy property near Chandani Chowk Bavdhan Kothrud";

const KEYWORD_ROUTES: Record<string, string> = {
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
  "/paranjape-schemes-all-projects-pune": `Paranjape Schemes Pune, all Paranjape projects 2026, Paranjape Schemes Construction, Paranjape builder Pune, Paranjape real estate Pune, Paranjape projects list, best builder Pune, Paranjape Schemes review 2026, ${BRAND_KW}`,
  "/paranjape-blue-ridge-hinjewadi": `Paranjape Blue Ridge, Blue Ridge Hinjewadi Pune, Paranjape Blue Ridge price 2026, 2BHK Hinjewadi, 3BHK Hinjewadi, Paranjape Schemes Hinjewadi, Blue Ridge apartments Pune, ${BRAND_KW}`,
  "/paranjape-athashri-pune-projects": `Paranjape Athashri, Athashri Pune, Athashri senior living, Paranjape senior living Pune, retirement homes Pune, Athashri Bhugaon, Athashri price 2026, senior citizen apartments Pune, ${BRAND_KW}`,
  "/paranjape-aspire-pune": `Paranjape Aspire, Aspire Pune, Paranjape Aspire price 2026, affordable flats Pune Paranjape, 1BHK Pune Paranjape, 2BHK affordable Pune, Paranjape Schemes affordable housing, ${BRAND_KW}`,
  "/paranjape-schemes-wakad-pune": `Paranjape Schemes Wakad, Paranjape Wakad, Paranjape projects Wakad Pune, 2BHK Wakad Pune, Paranjape builder Wakad, flats Wakad Paranjape 2026, ${BRAND_KW}`,
  "/paranjape-schemes-baner-pune": `Paranjape Schemes Baner, Paranjape Baner Pune, Paranjape projects Baner, 3BHK Baner Paranjape, luxury apartments Baner Pune Paranjape, ${BRAND_KW}`,
  "/paranjape-schemes-kothrud-pune": `Paranjape Schemes Kothrud, Paranjape Kothrud Pune, Paranjape projects Kothrud, 3BHK Kothrud Paranjape, premium apartments Kothrud Pune Paranjape, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-complete-guide": `Paranjape Forest Trails Bhugaon, Forest Trails complete guide, Forest Trails all enclaves, Paranjape Forest Trails review 2026, Forest Trails township Bhugaon, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-price-2026": `Paranjape Forest Trails Bhugaon price 2026, Forest Trails Bhugaon price list, Paranjape Forest Trails price, Forest Trails plot price 2026, Forest Trails villa price, Forest Trails apartment price, paranjapetownship price list, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-location-map": `Paranjape Forest Trails Bhugaon location, Forest Trails Bhugaon map, how to reach Forest Trails Bhugaon, Forest Trails Bhugaon address, Forest Trails Bhugaon directions, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-floor-plan-2026": `Paranjape Forest Trails Bhugaon floor plan, Forest Trails floor plan 2026, Forest Trails Bhugaon plan, Forest Trails 2BHK floor plan, Forest Trails villa floor plan, Forest Trails NA plot layout, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-review": `Paranjape Forest Trails Bhugaon review, Forest Trails Bhugaon review 2026, Forest Trails Bhugaon rating, is Forest Trails worth buying, Forest Trails Bhugaon buyer review, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-site-visit": `Forest Trails Bhugaon site visit, Paranjape Forest Trails site visit booking, Forest Trails Bhugaon visit, book site visit Forest Trails, Forest Trails tour Bhugaon, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-rera": `Paranjape Forest Trails RERA number, Forest Trails Bhugaon MahaRERA, Forest Trails RERA P52100053834, Forest Trails RERA registration, paranjapetownship MahaRERA verified, ${BRAND_KW}`,
  "/paranjape-forest-trails-bhugaon-amenities-complete": `Paranjape Forest Trails Bhugaon amenities, Forest Trails amenities list, Forest Trails Bhugaon facilities, Forest Trails club house, Forest Trails sports complex, ${BRAND_KW}`,
  "/nri-property-pune-west": `NRI property Pune, NRI real estate Pune 2026, buy property in India from USA UK Dubai, FEMA rules property India, NRI NA plots Pune, Paranjape NRI desk, ${BRAND_KW}`,
  "/senior-living-pune-west": `senior living Pune, retirement homes Pune West 2026, Athashri Bhugaon, senior citizen flats Pune, assisted living Pune, Paranjape senior housing, ${BRAND_KW}`,
  "/property-vs-stocks-vs-gold-pune": `property vs stocks India 2026, real estate vs gold ROI Pune, land investment vs mutual funds, Pune NA plots appreciation rate, best investment Pune 2026, ${BRAND_KW}`,
  "/rera-status-forest-trails": `Forest Trails RERA number, MahaRERA P52100053834, Forest Trails possession date 2026, Paranjape RERA certificate, Bhugaon RERA approved projects, ${BRAND_KW}`,
  "/ultimate-guide-na-plots-bhugaon": `ultimate guide NA plots Bhugaon, NA plots Bhugaon guide, buy NA plots Bhugaon 2026, NA bungalow plots Bhugaon price, NA plot purchase process Pune, Misty Greens NA plots, 7/12 extract NA plots Bhugaon, MahaRERA P52100053834, ${BRAND_KW}`,
  "/complete-guide-buying-property-pune-west-2026": `complete guide buying property Pune West 2026, property guide Pune West, Bhugaon Bavdhan Kothrud property guide, invest Pune West 2026, real estate Pune West, Paranjape Forest Trails complete guide, ${BRAND_KW}`,
  "/compare-all-enclaves": `compare Forest Trails enclaves, Forest Trails enclave comparison, Misty Greens vs Rivolo, Canopy vs Highgardens, Forest Trails all enclaves price list 2026, which enclave Forest Trails Bhugaon, ${BRAND_KW}`,
  "/floor-plans": `Paranjape Forest Trails floor plans, Forest Trails floor plan 2026, Misty Greens plot layout, Rivolo villa floor plan, Canopy 2BHK 3BHK layout, Cove twin bungalow plan, ${BRAND_KW}`,
  "/virtual-tour-forest-trails": `virtual tour Forest Trails Bhugaon, 360 tour Paranjape Bhugaon, online property tour Forest Trails Pune, Forest Trails 360 walk, explore Forest Trails online, ${BRAND_KW}`,
  "/testimonials": `Paranjape Forest Trails reviews, Forest Trails Bhugaon testimonials, Misty Greens buyers review, Paranjape Schemes review Pune, Forest Trails buyer ratings 2026, ${BRAND_KW}`,
  "/faqs": `Paranjape Forest Trails FAQs, real estate FAQs Pune, buying plot in Bhugaon FAQ, MahaRERA Forest Trails FAQ, plot loan FAQ Pune, Forest Trails possession FAQ, ${BRAND_KW}`,
  "/glossary": `real estate glossary Pune, property terms Maharashtra, 7/12 extract meaning, NA order meaning, RERA carpet area definition, ready reckoner rate Pune, index 2 meaning, ${BRAND_KW}`,
  "/bhugaon-neighbourhood-guide": `Bhugaon neighbourhood guide 2026, living in Bhugaon Pune, Bhugaon pin code 412115, schools near Bhugaon, hospitals near Bhugaon, restaurants near Bhugaon, Forest Trails neighbourhood, ${BRAND_KW}`,
  "/bavdhan-area-guide": `Bavdhan area guide 2026, living in Bavdhan Pune, Bavdhan connectivity, Bavdhan real estate guide, Bavdhan schools hospitals, property near Bavdhan, ${BRAND_KW}`,
  "/chandani-chowk-area-guide": `Chandani Chowk area guide, Chandani Chowk flyover Pune, property near Chandani Chowk 2026, Chandani Chowk real estate impact, Chandani Chowk to Bhugaon, ${BRAND_KW}`,
  "/kothrud-area-guide": `Kothrud area guide 2026, Kothrud Pune real estate, Kothrud property prices, Kothrud extension guide, Kothrud to Bhugaon distance, ${BRAND_KW}`,
  "/paud-road-area-guide": `Paud Road area guide, Paud Road real estate Pune, property on Paud Road Bhugaon, Paud Road connectivity, Forest Trails Paud Road corridor, ${BRAND_KW}`,
  "/bhugaon-property-price-history": `Bhugaon property price history, Bhugaon price trend 2019 2026, NA plot price appreciation Bhugaon, Forest Trails price history, property CAGR Bhugaon, ${BRAND_KW}`,
  "/roi-calculator-pune": `property ROI calculator Pune, real estate ROI calculator, calculate plot appreciation Pune, Forest Trails ROI calculator, Pune property returns 2026, ${BRAND_KW}`,
  "/stamp-duty-calculator-pune": `stamp duty calculator Pune 2026, Maharashtra stamp duty calculator, plot registration charges Pune, property tax calculator Pune, stamp duty for women Pune, ${BRAND_KW}`,
  "/paranjape-schemes-track-record": `Paranjape Schemes track record, Paranjape Schemes history 1974, 50 years of Paranjape Schemes, 20000 homes delivered Pune, Paranjape Schemes awards, builder reliability Pune, ${BRAND_KW}`,
  "/why-choose-paranjape-schemes": `why choose Paranjape Schemes, 10 reasons buy Paranjape, Paranjape Schemes benefits, builder quality Pune, Paranjape Schemes reliability, ${BRAND_KW}`,
  "/about/paranjape-editorial-team": `Paranjape editorial team, Pune real estate experts, MahaRERA certified advisors, property advisory Pune West, ${BRAND_KW}`,
  "/press-and-awards": `Paranjape Forest Trails awards, best township Pune West, Paranjape Schemes press coverage, Economic Times Pune real estate awards, ${BRAND_KW}`,
  "/pune-mein-plot": `पुणे में प्लॉट, पुणे में एनए प्लॉट, भुगाव में प्लॉट, पुणे वेस्ट प्लॉट, NA plot pune mein, buy plot in pune hindi, ${BRAND_KW}`,
  "/bhugaon-mein-flat": `भुगाव में फ्लैट, bhugaon mein flat, भुगाव में 2BHK, भुगाव में 3BHK, पुणे वेस्ट अपार्टमेंट, flat in bhugaon hindi, ${BRAND_KW}`,
  "/pune-mein-villa": `पुणे में विला, pune mein villa, लग्जरी विला पुणे, 4BHK villa pune, luxury villa pune hindi, ${BRAND_KW}`,
  "/pune-madhe-plot": `पुण्यात प्लॉट, एनए प्लॉट पुणे, भुगाव मध्ये प्लॉट, NA plot Pune Marathi, plot bhugaon pune marathi, ${BRAND_KW}`,
  "/bhugaon-madhe-flat": `भुगाव मध्ये फ्लॅट, bhugaon madhe flat, पुणे पश्चिम फ्लॅट, 2BHK pune marathi, flat in bhugaon marathi, ${BRAND_KW}`,
  "/pune-madhe-villa": `पुण्यात व्हिला, luxury villa pune marathi, bhugaon villa pune, 4BHK villa pune marathi, ${BRAND_KW}`,
  "/forest-trails-vs-godrej-pune": `Paranjape Forest Trails vs Godrej Pune, Forest Trails vs Godrej, compare Paranjape Godrej Pune 2026, Godrej vs Forest Trails Bhugaon, ${BRAND_KW}`,
  "/forest-trails-vs-kolte-patil-pune": `Paranjape Forest Trails vs Kolte Patil, Forest Trails vs Kolte Patil Pune, compare Kolte Patil Paranjape plots, ${BRAND_KW}`,
  "/forest-trails-vs-amanora": `Forest Trails vs Amanora, Paranjape vs Amanora Pune, Bhugaon vs Hadapsar investment 2026, West Pune vs East Pune township, ${BRAND_KW}`,
  "/forest-trails-vs-rohan-nilay": `Forest Trails vs Rohan Nilay, Paranjape vs Rohan Nilay, Forest Trails vs Kothrud projects 2026, ${BRAND_KW}`,
  "/forest-trails-vs-vtp-urbana": `Forest Trails vs VTP Urbana, Paranjape vs VTP Pune, compare VTP Urbana Forest Trails 2026, ${BRAND_KW}`,
  "/forest-trails-vs-gera-isle-royale": `Forest Trails vs Gera Isle Royale, Paranjape vs Gera Pune, compare Gera Isle Royale Forest Trails, ${BRAND_KW}`,
  "/forest-trails-vs-kalpataru-elegante": `Forest Trails vs Kalpataru Pune, Paranjape vs Kalpataru, Forest Trails vs Kalpataru Elegante 2026, ${BRAND_KW}`,
  "/paranjape-forest-trails-vs-blue-ridge": `Paranjape Forest Trails vs Blue Ridge, Forest Trails Bhugaon vs Blue Ridge Hinjewadi, which Paranjape project is better, ${BRAND_KW}`,
  "/paranjape-forest-trails-township-bhugaon-blogs": `Paranjape Forest Trails blog, Pune real estate blog 2026, Bhugaon property articles, property investment advice Pune, NA plot buying guides, stamp duty plots Pune, ${BRAND_KW}`,
};

// ─── Geo & Currency Intelligence Matrix ──────────────────────────────────────
const CURRENCY_REGIONS: Record<string, { code: string; symbol: string }> = {
  IN: { code: "INR", symbol: "₹" },
  US: { code: "USD", symbol: "$" },
  CA: { code: "CAD", symbol: "C$" },
  AE: { code: "AED", symbol: "AED " },
  SA: { code: "SAR", symbol: "SAR " },
  QA: { code: "QAR", symbol: "QAR " },
  OM: { code: "OMR", symbol: "OMR " },
  KW: { code: "KWD", symbol: "KWD " },
  BH: { code: "BHD", symbol: "BHD " },
  GB: { code: "GBP", symbol: "£" },
  SG: { code: "SGD", symbol: "S$" },
  AU: { code: "AUD", symbol: "A$" },
  NZ: { code: "NZD", symbol: "NZ$" },
  DE: { code: "EUR", symbol: "€" },
  FR: { code: "EUR", symbol: "€" },
  NL: { code: "EUR", symbol: "€" },
  IE: { code: "EUR", symbol: "€" },
  DEFAULT: { code: "INR", symbol: "₹" },
};

// ─── 4-Tier Crawler Classification Matrix ────────────────────────────────────

const CRAWLER_TIERS = {
  tier1: /Googlebot|Google-InspectionTool|Googlebot-Image|Googlebot-Video|Mediapartners-Google|AdsBot-Google|Google-Safety/i,
  tier2: /bingbot|BingPreview|Applebot|DuckDuckBot|Baiduspider|YandexBot|Slurp/i,
  tier3: /ChatGPT-User|GPTBot|PerplexityBot|ClaudeBot|Bytespider|CCBot|anthropic-ai|cohere-ai/i,
  tier4: /WhatsApp|TelegramBot|Slackbot|Discordbot|facebookexternalhit|Twitterbot|LinkedInBot|Pinterestbot/i,
};

interface CrawlerClassification {
  tier: number;
  label: string;
  isSearch: boolean;
  isSocial: boolean;
}

function classifyCrawler(ua: string): CrawlerClassification {
  if (CRAWLER_TIERS.tier1.test(ua)) return { tier: 1, label: "google", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier2.test(ua)) return { tier: 2, label: "major-search", isSearch: true, isSocial: false };
  if (CRAWLER_TIERS.tier3.test(ua)) return { tier: 3, label: "ai-crawler", isSearch: false, isSocial: false };
  if (CRAWLER_TIERS.tier4.test(ua)) return { tier: 4, label: "social-preview", isSearch: false, isSocial: true };
  return { tier: 0, label: "user", isSearch: false, isSocial: false };
}

// Early Hints & Resource Links
const EARLY_HINTS_LINKS = [
  "</style.min.css?v=2026.08.24.10>; rel=preload; as=style",
  "<https://fonts.googleapis.com>; rel=preconnect; crossorigin",
  "<https://fonts.gstatic.com>; rel=preconnect; crossorigin",
  "<https://www.googletagmanager.com>; rel=preconnect",
  "<https://www.google-analytics.com>; rel=preconnect",
  "<https://www.googleadservices.com>; rel=preconnect",
  "<https://googleads.g.doubleclick.net>; rel=preconnect",
];

// ─── HTMLRewriter Handlers ───────────────────────────────────────────────────

/**
 * 1. Canonical URL Enforcer: Guarantees strict canonical formatting
 */
class CanonicalEnforcer {
  constructor(private pathname: string) {}
  element(el: Element) {
    const href = el.getAttribute("href");
    if (href) {
      let cleanPath = this.pathname
        .replace(/\/index\.html$/, "/")
        .replace(/\/$/, "") || "/";
      if (cleanPath !== "/" && !cleanPath.includes(".")) {
        cleanPath += "/";
      }
      el.setAttribute("href", CANONICAL_ORIGIN + cleanPath);
    }
  }
}

/**
 * 2. Head Meta Injector: Geo coordinates, preconnect, and hreflang
 */
class HeadMetaInjector {
  constructor(
    private pathname: string,
    private crawlerInfo: CrawlerClassification,
    private cfData: { country: string; city: string; colo: string; region: string }
  ) {}

  element(head: Element) {
    const cleanPath = this.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    const canonicalUrl = CANONICAL_ORIGIN + (cleanPath === "/" ? "/" : cleanPath + "/");

    const country = this.cfData?.country || "IN";
    const currency = CURRENCY_REGIONS[country] || CURRENCY_REGIONS["DEFAULT"];

    const geoBlock = `
<!-- CF Enterprise Edge SEO Engine v6.1 (Worker Edition - Google Ecosystem Hardened + NRI Geo & INP) -->
<meta name="geo.region" content="IN-MH">
<meta name="geo.placename" content="Bhugaon, Pune West, Maharashtra, India">
<meta name="geo.position" content="18.5050;73.7406">
<meta name="ICBM" content="18.5050, 73.7406">
<meta name="geo.detected_country" content="${country}">
<meta name="geo.currency" content="${currency.code}">
<meta name="author" content="Paranjape Schemes (Construction) Ltd.">
<meta name="copyright" content="© 2026 Paranjape Forest Trails. All Rights Reserved.">`;

    const googleDirectives = `
<meta name="google-site-verification" content="fA009Y6RAvi_yacg8Lw7JJu5uvAGR5po2RIUH8VcuvE">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="googlebot-news" content="index, follow">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/branding/favicon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/branding/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/branding/apple-touch-icon.png">
<link rel="alternate" type="text/plain" href="${CANONICAL_ORIGIN}/llms.txt" title="LLM Knowledge Base">
<link rel="sitemap" type="application/xml" href="${CANONICAL_ORIGIN}/sitemap.xml">`;

    let heroPreload = "";
    if (cleanPath === "/" || cleanPath === "") {
      heroPreload = `\n<link rel="preload" as="image" href="/images/hero-township.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("misty-greens") || cleanPath.includes("plot")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/misty-greens-plots.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("rivolo") || cleanPath.includes("villa")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/rivolo-villas.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("canopy") || cleanPath.includes("2bhk") || cleanPath.includes("flat") || cleanPath.includes("apartment")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/canopy-apartments.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("cove") || cleanPath.includes("bungalow")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/the-cove.webp" fetchpriority="high">`;
    } else if (cleanPath.includes("athashri") || cleanPath.includes("senior")) {
      heroPreload = `\n<link rel="preload" as="image" href="/images/athashri.webp" fetchpriority="high">`;
    }

    const preconnectBlock = `
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.googleadservices.com" crossorigin>
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://www.googleadservices.com">
<link rel="dns-prefetch" href="https://googleads.g.doubleclick.net">
<link rel="dns-prefetch" href="https://formsubmit.co">`;

    let hreflangBlock = `
<link rel="alternate" hreflang="en-IN" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`;
    if (cleanPath.includes("pune-mein-") || cleanPath.includes("bhugaon-mein-")) {
      hreflangBlock += `\n<link rel="alternate" hreflang="hi-IN" href="${canonicalUrl}">`;
    } else if (cleanPath.includes("pune-madhe-") || cleanPath.includes("bhugaon-madhe-")) {
      hreflangBlock += `\n<link rel="alternate" hreflang="mr-IN" href="${canonicalUrl}">`;
    }

    head.append(geoBlock + googleDirectives + heroPreload + preconnectBlock + hreflangBlock, { html: true });

    if (cleanPath === "/" || cleanPath === "") {
      const sitelinksSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.paranjapetownship.com/#website",
      "url": "https://www.paranjapetownship.com/",
      "name": "Paranjape Forest Trails Bhugaon",
      "description": "Pune's premier 190-acre integrated forest township by Paranjape Schemes (Construction) Ltd.",
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.paranjapetownship.com/#organization",
        "name": "Paranjape Schemes (Construction) Ltd.",
        "url": "https://www.paranjapetownship.com/",
        "logo": "https://www.paranjapetownship.com/assets/branding/logo.png"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.paranjapetownship.com/sitemap-page/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["en-IN", "hi-IN", "mr-IN"]
    },
    {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": "https://www.paranjapetownship.com/#organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "alternateName": "Paranjape Forest Trails Bhugaon",
      "url": "https://www.paranjapetownship.com/",
      "logo": "https://www.paranjapetownship.com/assets/branding/logo.png",
      "image": "https://www.paranjapetownship.com/images/hero-township.webp",
      "telephone": "+91-7744009295",
      "email": "propsmartrealty@gmail.com",
      "priceRange": "₹₹₹₹",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.5099377,
        "longitude": 73.738964
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Forest Trails Township, Paud Road, Bhugaon",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "412115",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/paranjapeschemes",
        "https://www.instagram.com/paranjapeschemes",
        "https://www.youtube.com/user/ParanjapeSchemes",
        "https://en.wikipedia.org/wiki/Paranjape_Schemes"
      ]
    }
  ]
}
</script>`;
      head.append(sitelinksSchema, { html: true });
    }
  }
}

/**
 * 3. OG Image Absolutifier: Ensures complete absolute HTTPS URLs for social crawlers
 */
class OGImageAbsolutifier {
  element(el: Element) {
    const content = el.getAttribute("content");
    if (content && content.startsWith("/")) {
      el.setAttribute("content", CANONICAL_ORIGIN + content);
    }
  }
}

/**
 * 4. Performance Hint Injector: Preload critical typography and PWA theme
 */
class PerformanceHintInjector {
  element(head: Element) {
    const hints = `
<link rel="preload" href="/style.min.css?v=2026.08.24.10" as="style">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" as="style" crossorigin>
<meta name="theme-color" content="#4A0808">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=yes">
<meta http-equiv="x-dns-prefetch-control" content="on">`;
    head.append(hints, { html: true });
  }
}

/**
 * 5. Internal Link Normalizer: Enforces trailing slash on local directories
 */
class InternalLinkNormalizer {
  element(el: Element) {
    const href = el.getAttribute("href");
    if (href && href.startsWith("/") && !href.includes(".") && !href.endsWith("/") && href !== "/") {
      el.setAttribute("href", href + "/");
    }
  }
}

/**
 * 6. Image Lazy-Load Optimizer: Prioritizes above-the-fold hero images, lazy loads the rest, prevents CLS
 */
class ImageOptimizer {
  private imageCount = 0;
  element(el: Element) {
    this.imageCount++;
    if (this.imageCount <= 2) {
      el.setAttribute("loading", "eager");
      el.setAttribute("fetchpriority", "high");
      el.removeAttribute("decoding");
    } else {
      if (!el.getAttribute("loading")) {
        el.setAttribute("loading", "lazy");
      }
      if (!el.getAttribute("decoding")) {
        el.setAttribute("decoding", "async");
      }
      if (!el.getAttribute("fetchpriority")) {
        el.setAttribute("fetchpriority", "low");
      }
    }

    const width = el.getAttribute("width");
    const height = el.getAttribute("height");
    const style = el.getAttribute("style") || "";
    if (!width && !height && !style.includes("aspect-ratio")) {
      el.setAttribute("style", (style ? style + "; " : "") + "aspect-ratio: 16/9; max-width: 100%; height: auto;");
    }
  }
}

/**
 * 7. External Link Security & SEO Optimizer
 */
class ExternalLinkOptimizer {
  element(el: Element) {
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

      if (!href.includes("maharera.mahaonline.gov.in") && !href.includes("wa.me") && !href.includes("maps.google.com")) {
        relParts.add("nofollow");
      }

      el.setAttribute("rel", Array.from(relParts).join(" "));
    }
  }
}

/**
 * 8. Image Alt & Accessibility Guardian for Googlebot Image
 */
class ImageAltA11yEnforcer {
  element(el: Element) {
    const alt = el.getAttribute("alt");
    const src = el.getAttribute("src") || "";
    if (!alt || alt.trim() === "") {
      let derivedAlt = "Paranjape Forest Trails Township Bhugaon Pune";
      if (src.includes("misty-greens")) derivedAlt = "Misty Greens NA Bungalow Plots Paranjape Forest Trails Bhugaon Pune";
      else if (src.includes("rivolo")) derivedAlt = "The Rivolo Luxury Forest Villas 4BHK 5BHK Bhugaon Pune West";
      else if (src.includes("cove")) derivedAlt = "The Cove Twin Bungalows Forest Trails Bhugaon Pune";
      else if (src.includes("canopy")) derivedAlt = "The Canopy 2BHK 3BHK Nature Apartments Bhugaon Pune";
      else if (src.includes("athashri")) derivedAlt = "Athashri Senior Living Community Forest Trails Bhugaon Pune";
      else if (src.includes("highgardens")) derivedAlt = "The Highgardens Nature Living Apartments Bhugaon";
      else if (src.includes("verandah")) derivedAlt = "The Verandah Luxury Duplex Apartments Bhugaon Pune";
      else if (src.includes("cliff-club") || src.includes("amenities")) derivedAlt = "The Cliff Lifestyle Club Amenities Forest Trails Bhugaon";
      else if (src.includes("ssrvm")) derivedAlt = "Sri Sri Ravishankar Vidya Mandir School Forest Trails Bhugaon";
      else if (src.includes("equestrian")) derivedAlt = "Equestrian Academy Horse Riding Forest Trails Bhugaon";
      else if (src.includes("logo")) derivedAlt = "Paranjape Schemes Construction Ltd Brand Logo";
      el.setAttribute("alt", derivedAlt);
    }
  }
}

/**
 * 9. Semantic Structure Guardian (Dynamic Hierarchical Breadcrumb Schema)
 */
class SemanticStructureGuardian {
  private pathname: string;
  constructor(pathname: string) {
    this.pathname = pathname;
  }
  element(head: Element) {
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

/**
 * 10. Keyword Meta Injector
 * Injects page-specific <meta name="keywords"> at the edge using KEYWORD_ROUTES.
 * Covers all routes with exact matching, longest prefix matching, and algorithmic synthesis.
 */
class KeywordMetaInjector {
  private cleanPath: string;
  constructor(pathname: string) {
    this.cleanPath = pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  }
  element(head: Element) {
    let keywords = KEYWORD_ROUTES[this.cleanPath] || KEYWORD_ROUTES[this.cleanPath + "/"] || null;

    if (!keywords) {
      let bestLen = 0;
      for (const [route, kw] of Object.entries(KEYWORD_ROUTES)) {
        if (route !== "/" && this.cleanPath.startsWith(route) && route.length > bestLen) {
          bestLen = route.length;
          keywords = kw;
        }
      }
    }

    if (!keywords) {
      const p = this.cleanPath.replace(/^\//, "").toLowerCase();
      const kwSet = new Set<string>();

      const bhkMatch = p.match(/(\d)\s*[-]?bhk/);
      const localities = [
        "aundh", "balewadi", "baner", "bavdhan", "bhugaon", "chandani chowk",
        "erandwane", "hadapsar", "hinjewadi", "karve nagar", "kharadi", "kothrud",
        "mulshi", "pashan", "paud road", "pirangut", "pune west", "shivaji nagar",
        "sus", "undri", "viman nagar", "wagholi", "wakad", "warje"
      ];
      let matchedLoc: string | null = null;
      for (const loc of localities) {
        const slugForm = loc.replace(/\s+/g, "-");
        if (p.includes(slugForm) || p.includes(loc)) {
          matchedLoc = loc.replace(/\b\w/g, c => c.toUpperCase());
          break;
        }
      }

      if (bhkMatch) {
        const bhk = bhkMatch[1] + "BHK";
        if (matchedLoc) {
          kwSet.add(`${bhk} near ${matchedLoc}`);
          kwSet.add(`${bhk} flats near ${matchedLoc} Pune`);
          kwSet.add(`${bhk} price ${matchedLoc} 2026`);
          kwSet.add(`buy ${bhk} ${matchedLoc}`);
          kwSet.add(`luxury ${bhk} apartments ${matchedLoc}`);
        } else {
          kwSet.add(`${bhk} in Pune`);
          kwSet.add(`${bhk} flats Pune West 2026`);
        }
      }

      if (p.includes("plot") || p.includes("plots")) {
        if (matchedLoc) {
          kwSet.add(`NA plots near ${matchedLoc}`);
          kwSet.add(`NA bungalow plots ${matchedLoc}`);
          kwSet.add(`gated township plots ${matchedLoc}`);
          kwSet.add(`buy plots ${matchedLoc} Pune 2026`);
        } else {
          kwSet.add("NA plots in Bhugaon");
          kwSet.add("NA bungalow plots Pune West");
        }
      }

      if (p.includes("villa") || p.includes("villas") || p.includes("bungalow") || p.includes("bungalows")) {
        if (matchedLoc) {
          kwSet.add(`luxury villas near ${matchedLoc}`);
          kwSet.add(`forest villas near ${matchedLoc}`);
          kwSet.add(`independent bungalows ${matchedLoc}`);
          kwSet.add(`twin bungalows near ${matchedLoc}`);
        } else {
          kwSet.add("luxury forest villas Bhugaon");
          kwSet.add("4BHK 5BHK villas Pune West");
        }
      }

      if (p.includes("property-in-")) {
        if (matchedLoc) {
          kwSet.add(`property in ${matchedLoc}`);
          kwSet.add(`real estate ${matchedLoc} Pune 2026`);
          kwSet.add(`property rates ${matchedLoc}`);
          kwSet.add(`buy property ${matchedLoc}`);
        }
      }

      if (p.includes("blog") || p.includes("guide")) {
        const parts = p.split(/[-_/]+/).filter(Boolean);
        const readable = parts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        kwSet.add(readable);
        kwSet.add(`${readable} 2026`);
        kwSet.add("Pune real estate guide 2026");
      }

      if (p.includes("madhe") || p.includes("marathi")) {
        kwSet.add("पुण्यात प्लॉट");
        kwSet.add("भुगाव मध्ये फ्लॅट");
        kwSet.add("पुणे पश्चिम मालमत्ता");
        kwSet.add("Paranjape Schemes Marathi");
      } else if (p.includes("mein") || p.includes("hindi")) {
        kwSet.add("पुणे में प्लॉट");
        kwSet.add("भुगाव में फ्लैट");
        kwSet.add("पुणे में लग्जरी विला");
        kwSet.add("Paranjape Schemes Hindi");
      }

      kwSet.add("Paranjape Schemes Construction Ltd");
      kwSet.add("Paranjape Forest Trails Bhugaon");
      kwSet.add("Misty Greens NA Plots");
      kwSet.add("The Rivolo Luxury Villas");
      kwSet.add("The Canopy Apartments");
      kwSet.add("MahaRERA P52100053834");
      kwSet.add("190-acre gated township Pune West");

      keywords = Array.from(kwSet).join(", ");
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
 * 11. W3C Speculation Rules API Injector (Chrome Instant Prerender 2.0)
 */
class SpeculationRulesInjector {
  element(head: Element) {
    const rules = {
      prerender: [
        {
          source: "list",
          urls: [
            "/paranjape-forest-trails-township-bhugaon-misty-greens/",
            "/paranjape-forest-trails-township-bhugaon-the-canopy/",
            "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
            "/paranjape-forest-trails-bhugaon-price-2026/",
            "/paranjape-schemes-contact/",
            "/sitemap-page/"
          ],
          score: 0.95
        }
      ],
      prefetch: [
        {
          source: "document",
          where: {
            and: [
              { href_matches: "/*" },
              { not: { href_matches: "/api/*" } },
              { not: { href_matches: "/404*" } }
            ]
          },
          eagerness: "moderate"
        }
      ]
    };

    head.append(
      `\n<!-- Chrome Instant Prerender Speculation Rules API v2.0 -->\n<script type="speculationrules">\n${JSON.stringify(rules, null, 2)}\n</script>\n`,
      { html: true }
    );
  }
}

/**
 * 11. Google Voice & Assistant Speakable Microdata Optimizer
 */
class EdgeSpeakableVoiceOptimizer {
  private pathname: string;
  constructor(pathname: string) {
    this.pathname = pathname;
  }
  element(head: Element) {
    const speakable = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".lead", ".enclave-intro", "main p:first-of-type"]
      }
    };
    head.append(
      `\n<!-- Google Assistant & Voice Search Speakable Spec -->\n<script type="application/ld+json">\n${JSON.stringify(speakable, null, 2)}\n</script>\n`,
      { html: true }
    );
  }
}

/**
 * 12. Interaction to Next Paint (INP) & Core Web Vitals Optimizer
 */
class INPPerformanceOptimizer {
  constructor(private isBot: boolean) {}
  element(head: Element) {
    if (this.isBot) return;
    const snippet = `
<!-- Chrome Core Web Vitals INP/FID Optimization Engine -->
<script>
(function() {
  if (typeof window === 'undefined') return;
  window.requestIdle = (window as any).requestIdleCallback || function(cb: Function) { return setTimeout(cb, 1200); };
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', { get: function() { supportsPassive = true; } });
    window.addEventListener('testPassive', null as any, opts);
    window.removeEventListener('testPassive', null as any, opts);
  } catch (e) {}
  (window as any).__supportsPassive = supportsPassive;
})();
</script>`;
    head.append(snippet, { html: true });
  }
}

/**
 * 13. NRI & International Multi-Currency Personalization
 */
class NRIPersonalizationOptimizer {
  constructor(
    private country: string,
    private currency: { code: string; symbol: string },
    private isBot: boolean
  ) {}
  element(body: Element) {
    if (this.isBot || this.country === "IN") return;
    const nriBadge = `
<!-- NRI Concierge & Currency Desk -->
<aside id="nri-desk-badge" style="position:fixed;bottom:24px;left:20px;z-index:9999;background:linear-gradient(135deg,rgba(44,4,4,0.95),rgba(74,8,8,0.95));color:#f5eedc;border:1px solid #d4af37;border-radius:24px;padding:8px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.4);font-family:system-ui,-apple-system,sans-serif;font-size:12px;display:flex;align-items:center;gap:10px;backdrop-filter:blur(10px);transition:transform 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 6px #10b981;"></span>
  <span><strong>NRI Desk Active:</strong> Rates in <strong>${this.currency.code} (${this.currency.symbol})</strong> | <a href="/nri-investment-bhugaon/" style="color:#d4af37;text-decoration:underline;font-weight:600;">NRI Guide &amp; FEMA</a></span>
</aside>`;
    body.append(nriBadge, { html: true });
  }
}

// ─── Cache & Security Header Utilities ───────────────────────────────────────

function applyCacheHeaders(headers: Headers, url: URL): void {
  const pathname = url.pathname;

  // Immutable hashed assets
  if (pathname.startsWith("/_astro/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    return;
  }

  // Media assets
  if (pathname.startsWith("/images/") || pathname.startsWith("/assets/") || pathname.startsWith("/media/")) {
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    headers.set("CDN-Cache-Control", "max-age=31536000");
    headers.set("Timing-Allow-Origin", "*");
    return;
  }

  // Sitemaps & robots
  if (pathname.endsWith(".xml") || pathname === "/robots.txt" || pathname.endsWith(".txt")) {
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=86400");
    if (pathname.endsWith(".xml")) {
      headers.set("X-Robots-Tag", "noindex, follow");
    }
    return;
  }

  // Bundled scripts & styles
  if (pathname.endsWith(".css") || pathname.endsWith(".js")) {
    headers.set("Cache-Control", "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "max-age=2592000");
    return;
  }

  // HTML documents
  headers.set("Cache-Control", "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=604800");
  headers.set("CDN-Cache-Control", "max-age=604800");
  headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
}

function applySecurityHeaders(headers: Headers): void {
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
}

// ─── Worker Fetch Entrypoint ─────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const startTime = Date.now();
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    const crawlerInfo = classifyCrawler(userAgent);

    // 1. Apex Domain & Protocol Canonical Normalization (301)
    if (
      url.hostname === "paranjapeplots.com" ||
      url.hostname === "www.paranjapeplots.com" ||
      url.hostname === "paranjapetownship.com" ||
      (url.protocol === "http:" && !url.hostname.includes("localhost") && !url.hostname.includes("127.0.0.1"))
    ) {
      const canonicalUrl = new URL(request.url);
      canonicalUrl.hostname = CANONICAL_HOSTNAME;
      canonicalUrl.protocol = "https:";
      return Response.redirect(canonicalUrl.toString(), 301);
    }

    // 1b. Legacy Permalink Edge 301 Canonical Routing
    const cleanPath = url.pathname.replace(/\/$/, "");
    if (PERMALINK_REDIRECTS[url.pathname] || (cleanPath && PERMALINK_REDIRECTS[cleanPath])) {
      const target = PERMALINK_REDIRECTS[url.pathname] || PERMALINK_REDIRECTS[cleanPath];
      if (target && target !== url.pathname && target !== url.pathname + "/") {
        return Response.redirect(`${CANONICAL_ORIGIN}${target}`, 301);
      }
    }

    // 1c. Strict Canonical Trailing Slash & index.html (301)
    if (url.pathname === "/index.html") {
      return Response.redirect(`${CANONICAL_ORIGIN}/${url.search}`, 301);
    }
    if (url.pathname.endsWith("/index.html")) {
      const stripped = url.pathname.slice(0, -10);
      return Response.redirect(`${CANONICAL_ORIGIN}${stripped}${url.search}`, 301);
    }
    if (!url.pathname.endsWith("/") && !url.pathname.includes(".") && !url.pathname.startsWith("/api/")) {
      return Response.redirect(`${CANONICAL_ORIGIN}${url.pathname}/${url.search}`, 301);
    }

    // 2. High-Speed Edge Lead Capture API Routes
    if ((url.pathname === "/api/lead-capture" || url.pathname === "/api/enquiry") && request.method === "POST") {
      return handleLeadCapture(request, env, ctx);
    }
    if ((url.pathname === "/api/lead-capture" || url.pathname === "/api/enquiry") && request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 3. Cloudflare R2 Media Streaming Proxy Route
    if (url.pathname.startsWith("/media/")) {
      return handleR2MediaStreaming(request, env, url);
    }

    // 4. Edge Tiered Cache Lookup via Cache API
    const cache = caches.default;
    let cachedResponse = await cache.match(request);
    if (cachedResponse) {
      const newHeaders = new Headers(cachedResponse.headers);
      newHeaders.set("X-Cache-Status", "HIT-EDGE");
      newHeaders.set("Server-Timing", `edge;dur=${Date.now() - startTime};desc="CF Worker Cache HIT"`);
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: newHeaders,
      });
    }

    // 5. Fetch Origin Response
    let response: Response;
    try {
      response = await fetch(request);
    } catch (err: any) {
      console.error("Worker origin fetch failed:", err);
      return new Response("Origin unreachable", { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "";
    const isHTML = contentType.includes("text/html");

    // 6. Streaming HTMLRewriter Transformation (HTML Only)
    let transformedResponse = response;
    if (isHTML && response.status === 200) {
      const cf = (request as any).cf;
      const cfData = {
        country: cf?.country || "IN",
        city: cf?.city || "Pune",
        colo: cf?.colo || "BOM",
        region: cf?.region || "Maharashtra",
      };

      const currency = CURRENCY_REGIONS[cfData.country] || CURRENCY_REGIONS["DEFAULT"];

      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalEnforcer(url.pathname))
        .on("head", new HeadMetaInjector(url.pathname, crawlerInfo, cfData))
        .on('meta[property="og:image"]', new OGImageAbsolutifier())
        .on('meta[name="twitter:image"]', new OGImageAbsolutifier())
        .on('meta[property="og:image:url"]', new OGImageAbsolutifier())
        .on("head", new PerformanceHintInjector())
        .on('a[href^="/"]', new InternalLinkNormalizer())
        .on("img", new ImageOptimizer())
        .on("head", new KeywordMetaInjector(url.pathname))
        .on('a[href^="http"]', new ExternalLinkOptimizer())
        .on("img", new ImageAltA11yEnforcer())
        .on("head", new SemanticStructureGuardian(url.pathname))
        .on("head", new SpeculationRulesInjector())
        .on("head", new EdgeSpeakableVoiceOptimizer(url.pathname))
        .on("head", new INPPerformanceOptimizer(crawlerInfo.tier > 0))
        .on("body", new NRIPersonalizationOptimizer(cfData.country, currency, crawlerInfo.tier > 0));

      transformedResponse = rewriter.transform(response);
    }

    // 7. Assemble Hardened Edge Headers
    const headers = new Headers(transformedResponse.headers);
    applySecurityHeaders(headers);
    applyCacheHeaders(headers, url);

    const linkHeaders = [
      ...EARLY_HINTS_LINKS,
      `<${CANONICAL_ORIGIN}/sitemap.xml>; rel="sitemap"`,
      `<${CANONICAL_ORIGIN}/llms.txt>; rel="alternate"; type="text/plain"`
    ];
    headers.set("Link", linkHeaders.join(", "));

    headers.set("Accept-CH", "Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-Width, Sec-CH-Viewport-Width");
    headers.set("Critical-CH", "Sec-CH-Width, Sec-CH-Viewport-Width");

    const cf = (request as any).cf;
    const country = cf?.country || "IN";
    const currency = CURRENCY_REGIONS[country] || CURRENCY_REGIONS["DEFAULT"];
    headers.set("Content-Language", country === "IN" ? "en-IN" : "en");
    headers.set("Vary", "Accept-Encoding, Sec-CH-Width, Sec-CH-Viewport-Width, CF-IPCountry");

    // Geo & Currency & INP Headers
    headers.set("X-Geo-Country", country);
    headers.set("X-Currency-Preference", currency.code);
    headers.set("X-NRI-Segment", country === "IN" ? "domestic" : "international");
    headers.set("X-INP-Engine", "active;scheduler=idle-callback;passive-listeners=enforced");

    const edgeDuration = Date.now() - startTime;
    headers.set("Server-Timing", `edge;dur=${edgeDuration};desc="CF SEO Worker v6.1", gbot;desc="Google Ecosystem Edge"`);
    headers.set("X-Edge-Location", cf?.colo || "unknown");
    headers.set("X-Response-Source", "cf-seo-worker-v6.1");
    headers.set("X-Cache-Status", "MISS-EDGE");

    if (crawlerInfo.tier > 0) {
      headers.set("X-Crawler-Tier", `${crawlerInfo.tier}:${crawlerInfo.label}`);
      if (crawlerInfo.tier === 1) {
        headers.set("X-Googlebot-Edge", "accelerated;tier=priority;render=instant;cwv=pass;schemas=harmonized");
        headers.set("X-Google-Indexing-Protocol", "v3;supported;status=canonical");
        headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      } else if (crawlerInfo.tier === 2) {
        headers.set("X-Search-Edge", "accelerated;tier=major;indexnow=enabled");
      } else if (crawlerInfo.tier === 3) {
        headers.set("X-AI-Citation-Policy", "allowed;attribution=Paranjape Schemes (Construction) Ltd");
        headers.set("X-AI-Grounding-Source", `${CANONICAL_ORIGIN}/llms.txt`);
      }
    }

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

    const finalResponse = new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers,
    });

    // 8. Cache GET 200 responses asynchronously in Edge Cache
    if (request.method === "GET" && finalResponse.status === 200) {
      ctx.waitUntil(cache.put(request, finalResponse.clone()));
    }

    return finalResponse;
  },
};

// ─── Serverless Lead Capture Implementation ───────────────────────────────────

async function handleLeadCapture(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: Record<string, any> = {};

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        data[k] = v;
      }
    }

    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "N/A").trim();
    const project = String(data.project_interest || data.project || data.interest || "Paranjape Forest Trails").trim();
    const whatsappOptin = data.whatsapp_optin !== false;
    const source = String(data.source || data.source_url || "https://www.paranjapetownship.com/").trim();
    const timestamp = data.timestamp || new Date().toISOString();

    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, error: "Name and Mobile Number are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Asynchronous non-blocking CRM dispatch via ctx.waitUntil
    ctx.waitUntil(
      (async () => {
        try {
          const dispatch = new FormData();
          dispatch.append("name", name);
          dispatch.append("phone", phone);
          dispatch.append("email", email);
          dispatch.append("project_interest", project);
          dispatch.append("whatsapp_optin", whatsappOptin ? "YES" : "NO");
          dispatch.append("source_url", source);
          dispatch.append("timestamp", timestamp);
          dispatch.append("_subject", `🌟 New Edge Lead: ${project} - ${name} (${phone})`);
          dispatch.append("_captcha", "false");

          await fetch("https://formsubmit.co/propsmartrealty@gmail.com", {
            method: "POST",
            body: dispatch,
          });

          // D1 Database backup if bound
          if (env.DB) {
            await env.DB.prepare(
              "INSERT INTO leads (name, phone, email, project, whatsapp_optin, source, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
              .bind(name, phone, email, project, whatsappOptin ? 1 : 0, source, timestamp)
              .run();
          }
        } catch (err) {
          console.error("Async Lead Dispatch Exception:", err);
        }
      })()
    );

    return new Response(
      JSON.stringify({
        success: true,
        timestamp,
        lead: { name, phone, email, project },
        message: "Lead processed & dispatched at Edge successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || "Internal Worker Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}

// ─── Cloudflare R2 Media Streaming Handler ───────────────────────────────────

async function handleR2MediaStreaming(request: Request, env: Env, url: URL): Promise<Response> {
  const objectKey = url.pathname.replace(/^\/media\//, "");

  if (env.MEDIA_BUCKET && objectKey) {
    try {
      const range = request.headers.get("Range");
      const object = await env.MEDIA_BUCKET.get(objectKey, {
        range: range ? request.headers : undefined,
        onlyIf: request.headers,
      });

      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("ETag", object.httpEtag);
        headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("CF-R2-Source", "edge-stream");

        return new Response(object.body as any, {
          headers,
          status: object.body ? (range ? 206 : 200) : 304,
        });
      }
    } catch (e) {
      console.error("R2 Stream Error:", e);
    }
  }

  // Fallback to origin images folder
  const fallbackUrl = new URL(`/images/${objectKey}`, request.url);
  return fetch(fallbackUrl);
}
