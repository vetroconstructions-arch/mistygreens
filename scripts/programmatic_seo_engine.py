import os
import re
import json

BASE_DIR = '/Users/vikasyewle/paranjapeplots'

LOCATIONS = [
    {'name': 'Bhugaon', 'slug': 'bhugaon', 'dist': '0 mins', 'desc': 'the heart of Pune West nature corridor'},
    {'name': 'Bavdhan', 'slug': 'bavdhan', 'dist': '5 mins', 'desc': 'Pune West prime residential hub'},
    {'name': 'Kothrud', 'slug': 'kothrud', 'dist': '10 mins', 'desc': 'Pune cultural & educational capital'},
    {'name': 'Paud Road', 'slug': 'paud-road', 'dist': '0 mins', 'desc': 'the arterial West Pune highway'},
    {'name': 'Chandani Chowk', 'slug': 'chandani-chowk', 'dist': '7 mins', 'desc': 'the multi-tier expressway interchange'},
    {'name': 'Mulshi', 'slug': 'mulshi', 'dist': '15 mins', 'desc': 'the Sahyadri eco-tourism belt'},
    {'name': 'Pirangut', 'slug': 'pirangut', 'dist': '8 mins', 'desc': 'the industrial & residential expansion corridor'},
    {'name': 'Pashan', 'slug': 'pashan', 'dist': '12 mins', 'desc': 'the upscale central West Pune suburb'},
    {'name': 'Sus', 'slug': 'sus', 'dist': '12 mins', 'desc': 'the emerging IT lifestyle corridor'},
    {'name': 'Baner', 'slug': 'baner', 'dist': '15 mins', 'desc': 'Pune high-street & premium residential district'},
    {'name': 'Balewadi', 'slug': 'balewadi', 'dist': '16 mins', 'desc': 'the international sports & dining hub'},
    {'name': 'Aundh', 'slug': 'aundh', 'dist': '18 mins', 'desc': 'the established luxury suburb of Pune'},
    {'name': 'Wakad', 'slug': 'wakad', 'dist': '18 mins', 'desc': 'the bustling Hinjewadi gateway'},
    {'name': 'Hinjewadi IT Park', 'slug': 'hinjewadi-it-park', 'dist': '20 mins', 'desc': 'Pune largest Silicon IT hub with 400,000+ tech professionals'},
    {'name': 'Karve Nagar', 'slug': 'karve-nagar', 'dist': '12 mins', 'desc': 'central Pune family residential neighborhood'},
    {'name': 'Erandwane', 'slug': 'erandwane', 'dist': '15 mins', 'desc': 'premier old Pune heritage & medical district'},
    {'name': 'Shivaji Nagar', 'slug': 'shivaji-nagar', 'dist': '20 mins', 'desc': 'Pune civic, judicial, and business center'},
    {'name': 'Warje', 'slug': 'warje', 'dist': '10 mins', 'desc': 'the Mumbai-Bangalore highway junction'},
    {'name': 'Pune West', 'slug': 'pune-west', 'dist': '0 mins', 'desc': 'the greenest and fastest-appreciating quadrant of Pune'}
]

TYPOLOGIES = [
    {
        'type': 'NA Bungalow Plots',
        'slug_prefix': 'na-bungalow-plots-near',
        'price': '₹1.23 Cr*',
        'sizes': '1,930 – 3,500+ sq. ft.',
        'hero_desc': 'RERA approved 100% clear title NA bungalow plots in a 190-acre gated eco-township.'
    },
    {
        'type': 'Luxury Forest Villas',
        'slug_prefix': 'luxury-forest-villas-near',
        'price': '₹3.45 Cr*',
        'sizes': '3,200 – 5,500 sq. ft.',
        'hero_desc': '4 & 5 BHK bespoke forest villas with private gardens and equestrian academy access.'
    },
    {
        'type': 'Gated Community Township Plots',
        'slug_prefix': 'gated-township-plots-near',
        'price': '₹1.23 Cr*',
        'sizes': '2,000 – 4,000 sq. ft.',
        'hero_desc': 'Fully developed gated community plots with 40-ft paved roads and 30,000 indigenous trees.'
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>{typology} near {location_name} | Paranjape Forest Trails Pune</title>
  <meta name="description" content="Explore {typology} near {location_name}, just {dist} from {location_name}. Featuring 190-acre master township, PMRDA clear title, starting {price}.">
  <meta name="keywords" content="{typology} {location_name}, Paranjape Forest Trails {location_name}, Plots near {location_name}, Luxury Villas {location_name}, Paranjape Schemes">
  <link rel="canonical" href="https://www.paranjapetownship.com/{slug}/">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="stylesheet" href="/style.min.css">

  <!-- OpenGraph & Twitter -->
  <meta property="og:title" content="{typology} near {location_name} | Paranjape Forest Trails">
  <meta property="og:description" content="Explore {typology} near {location_name}, just {dist} away. 190-acre gated eco-township by Paranjape Schemes. Starting {price}.">
  <meta property="og:url" content="https://www.paranjapetownship.com/{slug}/">
  <meta property="og:image" content="https://www.paranjapetownship.com/images/hero-township.webp">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "{typology} near {location_name} - Paranjape Forest Trails",
    "url": "https://www.paranjapetownship.com/{slug}/",
    "description": "{hero_desc} Located just {dist} from {location_name} ({location_desc}).",
    "offers": {{
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "{clean_price}",
      "highPrice": "55000000",
      "offerCount": "45"
    }},
    "contentLocation": {{
      "@type": "Place",
      "name": "Paranjape Forest Trails, Bhugaon, Pune West",
      "geo": {{
        "@type": "GeoCoordinates",
        "latitude": "18.5099377",
        "longitude": "73.738964"
      }}
    }}
  }}
  </script>
