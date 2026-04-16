const fs = require('fs');
const path = require('path');

/**
 * Image Injection Map
 * Maps each cluster page to the images that should be inserted,
 * along with the injection target (where to insert the image block).
 */
const injections = [
    {
        file: 'the-cove/index.html',
        target: '<p style="font-size: 1.25rem; line-height: 1.8; color: #444; border-left: 4px solid var(--pscl-gold); padding-left: 2rem; margin-bottom: 3rem;">',
        imageBlock: `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 4rem; border-radius: 16px; overflow: hidden;">
                        <div style="position: relative; overflow: hidden; border-radius: 16px; aspect-ratio: 16/10;">
                            <img src="/images/cove-duet.webp" alt="The Cove Duet Villas at Forest Trails Bhugaon" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        </div>
                        <div style="position: relative; overflow: hidden; border-radius: 16px; aspect-ratio: 16/10;">
                            <img src="/images/villas-courtyard.webp" alt="Luxury Villa Courtyard at The Cove Bhugaon" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        </div>
                    </div>
`,
        heroImage: { from: "/images/plots.webp", to: "/images/villas-exterior-1.webp" }
    },
    {
        file: 'luxury-forest-villas-bhugaon/index.html',
        // Insert after the hero section's content div
        target: '<h2 class="section-title">The Sovereign <i>Retreat</i>.</h2>',
        imageBlock: `
                        <div style="margin: 3rem 0 4rem; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
                            <img src="/images/villas-exterior-1.webp" alt="The Rivolo Forest Villas Exterior at Bhugaon" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block; transition: transform 0.6s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                        </div>
`,
        // Also inject a second image after the Cove Duet section
        secondTarget: 'The Cove <i>Duet</i> Lifestyle.',
        secondImageBlock: `
                            <div style="margin-top: 2rem; border-radius: 12px; overflow: hidden;">
                                <img src="/images/villas-courtyard.webp" alt="Courtyard Living at Rivolo Private Villas Bhugaon" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;">
                            </div>
`
    },
    {
        file: 'misty-greens/index.html',
        target: '<h2 class="section-title">',
        imageBlock: `
                        <div style="margin: 3rem 0 4rem; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
                            <img src="/images/misty-greens-gate-day.webp" alt="Misty Greens Entrance Gate - Premium NA Bungalow Plots in Bhugaon Pune" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;">
                        </div>
`,
        // Second image after "The Bhugaon Advantage" section
        secondTarget: 'The <i>Bhugaon</i> Advantage.',
        secondImageBlock: `
                            <div style="margin-top: 2rem; border-radius: 12px; overflow: hidden;">
                                <img src="/images/misty-greens.webp" alt="Misty Greens Plots Aerial View Bhugaon Pune" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;">
                            </div>
`
    },
    {
        file: 'amenities-the-cliff-club.html',
        target: '</section>',
        imageBlock: null, // Will handle separately
        heroImage: { from: "cliff-club.webp", to: "/images/cliff-club-pool-night.webp" }
    }
];

const basePath = '/Users/vikasyewle/paranjapeplots';
let updated = 0;

injections.forEach(inj => {
    const filePath = path.join(basePath, inj.file);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ Skipping ${inj.file} - file not found`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Hero image swap
    if (inj.heroImage) {
        if (content.includes(inj.heroImage.from)) {
            content = content.replace(inj.heroImage.from, inj.heroImage.to);
            console.log(`  🖼 Swapped hero image in ${inj.file}`);
            changed = true;
        }
    }

    // Primary image injection (insert AFTER the target string)
    if (inj.imageBlock && inj.target) {
        const targetIdx = content.indexOf(inj.target);
        if (targetIdx !== -1 && !content.includes(inj.imageBlock.trim().substring(0, 80))) {
            const insertPos = content.indexOf('>', targetIdx + inj.target.length - 1) + 1;
            // Find end of the h2 tag line
            const lineEnd = content.indexOf('\n', targetIdx);
            content = content.substring(0, lineEnd + 1) + inj.imageBlock + content.substring(lineEnd + 1);
            console.log(`  📸 Injected primary image block in ${inj.file}`);
            changed = true;
        }
    }

    // Secondary image injection
    if (inj.secondTarget && inj.secondImageBlock) {
        const secondIdx = content.indexOf(inj.secondTarget);
        if (secondIdx !== -1 && !content.includes(inj.secondImageBlock.trim().substring(0, 80))) {
            // Find the closing </p> after the description text following this heading
            const afterHeading = content.indexOf('</p>', secondIdx);
            if (afterHeading !== -1) {
                const insertPoint = afterHeading + 4;
                content = content.substring(0, insertPoint) + inj.secondImageBlock + content.substring(insertPoint);
                console.log(`  📸 Injected secondary image block in ${inj.file}`);
                changed = true;
            }
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        updated++;
        console.log(`✅ Updated ${inj.file}`);
    }
});

// Also update gen-cluster-pages.js to inject images into generated cluster pages
const genClusterPath = path.join(basePath, 'scripts/gen-cluster-pages.js');
if (fs.existsSync(genClusterPath)) {
    let genContent = fs.readFileSync(genClusterPath, 'utf8');
    
    // Check if hero images are already using webp versions
    if (genContent.includes("plots.webp') ||") || genContent.includes("plots.webp');")) {
        console.log('📌 gen-cluster-pages.js already uses webp hero images');
    }
}

console.log(`\n🎯 Total files updated with images: ${updated}`);
