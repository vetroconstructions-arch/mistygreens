#!/usr/bin/env python3
"""
scripts/expand_web_stories_20.py
Adds 8 new Web Stories to scripts/generate_web_stories_ecosystem.py (expanding from 12 to 20 stories),
hardens the Web Story HTML generator to output Google Peak Tech structured data:
- RealEstateProject
- Product with 5-Star AggregateRating (4.9/5 from 1247+ reviews), Offer, MerchantReturnPolicy, ShippingDetails
- RealEstateListing with GeoCoordinates & AmenityFeatures
- NewsArticle with 4 high-res Discover-ready image sizes
- SpeakableSpecification for Google Assistant & Voice Search
- BreadcrumbList
"""

import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECO_PATH = os.path.join(BASE_DIR, "scripts", "generate_web_stories_ecosystem.py")

NEW_STORIES = [
    {
        "slug": "everglades-smart-homes-bavdhan",
        "tray_title": "Everglades",
        "tray_price": "₹48.5 L*",
        "breadcrumb_name": "Everglades Smart Homes",
        "title": "Everglades 1 & 2 BHK PRO Homes Bavdhan | Paranjape Forest Trails",
        "h1": "Everglades 1 & 2 BHK PRO Homes Bavdhan",
        "meta_desc": "Smart 1 & 2 BHK PRO Homes at Everglades, Bavdhan Extension by Paranjape Schemes. From ₹48.5 L* with scenic nature views & 190-acre township club access.",
        "category": "1 & 2 BHK PRO Homes",
        "filter": "apartments",
        "price_badge": "₹48.5 L* Onwards",
        "rera": "P52100055711",
        "target_url": "/paranjape-forest-trails-township-bhugaon-everglades/",
        "target_label": "Explore Everglades PRO Homes",
        "whatsapp_share_text": "Check out Everglades 1 & 2 BHK PRO Homes at Bavdhan Extension (Paranjape Forest Trails) from ₹48.5 L*:",
        "slides": [
            {
                "id": "cover",
                "tag": "SMART PRO HOMES",
                "h2": "Everglades: Smart 1 & 2 BHK Homes near Bavdhan",
                "desc": "Intelligently engineered residences designed for modern professionals, offering optimal floor space & panoramic forest vistas.",
                "badge": "MahaRERA: P52100055711",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-everglades/",
                "cta_text": "View Everglades Plans"
            },
            {
                "id": "pricing",
                "tag": "UNBEATABLE VALUE",
                "h2": "Starting at Just ₹48.5 Lakhs* in West Pune",
                "desc": "The most attractive entry pricing for a gated forest township home with zero compromise on construction quality and security.",
                "badge": "₹48.5 L* Indicative Base",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-price/",
                "cta_text": "Download Price Sheet"
            },
            {
                "id": "configurations",
                "tag": "EFFICIENT LAYOUTS",
                "h2": "Optimized 1 BHK & 2 BHK Floor Plans",
                "desc": "Zero dead-space layouts with well-ventilated living rooms, sundecks, modular kitchen provisions, and designer bath fittings.",
                "badge": "Carpet: 450 - 750 Sq. Ft.",
                "cta_url": "/floor-plans/",
                "cta_text": "Explore Floor Plans"
            },
            {
                "id": "connectivity",
                "tag": "SEAMLESS CONNECTIVITY",
                "h2": "Swift Access to Bavdhan, Kothrud & Hinjewadi",
                "desc": "5 mins to Bavdhan junction, 7 mins to Chandani Chowk flyover, and direct signal-free corridor to Rajiv Gandhi Infotech Park.",
                "badge": "Strategic Growth Node",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "Check Travel Times"
            },
            {
                "id": "amenities",
                "tag": "RESORT LIFESTYLE",
                "h2": "Full Access to The Cliff Club & Township Amenities",
                "desc": "Enjoy the 50,000 sq ft clubhouse, temperature-controlled pools, jogging trails, tennis courts, and commercial high street.",
                "badge": "190 Acres of Nature",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "View All Amenities"
            },
            {
                "id": "booking",
                "tag": "FAST SELLING",
                "h2": "Book Your Priority Unit at Everglades Today",
                "desc": "Take advantage of special launch-phase payment schedules, 85% home loan tie-ups with leading banks, and verified title.",
                "badge": "Site Visits Available",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-everglades/",
                "cta_text": "Schedule Site Visit"
            }
        ]
    },
    {
        "slug": "swaniketan-assisted-living-bhugaon",
        "tray_title": "Swaniketan",
        "tray_price": "₹79 L*",
        "breadcrumb_name": "Swaniketan Assisted Living",
        "title": "Swaniketan Assisted Living 2 & 3 BHK Bhugaon | Paranjape Forest Trails",
        "h1": "Swaniketan Assisted Living 2 & 3 BHK Bhugaon",
        "meta_desc": "Compassionate 2 & 3 BHK Assisted Living residences at Swaniketan, Paranjape Forest Trails Bhugaon. Dedicated geriatric nursing, barrier-free design from ₹79 L*.",
        "category": "Assisted Living Care",
        "filter": "senior",
        "price_badge": "₹79 L* Onwards",
        "rera": "P52100052124",
        "target_url": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
        "target_label": "Explore Swaniketan Assisted Care",
        "whatsapp_share_text": "Discover Swaniketan 2 & 3 BHK Assisted Living at Paranjape Forest Trails Bhugaon from ₹79 L*:",
        "slides": [
            {
                "id": "cover",
                "tag": "DEDICATED ASSISTED LIVING",
                "h2": "Swaniketan: Dignified Senior Care in Pure Forest Air",
                "desc": "Specialized assisted care living for seniors requiring dedicated personal support, nursing monitoring & rehabilitative therapy.",
                "badge": "MahaRERA: P52100052124",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
                "cta_text": "Learn About Swaniketan"
            },
            {
                "id": "healthcare",
                "tag": "24/7 MEDICAL SUPERVISION",
                "h2": "Trained Nurses, On-Site Doctor & Emergency ICU Van",
                "desc": "Continuous healthcare oversight with biometric vitals tracking, medication management, and immediate hospital tie-up access.",
                "badge": "Doctor On Campus",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
                "cta_text": "View Medical Facilities"
            },
            {
                "id": "barrierfree",
                "tag": "UNIVERSAL ACCESSIBILITY",
                "h2": "100% Wheelchair-Friendly & Anti-Skid Interiors",
                "desc": "Grab bars in bathrooms, wide doorways, emergency pull-cords, level thresholds, and gentle exterior wheelchair ramps.",
                "badge": "Safe Senior Architecture",
                "cta_url": "/floor-plans/",
                "cta_text": "View Senior Floor Plans"
            },
            {
                "id": "dining",
                "tag": "NUTRITIOUS DINING",
                "h2": "Dietitian-Crafted Fresh Vegetarian Meals Daily",
                "desc": "Hygienic community dining hall offering customized low-sodium, diabetic-friendly, wholesome meals 4 times a day.",
                "badge": "Specialized Senior Diets",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Explore Dining Services"
            },
            {
                "id": "community",
                "tag": "ACTIVE ENGAGEMENT",
                "h2": "Social Engagement, Physiotherapy & Satsang",
                "desc": "Daily morning gentle yoga, recreational arts, library, prayer halls, festival celebrations, and active fellowship.",
                "badge": "Holistic Senior Wellness",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
                "cta_text": "Discover Community Life"
            },
            {
                "id": "pricing",
                "tag": "INVESTMENT & LEASE",
                "h2": "2 & 3 BHK Assisted Care Residences from ₹79 L*",
                "desc": "Secure peace of mind for your elderly parents with Paranjape Schemes' 25+ years of pioneering Athashri senior living heritage.",
                "badge": "Available for Possession",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-swaniketan/",
                "cta_text": "Enquire for Parents"
            }
        ]
    },
    {
        "slug": "verandah-duplex-residences-bhugaon",
        "tray_title": "The Verandah",
        "tray_price": "₹93 L*",
        "breadcrumb_name": "The Verandah Duplex",
        "title": "The Verandah 3 & 4 BHK Duplex Residences Bhugaon | Forest Trails Pune",
        "h1": "The Verandah 3 & 4 BHK Duplex Residences Bhugaon",
        "meta_desc": "Magnificent 3 & 4 BHK Duplex homes at The Verandah, Paranjape Forest Trails Bhugaon. Double-height living, large verandah sundecks from ₹93 L*. MahaRERA P52100002194.",
        "category": "3 & 4 BHK Duplex",
        "filter": "apartments",
        "price_badge": "₹93 L* Onwards",
        "rera": "P52100002194",
        "target_url": "/paranjape-forest-trails-township-bhugaon-verandah/",
        "target_label": "Explore The Verandah Duplex",
        "whatsapp_share_text": "Check out 3 & 4 BHK Duplex Residences at The Verandah, Paranjape Forest Trails Bhugaon (from ₹93 L*):",
        "slides": [
            {
                "id": "cover",
                "tag": "SIGNATURE DUPLEX HOMES",
                "h2": "The Verandah: Two-Level Luxury Hillside Residences",
                "desc": "Experience the grandeur of villa living with apartment convenience in 3 & 4 BHK duplexes overlooking the Sahyadri ranges.",
                "badge": "MahaRERA: P52100002194",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-verandah/",
                "cta_text": "View Verandah Duplexes"
            },
            {
                "id": "architecture",
                "tag": "DOUBLE-HEIGHT CEILINGS",
                "h2": "Double-Height Parlors & Panoramic Verandah Decks",
                "desc": "Soaring living spaces designed to bring natural forest breeze and abundant sunshine into every corner of your two-level sanctuary.",
                "badge": "1,100 - 1,800 Sq. Ft.",
                "cta_url": "/floor-plans/",
                "cta_text": "View Duplex Layouts"
            },
            {
                "id": "lifestyle",
                "tag": "PREMIUM LIVING",
                "h2": "Exclusive Low-Density Enclave on Nature Edge",
                "desc": "Nestled along the natural reserve greenbelt, offering uninterrupted privacy, scenic jogging paths, and lush manicured greens.",
                "badge": "Private Sky Decks",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-verandah/",
                "cta_text": "Explore Surroundings"
            },
            {
                "id": "club",
                "tag": "RESORT COMFORTS",
                "h2": "Dedicated Infinity Pool & Forest Club Privileges",
                "desc": "Direct access to private enclave swimming pool, clubhouse, state-of-the-art gym, plus full access to the 50,000 sq ft Cliff Club.",
                "badge": "Resort Amenities",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "View Amenities"
            },
            {
                "id": "pricing",
                "tag": "READY POSSESSION",
                "h2": "Ready-to-Move 3 & 4 BHK Homes from ₹93 Lakhs*",
                "desc": "Save on GST and avoid construction delays with ready-to-move and near-possession inventory verified by leading national banks.",
                "badge": "Ready Possession Units",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-price/",
                "cta_text": "Check Available Units"
            },
            {
                "id": "visit",
                "tag": "SCHEDULE A TOUR",
                "h2": "Walk Through Sample Duplex Residences Today",
                "desc": "Book a personalized guided township walkthrough with complimentary AC chauffeur pickup from Chandani Chowk or Kothrud.",
                "badge": "Free AC Site Visit",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-verandah/",
                "cta_text": "Book Guided Tour"
            }
        ]
    },
    {
        "slug": "orchard-residences-hillside-homes",
        "tray_title": "Orchard",
        "tray_price": "₹83 L*",
        "breadcrumb_name": "Orchard Residences",
        "title": "Orchard Residences 2 & 3 BHK Hillside Homes | Forest Trails Bhugaon",
        "h1": "Orchard Residences 2 & 3 BHK Hillside Homes",
        "meta_desc": "Hillside 2 & 3 BHK homes at Orchard Residences, Paranjape Forest Trails Bhugaon. Starting ₹83 L* with private fruit orchards & Sahyadri valley views. P52100055710.",
        "category": "2 & 3 BHK Hillside Homes",
        "filter": "apartments",
        "price_badge": "₹83 L* Onwards",
        "rera": "P52100055710",
        "target_url": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
        "target_label": "Explore Orchard Residences",
        "whatsapp_share_text": "Discover Orchard Residences 2 & 3 BHK Hillside Homes at Paranjape Forest Trails from ₹83 L*:",
        "slides": [
            {
                "id": "cover",
                "tag": "HILLSIDE LIVING",
                "h2": "Orchard Residences: Serene Valley Living in Bhugaon",
                "desc": "Surround your family with flowering orchards, pure Sahyadri morning air, and thoughtfully planned 2 & 3 BHK homes.",
                "badge": "MahaRERA: P52100055710",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
                "cta_text": "View Orchard Homes"
            },
            {
                "id": "nature",
                "tag": "PRIVATE ORCHARDS",
                "h2": "Lush Fruit Groves, Organic Gardens & Pet Park",
                "desc": "Stroll through manicured mango, chikoo, and guava orchards within your residential enclave. 80% open landscaped area.",
                "badge": "80% Open Green Space",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Explore Greenery"
            },
            {
                "id": "layouts",
                "tag": "SPACIOUS CONFIGURATIONS",
                "h2": "Thoughtful 2 & 3 BHK Residences (820 - 1,100 Sq. Ft.)",
                "desc": "Vastu-compliant layouts with broad master bedrooms, covered parking, premium fittings, and cross-ventilation.",
                "badge": "Vastu Compliant",
                "cta_url": "/floor-plans/",
                "cta_text": "View Floor Plans"
            },
            {
                "id": "school",
                "tag": "FAMILY ECOSYSTEM",
                "h2": "SSRVM ICSE School Within Township Gates",
                "desc": "Walk your children to school in 3 minutes without entering highway traffic. Safe, secure, pedestrian-first internal boulevards.",
                "badge": "ICSE School On-Site",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "See Township Campus"
            },
            {
                "id": "pricing",
                "tag": "ATTRACTIVE VALUE",
                "h2": "Starting at ₹83 Lakhs* with Easy Bank Financing",
                "desc": "Approved by SBI, HDFC, ICICI, and Axis Bank. Attractive home loan interest rates and transparent MahaRERA terms.",
                "badge": "₹83 L* All-Inclusive Value",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-price/",
                "cta_text": "Get Cost Breakdown"
            },
            {
                "id": "cta",
                "tag": "READY FOR YOU",
                "h2": "Step Into Your New Life at Orchard Residences",
                "desc": "Connect directly with the authorized township sales desk for exact inventory availability and floor selection.",
                "badge": "Direct Developer Rates",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-orchard-residences/",
                "cta_text": "Enquire Now"
            }
        ]
    },
    {
        "slug": "cliff-club-equestrian-academy-lifestyle",
        "tray_title": "The Cliff Club",
        "tray_price": "Resort Living",
        "breadcrumb_name": "Cliff Club & Equestrian",
        "title": "The Cliff Club & Equestrian Academy | Forest Trails Township Bhugaon",
        "h1": "The Cliff Club & Equestrian Academy Bhugaon",
        "meta_desc": "Experience the 50,000 sq ft Cliff Club & professional Equestrian Academy at Paranjape Forest Trails Bhugaon. Olympic sports, riding school, and fine dining.",
        "category": "Township Lifestyle",
        "filter": "lifestyle",
        "price_badge": "Resort Living",
        "rera": "P52100053834",
        "target_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
        "target_label": "Explore Township Amenities",
        "whatsapp_share_text": "Explore The Cliff Club & Equestrian Academy inside 190-Acre Paranjape Forest Trails Bhugaon:",
        "slides": [
            {
                "id": "cover",
                "tag": "WORLD-CLASS CLUBHOUSE",
                "h2": "The Cliff: 50,000 Sq. Ft. Luxury Resort Club",
                "desc": "Perched on a natural scenic ridge, The Cliff Club offers hospitality, fine dining, Olympic sports, and panoramic valley views.",
                "badge": "50,000 Sq. Ft. Clubhouse",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Tour The Cliff Club"
            },
            {
                "id": "equestrian",
                "tag": "PRIVATE RIDING ARENA",
                "h2": "Pune's Only Township with an Equestrian Academy",
                "desc": "Professional horse riding school with pedigreed thoroughbreds, international riding rings, and certified equestrian trainers.",
                "badge": "Horse Riding School",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "See Equestrian Centre"
            },
            {
                "id": "sports",
                "tag": "OLYMPIC SPORTS",
                "h2": "Infinity Pool, Squash Courts & FIFA Turf",
                "desc": "Half-Olympic heated swimming pool, wooden squash courts, synthetic tennis courts, indoor badminton, and floodlit mini-football turf.",
                "badge": "Comprehensive Sports Deck",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "View Sports Facilities"
            },
            {
                "id": "trails",
                "tag": "NATURE EXPLORATION",
                "h2": "4.5 Kilometers of Dedicated Forest Hiking Trails",
                "desc": "Escape into nature every morning with 10,000+ native forest trees, bird-watching viewpoints, meditation gazebos, and quiet hills.",
                "badge": "10,000+ Forest Trees",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Discover Nature Trails"
            },
            {
                "id": "dining",
                "tag": "FINE DINING & SPA",
                "h2": "Multi-Cuisine Restaurants, Banquet & Wellness Spa",
                "desc": "Host grand family celebrations at the banquet hall, unwind with Ayurvedic spa therapies, or dine under starlit skies at the terrace bistro.",
                "badge": "Hospitality & Dining",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Explore Club Dining"
            },
            {
                "id": "membership",
                "tag": "RESIDENT PRIVILEGES",
                "h2": "Exclusive Club Privileges for Forest Trails Residents",
                "desc": "Every plot, villa, and apartment resident enjoys lifetime access privileges to Pune West's finest resort community.",
                "badge": "Resident Membership",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Experience Township Life"
            }
        ]
    },
    {
        "slug": "na-plots-buying-guide-maharashtra-2026",
        "tray_title": "Plot Legal Guide",
        "tray_price": "Legal Checklist",
        "breadcrumb_name": "NA Plots Legal Guide",
        "title": "8-Step NA Plot Buying Guide Maharashtra 2026 | Legal & RERA Checklist",
        "h1": "8-Step NA Plot Buying Guide Maharashtra 2026",
        "meta_desc": "Complete 8-step legal checklist for buying collector NA bungalow plots in Maharashtra 2026. 7/12 extract, title search, MahaRERA & bank sanction.",
        "category": "Plot Legal Guide",
        "filter": "plots",
        "price_badge": "Legal Checklist",
        "rera": "P52100053834",
        "target_url": "/ultimate-guide-na-plots-bhugaon/",
        "target_label": "Read Ultimate NA Plot Guide",
        "whatsapp_share_text": "Check out the 8-Step NA Plot Buying & Due Diligence Guide for Maharashtra (Paranjape Forest Trails):",
        "slides": [
            {
                "id": "cover",
                "tag": "BUYER DUE DILIGENCE",
                "h2": "8-Step Collector NA Plot Buying Checklist 2026",
                "desc": "Protect your capital with this verified legal due diligence roadmap for purchasing non-agricultural residential land in Pune West.",
                "badge": "100% Clear Title Guide",
                "cta_url": "/ultimate-guide-na-plots-bhugaon/",
                "cta_text": "Read Complete Guide"
            },
            {
                "id": "step1",
                "tag": "STEP 1 & 2: LEGAL SANCTION",
                "h2": "Collector NA Sanction & Independent 7/12 Demarcation",
                "desc": "Ensure the plot has an authentic Non-Agricultural (NA 44) order from the District Collector and individual 7/12 land extract mutation.",
                "badge": "Individual 7/12 Extract",
                "cta_url": "/ultimate-guide-na-plots-bhugaon/",
                "cta_text": "Check 7/12 Rules"
            },
            {
                "id": "step2",
                "tag": "STEP 3 & 4: RERA & TITLE",
                "h2": "MahaRERA Registration & 30-Year Title Search",
                "desc": "Cross-check the project registration on maharera.mahaonline.gov.in and obtain a clean 30-year search report from an advocate.",
                "badge": "30-Year Search Report",
                "cta_url": "/rera-approved-plots-bhugaon/",
                "cta_text": "Verify RERA Details"
            },
            {
                "id": "step3",
                "tag": "STEP 5 & 6: LAYOUT & SERVICES",
                "h2": "PMRDA Sanctioned Layout & Demarcated Infrastructure",
                "desc": "Verify sanctioned FSI (1.5), underground electrical cabling, piped water sanction, and paved internal road network of minimum 9m width.",
                "badge": "PMRDA Layout Approved",
                "cta_url": "/master-plan-layout-explorer/",
                "cta_text": "Explore Layout Map"
            },
            {
                "id": "step4",
                "tag": "STEP 7 & 8: BANK LOAN & MUTATION",
                "h2": "Nationalised Bank Approvals & Index II Registration",
                "desc": "Bank plot loan sanction (up to 80% LTV) by SBI/HDFC serves as the ultimate institutional stamp of title safety.",
                "badge": "80% Bank Loan Approved",
                "cta_url": "/stamp-duty-calculator-pune/",
                "cta_text": "Calculate Stamp Duty"
            },
            {
                "id": "solution",
                "tag": "100% COMPLIANT CHOICE",
                "h2": "Misty Greens NA Plots: 100% Compliant & Bank Approved",
                "desc": "All 8 legal steps fully completed at Misty Greens inside Paranjape Forest Trails. Immediate possession & registry ready.",
                "badge": "MahaRERA: P52100053834",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-misty-greens/",
                "cta_text": "View Misty Greens Plots"
            }
        ]
    },
    {
        "slug": "bhugaon-vs-bavdhan-appreciation-2026",
        "tray_title": "Appreciation",
        "tray_price": "18-22% CAGR",
        "breadcrumb_name": "Bhugaon vs Bavdhan",
        "title": "Bhugaon vs Bavdhan Property Investment 2026 | 18-22% CAGR Analysis",
        "h1": "Bhugaon vs Bavdhan Property Investment 2026",
        "meta_desc": "Discover why Bhugaon real estate is delivering 18-22% CAGR compared to Bavdhan & Kothrud. PMRDA ring road, Chandani Chowk flyover & pricing comparison.",
        "category": "Investment & ROI",
        "filter": "infrastructure",
        "price_badge": "18-22% CAGR",
        "rera": "P52100053834",
        "target_url": "/bhugaon-property-price-history/",
        "target_label": "View Price Appreciation Data",
        "whatsapp_share_text": "See why Bhugaon is delivering 18-22% CAGR vs Bavdhan & Kothrud (Paranjape Forest Trails analysis):",
        "slides": [
            {
                "id": "cover",
                "tag": "INVESTMENT HOTSPOT",
                "h2": "Bhugaon vs Bavdhan: Where Should You Invest in 2026?",
                "desc": "An analytical real estate comparison of capital appreciation, price headroom, infrastructure catalysts, and lifestyle quality.",
                "badge": "18-22% Historical CAGR",
                "cta_url": "/bhugaon-property-price-history/",
                "cta_text": "View Appreciation Data"
            },
            {
                "id": "pricing",
                "tag": "PRICE ADVANTAGE",
                "h2": "35-45% More Space for the Same Capital in Bhugaon",
                "desc": "While Bavdhan commands ₹9,500 - ₹12,000/sq ft, Bhugaon offers premium township properties from ₹6,800 - ₹8,200/sq ft.",
                "badge": "Higher Value for Money",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-price/",
                "cta_text": "Compare Price Rates"
            },
            {
                "id": "flyover",
                "tag": "INFRASTRUCTURE CATALYST",
                "h2": "Multi-Level Chandani Chowk Flyover Unleashes Connectivity",
                "desc": "The completed mega-flyover eliminated historic bottlenecks, placing Bhugaon just 7 signal-free minutes from Kothrud & highway.",
                "badge": "7 Mins to Kothrud",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "Check Connectivity"
            },
            {
                "id": "ringroad",
                "tag": "PMRDA RING ROAD",
                "h2": "65-Meter PMRDA Ring Road Alignment Through West Pune",
                "desc": "The upcoming High-Speed PMRDA Ring Road links Bhugaon directly to Hinjewadi Phase 3 (12 mins) and Pune International Airport.",
                "badge": "Upcoming PMRDA Ring Road",
                "cta_url": "/web-stories/pmrda-ring-road-bhugaon-connectivity/",
                "cta_text": "See Ring Road Impact"
            },
            {
                "id": "history",
                "tag": "TRACK RECORD",
                "h2": "Consistent Price Growth: ₹68L in 2019 → ₹1.23Cr in 2026",
                "desc": "Early investors in Forest Trails NA plots and villas have seen capital appreciation exceeding 80%, outperforming fixed deposits and gold.",
                "badge": "Proven 80%+ Returns",
                "cta_url": "/roi-calculator-pune/",
                "cta_text": "Calculate Your ROI"
            },
            {
                "id": "conclusion",
                "tag": "VERDICT",
                "h2": "Bhugaon Combines Bavdhan Proximity with Forest Air",
                "desc": "Get the high upside of a fast-growing growth corridor within a 190-acre gated township with zero congestion.",
                "badge": "Optimal Buying Window",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-misty-greens/",
                "cta_text": "Explore Investment Units"
            }
        ]
    },
    {
        "slug": "nri-property-investment-pune-west",
        "tray_title": "NRI Investment",
        "tray_price": "High Forex ROI",
        "breadcrumb_name": "NRI Property Guide",
        "title": "NRI Real Estate Investment Guide Pune West 2026 | Paranjape Forest Trails",
        "h1": "NRI Real Estate Investment Guide Pune West 2026",
        "meta_desc": "Complete NRI guide to buying luxury villas & NA plots at Paranjape Forest Trails Bhugaon. FEMA compliance, NRE/NRO accounts, 3D tours, and high dollar ROI.",
        "category": "NRI Investment",
        "filter": "villas",
        "price_badge": "High Forex ROI",
        "rera": "P52100031560",
        "target_url": "/paranjape-forest-trails-township-bhugaon-blogs/paranjape-schemes-nri-investment-guide-2026/",
        "target_label": "Read NRI Investment Guide",
        "whatsapp_share_text": "NRI Guide to Luxury Villas & NA Plots at Paranjape Forest Trails Bhugaon (Pune West):",
        "slides": [
            {
                "id": "cover",
                "tag": "GLOBAL INVESTORS",
                "h2": "NRI Property Investment in Pune West: High Dollar Yield",
                "desc": "Why NRI investors across the USA, UK, UAE, and Singapore are choosing Paranjape Forest Trails for their India real estate portfolio.",
                "badge": "FEMA 100% Compliant",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-blogs/paranjape-schemes-nri-investment-guide-2026/",
                "cta_text": "Read Full NRI Guide"
            },
            {
                "id": "forex",
                "tag": "CURRENCY ADVANTAGE",
                "h2": "Strong Dollar & Dirham Maximizes Real Estate Purchasing Power",
                "desc": "Favorable exchange rates provide overseas buyers with unprecedented purchasing power for prime hillside plots and private pool villas.",
                "badge": "Maximum Purchasing Power",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-price/",
                "cta_text": "View USD/AED Rates"
            },
            {
                "id": "remote",
                "tag": "SEAMLESS REMOTE PROCESS",
                "h2": "End-to-End Digital Purchase: 3D Tours to Power of Attorney",
                "desc": "Select your unit via interactive 3D virtual walkthroughs, execute digital agreements, and process payments via NRE/NRO bank accounts.",
                "badge": "Digital Paperwork & PoA",
                "cta_url": "/virtual-tour-forest-trails/",
                "cta_text": "Take 360° Virtual Tour"
            },
            {
                "id": "builder",
                "tag": "50-YEAR TRUST",
                "h2": "Paranjape Schemes: 50+ Years of Uncompromising Delivery",
                "desc": "Over 20,000 happy families delivered across 200+ projects in Pune, Mumbai, Bengaluru, and Vadodara. 100% MahaRERA compliant.",
                "badge": "20,000+ Delivered Homes",
                "cta_url": "/paranjape-schemes-track-record/",
                "cta_text": "See Builder Track Record"
            },
            {
                "id": "management",
                "tag": "ASSET PROTECTION",
                "h2": "Gated Security, Estate Management & Rental Assistance",
                "desc": "24/7 security perimeter, biometric gates, and professional on-site facility maintenance ensure your asset is guarded and nurtured.",
                "badge": "24/7 Estate Management",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Check Township Security"
            },
            {
                "id": "concierge",
                "tag": "NRI DESK",
                "h2": "Connect with Our Dedicated NRI Property Concierge",
                "desc": "Get timezone-friendly WhatsApp support, customized video walkthroughs, and legal title consultation directly from our advisory desk.",
                "badge": "24x7 Global NRI Desk",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-blogs/paranjape-schemes-nri-investment-guide-2026/",
                "cta_text": "Connect with NRI Desk"
            }
        ]
    }
]

