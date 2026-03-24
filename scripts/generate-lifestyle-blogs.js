const fs = require('fs');
const path = require('path');

const blogs = [
    {
        slug: "baner-vs-bhugaon-investment-analysis-2026",
        title: "Baner vs. Bhugaon: A Structural Investment Analysis",
        keywords: "bhugaon real estate investment, baner property comparison, pune residential growth",
        excerpt: "Why institutional investors are shifting focus from saturated Baner to the emerging 190-acre Forest Trails ecosystem.",
        content: `
            <p>For over a decade, Baner has been the poster child of Pune's residential appreciation. However, as of 2026, the data indicates a fundamental saturation. With the PMRDA Ring Road Phase 1 nearing completion, Bhugaon—specifically the Paranjape Forest Trails township—is offering a rare 'Entry-Point Value' that Baner can no longer match.</p>
            <h3>The Infrastructure Arbitrage</h3>
            <p>While Baner struggles with vertical density and traffic congestion, Forest Trails offers 190 acres of horizontal sovereignty. The Price-to-Appreciation ratio in Bhugaon is currently projected at 21.2% CAGR, driven by the Ring Road connectivity and the maturation of internal township facilities like the Cliff Club and SSRVM School.</p>
        `
    },
    {
        slug: "best-schools-near-bhugaon-paud-road",
        title: "Educational Autonomy: Top Schools Near Bhugaon",
        keywords: "schools in bhugaon, ssrvm school pune, best schools near paud road",
        excerpt: "Discover the educational infrastructure within and around Forest Trails, ensuring your child's growth is as lush as their surroundings.",
        content: `
            <p>Finding a home that doesn't compromise on education is the primary hurdle for modern families. Forest Trails solves this internally. Shri Ravishankar Vidya Mandir (SSRVM) is not just 'nearby'—it's integrated within the township gates, providing a safe, green environment for holistic learning.</p>
            <h3>Beyond the Gates</h3>
            <p>Within a 15-minute radius, residents have access to some of Pune's most prestigious institutions, including Indus International and several IB-track academies on Paud Road, making Bhugaon the new educational nerve center of West Pune.</p>
        `
    }
];

const TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | Paranjape Forest Trails Insights</title>
    <meta name="description" content="{{DESCRIPTION}}">
    <meta name="keywords" content="{{KEYWORDS}}">
    <link rel="stylesheet" href="/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,900;1,400&display=swap" rel="stylesheet">
</head>
<body class="insight-page">
    <header class="header-main scrolled">
        <div class="container nav-content">
            <a href="/" class="nav-brand">Paranjape Forest Trails</a>
            <div class="breadcrumb" style="font-size: 0.75rem; color: var(--pscl-gold);">HOME / INSIGHTS / {{TITLE}}</div>
        </div>
    </header>

    <main style="padding: 120px 0;">
        <div class="container" style="max-width: 800px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 3.5rem; line-height: 1.1; margin-bottom: 40px; color: var(--pscl-maroon);">{{TITLE}}</h1>
            <div class="insight-content" style="font-size: 1.15rem; line-height: 2; color: #444;">
                {{CONTENT}}
            </div>
            
            <div style="margin-top: 80px; padding: 40px; background: #f5f5f0; border-radius: 20px; border-left: 5px solid var(--pscl-gold);">
                <h4 style="color: var(--pscl-maroon); margin-bottom: 10px;">Looking for similar insights?</h4>
                <p style="font-size: 0.9rem; margin-bottom: 20px;">Download the Forest Trails Township Encyclopedia for deep investment data.</p>
                <button class="btn btn-maroon open-enquiry-modal" data-project="Insights Case Study">DOWNLOAD ENCYCLOPEDIA</button>
            </div>
        </div>
    </main>

    <footer class="footer-main" style="padding: 60px 0; background: #0a0a0a; color: #666; text-align: center;">
        <p>&copy; 2026 Paranjape Schemes (Construction) Ltd.</p>
    </footer>
    <script src="/script.js"></script>
</body>
</html>`;

blogs.forEach(blog => {
    let html = TEMPLATE
        .replace(/{{TITLE}}/g, blog.title)
        .replace(/{{KEYWORDS}}/g, blog.keywords)
        .replace(/{{DESCRIPTION}}/g, blog.excerpt)
        .replace(/{{CONTENT}}/g, blog.content);

    const dir = path.join(__dirname, `../insights/${blog.slug}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`✅ Generated Authority Article: ${blog.slug}`);
});
