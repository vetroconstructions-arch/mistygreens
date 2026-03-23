const fs = require('fs');
const glob = require('glob');

const files = glob.sync('**/*.html', { ignore: 'node_modules/**' });
let removedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /<div class="mobile-menu" id="mobile-menu">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
    
    // Actually, a safer way:
    // We know it starts with <div class="mobile-menu" id="mobile-menu">
    // and ends with the close of that div. But wait, we can just use a simple regex if we know the structure,
    // or parse it. Since we're dealing with regex, let's just find the start and find the matching end tag.
});
