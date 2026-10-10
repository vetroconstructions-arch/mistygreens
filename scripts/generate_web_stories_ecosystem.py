#!/usr/bin/env python3
"""
EXPANSIVE CROSS-PLATFORM GOOGLE WEB STORIES ECOSYSTEM GENERATOR
==============================================================
Generates and orchestrates the complete Web Stories suite for Paranjape Forest Trails:
1. 8 100% AMP-compliant Web Stories (amp-story-1.0) with enhanced multi-platform metadata:
   - Open Graph (WhatsApp, Facebook, LinkedIn, Telegram)
   - Twitter Cards (summary_large_image)
   - Pinterest Rich Pin tags
   - schema.org NewsArticle & WebPage structured data
   - amp-analytics with GA4 (G-PARANJAPE) & Google Ads (AW-17430583486)
2. Standalone SVG QR Codes for every story (images/web-stories/{slug}-qr.svg)
3. Media RSS 2.0 Syndication Feed (web-stories/feed.xml) for Google News / Discover
4. Cross-Platform Web Stories Hub (web-stories/index.html) with:
   - One-tap WhatsApp, Facebook, X, LinkedIn, Telegram & native mobile Web Share
   - Interactive QR Code mobile preview modal
   - Embed snippet generator modal (iframe & amp-story-player) for partner syndication
   - Enclave category filter chips
5. Universal Stories Avatar Tray component (components/web-stories-tray.html)
6. Safe injection of the Stories Tray across core high-traffic pages
"""

import os
import re
import json
import qrcode
import qrcode.image.svg
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.paranjapetownship.com"
TODAY_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+05:30")
DATE_RFC822 = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")
DATE_STR = datetime.now(timezone.utc).strftime("%Y-%m-%d")

