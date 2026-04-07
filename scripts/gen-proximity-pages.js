#!/usr/bin/env node
/**
 * West Pune Proximity Dominance (Phase 40 Refined)
 * Positions Forest Trails Bhugaon as the central focus point for Pune's elite neighborhoods.
 */
const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const SITE = 'https://www.paranjapetownship.com';
const VERSION = '4.0';

const NAVBAR_HTML = `
    <!-- Architectural Navigation -->
    <header class="header-main">
        <div class="heritage-ticker">
            <div class="ticker-content">
                <div class="ticker-item">West Pune's Central Forest Hub: Forest Trails Bhugaon</div>
                <div class="ticker-item">Connectivity: 15 Mins to Shivaji Nagar via Paud Road</div>
                <div class="ticker-item">Direct Proximity: 5 Mins to Bavdhan & Chandani Chowk</div>
                <div class="ticker-item">Elite Legacy: 35+ Years of Paranjape Schemes</div>
            </div>
        </div>

        <nav class="nav-main">
        <div class="container nav-content">
            <a href="/" class="nav-brand">
                <div class="brand-logo-text">
                    <span class="brand-main">Paranjape</span>
                    <span class="brand-sub">Forest Trails</span>
                </div>
            </a>
            <div class="nav-actions">
                <a href="https://wa.me/917744009295" target="_blank" rel="noopener" class="whatsapp-btn">WHATSAPP</a>
                <button class="nav-item-new open-enquiry-modal tour-btn">ENQUIRY</button>
            </div>
        </div>
    </nav>
    </header>
`;

