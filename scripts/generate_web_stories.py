#!/usr/bin/env python3
"""
EXPANSIVE GOOGLE WEB STORIES GENERATOR FOR PARANJAPE FOREST TRAILS BHUGAON
=========================================================================
Generates 100% AMP-compliant Google Web Stories (amp-story-1.0) and a
responsive visual hub portal at /web-stories/index.html.

Technical Features:
- 100% valid AMP HTML (<!DOCTYPE html><html ⚡ lang="en">)
- amp-story-1.0 with auto-advance, animations, layers, and page outlinks
- amp-analytics with gtag (GA4: G-PARANJAPE + Google Ads: AW-17430583486)
- High-res portrait (3:4), square (1:1), and landscape (4:3) posters
- Rich NewsArticle JSON-LD schema on each story
- Exactly 1 <h1> tag per story to satisfy strict gap analysis validation
- Generates dedicated sitemap-stories.xml and registers in sitemap.xml
"""

import os
import json
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
TODAY_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+05:30")
DATE_STR = datetime.now(timezone.utc).strftime("%Y-%m-%d")

STORIES = [
    {
        "slug": "misty-greens-plots-bhugaon",
        "title": "NA Bungalow Plots at Misty Greens Bhugaon | Paranjape Forest Trails",
        "h1": "NA Bungalow Plots at Misty Greens Bhugaon",
        "meta_desc": "Explore premium NA bungalow plots at Misty Greens, Paranjape Forest Trails Bhugaon Pune. 1800-3600 sq ft plots from ₹1.23 Cr* with clear RERA title.",
        "category": "NA Bungalow Plots",
        "price_badge": "₹1.23 Cr* Onwards",
        "rera": "P52100053834",
        "target_url": "/paranjape-forest-trails-township-bhugaon-misty-greens/",
        "target_label": "Explore Misty Greens Plots",
        "slides": [
            {
                "id": "cover",
                "tag": "FLAGSHIP NA PLOTS",
                "h2": "Misty Greens: Build Your Dream Villa in a 190-Acre Forest",
                "desc": "Collector-sanctioned NA bungalow plots inside Pune West's largest nature township. Complete architectural freedom.",
                "badge": "MahaRERA: P52100053834",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-misty-greens/",
                "cta_text": "View Plot Masterplan"
            },
            {
                "id": "sizes",
                "tag": "GENEROUS PLOT SIZES",
                "h2": "1,800 to 3,600 Sq. Ft. Custom Bungalow Plots",
                "desc": "Spacious plots with demarcated boundary walls, dedicated water connection, underground cabling & paved arterial roads.",
                "badge": "Immediate Possession Ready",
                "cta_url": "/na-plots-in-bhugaon/",
                "cta_text": "Check Available Plots"
            },
            {
                "id": "location",
                "tag": "STRATEGIC CONNECTIVITY",
                "h2": "Just 7 Minutes from Chandani Chowk Flyover",
                "desc": "Located on Paud Road, Bhugaon. Swift access to Kothrud (10 min), Bavdhan (5 min) & Hinjewadi Phase 3 (25 min).",
                "badge": "PMRDA Growth Corridor",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "Open Location Map"
            },
            {
                "id": "amenities",
                "tag": "190-ACRE TOWNSHIP LIVING",
                "h2": "The Cliff Club & Equestrian Academy at Your Doorstep",
                "desc": "Enjoy a luxury clubhouse with infinity pool, tennis, squash courts, riding school & 4.5 km of forest trails.",
                "badge": "10,000+ Forest Trees",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Tour Township Amenities"
            },
            {
                "id": "legals",
                "tag": "100% CLEAR TITLE",
                "h2": "MahaRERA Approved & Collector NA Sanctioned",
                "desc": "Independent 7/12 extract demarcation. 80% home loan sanctioned by SBI, HDFC, ICICI, and Axis Bank.",
                "badge": "Title Search Report Verified",
                "cta_url": "/rera-approved-plots-bhugaon/",
                "cta_text": "Download RERA Certificate"
            },
            {
                "id": "pricing",
                "tag": "LIMITED PLOTS REMAINING",
                "h2": "Plots Starting from ₹1.23 Cr* — Schedule Site Visit",
                "desc": "Experience the panoramic mountain views and fresh valley air in person. Free guided site visits available daily.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Misty%20Greens%20NA%20Plots",
                "cta_text": "Book Free Site Visit"
            }
        ]
    },
    {
        "slug": "luxury-forest-villas-rivolo",
        "title": "The Rivolo Luxury Forest Villas Bhugaon | 4 & 5 BHK Hilltop Homes",
        "h1": "The Rivolo Luxury Forest Villas Bhugaon",
        "meta_desc": "Experience ultra-luxury hilltop living at The Rivolo, Paranjape Forest Trails Bhugaon Pune. 4 & 5 BHK bespoke forest villas from ₹3.89 Cr* with private decks.",
        "category": "Luxury Forest Villas",
        "price_badge": "₹3.89 Cr* Onwards",
        "rera": "P52100031560",
        "target_url": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
        "target_label": "Explore The Rivolo Villas",
        "slides": [
            {
                "id": "cover",
                "tag": "BESPOKE HILLTOP LIVING",
                "h2": "The Rivolo: Ultra-Luxury 4 & 5 BHK Forest Villas",
                "desc": "Perched on the highest contour of Forest Trails. Private sundecks, double-height living spaces, and uninterrupted Sahyadri views.",
                "badge": "MahaRERA: P52100031560",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
                "cta_text": "Explore Rivolo Villas"
            },
            {
                "id": "architecture",
                "tag": "TIMELESS ARCHITECTURE",
                "h2": "3,200 to 4,100 Sq. Ft. Palatial Living Spaces",
                "desc": "Crafted with imported marble, full-height glass facades, private elevator provision & grand courtyards.",
                "badge": "Limited to 24 Exclusive Villas",
                "cta_url": "/luxury-villas-bhugaon/",
                "cta_text": "View Villa Floor Plans"
            },
            {
                "id": "lifestyle",
                "tag": "OUTDOOR SPLENDOR",
                "h2": "Private Plunge Pool & Sunset Viewing Decks",
                "desc": "Wake up to misty green valleys and birdsong. Private terraces designed for bespoke twilight dinners and weekend relaxation.",
                "badge": "90% Cleaner Mountain Air",
                "cta_url": "/5bhk-villas-pune-west/",
                "cta_text": "Download Villa Brochure"
            },
            {
                "id": "privacy",
                "tag": "TOTAL PRIVACY",
                "h2": "Dedicated Enclave Gate & Triple-Layered Security",
                "desc": "RFID barrier access, 24/7 motorized patrols, and video door phone systems ensure absolute peace of mind.",
                "badge": "Gated Hilltop Community",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Township Security Overview"
            },
            {
                "id": "possession",
                "tag": "RERA COMPLIANCE",
                "h2": "Approved Under MahaRERA Registration P52100031560",
                "desc": "Delivered with precision craftsmanship by Paranjape Schemes — 50+ years of trusted excellence and 20,000+ happy homes.",
                "badge": "Q4 2026 Delivery Phase",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
                "cta_text": "View Construction Status"
            },
            {
                "id": "pricing",
                "tag": "EXCLUSIVE ENQUIRY",
                "h2": "Villas from ₹3.89 Cr* — Schedule Private Showcase",
                "desc": "Connect directly with our senior villa advisory desk for floor layouts, customized finishings, and VIP site tours.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20The%20Rivolo%20Forest%20Villas",
                "cta_text": "Book VIP Villa Preview"
            }
        ]
    },
    {
        "slug": "the-canopy-nature-apartments",
        "title": "The Canopy 2 & 3 BHK Nature Apartments Bhugaon | Paranjape Forest Trails",
        "h1": "The Canopy 2 & 3 BHK Nature Apartments Bhugaon",
        "meta_desc": "Discover forest-facing 2 & 3 BHK apartments at The Canopy, Paranjape Forest Trails Bhugaon near Bavdhan Pune from ₹89 Lakh*. Modern amenities & green views.",
        "category": "Nature Apartments",
        "price_badge": "₹89 Lakh* Onwards",
        "rera": "P52100079518",
        "target_url": "/paranjape-forest-trails-township-bhugaon-the-canopy/",
        "target_label": "Explore The Canopy Apartments",
        "slides": [
            {
                "id": "cover",
                "tag": "NATURE-INSPIRED HOMES",
                "h2": "The Canopy: 2 & 3 BHK Forest Apartments from ₹89L*",
                "desc": "Live where the forest begins. Step into thoughtfully designed residences overlooking 10,000+ trees near Bavdhan.",
                "badge": "MahaRERA: P52100079518",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-the-canopy/",
                "cta_text": "Explore The Canopy"
            },
            {
                "id": "layouts",
                "tag": "INTELLIGENT LAYOUTS",
                "h2": "850 to 1,150 Sq. Ft. Optimally Planned Space",
                "desc": "Zero dead passages, expansive living balconies, cross-ventilated bedrooms, and ergonomic kitchen utility spaces.",
                "badge": "Vaastu Compliant Design",
                "cta_url": "/2bhk-in-bhugaon/",
                "cta_text": "View 2 & 3 BHK Floor Plans"
            },
            {
                "id": "greens",
                "tag": "FOREST BREEZE",
                "h2": "Panoramic Balcony Views of Verdant Hill Slopes",
                "desc": "Enjoy morning tea with panoramic greenery. Clean, pollution-free air just minutes away from urban city hubs.",
                "badge": "Forest Facing Balconies",
                "cta_url": "/3bhk-in-pune/",
                "cta_text": "Check Balcony Views"
            },
            {
                "id": "club",
                "tag": "ENCLAVE AMENITIES",
                "h2": "Clubhouse, Swimming Pool, Gym & Kids Play Zone",
                "desc": "Private enclave lifestyle amenities plus complete access to the 190-acre township's premier sports and dining facilities.",
                "badge": "15+ Dedicated Amenities",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "See Clubhouse Amenities"
            },
            {
                "id": "connectivity",
                "tag": "QUICK DRIVE",
                "h2": "Only 5 Minutes to Bavdhan & 7 Min to Kothrud",
                "desc": "Signal-free drive to Chandani Chowk. Top schools like SSRVM, Indus & Ryan International within easy reach.",
                "badge": "Near Bavdhan Hub",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "Check Travel Distances"
            },
            {
                "id": "pricing",
                "tag": "SPECIAL OFFER",
                "h2": "2 BHK from ₹89L* | 3 BHK from ₹1.24 Cr* — Enquire Now",
                "desc": "Attractive flexible payment plans and pre-approved home loans with instant approval assistance.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20The%20Canopy%20Apartments",
                "cta_text": "Request Pricing & Tour"
            }
        ]
    },
    {
        "slug": "the-cove-twin-bungalows",
        "title": "The Cove Twin Bungalows Bhugaon Pune | 4 BHK Hillview Bungalows",
        "h1": "The Cove Twin Bungalows Bhugaon Pune",
        "meta_desc": "Explore 4 BHK twin bungalows at The Cove, Paranjape Forest Trails Bhugaon. Hillview independent living from ₹2.85 Cr* with private gardens and club access.",
        "category": "Twin Bungalows",
        "price_badge": "₹2.85 Cr* Onwards",
        "rera": "P52100048536",
        "target_url": "/paranjape-forest-trails-township-bhugaon-the-cove/",
        "target_label": "Explore The Cove Bungalows",
        "slides": [
            {
                "id": "cover",
                "tag": "INDEPENDENT LIVING",
                "h2": "The Cove: 4 BHK Hillview Twin Bungalows from ₹2.85 Cr*",
                "desc": "Own an independent twin bungalow nestled in the gentle slopes of Forest Trails. Private garden and panoramic terraces.",
                "badge": "MahaRERA: P52100048536",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-the-cove/",
                "cta_text": "Explore The Cove"
            },
            {
                "id": "architecture",
                "tag": "G+2 ARCHITECTURE",
                "h2": "2,800 Sq. Ft. of Sophisticated Multilevel Living",
                "desc": "Grand formal living, private family lounge, multiple master bedrooms, and an expansive open terrace for stargazing.",
                "badge": "Spacious 4 BHK Layout",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-the-cove/",
                "cta_text": "View Layout Plans"
            },
            {
                "id": "garden",
                "tag": "PRIVATE GREENS",
                "h2": "Personal Landscaped Lawn & Dual Covered Car Parks",
                "desc": "Enjoy a private garden for morning walks and kids' play, along with dedicated parking for two SUVs.",
                "badge": "Private Front Lawn",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-the-cove/",
                "cta_text": "Check Garden Space"
            },
            {
                "id": "lifestyle",
                "tag": "TOWNSHIP PRIVILEGES",
                "h2": "Full Access to The Cliff Lifestyle & Sports Club",
                "desc": "Swimming pool, fine dining bistro, spa, gymnasium, and equestrian horse riding lessons all within a 3-minute stroll.",
                "badge": "190 Acres of Greenery",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "See Club Privileges"
            },
            {
                "id": "possession",
                "tag": "RERA VERIFIED",
                "h2": "Ready & Near-Possession Bungalow Options",
                "desc": "Enjoy immediate possession peace of mind with complete legal transparency and bank loan approvals.",
                "badge": "SBI & HDFC Approved",
                "cta_url": "/rera-approved-plots-bhugaon/",
                "cta_text": "Verify RERA & Title"
            },
            {
                "id": "pricing",
                "tag": "SITE VISIT",
                "h2": "Bungalows from ₹2.85 Cr* — Book Your Private Tour",
                "desc": "Walk through actual ready sample bungalows and experience the hillview ambience first-hand today.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20The%20Cove%20Twin%20Bungalows",
                "cta_text": "Book Bungalow Visit"
            }
        ]
    },
    {
        "slug": "forest-trails-190-acre-lifestyle",
        "title": "Living in a 190-Acre Forest: The Lifestyle at Paranjape Forest Trails",
        "h1": "The 190-Acre Forest Lifestyle at Paranjape Forest Trails",
        "meta_desc": "Explore daily life across 190 acres at Paranjape Forest Trails Bhugaon Pune. Equestrian academy, The Cliff Club, forest trails, SSRVM school, and pure air.",
        "category": "Township Lifestyle",
        "price_badge": "190-Acre Ecosystem",
        "rera": "Multi-Enclave RERA Certified",
        "target_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
        "target_label": "Discover Township Lifestyle",
        "slides": [
            {
                "id": "cover",
                "tag": "INTEGRATED NATURE TOWNSHIP",
                "h2": "190 Acres of Pure Sahyadri Serenity & World-Class Living",
                "desc": "Discover Pune West's most celebrated integrated green township, home to over 2,500 happy families living in nature.",
                "badge": "10,000+ Indigenous Trees",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Discover Forest Trails"
            },
            {
                "id": "club",
                "tag": "THE CLIFF CLUB",
                "h2": "Pune's Premier Hilltop Lifestyle & Sports Club",
                "desc": "Features an Olympic-length infinity swimming pool, squash, badminton, tennis, state-of-the-art gym, and dining bistro.",
                "badge": "Luxury Club Membership",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Explore Cliff Club"
            },
            {
                "id": "equestrian",
                "tag": "EQUESTRIAN ACADEMY",
                "h2": "Pune's Only Township with a Professional Riding Academy",
                "desc": "Trained thoroughbred horses, Olympic-grade show-jumping arena, and certified equestrian coaches for all age groups.",
                "badge": "Horse Riding Academy",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "View Equestrian Center"
            },
            {
                "id": "education",
                "tag": "EDUCATION ON CAMPUS",
                "h2": "Sri Sri Ravishankar Vidya Mandir (ICSE) Inside Campus",
                "desc": "Walk your children to school in 3 minutes. Zero school bus stress, holistic learning, and expansive sports playgrounds.",
                "badge": "ICSE School On-Site",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "Campus Infrastructure"
            },
            {
                "id": "retail",
                "tag": "DAILY CONVENIENCE",
                "h2": "Convenience High-Street, Organic Mart & Medical Clinic",
                "desc": "Everything you need for daily living is right inside the gated township perimeter, from fresh groceries to healthcare.",
                "badge": "24/7 Gated Security",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "See Town Amenities"
            },
            {
                "id": "contact",
                "tag": "EXPERIENCE NATURE",
                "h2": "Plots, Villas & Apartments Available — Visit Today",
                "desc": "From NA plots (₹1.23Cr*) to luxury villas (₹3.89Cr*) and nature flats (₹89L*), find your dream home in nature.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20want%20to%20visit%20Paranjape%20Forest%20Trails%20Township",
                "cta_text": "Schedule Township Visit"
            }
        ]
    },
    {
        "slug": "pmrda-ring-road-bhugaon-connectivity",
        "title": "Chandani Chowk & PMRDA Ring Road: Bhugaon Connectivity Advantage",
        "h1": "Chandani Chowk & PMRDA Ring Road Connectivity",
        "meta_desc": "See how Chandani Chowk Flyover & the PMRDA Ring Road cut travel times to Kothrud, Bavdhan, and Hinjewadi IT Park from Paranjape Forest Trails Bhugaon Pune.",
        "category": "Connectivity & Growth",
        "price_badge": "High ROI Growth Corridor",
        "rera": "Prime West Pune Micro-Market",
        "target_url": "/pune-metro-extension-paud-road-bhugaon-connectivity/",
        "target_label": "Read Connectivity Report",
        "slides": [
            {
                "id": "cover",
                "tag": "WEST PUNE INFRASTRUCTURE BOOM",
                "h2": "Chandani Chowk Flyover: Signal-Free Gateway to Bhugaon",
                "desc": "The multi-tier flyover complex cuts commute time drastically. Reach Bavdhan in 5 min and Kothrud in 7 min from Forest Trails.",
                "badge": "Signal-Free 7 Min Commute",
                "cta_url": "/pune-metro-extension-paud-road-bhugaon-connectivity/",
                "cta_text": "View Metro & Road Map"
            },
            {
                "id": "ringroad",
                "tag": "PMRDA RING ROAD",
                "h2": "65-Meter PMRDA Ring Road Transforming Bhugaon",
                "desc": "Fast-tracked expressway ring connecting Bhugaon to Hinjewadi IT Park, Mumbai-Pune Expressway, and Pune-Bengaluru Highway.",
                "badge": "PMRDA Growth Corridor",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "See Ring Road Alignment"
            },
            {
                "id": "metro",
                "tag": "PUNE METRO EXPANSION",
                "h2": "Proposed Metro Line 3 Extension on Paud Road",
                "desc": "Extension along Paud Road will provide seamless rapid transit linking Bhugaon directly to Deccan Gymkhana and Civil Court.",
                "badge": "Metro Line 3 Connectivity",
                "cta_url": "/pune-metro-extension-paud-road-bhugaon-connectivity/",
                "cta_text": "Read Metro Impact Report"
            },
            {
                "id": "itpark",
                "tag": "IT CORRIDOR ACCESS",
                "h2": "Hinjewadi IT Park in Just 25 Minutes",
                "desc": "Commute to Hinjewadi Phases 1, 2, and 3 via Pirangut-Hinjewadi link road without getting stuck in city center traffic.",
                "badge": "Ideal for IT Professionals",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "View Commute Matrix"
            },
            {
                "id": "roi",
                "tag": "CAPITAL APPRECIATION",
                "h2": "18% to 22% Projected Annual Property Appreciation",
                "desc": "Infrastructure expansion is driving massive capital appreciation for NA plots and luxury homes across the Bhugaon corridor.",
                "badge": "High Yield Investment",
                "cta_url": "/bhugaon-property-price-history/",
                "cta_text": "Check Price History Data"
            },
            {
                "id": "invest",
                "tag": "INVEST AT TODAY'S RATES",
                "h2": "Own at Paranjape Forest Trails Before the Next Price Surge",
                "desc": "Early-mover pricing advantage available across plots, villas, and apartments. Book an on-site advisory session today.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Bhugaon%20connectivity%20and%20plots",
                "cta_text": "Get Investment Guide"
            }
        ]
    },
    {
        "slug": "athashri-senior-living-bhugaon",
        "title": "Athashri Senior Living Bhugaon Pune | Paranjape Forest Trails",
        "h1": "Athashri Senior Living Bhugaon Pune",
        "meta_desc": "Discover Athashri Senior Living at Paranjape Forest Trails Bhugaon. Thoughtfully designed 2 BHK homes from ₹83 Lakh* with 24x7 doctor, nurse & senior care.",
        "category": "Senior Living",
        "price_badge": "₹83 Lakh* Onwards",
        "rera": "P52100077686",
        "target_url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
        "target_label": "Explore Athashri Senior Living",
        "slides": [
            {
                "id": "cover",
                "tag": "PIONEER IN SENIOR LIVING",
                "h2": "Athashri: Dignified Senior Living from ₹83 Lakh*",
                "desc": "Created by Paranjape Schemes — India's most trusted name in senior living. 2 BHK residences designed for care, safety, and joy.",
                "badge": "MahaRERA: P52100077686",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
                "cta_text": "Explore Athashri Living"
            },
            {
                "id": "design",
                "tag": "AGE-FRIENDLY DESIGN",
                "h2": "Anti-Skid Flooring, Grab Rails & Emergency Pull Cords",
                "desc": "Wheelchair-accessible ramps, wide doorways, panic call buttons in bathrooms, and lever handles for effortless independence.",
                "badge": "Barrier-Free Architecture",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
                "cta_text": "View Home Features"
            },
            {
                "id": "medical",
                "tag": "24X7 MEDICAL SUPPORT",
                "h2": "On-Site Doctor, Dedicated Nursing & Standby Ambulance",
                "desc": "Daily health monitoring, emergency response within minutes, tie-ups with Sahyadri & Ruby Hall hospitals.",
                "badge": "Full Medical Peace of Mind",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
                "cta_text": "See Healthcare Facilities"
            },
            {
                "id": "dining",
                "tag": "NUTRITIOUS DINING",
                "h2": "Hygienic Pure Vegetarian Dining & Daily Housekeeping",
                "desc": "Cook-free retirement! Freshly prepared nutritious meals, customized diabetic diets, and hassle-free home maintenance.",
                "badge": "Community Dining Hall",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
                "cta_text": "Dining & Care Services"
            },
            {
                "id": "community",
                "tag": "VIBRANT COMMUNITY",
                "h2": "Library, Satsang Hall, Yoga Deck & Active Social Life",
                "desc": "Make lifelong friends, celebrate festivals, participate in music evenings, and enjoy scenic hill walks together.",
                "badge": "Like-Minded Community",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "View Social Activities"
            },
            {
                "id": "contact",
                "tag": "GIFT YOUR PARENTS PEACE",
                "h2": "Schedule an Athashri Experience Tour with Your Family",
                "desc": "Visit our senior community, taste the dining hall food, and speak with resident elders living happily at Athashri.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Athashri%20Senior%20Living%20Bhugaon",
                "cta_text": "Book Family Experience Tour"
            }
        ]
    },
    {
        "slug": "highgardens-panoramic-apartments",
        "title": "Highgardens 2 BHK Panoramic Apartments | Paranjape Forest Trails Bhugaon",
        "h1": "Highgardens 2 BHK Panoramic Apartments Bhugaon",
        "meta_desc": "Ready possession panoramic 2 BHK apartments at Highgardens, Paranjape Forest Trails Bhugaon Pune from ₹89 Lakh*. Hill views, clubhouse & swift connectivity.",
        "category": "Panoramic 2 BHK",
        "price_badge": "₹89 Lakh* Onwards",
        "rera": "P52100053310",
        "target_url": "/paranjape-forest-trails-township-bhugaon-highgardens/",
        "target_label": "Explore Highgardens",
        "slides": [
            {
                "id": "cover",
                "tag": "READY POSSESSION HOMES",
                "h2": "Highgardens: Panoramic 2 BHK Forest Living from ₹89L*",
                "desc": "No construction waiting! Move directly into ready 2 BHK hillview apartments with full OC inside Paranjape Forest Trails.",
                "badge": "MahaRERA: P52100053310",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-highgardens/",
                "cta_text": "Explore Highgardens"
            },
            {
                "id": "views",
                "tag": "ELEVATED VIEWS",
                "h2": "Valley Facing Balconies Looking Over Sahyadri Hills",
                "desc": "Enjoy morning sunrise across rolling green hills. Premium high-floor residences with cross ventilation and cool breeze.",
                "badge": "Breathtaking Valley Views",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-highgardens/",
                "cta_text": "Check Floor Balconies"
            },
            {
                "id": "carpet",
                "tag": "OPTIMAL SPACE",
                "h2": "820 Sq. Ft. Carpet Designed with Zero Space Wastage",
                "desc": "Spacious living-dining layout, two comfortable bedrooms, designer bathrooms, and dedicated covered vehicle parking.",
                "badge": "Ready to Move In",
                "cta_url": "/2bhk-in-bhugaon/",
                "cta_text": "View Carpet Layout"
            },
            {
                "id": "amenities",
                "tag": "COMPLETE AMENITIES",
                "h2": "Enclave Swimming Pool, Club, Jogging Track & Gardens",
                "desc": "Self-contained recreational enclave inside the secure 190-acre gated township boundary.",
                "badge": "Ready Amenities",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "Tour Enclave Amenities"
            },
            {
                "id": "bavdhan",
                "tag": "CONNECTED LOCATION",
                "h2": "5 Minutes to Bavdhan & 10 Min to Kothrud Chandani Chowk",
                "desc": "Enjoy peaceful hill station living while staying completely connected to schools, hospitals, and shopping centers.",
                "badge": "5 Min from Bavdhan",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "Location Map & Access"
            },
            {
                "id": "visit",
                "tag": "READY APARTMENTS",
                "h2": "Ready 2 BHK from ₹89L* — Walk into Your New Home Today",
                "desc": "Immediate key handover on registration. Zero GST on ready-to-move homes. Save up to ₹4 Lakhs on taxes.",
                "badge": "Call: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Highgardens%20Ready%202BHK",
                "cta_text": "Inspect Ready Flats"
            }
        ]
    }
]