STORIES = [
    {
        "slug": "misty-greens-plots-bhugaon",
        "tray_title": "Misty Greens",
        "tray_price": "₹1.23 Cr*",
        "breadcrumb_name": "Misty Greens NA Plots",
        "title": "NA Bungalow Plots at Misty Greens Bhugaon | Paranjape Forest Trails",
        "h1": "NA Bungalow Plots at Misty Greens Bhugaon",
        "meta_desc": "Explore premium NA bungalow plots at Misty Greens, Paranjape Forest Trails Bhugaon Pune. 1800-3600 sq ft plots from ₹1.23 Cr* with clear RERA title.",
        "category": "NA Bungalow Plots",
        "filter": "plots",
        "price_badge": "₹1.23 Cr* Onwards",
        "rera": "P52100053834",
        "target_url": "/paranjape-forest-trails-township-bhugaon-misty-greens/",
        "target_label": "Explore Misty Greens Plots",
        "whatsapp_share_text": "Explore premium NA bungalow plots at Misty Greens, Paranjape Forest Trails Bhugaon Pune (1,800 - 3,600 sq ft from ₹1.23 Cr*):",
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
        "tray_title": "Rivolo Villas",
        "tray_price": "₹3.89 Cr*",
        "breadcrumb_name": "The Rivolo Villas",
        "title": "The Rivolo Luxury Forest Villas Bhugaon | 4 & 5 BHK Hilltop Homes",
        "h1": "The Rivolo Luxury Forest Villas Bhugaon",
        "meta_desc": "Experience ultra-luxury hilltop living at The Rivolo, Paranjape Forest Trails Bhugaon Pune. 4 & 5 BHK bespoke forest villas from ₹3.89 Cr* with private decks.",
        "category": "Luxury Forest Villas",
        "filter": "villas",
        "price_badge": "₹3.89 Cr* Onwards",
        "rera": "P52100031560",
        "target_url": "/paranjape-forest-trails-township-bhugaon-rivolo-residences/",
        "target_label": "Explore The Rivolo Villas",
        "whatsapp_share_text": "Experience bespoke 4 & 5 BHK hilltop forest villas at The Rivolo, Paranjape Forest Trails Bhugaon from ₹3.89 Cr*:",
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
        "tray_title": "The Canopy",
        "tray_price": "₹89 L*",
        "breadcrumb_name": "The Canopy Apartments",
        "title": "The Canopy 2 & 3 BHK Nature Apartments Bhugaon | Paranjape Forest Trails",
        "h1": "The Canopy 2 & 3 BHK Nature Apartments Bhugaon",
        "meta_desc": "Discover forest-facing 2 & 3 BHK apartments at The Canopy, Paranjape Forest Trails Bhugaon near Bavdhan Pune from ₹89 Lakh*. Modern amenities & green views.",
        "category": "Nature Apartments",
        "filter": "apartments",
        "price_badge": "₹89 Lakh* Onwards",
        "rera": "P52100079518",
        "target_url": "/paranjape-forest-trails-township-bhugaon-the-canopy/",
        "target_label": "Explore The Canopy Apartments",
        "whatsapp_share_text": "Check out forest-facing 2 & 3 BHK apartments at The Canopy, Paranjape Forest Trails Bhugaon from ₹89 Lakh*:",
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
        "tray_title": "The Cove",
        "tray_price": "₹2.85 Cr*",
        "breadcrumb_name": "The Cove Bungalows",
        "title": "The Cove Twin Bungalows Bhugaon Pune | 4 BHK Hillview Bungalows",
        "h1": "The Cove Twin Bungalows Bhugaon Pune",
        "meta_desc": "Explore 4 BHK twin bungalows at The Cove, Paranjape Forest Trails Bhugaon. Hillview independent living from ₹2.85 Cr* with private gardens and club access.",
        "category": "Twin Bungalows",
        "filter": "villas",
        "price_badge": "₹2.85 Cr* Onwards",
        "rera": "P52100048536",
        "target_url": "/paranjape-forest-trails-township-bhugaon-the-cove/",
        "target_label": "Explore The Cove Bungalows",
        "whatsapp_share_text": "Discover 4 BHK hillview twin bungalows with private gardens at The Cove, Paranjape Forest Trails from ₹2.85 Cr*:",
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
        "tray_title": "190-Acre Life",
        "tray_price": "190 Acres",
        "breadcrumb_name": "Township Lifestyle",
        "title": "Living in a 190-Acre Forest: The Lifestyle at Paranjape Forest Trails",
        "h1": "The 190-Acre Forest Lifestyle at Paranjape Forest Trails",
        "meta_desc": "Explore daily life across 190 acres at Paranjape Forest Trails Bhugaon Pune. Equestrian academy, The Cliff Club, forest trails, SSRVM school, and pure air.",
        "category": "Township Lifestyle",
        "filter": "lifestyle",
        "price_badge": "190-Acre Ecosystem",
        "rera": "Multi-Enclave RERA Certified",
        "target_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
        "target_label": "Discover Township Lifestyle",
        "whatsapp_share_text": "Experience 190 acres of nature living at Paranjape Forest Trails Bhugaon: The Cliff Club, Equestrian Academy & Forest Walks:",
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
        "tray_title": "Connectivity",
        "tray_price": "7 Min Flyover",
        "breadcrumb_name": "PMRDA Connectivity",
        "title": "Chandani Chowk & PMRDA Ring Road: Bhugaon Connectivity Advantage",
        "h1": "Chandani Chowk & PMRDA Ring Road Connectivity",
        "meta_desc": "See how Chandani Chowk Flyover & the PMRDA Ring Road cut travel times to Kothrud, Bavdhan, and Hinjewadi IT Park from Paranjape Forest Trails Bhugaon Pune.",
        "category": "Connectivity & Growth",
        "filter": "infrastructure",
        "price_badge": "High ROI Growth Corridor",
        "rera": "Prime West Pune Micro-Market",
        "target_url": "/pune-metro-extension-paud-road-bhugaon-connectivity/",
        "target_label": "Read Connectivity Report",
        "whatsapp_share_text": "Check out the West Pune infrastructure impact analysis for Bhugaon & Chandani Chowk Flyover connectivity:",
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
        "tray_title": "Athashri",
        "tray_price": "₹83 L*",
        "breadcrumb_name": "Athashri Senior Living",
        "title": "Athashri Senior Living Bhugaon Pune | Paranjape Forest Trails",
        "h1": "Athashri Senior Living Bhugaon Pune",
        "meta_desc": "Discover Athashri Senior Living at Paranjape Forest Trails Bhugaon. Thoughtfully designed 2 BHK homes from ₹83 Lakh* with 24x7 doctor, nurse & senior care.",
        "category": "Senior Living",
        "filter": "senior",
        "price_badge": "₹83 Lakh* Onwards",
        "rera": "P52100077686",
        "target_url": "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/",
        "target_label": "Explore Athashri Senior Living",
        "whatsapp_share_text": "Explore Athashri Senior Living at Paranjape Forest Trails Bhugaon Pune (2 BHK homes from ₹83 Lakh* with 24x7 medical care):",
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
        "tray_title": "Highgardens",
        "tray_price": "₹89 L*",
        "breadcrumb_name": "Highgardens Apartments",
        "title": "Highgardens 2 BHK Panoramic Apartments | Paranjape Forest Trails Bhugaon",
        "h1": "Highgardens 2 BHK Panoramic Apartments Bhugaon",
        "meta_desc": "Ready possession panoramic 2 BHK apartments at Highgardens, Paranjape Forest Trails Bhugaon Pune from ₹89 Lakh*. Hill views, clubhouse & swift connectivity.",
        "category": "Panoramic 2 BHK",
        "filter": "apartments",
        "price_badge": "₹89 Lakh* Onwards",
        "rera": "P52100053310",
        "target_url": "/paranjape-forest-trails-township-bhugaon-highgardens/",
        "target_label": "Explore Highgardens",
        "whatsapp_share_text": "View ready possession 2 BHK panoramic hillview apartments at Highgardens, Paranjape Forest Trails Bhugaon from ₹89 Lakh*:",
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
    },
    {
        "slug": "pune-madhe-na-plots-marathi",
        "tray_title": "मिस्टी ग्रीन्स (MR)",
        "tray_price": "₹१.२३ कोटी*",
        "breadcrumb_name": "पुण्यात एनए प्लॉट (मराठी)",
        "title": "पुण्यात एनए बंगलो प्लॉट | Misty Greens Forest Trails भुगाव",
        "h1": "पुण्यात एनए बंगलो प्लॉट — मिस्टी ग्रीन्स भुगाव",
        "meta_desc": "पुणे पश्चिम भुगाव येथे परांजपे फॉरेस्ट ट्रेल्स मिस्टी ग्रीन्स एनए बंगलो प्लॉट ₹१.२३ कोटी* पासून उपलब्ध. १८०० ते ३६०० चौ.फूट, MahaRERA P52100053834.",
        "category": "एनए बंगलो प्लॉट",
        "filter": "plots",
        "lang": "mr",
        "locale": "mr_IN",
        "in_language": "mr-IN",
        "price_badge": "₹१.२३ कोटी* पासून",
        "rera": "P52100053834",
        "target_url": "/pune-madhe-plot/",
        "target_label": "एनए प्लॉट संपूर्ण माहिती",
        "whatsapp_share_text": "पुण्यात एनए बंगलो प्लॉट पहा - परांजपे फॉरेस्ट ट्रेल्स भुगाव (१८००-३६०० चौ.फूट, ₹१.२३ कोटी*):",
        "slides": [
            {
                "id": "cover",
                "tag": "१००% एनए प्लॉट",
                "h2": "मिस्टी ग्रीन्स: १९० एकर निसर्गरम्य टाऊनशिपमध्ये स्वतःचा बंगला बांधा",
                "desc": "पुणे पश्चिमेतील सर्वात मोठी निसर्ग टाऊनशिप. कलेक्टर एनए मंजूर आणि महा-रेरा प्रमाणित स्वतंत्र बंगलो प्लॉट.",
                "badge": "MahaRERA: P52100053834",
                "cta_url": "/pune-madhe-plot/",
                "cta_text": "प्लॉट मास्टरप्लॅन पहा"
            },
            {
                "id": "sizes",
                "tag": "प्लॉटचे विविध पर्याय",
                "h2": "१८०० ते ३६०० चौरस फूट स्वतंत्र एनए प्लॉट",
                "desc": "प्रत्येक प्लॉटला स्वतंत्र सीमाभिंत, पाणीपुरवठा, भूमिगत वीज केबल आणि डांबरी अंतर्गत रस्ते उपलब्ध.",
                "badge": "तात्काळ ताबा उपलब्ध",
                "cta_url": "/pune-madhe-plot/",
                "cta_text": "प्लॉट लेआउट तपासा"
            },
            {
                "id": "location",
                "tag": "उत्कृष्ट कनेक्टिव्हिटी",
                "h2": "चंदणी चौक फ्लायओव्हरपासून फक्त ७ मिनिटे अंतर",
                "desc": "पौड रोड, भुगाव येथे मोक्याचे स्थान. कोथरूड १० मिनिटे, बावधन ५ मिनिटे आणि हिंजवडी २५ मिनिटांत.",
                "badge": "पीएमआरडीए रिंग रोड कॉरिडोअर",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "स्थान नकाशा उघडा"
            },
            {
                "id": "amenities",
                "tag": "१९० एकर लक्झरी जीवनशैली",
                "h2": "द क्लिफ क्लब आणि अश्वारोहण अकादमी जवळच",
                "desc": "ऑलिम्पिक आकाराचा स्विमिंग पूल, टेनिस कोर्ट, ४.५ किमी फॉरेस्ट ट्रेल आणि १०,००० पेक्षा जास्त वृक्षांची सावली.",
                "badge": "५०+ जागतिक दर्जाच्या सुविधा",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "टाऊनशिप सुविधा पहा"
            },
            {
                "id": "legals",
                "tag": "१००% कायदेशीर व सुरक्षित",
                "h2": "महा-रेरा मंजूर आणि स्वतंत्र ७/१२ उतारा",
                "desc": "एसबीआय, एचडीएफसी आणि आयसीआयसीआय बँकेकडून ८०% पर्यंत गृहकर्ज उपलब्ध. एनआरआय खरेदीदारांसाठी विशेष मदत.",
                "badge": "कायदेशीर दस्तऐवज पडताळणी",
                "cta_url": "/pune-madhe-plot/",
                "cta_text": "रेरा प्रमाणपत्र तपासा"
            },
            {
                "id": "pricing",
                "tag": "मर्यादित प्लॉट शिल्लक",
                "h2": "किंमत ₹१.२३ कोटी* पासून — आजच साइट व्हिजिट बुक करा",
                "desc": "निसर्गाच्या सान्निध्यात प्रत्यक्ष प्लॉट पाहण्यासाठी दररोज मोफत मार्गदर्शन साइट व्हिजिट उपलब्ध.",
                "badge": "कॉल करा: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Misty%20Greens%20NA%20Plots%20Marathi",
                "cta_text": "मोफत साइट व्हिजिट बुक करा"
            }
        ]
    },
    {
        "slug": "bhugaon-luxury-villas-marathi",
        "tray_title": "रिव्होलो व्हिला (MR)",
        "tray_price": "₹३.८९ कोटी*",
        "breadcrumb_name": "लक्झरी व्हिला भुगाव (मराठी)",
        "title": "पुणे भुगाव लक्झरी व्हिला | The Rivolo Forest Trails",
        "h1": "पुणे भुगाव लक्झरी व्हिला — द रिव्होलो",
        "meta_desc": "पुणे पश्चिम भुगाव येथे ४ आणि ५ बीएचके लक्झरी फॉरेस्ट व्हिला ₹३.८९ कोटी* पासून. १९० एकर निसर्गरम्य टाऊनशिप, खाजगी डेक, MahaRERA P52100031560.",
        "category": "लक्झरी फॉरेस्ट व्हिला",
        "filter": "villas",
        "lang": "mr",
        "locale": "mr_IN",
        "in_language": "mr-IN",
        "price_badge": "₹३.८९ कोटी* पासून",
        "rera": "P52100031560",
        "target_url": "/pune-madhe-villa/",
        "target_label": "लक्झरी व्हिला माहिती",
        "whatsapp_share_text": "पुणे पश्चिम भुगाव येथे ४ आणि ५ बीएचके लक्झरी व्हिला पहा (₹३.८९ कोटी*):",
        "slides": [
            {
                "id": "cover",
                "tag": "अल्ट्रा लक्झरी व्हिला",
                "h2": "द रिव्होलो: ४ आणि ५ बीएचके स्वतंत्र फॉरेस्ट व्हिला",
                "desc": "फॉरेस्ट ट्रेल्सच्या सर्वोच्च शिखरावर स्थित. सह्याद्रीच्या डोंगररांगांचे विहंगम दृश्य आणि खाजगी सनडेक.",
                "badge": "MahaRERA: P52100031560",
                "cta_url": "/pune-madhe-villa/",
                "cta_text": "व्हिला तपशील पहा"
            },
            {
                "id": "architecture",
                "tag": "भव्य वास्तुरचना",
                "h2": "३२०० ते ४१०० चौ.फूट राजेशाही राहण्याची जागा",
                "desc": "इटालियन मार्बल फ्लोअरिंग, दुहेरी उंचीचे दिवाणखाने, खाजगी लिफ्टची तरतूद आणि स्वतंत्र अंगण.",
                "badge": "फक्त २४ निवडक व्हिला",
                "cta_url": "/pune-madhe-villa/",
                "cta_text": "फ्लोअर प्लॅन तपासा"
            },
            {
                "id": "lifestyle",
                "tag": "निसर्गाचा आनंद",
                "h2": "खाजगी प्लंज पूल आणि सनसेट व्ह्यूइंग गॅलरी",
                "desc": "हिरवेगार व्हॅली व्ह्यूज आणि पक्षांचा किलबिलाट. ९०% शुद्ध डोंगर हवा आणि संपूर्ण प्रदूषणमुक्त वातावरण.",
                "badge": "शुद्ध डोंगर हवा",
                "cta_url": "/pune-madhe-villa/",
                "cta_text": "व्हिला ब्रोशर डाउनलोड करा"
            },
            {
                "id": "privacy",
                "tag": "संपूर्ण सुरक्षा",
                "h2": "स्वतंत्र गेट आणि ३-स्तरीय २४/७ सुरक्षा यंत्रणा",
                "desc": "आरएफआयडी प्रवेश, मोटराइज्ड पेट्रोलिंग आणि सीसीटीव्ही निगराणीमुळे कुटुंबीयांसाठी १००% सुरक्षित वातावरण.",
                "badge": "गेटेड हिलटॉप समुदाय",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "सुरक्षा व्यवस्था पहा"
            },
            {
                "id": "developer",
                "tag": "५० वर्षांचा विश्वास",
                "h2": "परांजपे स्कीम्स — २०,०००+ समाधानी कुटुंबांची परंपरा",
                "desc": "उच्च दर्जाचे बांधकाम आणि वेळेवर ताबा. महा-रेरा नियमांचे काटेकोर पालन.",
                "badge": "ताबा टप्पा: Q4 2026",
                "cta_url": "/pune-madhe-villa/",
                "cta_text": "बांधकाम प्रगती तपासा"
            },
            {
                "id": "pricing",
                "tag": "खाजगी भेटीसाठी",
                "h2": "किंमत ₹३.८९ कोटी* पासून — व्हीआयपी व्हिला प्रिव्ह्यू",
                "desc": "आमच्या वरिष्ठ सल्लागारांशी संपर्क साधून वैयक्तिक व्हिला प्रदर्शन आणि सविस्तर माहिती मिळवा.",
                "badge": "कॉल करा: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20The%20Rivolo%20Forest%20Villas%20Marathi",
                "cta_text": "व्हीआयपी प्रिव्ह्यू बुक करा"
            }
        ]
    },
    {
        "slug": "pune-mein-na-plots-hindi",
        "tray_title": "मिस्टी ग्रीन्स (HI)",
        "tray_price": "₹1.23 Cr*",
        "breadcrumb_name": "पुणे में एनए प्लॉट्स (हिंदी)",
        "title": "पुणे में एनए प्लॉट्स | Misty Greens Paranjape Forest Trails",
        "h1": "पुणे में एनए बंगला प्लॉट्स — मिस्टी ग्रीन्स भुगाव",
        "meta_desc": "पुणे वेस्ट भुगाव में परांजपे फॉरेस्ट ट्रेल्स मिस्टी ग्रीन्स एनए प्लॉट्स ₹1.23 करोड़* से उपलब्ध। 1800-3600 वर्ग फुट, MahaRERA P52100053834.",
        "category": "एनए प्लॉट्स",
        "filter": "plots",
        "lang": "hi",
        "locale": "hi_IN",
        "in_language": "hi-IN",
        "price_badge": "₹1.23 करोड़* से",
        "rera": "P52100053834",
        "target_url": "/pune-mein-plot/",
        "target_label": "एनए प्लॉट्स पूरी जानकारी",
        "whatsapp_share_text": "पुणे वेस्ट भुगाव में एनए बंगला प्लॉट्स देखें (1800-3600 वर्ग फुट, ₹1.23 करोड़*):",
        "slides": [
            {
                "id": "cover",
                "tag": "कलेक्टर एनए प्लॉट्स",
                "h2": "मिस्टी ग्रीन्स: 190 एकड़ नेचर टाउनशिप में अपना बंगला बनाएं",
                "desc": "पुणे वेस्ट की सबसे बड़ी ग्रीन टाउनशिप। अपनी पसंद का बंगला बनाने की पूरी आजादी के साथ महा-रेरा अप्रूव्ड प्लॉट्स।",
                "badge": "MahaRERA: P52100053834",
                "cta_url": "/pune-mein-plot/",
                "cta_text": "मास्टरप्लान देखें"
            },
            {
                "id": "sizes",
                "tag": "प्लॉट के साइज़",
                "h2": "1,800 से 3,600 वर्ग फुट के स्वतंत्र एनए प्लॉट्स",
                "desc": "हर प्लॉट के लिए बाउंड्री वॉल, डेडिकेटेड पानी का कनेक्शन, अंडरग्राउंड वायरिंग और चौड़ी पक्की सड़कें।",
                "badge": "तत्काल पजेशन उपलब्ध",
                "cta_url": "/pune-mein-plot/",
                "cta_text": "उपलब्ध प्लॉट्स जांचें"
            },
            {
                "id": "location",
                "tag": "शानदार कनेक्टिविटी",
                "h2": "चांदनी चौक फ्लाईओवर से मात्र 7 मिनट की दूरी",
                "desc": "पौड रोड, भुगाव पर स्थित। कोथरुड 10 मिनट, बावधन 5 मिनट और हिंजेवाड़ी 25 मिनट की दूरी पर।",
                "badge": "PMRDA ग्रोथ कॉरिडोर",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "लोकेशन मैप खोलें"
            },
            {
                "id": "amenities",
                "tag": "190 एकड़ लाइफस्टाइल",
                "h2": "द क्लिफ क्लब और हॉर्स राइडिंग एकेडमी आपके द्वार पर",
                "desc": "ओलंपिक साइज स्विमिंग पूल, टेनिस कोर्ट, 4.5 किमी फॉरेस्ट ट्रेल्स और 10,000+ पेड़ों से घिरी हरियाली।",
                "badge": "50+ विश्वस्तरीय सुविधाएं",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "टाउनशिप सुविधाएं देखें"
            },
            {
                "id": "legals",
                "tag": "100% क्लियर टाइटल",
                "h2": "महा-रेरा व कलेक्टर एनए अप्रूव्ड, अलग 7/12 उतारा",
                "desc": "SBI, HDFC, ICICI से 80% तक होम लोन सुविधा। एनआरआई निवेशकों के लिए फेमा-कंप्लायंट प्रक्रिया।",
                "badge": "क्लियर टाइटल सर्टिफाइड",
                "cta_url": "/pune-mein-plot/",
                "cta_text": "रेरा डिटेल्स देखें"
            },
            {
                "id": "pricing",
                "tag": "सीमित प्लॉट्स उपलब्ध",
                "h2": "कीमत ₹1.23 करोड़* से — आज ही साइट विजिट बुक करें",
                "desc": "पहाड़ों की खूबसूरत वादियों का अनुभव स्वयं करें। रोजाना निशुल्क गाइडेड साइट विजिट उपलब्ध।",
                "badge": "कॉल: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Misty%20Greens%20NA%20Plots%20Hindi",
                "cta_text": "फ्री साइट विजिट बुक करें"
            }
        ]
    },
    {
        "slug": "bhugaon-mein-flats-hindi",
        "tray_title": "द कैनोपी (HI)",
        "tray_price": "₹89 L*",
        "breadcrumb_name": "द कैनोपी फ्लैट्स (हिंदी)",
        "title": "भुगाव में 2BHK 3BHK फ्लैट्स | The Canopy Forest Trails",
        "h1": "भुगाव पुणे में 2 और 3 BHK फ्लैट्स — द कैनोपी",
        "meta_desc": "पुणे बावधन के पास भुगाव में 2 और 3 BHK नेचर फ्लैट्स ₹89 लाख* से। 190 एकड़ टाउनशिप, 10,000+ पेड़, क्लबहाउस, MahaRERA P52100079518.",
        "category": "2 व 3 BHK फ्लैट्स",
        "filter": "apartments",
        "lang": "hi",
        "locale": "hi_IN",
        "in_language": "hi-IN",
        "price_badge": "₹89 लाख* से",
        "rera": "P52100079518",
        "target_url": "/bhugaon-mein-flat/",
        "target_label": "फ्लैट्स विवरण व कीमतें",
        "whatsapp_share_text": "भुगाव पुणे में 2 व 3 BHK नेचर अपार्टमेंट्स देखें (₹89 लाख* से):",
        "slides": [
            {
                "id": "cover",
                "tag": "नेचर-थीम्ड घर",
                "h2": "द कैनोपी: 2 और 3 BHK फॉरेस्ट फ्लैट्स ₹89 लाख* से",
                "desc": "जहां से जंगल शुरू होता है। बावधन के पास 10,000+ पेड़ों की हरियाली के बीच आधुनिक फ्लैट्स।",
                "badge": "MahaRERA: P52100079518",
                "cta_url": "/bhugaon-mein-flat/",
                "cta_text": "द कैनोपी एक्सप्लोर करें"
            },
            {
                "id": "layouts",
                "tag": "स्मार्ट लेआउट्स",
                "h2": "850 से 1,150 वर्ग फुट का अनुकूलित स्पेस",
                "desc": "जीरो स्पेस वेस्टेज, बड़ी बालकनी, हवादार बेडरूम और वास्तु सम्मत डिजाइन।",
                "badge": "वास्तु सम्मत योजना",
                "cta_url": "/bhugaon-mein-flat/",
                "cta_text": "फ्लोर प्लान्स देखें"
            },
            {
                "id": "greens",
                "tag": "पहाड़ी दृश्य",
                "h2": "बालकनी से सह्याद्री की पहाड़ियों के मनोरम दृश्य",
                "desc": "सुबह की चाय के साथ हरी-भरी वादियों का आनंद। शहर के प्रदूषण से दूर स्वच्छ और शांत वातावरण।",
                "badge": "फॉरेस्ट फेसिंग बालकनी",
                "cta_url": "/bhugaon-mein-flat/",
                "cta_text": "बालकनी व्यूज जांचें"
            },
            {
                "id": "club",
                "tag": "रेजिडेंशियल सुविधाएं",
                "h2": "क्लबहाउस, स्विमिंग पूल, जिम और किड्स प्ले एरिया",
                "desc": "निजी क्लबहाउस सुविधाओं के साथ 190 एकड़ टाउनशिप के क्लिफ क्लब और खेल सुविधाओं का पूरा उपयोग।",
                "badge": "15+ प्रीमियम सुविधाएं",
                "cta_url": "/paranjape-forest-trails-township-bhugaon-facilities/",
                "cta_text": "सुविधाएं देखें"
            },
            {
                "id": "connectivity",
                "tag": "त्वरित यात्रा",
                "h2": "बावधन सिर्फ 5 मिनट और कोथरुड 7 मिनट की दूरी पर",
                "desc": "चांदनी चौक तक सिग्नल-मुक्त ड्राइविंग। SSRVM स्कूल टाउनशिप के अंदर स्थित।",
                "badge": "बावधन के निकट",
                "cta_url": "/paranjape-forest-trails-bhugaon-location-map/",
                "cta_text": "दूरी व मैप देखें"
            },
            {
                "id": "pricing",
                "tag": "विशेष ऑफर",
                "h2": "2 BHK ₹89 लाख* | 3 BHK ₹1.24 करोड़* — तुरंत संपर्क करें",
                "desc": "फ्लेक्सिबल पेमेंट प्लान्स और प्रमुख राष्ट्रीय बैंकों से प्री-अप्रूव्ड होम लोन की सुविधा।",
                "badge": "कॉल: +91 7744009295",
                "cta_url": "https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20The%20Canopy%20Apartments%20Hindi",
                "cta_text": "प्राइस शीट व ब्रोशर पाएं"
            }
        ]
    }
]

