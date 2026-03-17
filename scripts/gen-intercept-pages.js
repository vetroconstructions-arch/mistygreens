#!/usr/bin/env node
/**
 * SEO Phase 4: Competitor Intercept Pages Generator
 * Creates comparison pages targeting bottom-of-funnel buyers.
 */
const fs = require('fs');
const path = require('path');

const BASE = '/Users/vikasyewle/paranjapeplots';
const SITE = 'https://paranjape-mistygreens.in';

const pages = [
    {
        dir: 'forest-trails-vs-kothrud-apartments',
        title: 'Forest Trails Bhugaon vs Kothrud Apartments | Where Should You Invest?',
        desc: 'Comparing a standard 3 BHK in Kothrud with a luxury villa or NA bungalow plot at Forest Trails Bhugaon. See why smart buyers are upgrading to the 190-acre township.',
        keywords: 'forest trails vs kothrud apartments, bhugaon vs kothrud real estate, villas near kothrud, paranjape schemes vs kothrud builders',
        h1: 'Forest Trails <i>vs</i> Kothrud.',
        subtitle: 'Why upgrading from a Kothrud apartment to a Bhugaon villa is the ultimate lifestyle decision.',
        intro: 'For decades, Kothrud was the undisputed king of West Pune real estate. But as the area has reached saturation—plagued by traffic, aging infrastructure, and soaring per-square-foot rates—discerning buyers are looking for a superior alternative. Enter Paranjape Forest Trails in Bhugaon. Located just 15 minutes away, it offers an unparalleled lifestyle upgrade for the exact same budget.',
        tableHtml: `
            <table style="width: 100%; border-collapse: collapse; margin-top: 2rem; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <thead>
                    <tr style="background: var(--pscl-dark); color: white; text-align: left;">
                        <th style="padding: 1.5rem;">Feature</th>
                        <th style="padding: 1.5rem;">Typical Kothrud Apartment</th>
                        <th style="padding: 1.5rem; background: var(--pscl-maroon);">Forest Trails Township</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 1.5rem; font-weight: 600;">Product Offering</td>
                        <td style="padding: 1.5rem;">Cramped 3 BHK Flat</td>
                        <td style="padding: 1.5rem;">Independent Villa or NA Plot</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 1.5rem; font-weight: 600;">Open Space</td>
                        <td style="padding: 1.5rem;">Minimal (Building Margin)</td>
                        <td style="padding: 1.5rem;">190 Acres of Gated Forest</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 1.5rem; font-weight: 600;">Air Quality</td>
                        <td style="padding: 1.5rem;">High AQI (Traffic Pollution)</td>
                        <td style="padding: 1.5rem;">Pristine (Sahyadri Microclimate)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 1.5rem; font-weight: 600;">Amenities</td>
                        <td style="padding: 1.5rem;">Basic Gym & Small Pool</td>
                        <td style="padding: 1.5rem;">The Cliff Club, Equestrian Center, Olympic Pool</td>
                    </tr>
                    <tr>
                        <td style="padding: 1.5rem; font-weight: 600;">Appreciation (ROI)</td>
                        <td style="padding: 1.5rem;">Stagnant (Market Saturated)</td>
                        <td style="padding: 1.5rem;">High Growth (+21% CAGR)</td>
                    </tr>
                </tbody>
            </table>
        `,
        faqs: [
            { q: 'Is the commute from Bhugaon to Kothrud difficult?', a: 'Not at all. Forest Trails is just a 15-minute, scenic drive to Kothrud via Paud Road. You remain deeply connected to your Kothrud social circle.' },
            { q: 'Why is Forest Trails considered a better investment than Kothrud?', a: 'Kothrud property prices have peaked, leaving little room for capital appreciation. Forest Trails, backed by the upcoming Ring Road, offers immense ROI potential alongside a vast lifestyle upgrade.' }
        ]
    },
    {
        dir: 'forest-trails-vs-bavdhan-projects',
        title: 'Forest Trails Bhugaon vs Bavdhan Real Estate | Township Comparison',
        desc: 'Comparing standalone Bavdhan projects with the 190-acre Paranjape Forest Trails township in Bhugaon. Discover where you get the most value for your investment.',
        keywords: 'forest trails vs bavdhan projects, bhugaon vs bavdhan real estate, township vs standalone building pune, best property near bavdhan',
        h1: 'Forest Trails <i>vs</i> Bavdhan.',
        subtitle: 'Comparing concrete density with 190 acres of sovereign, forest-themed township living.',
        intro: 'Bavdhan has grown significantly due to its highway connectivity. However, rapid commercialization has turned Bavdhan into a dense concrete jungle of standalone buildings. Just 10 minutes away lies Bhugaon, home to Paranjape Forest Trails—a meticulously planned 190-acre gated township that offers the serenity that Bavdhan has lost.',
        tableHtml: `
            <table style="width: 100%; border-collapse: collapse; margin-top: 2rem; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <thead>
                    <tr style="background: var(--pscl-dark); color: white; text-align: left;">
                        <th style="padding: 1.5rem;">Criteria</th>
                        <th style="padding: 1.5rem;">Typical Bavdhan Project</th>
                        <th style="padding: 1.5rem; background: var(--pscl-maroon);">Forest Trails Township</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 1.5rem; font-weight: 600;">Ecosystem</td>
                        <td style="padding: 1.5rem;">Standalone Tower / Small Society</td>
                        <td style="padding: 1.5rem;">190-Acre Integrated Township</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 1.5rem; font-weight: 600;">Asset Freedom</td>
                        <td style="padding: 1.5rem;">Limited to Apartments</td>
                        <td style="padding: 1.5rem;">NA Plots, Independent Villas, Premium Flats</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 1.5rem; font-weight: 600;">Exclusivity</td>
                        <td style="padding: 1.5rem;">Crowded Suburb</td>
                        <td style="padding: 1.5rem;">Vast, secure, elite gated community</td>
                    </tr>
                    <tr>
                        <td style="padding: 1.5rem; font-weight: 600;">Highway Access</td>
                        <td style="padding: 1.5rem;">Immediate (often noisy)</td>
                        <td style="padding: 1.5rem;">Direct via Chandani Chowk flyover (Serene & Quiet)</td>
                    </tr>
                </tbody>
            </table>
        `,
        faqs: [
            { q: 'Is Bhugaon more peaceful than Bavdhan?', a: 'Yes, drastically. While Bavdhan is highly commercialized and noisy due to highway traffic, Forest Trails in Bhugaon sits nestled against the Sahyadri mountains, offering absolute tranquility.' },
            { q: 'Does Forest Trails have access to Hinjewadi like Bavdhan does?', a: 'Yes. Via the newly completed Chandani Chowk flyover, the commute from Forest Trails to Hinjewadi Phase 1 is a smooth, signal-free drive of about 25 minutes.' }
        ]
    },
    {
        dir: 'why-choose-forest-trails-bhugaon',
        title: 'Why Choose Forest Trails Bhugaon | 35 Years of Paranjape Legacy',
        desc: 'Discover why over 2000 families chose Paranjape Forest Trails in Bhugaon. Explore the 35-year Paranjape Schemes legacy, world-class amenities, and 190-acre township master plan.',
        keywords: 'why choose forest trails, paranjape schemes legacy, best township in west pune, paranjape builder review, forest trails bhugaon review',
        h1: 'Why Choose <i>Forest Trails?</i>',
        subtitle: '190 Acres. 35 Years of Legacy. The Ultimate Address in West Pune.',
        intro: 'Investing in real estate is a generational decision. You aren\'t just buying square footage; you are buying trust, security, and a future for your family. Paranjape Schemes (Construction) Ltd. brings 35+ years of unblemished trust to Forest Trails Bhugaon, making it West Pune\'s most successful and prestigious gated township.',
        tableHtml: `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem;">
                <div style="background: var(--pscl-gray); padding: 3rem; border-left: 4px solid var(--pscl-maroon);">
                    <h3 style="margin-top:0; color:var(--pscl-dark);">1. The 35-Year Legacy</h3>
                    <p style="color:#666;">Paranjape Schemes has delivered over 200 projects. This means zero execution risk, absolute transparency, and guaranteed delivery.</p>
                </div>
                <div style="background: var(--pscl-gray); padding: 3rem; border-left: 4px solid var(--pscl-gold);">
                    <h3 style="margin-top:0; color:var(--pscl-dark);">2. 190-Acre Ecosystem</h3>
                    <p style="color:#666;">Not a concrete block, but a breathing forest. Featuring lakes, thousands of trees, and world-class infrastructure that cannot be replicated.</p>
                </div>
                <div style="background: var(--pscl-gray); padding: 3rem; border-left: 4px solid var(--pscl-gold);">
                    <h3 style="margin-top:0; color:var(--pscl-dark);">3. Elite Amenities</h3>
                    <p style="color:#666;">Home to The Cliff Club, an equestrian academy, an SSRVM school, fire station, and commercial shopping plazas right inside the gates.</p>
                </div>
                <div style="background: var(--pscl-gray); padding: 3rem; border-left: 4px solid var(--pscl-maroon);">
                    <h3 style="margin-top:0; color:var(--pscl-dark);">4. Asset Sovereignty</h3>
                    <p style="color:#666;">True wealth lies in land. With clear-title NA Bungalow Plots and independent villas, you command ultimate property sovereignty.</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'Is Paranjape Schemes a trusted builder?', a: 'Yes, Paranjape Schemes (Construction) Ltd. is one of Pune\'s most reputed and trusted developers with a 3.5-decade track record of delivering over 200 quality projects.' },
            { q: 'What amenities are currently operational at Forest Trails?', a: 'The Cliff Club (with fine dining and pool), SSRVM school, horse-riding academy, tennis courts, and several landscaped parks are fully operational today.' },
            { q: 'Are the titles clear at Forest Trails?', a: 'Absolutely. Every plot, villa, and apartment at Forest Trails is fully RERA registered with clear titles, sanctioned plans, and individual 7/12 extracts for plots.' }
        ]
    }
];

// Reusable Cross-Link Footer
const crossLinkFooter = `
    <!-- Internal Linking Mesh -->
    <section style="background: #0a0a0a; padding: 4rem 0; border-top: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <h4 style="color: var(--pscl-gold); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 2rem; text-align: center;">EXPLORE FOREST TRAILS</h4>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; text-align: center;">
                <a href="../na-bungalow-plots-bhugaon/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; transition: all 0.3s;">NA Bungalow Plots</a>
                <a href="../luxury-forest-villas-bhugaon/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; transition: all 0.3s;">Luxury Villas</a>
                <a href="../premium-apartments-forest-trails/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; transition: all 0.3s;">Premium Apartments</a>
                <a href="../property-investment-bhugaon-pune/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; transition: all 0.3s;">Investment Data</a>
                <a href="../paranjape-schemes-forest-trails-bhugaon/" style="color: var(--pscl-gold); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(140,115,47,0.3); border-radius: 3px; transition: all 0.3s; font-weight: 600;">Paranjape Schemes</a>
                <a href="../forest-trails-vs-kothrud-apartments/" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 3px; transition: all 0.3s;">Vs Kothrud</a>
                <a href="../forest-trails-vs-bavdhan-projects/" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 3px; transition: all 0.3s;">Vs Bavdhan</a>
                <a href="../why-choose-forest-trails-bhugaon/" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 3px; transition: all 0.3s;">Why Choose Us</a>
            </div>
        </div>
    </section>`;

// Template renderer
function generateHTML(page) {
    const faqEntries = page.faqs.map(f => `            {
                "@type": "Question",
                "name": "${f.q}",
                "acceptedAnswer": { "@type": "Answer", "text": "${f.a}" }
            }`).join(',\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    
    <title>${page.title}</title>
    <meta name="description" content="${page.desc}">
    <meta name="keywords" content="${page.keywords}">
    <link rel="canonical" href="${SITE}/${page.dir}/">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">

    <!-- Core Web Vitals LCP Preload -->
    <link rel="preload" as="image" href="../images/cliff-club.jpg">

    <!-- BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Forest Trails", "item": "${SITE}/" },
            { "@type": "ListItem", "position": 2, "name": "Real Estate Comparison", "item": "${SITE}/${page.dir}/" }
        ]
    }
    </script>
    
    <!-- FAQPage Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
${faqEntries}
        ]
    }
    </script>
</head>
<body>
    <nav class="nav-main">
        <div class="container nav-content">
            <a href="../" class="nav-brand">
                <div class="brand-logo-text">
                    <span style="font-family: 'Inter', sans-serif; font-weight: 800; font-size: 1.6rem; color: #fff; text-transform: uppercase;">Paranjape</span>
                    <span style="font-family: 'Playfair Display', serif; font-weight: 400; font-style: italic; font-size: 0.7rem; color: #8C732F; text-transform: uppercase;">Forest Trails</span>
                </div>
            </a>
            <div class="nav-actions">
                <a href="../#enquire" class="btn-primary open-enquiry-modal" style="padding: 0.7rem 1.4rem;">ENQUIRE NOW</a>
            </div>
        </div>
    </nav>
    <main>
        <section class="hero-section" style="height: 70vh;">
            <div class="hero-bg" style="background-image: url('../images/cliff-club.jpg'); opacity: 0.8; transform: scale(1.05); filter: contrast(1.1);"></div>
            <div class="hero-container container">
                <div class="hero-content">
                    <span class="top-label">Buyer's Intelligence</span>
                    <h1 class="hero-title">${page.h1}</h1>
                    <p class="hero-subtitle">${page.subtitle}</p>
                </div>
            </div>
        </section>
        <section class="section" style="background: #fafafa; padding: 8rem 0;">
            <div class="container">
                <div class="grid-12">
                    <div class="col-10" style="margin: 0 auto;">
                        <p style="font-size: 1.25rem; line-height: 1.8; color: #444; border-left: 4px solid var(--pscl-gold); padding-left: 2rem;">
                            ${page.intro}
                        </p>
                        
                        ${page.tableHtml}

                        <div style="text-align: center; margin-top: 5rem;">
                            <a href="../#enquire" class="btn-primary open-enquiry-modal" style="padding: 1.2rem 3rem; font-size: 1rem;">SCHEDULE A VIP SITE VISIT</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <!-- The Enquiry Form: Lead Capture -->
    <div class="concierge-trigger" id="concierge-open" role="button" aria-label="Open Enquiry Form">
        <div class="concierge-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <span class="concierge-label">ENQUIRE</span>
    </div>

    <div class="concierge-modal" id="heritage-concierge" aria-hidden="true">
        <div class="concierge-overlay"></div>
        <div class="concierge-panel">
            <div class="concierge-header">
                <h3>Enquiry <i>Form</i></h3>
                <button id="concierge-close" aria-label="Close Enquiry Form">&times;</button>
            </div>
            <div class="concierge-body" style="padding: 2rem;">
                <p style="color: var(--pscl-gold); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem;">Get Exclusive Details & Price List</p>
                <form id="enquiry-form-modal" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <input type="text" name="name" placeholder="Full Name *" required style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 1rem 1.5rem; font-size: 0.85rem; border-radius: 4px; outline: none;">
                    <input type="tel" name="phone" placeholder="Phone Number *" required style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 1rem 1.5rem; font-size: 0.85rem; border-radius: 4px; outline: none;">
                    <input type="email" name="email" placeholder="Email Address (Optional)" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 1rem 1.5rem; font-size: 0.85rem; border-radius: 4px; outline: none;">
                    <button type="submit" style="background: var(--pscl-maroon); color: #fff; padding: 1.2rem 2rem; border: none; cursor: pointer; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 4px; transition: background 0.3s;">SUBMIT ENQUIRY</button>
                </form>
            </div>
        </div>
    </div>

${crossLinkFooter}
    <footer class="footer-main">
        <div class="container text-center" style="padding: 5rem 0;">
            <a href="../" style="color: #fff; text-decoration: none; font-weight: 800; letter-spacing: 0.2em;">RETURN TO MAIN SITE</a>
            <p style="margin-top: 2rem; color: #666;">&copy; 2026 Paranjape Schemes (Construction) Ltd. All Rights Reserved.</p>
        </div>
    </footer>
    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../script.js"></script>
</body>
</html>`;
}

// Generate the files
for (const page of pages) {
    const dirPath = path.join(BASE, page.dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const html = generateHTML(page);
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf-8');
    console.log(`✅ Created Intercept Page: ${page.dir}/index.html`);
}

console.log('\n🎯 Successfully generated 3 Competitor Intercept pages.');