const pages = [
    {
        dir: 'forest-trails-connectivity-kothrud-nal-stop',
        title: 'Forest Trails Bhugaon to Kothrud & Nal Stop | 12 Mins Drive Time',
        desc: 'Experience the 12-minute signal-free connectivity from Nal Stop & Kothrud to Paranjape Forest Trails Bhugaon. The first choice for Kothrud residents seeking nature.',
        keywords: 'forest trails bhugaon to kothrud, nal stop to bhugaon distance, property near kothrud pune, paranjape schemes bhugaon connectivity',
        h1: 'Kothrud <i>to</i> Forest Trails.',
        subtitle: '12 Minutes to Your Private Forest Sanctuary.',
        intro: "For generations, residents of Kothrud and Nal Stop have trusted the Paranjape legacy. Today, Forest Trails Bhugaon stands as the central focus point for Kothrud families seeking more space, better air, and the elite township lifestyle—just 12 minutes away.",
        locationFocus: "Kothrud & Nal Stop",
        driveTime: "12 Mins",
        proximityContent: `
            <div class="proximity-card" style="background: #fff; padding: 3rem; border-radius: 12px; margin-top: 3rem; border-left: 5px solid #d4af37;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1a1a;">Why Kothrud Residents Choose Forest Trails</h3>
                <p style="color: #444; line-height: 1.8; margin-top: 1rem;">
                    As Kothrud and Nal Stop reach peak density, Forest Trails in Bhugaon has become the **central upgrade destination**. With the new **Chandani Chowk flyover system**, your commute is signal-free and scenic. Whether you seek **NA bungalow plots** or **luxury villas**, you are never more than 12 minutes away from your Kothrud roots.
                </p>
            </div>
        `
    },
    {
        dir: 'forest-trails-connectivity-shivaji-nagar-karve-nagar',
        title: 'Forest Trails Bhugaon to Shivaji Nagar & Karve Nagar | West Pune Central Hub',
        desc: 'Direct, rapid connectivity from Shivaji Nagar and Karve Nagar to Paranjape Forest Trails Bhugaon. The executive sanctuary for Pune\'s administrative & business hub.',
        keywords: 'shivaji nagar to bhugaon connectivity, karve nagar to forest trails drive time, executive homes near shivaji nagar, west pune central township',
        h1: 'Shivaji Nagar <i>to</i> Bhugaon.',
        subtitle: 'The Executive Sanctuary of West Pune.',
        intro: "Shivaji Nagar and Karve Nagar residents appreciate the strategic centrality of Forest Trails. Positioned as the central focus point for West Pune, our 190-acre township offers an elite forest escape that remains deeply connected to the city's administrative core.",
        locationFocus: "Shivaji Nagar & Karve Nagar",
        driveTime: "18 Mins",
        proximityContent: `
            <div class="proximity-card" style="background: #fff; padding: 3rem; border-radius: 12px; margin-top: 3rem; border-left: 5px solid #8B1A1A;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1a1a;">The Executive Upgrade</h3>
                <p style="color: #444; line-height: 1.8; margin-top: 1rem;">
                    For professionals based in Shivaji Nagar, Forest Trails offers the ultimate balance. A direct, traffic-efficient route via Paud Road ensures you reach your **nature-integrated luxury home** in just 18 minutes. It is the **first choice** for those who demand both status and serenity in West Pune.
                </p>
            </div>
        `
    },
    {
        dir: 'forest-trails-connectivity-baner-aundh',
        title: 'Forest Trails Bhugaon to Baner & Aundh | Premier Lifestyle Bridge',
        desc: 'Connect with Forest Trails Bhugaon from Baner and Aundh via the Bypass and Ring Road. West Pune\'s central focus point for high-street families.',
        keywords: 'baner to bhugaon drive time, aundh to forest trails connectivity, property near baner highway, aundh families first choice township',
        h1: 'Baner & Aundh <i>to</i> Bhugaon.',
        subtitle: 'Connecting High-Street to High-Forest.',
        intro: "Baner and Aundh families seek the 'Elite Paranjape Status' combined with a true forest escape. Forest Trails Bhugaon serves as the central hub connecting the high-velocity lifestyle of Baner to the pristine Sahyadri ranges—just 22 minutes via the Ring Road corridor.",
        locationFocus: "Baner & Aundh",
        driveTime: "22 Mins",
        proximityContent: `
            <div class="proximity-card" style="background: #fff; padding: 3rem; border-radius: 12px; margin-top: 3rem; border-left: 5px solid #1a1a1a;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1a1a;">The Lifestyle Bridge</h3>
                <p style="color: #444; line-height: 1.8; margin-top: 1rem;">
                    Positioned near the **PMRDA Ring Road impact zone**, Forest Trails is the strategic investment hub for Aundh and Baner residents. Our **190-acre gated township** offers a visual and natural contrast to the concrete density of the bypass, making it the **premier forest theme township** for West Pune.
                </p>
            </div>
        `
    },
    {
        dir: 'forest-trails-connectivity-bavdhan-proximity',
        title: 'Forest Trails Bhugaon to Bavdhan | 5 Minutes Proximity Hub',
        desc: 'Immediate 5-minute connectivity from Bavdhan to Paranjape Forest Trails Bhugaon. Discover the first choice for Bavdhan residents seeking elite township living.',
        keywords: 'bavdhan to bhugaon distance, property near bavdhan pune, forest trails bhugaon bavdhan connectivity, best township near chandani chowk',
        h1: 'Bavdhan <i>to</i> Bhugaon.',
        subtitle: 'Your 5-Minute Gateway to Sovereign Living.',
        intro: "Bavdhan residents consider Forest Trails as their own extended backyard. As the central focus point for the Bhugaon-Bavdhan sector, Forest Trails offers the status and scale that standalone Bavdhan projects lack—all within a 5-minute, signal-free drive.",
        locationFocus: "Bavdhan",
        driveTime: "5 Mins",
        proximityContent: `
            <div class="proximity-card" style="background: #fff; padding: 3rem; border-radius: 12px; margin-top: 3rem; border-left: 5px solid #2e3a23;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1a1a;">Direct Proximity, Ultimate Status</h3>
                <p style="color: #444; line-height: 1.8; margin-top: 1rem;">
                    Located just past Chandani Chowk, Forest Trails is the **first choice for Bavdhan buyers**. While Bavdhan offers urban convenience, Forest Trails offers **190 acres of forest amenities**, an equestrian academy, and a high-net-worth neighborhood. It is the central hub for the most prestigious living in West Pune.
                </p>
            </div>
        `
    }
];