def generate_qr_codes():
    out_dir = os.path.join(BASE_DIR, "images", "web-stories")
    public_dir = os.path.join(BASE_DIR, "public", "images", "web-stories")
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)
    factory = qrcode.image.svg.SvgPathImage
    import shutil
    for s in STORIES:
        slug = s["slug"]
        url = f"{DOMAIN}/web-stories/{slug}/"
        qr = qrcode.make(url, image_factory=factory, box_size=10, border=2)
        qr_file = os.path.join(out_dir, f"{slug}-qr.svg")
        qr.save(qr_file)
        shutil.copyfile(qr_file, os.path.join(public_dir, f"{slug}-qr.svg"))
    print(f"Generated {len(STORIES)} SVG QR codes for offline / mobile scanning.")

def generate_feed_xml():
    items_xml = []
    for s in STORIES:
        slug = s["slug"]
        url = f"{DOMAIN}/web-stories/{slug}/"
        img_url = f"{DOMAIN}/images/web-stories/{slug}-portrait.webp"
        thumb_url = f"{DOMAIN}/images/web-stories/{slug}-square.webp"
        desc = s["meta_desc"]
        
        item = f"""    <item>
      <title>{s['title']}</title>
      <link>{url}</link>
      <guid isPermaLink="true">{url}</guid>
      <pubDate>{DATE_RFC822}</pubDate>
      <description><![CDATA[{desc}]]></description>
      <category>{s['category']}</category>
      <media:content url="{img_url}" medium="image" width="720" height="960" type="image/webp" />
      <media:thumbnail url="{thumb_url}" width="720" height="720" />
      <enclosure url="{img_url}" length="85000" type="image/webp" />
      <author><!--email_off-->propsmartrealty@gmail.com<!--/email_off--> (Paranjape Schemes)</author>
    </item>"""
        items_xml.append(item)

    items_joined = "\n".join(items_xml)
    xml_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Paranjape Forest Trails Bhugaon | Official Google Web Stories Syndication Feed</title>
    <link>{DOMAIN}/web-stories/</link>
    <atom:link href="{DOMAIN}/web-stories/feed.xml" rel="self" type="application/rss+xml" />
    <description>Interactive visual Google Web Stories for Paranjape Forest Trails Township Bhugaon Pune. Covering NA bungalow plots, luxury villas, nature apartments, and PMRDA infrastructure.</description>
    <language>en-IN</language>
    <lastBuildDate>{DATE_RFC822}</lastBuildDate>
    <image>
      <url>{DOMAIN}/images/web-stories/publisher-logo-192x192.png</url>
      <title>Paranjape Forest Trails</title>
      <link>{DOMAIN}/web-stories/</link>
    </image>
{items_joined}
  </channel>
