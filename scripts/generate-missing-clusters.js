const fs = require('fs');
const path = require('path');

const CLUSTERS = [
    { name: 'aspire', h1: 'Aspire Forest Trails Bhugaon | 1 BHK Affordable Homes Pune', desc: 'Explore Aspire at Paranjape Forest Trails, offering the best 1 BHK affordable flats in Bhugaon Pune. Perfect investment property near Mulshi road.' },
    { name: 'happiness-hub', h1: 'Happiness Hub Forest Trails | Compact Homes Bhugaon', desc: 'Happiness Hub by Paranjape Schemes offers compact 1 BHK homes in Forest Trails Bhugaon. Best under 50 lakh investment in Pune West.' },
    { name: 'orchard-residences', h1: 'Orchard Residences Forest Trails | 2 & 3 BHK Flats Bhugaon', desc: 'Premium Orchard Residences at Paranjape Forest Trails. Luxury flats near Chandani Chowk and Bavdhan with forest views.' },
    { name: 'kaleidoscope', h1: 'Kaleidoscope Forest Trails | Premium Apartments Bhugaon', desc: 'Kaleidoscope offerings in Paranjape Forest Trails features premium 2 BHK & 3 BHK flats in Bhugaon. Best hill view homes in Pune.' }
];

const TEMPLATE_PATH = path.join(__dirname, '..', 'paranjape-forest-trails-township-bhugaon-misty-greens', 'index.html');
const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

CLUSTERS.forEach(c => {
    const dirName = `paranjape-forest-trails-township-bhugaon-${c.name}`;
    const dirPath = path.join(__dirname, '..', dirName);
    
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    
    let content = template;
    content = content.replace(/Misty Greens/g, c.name.charAt(0).toUpperCase() + c.name.slice(1).replace('-', ' '));
    content = content.replace(/<title>.*?<\/title>/, `<title>${c.h1} | Paranjape Forest Trails</title>`);
    content = content.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${c.desc}"`);
    content = content.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="https://www.paranjapetownship.com/${dirName}/"`);
    
    fs.writeFileSync(path.join(dirPath, 'index.html'), content);
    console.log(`✅ Created Cluster Node: ${dirName}`);
});
