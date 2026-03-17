#!/usr/bin/env node
/**
 * SEO Phase 7: Hyper-Local FAQ Injector (V2)
 * Replaces existing FAQ schema with hyper-local versions.
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/vikasyewle/paranjapeplots';

const locationFAQs = {
    'forest-trails-near-bavdhan': [
        { q: "What is the travel time from Bavdhan to Forest Trails?", a: "Forest Trails is just 10 minutes from the Bavdhan main gate via the Paud Road corridor, making it one of the nearest premium townships to the Bavdhan business hub." },
        { q: "Are there schools near Forest Trails for residents coming from Bavdhan?", a: "Yes, Sri Sri Ravishankar Vidya Mandir (SSRVM) is located within the township, and other top schools in Bavdhan are within a 15-minute radius." }
    ],
    'forest-trails-near-chandani-chowk': [
        { q: "How has the Chandani Chowk flyover affected connectivity to Forest Trails?", a: "The multi-tier flyover has eliminated major bottleneck traffic, reducing commute time from Chandani Chowk to Forest Trails to under 12 minutes." },
        { q: "Is Forest Trails easily accessible from the Pune-Bangalore Highway?", a: "Yes, Forest Trails is strategically located near the Chandani Chowk exit, providing direct access to the highway for residents." }
    ],
    'forest-trails-near-kothrud': [
        { q: "Why choose Forest Trails over Kothrud for investment?", a: "Forest Trails offers larger NA bungalow plots and villas at a significantly lower price point than Kothrud, while being just 15 minutes away from Kothrud's main markets." },
        { q: "How far is the nearest Metro station from Forest Trails?", a: "The Vanaz Metro station in Kothrud is less than 20 minutes from Forest Trails, providing efficient public transport connectivity." }
    ],
    'forest-trails-near-pashan': [
        { q: "What is the green cover comparison between Pashan and Forest Trails?", a: "While Pashan is green, Forest Trails is a 190-acre gated ecosystem with dedicated nature trails and 30,000+ trees, providing a much cleaner Air Quality Index." },
        { q: "Is Forest Trails a good alternative for professionals working in Pashan?", a: "Absolutely. Professionals in Pashan can enjoy a sovereign lifestyle in Bhugaon with a commute time of roughly 15-20 minutes." }
    ],
    'forest-trails-paud-road': [
        { q: "Is Paud Road well-lit and safe for night travel to Forest Trails?", a: "Yes, Paud Road is a major state highway with consistent street lighting and high frequency of commercial and residential traffic, ensuring safety 24/7." },
        { q: "What are the upcoming infrastructure projects on Paud Road?", a: "The proposed Ring Road and widening of the Mulshi Road corridor are set to further boost property values along Paud Road." }
    ]
};

const interceptFAQs = {
    'forest-trails-vs-kothrud-apartments': [
        { q: "Can I get a bungalow plot for the price of a Kothrud 3BHK?", a: "Yes, in Forest Trails, you can often secure a premium NA bungalow plot or a larger independent villa for the same price as a compact 3BHK apartment in prime Kothrud." },
        { q: "Is life in Bhugaon as convenient as Kothrud?", a: "With 30+ internal amenities, an on-site school, and retail shops, Forest Trails provides 'City-within-a-City' convenience without the congestion of Kothrud." }
    ],
    'forest-trails-vs-bavdhan-projects': [
        { q: "How is Forest Trails different from gated communities in Bavdhan?", a: "Most Bavdhan projects are high-rise towers on small footprints. Forest Trails is a 190-acre low-density township offering independent plots and villas, which are rare in Bavdhan." },
        { q: "What is the water supply status at Forest Trails compared to Bavdhan?", a: "Forest Trails has robust internal water management systems and dedicated storage tanks, ensuring consistent supply throughout the year." }
    ],
    'why-choose-forest-trails-bhugaon': [
        { q: "What is the resale value potential at Forest Trails Bhugaon?", a: "Given the Paranjape brand and the scarcity of large gated townships in West Pune, resale demand for Forest Trails properties remains consistently high among HNIs." },
        { q: "Is the project RERA registered?", a: "Yes, all phases of Paranjape Forest Trails, including Misty Greens and Whistling Meadows, are fully RERA registered and compliant." }
    ]
};

function injectFAQ(filePath, faqs) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Create FAQ Schema JSON-LD
    const faqSchemaMarkup = `
    <!-- Hyper-Local FAQ Schema (SEO Phase 7) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            ${faqs.map(f => `{
                "@type": "Question",
                "name": "${f.q}",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${f.a}"
                }
            }`).join(',\n            ')}
        ]
    }
    </script>`;

    // If an old FAQPage exists, try to replace it, otherwise append.
    const faqRegex = /<!-- FAQPage Schema -->\s+<script type="application\/ld\+json">[\s\S]+?"@type": "FAQPage"[\s\S]+?<\/script>/;
    
    if (content.match(faqRegex)) {
        content = content.replace(faqRegex, faqSchemaMarkup);
    } else if (!content.includes('Hyper-Local FAQ Schema')) {
        content = content.replace('</head>', faqSchemaMarkup + '\n</head>');
    } else {
        // Already contains our new schema, update it anyway to be sure
        const newFaqRegex = /<!-- Hyper-Local FAQ Schema \(SEO Phase 7\) -->[\s\S]+?<\/script>/;
        content = content.replace(newFaqRegex, faqSchemaMarkup);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
}

console.log('🚀 Starting Hyper-Local FAQ Refresh...');

let count = 0;
[...Object.entries(locationFAQs), ...Object.entries(interceptFAQs)].forEach(([folder, faqs]) => {
    const file = path.join(BASE_DIR, folder, 'index.html');
    if (fs.existsSync(file)) {
        if (injectFAQ(file, faqs)) {
            console.log(`✅ Updated FAQ for: ${folder}`);
            count++;
        }
    }
});

console.log(`\n🎯 Finished! Refreshed FAQs in ${count} pages.`);
