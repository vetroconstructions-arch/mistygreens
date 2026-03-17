#!/usr/bin/env node
/**
 * SEO Phase 6: Author Bio Injector (E-E-A-T)
 * Injects a standardized Author/Publisher bio at the end of blog articles to establish authority.
 */
const fs = require('fs');
const path = require('path');

const BLOGS_DIR = '/Users/vikasyewle/paranjapeplots/blogs';

const authorBioHtml = `
    <!-- Author Bio Box (SEO Phase 6 E-E-A-T) -->
    <div class="author-bio-box" style="margin-top: 5rem; padding: 3rem; background: #f9f9f9; border-left: 4px solid #8C732F; display: flex; gap: 2rem; align-items: flex-start;">
        <div class="author-avatar" style="width: 80px; height: 80px; background: #8C732F; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 1.5rem;">PS</div>
        <div class="author-details">
            <h4 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #1a1a1a;">Published by Paranjape Schemes</h4>
            <p style="margin: 1rem 0; font-size: 0.95rem; line-height: 1.6; color: #555;">With over 35 years of heritage, Paranjape Schemes (Construction) Ltd. has delivered 200+ landmark projects across India. Our expertise in integrated townships and sustainable living is reflected in the 190-acre Forest Trails ecosystem in Bhugaon, West Pune.</p>
            <a href="../../about-paranjape-schemes/" style="font-weight: 700; color: #8C732F; text-decoration: none; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;">Discover Our Legacy &rarr;</a>
        </div>
    </div>
`;

function getBlogFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getBlogFiles(file));
        } else if (file.endsWith('index.html')) {
            results.push(file);
        }
    });
    return results;
}

const files = getBlogFiles(BLOGS_DIR);
let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('author-bio-box')) {
        // Look for the end of the main article content (usually before <footer> or last </section>)
        const injectionPoint = '</article>';
        if (content.includes(injectionPoint)) {
            content = content.replace(injectionPoint, authorBioHtml + '\n</article>');
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ Injected Author Bio: ${file.replace(BLOGS_DIR + '/', '')}`);
        } else {
             // Fallback to before footer if article tag is missing
             const footerPoint = '</body>';
             if (content.includes(footerPoint)) {
                 content = content.replace(footerPoint, authorBioHtml + '\n</body>');
                 fs.writeFileSync(file, content, 'utf8');
                 updatedCount++;
                 console.log(`✅ Injected Author Bio (Fallback): ${file.replace(BLOGS_DIR + '/', '')}`);
             }
        }
    }
});

console.log(`\n🎯 Successfully added Author Bio to ${updatedCount} blog posts.`);
