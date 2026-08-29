import os
import re

BASE_DIR = '/Users/vikasyewle/paranjapeplots'

CONFIGURATION_HUBS = [
    # 1 BHK Clusters
    {
        'slug': '1-bhk-flats-near-kothrud',
        'title': '1 BHK Flats near Kothrud | Athashri & Canopy at Forest Trails Bhugaon',
        'meta_desc': 'Looking for 1 BHK flats near Kothrud? Explore Paranjape Forest Trails in Bhugaon, just 10 mins from Nal Stop. Ideal for young professionals & senior living. Starting ₹58 Lakhs*.',
        'h1': '1 BHK Nature Apartments & Senior Living near Kothrud',
        'category': '1 BHK Apartments & Senior Living',
        'price': '₹58 Lakhs* – ₹68 Lakhs*',
        'carpet': '580 to 650 sq. ft. Carpet Area',
        'dist': '10 mins to Kothrud',
        'summary': 'Experience serene nature living just 10 minutes from Kothrud with 24/7 security, lush green surroundings, and full township amenities.'
    },
    {
        'slug': '1-bhk-flats-near-bavdhan',
        'title': '1 BHK Flats near Bavdhan | Paranjape Forest Trails Pune',
        'meta_desc': 'Discover 1 BHK flats near Bavdhan at Paranjape Forest Trails. Just 5 mins away via Paud Road. Scenic Sahyadri hill views, gym, club & school. Starting ₹58 Lakhs*.',
        'h1': '1 BHK Forest View Flats near Bavdhan',
        'category': '1 BHK Nature Flats',
        'price': '₹58 Lakhs* – ₹68 Lakhs*',
        'carpet': '580 to 650 sq. ft. Carpet Area',
        'dist': '5 mins to Bavdhan',
        'summary': 'Enjoy the perfect blend of urban convenience and peaceful forest living, situated right next to Bavdhan and Chandani Chowk.'
    },
    {
        'slug': '1-bhk-flats-near-hinjewadi',
        'title': '1 BHK Flats near Hinjewadi IT Park | Forest Trails Bhugaon',
        'meta_desc': 'Affordable luxury 1 BHK nature apartments for IT professionals near Hinjewadi. 20 mins via upcoming PMRDA Ring Road. Starting ₹58 Lakhs*.',
        'h1': '1 BHK Nature Homes for Hinjewadi IT Professionals',
        'category': '1 BHK IT Commuter Homes',
        'price': '₹58 Lakhs* – ₹68 Lakhs*',
        'carpet': '580 to 650 sq. ft. Carpet Area',
        'dist': '20 mins to Hinjewadi IT Park',
        'summary': 'Escape the hustle of IT high-rises. Live in a 190-acre green township with 30,000 trees and an easy commute to Phase 1-3.'
    },

    # 2 BHK Clusters
    {
        'slug': '2-bhk-flats-near-kothrud',
        'title': '2 BHK Flats near Kothrud | The Canopy & Highlands Forest Trails',
        'meta_desc': 'Premium 2 BHK flats near Kothrud at Paranjape Forest Trails Bhugaon. Spacious layouts (850 - 1,050 sq.ft.), hill-facing balconies & Cliff Club. Starting ₹85 Lakhs*.',
        'h1': 'Spacious 2 BHK Forest View Flats near Kothrud',
        'category': '2 BHK Hilltop Residences',
        'price': '₹85 Lakhs* – ₹1.05 Cr*',
        'carpet': '850 to 1,050 sq. ft. Usable Area',
        'dist': '10 mins to Kothrud',
        'summary': 'Upgrade your family to pure oxygen-rich forest living with spacious 2 BHK homes, dedicated parking, and premier ICSE school on campus.'
    },
    {
        'slug': '2-bhk-flats-near-bavdhan',
        'title': '2 BHK Flats near Bavdhan | Paranjape Forest Trails Pune',
        'meta_desc': 'Buy 2 BHK flats near Bavdhan with modern lifestyle amenities at Forest Trails. 5 mins from Chandani Chowk flyover. Starting ₹85 Lakhs*.',
        'h1': '2 BHK Luxury Nature Flats near Bavdhan',
        'category': '2 BHK Nature Apartments',
        'price': '₹85 Lakhs* – ₹1.05 Cr*',
        'carpet': '850 to 1,050 sq. ft. Usable Area',
        'dist': '5 mins to Bavdhan',
        'summary': 'Just minutes from Bavdhan high-street retail, restaurants, and schools, while nestled in an untouched 190-acre nature reserve.'
    },
    {
        'slug': '2-bhk-flats-near-baner',
        'title': '2 BHK Flats near Baner & Balewadi | Paranjape Forest Trails',
        'meta_desc': 'Discover 2 BHK apartments near Baner at Forest Trails. Enjoy resort amenities, Olympic pool, and equestrian academy at half the price of Baner high-rises.',
        'h1': '2 BHK Nature Apartments near Baner & Balewadi',
        'category': '2 BHK Value & Lifestyle',
        'price': '₹85 Lakhs* – ₹1.05 Cr*',
        'carpet': '850 to 1,050 sq. ft. Usable Area',
        'dist': '15 mins to Baner',
        'summary': 'Get 2x the space, zero pollution, and unmatched resort amenities compared to crowded Baner micro-markets.'
    },

    # 3 BHK Clusters
    {
        'slug': '3-bhk-flats-near-kothrud',
        'title': '3 BHK Luxury Flats near Kothrud | Verandah at Forest Trails Bhugaon',
        'meta_desc': 'Ultra-luxury 3 BHK apartments near Kothrud at Verandah, Forest Trails. Large sundecks, double-height lobbies & panoramic mountain views. Starting ₹1.42 Cr*.',
        'h1': '3 BHK Luxury Hilltop Residences near Kothrud',
        'category': '3 BHK Luxury Living',
        'price': '₹1.42 Cr* – ₹1.85 Cr*',
        'carpet': '1,300 to 1,650 sq. ft. Carpet Area',
        'dist': '10 mins to Kothrud',
        'summary': 'Expansive 3 BHK residences featuring floor-to-ceiling glass windows, wide wraparound balconies, and breathtaking sunrise views.'
    },
    {
        'slug': '3-bhk-flats-near-bavdhan',
        'title': '3 BHK Flats near Bavdhan | Verandah & Highgardens Forest Trails',
        'meta_desc': 'Explore premium 3 BHK flats near Bavdhan at Paranjape Forest Trails. Gated township, Olympic pool, SSRVM school & 30,000 trees. Starting ₹1.42 Cr*.',
        'h1': '3 BHK Hill-Facing Nature Flats near Bavdhan',
        'category': '3 BHK Premium Residences',
        'price': '₹1.42 Cr* – ₹1.85 Cr*',
        'carpet': '1,300 to 1,650 sq. ft. Carpet Area',
        'dist': '5 mins to Bavdhan',
        'summary': 'A sanctuary for growing families seeking tranquility, spacious bedrooms, and world-class athletic facilities.'
    },

    # 4 BHK & Duplex Clusters
    {
        'slug': '4-bhk-luxury-apartments-pune-west',
        'title': '4 BHK Luxury Sky Residences & Duplexes Pune West | Forest Trails',
        'meta_desc': 'Exclusive 4 BHK sky residences and duplex apartments at Forest Trails Bhugaon. Private foyer, expansive terraces, and 360° forest views. Starting ₹2.10 Cr*.',
        'h1': '4 BHK Sky Residences & Duplex Homes in Pune West',
        'category': '4 BHK Sky Residences',
        'price': '₹2.10 Cr* – ₹2.85 Cr*',
        'carpet': '1,950 to 2,600 sq. ft. Carpet Area',
        'dist': '7 mins to Chandani Chowk',
        'summary': 'Designed for connoisseurs of luxury, featuring private family lounges, maid suites, and sweeping mountain panoramas.'
    },

    # Independent Bungalows & Townhouses
    {
        'slug': 'independent-bungalows-near-kothrud',
        'title': 'Independent Bungalows near Kothrud | The Cove at Forest Trails Bhugaon',
        'meta_desc': 'Buy independent bungalows near Kothrud at The Cove, Forest Trails. Private gardens, covered car porches & Ground + 1 + Terrace architecture. Starting ₹2.75 Cr*.',
        'h1': 'Exclusive Independent Bungalows near Kothrud',
        'category': 'Independent Gated Bungalows',
        'price': '₹2.75 Cr* – ₹4.25 Cr*',
        'carpet': '2,400 to 3,800 sq. ft. Built-up Area',
        'dist': '10 mins to Kothrud',
        'summary': 'Own your land and sky with private front/back lawns, multi-car parking, and the peace of mind of a fully gated master township.'
    },
    {
        'slug': 'independent-bungalows-near-bavdhan',
        'title': 'Independent Bungalows near Bavdhan | Paranjape Forest Trails',
        'meta_desc': 'Luxury independent bungalows near Bavdhan with private yards and rooftop terraces. 5 mins from Paud Road. Starting ₹2.75 Cr*.',
        'h1': 'Independent Bungalows & Estates near Bavdhan',
        'category': 'Independent Bungalows',
        'price': '₹2.75 Cr* – ₹4.25 Cr*',
        'carpet': '2,400 to 3,800 sq. ft. Built-up Area',
        'dist': '5 mins to Bavdhan',
        'summary': 'The gold standard of private luxury living in West Pune with bespoke architecture and 100% clear PMRDA titles.'
    },
    {
        'slug': 'luxury-townhouses-pune-west',
        'title': 'Luxury Townhouses in Pune West | The Cove at Forest Trails Bhugaon',
        'meta_desc': 'Contemporary luxury townhouses in Pune West at Forest Trails. Private rooftop gardens, multi-level living, and clubhouse access. Starting ₹2.75 Cr*.',
        'h1': 'Contemporary Luxury Townhouses in Pune West',
        'category': 'Luxury Townhouses',
        'price': '₹2.75 Cr* – ₹3.80 Cr*',
        'carpet': '2,400 to 3,200 sq. ft. Built-up Area',
        'dist': '7 mins to Chandani Chowk',
        'summary': 'Urban elegance meets nature serenity. Multi-tier luxury townhouses with private sun decks and manicured green courtyards.'
    },

    # Twin Bungalows Clusters
    {
        'slug': 'twin-bungalows-near-kothrud',
        'title': 'Twin Bungalows near Kothrud | Semi-Detached Villas Forest Trails',
        'meta_desc': 'Explore Twin Bungalows near Kothrud at Paranjape Forest Trails Bhugaon. Semi-detached nature duets with private lawns. Starting ₹2.75 Cr*.',
        'h1': 'Twin Bungalows & Semi-Detached Duets near Kothrud',
        'category': 'Twin Bungalows & Duets',
        'price': '₹2.75 Cr* – ₹3.60 Cr*',
        'carpet': '2,400 to 3,200 sq. ft. Built-up Area',
        'dist': '10 mins to Kothrud',
        'summary': 'Semi-detached privacy with 3-sided garden setbacks, private driveways, and expansive family entertainment terraces.'
    },
    {
        'slug': 'twin-bungalows-near-bavdhan',
        'title': 'Twin Bungalows near Bavdhan | The Cove Forest Trails Pune',
        'meta_desc': 'Buy premium Twin Bungalows near Bavdhan. Gated 190-acre township, equestrian academy, SSRVM school & Olympic pool. Starting ₹2.75 Cr*.',
        'h1': 'Twin Bungalows & Luxury Duets near Bavdhan',
        'category': 'Twin Bungalows',
        'price': '₹2.75 Cr* – ₹3.60 Cr*',
        'carpet': '2,400 to 3,200 sq. ft. Built-up Area',
        'dist': '5 mins to Bavdhan',
        'summary': 'The perfect balance of private villa living and gated community camaraderie, located just 5 minutes from Bavdhan.'
    },

    # PMRDA NA Plots Clusters
    {
        'slug': 'misty-greens-na-plots-price-list',
        'title': 'Misty Greens NA Plots Price List & Availability 2026 | Forest Trails',
        'meta_desc': 'Official 2026 price list for Misty Greens NA Bungalow Plots at Paranjape Forest Trails Bhugaon. 1,930 – 3,500+ sq.ft. clear title plots starting ₹1.23 Cr*.',
        'h1': 'Misty Greens NA Plots: 2026 Price List & Master Layout',
        'category': 'NA Bungalow Plots',
        'price': '₹1.23 Cr* – ₹2.50 Cr*',
        'carpet': '1,930 to 3,500+ sq. ft. Plot Footprint',
        'dist': 'Paud Road, Bhugaon (0 km)',
        'summary': 'Direct developer pricing for 100% sanctioned clear title PMRDA bungalow plots with underground utilities, 40-ft roads, and bank loan approvals.'
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>{title}</title>
  <meta name="description" content="{meta_desc}">
  <meta name="keywords" content="Paranjape Forest Trails, {h1}, {category}, Bhugaon, Kothrud, Bavdhan, Paranjape Schemes">
  <link rel="canonical" href="https://www.paranjapetownship.com/{slug}/">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="stylesheet" href="/style.min.css">

  <!-- OpenGraph & Twitter -->
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{meta_desc}">
  <meta property="og:url" content="https://www.paranjapetownship.com/{slug}/">
  <meta property="og:image" content="https://www.paranjapetownship.com/images/hero-township.webp">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "{h1}",
    "description": "{meta_desc}",
    "url": "https://www.paranjapetownship.com/{slug}/",
    "image": "https://www.paranjapetownship.com/images/hero-township.webp",
    "offers": {{
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "5800000",
      "highPrice": "55000000",
      "offerCount": "40"
    }},
    "address": {{
      "@type": "PostalAddress",
      "streetAddress": "Paud Road, Bhugaon",
      "addressLocality": "Bhugaon, Pune West",
      "addressRegion": "Maharashtra",
      "postalCode": "412115",
      "addressCountry": "IN"
    }},
    "geo": {{
      "@type": "GeoCoordinates",
      "latitude": "18.5099377",
      "longitude": "73.738964"
    }}
  }}
  </script>