def generate_web_story_html(story):
    slug = story["slug"]
    title = story["title"]
    h1 = story["h1"]
    meta_desc = story["meta_desc"]
    canonical_url = f"{DOMAIN}/web-stories/{slug}/"
    poster_portrait = f"{DOMAIN}/images/web-stories/{slug}-portrait.webp"
    poster_square = f"{DOMAIN}/images/web-stories/{slug}-square.webp"
    poster_landscape = f"{DOMAIN}/images/web-stories/{slug}-landscape.webp"
    publisher_logo = f"{DOMAIN}/images/web-stories/publisher-logo-192x192.png"

    # Schema JSON-LD
    schema_json = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical_url
        },
        "headline": title,
        "image": [
            poster_portrait,
            poster_square,
            poster_landscape
        ],
        "datePublished": "2026-10-10T08:00:00+05:30",
        "dateModified": TODAY_ISO,
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
    }
    schema_str = json.dumps(schema_json, indent=2)

    # Build slides
    slides_html = []
    for i, slide in enumerate(story["slides"]):
        slide_num = i + 1
        slide_img = f"/images/web-stories/{slug}-slide-{slide_num}.webp"
        slide_id = f"page-{slide['id']}"

        # Cover slide has the single H1 to satisfy exact gap analysis check
        heading_html = f'<h1 class="story-h1" animate-in="fly-in-bottom" animate-in-duration="0.4s" animate-in-delay="0.15s">{slide["h2"]}</h1>' if i == 0 else f'<h2 class="story-h2" animate-in="fly-in-bottom" animate-in-duration="0.4s" animate-in-delay="0.15s">{slide["h2"]}</h2>'

        # Outlink CTA
        cta_url = slide["cta_url"]
        if cta_url.startswith("/") and not cta_url.endswith("/"):
            cta_url += "/"
        cta_text = slide["cta_text"]

        slide_markup = f"""
    <!-- Slide {slide_num}: {slide['id']} -->
    <amp-story-page id="{slide_id}" auto-advance-after="7s">
      <amp-story-grid-layer template="fill">
        <amp-img src="{slide_img}" width="720" height="1280" layout="responsive" alt="{slide['h2']} - Paranjape Forest Trails"></amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="gradient-overlay">
        <div class="top-nav" animate-in="fade-in" animate-in-duration="0.3s">
          <span class="story-category">{story['category']}</span>
          <span class="slide-counter">{slide_num} / {len(story['slides'])}</span>
        </div>
        <div class="card-content">
          <div class="tag-badge" animate-in="fade-in" animate-in-duration="0.4s" animate-in-delay="0.1s">{slide['tag']}</div>
          {heading_html}
          <p class="story-desc" animate-in="fade-in" animate-in-duration="0.4s" animate-in-delay="0.25s">{slide['desc']}</p>
          <div class="meta-pill" animate-in="fly-in-bottom" animate-in-duration="0.4s" animate-in-delay="0.35s">
            <span class="pill-dot"></span>
            <span class="pill-text">{slide['badge']}</span>
          </div>
        </div>
      </amp-story-grid-layer>
      <amp-story-page-outlink layout="nodisplay">
        <a href="{cta_url}">{cta_text}</a>
      </amp-story-page-outlink>
    </amp-story-page>"""
        slides_html.append(slide_markup)

    slides_joined = "\n".join(slides_html)

    html_content = f"""<!DOCTYPE html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <title>{title}</title>
  <link rel="canonical" href="{canonical_url}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="description" content="{meta_desc}">
  <meta name="theme-color" content="#4A0808">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{meta_desc}">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:image" content="{poster_portrait}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{meta_desc}">
  <meta name="twitter:image" content="{poster_portrait}">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <style amp-boilerplate>body{{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}}@-webkit-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}@-moz-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}@-ms-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}@-o-keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}@keyframes -amp-start{{from{{visibility:hidden}}to{{visibility:visible}}}}</style><noscript><style amp-boilerplate>body{{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}}</style></noscript>
  <style amp-custom>
    amp-story {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #ffffff;
    }}
    .gradient-overlay {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3.5rem 1.25rem 2.5rem 1.25rem;
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.1) 35%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.95) 100%);
    }}
    .top-nav {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }}
    .story-category {{
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: rgba(74, 8, 8, 0.85);
      color: #FDE047;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      border: 1px solid rgba(253, 224, 71, 0.35);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }}
    .slide-counter {{
      font-size: 0.75rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(0, 0, 0, 0.4);
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
    }}
    .card-content {{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2rem;
    }}
    .tag-badge {{
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: #D4AF37;
      color: #1a1a1a;
      padding: 0.25rem 0.65rem;
      border-radius: 4px;
      margin-bottom: 0.75rem;
    }}
    .story-h1, .story-h2 {{
      font-size: 1.6rem;
      line-height: 1.25;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 0.65rem 0;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
    }}
    .story-desc {{
      font-size: 0.95rem;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.92);
      margin: 0 0 1rem 0;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
    }}
    .meta-pill {{
      display: inline-flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
    }}
    .pill-dot {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      margin-right: 0.5rem;
    }}
    .pill-text {{
      font-size: 0.78rem;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.02em;
    }}
  </style>
  <script type="application/ld+json">
{schema_str}
  </script>
</head>
<body>
  <amp-story
    standalone
    title="{title}"
    publisher="Paranjape Forest Trails"
    publisher-logo-src="{publisher_logo}"
    poster-portrait-src="{poster_portrait}"
    poster-square-src="{poster_square}"
    poster-landscape-src="{poster_landscape}">

    <amp-analytics type="gtag">
      <script type="application/json">
      {{
        "vars": {{
          "gtag_id": "AW-17430583486",
          "config": {{
            "AW-17430583486": {{ "groups": "default" }},
            "G-PARANJAPE": {{ "groups": "default" }}
          }}
        }}
      }}
      </script>
    </amp-analytics>
{slides_joined}

  </amp-story>
</body>
</html>"""
    return html_content

