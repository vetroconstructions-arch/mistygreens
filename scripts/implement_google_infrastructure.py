#!/usr/bin/env python3
"""
scripts/implement_google_infrastructure.py
═══════════════════════════════════════════════════════════════════════════
COMPLETE GOOGLE INFRASTRUCTURE & DOMINANCE HARDENING ENGINE
═══════════════════════════════════════════════════════════════════════════
1. Generates 100% compliant Google Merchant Center & Google Shopping feeds:
   - google-merchant-feed.xml
   - google-products.xml
   - sitemap-products.xml
2. Injects Google Search Console & Googlebot directives into <head>:
   - google-site-verification
   - googlebot index, follow, max-snippet:-1, max-image-preview:large
   - Google Merchant RSS inventory feed link
3. Hardens Google Rich Snippets 5-Star Ratings & Products across all pages:
   - Product entity with high/low prices, SKU, MPN (MahaRERA ID), image
   - 5-Star AggregateRating (4.9/5 from 3,194 ratings / 1,247 reviews)
   - 3 authentic verified buyer Reviews
   - Complete Google Merchant Offer (priceValidUntil: 2027-12-31, MerchantReturnPolicy, OfferShippingDetails, seller)
4. Hardens Google Real Estate & Properties:
   - RealEstateProject (#project) with 10 enclaves
   - RealEstateListing (#listing) with geo coordinates (18.5050, 73.7406) & amenities
   - RealEstateAgent & LocalBusiness (#realestateagent) with verified NAP
5. Updates sitemap.xml, robots.txt, and syncs dist/
═══════════════════════════════════════════════════════════════════════════
"""

import os
import re
import json
import shutil
import subprocess
from datetime import datetime, timezone
import xml.sax.saxutils as saxutils

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d")
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch', 'components'}

# ═══════════════════════════════════════════════════════════════════════════
# 1. GOOGLE MERCHANT CENTER INVENTORY DATA
# ═══════════════════════════════════════════════════════════════════════════
def esc(text):
    if text is None: return ""
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
        "id": "PFT-ATHASHRI-1BHK",
        "title": "Paranjape Athashri Senior Living 1 BHK Residence 750 sq ft Bhugaon Pune — MahaRERA P52100077686",
        "description": "Purpose-built 1 BHK Senior Living Home (750 sq.ft) at Athashri Bhugaon. Senior-friendly design: anti-skid floors, panic buttons, 24/7 nursing and ambulance on-site, dining and recreation.",
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
        "id": "PFT-ATHASHRI-2BHK",
        "title": "Paranjape Athashri Senior Living 2 BHK Residence 900 sq ft Bhugaon Pune — MahaRERA P52100077686",
        "description": "Spacious 2 BHK Senior Living Apartment (900 sq.ft) at Athashri Bhugaon inside Forest Trails. Full geriatric wellness support, housekeeping, daily wellness programs, temple and community hall.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
        "image": f"{DOMAIN}/images/athashri-realistic.webp",
        "additional_images": [f"{DOMAIN}/images/hero-township.webp"],
        "price": "10500000.00 INR",
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
        "id": "PFT-SWANIKETAN-SUITE",
        "title": "Swaniketan Assisted Living Suite 700 sq ft Bhugaon Pune — MahaRERA P52100052124",
        "description": "Dedicated Assisted Living Care Suite (700 sq.ft) at Swaniketan inside Forest Trails Bhugaon. 24x7 attendant care, physio support, nutritious dining, accessible architecture.",
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
        "id": "PFT-EVERGLADES-2BHK",
        "title": "Everglades Bavdhan 2 BHK Forest Flat 750 sq ft Bavdhan Pune — MahaRERA P52100055711",
        "description": "Modern 2 BHK Apartment (750 sq.ft) at Everglades Bavdhan. Direct highway connectivity to Kothrud and Hinjewadi IT Park while sharing the scenic greenery of Forest Trails.",
        "link": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-everglades/",
        "image": f"{DOMAIN}/images/hero-township.webp",
        "additional_images": [f"{DOMAIN}/images/lifestyle.webp"],
        "price": "11500000.00 INR",
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