</head>
<body style="background: #0B1120; color: #F8FAFC; font-family: 'Inter', sans-serif; margin: 0;">

  <!-- Header Navigation -->
  <header class="header-main" style="position: fixed; top: 0; left: 0; right: 0; z-index: 10002; background: rgba(11, 17, 32, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding: 15px 0;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
      <a href="/" style="text-decoration: none;">
        <img src="/assets/branding/logo.svg" alt="Paranjape Forest Trails Logo" width="180" height="60" class="header-logo" style="height: 42px; width: auto;">
      </a>
      <a href="tel:+917744009295" style="background: linear-gradient(135deg, #D4AF37, #AA7C11); color: #000; padding: 8px 18px; border-radius: 6px; font-weight: 700; text-decoration: none; font-size: 14px;">Call Sales Advisory</a>
    </div>
  </header>

  <!-- Hero Section -->
  <main style="padding-top: 140px;">
    <section style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">
      <span style="color: #D4AF37; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">{location_name} Proximity Gateway ({dist})</span>
      <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin: 15px 0 25px; line-height: 1.2; background: linear-gradient(135deg, #FFFFFF 40%, #D4AF37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{typology} near {location_name}</h1>
      <p style="font-size: 18px; color: #94A3B8; line-height: 1.8; margin-bottom: 40px;">
        Discover premier {typology} at Paranjape Forest Trails, situated just {dist} from {location_name} ({location_desc}). Experience pure Sahyadri nature living with 30,000+ trees, equestrian riding facilities, and 100% clear PMRDA sanctioned titles.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;">
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">{price}</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">Starting Investment*</div>
        </div>
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">{sizes}</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">Configuration Footprint</div>
        </div>
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">{dist}</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">Distance to {location_name}</div>
        </div>
        <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="color: #D4AF37; font-size: 24px; font-weight: 800;">PMRDA Approved</div>
          <div style="color: #64748B; font-size: 14px; margin-top: 4px;">100% Clear Title</div>
        </div>
      </div>

      <div style="background: rgba(30, 41, 59, 0.6); padding: 30px; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2); margin-bottom: 40px;">
        <h2 style="color: #D4AF37; font-size: 22px; margin-bottom: 15px;">Key Township Highlights for {location_name} Residents:</h2>
        <ul style="color: #CBD5E1; line-height: 2; padding-left: 20px;">
          <li>Signal-free commute via modernized Chandani Chowk and Paud Road corridor.</li>
          <li>Upcoming PMRDA Ring Road interchange at Bhugaon unlocking rapid appreciation.</li>
          <li>The Cliff Lifestyle Club with Olympic swimming pool, tennis courts, and equestrian academy.</li>
          <li>Sri Sri Ravishankar Vidya Mandir (SSRVM) ICSE school campus located within the township.</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 50px 0;">
        <a href="https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20{typology}%20near%20{location_name}." target="_blank" rel="noopener" style="display: inline-block; background: #25D366; color: #FFFFFF; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 16px; margin-right: 15px;">Chat on WhatsApp</a>
        <a href="tel:+917744009295" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #AA7C11); color: #000000; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 16px;">Schedule Site Visit</a>
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

def generate_programmatic_hubs():
    created = 0
    for typo in TYPOLOGIES:
        for loc in LOCATIONS:
            slug = f"{typo['slug_prefix']}-{loc['slug']}"
            folder = os.path.join(BASE_DIR, slug)
            os.makedirs(folder, exist_ok=True)
            fp = os.path.join(folder, 'index.html')
            
            clean_price = "12300000" if "1.23" in typo['price'] else "34500000"

            content = HTML_TEMPLATE.format(
                typology=typo['type'],
                location_name=loc['name'],
                location_desc=loc['desc'],
                dist=loc['dist'],
                price=typo['price'],
                clean_price=clean_price,
                sizes=typo['sizes'],
                hero_desc=typo['hero_desc'],
                slug=slug
            )

            with open(fp, 'w', encoding='utf-8') as f:
                f.write(content)
            created += 1

    print(f"DONE. Generated {created} Programmatic SEO Hubs across {len(LOCATIONS)} locations.")

if __name__ == '__main__':
    generate_programmatic_hubs()
