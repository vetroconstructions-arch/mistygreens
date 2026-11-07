#!/usr/bin/env python3
"""
ENTERPRISE PROGRAMMATIC GOOGLE SEO EXPANSION ENGINE
==================================================
Targets high-intent organic search queries across all major Pune real estate
micro-markets for Paranjape Forest Trails (Bhugaon, Paud Road, Pune West).

Micro-Markets:
  - West Pune: Bavdhan, Kothrud, Paud Road, Chandani Chowk, Pashan, Baner, Balewadi, Aundh, Sus, Pirangut, Mulshi, Warje
  - IT Corridors: Hinjewadi, Wakad, Mahalunge, Punawale, Ravet
  - Central & High-Net-Worth: Shivaji Nagar, Karve Nagar, Erandwane
  - East/South Pune Retiring Tech Leads: Kharadi, Magarpatta

Typologies:
  - Villas: /villas-in-{location}/ (The Rivolo from ₹3.89 Cr*, The Cove from ₹2.85 Cr*)
  - Plots: /plots-in-{location}/ (Misty Greens from ₹1.23 Cr*)
  - Flats: /flats-in-{location}/ (The Canopy from ₹89 L*, Everglades from ₹48.50 L*)
  - Specialized Hubs: senior-living-pune, senior-citizen-homes-kothrud, retirement-homes-pune-west, gated-community-township-pune, duplex-in-bavdhan, duplex-in-kothrud
"""

import os
import json
import html

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
AGENT_RERA = "A031262401295"
PHONE = "+91 7744009295"
WHATSAPP_PHONE = "917744009295"