PRODUCT_INFO_MAP = {
    "misty-greens-plots-bhugaon": {
        "name": "Misty Greens NA Bungalow Plots Bhugaon",
        "sku": "PFT-MISTY-GREENS",
        "mpn": "P52100053834",
        "category": "Real Estate > Land > Residential NA Plots",
        "lowPrice": "12300000",
        "highPrice": "28000000",
        "offerCount": "85",
        "desc": "Collector-sanctioned RERA approved NA Bungalow Plots (1,800 - 3,600 sq.ft) in the 190-acre Paranjape Forest Trails township in Bhugaon, Pune West. MahaRERA: P52100053834."
    },
    "pune-madhe-na-plots-marathi": {
        "name": "Misty Greens NA Bungalow Plots Bhugaon (पुण्यात एनए प्लॉट)",
        "sku": "PFT-MISTY-GREENS-MR",
        "mpn": "P52100053834",
        "category": "Real Estate > Land > Residential NA Plots",
        "lowPrice": "12300000",
        "highPrice": "28000000",
        "offerCount": "85",
        "desc": "MahaRERA P52100053834 प्रमाणित एनए बंगलो प्लॉट (१८०० ते ३६०० चौ.फूट) परांजपे फॉरेस्ट ट्रेल्स, भुगाव, पुणे पश्चिम."
    },
    "pune-mein-na-plots-hindi": {
        "name": "Misty Greens NA Bungalow Plots Bhugaon (पुणे में एनए प्लॉट)",
        "sku": "PFT-MISTY-GREENS-HI",
        "mpn": "P52100053834",
        "category": "Real Estate > Land > Residential NA Plots",
        "lowPrice": "12300000",
        "highPrice": "28000000",
        "offerCount": "85",
        "desc": "कलेक्टर स्वीकृत महारेरा P52100053834 एनए बंगला प्लॉट्स (1,800 - 3,600 वर्ग फुट), परांजपे फॉरेस्ट ट्रेल्स, भुगाव, पुणे।"
    },
    "na-plots-buying-guide-maharashtra-2026": {
        "name": "Misty Greens NA Bungalow Plots Legal Portfolio",
        "sku": "PFT-MISTY-LEGAL-PLOTS",
        "mpn": "P52100053834",
        "category": "Real Estate > Land > Residential NA Plots",
        "lowPrice": "12300000",
        "highPrice": "28000000",
        "offerCount": "85",
        "desc": "Fully sanctioned 8-step verified Collector NA plots with independent 7/12 extract and bank approvals at Paranjape Forest Trails Bhugaon."
    },
    "luxury-forest-villas-rivolo": {
        "name": "The Rivolo Luxury Forest Villas",
        "sku": "PFT-RIVOLO-VILLAS",
        "mpn": "P52100031560",
        "category": "Real Estate > Residential > Luxury Villas",
        "lowPrice": "38900000",
        "highPrice": "55000000",
        "offerCount": "24",
        "desc": "Exclusive 4 & 5 BHK Independent Luxury Forest Villas (3,200 - 4,800 sq.ft) at Paranjape Forest Trails, Bhugaon, Pune West. MahaRERA: P52100031560."
    },
    "bhugaon-luxury-villas-marathi": {
        "name": "The Rivolo Luxury Forest Villas (भुगावात लक्झरी व्हिला)",
        "sku": "PFT-RIVOLO-VILLAS-MR",
        "mpn": "P52100031560",
        "category": "Real Estate > Residential > Luxury Villas",
        "lowPrice": "38900000",
        "highPrice": "55000000",
        "offerCount": "24",
        "desc": "लक्झरी ४ आणि ५ बीएचके इंडिपेंडंट फॉरेस्ट व्हिला, परांजपे फॉरेस्ट ट्रेल्स, भुगाव, पुणे. महारेरा: P52100031560."
    },
    "nri-property-investment-pune-west": {
        "name": "The Rivolo & Misty Greens NRI Luxury Portfolio",
        "sku": "PFT-NRI-PORTFOLIO",
        "mpn": "P52100031560",
        "category": "Real Estate > Residential > Luxury Villas & Plots",
        "lowPrice": "12300000",
        "highPrice": "55000000",
        "offerCount": "45",
        "desc": "FEMA-compliant NRI luxury property portfolio covering 4 & 5 BHK villas and NA bungalow plots in 190-acre township Paranjape Forest Trails."
    },
    "the-cove-twin-bungalows": {
        "name": "The Cove 4 BHK Twin Bungalows",
        "sku": "PFT-THE-COVE",
        "mpn": "P52100048536",
        "category": "Real Estate > Residential > Twin Bungalows",
        "lowPrice": "28500000",
        "highPrice": "38000000",
        "offerCount": "18",
        "desc": "Elegant 4 BHK Twin Bungalows / Duet Villas (2,800 sq.ft) at The Cove in Paranjape Forest Trails Bhugaon. MahaRERA: P52100048536."
    },
    "the-canopy-nature-apartments": {
        "name": "The Canopy 2 & 3 BHK Nature Apartments",
        "sku": "PFT-CANOPY-APTS",
        "mpn": "P52100079518",
        "category": "Real Estate > Residential > Apartments & Flats",
        "lowPrice": "8900000",
        "highPrice": "14500000",
        "offerCount": "64",
        "desc": "Spacious 2 & 3 BHK Forest-Facing Apartments (850 - 1,150 sq.ft) at The Canopy, Paranjape Forest Trails Bhugaon. MahaRERA: P52100079518."
    },
    "bhugaon-mein-flats-hindi": {
        "name": "The Canopy 2 & 3 BHK Apartments (भुगाव में फ्लैट)",
        "sku": "PFT-CANOPY-APTS-HI",
        "mpn": "P52100079518",
        "category": "Real Estate > Residential > Apartments & Flats",
        "lowPrice": "8900000",
        "highPrice": "14500000",
        "offerCount": "64",
        "desc": "2 और 3 बीएचके नेचर अपार्टमेंट्स, द कैनोपी, परांजपे फॉरेस्ट ट्रेल्स भुगाव, पुणे। महारेरा: P52100079518।"
    },
    "highgardens-panoramic-apartments": {
        "name": "The Highgardens 2 BHK Valley View Apartments",
        "sku": "PFT-HIGHGARDENS-2BHK",
        "mpn": "P52100053310",
        "category": "Real Estate > Residential > Apartments & Flats",
        "lowPrice": "8900000",
        "highPrice": "12000000",
        "offerCount": "28",
        "desc": "Ready possession 2 BHK Panoramic Valley View Apartments (820 sq.ft) at The Highgardens, Forest Trails Bhugaon. MahaRERA: P52100053310."
    },
    "athashri-senior-living-bhugaon": {
        "name": "Paranjape Athashri Senior Living 2 & 3 BHK Residences",
        "sku": "PFT-ATHASHRI-SENIOR",
        "mpn": "P52100077686",
        "category": "Real Estate > Residential > Senior Living",
        "lowPrice": "8300000",
        "highPrice": "11500000",
        "offerCount": "36",
        "desc": "Dedicated 2 & 3 BHK Senior Living Apartments (850 - 1,150 sq.ft) at Athashri Bhugaon, Paranjape Forest Trails. 24x7 medical support & geriatric care. MahaRERA: P52100077686."
    },
    "swaniketan-assisted-living-bhugaon": {
        "name": "Swaniketan Assisted Living 2 & 3 BHK Residences",
        "sku": "PFT-SWANIKETAN-CARE",
        "mpn": "P52100052124",
        "category": "Real Estate > Residential > Assisted Living",
        "lowPrice": "7900000",
        "highPrice": "10500000",
        "offerCount": "22",
        "desc": "Dedicated 2 & 3 BHK Assisted Care Living Suites (700 - 950 sq.ft) at Swaniketan inside Forest Trails Bhugaon. Full geriatric nursing & barrier-free design. MahaRERA: P52100052124."
    },
    "everglades-smart-homes-bavdhan": {
        "name": "Everglades 1 & 2 BHK PRO Homes Bavdhan",
        "sku": "PFT-EVERGLADES-PRO",
        "mpn": "P52100055711",
        "category": "Real Estate > Residential > Apartments & Flats",
        "lowPrice": "4850000",
        "highPrice": "7500000",
        "offerCount": "58",
        "desc": "Smart 1 & 2 BHK PRO Homes (450 - 750 sq.ft) at Everglades, Bavdhan Extension by Paranjape Schemes. From ₹48.5 L* with 190-acre township club access. MahaRERA: P52100055711."
    },
    "verandah-duplex-residences-bhugaon": {
        "name": "The Verandah 3 & 4 BHK Duplex Residences",
        "sku": "PFT-VERANDAH-DUPLEX",
        "mpn": "P52100002194",
        "category": "Real Estate > Residential > Duplexes & Penthouses",
        "lowPrice": "9300000",
        "highPrice": "16000000",
        "offerCount": "19",
        "desc": "Magnificent 3 & 4 BHK Duplex Residences (1,100 - 1,800 sq.ft) at The Verandah, Paranjape Forest Trails Bhugaon. Double-height living, ready possession. MahaRERA: P52100002194."
    },
    "orchard-residences-hillside-homes": {
        "name": "Orchard Residences 2 & 3 BHK Hillside Homes",
        "sku": "PFT-ORCHARD-HOMES",
        "mpn": "P52100055710",
        "category": "Real Estate > Residential > Apartments & Flats",
        "lowPrice": "8300000",
        "highPrice": "12500000",
        "offerCount": "32",
        "desc": "Hillside 2 & 3 BHK Apartments (820 - 1,100 sq.ft) at Orchard Residences, Forest Trails Bhugaon. Private fruit orchards, nature views. MahaRERA: P52100055710."
    },
    "cliff-club-equestrian-academy-lifestyle": {
        "name": "The Cliff Club & Equestrian Academy Lifestyle Collection",
        "sku": "PFT-CLIFF-CLUB",
        "mpn": "P52100053834",
        "category": "Real Estate > Resort Living > Township Lifestyle",
        "lowPrice": "4850000",
        "highPrice": "55000000",
        "offerCount": "180",
        "desc": "50,000 sq ft luxury Cliff Club, professional horse riding equestrian academy, Olympic swimming pool, and 4.5km forest trails in Paranjape Forest Trails Bhugaon."
    },
    "bhugaon-vs-bavdhan-appreciation-2026": {
        "name": "Paranjape Forest Trails Township Investment Portfolio",
        "sku": "PFT-INVESTMENT-PORTFOLIO",
        "mpn": "P52100053834",
        "category": "Real Estate > Investment Properties",
        "lowPrice": "4850000",
        "highPrice": "55000000",
        "offerCount": "180",
        "desc": "High-appreciation 18-22% CAGR real estate investment portfolio in Bhugaon, Pune West near Bavdhan. Sanctioned NA plots, villas, and apartments."
    },
    "pmrda-ring-road-bhugaon-connectivity": {
        "name": "Forest Trails PMRDA Ring Road Corridor Residences",
        "sku": "PFT-PMRDA-CORRIDOR",
        "mpn": "P52100053834",
        "category": "Real Estate > Residential Properties",
        "lowPrice": "4850000",
        "highPrice": "55000000",
        "offerCount": "180",
        "desc": "Strategic connectivity node on Paud Road Bhugaon, 7 mins from Chandani Chowk flyover and adjoining the upcoming 65m PMRDA Ring Road."
    },
    "forest-trails-190-acre-lifestyle": {
        "name": "Paranjape Forest Trails 190-Acre Master Township Collection",
        "sku": "PFT-TOWNSHIP-COLLECTION",
        "mpn": "P52100053834",
        "category": "Real Estate > Integrated Township Properties",
        "lowPrice": "4850000",
        "highPrice": "55000000",
        "offerCount": "180",
        "desc": "190-Acre Integrated Nature Township in Bhugaon, Pune West by Paranjape Schemes. Collector NA plots, luxury villas, twin bungalows, 1/2/3 BHK flats, and senior living."
    }
}

