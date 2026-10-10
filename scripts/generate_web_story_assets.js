const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(BASE_DIR, 'images', 'web-stories');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const stories = [
  {
    slug: 'misty-greens-plots-bhugaon',
    poster: 'images/misty-greens.webp',
    slides: [
      'images/misty-greens-gate-day.webp',
      'images/plots.webp',
      'images/drone-aerial.webp',
      'images/the-cliff-club.webp',
      'images/misty-greens-layout.webp',
      'images/misty-greens.webp'
    ]
  },
  {
    slug: 'luxury-forest-villas-rivolo',
    poster: 'images/rivolo-luxury.webp',
    slides: [
      'images/rivolo-luxury.webp',
      'images/villas-exterior.webp',
      'images/villas-courtyard.webp',
      'images/villas-pool-night.webp',
      'images/rivolo-floor-plan.webp',
      'images/township-aerial.webp'
    ]
  },
  {
    slug: 'the-canopy-nature-apartments',
    poster: 'images/canopy-realistic.webp',
    slides: [
      'images/canopy-realistic.webp',
      'images/canopy-card.webp',
      'images/canopy-layout.webp',
      'images/landscape.webp',
      'images/the-cliff-club.webp',
      'images/canopy-realistic.webp'
    ]
  },
  {
    slug: 'the-cove-twin-bungalows',
    poster: 'images/cove.webp',
    slides: [
      'images/cove.webp',
      'images/cove-card.webp',
      'images/cove-duet.webp',
      'images/cove-layout.webp',
      'images/the-cliff-club.webp',
      'images/cove-exterior.webp'
    ]
  },
  {
    slug: 'forest-trails-190-acre-lifestyle',
    poster: 'images/hero-township.webp',
    slides: [
      'images/hero-township.webp',
      'images/the-cliff-club.webp',
      'images/equestrian.webp',
      'images/ssrvm-school.webp',
      'images/shopping-plaza.webp',
      'images/drone-aerial.webp'
    ]
  },
  {
    slug: 'pmrda-ring-road-bhugaon-connectivity',
    poster: 'images/drone-aerial.webp',
    slides: [
      'images/drone-aerial.webp',
      'images/township-aerial.webp',
      'images/master-plan.webp',
      'images/hero-township.webp',
      'images/landscape.webp',
      'images/drone-aerial.webp'
    ]
  },
  {
    slug: 'athashri-senior-living-bhugaon',
    poster: 'images/athashri.webp',
    slides: [
      'images/athashri.webp',
      'images/athashri-card.webp',
      'images/athashri-community.webp',
      'images/athashri-senior-living.webp',
      'images/athashri-realistic.webp',
      'images/athashri.webp'
    ]
  },
  {
    slug: 'highgardens-panoramic-apartments',
    poster: 'images/highgardens-realistic.webp',
    slides: [
      'images/highgardens-realistic.webp',
      'images/highgardens-card.webp',
      'images/highgardens-layout.webp',
      'images/verandah-pool-lifestyle.webp',
      'images/misty-greens-gate-day.webp',
      'images/highgardens-realistic.webp'
    ]
  }
];

async function generateAssets() {
  console.log('Generating Web Story assets...');

  // 1. Publisher Logo (192x192 PNG)
  const logoSrc = path.join(BASE_DIR, 'favicon.png');
  const logoDest = path.join(OUT_DIR, 'publisher-logo-192x192.png');
  await sharp(logoSrc)
    .resize(192, 192, { fit: 'contain', background: { r: 74, g: 8, b: 8, alpha: 1 } })
    .png({ quality: 90 })
    .toFile(logoDest);
  console.log(`Generated: ${logoDest}`);

  // 2. Generate Story Posters & Slides
  for (const story of stories) {
    const posterSrc = path.join(BASE_DIR, story.poster);

    // Portrait (720x960 - 3:4)
    const portraitDest = path.join(OUT_DIR, `${story.slug}-portrait.webp`);
    await sharp(posterSrc)
      .resize(720, 960, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(portraitDest);

    // Square (720x720 - 1:1)
    const squareDest = path.join(OUT_DIR, `${story.slug}-square.webp`);
    await sharp(posterSrc)
      .resize(720, 720, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(squareDest);

    // Landscape (960x720 - 4:3)
    const landscapeDest = path.join(OUT_DIR, `${story.slug}-landscape.webp`);
    await sharp(posterSrc)
      .resize(960, 720, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(landscapeDest);

    console.log(`Generated posters for: ${story.slug}`);

    // Slides (720x1280 - 9:16)
    for (let i = 0; i < story.slides.length; i++) {
      const slideSrc = path.join(BASE_DIR, story.slides[i]);
      const slideDest = path.join(OUT_DIR, `${story.slug}-slide-${i + 1}.webp`);
      await sharp(slideSrc)
        .resize(720, 1280, { fit: 'cover', position: 'center' })
        .webp({ quality: 82 })
        .toFile(slideDest);
    }
    console.log(`Generated ${story.slides.length} slides for: ${story.slug}`);
  }

  console.log('All Web Story assets successfully generated!');
}

generateAssets().catch(err => {
  console.error('Asset generation error:', err);
  process.exit(1);
});