LOCATIONS = [
    {
        "id": "bavdhan",
        "name": "Bavdhan",
        "dist": "5 mins (3.8 km)",
        "route": "direct Paud Road 6-lane expressway via Chandani Chowk flyover",
        "avg_sqft": "₹9,800 – ₹13,500/sq.ft",
        "desc": "Pune West's most preferred residential hub, seamlessly connecting Kothrud and the Hinjewadi IT corridor.",
        "highlights": "Direct bypass to Hinjewadi, immediate proximity to Chandani Chowk, excellent educational institutions, and thriving dining avenues."
    },
    {
        "id": "kothrud",
        "name": "Kothrud",
        "dist": "10 mins (6.5 km)",
        "route": "Paud Road arterial corridor connecting directly to Forest Trails main gates",
        "avg_sqft": "₹14,500 – ₹21,000/sq.ft",
        "desc": "Pune's premier cultural, intellectual, and traditional family residential district with prime capital appreciation.",
        "highlights": "Established schools, metro connectivity at Vanaz & Ideal Colony, high density, making nearby 190-acre open green township living an irresistible upgrade."
    },
    {
        "id": "chandani-chowk",
        "name": "Chandani Chowk",
        "dist": "7 mins (4.5 km)",
        "route": "the newly inaugurated multi-tier arterial expressway interchange",
        "avg_sqft": "₹11,000 – ₹15,000/sq.ft",
        "desc": "The primary western gateway of Pune interconnecting Mumbai-Bangalore Highway (NH-48), Paud Road, and Mulshi.",
        "highlights": "Signal-free multi-level infrastructure slashing commute times to Bavdhan, Kothrud, and Bhugaon to single-digit minutes."
    },
    {
        "id": "paud-road",
        "name": "Paud Road",
        "dist": "0 mins (On Corridor)",
        "route": "direct Paud Road state highway with immediate township boulevard entry",
        "avg_sqft": "₹9,200 – ₹14,000/sq.ft",
        "desc": "The scenic, high-speed arterial corridor extending from Kothrud through Bhugaon towards Pirangut and Mulshi.",
        "highlights": "Direct PMRDA 6-lane road widening, upcoming metro integration, and clean Sahyadri green belt surroundings."
    },
    {
        "id": "hinjewadi",
        "name": "Hinjewadi",
        "dist": "20 mins (14 km)",
        "route": "Bavdhan-Sus-Hinjewadi bypass or direct Paud-Pirangut-Hinjewadi link",
        "avg_sqft": "₹7,800 – ₹11,200/sq.ft",
        "desc": "Pune's Silicon Valley housing over 400,000+ IT & software professionals across Phase 1, Phase 2, and Phase 3.",
        "highlights": "Avoid Hinjewadi traffic choke points by residing in an expansive 190-acre hilltop sanctuary just a 20-minute reverse commute away."
    },
    {
        "id": "baner",
        "name": "Baner",
        "dist": "15 mins (11 km)",
        "route": "NH-48 Western Highway from Chandani Chowk to Baner-Pashan link",
        "avg_sqft": "₹11,500 – ₹16,500/sq.ft",
        "desc": "Pune's premier high-street shopping, upscale dining, and vibrant tech residential district.",
        "highlights": "Crowded urban high-rises in Baner contrast sharply with the tranquil, tree-lined 190-acre gated enclaves of Forest Trails."
    },
    {
        "id": "balewadi",
        "name": "Balewadi",
        "dist": "16 mins (12 km)",
        "route": "NH-48 bypass corridor directly into Chandani Chowk and Paud Road",
        "avg_sqft": "₹10,500 – ₹15,000/sq.ft",
        "desc": "International sports capital and modern lifestyle destination in North-West Pune.",
        "highlights": "Proximity to Balewadi High Street, elite gyms, and seamless expressway travel to Mumbai and Bangalore."
    },
    {
        "id": "wakad",
        "name": "Wakad",
        "dist": "18 mins (13 km)",
        "route": "NH-48 via Chandani Chowk and Bavdhan",
        "avg_sqft": "₹8,500 – ₹12,000/sq.ft",
        "desc": "The booming gateway suburb between PCMC and Pune West tech corridors.",
        "highlights": "High density apartment clusters in Wakad make private plots and luxury forest villas at Forest Trails a premier aspirational upgrade."
    },
    {
        "id": "pashan",
        "name": "Pashan",
        "dist": "12 mins (8.5 km)",
        "route": "Pashan-NDA Road or Pashan-Bavdhan arterial route",
        "avg_sqft": "₹10,000 – ₹14,500/sq.ft",
        "desc": "Peaceful scientific and green residential enclave adjacent to Pashan Lake and Baner.",
        "highlights": "Direct connectivity to Chandani Chowk, defense and research institutes (ARDE, HEMRL), and lush tree cover."
    },
    {
        "id": "aundh",
        "name": "Aundh",
        "dist": "18 mins (14 km)",
        "route": "via Pashan Road and Chandani Chowk multi-tier junction",
        "avg_sqft": "₹13,000 – ₹18,500/sq.ft",
        "desc": "Established upscale neighborhood known for broad avenues, luxury shopping, and legacy families.",
        "highlights": "High property prices with minimal open space in Aundh make 190-acre master-planned forest living the ideal generational investment."
    },
    {
        "id": "karve-nagar",
        "name": "Karve Nagar",
        "dist": "12 mins (7.8 km)",
        "route": "direct Paud Road and Karve Road via Chandani Chowk",
        "avg_sqft": "₹13,500 – ₹18,000/sq.ft",
        "desc": "Central Pune family residential neighborhood with strong cultural institutions and medical hubs.",
        "highlights": "Close to Cummins, MKSSS, and Deccan Gymkhana, offering peaceful suburban expansion just minutes down Paud Road."
    },
    {
        "id": "shivaji-nagar",
        "name": "Shivaji Nagar",
        "dist": "20 mins (13 km)",
        "route": "FC Road / JM Road corridor to Paud Road via Law College Hill",
        "avg_sqft": "₹16,000 – ₹24,000/sq.ft",
        "desc": "The civic, judicial, administrative, and transport core of central Pune.",
        "highlights": "Central Pune elite seeking spacious weekend homes, luxury villas, and unpolluted air within effortless commuting distance."
    },
    {
        "id": "erandwane",
        "name": "Erandwane",
        "dist": "15 mins (9.5 km)",
        "route": "Karve Road straight into Paud Road and Bhugaon",
        "avg_sqft": "₹16,500 – ₹25,000/sq.ft",
        "desc": "Pune's most prestigious old-money neighborhood, home to Film and Television Institute (FTII) and premium clinics.",
        "highlights": "Ultra-expensive redevelopment flats in Erandwane compared with whole 190-acre gated villa sanctuaries at Forest Trails."
    },
    {
        "id": "warje",
        "name": "Warje",
        "dist": "10 mins (7 km)",
        "route": "Mumbai-Bangalore bypass directly connecting to Paud Road",
        "avg_sqft": "₹8,500 – ₹12,000/sq.ft",
        "desc": "Key highway intersection connecting South-West Pune to Kothrud and Bavdhan.",
        "highlights": "Immediate highway connectivity, flyover access, and fast-growing commercial avenues."
    },
    {
        "id": "pirangut",
        "name": "Pirangut",
        "dist": "8 mins (5.5 km)",
        "route": "Paud Road extension towards Lavasa & Mulshi",
        "avg_sqft": "₹5,500 – ₹8,000/sq.ft",
        "desc": "Thriving industrial hub and residential expansion corridor of Pune West.",
        "highlights": "Host to major manufacturing, engineering, and warehousing units, driving massive executive demand for premium housing in Forest Trails."
    },
    {
        "id": "mulshi",
        "name": "Mulshi",
        "dist": "15 mins (12 km)",
        "route": "scenic Paud-Mulshi eco-corridor",
        "avg_sqft": "₹4,800 – ₹7,500/sq.ft",
        "desc": "The world-famous Sahyadri hill range, lakes, and eco-tourism paradise.",
        "highlights": "Year-round misty climate, mountain waterfalls, and resort living right at your township doorstep."
    },
    {
        "id": "sus",
        "name": "Sus",
        "dist": "12 mins (8.5 km)",
        "route": "Sus-Pashan Road and Bavdhan connector",
        "avg_sqft": "₹7,500 – ₹10,500/sq.ft",
        "desc": "Emerging residential corridor favored by tech leaders working in Hinjewadi.",
        "highlights": "Quiet valley living, green surroundings, and direct connectivity to both Baner and Paud Road."
    },
    {
        "id": "punawale",
        "name": "Punawale",
        "dist": "22 mins (17 km)",
        "route": "NH-48 via Chandani Chowk and Wakad flyover",
        "avg_sqft": "₹6,800 – ₹9,200/sq.ft",
        "desc": "High-density residential hub along the Mumbai-Pune expressway.",
        "highlights": "Affordable apartment alternatives shifting attention to Forest Trails' high-value plots and resort-style homes."
    },
    {
        "id": "mahalunge",
        "name": "Mahalunge",
        "dist": "18 mins (13.5 km)",
        "route": "via Baner-Mahalunge Road and NH-48",
        "avg_sqft": "₹8,200 – ₹11,500/sq.ft",
        "desc": "Hi-Tech City smart project corridor near Hinjewadi and Balewadi.",
        "highlights": "PMRDA Ring Road integration, modern infrastructure, and easy connectivity to West Pune nature corridor."
    },
    {
        "id": "kharadi",
        "name": "Kharadi",
        "dist": "35 mins (26 km)",
        "route": "via Pune Metro / arterial bypass & Chandani Chowk",
        "avg_sqft": "₹9,500 – ₹14,000/sq.ft",
        "desc": "East Pune's prominent IT hub with EON Free Zone and World Trade Center.",
        "highlights": "Senior IT leadership and NRI investors in Kharadi seeking unpolluted, pollution-free forest villas and retirement sanctuaries in West Pune."
    }
]