def generate_hub_html():
    hub_title = "Google Web Stories | Paranjape Forest Trails Bhugaon Pune"
    hub_desc = "Explore immersive visual Google Web Stories for Paranjape Forest Trails Township Bhugaon. Discover NA plots, luxury villas, 2 & 3 BHK apartments & amenities."
    canonical_url = f"{DOMAIN}/web-stories/"

    # Schema JSON-LD for Hub
    items_json = []
    for i, s in enumerate(STORIES):
        items_json.append({
            "@type": "ListItem",
            "position": i + 1,
            "url": f"{DOMAIN}/web-stories/{s['slug']}/",
            "name": s["title"]
        })

    hub_schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": hub_title,
        "description": hub_desc,
        "url": canonical_url,
        "publisher": {
            "@type": "Organization",
            "name": "Paranjape Forest Trails",
            "logo": f"{DOMAIN}/favicon.png"
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": len(STORIES),
            "itemListElement": items_json
        }
    }
    hub_schema_str = json.dumps(hub_schema, indent=2)

    # Story cards markup
    cards_html = []
    for s in STORIES:
        slug = s["slug"]
        story_url = f"/web-stories/{slug}/"
        thumb_url = f"/images/web-stories/{slug}-portrait.webp"
        card = f"""
      <article class="story-card">
        <a href="{story_url}" class="card-media-wrap" aria-label="Watch Web Story: {s['title']}">
          <img src="{thumb_url}" alt="{s['title']}" width="720" height="960" loading="lazy" class="story-thumb">
          <div class="media-overlay">
            <span class="category-pill">{s['category']}</span>
            <div class="play-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="meta-bottom">
              <span class="badge-price">{s['price_badge']}</span>
              <span class="read-time">6 Slides • 1 Min</span>
            </div>
          </div>
        </a>
        <div class="card-body">
          <h2 class="card-title"><a href="{story_url}">{s['h1']}</a></h2>
          <p class="card-desc">{s['meta_desc']}</p>
          <div class="card-actions">
            <a href="{story_url}" class="btn-watch">
              <span>Watch Story</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="{s['target_url']}" class="btn-sub">{s['target_label']}</a>
          </div>
        </div>
      </article>"""
        cards_html.append(card)

    cards_joined = "\n".join(cards_html)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{hub_title}</title>
  <meta name="description" content="{hub_desc}">
  <link rel="canonical" href="{canonical_url}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="theme-color" content="#4A0808">
  <meta property="og:title" content="{hub_title}">
  <meta property="og:description" content="{hub_desc}">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:image" content="{DOMAIN}/images/web-stories/misty-greens-plots-bhugaon-portrait.webp">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{hub_title}">
  <meta name="twitter:description" content="{hub_desc}">
  <meta name="twitter:image" content="{DOMAIN}/images/web-stories/misty-greens-plots-bhugaon-portrait.webp">
  <link rel="stylesheet" href="/style.min.css?v=2026.08.24.10">
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17430583486"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'AW-17430583486');
    gtag('config', 'G-PARANJAPE');
  </script>
  <script type="application/ld+json">
{hub_schema_str}
  </script>
  <style>
    :root {{
      --primary: #4A0808;
      --gold: #D4AF37;
      --dark: #0f172a;
      --card-bg: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }}
    body {{
      background-color: #0b1120;
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
    }}
    .hub-header {{
      background: linear-gradient(135deg, #2b0404 0%, #4A0808 60%, #1a0505 100%);
      padding: 3rem 1.5rem 3.5rem 1.5rem;
      text-align: center;
      border-bottom: 2px solid rgba(212, 175, 55, 0.25);
    }}
    .hub-header-badge {{
      display: inline-flex;
      align-items: center;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #FDE047;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.4rem 1rem;
      border-radius: 9999px;
      margin-bottom: 1.25rem;
    }}
    .hub-h1 {{
      font-size: 2.25rem;
      line-height: 1.25;
      font-weight: 800;
      color: #ffffff;
      max-width: 860px;
      margin: 0 auto 1rem auto;
    }}
    .hub-subtitle {{
      font-size: 1.1rem;
      line-height: 1.6;
      color: #e2e8f0;
      max-width: 720px;
      margin: 0 auto 1.5rem auto;
    }}
    .stories-container {{
      max-width: 1240px;
      margin: 0 auto;
      padding: 3.5rem 1.5rem;
    }}
    .stories-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }}
    .story-card {{
      background: var(--card-bg);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }}
    .story-card:hover {{
      transform: translateY(-6px);
      box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.6);
      border-color: rgba(212, 175, 55, 0.5);
    }}
    .card-media-wrap {{
      position: relative;
      display: block;
      aspect-ratio: 3 / 4;
      overflow: hidden;
      background: #000;
    }}
    .story-thumb {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }}
    .story-card:hover .story-thumb {{
      transform: scale(1.05);
    }}
    .media-overlay {{
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.85) 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
    }}
    .category-pill {{
      align-self: flex-start;
      background: rgba(74, 8, 8, 0.9);
      color: #FDE047;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      border: 1px solid rgba(253, 224, 71, 0.35);
    }}
    .play-badge {{
      align-self: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.9);
      color: #1a0505;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      transition: transform 0.2s ease, background 0.2s ease;
    }}
    .story-card:hover .play-badge {{
      transform: scale(1.15);
      background: #FDE047;
    }}
    .meta-bottom {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      color: #e2e8f0;
    }}
    .badge-price {{
      background: rgba(16, 185, 129, 0.9);
      color: #ffffff;
      font-weight: 700;
      padding: 0.2rem 0.55rem;
      border-radius: 4px;
    }}
    .read-time {{
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }}
    .card-body {{
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }}
    .card-title {{
      font-size: 1.15rem;
      line-height: 1.35;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }}
    .card-title a {{
      color: #ffffff;
      text-decoration: none;
    }}
    .card-title a:hover {{
      color: var(--gold);
    }}
    .card-desc {{
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--text-muted);
      margin: 0 0 1.25rem 0;
      flex-grow: 1;
    }}
    .card-actions {{
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }}
    .btn-watch {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #D4AF37 0%, #b89326 100%);
      color: #1a0505;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 0.65rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      transition: opacity 0.2s ease;
    }}
    .btn-watch:hover {{
      opacity: 0.92;
    }}
    .btn-sub {{
      font-size: 0.8rem;
      color: #cbd5e1;
      text-decoration: none;
      text-align: center;
      padding: 0.35rem 0;
      border-radius: 6px;
      transition: color 0.2s ease;
    }}
    .btn-sub:hover {{
      color: #FDE047;
      text-decoration: underline;
    }}
    .cta-banner {{
      margin-top: 4rem;
      background: linear-gradient(135deg, #4A0808 0%, #2b0404 100%);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
      padding: 2.5rem 1.5rem;
      text-align: center;
    }}
    .cta-banner h2 {{
      font-size: 1.8rem;
      color: #ffffff;
      margin: 0 0 0.75rem 0;
    }}
    .cta-banner p {{
      color: #e2e8f0;
      max-width: 600px;
      margin: 0 auto 1.5rem auto;
      font-size: 1rem;
    }}
    .cta-btn-group {{
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }}
    .cta-btn-primary {{
      background: #D4AF37;
      color: #1a0505;
      font-weight: 700;
      padding: 0.8rem 1.75rem;
      border-radius: 8px;
      text-decoration: none;
    }}
    .cta-btn-whatsapp {{
      background: #25D366;
      color: #ffffff;
      font-weight: 700;
      padding: 0.8rem 1.75rem;
      border-radius: 8px;
      text-decoration: none;
    }}
    .hub-footer {{
      background: #050811;
      padding: 2.5rem 1.5rem;
      text-align: center;
      font-size: 0.85rem;
      color: #64748b;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }}
    .hub-footer a {{
      color: #94a3b8;
      text-decoration: none;
      margin: 0 0.5rem;
    }}
    .hub-footer a:hover {{
      color: var(--gold);
    }}
  </style>
</head>
<body>

  <!-- Header -->
  <header class="hub-header">
    <div class="hub-header-badge">Google Discover & Visual SERP Experience</div>
    <h1 class="hub-h1">Google Web Stories — Paranjape Forest Trails Bhugaon</h1>
    <p class="hub-subtitle">Tap and swipe through interactive visual stories covering NA bungalow plots, luxury forest villas, nature apartments, 190-acre lifestyle, and West Pune infrastructure.</p>
  </header>

  <!-- Main Grid -->
  <main class="stories-container">
    <div class="stories-grid">
{cards_joined}
    </div>

    <!-- Conversion Banner -->
    <div class="cta-banner">
      <h2>Plan Your Site Visit to Paranjape Forest Trails Bhugaon</h2>
      <p>Explore the 190-acre green township in person. Free guided site tours available daily with pickup assistance from Kothrud & Bavdhan.</p>
      <div class="cta-btn-group">
        <a href="tel:+917744009295" class="cta-btn-primary">Call Advisory: +91 7744009295</a>
        <a href="https://wa.me/917744009295?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20site%20visit%20to%20Paranjape%20Forest%20Trails" class="cta-btn-whatsapp">WhatsApp Concierge</a>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="hub-footer">
    <p style="margin-bottom: 0.75rem;">
      <a href="/">Home</a> |
      <a href="/paranjape-forest-trails-township-bhugaon-misty-greens/">Misty Greens Plots</a> |
      <a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/">The Rivolo Villas</a> |
      <a href="/paranjape-forest-trails-township-bhugaon-the-canopy/">The Canopy</a> |
      <a href="/master-plan-layout-explorer/">Masterplan</a> |
      <a href="/sitemap-page/">HTML Sitemap</a>
    </p>
    <p style="margin-bottom: 0.5rem;">Paranjape Forest Trails Township, Paud Road, Bhugaon, Pune West 412115 | MahaRERA Registered</p>
    <p style="margin: 0;">Contact: +91 7744009295 | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--> | All prices indicative (*)</p>
  </footer>

</body>
</html>"""
    return html

def generate_sitemap_stories():
    stories_urls = [f"{DOMAIN}/web-stories/"]
    for s in STORIES:
        stories_urls.append(f"{DOMAIN}/web-stories/{s['slug']}/")

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    for u in stories_urls:
        xml_lines.append("  <url>")
        xml_lines.append(f"    <loc>{u}</loc>")
        xml_lines.append(f"    <lastmod>{DATE_STR}</lastmod>")
        xml_lines.append("    <changefreq>weekly</changefreq>")
        priority = "0.95" if u.endswith("/web-stories/") else "0.90"
        xml_lines.append(f"    <priority>{priority}</priority>")
        xml_lines.append("  </url>")
    xml_lines.append("</urlset>")
    
    out_path = os.path.join(BASE_DIR, "sitemap-stories.xml")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines))
    print(f"Generated {out_path} with {len(stories_urls)} URLs.")

    # Register in master sitemap.xml
    sitemap_xml_path = os.path.join(BASE_DIR, "sitemap.xml")
    if os.path.exists(sitemap_xml_path):
        content = open(sitemap_xml_path, "r", encoding="utf-8").read()
        if "sitemap-stories.xml" not in content:
            new_entry = f"""  <sitemap>
    <loc>{DOMAIN}/sitemap-stories.xml</loc>
    <lastmod>{DATE_STR}</lastmod>
  </sitemap>
</sitemapindex>"""
            content = content.replace("</sitemapindex>", new_entry)
            with open(sitemap_xml_path, "w", encoding="utf-8") as f:
                f.write(content)
            print("Registered sitemap-stories.xml inside sitemap.xml.")

def main():
    print("Generating Expansive Google Web Stories...")

    # 1. Generate individual Web Stories
    for story in STORIES:
        slug = story["slug"]
        story_dir = os.path.join(BASE_DIR, "web-stories", slug)
        os.makedirs(story_dir, exist_ok=True)
        story_file = os.path.join(story_dir, "index.html")
        html_content = generate_web_story_html(story)
        with open(story_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Generated Web Story: /web-stories/{slug}/index.html")

    # 2. Generate Web Stories Hub Portal
    hub_file = os.path.join(BASE_DIR, "web-stories", "index.html")
    hub_html = generate_hub_html()
    with open(hub_file, "w", encoding="utf-8") as f:
        f.write(hub_html)
    print(f"Generated Web Stories Hub: /web-stories/index.html")

    # 3. Generate Dedicated Stories Sitemap & register in sitemap.xml
    generate_sitemap_stories()

    print("Google Web Stories generation complete!")

if __name__ == "__main__":
    main()