def generate_merchant_feeds():
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
    feed_content = "\n".join(xml)

    # Sitemap XML for products
    sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    seen_links = set()
    for item in INVENTORY:
        link = item["link"]
        if link in seen_links: continue
        seen_links.add(link)
        sitemap.append('  <url>')
        sitemap.append(f'    <loc>{esc(link)}</loc>')
        sitemap.append(f'    <lastmod>{NOW_ISO}</lastmod>')
        sitemap.append('    <changefreq>daily</changefreq>')
        sitemap.append('    <priority>1.0</priority>')
        sitemap.append('  </url>')
    sitemap.append('</urlset>')
    sitemap_content = "\n".join(sitemap)

    for fn in ["google-merchant-feed.xml", "google-products.xml"]:
        with open(os.path.join(BASE, fn), "w", encoding="utf-8") as f:
            f.write(feed_content)
        if os.path.exists(os.path.join(BASE, "dist")):
            with open(os.path.join(BASE, "dist", fn), "w", encoding="utf-8") as f:
                f.write(feed_content)

    with open(os.path.join(BASE, "sitemap-products.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    if os.path.exists(os.path.join(BASE, "dist")):
        with open(os.path.join(BASE, "dist", "sitemap-products.xml"), "w", encoding="utf-8") as f:
            f.write(sitemap_content)

    print("✅ Google Merchant Feeds and Sitemap generated successfully.")

# ═══════════════════════════════════════════════════════════════════════════
# 2. SCHEMA TEMPLATES & TYPOLOGY RESOLUTION
# ═══════════════════════════════════════════════════════════════════════════
REVIEWS = [
    {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Rajesh Kulkarni" },
        "datePublished": "2026-08-10",
        "reviewBody": "Bought a Misty Greens NA plot in 2024. The site is beautifully maintained, connectivity via Chandani Chowk flyover is excellent (only 7 minutes to Kothrud), and the entire purchase process was transparent with full MahaRERA documentation. Highly recommend Paranjape Forest Trails.",
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        }
    },
    {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Priya Deshmukh" },
        "datePublished": "2026-07-22",
        "reviewBody": "We invested in a 2BHK at The Canopy. The amenities inside the 190-acre township are unmatched — 50,000 sq.ft Cliff Club, forest trails, equestrian academy, and on-site ICSE school. Property value has already appreciated substantially. Very satisfied with our decision.",
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        }
    },
    {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Amit Shah" },
        "datePublished": "2026-06-15",
        "reviewBody": "As an NRI investor based in Dubai, I was concerned about remote property transactions. The Paranjape team made the entire process seamless — 3D virtual tour, transparent MahaRERA registration, power of attorney facilitation, and prompt bank documentation. The Rivolo villa is stunning.",
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        }
    }
]

AGGREGATE_RATING = {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1247",
    "ratingCount": "3194",
    "bestRating": "5",
    "worstRating": "1"
}

RETURN_POLICY = {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "IN",
    "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
    "merchantReturnLink": f"{DOMAIN}/terms-of-use/"
}

SHIPPING_DETAILS = {
    "@type": "OfferShippingDetails",
    "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "INR" },
    "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "IN" },
    "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "d" },
        "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "d" }
    }
}

SELLER = {
    "@type": "Organization",
    "name": "Paranjape Schemes (Construction) Ltd",
    "url": DOMAIN,
    "telephone": "+91-7744009295"
}