ENCLAVE_DATA = {
    "villas": {
        "title_product": "Luxury Forest Villas",
        "hero_enclave": "The Rivolo & The Cove",
        "price": "₹3.89 Cr*",
        "price_clean": "38900000",
        "size": "4 & 5 BHK | 3,200 – 5,500 sq.ft",
        "rera": "P52100031560 & P52100048536",
        "desc": "Private hill-view villas surrounded by 30,000 indigenous trees, private landscaped gardens, double-height living rooms, and private driveways.",
        "usp": "Exclusive Cliff Club access, equestrian academy riding trails, and zero-pollution Sahyadri air."
    },
    "plots": {
        "title_product": "PMRDA NA Bungalow Plots",
        "hero_enclave": "Misty Greens",
        "price": "₹1.23 Cr*",
        "price_clean": "12300000",
        "size": "1,930 – 3,500+ sq.ft",
        "rera": "P52100053834",
        "desc": "100% PMRDA Collector sanctioned clear-title residential NA bungalow plots with individual 7/12 extracts, underground power/water, and demarcated boundary stones.",
        "usp": "Build your dream bespoke luxury bungalow with 100% bank loan approval from SBI, HDFC, and ICICI."
    },
    "flats": {
        "title_product": "Nature View Flats & Smart Homes",
        "hero_enclave": "The Canopy, Highgardens & Everglades",
        "price": "₹48.50 L*",
        "price_clean": "4850000",
        "size": "1, 2 & 3 BHK | 480 – 1,250 sq.ft",
        "rera": "P52100055711, P52100079518 & P52100053310",
        "desc": "Architectural hill-facing residences with large sun decks, panoramic valley views, and seamless integrated township amenities.",
        "usp": "Starts at just ₹48.50 L* at Everglades Bavdhan and ₹89 L* at The Canopy with Sri Sri ICSE school inside the township."
    }
}