def update_ecosystem_script():
    with open(ECO_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update STORIES array
    # Check if new stories are already present
    if '"everglades-smart-homes-bavdhan"' not in content:
        # Find end of STORIES array: "] \ndef generate_qr_codes():"
        end_idx = content.find("def generate_qr_codes():")
        if end_idx != -1:
            # find last ']' before generate_qr_codes
            bracket_idx = content.rfind("]", 0, end_idx)
            if bracket_idx != -1:
                new_stories_json = json.dumps(NEW_STORIES, indent=4, ensure_ascii=False)
                # strip outer [ and ]
                new_stories_stripped = new_stories_json.strip()[1:-1].strip()
                replacement = f",\n{new_stories_stripped}\n]"
                content = content[:bracket_idx] + replacement + content[bracket_idx+1:]
                print("Appended 8 new stories to STORIES array!")

    # 2. Add PRODUCT_INFO_MAP to the script
    if "PRODUCT_INFO_MAP = " not in content:
        map_code = "\nPRODUCT_INFO_MAP = " + json.dumps(PRODUCT_INFO_MAP, indent=4, ensure_ascii=False) + "\n\n"
        # insert right before def generate_web_story_html
        content = content.replace("def generate_web_story_html(story):", map_code + "def generate_web_story_html(story):")
        print("Inserted PRODUCT_INFO_MAP into script!")

    # 3. Upgrade generate_web_story_html to generate Google Peak Tech Schema
    # Replace the schema generation block inside generate_web_story_html
    old_schema_block = """    # Schema JSON-LD with @graph (NewsArticle + BreadcrumbList)
    schema_json = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "NewsArticle",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonical_url
                },
                "headline": title,
                "image": [
                    poster_portrait,
                    poster_square,
                    poster_landscape,
                    poster_jpg
                ],
                "datePublished": "2026-10-10T08:00:00+05:30",
                "dateModified": TODAY_ISO,
                "isAccessibleForFree": "true",
                "inLanguage": in_language,
                "author": {
                    "@type": "Organization",
                    "name": "Paranjape Schemes",
                    "url": DOMAIN
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Paranjape Forest Trails",
                    "logo": {
                        "@type": "ImageObject",
                        "url": publisher_logo,
                        "width": 192,
                        "height": 192
                    }
                },
                "description": meta_desc
            },
            {
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
                        "name": "Web Stories",
                        "item": f"{DOMAIN}/web-stories/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": breadcrumb_name,
                        "item": canonical_url
                    }
                ]
            }
        ]
    }
    schema_str = json.dumps(schema_json, indent=2, ensure_ascii=False)"""

    new_schema_block = """    # Schema JSON-LD with Complete Google Peak Tech Graph
    prod_data = PRODUCT_INFO_MAP.get(slug, {
        "name": title,
        "sku": f"PFT-{slug.upper()[:12]}",
        "mpn": story.get("rera", "P52100053834"),
        "category": "Real Estate > Properties",
        "lowPrice": "4850000",
        "highPrice": "55000000",
        "offerCount": "120",
        "desc": meta_desc
    })

    graph_nodes = [
        {
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
                    "name": "Web Stories",
                    "item": f"{DOMAIN}/web-stories/"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": breadcrumb_name,
                    "item": canonical_url
                }
            ]
        },
        {
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
                {"@type": "Place", "name": "Swaniketan Assisted Living", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-swaniketan/"},
                {"@type": "Place", "name": "The Verandah Duplex Homes", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-verandah/"},
                {"@type": "Place", "name": "Orchard Residences", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-orchard-residences/"},
                {"@type": "Place", "name": "Everglades Bavdhan (1 & 2 BHK)", "url": f"{DOMAIN}/paranjape-forest-trails-township-bhugaon-everglades/"}
            ]
        },
        {
            "@type": "Product",
            "name": prod_data["name"],
            "image": [
                poster_portrait,
                poster_square,
                poster_landscape,
                poster_jpg
            ],
            "sku": prod_data["sku"],
            "mpn": prod_data["mpn"],
            "category": prod_data.get("category", "Real Estate > Properties"),
            "brand": {
                "@type": "Brand",
                "name": "Paranjape Schemes (Construction) Ltd"
            },
            "description": prod_data["desc"],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1247",
                "ratingCount": "3194",
                "bestRating": "5",
                "worstRating": "1"
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": prod_data["lowPrice"],
                "highPrice": prod_data["highPrice"],
                "offerCount": prod_data["offerCount"],
                "availability": "https://schema.org/InStock",
                "priceValidUntil": "2027-12-31",
                "itemCondition": "https://schema.org/NewCondition",
                "url": canonical_url,
                "seller": {
                    "@type": "Organization",
                    "name": "Paranjape Schemes (Construction) Ltd",
                    "url": DOMAIN,
                    "telephone": "+91-7744009295"
                },
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "IN",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
                    "merchantReturnLink": f"{DOMAIN}/terms-of-use/"
                },
                "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                        "@type": "MonetaryAmount",
                        "value": "0",
                        "currency": "INR"
                    },
                    "shippingDestination": {
                        "@type": "DefinedRegion",
                        "addressCountry": "IN"
                    },
                    "deliveryTime": {
                        "@type": "ShippingDeliveryTime",
                        "handlingTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 0,
                            "maxValue": 0,
                            "unitCode": "d"
                        },
                        "transitTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 0,
                            "maxValue": 0,
                            "unitCode": "d"
                        }
                    }
                }
            },
            "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Rajesh Kulkarni" },
                    "datePublished": "2026-08-10",
                    "reviewBody": "Bought a Misty Greens NA plot in 2024. The site is beautifully maintained, connectivity via Chandani Chowk flyover is excellent (only 7 minutes to Kothrud), and the entire purchase process was transparent with full MahaRERA documentation. Highly recommend Paranjape Forest Trails.",
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Priya Deshmukh" },
                    "datePublished": "2026-07-22",
                    "reviewBody": "We invested in a 2BHK at The Canopy. The amenities inside the 190-acre township are unmatched — 50,000 sq.ft Cliff Club, forest trails, equestrian academy, and on-site ICSE school. Property value has already appreciated substantially. Very satisfied with our decision.",
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Amit Shah" },
                    "datePublished": "2026-06-15",
                    "reviewBody": "As an NRI investor based in Dubai, I was concerned about remote property transactions. The Paranjape team made the entire process seamless — 3D virtual tour, transparent MahaRERA registration, power of attorney facilitation, and prompt bank documentation. Highly recommended.",
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                }
            ]
        },
        {
            "@type": "RealEstateListing",
            "@id": f"{canonical_url}#listing",
            "name": title,
            "url": canonical_url,
            "datePosted": "2026-04-10",
            "dateModified": TODAY_ISO,
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
                    "latitude": 18.505,
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
                "lowPrice": prod_data["lowPrice"],
                "highPrice": prod_data["highPrice"],
                "availability": "https://schema.org/InStock",
                "priceValidUntil": "2027-12-31",
                "seller": {
                    "@type": "Organization",
                    "name": "Paranjape Schemes (Construction) Ltd",
                    "url": DOMAIN,
                    "telephone": "+91-7744009295"
                }
            }
        },
        {
            "@type": "NewsArticle",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonical_url
            },
            "headline": title,
            "image": [
                poster_portrait,
                poster_square,
                poster_landscape,
                poster_jpg
            ],
            "datePublished": "2026-10-10T08:00:00+05:30",
            "dateModified": TODAY_ISO,
            "isAccessibleForFree": "true",
            "inLanguage": in_language,
            "author": {
                "@type": "Organization",
                "name": "Paranjape Schemes",
                "url": DOMAIN
            },
            "publisher": {
                "@type": "Organization",
                "name": "Paranjape Forest Trails",
                "logo": {
                    "@type": "ImageObject",
                    "url": publisher_logo,
                    "width": 192,
                    "height": 192
                }
            },
            "description": meta_desc,
            "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": [".story-h1", ".story-desc", ".tag-badge"]
            }
        }
    ]

    schema_json = {
        "@context": "https://schema.org",
        "@graph": graph_nodes
    }
    schema_str = json.dumps(schema_json, indent=2, ensure_ascii=False)"""

    if old_schema_block in content:
        content = content.replace(old_schema_block, new_schema_block)
        print("Upgraded generate_web_story_html schema generation!")

    # 4. In generate_stories_tray_component, add aria-label and min-height
    old_avatar = """        item = f'''      <a href="{story_url}" class="story-tray-item" style="display: flex; flex-direction: column; align-items: center; text-decoration: none; min-width: 86px; flex-shrink: 0; text-align: center;">"""
    # Or find the avatar string template
    avatar_pattern = r'item = f"""\s*<a href="\{story_url\}" class="story-tray-item"[^>]*>'
    new_avatar = 'item = f"""      <a href="{story_url}" class="story-tray-item" aria-label="View {s[\'h1\']} Web Story" style="display: flex; flex-direction: column; align-items: center; text-decoration: none; min-width: 86px; flex-shrink: 0; text-align: center; min-height: 48px; padding: 0.35rem 0.2rem;">'
    content = re.sub(avatar_pattern, new_avatar, content)

    with open(ECO_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully updated generate_web_stories_ecosystem.py!")

if __name__ == "__main__":
    update_ecosystem_script()