</head>
<body style="background: #0B1120; color: #F8FAFC; font-family: 'Inter', sans-serif; margin: 0;">

  <!-- Canonical Signature Maroon Header & Dual Brand Logo -->
  <header id="main-site-header" style="position: sticky; top: 0; width: 100%; z-index: 10000; background: linear-gradient(90deg, #4A0808 0%, #6B0D0D 50%, #4A0808 100%); border-bottom: 1.5px solid #D4AF37; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.7);">
    <div style="max-width: 1440px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0.55rem 1.25rem; gap: 0.8rem;">
      <a href="/" class="nav-brand-pill" style="background: #ffffff; padding: 4px 14px; border-radius: 50px; display: inline-flex; align-items: center; gap: 10px; height: 38px; text-decoration: none; border: 1.5px solid #D4AF37; box-shadow: 0 2px 10px rgba(0,0,0,0.3); flex-shrink: 0;" aria-label="Paranjape Schemes & Forest Trails Township Home">
        <img src="/assets/branding/paranjape-corporate-logo.jpg" alt="Paranjape Schemes Corporate Logo" style="height: 22px; width: auto; object-fit: contain; display: block;" loading="eager" />
        <span style="width: 1.5px; height: 20px; background: #D4AF37; display: inline-block;"></span>
        <img src="/assets/branding/forest-trails-emblem.png" alt="Forest Trails Township Emblem" style="height: 24px; width: auto; object-fit: contain; display: block;" loading="eager" />
      </a>
      <nav class="desktop-nav-capsule" style="background: rgba(0, 0, 0, 0.32); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 50px; padding: 0.45rem 1.6rem; display: flex; align-items: center; gap: 1.6rem; backdrop-filter: blur(12px);">
        <a href="/#township-clusters" style="color: #ffffff; text-decoration: none; font-size: 0.76rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">TOWNSHIP</a>
        <a href="/paranjape-forest-trails-township-bhugaon-villas-plots.html" style="color: #ffffff; text-decoration: none; font-size: 0.76rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">VILLAS & PLOTS</a>
        <a href="/paranjape-forest-trails-township-bhugaon-apartments/" style="color: #ffffff; text-decoration: none; font-size: 0.76rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">APARTMENTS</a>
        <a href="/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/" style="color: #ffffff; text-decoration: none; font-size: 0.76rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">CLIFF CLUB</a>
        <a href="/paranjape-forest-trails-township-bhugaon-amenities/sri-sri-ravishankar-school/" style="color: #ffffff; text-decoration: none; font-size: 0.76rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">SCHOOL</a>
      </nav>
      <div class="nav-right-actions" style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
        <a href="https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Paranjape%20Forest%20Trails%20Bhugaon%20Township." target="_blank" rel="noopener" style="background: #25D366; color: #ffffff; text-decoration: none; padding: 0.48rem 0.9rem; border-radius: 50px; font-weight: 800; font-size: 0.72rem; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 5px;">
          💬 WHATSAPP
        </a>
        <a href="/#township-clusters" style="background: rgba(0, 0, 0, 0.35); color: #ffffff; border: 1px solid rgba(212, 175, 55, 0.45); padding: 0.48rem 0.9rem; border-radius: 50px; font-weight: 800; font-size: 0.72rem; letter-spacing: 0.06em; text-decoration: none;">SEARCH</a>
        <button style="background: linear-gradient(135deg, #4A0808, #6B0D0D); color: #ffffff; border: 1.5px solid #D4AF37; padding: 0.48rem 1rem; border-radius: 50px; font-weight: 800; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;" onclick="window.openEnquiryModal && window.openEnquiryModal()">ENQUIRE</button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main style="padding-top: 140px;">
    <section style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">
      <span style="color: #D4AF37; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">{category}</span>
      <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin: 15px 0 20px; line-height: 1.2; background: linear-gradient(135deg, #FFFFFF 40%, #D4AF37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{h1}</h1>
      <p style="font-size: 18px; color: #94A3B8; line-height: 1.8; margin-bottom: 40px;">{summary}</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;">
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">{price}</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">Price Range*</div>
        </div>
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">{carpet}</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">Configuration Size</div>
        </div>
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">{dist}</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">Location Proximity</div>
        </div>
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">PMRDA / RERA</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">Sanctioned Project</div>
        </div>
      </div>

      <div style="background: rgba(30, 41, 59, 0.6); padding: 30px; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2); margin-bottom: 40px;">
        <h2 style="color: #D4AF37; font-size: 22px; margin-bottom: 15px;">Why Choose Paranjape Forest Trails?</h2>
        <ul style="color: #CBD5E1; line-height: 2; padding-left: 20px;">
          <li>190-Acre Master Eco-Township with 30,000+ Indigenous Trees.</li>
          <li>The Cliff Lifestyle Club: Olympic Swimming Pool, Tennis Courts & Gymnasium.</li>
          <li>Equestrian Riding Academy & Sri Sri Ravishankar Vidya Mandir (SSRVM) School.</li>
          <li>Just 5 mins from Bavdhan, 7 mins from Chandani Chowk, 10 mins from Kothrud.</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 50px 0;">
        <a href="https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20{h1}." target="_blank" rel="noopener" style="display: inline-block; background: #25D366; color: #FFFFFF; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 16px; margin-right: 15px;">Chat on WhatsApp</a>
        <a href="tel:+917744009295" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #AA7C11); color: #000000; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 16px;">Schedule Site Tour</a>
      </div>
    </section>
  </main>

  <!-- Mobile Quick Action Dock -->
  <div id="mobile-action-dock" class="mobile-action-dock" style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 10001; background: rgba(11, 17, 32, 0.96); backdrop-filter: blur(12px); border-top: 1px solid rgba(212, 175, 55, 0.3); display: flex; align-items: center; justify-content: space-around; padding: 10px 15px;">
    <a href="tel:+917744009295" style="color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 6px;">📞 Call</a>
    <a href="https://wa.me/917744009295" target="_blank" rel="noopener" style="color: #25D366; text-decoration: none; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 6px;">💬 WhatsApp</a>
    <a href="tel:+917744009295" style="background: linear-gradient(135deg, #D4AF37, #AA7C11); color: #000000; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 800; text-decoration: none;">Book Visit</a>
  </div>

</body>
</html>
"""

def generate_configuration_hubs():
    created = 0
    for hub in CONFIGURATION_HUBS:
        folder = os.path.join(BASE_DIR, hub['slug'])
        os.makedirs(folder, exist_ok=True)
        fp = os.path.join(folder, 'index.html')

        content = HTML_TEMPLATE.format(
            title=hub['title'],
            meta_desc=hub['meta_desc'],
            h1=hub['h1'],
            category=hub['category'],
            price=hub['price'],
            carpet=hub['carpet'],
            dist=hub['dist'],
            summary=hub['summary'],
            slug=hub['slug']
        )

        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        created += 1

    print(f"DONE. Generated {created} Multi-Cluster Configuration Hubs.")

if __name__ == '__main__':
    generate_configuration_hubs()