def generate_page(slug, title, meta_desc, h1, location_obj, typology_key, related_links):
    enc = ENCLAVE_DATA[typology_key]
    loc = location_obj
    canonical = f"{DOMAIN}/{slug}/"

    # Schema JSON-LD
    schema_listing = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": title,
        "url": canonical,
        "description": meta_desc,
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": enc["price_clean"],
            "highPrice": "65000000",
            "offerCount": "28"
        },
        "contentLocation": {
            "@type": "Place",
            "name": f"Paranjape Forest Trails near {loc['name']}, Pune",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "18.5099377",
                "longitude": "73.738964"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bhugaon, Paud Road",
                "addressRegion": "Maharashtra",
                "postalCode": "412115",
                "addressCountry": "IN"
            }
        }
    }

    schema_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{DOMAIN}/"},
            {"@type": "ListItem", "position": 2, "name": "Pune Real Estate 2026", "item": f"{DOMAIN}/pune-real-estate-2026/"},
            {"@type": "ListItem", "position": 3, "name": f"{enc['title_product']} near {loc['name']}", "item": canonical}
        ]
    }

    schema_faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f"What is the exact distance and travel time from {loc['name']} to Paranjape Forest Trails?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f"Paranjape Forest Trails is situated just {loc['dist']} from {loc['name']}. The route operates via {loc['route']}, providing seamless, congestion-free highway access to West Pune's premier 190-acre eco-township."
                }
            },
            {
                "@type": "Question",
                "name": f"What is the starting price for {enc['title_product'].lower()} near {loc['name']}?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f"{enc['title_product']} at Paranjape Forest Trails near {loc['name']} start from {enc['price']}. All configurations come with clear PMRDA sanctions and registered MahaRERA certifications ({enc['rera']})."
                }
            },
            {
                "@type": "Question",
                "name": f"Why do property buyers in {loc['name']} choose Paranjape Forest Trails?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f"While average property rates in {loc['name']} range from {loc['avg_sqft']} for congested urban apartments, Paranjape Forest Trails delivers an expansive 190-acre gated ecosystem with 30,000 trees, Sri Sri ICSE School, The Cliff Club, Equestrian Academy, and superior capital appreciation."
                }
            },
            {
                "@type": "Question",
                "name": "Are home loans available for this project from leading nationalized banks?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Paranjape Forest Trails enclaves have pre-sanctioned project approvals and home loan facilities from all major banks including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda."
                }
            }
        ]
    }

    # Interlinking HTML
    related_pills = "".join(
        f'<a href="{DOMAIN}/{r["slug"]}/" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(212,175,55,0.3); color: #F1F5F9; padding: 0.5rem 1rem; border-radius: 50px; text-decoration: none; font-size: 0.82rem; font-weight: 600; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; transition: all 0.2s;">{r["anchor"]}</a>'
        for r in related_links
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(meta_desc)}">
  <link rel="canonical" href="{canonical}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#4A0808">

  <!-- OpenGraph / Social -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(meta_desc)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{DOMAIN}/images/hero-township.webp">
  <meta property="og:site_name" content="Paranjape Forest Trails Township">

  <!-- Early Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="image" href="{DOMAIN}/images/drone-aerial.webp" fetchpriority="high" type="image/webp">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" media="print" onload="this.media='all'">

  <!-- Analytics & Conversion Tracking (Google Ads AW-17430583486) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17430583486"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'AW-17430583486');
  </script>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
{json.dumps(schema_listing, ensure_ascii=False, indent=2)}
  </script>
  <script type="application/ld+json">
{json.dumps(schema_breadcrumb, ensure_ascii=False, indent=2)}
  </script>
  <script type="application/ld+json">
{json.dumps(schema_faq, ensure_ascii=False, indent=2)}
  </script>

  <style>
    :root {{
      --pscl-gold: #D4AF37;
      --pscl-maroon: #6B0D0D;
      --pscl-dark: #0E0C14;
      --pscl-card: #181522;
      --pscl-text: #F8FAFC;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background-color: var(--pscl-dark);
      color: var(--pscl-text);
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      line-height: 1.65;
      overflow-x: hidden;
    }}
    a, button, input, select {{
      touch-action: manipulation;
    }}
    .site-header {{
      position: sticky; top: 0; z-index: 1000;
      background: linear-gradient(90deg, #4A0808 0%, #6B0D0D 50%, #4A0808 100%);
      border-bottom: 1.5px solid var(--pscl-gold);
      padding: 0.6rem 1.25rem;
      display: flex; justify-content: space-between; align-items: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    }}
    .site-brand {{
      display: inline-flex; align-items: center; gap: 8px;
      background: #ffffff; padding: 4px 14px; border-radius: 50px;
      text-decoration: none; border: 1.5px solid var(--pscl-gold);
      min-height: 48px; min-width: 48px; box-sizing: border-box;
    }}
    .site-nav a {{
      color: #ffffff; text-decoration: none; font-size: 0.85rem; font-weight: 700;
      min-height: 48px; display: inline-flex; align-items: center; padding: 0.4rem 0.6rem;
    }}
    .site-nav a:hover {{ color: var(--pscl-gold); }}
    .container {{
      max-width: 1140px; margin: 0 auto; padding: 2rem 1.25rem;
    }}
    .hero-banner {{
      background: linear-gradient(135deg, rgba(74, 8, 8, 0.95), rgba(20, 16, 28, 0.98)), url('/images/drone-aerial.webp') center/cover;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 20px;
      padding: 3.5rem 2rem;
      margin-bottom: 2.5rem;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7);
    }}
    .badge {{
      display: inline-block;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid var(--pscl-gold);
      color: var(--pscl-gold);
      padding: 0.35rem 1rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 1.2rem;
    }}
    h1 {{
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.6rem;
      color: #ffffff;
      line-height: 1.25;
      margin-bottom: 1rem;
    }}
    .hero-sub {{
      font-size: 1.12rem;
      color: rgba(255,255,255,0.85);
      max-width: 780px;
      margin: 0 auto 1.8rem;
    }}
    .stats-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.2rem;
      margin: 2rem 0;
    }}
    .stat-card {{
      background: var(--pscl-card);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 14px;
      padding: 1.4rem;
      text-align: center;
    }}
    .stat-val {{
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--pscl-gold);
      margin-bottom: 0.25rem;
    }}
    .stat-label {{
      font-size: 0.8rem;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }}
    .content-box {{
      background: var(--pscl-card);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 2.5rem;
      margin-bottom: 2.5rem;
    }}
    h2 {{
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.85rem;
      color: var(--pscl-gold);
      margin-bottom: 1.2rem;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      padding-bottom: 0.5rem;
    }}
    h3 {{
      color: #ffffff;
      font-size: 1.2rem;
      margin: 1.4rem 0 0.6rem;
    }}
    p {{
      margin-bottom: 1rem;
      color: rgba(255,255,255,0.85);
      font-size: 0.98rem;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: rgba(0,0,0,0.3);
      border-radius: 10px;
      overflow: hidden;
    }}
    th, td {{
      padding: 0.85rem 1rem;
      text-align: left;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-size: 0.9rem;
    }}
    th {{
      background: #4A0808;
      color: var(--pscl-gold);
      font-weight: 700;
    }}
    tr:nth-child(even) {{ background: rgba(255,255,255,0.02); }}
    .cta-card {{
      background: linear-gradient(135deg, #4A0808, #6B0D0D);
      border: 2px solid var(--pscl-gold);
      border-radius: 16px;
      padding: 2.5rem;
      text-align: center;
      margin: 3rem 0;
      box-shadow: 0 15px 40px rgba(107, 13, 13, 0.4);
    }}
    .btn-gold {{
      background: linear-gradient(135deg, #FFE898, #D4AF37);
      color: #0E0C14;
      font-weight: 800;
      padding: 0.9rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      min-width: 48px;
      margin: 0.5rem;
      font-size: 0.95rem;
      letter-spacing: 0.05em;
      border: none;
      cursor: pointer;
      box-sizing: border-box;
      transition: all 0.25s;
    }}
    .btn-wa {{
      background: #25D366;
      color: #0E0C14;
      font-weight: 800;
      padding: 0.9rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      min-width: 48px;
      margin: 0.5rem;
      font-size: 0.95rem;
      letter-spacing: 0.05em;
      box-sizing: border-box;
    }}
    .faq-item {{
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      margin-bottom: 0.8rem;
      padding: 1.2rem;
    }}
    .faq-q {{
      font-weight: 700;
      color: var(--pscl-gold);
      margin-bottom: 0.4rem;
      font-size: 1.02rem;
    }}
    .faq-a {{
      color: rgba(255,255,255,0.8);
      font-size: 0.92rem;
    }}
    .interlink-mesh {{
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 1rem;
    }}
    .site-footer {{
      background: #060508;
      border-top: 1px solid rgba(212, 175, 55, 0.25);
      padding: 2.5rem 1.25rem;
      text-align: center;
      color: #94A3B8;
      font-size: 0.85rem;
    }}
    .site-footer a {{
      color: var(--pscl-gold);
      text-decoration: none;
      padding: 4px;
      min-height: 48px;
      display: inline-flex;
      align-items: center;
    }}
    @media (max-width: 768px) {{
      h1 {{ font-size: 2rem; }}
      .hero-banner {{ padding: 2rem 1.25rem; }}
      .content-box {{ padding: 1.5rem 1rem; }}
      .site-nav {{ display: none; }}
    }}
  </style>
</head>
<body>

  <!-- Header -->
  <header class="site-header">
    <a href="{DOMAIN}/" class="site-brand" aria-label="Paranjape Schemes Official Home">
      <img src="/assets/branding/paranjape-corporate-logo.webp" alt="Paranjape Schemes" width="110" height="22" style="height:22px; width:auto; display:block;">
      <span style="width:1.5px; height:18px; background:#D4AF37;"></span>
      <img src="/assets/branding/forest-trails-emblem.webp" alt="Forest Trails Emblem" width="24" height="24" style="height:24px; width:auto; display:block;">
    </a>
    <nav class="site-nav">
      <a href="{DOMAIN}/paranjape-forest-trails-township-bhugaon-misty-greens/">NA Plots</a>
      <a href="{DOMAIN}/paranjape-forest-trails-township-bhugaon-rivolo-residences/">Villas</a>
      <a href="{DOMAIN}/paranjape-forest-trails-township-bhugaon-the-canopy/">Apartments</a>
      <a href="{DOMAIN}/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/">Senior Living</a>
      <a href="{DOMAIN}/paranjape-schemes-contact/" style="color:var(--pscl-gold);">Enquire →</a>
    </nav>
  </header>

  <main class="container">

    <!-- Hero Banner -->
    <section class="hero-banner">
      <span class="badge">✦ Pune Real Estate Prime Opportunity 2026</span>
      <h1>{html.escape(h1)}</h1>
      <p class="hero-sub">{html.escape(meta_desc)}</p>
      <div>
        <a href="#vip-enquire" class="btn-gold">Schedule Site Visit</a>
        <a href="https://wa.me/{WHATSAPP_PHONE}?text=Hello%20Paranjape%20Team%2C%20I%20am%20interested%20in%20{html.escape(enc['title_product'])}%20near%20{html.escape(loc['name'])}." target="_blank" rel="noopener" class="btn-wa">Instant WhatsApp Advisory</a>
      </div>
    </section>

    <!-- Key Metrics Grid -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-val">{loc['dist']}</div>
        <div class="stat-label">Commute from {loc['name']}</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">{enc['price']}</div>
        <div class="stat-label">Starting Price*</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">190 Acres</div>
        <div class="stat-label">Gated Forest Township</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">100% Clear</div>
        <div class="stat-label">PMRDA & MahaRERA Approved</div>
      </div>
    </section>

    <!-- Detailed Analysis Content -->
    <article class="content-box">
      <h2>Why Property Buyers in {loc['name']} Are Choosing Paranjape Forest Trails</h2>
      <p>
        For homebuyers and smart real estate investors residing in <strong>{loc['name']}</strong>, the search for uncompromised living often collides with severe urban density, relentless traffic congestion, and soaring per-square-foot prices. Typical residential rates in {loc['name']} now average <strong>{loc['avg_sqft']}</strong> for standalone apartment towers offering restricted floor space and minimal green open areas.
      </p>
      <p>
        Just <strong>{loc['dist']}</strong> away via {loc['route']}, <strong>Paranjape Forest Trails</strong> presents Pune West's most expansive 190-acre master-planned forest ecosystem. Spread across gentle Sahyadri hill slopes in Bhugaon, Forest Trails harmoniously combines resort-style tranquility with immediate expressway connectivity to Chandani Chowk, Kothrud, Hinjewadi, and Central Pune.
      </p>

      <h3>Comparative Market Intelligence: {loc['name']} vs Paranjape Forest Trails</h3>
      <table>
        <thead>
          <tr>
            <th>Feature / Parameter</th>
            <th>Typical {loc['name']} Projects</th>
            <th>Paranjape Forest Trails (Bhugaon)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Township Scale</strong></td>
            <td>1 – 5 Acres (Single / Dual Towers)</td>
            <td>190 Acres Integrated Gated Township</td>
          </tr>
          <tr>
            <td><strong>Greenery & Air Quality</strong></td>
            <td>Urban roadside exposure, AQI 120–180</td>
            <td>30,000+ Native Trees, Clean AQI 35–55</td>
          </tr>
          <tr>
            <td><strong>Product Typologies</strong></td>
            <td>Standard 2 & 3 BHK Apartments</td>
            <td>NA Plots (1,930–3,500+ sq.ft*), Bespoke Villas, Flats & Senior Living</td>
          </tr>
          <tr>
            <td><strong>Pricing Paradigm</strong></td>
            <td>{loc['avg_sqft']}</td>
            <td>Plots from {ENCLAVE_DATA['plots']['price']}, Villas from {ENCLAVE_DATA['villas']['price']}, Flats from {ENCLAVE_DATA['flats']['price']}</td>
          </tr>
          <tr>
            <td><strong>On-Campus Amenities</strong></td>
            <td>Basic gym and rooftop deck</td>
            <td>The Cliff Club (40,000 sq.ft), Equestrian Riding Academy, Sri Sri ICSE School</td>
          </tr>
          <tr>
            <td><strong>Title & Sanctions</strong></td>
            <td>Varies by developer</td>
            <td>100% PMRDA Collector Sanctioned, Independent 7/12, Clear MahaRERA</td>
          </tr>
        </tbody>
      </table>

      <h3>Featured Enclave: {enc['hero_enclave']}</h3>
      <p>
        {enc['desc']} Designed for discerning buyers seeking lifelong serenity and substantial wealth creation, each residence or plot offers <strong>{enc['size']}</strong> with verified MahaRERA registration (<strong>{enc['rera']}</strong>).
      </p>
      <p>
        {enc['usp']} Residents enjoy an unmatched lifestyle where mornings begin with birdsong from over 90 species of migratory birds, equestrian training sessions, and scenic hilltop sunset views over Manas Lake and the Western Ghats.
      </p>

      <h3>Seamless Connectivity from {loc['name']}</h3>
      <p>
        Commuting between {loc['name']} and Forest Trails is effortless. {loc['highlights']} With the recent completion of the Chandani Chowk multi-tier flyover and continuous widening of Paud Road into a multi-lane expressway, you are shielded from bottlenecks while remaining connected to Pune's prime business, shopping, and healthcare institutions.
      </p>
    </article>

    <!-- Lead Capture CTA Card -->
    <section class="cta-card" id="vip-enquire">
      <span class="badge" style="background:rgba(212,175,55,0.25); color:#fff; border-color:#fff;">✦ Direct Developer Advisory</span>
      <h2 style="color:#ffffff; border:none; margin-bottom:0.5rem; font-size:2.2rem;">Own Your Sanctuary near {loc['name']}</h2>
      <p style="color:rgba(255,255,255,0.9); max-width:650px; margin:0 auto 1.5rem; font-size:1.05rem;">
        Direct developer booking with 0% brokerage. Get customized floor plans, latest 2026 pricing sheets, and arrange a complimentary AC cab site visit from {loc['name']}.
      </p>

      <form action="https://formsubmit.co/ajax/propsmartrealty@gmail.com" method="POST" style="max-width:520px; margin:0 auto; display:flex; flex-direction:column; gap:1rem;" onsubmit="handleLeadSubmit(event)">
        <input type="hidden" name="_subject" value="🌟 New Lead from {slug}: {loc['name']} - {enc['title_product']}">
        <input type="hidden" name="source_page" value="{canonical}">
        <input type="hidden" name="location" value="{loc['name']}">
        <input type="hidden" name="typology" value="{enc['title_product']}">
        
        <input type="text" name="name" id="lead_name" placeholder="Full Name *" required style="padding:1rem 1.25rem; border-radius:10px; border:1px solid #D4AF37; background:#ffffff; color:#000; font-size:0.95rem;">
        <input type="tel" name="phone" id="lead_phone" placeholder="10-Digit Mobile Number *" required pattern="[0-9]{{10}}" style="padding:1rem 1.25rem; border-radius:10px; border:1px solid #D4AF37; background:#ffffff; color:#000; font-size:0.95rem;">
        <input type="email" name="email" id="lead_email" placeholder="Email Address (Optional)" style="padding:1rem 1.25rem; border-radius:10px; border:1px solid #D4AF37; background:#ffffff; color:#000; font-size:0.95rem;">
        
        <button type="submit" id="lead_btn" class="btn-gold" style="width:100%; margin:0.5rem 0 0; justify-content:center; font-size:1.05rem;">Request Instant Callback &amp; Plans</button>
        <p style="font-size:0.75rem; color:#CBD5E1; text-align:center; margin-top:0.4rem;">By submitting, you agree to our <a href="{DOMAIN}/privacy-policy/" target="_blank" rel="noopener" style="color:#D4AF37; text-decoration:underline;">Privacy Policy</a>.</p>
      </form>
      <div id="lead_msg" style="display:none; color:#22c55e; margin-top:1rem; font-weight:700;">✓ Thank you! Our senior property advisory is reaching out to you immediately.</div>
    </section>

    <!-- Frequently Asked Questions -->
    <section class="content-box">
      <h2>Frequently Asked Questions — {loc['name']} &amp; Forest Trails</h2>
      { "".join(f'''<div class="faq-item">
        <div class="faq-q">{faq["name"]}</div>
        <div class="faq-a">{faq["acceptedAnswer"]["text"]}</div>
      </div>''' for faq in schema_faq["mainEntity"]) }
    </section>

    <!-- Cross-Market Interlink Mesh -->
    <section class="content-box">
      <h2>Explore Other Pune Real Estate Micro-Markets</h2>
      <p>Discover luxury forest living and high-growth NA plots across Western &amp; Central Pune corridors:</p>
      <div class="interlink-mesh">
        {related_pills}
      </div>
    </section>

  </main>

  <!-- Footer Disclosures -->
  <footer class="site-footer">
    <p><strong>Paranjape Forest Trails Township</strong> | Bhugaon, Paud Road, Pune West 412115</p>
    <p style="margin:0.5rem 0;">Direct Sales Office: <a href="tel:{PHONE}">{PHONE}</a> | MahaRERA Registration: {enc['rera']}</p>
    <p>Authorized Marketing Partner: PropSmart Realty (MahaRERA: {AGENT_RERA})</p>
    <p style="font-size:0.75rem; color:#64748B; margin-top:0.8rem;">
      *Prices indicated are base prices, taxes and government charges extra. Subject to availability and revision without prior notice.
    </p>
    <p style="margin-top:1rem;">
      <a href="{DOMAIN}/">Home</a> |
      <a href="{DOMAIN}/pune-real-estate-2026/">Pune Real Estate 2026</a> |
      <a href="{DOMAIN}/paranjape-schemes-all-projects-pune/">All Paranjape Projects</a> |
      <a href="{DOMAIN}/privacy-policy/">Privacy Policy</a> |
      <a href="{DOMAIN}/terms-of-use/">Terms of Use</a> |
      <a href="{DOMAIN}/sitemap-page/">Sitemap</a>
    </p>
  </footer>

  <script>
    function handleLeadSubmit(e) {{
      e.preventDefault();
      var name = document.getElementById('lead_name').value.trim();
      var phone = document.getElementById('lead_phone').value.trim();
      var email = document.getElementById('lead_email').value.trim();
      var btn = document.getElementById('lead_btn');
      
      if (!phone || phone.length < 10) {{
        alert('Please provide a valid 10-digit mobile number.');
        return;
      }}
      btn.disabled = true;
      btn.innerText = 'Submitting...';

      var payload = {{
        name: name,
        phone: '+91' + phone,
        email: email || 'N/A',
        source: window.location.href,
        location: '{loc["name"]}',
        typology: '{enc["title_product"]}',
        _subject: '🌟 Lead: {loc["name"]} - {enc["title_product"]} (' + name + ' +91' + phone + ')'
      }};

      if (typeof window.gtag === 'function') {{
        window.gtag('event', 'conversion', {{
          'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA',
          'value': 1.0,
          'currency': 'INR'
        }});
      }}

      fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json', 'Accept': 'application/json' }},
        body: JSON.stringify(payload)
      }}).then(function() {{
        document.getElementById('lead_msg').style.display = 'block';
        btn.innerText = 'Submitted Successfully ✓';
        setTimeout(function() {{
          window.location.href = '/thank-you.html';
        }}, 800);
      }}).catch(function() {{
        window.location.href = '/thank-you.html';
      }});
    }}
  </script>
  <script defer src="/exit-intent-concierge.js"></script>