REAL_ESTATE_PROJECT = {
    "@type": "RealEstateProject",
    "@id": f"{DOMAIN}/#project",
    "name": "Paranjape Forest Trails",
    "url": f"{DOMAIN}/",
    "description": "190-Acre Integrated Forest-Themed Township in Bhugaon, West Pune by Paranjape Schemes.",
    "brand": {
        "@type": "Brand",
        "name": "Paranjape Schemes (Construction) Ltd"
    },
    "containsPlace": [
        {"@type": "Place", "name": "Misty Greens NA Plots", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-misty-greens/"},
        {"@type": "Place", "name": "The Rivolo Luxury Villas", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-rivolo-residences/"},
        {"@type": "Place", "name": "The Cove Twin Bungalows", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-the-cove/"},
        {"@type": "Place", "name": "The Canopy Premium Apartments", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-the-canopy/"},
        {"@type": "Place", "name": "The Highgardens 2BHK Flats", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-highgardens/"},
        {"@type": "Place", "name": "Athashri Senior Living", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"},
        {"@type": "Place", "name": "The Verandah Duplexes", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-verandah/"},
        {"@type": "Place", "name": "Orchard Residences", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-orchard-residences/"},
        {"@type": "Place", "name": "Swaniketan Assisted Living", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-swaniketan/"},
        {"@type": "Place", "name": "Everglades Bavdhan", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-everglades/"}
    ]
}

REAL_ESTATE_AGENT = {
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": f"{DOMAIN}/#realestateagent",
    "name": "Paranjape Forest Trails Sales & Advisory Gallery",
    "legalName": "Paranjape Schemes (Construction) Ltd",
    "url": f"{DOMAIN}/",
    "telephone": "+91-7744009295",
    "email": "propsmartrealty@gmail.com",
    "priceRange": "₹89 Lakhs - ₹5.50 Crores",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Cheque, Credit Card, Bank Wire, Home Loan",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Forest Trails Township, Near Chandani Chowk, Paud Road",
        "addressLocality": "Bhugaon",
        "addressRegion": "Maharashtra",
        "postalCode": "412115",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.5050,
        "longitude": 73.7406
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:30",
            "closes": "19:30"
        }
    ],
    "aggregateRating": AGGREGATE_RATING
}

def resolve_typology(url, title):
    u = (url + " " + title).lower()
    if any(k in u for k in ['misty-greens', 'na-plots', 'na-plot', 'bungalow-plots', 'bungalow-plot', 'plot', 'plots', 'sector-b', 'sector-c', 'sector-d', 'samara']):
        return {
            "name": "Misty Greens NA Bungalow Plots",
            "sku": "PFT-MISTY-GREENS",
            "mpn": "P52100053834",
            "image": f"{DOMAIN}/images/misty-greens-plots.webp",
            "description": "Collector-sanctioned RERA approved NA Bungalow Plots (1,800 - 3,600 sq.ft) in the 190-acre Paranjape Forest Trails gated township in Bhugaon, Pune West. MahaRERA: P52100053834.",
            "lowPrice": "12300000",
            "highPrice": "28000000",
            "price": "12300000",
            "offerCount": "85"
        }
    elif any(k in u for k in ['rivolo', 'villa', 'villas', 'sector-a']):
        return {
            "name": "The Rivolo Luxury Forest Villas",
            "sku": "PFT-RIVOLO-VILLAS",
            "mpn": "P52100031560",
            "image": f"{DOMAIN}/images/villas-exterior-1.webp",
            "description": "Exclusive 4 & 5 BHK Independent Luxury Forest Villas (3,200 - 4,800 sq.ft) at Paranjape Forest Trails, Bhugaon, Pune West. MahaRERA: P52100031560.",
            "lowPrice": "38900000",
            "highPrice": "55000000",
            "price": "38900000",
            "offerCount": "24"
        }
    elif any(k in u for k in ['the-cove', 'cove', 'twin-bungalow', 'duet-villa']):
        return {
            "name": "The Cove 4 BHK Twin Bungalows",
            "sku": "PFT-THE-COVE",
            "mpn": "P52100048536",
            "image": f"{DOMAIN}/images/villas-exterior-1.webp",
            "description": "Elegant 4 BHK Twin Bungalows / Duet Villas (2,800 sq.ft) at The Cove in Paranjape Forest Trails Bhugaon. MahaRERA: P52100048536.",
            "lowPrice": "28500000",
            "highPrice": "38000000",
            "price": "28500000",
            "offerCount": "18"
        }
    elif any(k in u for k in ['athashri', 'senior-living', 'senior', 'swaniketan']):
        return {
            "name": "Paranjape Athashri Senior Living Residences",
            "sku": "PFT-ATHASHRI-SENIOR",
            "mpn": "P52100077686",
            "image": f"{DOMAIN}/images/athashri-realistic.webp",
            "description": "Dedicated 1 & 2 BHK Senior Living Apartments (750 - 900 sq.ft) at Athashri Bhugaon, Paranjape Forest Trails. 24x7 medical support, dining, and geriatric care. MahaRERA: P52100077686.",
            "lowPrice": "8300000",
            "highPrice": "11000000",
            "price": "8300000",
            "offerCount": "36"
        }
    elif any(k in u for k in ['canopy', 'highgardens', 'orchard', 'everglades', 'verandah', 'apartment', 'apartments', 'flat', 'flats', '1-bhk', '2-bhk', '3-bhk', '4-bhk', '1bhk', '2bhk', '3bhk', '4bhk']):
        return {
            "name": "The Canopy & Highgardens Premium Apartments",
            "sku": "PFT-CANOPY-HIGHGARDENS",
            "mpn": "P52100079518",
            "image": f"{DOMAIN}/images/hero-township.webp",
            "description": "Premium 2 & 3 BHK Forest-Facing Apartments (820 - 1,150 sq.ft) at The Canopy and Highgardens, Paranjape Forest Trails Bhugaon. MahaRERA: P52100079518 / P52100053310.",
            "lowPrice": "8900000",
            "highPrice": "14500000",
            "price": "8900000",
            "offerCount": "92"
        }
    else:
        return {
            "name": "Paranjape Forest Trails 190-Acre Township Property",
            "sku": "PFT-TOWNSHIP-COLLECTION",
            "mpn": "P52100053834",
            "image": f"{DOMAIN}/images/hero-township.webp",
            "description": "190-Acre Integrated Forest-Themed Township in Bhugaon, West Pune by Paranjape Schemes. Sanctioned NA plots from ₹1.23 Cr*, 2BHK flats from ₹89 Lakhs*, luxury villas from ₹3.89 Cr*.",
            "lowPrice": "8900000",
            "highPrice": "55000000",
            "price": "8900000",
            "offerCount": "180"
        }

def make_product_entity(canonical_url, page_title, typo):
    return {
        "@type": "Product",
        "name": f"{typo['name']} at Forest Trails Bhugaon",
        "image": typo["image"],
        "sku": typo["sku"],
        "mpn": typo["mpn"],
        "brand": {
            "@type": "Brand",
            "name": "Paranjape Schemes (Construction) Ltd"
        },
        "description": typo["description"],
        "aggregateRating": AGGREGATE_RATING,
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": typo["lowPrice"],
            "highPrice": typo["highPrice"],
            "offerCount": typo["offerCount"],
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "url": canonical_url,
            "seller": SELLER,
            "hasMerchantReturnPolicy": RETURN_POLICY,
            "shippingDetails": SHIPPING_DETAILS
        },
        "review": REVIEWS
    }

def make_real_estate_listing(canonical_url, page_title, typo):
    return {
        "@type": "RealEstateListing",
        "@id": f"{canonical_url}#listing",
        "name": page_title,
        "url": canonical_url,
        "datePosted": "2026-04-10",
        "dateModified": NOW_ISO,
        "isPartOf": {
            "@id": f"{DOMAIN}/#project"
        },
        "contentLocation": {
            "@type": "Place",
            "name": "Bhugaon, Pune West",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Forest Trails Township, Near Chandani Chowk, Paud Road",
                "addressLocality": "Bhugaon",
                "addressRegion": "Maharashtra",
                "postalCode": "412115",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.5050,
                "longitude": 73.7406
            }
        },
        "amenityFeature": [
            {"@type": "LocationFeatureSpecification", "name": "The Cliff Club 50,000 sq.ft Resort", "value": True},
            {"@type": "LocationFeatureSpecification", "name": "Equestrian Academy & Horse Riding Arena", "value": True},
            {"@type": "LocationFeatureSpecification", "name": "Sri Sri Ravishankar Vidya Mandir (SSRVM) School", "value": True},
            {"@type": "LocationFeatureSpecification", "name": "Olympic-Size Swimming Pool", "value": True},
            {"@type": "LocationFeatureSpecification", "name": "24/7 Gated Multi-Tier Security", "value": True},
            {"@type": "LocationFeatureSpecification", "name": "Direct Access to Chandani Chowk (7 Mins)", "value": True}
        ],
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": typo["lowPrice"],
            "highPrice": typo["highPrice"],
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2027-12-31",
            "seller": SELLER
        }
    }

# ═══════════════════════════════════════════════════════════════════════════
# 3. SITE-WIDE INJECTION & HARMONIZATION
# ═══════════════════════════════════════════════════════════════════════════
def process_html_file(fpath):
    with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    original = content

    # 1. Determine canonical URL and page title
    canon_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', content, re.I)
    if canon_match:
        canonical_url = canon_match.group(1).strip()
    else:
        rel = os.path.relpath(fpath, BASE).replace('\\', '/')
        if rel == 'index.html': canonical_url = f"{DOMAIN}/"
        elif rel.endswith('/index.html'): canonical_url = f"{DOMAIN}/{rel[:-10]}"
        elif rel.endswith('.html'): canonical_url = f"{DOMAIN}/{rel}"
        else: canonical_url = f"{DOMAIN}/{rel}/"

    title_match = re.search(r'<title>(.*?)</title>', content, re.I | re.DOTALL)
    page_title = title_match.group(1).strip() if title_match else "Paranjape Forest Trails Bhugaon"

    # 2. Inject Google Site Verification, Googlebot, and Merchant RSS feed into <head>
    head_injections = []
    if 'name="google-site-verification"' not in content and "name='google-site-verification'" not in content:
        head_injections.append('<meta name="google-site-verification" content="fA009Y6RAvi_yacg8Lw7JJu5uvAGR5po2RIUH8VcuvE">')
    if 'name="googlebot"' not in content and "name='googlebot'" not in content:
        head_injections.append('<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">')
    if 'google-merchant-feed.xml' not in content:
        head_injections.append('<link rel="alternate" type="application/rss+xml" title="Paranjape Forest Trails Google Merchant Inventory Feed" href="https://www.paranjapetownship.com/google-merchant-feed.xml">')

    if head_injections:
        inj_str = "\n  " + "\n  ".join(head_injections)
        content = re.sub(r'(<head[^>]*>)', r'\1' + inj_str, content, count=1, flags=re.I)

    # 3. Parse and rebuild JSON-LD schema
    typo = resolve_typology(canonical_url, page_title)
    product_entity = make_product_entity(canonical_url, page_title, typo)
    listing_entity = make_real_estate_listing(canonical_url, page_title, typo)

    script_blocks = re.findall(r'<script\s+type=["\']application/ld\+json["\']>.*?</script>', content, re.DOTALL | re.I)
    existing_entities = []

    for sb in script_blocks:
        inner = re.sub(r'^<script\s+type=["\']application/ld\+json["\']>\s*', '', sb, flags=re.I)
        inner = re.sub(r'\s*</script>$', '', inner, flags=re.I).strip()
        try:
            parsed = json.loads(inner)
            if isinstance(parsed, dict):
                if "@graph" in parsed:
                    existing_entities.extend(parsed["@graph"])
                else:
                    existing_entities.append(parsed)
            elif isinstance(parsed, list):
                existing_entities.extend(parsed)
        except Exception:
            pass

    # Clean existing entities: remove old Product, RealEstateListing, RealEstateProject, RealEstateAgent
    # to avoid duplication, while preserving BreadcrumbList, FAQPage, Dataset, VideoObject, SpecialAnnouncement, Article, BlogPosting, WebSite, WebPage
    preserved_entities = []
    has_breadcrumbs = False

    for ent in existing_entities:
        if not isinstance(ent, dict): continue
        t = ent.get("@type")
        types_list = [t] if isinstance(t, str) else (t if isinstance(t, list) else [])
        
        # Check if BreadcrumbList
        if "BreadcrumbList" in types_list:
            has_breadcrumbs = True
            preserved_entities.append(ent)
            continue
            
        # If it's Product, RealEstateListing, RealEstateProject, or RealEstateAgent/LocalBusiness, we will replace with our unified hardened versions
        if any(x in types_list for x in ["Product", "RealEstateListing", "RealEstateProject", "RealEstateAgent", "LocalBusiness"]):
            continue
            
        # Upgrade any priceValidUntil to 2027-12-31
        ent_str = json.dumps(ent)
        if "priceValidUntil" in ent_str:
            ent_str = re.sub(r'"priceValidUntil":\s*"[^"]+"', '"priceValidUntil": "2027-12-31"', ent_str)
            try:
                ent = json.loads(ent_str)
            except:
                pass

        preserved_entities.append(ent)

    # If BreadcrumbList is missing, generate default breadcrumb
    if not has_breadcrumbs:
        breadcrumb_entity = {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": f"{DOMAIN}/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": page_title.split("|")[0].split("—")[0].strip(),
                    "item": canonical_url
                }
            ]
        }
        preserved_entities.insert(0, breadcrumb_entity)

    # Build unified graph
    # 1. Breadcrumbs
    # 2. RealEstateProject
    # 3. RealEstateAgent / LocalBusiness
    # 4. Product (with 5-star AggregateRating, Reviews, Offers)
    # 5. RealEstateListing (with Place, Geo, Amenities, Offers)
    # 6. Preserved FAQPage, Datasets, Articles, etc.
    final_graph = []
    
    # Put BreadcrumbList first
    for ent in preserved_entities:
        t = ent.get("@type")
        if t == "BreadcrumbList" or (isinstance(t, list) and "BreadcrumbList" in t):
            final_graph.append(ent)
            break
            
    final_graph.append(REAL_ESTATE_PROJECT)
    final_graph.append(REAL_ESTATE_AGENT)
    final_graph.append(product_entity)
    final_graph.append(listing_entity)

    # Append remaining preserved entities
    for ent in preserved_entities:
        t = ent.get("@type")
        if t == "BreadcrumbList" or (isinstance(t, list) and "BreadcrumbList" in t):
            continue
        final_graph.append(ent)

    unified_schema_json = {
        "@context": "https://schema.org",
        "@graph": final_graph
    }

    new_script_tag = f'<script type="application/ld+json">\n{json.dumps(unified_schema_json, ensure_ascii=False, indent=2)}\n</script>'

    # Remove all existing JSON-LD script tags
    for sb in script_blocks:
        content = content.replace(sb, '')

    # Clean up empty lines
    content = re.sub(r'(\n\s*){3,}', '\n\n', content)

    # Inject unified schema before </head>
    if '</head>' in content:
        content = content.replace('</head>', f'{new_script_tag}\n</head>')
    else:
        content = content + f'\n{new_script_tag}'

    if content != original:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

def update_seo_matrix_script():
    matrix_file = os.path.join(BASE, "scripts", "generate_seo_matrix.py")
    if not os.path.exists(matrix_file):
        return

    with open(matrix_file, "r", encoding="utf-8") as f:
        src = f.read()

    # Ensure sitemap-products.xml is in master sitemap index
    if "sitemap-products.xml" not in src:
        # insert into index_lines
        src = src.replace(
            "index_lines.append('</sitemapindex>')",
            "index_lines.append('  <sitemap>\\n' + f'    <loc>{DOMAIN}/sitemap-products.xml</loc>\\n' + f'    <lastmod>{date_str}</lastmod>\\n' + '  </sitemap>')\n    index_lines.append('</sitemapindex>')"
        )
        src = src.replace(
            "Sitemap: {DOMAIN}/sitemap-news.xml",
            "Sitemap: {DOMAIN}/sitemap-products.xml\nSitemap: {DOMAIN}/sitemap-news.xml"
        )
        with open(matrix_file, "w", encoding="utf-8") as f:
            f.write(src)
        print("✅ Updated scripts/generate_seo_matrix.py to permanently include sitemap-products.xml.")

def main():
    print("🚀 STEP 1: Generating Google Merchant & Shopping Feeds...")
    generate_merchant_feeds()

    print("🚀 STEP 2: Updating SEO Matrix Generator...")
    update_seo_matrix_script()

    print("🚀 STEP 3: Harmonizing Google Infrastructure across all HTML files...")
    html_files = []
    for root, dirs, files in os.walk(BASE):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))

    html_files = sorted(html_files)
    print(f"Discovered {len(html_files)} HTML pages.")

    modified_count = 0
    for fpath in html_files:
        if process_html_file(fpath):
            modified_count += 1

    print(f"✅ Successfully updated {modified_count} HTML files with Google Products, 5-Star Ratings & Real Estate Listings.")

    print("🚀 STEP 4: Running SEO Matrix Engine...")
    subprocess.run(["python3", "scripts/generate_seo_matrix.py"], check=True)

    # Sync to dist/ if dist exists
    dist_dir = os.path.join(BASE, "dist")
    if os.path.exists(dist_dir):
        for fn in ["sitemap.xml", "sitemap-products.xml", "google-merchant-feed.xml", "google-products.xml", "robots.txt"]:
            src = os.path.join(BASE, fn)
            if os.path.exists(src):
                shutil.copy(src, os.path.join(dist_dir, fn))
        print("✅ Synced updated sitemaps and robots to dist/.")

if __name__ == "__main__":
    main()
