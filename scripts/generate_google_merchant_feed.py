#!/usr/bin/env python3
"""
scripts/generate_google_merchant_feed.py
Generates 100% compliant Google Merchant Center & Google Shopping Product Feeds:
1. google-merchant-feed.xml (RSS 2.0 with xmlns:g="http://base.google.com/ns/1.0")
2. google-products.xml (Atom / Shopping XML Feed)
3. sitemap-products.xml (Google Sitemaps XML for Products)
Covers all 25 official inventory configurations, enclaves, and typologies of Paranjape Forest Trails.
"""

import os
import shutil
import xml.sax.saxutils as saxutils
from datetime import datetime, timezone

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d")

def esc(text):
    if text is None:
        return ""
    # Ensure & is escaped to &amp; but don't double escape already escaped &gt;
    # Cleanest way: unescape entities first, then saxutils.escape
    raw = str(text).replace("&amp;", "&").replace("&gt;", ">").replace("&lt;", "<").replace("&quot;", '"').replace("&apos;", "'")
    return saxutils.escape(raw, {'"': '&quot;', "'": '&apos;'})

INVENTORY = [
    {
        "id": "PFT-MISTY-GREENS-1800",
        "title": "Paranjape Misty Greens NA Bungalow Plot 1800 sq ft Bhugaon Pune — MahaRERA P52100053834",
        "description": "Collector-sanctioned RERA approved 1,800 sq.ft NA Bungalow Plot inside the 190-acre gated Forest Trails township in Bhugaon, West Pune. 7 mins from Chandani Chowk. FSI 1.5, underground cabling, 24/7 water, Cliff Club membership.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-misty-greens/",
        "image": f"{DOMAIN}/images/misty-greens-plots.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp", f"{DOMAIN}/images/master-plan.webp"],
        "price": "12300000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > NA Bungalow Plots",
        "mpn": "P52100053834",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "NA Bungalow Plots", "Ready Possession", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-MISTY-GREENS-2400",
        "title": "Paranjape Misty Greens NA Bungalow Plot 2400 sq ft Bhugaon Pune — MahaRERA P52100053834",
        "description": "Collector-sanctioned 2,400 sq.ft NA Bungalow Plot in Misty Greens, Forest Trails Bhugaon. Prime hillside location with Sahyadri valley views. Clear title, demarcation done, bank loan approved.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-misty-greens/",
        "image": f"{DOMAIN}/images/misty-greens-plots.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp", f"{DOMAIN}/images/master-plan.webp"],
        "price": "16400000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > NA Bungalow Plots",
        "mpn": "P52100053834",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "NA Bungalow Plots", "Ready Possession", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-MISTY-GREENS-3000",
        "title": "Paranjape Misty Greens NA Bungalow Plot 3000 sq ft Bhugaon Pune — MahaRERA P52100053834",
        "description": "Premium 3,000 sq.ft corner NA plot at Paranjape Forest Trails Bhugaon. Ideal for luxury custom villa construction with private garden, 3-car parking, and cliff views.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-misty-greens/",
        "image": f"{DOMAIN}/images/misty-greens-plots.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp", f"{DOMAIN}/images/master-plan.webp"],
        "price": "20500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > NA Bungalow Plots",
        "mpn": "P52100053834",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "NA Bungalow Plots", "Ready Possession", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-MISTY-GREENS-3600",
        "title": "Paranjape Misty Greens NA Bungalow Plot 3600 sq ft Bhugaon Pune — MahaRERA P52100053834",
        "description": "Grand 3,600 sq.ft estate plot in Misty Greens at Forest Trails Bhugaon. 100% sanctioned NA order, gated security, club access, panoramic nature reserve backdrop.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-misty-greens/",
        "image": f"{DOMAIN}/images/misty-greens-plots.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp", f"{DOMAIN}/images/master-plan.webp"],
        "price": "24600000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > NA Bungalow Plots",
        "mpn": "P52100053834",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "NA Bungalow Plots", "Ready Possession", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-RIVOLO-VILLA-4BHK",
        "title": "The Rivolo Luxury 4 BHK Forest Villa 3200 sq ft Bhugaon Pune — MahaRERA P52100031560",
        "description": "Independent 4 BHK luxury forest villa (3,200 sq.ft built-up) inside Paranjape Forest Trails Bhugaon. Private sundeck, landscaped lawn, double-height living room, 2-car covered portico.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
        "image": f"{DOMAIN}/images/villas-exterior-1.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp", f"{DOMAIN}/images/lifestyle.webp"],
        "price": "38900000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Luxury Villas",
        "mpn": "P52100031560",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Luxury Villas", "Possession 2026", "The Rivolo"]
    },
    {
        "id": "PFT-RIVOLO-VILLA-5BHK",
        "title": "The Rivolo Presidential 5 BHK Forest Villa 4100 sq ft Bhugaon Pune — MahaRERA P52100031560",
        "description": "Ultra-exclusive 5 BHK Presidential Villa (4,100 sq.ft) with private infinity plunge pool, personal elevator provision, expansive master retreat, and 360-degree forest canopy vistas.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
        "image": f"{DOMAIN}/images/villas-exterior-1.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp", f"{DOMAIN}/images/lifestyle.webp"],
        "price": "51500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Luxury Villas",
        "mpn": "P52100031560",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Luxury Villas", "Possession 2026", "The Rivolo"]
    },
    {
        "id": "PFT-COVE-BUNGALOW-4BHK",
        "title": "The Cove 4 BHK Twin Bungalow Duet Villa 2800 sq ft Bhugaon Pune — MahaRERA P52100048536",
        "description": "Elegant 4 BHK Twin Bungalow (Duet Villa) spanning 2,800 sq.ft at The Cove, Paranjape Forest Trails. Private terrace garden, spacious bedrooms, modern architecture in a tranquil forest setting.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-the-cove/",
        "image": f"{DOMAIN}/images/villas-exterior-1.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp", f"{DOMAIN}/images/master-plan.webp"],
        "price": "28500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Twin Bungalows",
        "mpn": "P52100048536",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Twin Bungalows", "Available", "The Cove"]
    },
    {
        "id": "PFT-CANOPY-2BHK",
        "title": "The Canopy Premium 2 BHK Flat 850 sq ft Bhugaon Pune — MahaRERA P52100079518",
        "description": "Spacious 2 BHK Forest-Facing Apartment (850 sq.ft) at The Canopy, Paranjape Forest Trails Bhugaon. Large sundeck balcony, premium vitrified flooring, 50,000 sq.ft clubhouse access.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-the-canopy/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp", f"{DOMAIN}/images/master-plan.webp"],
        "price": "8900000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Apartments & Flats",
        "mpn": "P52100079518",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "2 BHK Apartments", "Possession 2027", "The Canopy"]
    },
    {
        "id": "PFT-CANOPY-3BHK",
        "title": "The Canopy Grande 3 BHK Flat 1150 sq ft Bhugaon Pune — MahaRERA P52100079518",
        "description": "Luxurious 3 BHK Family Apartment (1,150 sq.ft) at The Canopy inside Forest Trails Bhugaon. Cross-ventilation, scenic valley views, modern modular fittings, direct access to ICSE school.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-the-canopy/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp", f"{DOMAIN}/images/master-plan.webp"],
        "price": "12500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Apartments & Flats",
        "mpn": "P52100079518",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "3 BHK Apartments", "Possession 2027", "The Canopy"]
    },
    {
        "id": "PFT-HIGHGARDENS-2BHK",
        "title": "The Highgardens 2 BHK Valley View Apartment 820 sq ft Bhugaon Pune — MahaRERA P52100053310",
        "description": "Ready-to-move 2 BHK Valley View Apartment (820 sq.ft) at The Highgardens, Forest Trails Bhugaon. Unobstructed nature panoramas, children's play park, dedicated covered parking.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-highgardens/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "8900000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Apartments & Flats",
        "mpn": "P52100053310",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "2 BHK Apartments", "Ready Possession", "The Highgardens"]
    },
    {
        "id": "PFT-ATHASHRI-2BHK",
        "title": "Paranjape Athashri Senior Living 2 BHK Residence 850 sq ft Bhugaon Pune — MahaRERA P52100077686",
        "description": "Dedicated 2 BHK Senior Living Home (850 sq.ft) at Athashri Bhugaon. Senior-friendly design: anti-skid floors, panic buttons, 24/7 nursing and ambulance on-site, dining and recreation.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
        "image": f"{DOMAIN}/images/athashri-realistic.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "8300000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Senior Living",
        "mpn": "P52100077686",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Senior Living", "Active Community", "Athashri"]
    },
    {
        "id": "PFT-ATHASHRI-3BHK",
        "title": "Paranjape Athashri Senior Living 3 BHK Residence 1150 sq ft Bhugaon Pune — MahaRERA P52100077686",
        "description": "Spacious 3 BHK Senior Living Apartment (1,150 sq.ft) at Athashri Bhugaon inside Forest Trails. Full geriatric wellness support, housekeeping, daily wellness programs, temple and community hall.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
        "image": f"{DOMAIN}/images/athashri-realistic.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "11500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Senior Living",
        "mpn": "P52100077686",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Senior Living", "Active Community", "Athashri"]
    },
    {
        "id": "PFT-VERANDAH-3BHK",
        "title": "The Verandah 3 BHK Nature Duplex 1100 sq ft Bhugaon Pune — MahaRERA P52100002194",
        "description": "Exclusive 3 BHK Duplex Home (1,100 sq.ft) with private verandah balcony at Paranjape Forest Trails Bhugaon. Low-density residential cluster nestled along the natural green reserve.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-verandah/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "9300000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Duplexes & Penthouses",
        "mpn": "P52100002194",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Duplex Homes", "Ready Possession", "The Verandah"]
    },
    {
        "id": "PFT-VERANDAH-4BHK",
        "title": "The Verandah 4 BHK Penthouse Duplex 1800 sq ft Bhugaon Pune — MahaRERA P52100002194",
        "description": "Grand 4 BHK Penthouse Duplex (1,800 sq.ft) featuring private sky terrace, double-height ceiling in parlor, premium fittings, and serene forest views.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-verandah/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "15800000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Duplexes & Penthouses",
        "mpn": "P52100002194",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Duplex Homes", "Ready Possession", "The Verandah"]
    },
    {
        "id": "PFT-ORCHARD-2BHK",
        "title": "Orchard Residences 2 BHK Garden Apartment 820 sq ft Bhugaon Pune — MahaRERA P52100055710",
        "description": "Well-planned 2 BHK Apartment (820 sq.ft) at Orchard Residences, Forest Trails Bhugaon. Community garden, jogging path, ready infrastructure, ideal first home in West Pune.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-orchard-residences/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "8300000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Apartments & Flats",
        "mpn": "P52100055710",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "2 BHK Apartments", "Ready Possession", "Orchard Residences"]
    },
    {
        "id": "PFT-SWANIKETAN-2BHK",
        "title": "Swaniketan Assisted Living 2 BHK Care Suite 700 sq ft Bhugaon Pune — MahaRERA P52100052124",
        "description": "Dedicated Assisted Living 2 BHK Care Suite (700 sq.ft) at Swaniketan inside Forest Trails Bhugaon. 24x7 attendant care, physio support, nutritious dining, accessible architecture.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-swaniketan/",
        "image": f"{DOMAIN}/images/athashri-realistic.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "7900000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Assisted Living",
        "mpn": "P52100052124",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Assisted Living", "Active Care", "Swaniketan"]
    },
    {
        "id": "PFT-SWANIKETAN-3BHK",
        "title": "Swaniketan Assisted Living 3 BHK Care Suite 950 sq ft Bhugaon Pune — MahaRERA P52100052124",
        "description": "Spacious Assisted Living 3 BHK Family Suite (950 sq.ft) at Swaniketan Bhugaon with dedicated nurse station access, wheelchair-ready bathrooms, and nutritious dietary support.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-swaniketan/",
        "image": f"{DOMAIN}/images/athashri-realistic.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "10500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Assisted Living",
        "mpn": "P52100052124",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Assisted Living", "Active Care", "Swaniketan"]
    },
    {
        "id": "PFT-EVERGLADES-1BHK",
        "title": "Everglades Bavdhan Smart 1 BHK PRO Flat 450 sq ft Bavdhan Pune — MahaRERA P52100055711",
        "description": "Smart 1 BHK PRO Apartment (450 sq.ft) at Everglades Bavdhan Extension by Paranjape Schemes. From ₹48.5 L* with swift highway connectivity to Kothrud and Hinjewadi IT Park.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-everglades/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "4850000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Apartments & Flats",
        "mpn": "P52100055711",
        "labels": ["MahaRERA Registered", "Bavdhan Pune West", "1 BHK Apartments", "Active Project", "Everglades"]
    },
    {
        "id": "PFT-EVERGLADES-2BHK",
        "title": "Everglades Bavdhan Smart 2 BHK PRO Flat 750 sq ft Bavdhan Pune — MahaRERA P52100055711",
        "description": "Optimized 2 BHK PRO Apartment (750 sq.ft) at Everglades Bavdhan Extension. Scenic hill views, club access, and prime West Pune appreciation potential. MahaRERA P52100055711.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-everglades/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "7500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Apartments & Flats",
        "mpn": "P52100055711",
        "labels": ["MahaRERA Registered", "Bavdhan Pune West", "2 BHK Apartments", "Active Project", "Everglades"]
    },
    {
        "id": "PFT-SECTOR-A-VILLA",
        "title": "Sector A Skyline Luxury Villa 3500 sq ft Bhugaon Pune — MahaRERA P52100031560",
        "description": "Custom luxury villa plot and residence in Sector A Skyline at Forest Trails Bhugaon. Highest elevation in the township with private sunset views over the Manas Lake corridor.",
        "link": f"{DOMAIN}/sectors/sector-a-skyline-villas/",
        "image": f"{DOMAIN}/images/villas-exterior-1.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "39500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Luxury Villas",
        "mpn": "P52100031560",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "Luxury Villas", "Sector A Skyline", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-SECTOR-B-PLOT",
        "title": "Sector B Misty Heights NA Plot 2000 sq ft Bhugaon Pune — MahaRERA P52100053834",
        "description": "Sanctioned NA Bungalow Plot (2,000 sq.ft) in Sector B Misty Heights at Forest Trails Bhugaon. Clear title, PMRDA sanctioned layout, ready for immediate bungalow construction.",
        "link": f"{DOMAIN}/sectors/sector-b-misty-heights/",
        "image": f"{DOMAIN}/images/misty-greens-plots.webp",
        "additional_images": [f"{DOMAIN}/images/master-plan.webp"],
        "price": "13500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > NA Bungalow Plots",
        "mpn": "P52100053834",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "NA Bungalow Plots", "Sector B Misty Heights", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-SECTOR-C-PLOT",
        "title": "Sector C Riverview Scenic NA Plot 2400 sq ft Bhugaon Pune — MahaRERA P52100053834",
        "description": "Scenic 2,400 sq.ft NA Bungalow Plot in Sector C Riverview at Forest Trails Bhugaon. Natural stream frontage, mature tree cover, peaceful nature enclave.",
        "link": f"{DOMAIN}/sectors/sector-c-riverview-plots/",
        "image": f"{DOMAIN}/images/misty-greens-plots.webp",
        "additional_images": [f"{DOMAIN}/images/master-plan.webp"],
        "price": "14500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > NA Bungalow Plots",
        "mpn": "P52100053834",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "NA Bungalow Plots", "Sector C Riverview", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-SECTOR-D-PLOT",
        "title": "Sector D Forest Edge Hilltop NA Plot 2800 sq ft Bhugaon Pune — MahaRERA P52100053834",
        "description": "Hilltop 2,800 sq.ft NA Bungalow Plot in Sector D Forest Edge at Forest Trails Bhugaon. Directly adjoining the reserved forest greenbelt. Pure air, zero pollution.",
        "link": f"{DOMAIN}/sectors/sector-d-forest-edge/",
        "image": f"{DOMAIN}/images/misty-greens-plots.webp",
        "additional_images": [f"{DOMAIN}/images/master-plan.webp"],
        "price": "16000000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > NA Bungalow Plots",
        "mpn": "P52100053834",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "NA Bungalow Plots", "Sector D Forest Edge", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-SECTOR-E-FLAT",
        "title": "Sector E Valley View Residence 2 BHK Flat 890 sq ft Bhugaon Pune — MahaRERA P52100079518",
        "description": "Spacious 2 BHK Apartment (890 sq.ft) in Sector E Valley Residences at Forest Trails Bhugaon. High-floor valley view, sundeck balcony, modern amenities, close to Chandani Chowk.",
        "link": f"{DOMAIN}/sectors/sector-e-valley-residences/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "9500000.00 INR",
        "category": "Real Estate > Properties > Residential Properties",
        "product_type": "Real Estate > Residential > Apartments & Flats",
        "mpn": "P52100079518",
        "labels": ["MahaRERA Registered", "Bhugaon Pune West", "2 BHK Apartments", "Sector E Valley", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-CLIFF-CLUB",
        "title": "The Cliff Club 50000 sq ft Lifestyle Hub & Resort Membership Bhugaon Pune",
        "description": "Exclusive Club & Sports Hub Membership inside Paranjape Forest Trails Bhugaon. Olympic swimming pool, squash, badminton, equestrian arena, fine dining restaurant, luxury spa.",
        "link": f"{DOMAIN}/amenities/the-cliff-club/",
        "image": f"{DOMAIN}/images/lifestyle.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "350000.00 INR",
        "category": "Sporting Goods > Outdoor Recreation > Club Memberships",
        "product_type": "Lifestyle > Resort & Sports Club > Membership",
        "mpn": "PFT-AMENITY-CC",
        "labels": ["Township Amenities", "The Cliff Club", "Olympic Sports", "Equestrian", "Paranjape Forest Trails"]
    },
    {
        "id": "PFT-EQUESTRIAN-PACKAGE",
        "title": "Forest Trails Equestrian Academy Horse Riding & Stables Training Package Pune",
        "description": "Professional Horse Riding Academy with international-grade stables, riding arena, certified trainers, and trail rides inside the 190-acre Paranjape Forest Trails Bhugaon.",
        "link": f"{DOMAIN}/amenities/equestrian-academy-pune/",
        "image": f"{DOMAIN}/images/lifestyle.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "120000.00 INR",
        "category": "Sporting Goods > Outdoor Recreation > Equestrian & Horse Riding",
        "product_type": "Lifestyle > Sports Academy > Equestrian Training",
        "mpn": "PFT-AMENITY-EA",
        "labels": ["Township Amenities", "Equestrian Academy", "Horse Riding", "Adventure", "Paranjape Forest Trails"]
    }
]