</rss>"""
    
    out_path = os.path.join(BASE_DIR, "web-stories", "feed.xml")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(xml_content)
    print(f"Generated Web Stories Media RSS Feed: {out_path}")


HREFLANG_MAP = {
    # Plots Cluster
    "misty-greens-plots-bhugaon": [
        ("en", f"{DOMAIN}/web-stories/misty-greens-plots-bhugaon/"),
        ("mr", f"{DOMAIN}/web-stories/pune-madhe-na-plots-marathi/"),
        ("hi", f"{DOMAIN}/web-stories/pune-mein-na-plots-hindi/"),
        ("x-default", f"{DOMAIN}/web-stories/misty-greens-plots-bhugaon/"),
    ],
    "pune-madhe-na-plots-marathi": [
        ("en", f"{DOMAIN}/web-stories/misty-greens-plots-bhugaon/"),
        ("mr", f"{DOMAIN}/web-stories/pune-madhe-na-plots-marathi/"),
        ("hi", f"{DOMAIN}/web-stories/pune-mein-na-plots-hindi/"),
        ("x-default", f"{DOMAIN}/web-stories/misty-greens-plots-bhugaon/"),
    ],
    "pune-mein-na-plots-hindi": [
        ("en", f"{DOMAIN}/web-stories/misty-greens-plots-bhugaon/"),
        ("mr", f"{DOMAIN}/web-stories/pune-madhe-na-plots-marathi/"),
        ("hi", f"{DOMAIN}/web-stories/pune-mein-na-plots-hindi/"),
        ("x-default", f"{DOMAIN}/web-stories/misty-greens-plots-bhugaon/"),
    ],
    # Villas Cluster
    "luxury-forest-villas-rivolo": [
        ("en", f"{DOMAIN}/web-stories/luxury-forest-villas-rivolo/"),
        ("mr", f"{DOMAIN}/web-stories/bhugaon-luxury-villas-marathi/"),
        ("x-default", f"{DOMAIN}/web-stories/luxury-forest-villas-rivolo/"),
    ],
    "bhugaon-luxury-villas-marathi": [
        ("en", f"{DOMAIN}/web-stories/luxury-forest-villas-rivolo/"),
        ("mr", f"{DOMAIN}/web-stories/bhugaon-luxury-villas-marathi/"),
        ("x-default", f"{DOMAIN}/web-stories/luxury-forest-villas-rivolo/"),
    ],
    # Apartments Cluster
    "the-canopy-nature-apartments": [
        ("en", f"{DOMAIN}/web-stories/the-canopy-nature-apartments/"),
        ("hi", f"{DOMAIN}/web-stories/bhugaon-mein-flats-hindi/"),
        ("x-default", f"{DOMAIN}/web-stories/the-canopy-nature-apartments/"),
    ],
    "bhugaon-mein-flats-hindi": [
        ("en", f"{DOMAIN}/web-stories/the-canopy-nature-apartments/"),
        ("hi", f"{DOMAIN}/web-stories/bhugaon-mein-flats-hindi/"),
        ("x-default", f"{DOMAIN}/web-stories/the-canopy-nature-apartments/"),
    ],
}

def generate_web_story_html(story):
    slug = story["slug"]
    title = story["title"]
    h1 = story["h1"]
    meta_desc = story["meta_desc"]
    canonical_url = f"{DOMAIN}/web-stories/{slug}/"
    poster_portrait = f"{DOMAIN}/images/web-stories/{slug}-portrait.webp"
    poster_square = f"{DOMAIN}/images/web-stories/{slug}-square.webp"
    poster_landscape = f"{DOMAIN}/images/web-stories/{slug}-landscape.webp"
    poster_jpg = f"{DOMAIN}/images/web-stories/{slug}-portrait.jpg"
    publisher_logo = f"{DOMAIN}/images/web-stories/publisher-logo-192x192.png"

    lang = story.get("lang", "en")
    locale = story.get("locale", "en_IN")
    in_language = story.get("in_language", "en-IN")
    breadcrumb_name = story.get("breadcrumb_name") or title

    # Dynamic hreflang tags
    hreflang_tags = []
    if slug in HREFLANG_MAP:
        for lang_code, href in HREFLANG_MAP[slug]:
            hreflang_tags.append(f'  <link rel="alternate" hreflang="{lang_code}" href="{href}">')
    else:
        hreflang_tags.append(f'  <link rel="alternate" hreflang="{lang}" href="{canonical_url}">')
        hreflang_tags.append(f'  <link rel="alternate" hreflang="x-default" href="{canonical_url}">')
    hreflang_str = chr(10).join(hreflang_tags)

    # Schema JSON-LD with @graph (NewsArticle + BreadcrumbList)
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
    schema_str = json.dumps(schema_json, indent=2, ensure_ascii=False)

    # Build slides
    slides_html = []
    for i, slide in enumerate(story["slides"]):
        slide_num = i + 1
        slide_img = f"/images/web-stories/{slug}-slide-{slide_num}.webp"
        slide_id = f"page-{slide['id']}"

        heading_html = f'<h1 class="story-h1" animate-in="fly-in-bottom" animate-in-duration="0.4s" animate-in-delay="0.15s">{slide["h2"]}</h1>' if i == 0 else f'<h2 class="story-h2" animate-in="fly-in-bottom" animate-in-duration="0.4s" animate-in-delay="0.15s">{slide["h2"]}</h2>'

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

    slides_joined = chr(10).join(slides_html)

    html_content = f"""<!DOCTYPE html>
