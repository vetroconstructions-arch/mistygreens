#!/usr/bin/env node
/**
 * SEO Phase 4: Article Schema Injector
 * Upgrades existing basic Blog Schema to full Article Schema for Google Discover
 */
const fs = require('fs');
const path = require('path');

const BLOGS_DIR = '/Users/vikasyewle/paranjapeplots/blogs';
const SITE = 'https://paranjape-mistygreens.in';

const blogs = [
    'na-bungalow-plots-pune-west-guide',
    'misty-greens-na-plots-review',
    'kaleidoscope-na-bungalow-plots',
    'kothrud-vs-bhugaon-na-bungalow-plots',
    'forest-trails-na-bungalow-plots-advantage',
    'bavdhan-na-bungalow-plots-investment'
];

let count = 0;

blogs.forEach(blogDir => {
    const filePath = path.join(BLOGS_DIR, blogDir, 'index.html');
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Skipping ${blogDir} (Not Found)`);
        return;
    }

    let html = fs.readFileSync(filePath, 'utf8');

    // Extract Title + Image + Desc for dynamic schema
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)">/);
    let imgMatch = html.match(/<meta property="og:image" content="([^"]+)">/);
    
    // Fallback image if og:image is relative
    let imgUrl = `${SITE}/images/hero-township.jpg`;
    if (imgMatch) {
         imgUrl = imgMatch[1].replace('../../', `${SITE}/`);
    }

    const title = titleMatch ? titleMatch[1] : 'Forest Trails Real Estate Insights';
    const desc = descMatch ? descMatch[1] : 'Paranjape Schemes official blog offering insights into West Pune real estate, NA Bungalow Plots, and luxury villas.';

    // Check if Article block already exists
    if (!html.includes('"@type": "Article"')) {
        const articleSchema = `
    <!-- Top Stories / Google Discover Article Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${title.replace(/"/g, '\\"')}",
      "image": [
        "${imgUrl}"
      ],
      "datePublished": "2026-03-16T08:00:00+08:00",
      "dateModified": "${new Date().toISOString()}",
      "author": [{
          "@type": "Organization",
          "name": "Paranjape Schemes (Construction) Ltd",
          "url": "https://pscl.in"
      }],
      "publisher": {
        "@type": "Organization",
        "name": "Paranjape Forest Trails",
        "logo": {
          "@type": "ImageObject",
          "url": "${SITE}/images/logo.png"
        }
      },
      "description": "${desc.replace(/"/g, '\\"')}"
    }
    </script>`;
        
        // Remove old basic schema if any, append new robust one
        html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)"@type": "Article"([\s\S]*?)<\/script>/, '');
        html = html.replace('</head>', articleSchema + '\n</head>');
        
        fs.writeFileSync(filePath, html, 'utf8');
        count++;
        console.log(`✅  Injected Article Schema into: ${blogDir}`);
    } else {
        console.log(`ℹ️   Article Schema already exists in: ${blogDir}`);
    }
});

console.log(`\n🎯 Article Schema added to ${count} blogs.`);