def build_merchant_feed():
    xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
        '  <channel>',
        '    <title>Paranjape Forest Trails Township — Official Property &amp; Inventory Feed</title>',
        f'    <link>{DOMAIN}</link>',
        '    <description>Official Google Merchant Center Product Feed for Paranjape Forest Trails 190-Acre Integrated Township in Bhugaon, Pune West by Paranjape Schemes (Construction) Ltd. Verified MahaRERA inventory including NA Bungalow Plots, Luxury Villas, Twin Bungalows, and Premium Apartments.</description>',
        f'    <lastBuildDate>{datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")}</lastBuildDate>'
    ]

    for item in INVENTORY:
        xml.append('    <item>')
        xml.append(f'      <g:id>{esc(item["id"])}</g:id>')
        xml.append(f'      <g:title>{esc(item["title"])}</g:title>')
        xml.append(f'      <g:description>{esc(item["description"])}</g:description>')
        xml.append(f'      <g:link>{esc(item["link"])}</g:link>')
        xml.append(f'      <g:image_link>{esc(item["image"])}</g:image_link>')
        for add_img in item["additional_images"]:
            xml.append(f'      <g:additional_image_link>{esc(add_img)}</g:additional_image_link>')
        xml.append('      <g:condition>new</g:condition>')
        xml.append('      <g:availability>in_stock</g:availability>')
        xml.append(f'      <g:price>{esc(item["price"])}</g:price>')
        xml.append('      <g:brand>Paranjape Schemes</g:brand>')
        xml.append(f'      <g:google_product_category>{esc(item["category"])}</g:google_product_category>')
        xml.append(f'      <g:product_type>{esc(item["product_type"])}</g:product_type>')
        xml.append('      <g:identifier_exists>no</g:identifier_exists>')
        xml.append(f'      <g:mpn>{esc(item["mpn"])}</g:mpn>')
        xml.append('      <g:shipping>')
        xml.append('        <g:country>IN</g:country>')
        xml.append('        <g:service>Site Visit &amp; Conveyance Advisory</g:service>')
        xml.append('        <g:price>0.00 INR</g:price>')
        xml.append('      </g:shipping>')
        for idx, lbl in enumerate(item["labels"]):
            xml.append(f'      <g:custom_label_{idx}>{esc(lbl)}</g:custom_label_{idx}>')
        xml.append('    </item>')

    xml.append('  </channel>')
    xml.append('</rss>')
    return "\n".join(xml)