<html ⚡ lang="{lang}">
<head>
  <meta charset="utf-8">
  <title>{title}</title>
  <link rel="canonical" href="{canonical_url}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="description" content="{meta_desc}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
{hreflang_str}
  <meta name="theme-color" content="#4A0808">
  <!-- Multi-Platform Open Graph (WhatsApp, Telegram, Facebook, LinkedIn) -->
  <meta property="og:site_name" content="Paranjape Forest Trails Township Bhugaon">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{meta_desc}">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:image" content="{poster_jpg}">
  <meta property="og:image:secure_url" content="{poster_jpg}">
  <meta property="og:image:width" content="720">
  <meta property="og:image:height" content="960">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:locale" content="{locale}">
  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@ParanjapeScheme">
  <meta name="twitter:creator" content="@ParanjapeScheme">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{meta_desc}">
  <meta name="twitter:image" content="{poster_landscape}">
  <!-- Pinterest Rich Pin -->
  <meta property="article:publisher" content="https://www.facebook.com/ParanjapeSchemes">
  <meta property="article:section" content="{story['category']}">
  <meta name="p:domain_verify" content="paranjapetownship">
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
        }},
        "triggers": {{
          "storyPageVisible": {{
            "on": "story-page-visible",
            "request": "event",
            "vars": {{
              "event_name": "story_page_view"
            }}
          }},
          "storyEnd": {{
            "on": "story-last-page-visible",
            "request": "event",
            "vars": {{
              "event_name": "story_completion"
            }}
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
    hub_schema_str = json.dumps(hub_schema, indent=2, ensure_ascii=False)

    # Cards HTML with Multi-Platform Sharing Drawer
    cards_html = []
    for s in STORIES:
        slug = s["slug"]
        story_url = f"/web-stories/{slug}/"
        abs_story_url = f"{DOMAIN}/web-stories/{slug}/"
        thumb_url = f"/images/web-stories/{slug}-portrait.webp"
        qr_url = f"/images/web-stories/{slug}-qr.svg"
        share_text = s["whatsapp_share_text"]
        wa_url = f"https://api.whatsapp.com/send?text={share_text}%20{abs_story_url}"
        fb_url = f"https://www.facebook.com/sharer/sharer.php?u={abs_story_url}"
        tw_url = f"https://twitter.com/intent/tweet?text={share_text}&url={abs_story_url}"
        li_url = f"https://www.linkedin.com/sharing/share-offsite/?url={abs_story_url}"
        tg_url = f"https://t.me/share/url?url={abs_story_url}&text={share_text}"

        categories = [s['filter']]
        if s.get('lang') in ['mr', 'hi']:
            categories.append('vernacular')
        cat_attr = ' '.join(categories)

        lang_badge = ""
        if s.get("lang") == "mr":
            lang_badge = '<span class="lang-pill mr" style="background: rgba(245, 158, 11, 0.25); border: 1px solid rgba(245, 158, 11, 0.5); color: #f59e0b; font-size: 0.65rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; margin-left: 6px;">मराठी</span>'
        elif s.get("lang") == "hi":
            lang_badge = '<span class="lang-pill hi" style="background: rgba(59, 130, 246, 0.25); border: 1px solid rgba(59, 130, 246, 0.5); color: #60a5fa; font-size: 0.65rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; margin-left: 6px;">हिंदी</span>'

        card = f"""
      <article class="story-card" data-category="{cat_attr}">
        <a href="{story_url}" class="card-media-wrap" aria-label="Watch Web Story: {s['title']}">
          <img src="{thumb_url}" alt="{s['title']}" width="720" height="960" loading="lazy" class="story-thumb">
          <div class="media-overlay">
            <div>
              <span class="category-pill">{s['category']}</span>{lang_badge}
            </div>
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
          
          <!-- Primary Actions -->
          <div class="card-actions">
            <a href="{story_url}" class="btn-watch">
              <span>Watch Full Story</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="{s['target_url']}" class="btn-sub">{s['target_label']}</a>
          </div>

          <!-- Cross-Platform Syndication & Sharing Bar -->
          <div class="syndication-dock">
            <span class="dock-title">Share across platforms:</span>
            <div class="dock-buttons">
              <a href="{wa_url}" target="_blank" rel="noopener" class="dock-btn wa" title="Share to WhatsApp" aria-label="WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="{li_url}" target="_blank" rel="noopener" class="dock-btn li" title="Share to LinkedIn" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="{tw_url}" target="_blank" rel="noopener" class="dock-btn tw" title="Post to X / Twitter" aria-label="X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="{fb_url}" target="_blank" rel="noopener" class="dock-btn fb" title="Share on Facebook" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="{tg_url}" target="_blank" rel="noopener" class="dock-btn tg" title="Share via Telegram" aria-label="Telegram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
              </a>
              <button type="button" class="dock-btn qr" onclick="openQrModal('{s['h1']}', '{qr_url}', '{abs_story_url}')" title="Scan QR to View on Mobile" aria-label="QR Code">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-5 0h3v3h-3v-3zm3 3h2v3h-2v-3zm2 2h3v3h-3v-3zm-5 1h2v2h-2v-2zm7 0h2v2h-2v-2z"/></svg>
              </button>
              <button type="button" class="dock-btn embed" onclick="openEmbedModal('{s['h1']}', '{abs_story_url}')" title="Get Embed Code" aria-label="Embed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              </button>
            </div>
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
  <link rel="alternate" type="application/rss+xml" title="Paranjape Forest Trails Web Stories Feed" href="{DOMAIN}/web-stories/feed.xml">
  <!-- Multi-Platform Social Meta Tags -->
  <meta property="og:site_name" content="Paranjape Forest Trails Township Bhugaon">
  <meta property="og:title" content="{hub_title}">
  <meta property="og:description" content="{hub_desc}">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:image" content="{DOMAIN}/images/web-stories/misty-greens-plots-bhugaon-portrait.jpg">
  <meta property="og:image:width" content="720">
  <meta property="og:image:height" content="960">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_IN">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@ParanjapeScheme">
  <meta name="twitter:title" content="{hub_title}">
  <meta name="twitter:description" content="{hub_desc}">
  <meta name="twitter:image" content="{DOMAIN}/images/web-stories/misty-greens-plots-bhugaon-landscape.webp">
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
    .filter-bar {{
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 1.5rem;
    }}
    .filter-btn {{
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #e2e8f0;
      padding: 0.4rem 0.9rem;
      border-radius: 50px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }}
    .filter-btn.active, .filter-btn:hover {{
      background: #D4AF37;
      color: #1a0505;
      border-color: #D4AF37;
    }}
    .stories-container {{
      max-width: 1240px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
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
      margin: 0 0 1rem 0;
      flex-grow: 1;
    }}
    .card-actions {{
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.85rem;
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
      padding: 0.25rem 0;
      border-radius: 6px;
      transition: color 0.2s ease;
    }}
    .btn-sub:hover {{
      color: #FDE047;
      text-decoration: underline;
    }}
    .syndication-dock {{
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }}
    .dock-title {{
      display: block;
      font-size: 0.68rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.4rem;
    }}
    .dock-buttons {{
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }}
    .dock-btn {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;
    }}
    .dock-btn:hover {{
      transform: translateY(-2px);
    }}
    .dock-btn.wa:hover {{ background: #25D366; }}
    .dock-btn.li:hover {{ background: #0A66C2; }}
    .dock-btn.tw:hover {{ background: #000000; border-color: #555; }}
    .dock-btn.fb:hover {{ background: #1877F2; }}
    .dock-btn.tg:hover {{ background: #229ED9; }}
    .dock-btn.qr:hover {{ background: #D4AF37; color: #000; }}
    .dock-btn.embed:hover {{ background: #7C3AED; }}

    /* Modal Styling */
    .modal-backdrop {{
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      z-index: 100000;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }}
    .modal-box {{
      background: #1e293b;
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 16px;
      max-width: 500px;
      width: 100%;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
      position: relative;
      text-align: center;
    }}
    .modal-close {{
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 1.5rem;
      cursor: pointer;
    }}
    .modal-close:hover {{ color: #ffffff; }}
    .modal-qr-img {{
      width: 220px;
      height: 220px;
      margin: 1.25rem auto;
      background: #ffffff;
      padding: 10px;
      border-radius: 12px;
      display: block;
    }}
    .code-box {{
      background: #0f172a;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 0.85rem;
      color: #38bdf8;
      font-family: monospace;
      font-size: 0.8rem;
      text-align: left;
      word-break: break-all;
      max-height: 130px;
      overflow-y: auto;
      margin: 1rem 0;
    }}
    .btn-copy {{
      background: #D4AF37;
      color: #1a0505;
      font-weight: 700;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
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
    <div class="hub-header-badge">Google Discover, Visual Search &amp; Social Syndication</div>
    <h1 class="hub-h1">Google Web Stories — Paranjape Forest Trails Bhugaon</h1>
    <p class="hub-subtitle">Tap and swipe through interactive visual stories covering NA bungalow plots, luxury forest villas, nature apartments, 190-acre lifestyle, and West Pune infrastructure.</p>
    
    <!-- Filter Chips -->
    <div class="filter-bar">
      <button type="button" class="filter-btn active" onclick="filterStories('all', this)">All Stories ({len(STORIES)})</button>
      <button type="button" class="filter-btn" onclick="filterStories('plots', this)">NA Plots</button>
      <button type="button" class="filter-btn" onclick="filterStories('villas', this)">Forest Villas</button>
      <button type="button" class="filter-btn" onclick="filterStories('apartments', this)">Apartments</button>
      <button type="button" class="filter-btn" onclick="filterStories('senior', this)">Senior Living</button>
      <button type="button" class="filter-btn" onclick="filterStories('vernacular', this)">मराठी / हिंदी</button>
      <button type="button" class="filter-btn" onclick="filterStories('lifestyle', this)">190-Acre Life</button>
      <button type="button" class="filter-btn" onclick="filterStories('infrastructure', this)">Infrastructure</button>
    </div>
  </header>

  <!-- Main Grid -->
  <main class="stories-container">
    <div class="stories-grid" id="stories-grid">
{cards_joined}
    </div>

    <!-- Conversion Banner -->
    <div class="cta-banner">
      <h2>Plan Your Site Visit to Paranjape Forest Trails Bhugaon</h2>
      <p>Explore the 190-acre green township in person. Free guided site tours available daily with pickup assistance from Kothrud &amp; Bavdhan.</p>
      <div class="cta-btn-group">
        <a href="tel:+917744009295" class="cta-btn-primary">Call Advisory: +91 7744009295</a>
        <a href="https://wa.me/917744009295?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20site%20visit%20to%20Paranjape%20Forest%20Trails" class="cta-btn-whatsapp">WhatsApp Concierge</a>
      </div>
    </div>
  </main>

  <!-- QR Code Modal -->
  <div id="qr-modal" class="modal-backdrop">
    <div class="modal-box">
      <button type="button" class="modal-close" onclick="closeModals()">&times;</button>
      <h3 id="qr-modal-title" style="color: #ffffff; margin-top: 0;">Scan to View on Mobile</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; margin: 0;">Point your iPhone or Android camera to experience this story in full-screen immersion.</p>
      <img id="qr-modal-img" src="" alt="Story QR Code" class="modal-qr-img">
      <p style="font-size: 0.78rem; color: #cbd5e1; word-break: break-all;" id="qr-modal-url"></p>
    </div>
  </div>

  <!-- Embed Modal -->
  <div id="embed-modal" class="modal-backdrop">
    <div class="modal-box">
      <button type="button" class="modal-close" onclick="closeModals()">&times;</button>
      <h3 id="embed-modal-title" style="color: #ffffff; margin-top: 0;">Embed Story on Your Website</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; margin: 0;">Copy and paste this snippet to embed the responsive visual story onto any blog or property portal:</p>
      <div id="embed-code-box" class="code-box"></div>
      <button type="button" class="btn-copy" onclick="copyEmbedCode()">Copy Embed Code</button>
    </div>
  </div>

  <!-- Footer -->
  <footer class="hub-footer">
    <p style="margin-bottom: 0.75rem;">
      <a href="/">Home</a> |
      <a href="/paranjape-forest-trails-township-bhugaon-misty-greens/">Misty Greens Plots</a> |
      <a href="/paranjape-forest-trails-township-bhugaon-rivolo-residences/">The Rivolo Villas</a> |
      <a href="/paranjape-forest-trails-township-bhugaon-the-canopy/">The Canopy</a> |
      <a href="/master-plan-layout-explorer/">Masterplan</a> |
      <a href="/web-stories/feed.xml">Media RSS Feed</a> |
      <a href="/sitemap-page/">HTML Sitemap</a>
    </p>
    <p style="margin-bottom: 0.5rem;">Paranjape Forest Trails Township, Paud Road, Bhugaon, Pune West 412115 | MahaRERA Registered</p>
    <p style="margin: 0;">Contact: +91 7744009295 | <!--email_off-->propsmartrealty@gmail.com<!--/email_off--> | All prices indicative (*)</p>
  </footer>

  <script>
    function filterStories(category, btn) {{
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.story-card').forEach(card => {{
        var cats = (card.getAttribute('data-category') || '').split(' ');
        if (category === 'all' || cats.indexOf(category) !== -1) {{
          card.style.display = 'flex';
        }} else {{
          card.style.display = 'none';
        }}
      }});
    }}

    function openQrModal(title, qrUrl, storyUrl) {{
      document.getElementById('qr-modal-title').textContent = title;
      document.getElementById('qr-modal-img').src = qrUrl;
      document.getElementById('qr-modal-url').textContent = storyUrl;
      document.getElementById('qr-modal').style.display = 'flex';
    }}

    function openEmbedModal(title, storyUrl) {{
      document.getElementById('embed-modal-title').textContent = 'Embed: ' + title;
      var snippet = '<iframe src="' + storyUrl + '" width="360" height="600" frameborder="0" allowfullscreen style="border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.5);border:1px solid #334155;"></iframe>';
      document.getElementById('embed-code-box').textContent = snippet;
      document.getElementById('embed-modal').style.display = 'flex';
    }}

    function closeModals() {{
      document.getElementById('qr-modal').style.display = 'none';
      document.getElementById('embed-modal').style.display = 'none';
    }}

    function copyEmbedCode() {{
      var text = document.getElementById('embed-code-box').textContent;
      navigator.clipboard.writeText(text).then(function() {{
        var btn = document.querySelector('.btn-copy');
        btn.textContent = 'Copied to Clipboard!';
        setTimeout(function() {{ btn.textContent = 'Copy Embed Code'; }}, 2000);
      }});
    }}

    window.onclick = function(event) {{
      if (event.target.classList.contains('modal-backdrop')) {{
        closeModals();
      }}
    }};
  </script>

</body>
</html>"""
    return html

def generate_stories_tray_component():
    avatars_html = []
    for s in STORIES:
        slug = s["slug"]
        story_url = f"/web-stories/{slug}/"
        thumb_url = f"/images/web-stories/{slug}-square.webp"
        short_title = s.get("tray_title") or s["h1"].split("Bhugaon")[0].split("at")[0].strip()
        price = s.get("tray_price") or s["price_badge"].split("Onwards")[0].strip()

        item = f"""      <a href="{story_url}" class="story-tray-item" style="display: flex; flex-direction: column; align-items: center; text-decoration: none; min-width: 86px; flex-shrink: 0; text-align: center;">
        <div class="avatar-ring" style="width: 72px; height: 72px; border-radius: 50%; padding: 2.5px; background: linear-gradient(135deg, #4A0808, #b89326, #D4AF37); box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35); transition: transform 0.2s ease;">
          <img src="{thumb_url}" alt="{s['h1']}" width="72" height="72" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; border: 2px solid #0e0a10;" loading="lazy">
        </div>
        <span style="font-size: 0.72rem; font-weight: 700; color: #ffffff; margin-top: 0.45rem; line-height: 1.2; max-width: 86px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{short_title}</span>
        <span style="font-size: 0.65rem; color: #10B981; font-weight: 600;">{price}</span>
      </a>"""
        avatars_html.append(item)

    avatars_joined = chr(10).join(avatars_html)

    tray_html = f"""<section class="web-stories-tray-section" style="background: linear-gradient(180deg, #0e0a10 0%, #17111f 100%); padding: 1.35rem 1rem 1.6rem; border-top: 1px solid rgba(212, 175, 55, 0.2); border-bottom: 1px solid rgba(212, 175, 55, 0.2); position: relative; z-index: 10;">
  <div style="max-width: 1400px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; padding: 0 0.5rem;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #EF4444; box-shadow: 0 0 10px #EF4444;"></span>
        <span style="font-size: 0.76rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #D4AF37;">VISUAL WEB STORIES</span>
        <span style="font-size: 0.7rem; color: #e2e8f0; background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 9999px;">{len(STORIES)} Live Stories</span>
      </div>
      <a href="/web-stories/" style="font-size: 0.75rem; font-weight: 700; color: #D4AF37; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Explore Hub →</a>
    </div>
    <div class="stories-tray-scroll" style="display: flex; gap: 1.25rem; overflow-x: auto; padding-bottom: 0.5rem; -webkit-overflow-scrolling: touch; scrollbar-width: thin;">
{avatars_joined}
    </div>
  </div>
</section>"""
    comp_path = os.path.join(BASE_DIR, "components", "web-stories-tray.html")
    os.makedirs(os.path.dirname(comp_path), exist_ok=True)
    with open(comp_path, "w", encoding="utf-8") as f:
        f.write(f"""<!-- Interactive Web Stories Visual Carousel Tray -->
{tray_html}
<!-- /Interactive Web Stories Visual Carousel Tray -->
""")
    print(f"Generated Web Stories Tray component: {comp_path}")
    return tray_html

def inject_tray_into_pages(tray_html):
    targets = [
        os.path.join(BASE_DIR, "index.html"),
        os.path.join(BASE_DIR, "master-plan-layout-explorer", "index.html"),
        os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-blogs", "index.html"),
        os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-misty-greens", "index.html"),
        os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-rivolo-residences", "index.html"),
        os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-the-canopy", "index.html"),
        os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-the-cove", "index.html"),
        os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon", "index.html"),
        os.path.join(BASE_DIR, "paranjape-forest-trails-township-bhugaon-highgardens", "index.html"),
        os.path.join(BASE_DIR, "pune-madhe-plot", "index.html"),
        os.path.join(BASE_DIR, "pune-madhe-villa", "index.html"),
        os.path.join(BASE_DIR, "pune-mein-plot", "index.html"),
        os.path.join(BASE_DIR, "bhugaon-mein-flat", "index.html")
    ]

    wrapped_tray = f"""<!-- Interactive Web Stories Visual Carousel Tray -->
{tray_html}
<!-- /Interactive Web Stories Visual Carousel Tray -->"""

    for target in targets:
        if not os.path.exists(target):
            continue
        try:
            content = open(target, "r", encoding="utf-8").read()
            if "<!-- Interactive Web Stories Visual Carousel Tray -->" in content:
                content = re.sub(
                    r'<!-- Interactive Web Stories Visual Carousel Tray -->.*?<!-- /Interactive Web Stories Visual Carousel Tray -->',
                    wrapped_tray,
                    content,
                    flags=re.DOTALL
                )
            else:
                if "</header>" in content:
                    content = content.replace("</header>", f"</header>\n{wrapped_tray}\n", 1)
                elif "<main>" in content:
                    content = content.replace("<main>", f"<main>\n{wrapped_tray}\n", 1)
                elif "<body>" in content:
                    content = content.replace("<body>", f"<body>\n{wrapped_tray}\n", 1)

            with open(target, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Injected Web Stories Tray into: {os.path.relpath(target, BASE_DIR)}")
        except Exception as e:
            print(f"Error injecting into {target}: {e}")

def generate_sitemap_stories():
    out_path = os.path.join(BASE_DIR, "sitemap-stories.xml")
    stories_urls = [f"{DOMAIN}/web-stories/"]
    for s in STORIES:
        stories_urls.append(f"{DOMAIN}/web-stories/{s['slug']}/")

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    for u in stories_urls:
        priority = "0.95" if u.endswith("/web-stories/") else "0.90"
        xml_lines.append("  <url>")
        xml_lines.append(f"    <loc>{u}</loc>")
        xml_lines.append(f"    <lastmod>{DATE_STR}</lastmod>")
        xml_lines.append("    <changefreq>weekly</changefreq>")
        xml_lines.append(f"    <priority>{priority}</priority>")
        xml_lines.append("  </url>")
    xml_lines.append("</urlset>")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines) + "\n")
    print(f"Generated: {out_path} ({len(stories_urls)} URLs)")

    sitemap_index_path = os.path.join(BASE_DIR, "sitemap.xml")
    if os.path.exists(sitemap_index_path):
        with open(sitemap_index_path, "r", encoding="utf-8") as f:
            content = f.read()
        if "sitemap-stories.xml" not in content:
            entry = f"""  <sitemap>
    <loc>{DOMAIN}/sitemap-stories.xml</loc>
    <lastmod>{DATE_STR}</lastmod>
  </sitemap>
</sitemapindex>"""
            content = content.replace("</sitemapindex>", entry)
            with open(sitemap_index_path, "w", encoding="utf-8") as f:
                f.write(content)
            print("Registered sitemap-stories.xml inside sitemap.xml.")

def main():
    print("Executing Expansive Cross-Platform Web Stories Ecosystem Engine...")

    # 1. Generate SVG QR Codes
    generate_qr_codes()

    # 2. Generate 12 AMP Web Stories with full cross-platform meta
    for story in STORIES:
        slug = story["slug"]
        story_dir = os.path.join(BASE_DIR, "web-stories", slug)
        os.makedirs(story_dir, exist_ok=True)
        story_file = os.path.join(story_dir, "index.html")
        html_content = generate_web_story_html(story)
        with open(story_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Generated AMP Web Story: /web-stories/{slug}/index.html")

    # 3. Generate Media RSS Feed
    generate_feed_xml()

    # 4. Generate Web Stories Hub Portal
    hub_file = os.path.join(BASE_DIR, "web-stories", "index.html")
    hub_html = generate_hub_html()
    with open(hub_file, "w", encoding="utf-8") as f:
        f.write(hub_html)
    print("Generated Web Stories Hub Portal: /web-stories/index.html")

    # 5. Generate and Inject Stories Tray
    tray_html = generate_stories_tray_component()
    inject_tray_into_pages(tray_html)

    # 6. Generate Dedicated Stories Sitemap
    generate_sitemap_stories()

    print("Expansive Cross-Platform Web Stories Ecosystem successfully generated!")

if __name__ == "__main__":
    main()
