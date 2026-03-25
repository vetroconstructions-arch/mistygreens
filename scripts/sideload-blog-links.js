#!/usr/bin/env node
/**
 * SEO Phase 9: Blog Link Sideloader
 * Updates internal links in blog posts to use keyword-rich anchor text for micro-project domination.
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/vikasyewle/paranjapeplots';
const blogsDir = path.join(BASE_DIR, 'blogs');

const linkUpdates = [
    { old: 'Misty Greens', new: 'Misty Greens NA Plots Bhugaon' },
    { old: 'The Canopy', new: 'The Canopy Luxury NA Plots Forest Trails' },
    { old: 'Verandah', new: 'Verandah Luxury Apartments Forest Trails' },
    { old: 'The Rivolo', new: 'The Rivolo Independent Forest Villas' },
    { old: 'Paranjape Forest Trails', new: 'Paranjape Forest Trails Township Bhugaon' },
    { old: 'NA Bungalow Plots', new: 'NA Bungalow Plots Pune West' },
    { old: 'NA Plots', new: 'NA Bungalow Plots' }
];

function getAllBlogHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllBlogHtmlFiles(filePath));
        } else if (file === 'index.html') {
            results.push(filePath);
        }
    });
    return results;
}

const blogFiles = getAllBlogHtmlFiles(blogsDir);
let updatedCount = 0;

blogFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    linkUpdates.forEach(u => {
        // Match <a> tags containing the old text precisely
        // This avoids breaking larger strings
        const linkRegex = new RegExp(`(<a[^>]+>)${u.old}(<\/a>)`, 'g');
        content = content.replace(linkRegex, `$1${u.new}$2`);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`\n🎯 Successfully sideloaded keyword-rich links into ${updatedCount} blog posts.`);