</body>
</html>"""

def main():
    print("🚀 Initializing Pune Real Estate Programmatic SEO Expansion Engine...")
    created_count = 0
    all_slugs = []

    # Map all combinations
    tasks = []
    for loc in LOCATIONS:
        # 1. Villas in {location}
        villas_slug = f"villas-in-{loc['id']}"
        tasks.append({
            "slug": villas_slug,
            "title": f"Villas in {loc['name']} | Luxury 4 & 5 BHK Forest Villas | Paranjape Pune",
            "meta_desc": f"Explore luxury 4 & 5 BHK villas near {loc['name']} from ₹3.89 Cr*. Just {loc['dist']} away at Paranjape Forest Trails. Private gardens, 190-acre eco-township & clear RERA.",
            "h1": f"Luxury Villas in {loc['name']} (Just {loc['dist']} Away)",
            "loc": loc,
            "typology": "villas",
            "anchor": f"Villas in {loc['name']}"
        })

        # 2. Plots in {location}
        plots_slug = f"plots-in-{loc['id']}"
        tasks.append({
            "slug": plots_slug,
            "title": f"Plots in {loc['name']} | PMRDA Sanctioned NA Bungalow Plots | Paranjape Pune",
            "meta_desc": f"Verified PMRDA NA bungalow plots near {loc['name']} from ₹1.23 Cr*. Just {loc['dist']} away at Misty Greens, Forest Trails. Independent 7/12 & 100% bank loan approved.",
            "h1": f"PMRDA Sanctioned NA Plots in {loc['name']} ({loc['dist']})",
            "loc": loc,
            "typology": "plots",
            "anchor": f"Plots in {loc['name']}"
        })

        # 3. Flats in {location}
        flats_slug = f"flats-in-{loc['id']}"
        tasks.append({
            "slug": flats_slug,
            "title": f"Flats in {loc['name']} | Nature View 1, 2 & 3 BHK Apartments | From ₹48.5L*",
            "meta_desc": f"Premium 1, 2 & 3 BHK flats near {loc['name']} from ₹48.50 L* to ₹89 L*. Located {loc['dist']} away in 190-acre Paranjape Forest Trails. 30,000 trees & Sri Sri ICSE school.",
            "h1": f"Nature View Flats in {loc['name']} (Just {loc['dist']} Away)",
            "loc": loc,
            "typology": "flats",
            "anchor": f"Flats in {loc['name']}"
        })

    # Add Specialized High-Intent Hubs
    specialized_hubs = [
        {
            "slug": "senior-living-pune",
            "title": "Senior Living in Pune | Athashri & Swaniketan 2 & 3 BHK Retirement Homes",
            "meta_desc": "India's premier senior living in Pune at Paranjape Athashri (from ₹83 L*) & Swaniketan (from ₹79 L*). 24/7 medical care, dining, emergency response & vibrant community.",
            "h1": "Senior Living in Pune — Athashri & Swaniketan Bhugaon",
            "loc": {"name": "Pune", "dist": "Western Corridor", "route": "Paud Road & Chandani Chowk", "avg_sqft": "₹11,000/sq.ft", "highlights": "Dedicated doctor-on-call, wheelchair-friendly architecture, and emergency panic cords."},
            "typology": "flats",
            "anchor": "Senior Living in Pune"
        },
        {
            "slug": "senior-citizen-homes-kothrud",
            "title": "Senior Citizen Homes near Kothrud | Athashri Bhugaon from ₹83 L* | Pune West",
            "meta_desc": "Looking for senior citizen retirement homes near Kothrud? Athashri Bhugaon is just 10 mins away. Special senior dining, round-the-clock nursing & green forest living.",
            "h1": "Senior Citizen Homes near Kothrud — Athashri Forest Trails",
            "loc": {"name": "Kothrud", "dist": "10 mins (6.5 km)", "route": "Paud Road", "avg_sqft": "₹16,000/sq.ft", "highlights": "Close to Kothrud's temples, clinics, and family networks while offering serene retirement."},
            "typology": "flats",
            "anchor": "Senior Homes near Kothrud"
        },
        {
            "slug": "retirement-homes-pune-west",
            "title": "Retirement Homes in Pune West | Paranjape Athashri Senior Living 2026",
            "meta_desc": "Top-rated retirement homes in Pune West starting ₹79 L*. Safe, dignified senior community with vegetarian dining, physiotherapy, and 24x7 security in a 190-acre township.",
            "h1": "Premier Retirement Homes in Pune West",
            "loc": {"name": "Pune West", "dist": "0 mins", "route": "Paud Road", "avg_sqft": "₹10,500/sq.ft", "highlights": "30,000 trees, walking trails, and like-minded intellectual senior community."},
            "typology": "flats",
            "anchor": "Retirement Homes Pune West"
        },
        {
            "slug": "gated-community-township-pune",
            "title": "190-Acre Gated Community Township in Pune | Paranjape Forest Trails",
            "meta_desc": "Discover Pune's largest private forest township — 190 acres with plots, villas, flats & senior living. Featuring The Cliff Club, Equestrian Academy & Sri Sri School.",
            "h1": "190-Acre Integrated Gated Community Township in Pune",
            "loc": {"name": "Pune West", "dist": "7 mins from Chandani Chowk", "route": "Paud Road expressway", "avg_sqft": "₹11,500/sq.ft", "highlights": "Complete self-sustained ecosystem with school, sports club, horse riding, and nature trails."},
            "typology": "plots",
            "anchor": "Gated Township Pune"
        },
        {
            "slug": "duplex-in-bavdhan",
            "title": "Duplex Homes near Bavdhan | The Verandah 3 & 4 BHK Hilltop Residences",
            "meta_desc": "Explore luxury 3 & 4 BHK duplex residences near Bavdhan starting ₹93 L*. Double-height living, expansive terraces, and sweeping hill views in 190-acre Forest Trails.",
            "h1": "Luxury Duplex Homes near Bavdhan — The Verandah",
            "loc": {"name": "Bavdhan", "dist": "5 mins", "route": "Paud Road", "avg_sqft": "₹12,000/sq.ft", "highlights": "Two-level hillside duplex living with private family lounges and expansive decks."},
            "typology": "flats",
            "anchor": "Duplex near Bavdhan"
        },
        {
            "slug": "duplex-in-kothrud",
            "title": "Duplex Homes near Kothrud | 3 & 4 BHK Forest View Duplexes from ₹93 L*",
            "meta_desc": "Upgrade to a 3 or 4 BHK duplex home just 10 mins from Kothrud at The Verandah. Hilltop views, double-height ceilings & premium township amenities from ₹93 L*.",
            "h1": "3 & 4 BHK Duplex Homes near Kothrud",
            "loc": {"name": "Kothrud", "dist": "10 mins", "route": "Paud Road", "avg_sqft": "₹18,000/sq.ft", "highlights": "Half the cost of cramped Kothrud apartments with double the space and fresh forest air."},
            "typology": "flats",
            "anchor": "Duplex near Kothrud"
        }
    ]
    tasks.extend(specialized_hubs)

    print(f"Total programmatic hubs to process: {len(tasks)}")

    for t in tasks:
        slug = t["slug"]
        all_slugs.append(slug)
        out_dir = os.path.join(BASE_DIR, slug)
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, "index.html")

        # Select 8 sibling related links for high contextual topical authority
        related = [
            {"slug": other["slug"], "anchor": other["anchor"]}
            for other in tasks if other["slug"] != slug and (other["typology"] == t["typology"] or other["loc"]["name"] == t["loc"]["name"])
        ][:10]

        html_content = generate_page(
            slug=slug,
            title=t["title"],
            meta_desc=t["meta_desc"],
            h1=t["h1"],
            location_obj=t["loc"],
            typology_key=t["typology"],
            related_links=related
        )

        with open(out_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        created_count += 1

    print(f"✅ Successfully created/updated {created_count} enterprise-grade programmatic landing hubs!")

if __name__ == "__main__":
    main()