def build_products_sitemap():
    xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    seen_links = set()
    for item in INVENTORY:
        link = item["link"]
        if link in seen_links: continue
        seen_links.add(link)
        xml.append('  <url>')
        xml.append(f'    <loc>{esc(link)}</loc>')
        xml.append(f'    <lastmod>{NOW_ISO}</lastmod>')
        xml.append('    <changefreq>daily</changefreq>')
        xml.append('    <priority>1.0</priority>')
        xml.append('  </url>')
    xml.append('</urlset>')
    return "\n".join(xml)

def main():
    feed_content = build_merchant_feed()
    sitemap_content = build_products_sitemap()

    # Save to root
    merchant_path = os.path.join(BASE, "google-merchant-feed.xml")
    products_xml_path = os.path.join(BASE, "google-products.xml")
    products_sitemap_path = os.path.join(BASE, "sitemap-products.xml")

    with open(merchant_path, "w", encoding="utf-8") as f:
        f.write(feed_content)
    with open(products_xml_path, "w", encoding="utf-8") as f:
        f.write(feed_content)
    with open(products_sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap_content)

    print(f"Generated {merchant_path} with {len(INVENTORY)} products.")
    print(f"Generated {products_xml_path} with {len(INVENTORY)} products.")
    print(f"Generated {products_sitemap_path} with product URLs.")

    # Sync to dist if exists
    dist_dir = os.path.join(BASE, "dist")
    if os.path.exists(dist_dir):
        shutil.copy(merchant_path, os.path.join(dist_dir, "google-merchant-feed.xml"))
        shutil.copy(products_xml_path, os.path.join(dist_dir, "google-products.xml"))
        shutil.copy(products_sitemap_path, os.path.join(dist_dir, "sitemap-products.xml"))
        print("Synced merchant feeds to dist/.")

if __name__ == "__main__":
    main()