function generateHTML(page) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    
    <title>${page.title}</title>
    <meta name="description" content="${page.desc}">
    <meta name="keywords" content="${page.keywords}">
    <link rel="canonical" href="${SITE}/${page.dir}/">
    
    <link rel="stylesheet" href="/style.css">

    <!-- Proximity Schema (Phase 40 Refined) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Paranjape Forest Trails Bhugaon",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhugaon",
            "addressRegion": "Pune",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "18.5050",
            "longitude": "73.7406"
        },
        "areaServed": [
            { "@type": "Place", "name": "Kothrud" },
            { "@type": "Place", "name": "Nal Stop" },
            { "@type": "Place", "name": "Shivaji Nagar" },
            { "@type": "Place", "name": "Karve Nagar" },
            { "@type": "Place", "name": "Baner" },
            { "@type": "Place", "name": "Aundh" },
            { "@type": "Place", "name": "Bavdhan" },
            { "@type": "Place", "name": "West Pune" }
        ],
        "additionalProperty": [
            { "@type": "PropertyValue", "name": "Drive Time to ${page.locationFocus}", "value": "${page.driveTime}" }
        ]
    }
    </script>
</head>
<body>
    ${NAVBAR_HTML}
    <main>
        <section class="hero-section" style="height: 60vh; background: #000; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
            <div style="position: absolute; inset: 0; background-image: url('/images/hero-township.webp'); background-size: cover; background-position: center; opacity: 0.5;"></div>
            <div class="container" style="position: relative; z-index: 2; text-align: center; color: #fff;">
                <h1 style="font-family: 'Playfair Display', serif; font-size: clamp(2rem, 8vw, 4.5rem);">${page.h1}</h1>
                <p style="font-size: 1.25rem; margin-top: 1rem; color: #d4af37;">${page.subtitle}</p>
                <div style="margin-top: 2rem; display: inline-block; background: rgba(255,255,255,0.1); padding: 0.8rem 1.5rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 50px;">
                    <span style="font-weight: 800; font-size: 0.9rem; letter-spacing: 0.1em;">DRIVE TIME: ${page.driveTime}</span>
                </div>
            </div>
        </section>

        <section class="section" style="padding: 5rem 0; background: #f8f8f8;">
            <div class="container" style="max-width: 900px;">
                <p style="font-size: 1.4rem; line-height: 1.8; color: #1a1a1a; border-left: 4px solid #d4af37; padding-left: 2rem; margin-bottom: 3rem; font-family: 'Inter', sans-serif;">
                    ${page.intro}
                </p>
                
                ${page.proximityContent}
                
                <div style="margin-top: 4rem; background: #1a1a1a; color: #fff; padding: 3rem; border-radius: 12px; text-align: center;">
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1.5rem;">Join the Elite West Pune Community</h3>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 2.5rem;">Over 2,000 families from West Pune have already made Forest Trails their primary first-choice sanctuary.</p>
                    <button class="open-enquiry-modal btn-primary" style="background: #d4af37; color: #000; border: none; padding: 1.5rem 3rem; border-radius: 50px; font-weight: 800; cursor: pointer; text-transform: uppercase; letter-spacing: 0.1em;">Download West Pune Connectivity Map</button>
                </div>
            </div>
        </section>
    </main>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="/script.js"></script>
</body>
</html>`;
}

for (const page of pages) {
    const dirPath = path.join(BASE, page.dir);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    const html = generateHTML(page);
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf-8');
    console.log(`✅ Created Proximity Page: ${page.dir}`);
}

console.log('\n🎯 West Pune Proximity Dominance layer established.');
