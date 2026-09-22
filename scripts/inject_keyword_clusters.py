#!/usr/bin/env python3
"""
Pune Real Estate Keyword Domination Engine v1.0
================================================
Injects page-specific micro-market keyword clusters into all HTML landing pages.
Covers 10 micro-markets × 12 config types × 8 intents = 960+ unique permutations.
Also creates 16 new high-volume transactional landing pages.
"""

import os
import re

DOMAIN = "https://www.paranjapetownship.com"
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ─── BRAND KEYWORDS (appended to every page) ──────────────────────────────────
BRAND_KEYWORDS = (
    "Paranjape Schemes Construction Ltd, Paranjape Schemes Pune, PSCL Projects, PSCL Pune, "
    "Paranjape Forest Trails Bhugaon, Misty Greens NA Plots, The Rivolo Villas, The Canopy Apartments, "
    "Verandah Forest Trails, The Highgardens, The Cove Bungalows, Orchard Residences Bhugaon, "
    "Swaniketan Bhugaon, Athashri Senior Living Bhugaon, Everglades Bavdhan, "
    "Paranjape Plots Pune, Paranjape Villas Pune, Paranjape Flats Pune, "
    "Paranjape Price List 2026, Paranjape Brochure Download, Paranjape NRI Investment, "
    "NA Bungalow Plots West Pune, Luxury Forest Villas Sahyadri, "
    "Gated Community Plots Bavdhan Kothrud Paud Road Chandani Chowk, "
    "MahaRERA P52100053834, RERA approved township Bhugaon, 190-acre township Pune West"
)

# ─── MICRO-MARKET KEYWORD CLUSTERS ───────────────────────────────────────────
def kw_bhugaon(cfg="", extra=""):
    base = [
        f"property in Bhugaon", f"flats in Bhugaon", f"Bhugaon real estate 2026",
        f"buy property Bhugaon Pune", f"Bhugaon property price 2026",
        f"Bhugaon gated community", f"Bhugaon NA plots", f"Bhugaon luxury villas",
        f"Bhugaon RERA approved project", f"Bhugaon township near Kothrud",
        f"Bhugaon near Chandani Chowk", f"Bhugaon Pune West investment",
        f"NRI investment Bhugaon 2026", f"property appreciation Bhugaon",
    ]
    if cfg:
        base += [
            f"{cfg} in Bhugaon", f"{cfg} flats Bhugaon", f"{cfg} apartments Bhugaon",
            f"buy {cfg} Bhugaon", f"{cfg} price Bhugaon 2026",
            f"{cfg} RERA Bhugaon", f"{cfg} gated community Bhugaon",
            f"{cfg} ready to move Bhugaon", f"{cfg} under construction Bhugaon",
            f"{cfg} near Chandani Chowk", f"{cfg} near Kothrud from Bhugaon",
            f"{cfg} NRI investment Bhugaon",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_bavdhan(cfg="", extra=""):
    base = [
        "property in Bavdhan", "flats in Bavdhan Pune", "Bavdhan real estate 2026",
        "buy property Bavdhan", "Bavdhan property price 2026",
        "Bavdhan gated community", "Bavdhan NA plots", "Bavdhan luxury apartments",
        "Bavdhan RERA approved", "near Bavdhan township",
        "Bavdhan Kothrud corridor property", "Bavdhan Chandani Chowk property",
        "NRI investment Bavdhan", "property appreciation Bavdhan Pune",
        "Everglades Bavdhan price", "Athashri Bavdhan senior living",
    ]
    if cfg:
        base += [
            f"{cfg} in Bavdhan", f"{cfg} flats near Bavdhan", f"{cfg} apartments Bavdhan",
            f"buy {cfg} near Bavdhan", f"{cfg} price Bavdhan 2026",
            f"{cfg} RERA Bavdhan", f"{cfg} gated township Bavdhan",
            f"{cfg} ready to move Bavdhan", f"{cfg} under construction Bavdhan",
            f"{cfg} near Chandani Chowk Bavdhan", f"{cfg} Kothrud Bavdhan Pune West",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_kothrud(cfg="", extra=""):
    base = [
        "property in Kothrud", "flats in Kothrud Pune", "Kothrud real estate 2026",
        "buy property Kothrud", "Kothrud property price 2026",
        "Kothrud extension plots", "luxury apartments Kothrud Pune",
        "Kothrud RERA approved", "near Kothrud township",
        "Kothrud Bavdhan corridor property", "Kothrud Chandani Chowk property",
        "NRI investment Kothrud", "Kothrud property appreciation 2026",
        "Kothrud Nal Stop real estate", "Karve Nagar Kothrud property",
        "Kothrud gated community Pune",
    ]
    if cfg:
        base += [
            f"{cfg} in Kothrud", f"{cfg} flats Kothrud", f"{cfg} apartments Kothrud",
            f"buy {cfg} Kothrud", f"{cfg} price Kothrud 2026",
            f"{cfg} RERA Kothrud", f"{cfg} gated community Kothrud",
            f"{cfg} ready to move Kothrud", f"{cfg} under construction Kothrud",
            f"{cfg} near Bavdhan from Kothrud", f"{cfg} Kothrud extension Pune West",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_chandani(cfg="", extra=""):
    base = [
        "property near Chandani Chowk", "flats near Chandani Chowk Pune",
        "Chandani Chowk real estate 2026", "buy property Chandani Chowk",
        "Chandani Chowk property price 2026", "Chandani Chowk flyover connectivity",
        "Chandani Chowk RERA approved", "near Chandani Chowk township",
        "Chandani Chowk Bavdhan property", "Chandani Chowk Kothrud property",
        "NRI investment Chandani Chowk", "property appreciation Chandani Chowk",
        "Chandani Chowk Paud Road property", "gated community Chandani Chowk",
    ]
    if cfg:
        base += [
            f"{cfg} near Chandani Chowk", f"{cfg} flats Chandani Chowk",
            f"buy {cfg} near Chandani Chowk", f"{cfg} price Chandani Chowk 2026",
            f"{cfg} RERA Chandani Chowk", f"{cfg} gated community Chandani Chowk",
            f"{cfg} ready to move Chandani Chowk", f"{cfg} under construction Chandani Chowk",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_paud_road(cfg="", extra=""):
    base = [
        "property on Paud Road", "flats on Paud Road Pune", "Paud Road real estate 2026",
        "buy property Paud Road", "Paud Road property price 2026",
        "Paud Road gated community", "Paud Road NA plots", "Paud Road luxury villas",
        "Paud Road RERA approved", "Paud Road Bhugaon property",
        "Paud Road Bavdhan property", "NRI investment Paud Road",
        "property appreciation Paud Road Pune", "Paud Road township Pune West",
    ]
    if cfg:
        base += [
            f"{cfg} on Paud Road", f"{cfg} flats Paud Road", f"{cfg} apartments Paud Road",
            f"buy {cfg} Paud Road", f"{cfg} price Paud Road 2026",
            f"{cfg} RERA Paud Road", f"{cfg} gated community Paud Road",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_baner(cfg="", extra=""):
    base = [
        "property near Baner", "flats near Baner Pune", "Baner real estate 2026",
        "buy property Baner", "Baner property price 2026", "Baner gated community",
        "luxury apartments Baner", "Baner RERA approved", "Baner Balewadi property",
        "Baner Hinjewadi corridor", "NRI investment Baner Pune",
        "property appreciation Baner 2026",
    ]
    if cfg:
        base += [
            f"{cfg} near Baner", f"{cfg} flats Baner", f"{cfg} apartments Baner",
            f"buy {cfg} Baner", f"{cfg} price Baner 2026", f"{cfg} RERA Baner",
            f"{cfg} gated community Baner", f"{cfg} ready to move Baner",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_balewadi(cfg="", extra=""):
    base = [
        "property near Balewadi", "flats near Balewadi Pune", "Balewadi real estate 2026",
        "buy property Balewadi", "Balewadi property price 2026", "Balewadi gated community",
        "luxury apartments Balewadi", "Balewadi RERA approved",
        "Balewadi Baner property corridor", "NRI investment Balewadi Pune",
    ]
    if cfg:
        base += [
            f"{cfg} near Balewadi", f"{cfg} flats Balewadi", f"{cfg} apartments Balewadi",
            f"buy {cfg} Balewadi", f"{cfg} price Balewadi 2026", f"{cfg} RERA Balewadi",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_hinjewadi(cfg="", extra=""):
    base = [
        "property near Hinjewadi", "flats near Hinjewadi IT Park", "Hinjewadi real estate 2026",
        "buy property Hinjewadi", "Hinjewadi property price 2026",
        "Hinjewadi IT Park gated community", "luxury apartments near Hinjewadi",
        "Hinjewadi RERA approved", "Hinjewadi Phase 1 2 3 property",
        "NRI investment Hinjewadi", "property appreciation Hinjewadi 2026",
        "Blue Ridge Hinjewadi", "Athashri Hinjewadi",
    ]
    if cfg:
        base += [
            f"{cfg} near Hinjewadi", f"{cfg} flats Hinjewadi", f"{cfg} apartments Hinjewadi",
            f"buy {cfg} Hinjewadi", f"{cfg} price Hinjewadi 2026", f"{cfg} RERA Hinjewadi",
            f"{cfg} gated community Hinjewadi IT Park",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_warje(cfg="", extra=""):
    base = [
        "property near Warje", "flats near Warje Pune", "Warje real estate 2026",
        "buy property Warje", "Warje property price 2026",
        "Warje Kothrud property", "Warje gated community Pune",
        "Warje RERA approved",
    ]
    if cfg:
        base += [
            f"{cfg} near Warje", f"{cfg} flats Warje", f"{cfg} apartments Warje",
            f"buy {cfg} Warje", f"{cfg} price Warje 2026",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_pune_west(cfg="", extra=""):
    base = [
        "property in Pune West", "flats in Pune West", "Pune West real estate 2026",
        "buy property Pune West", "Pune West property price 2026",
        "Pune West gated community township", "Pune West NA plots bungalow plots",
        "Pune West luxury villas", "Pune West RERA approved",
        "NRI investment Pune West 2026", "property appreciation Pune West",
        "Pune West Bhugaon Bavdhan Kothrud Chandani Chowk",
        "top localities Pune West investment", "Pune West vs Pune East property",
    ]
    if cfg:
        base += [
            f"{cfg} in Pune West", f"{cfg} flats Pune West", f"{cfg} apartments Pune West",
            f"buy {cfg} Pune West", f"{cfg} price Pune West 2026",
            f"{cfg} RERA Pune West", f"{cfg} gated community Pune West",
            f"{cfg} ready to move Pune West", f"{cfg} under construction Pune West",
        ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_na_plots(area, extra=""):
    base = [
        f"NA plots in {area}", f"NA bungalow plots {area}", f"bungalow plots near {area}",
        f"buy NA plots {area}", f"NA plots price {area} 2026",
        f"RERA approved NA plots {area}", f"MahaRERA NA plots {area}",
        f"NA plot loan {area}", f"EMI calculator NA plots {area}",
        f"investment in NA plots {area}", f"ROI NA plots {area}",
        f"NA plots near Chandani Chowk", f"NA bungalow plots Pune West",
        f"gated community NA plots {area}", f"Forest Trails NA plots {area}",
        f"Misty Greens NA plots {area}", f"resale NA plots {area}",
        f"NA plot appreciation {area} 2026", f"NRI investment NA plots {area}",
    ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_villas(area, extra=""):
    base = [
        f"luxury villas in {area}", f"luxury forest villas {area}",
        f"luxury villas near {area}", f"buy luxury villa {area}",
        f"luxury villa price {area} 2026", f"4BHK villa {area}",
        f"5BHK villa {area}", f"duplex villa {area}",
        f"twin bungalow {area}", f"independent bungalow {area}",
        f"RERA villa {area}", f"gated community villa {area}",
        f"Rivolo villas {area}", f"The Cove bungalows {area}",
        f"luxury villa NRI investment {area}", f"villa ROI appreciation {area}",
    ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_senior(area, extra=""):
    base = [
        f"senior living in {area}", f"senior citizen homes {area}",
        f"retirement homes near {area}", f"assisted living {area} Pune",
        f"senior living apartments {area}", f"Athashri {area}",
        f"senior living price {area} 2026", f"RERA senior living {area}",
        f"NRI senior living {area}", f"best senior living Pune West",
        "senior citizen township Bhugaon", "Athashri senior living Bhugaon",
        "assisted living Pune 2026", "senior living gated community Pune",
    ]
    if extra:
        base.append(extra)
    return ", ".join(base)

def kw_gated_township(area, extra=""):
    base = [
        f"gated township plots {area}", f"gated community plots near {area}",
        f"gated community property {area}", f"buy plot gated township {area}",
        f"gated community price {area} 2026", f"RERA gated township {area}",
        f"integrated township {area}", f"190-acre gated township near {area}",
        f"Forest Trails gated community {area}", f"NRI gated township {area}",
        f"gated township ROI {area}", f"plots gated community {area}",
    ]
    if extra:
        base.append(extra)
    return ", ".join(base)

# ─── PAGE KEYWORD ROUTING TABLE ──────────────────────────────────────────────
# Maps directory slug → (focused_keywords_string, page_title, page_description)
PAGE_KEYWORD_MAP = {
    # ─── BHK Flats ────────────────────────────────────────────────────────────
    "1-bhk-flats-near-bavdhan": (
        kw_bavdhan("1BHK") + ", 1BHK flats near Bavdhan, 1 BHK apartments Bavdhan, 1BHK price Bavdhan 2026, affordable 1BHK Bavdhan Pune",
        "1 BHK Flats near Bavdhan | Paranjape Forest Trails Pune",
        "Buy 1 BHK flats near Bavdhan Pune. Affordable 1BHK apartments 5 mins from Chandani Chowk at Paranjape Forest Trails. Starting ₹89 Lakhs*."
    ),
    "1-bhk-flats-near-hinjewadi": (
        kw_hinjewadi("1BHK") + ", 1BHK flats near Hinjewadi, 1 BHK IT park Hinjewadi, 1BHK price Hinjewadi 2026",
        "1 BHK Flats near Hinjewadi IT Park | Paranjape Forest Trails Pune",
        "Buy 1 BHK flats near Hinjewadi IT Park. Gated community apartments with IT hub connectivity at Paranjape Forest Trails. Starting ₹89 Lakhs*."
    ),
    "1-bhk-flats-near-kothrud": (
        kw_kothrud("1BHK") + ", 1BHK flats near Kothrud, 1 BHK apartments Kothrud, 1BHK price Kothrud 2026, affordable 1BHK Kothrud Pune",
        "1 BHK Flats near Kothrud | Paranjape Forest Trails Pune",
        "Buy 1 BHK flats near Kothrud Pune. Premium 1BHK apartments in gated township near Kothrud corridor. Starting ₹89 Lakhs*."
    ),
    "2-bhk-flats-near-baner": (
        kw_baner("2BHK") + ", 2BHK flats near Baner, 2 BHK apartments Baner, 2BHK price Baner 2026, luxury 2BHK Baner Pune",
        "2 BHK Flats near Baner | Paranjape Forest Trails Pune",
        "Buy 2 BHK flats near Baner Pune. Nature-facing 2BHK apartments with Baner connectivity at Forest Trails Bhugaon. Starting ₹89 Lakhs*."
    ),
    "2-bhk-flats-near-bavdhan": (
        kw_bavdhan("2BHK") + ", 2BHK flats near Bavdhan, 2 BHK apartments Bavdhan, 2BHK price Bavdhan 2026, Bavdhan 2BHK RERA approved, 2BHK Chandani Chowk",
        "2 BHK Flats near Bavdhan | Paranjape Forest Trails Pune",
        "Buy 2 BHK flats near Bavdhan Pune. RERA approved 2BHK apartments 5 mins from Chandani Chowk at Forest Trails Bhugaon. Starting ₹89 Lakhs*."
    ),
    "2-bhk-flats-near-kothrud": (
        kw_kothrud("2BHK") + ", 2BHK flats near Kothrud, 2 BHK apartments Kothrud, 2BHK price Kothrud 2026, Kothrud extension 2BHK",
        "2 BHK Flats near Kothrud | Paranjape Forest Trails Pune",
        "Buy 2 BHK flats near Kothrud Pune. Premium 2BHK apartments in nature township near Kothrud corridor. Starting ₹89 Lakhs*."
    ),
    "3-bhk-flats-near-bavdhan": (
        kw_bavdhan("3BHK") + ", 3BHK flats near Bavdhan, 3 BHK apartments Bavdhan, 3BHK price Bavdhan 2026, luxury 3BHK Bavdhan, 3BHK Chandani Chowk",
        "3 BHK Flats near Bavdhan | Paranjape Forest Trails Pune",
        "Buy 3 BHK flats near Bavdhan Pune. Luxury 3BHK apartments in 190-acre gated township near Bavdhan. Starting ₹89 Lakhs*."
    ),
    "3-bhk-flats-near-kothrud": (
        kw_kothrud("3BHK") + ", 3BHK flats near Kothrud, 3 BHK apartments Kothrud, 3BHK price Kothrud 2026, luxury 3BHK Kothrud Pune",
        "3 BHK Flats near Kothrud | Paranjape Forest Trails Pune",
        "Buy 3 BHK flats near Kothrud Pune. Spacious 3BHK apartments in Kothrud extension area at Forest Trails. Starting ₹89 Lakhs*."
    ),
    "4-bhk-luxury-apartments-pune-west": (
        kw_pune_west("4BHK") + ", 4BHK luxury apartments Pune West, 4 BHK flats Pune West, 4BHK price Pune West 2026, luxury 4BHK Bhugaon, 4BHK villas Pune West, 4BHK NRI investment Pune",
        "4 BHK Luxury Apartments Pune West | Paranjape Forest Trails",
        "Buy 4 BHK luxury apartments in Pune West. Premium 4BHK residences in 190-acre nature township at Bhugaon near Bavdhan. Starting ₹2.85 Cr*."
    ),
    # ─── NA Plots ─────────────────────────────────────────────────────────────
    "na-bungalow-plots-near-bhugaon": (
        kw_na_plots("Bhugaon") + ", " + kw_bhugaon() + ", Misty Greens NA plots Bhugaon, RERA NA plots Bhugaon P52100053834",
        "NA Bungalow Plots near Bhugaon | Misty Greens | Paranjape Forest Trails",
        "Premium NA bungalow plots near Bhugaon Pune. RERA approved plots at Misty Greens inside 190-acre Forest Trails township. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-bavdhan": (
        kw_na_plots("Bavdhan") + ", " + kw_bavdhan() + ", NA plots near Bavdhan Pune, bungalow plots Bavdhan Chandani Chowk",
        "NA Bungalow Plots near Bavdhan | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Bavdhan Pune. RERA approved plots in nature township near Bavdhan-Bhugaon corridor. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-kothrud": (
        kw_na_plots("Kothrud") + ", " + kw_kothrud() + ", NA plots near Kothrud, bungalow plots Kothrud extension",
        "NA Bungalow Plots near Kothrud | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Kothrud Pune. Plot your dream bungalow 10 mins from Kothrud in nature township. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-chandani-chowk": (
        kw_na_plots("Chandani Chowk") + ", " + kw_chandani() + ", NA plots near Chandani Chowk, bungalow plots Chandani Chowk Pune",
        "NA Bungalow Plots near Chandani Chowk | Paranjape Forest Trails",
        "Premium NA bungalow plots near Chandani Chowk Pune. RERA approved plots 5 mins from Chandani Chowk flyover. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-paud-road": (
        kw_na_plots("Paud Road") + ", " + kw_paud_road() + ", NA plots Paud Road, bungalow plots Paud Road Pune",
        "NA Bungalow Plots near Paud Road | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Paud Road Pune. RERA approved plots in gated township on Paud Road. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-baner": (
        kw_na_plots("Baner") + ", " + kw_baner() + ", NA plots near Baner Pune",
        "NA Bungalow Plots near Baner | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Baner Pune. Gated township plots in Bhugaon with Baner connectivity. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-balewadi": (
        kw_na_plots("Balewadi") + ", " + kw_balewadi() + ", NA plots near Balewadi Pune",
        "NA Bungalow Plots near Balewadi | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Balewadi Pune. Gated township plots in Bhugaon near Balewadi-Baner corridor. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-hinjewadi-it-park": (
        kw_na_plots("Hinjewadi") + ", " + kw_hinjewadi() + ", NA plots near Hinjewadi IT Park",
        "NA Bungalow Plots near Hinjewadi IT Park | Paranjape Forest Trails",
        "Premium NA bungalow plots near Hinjewadi IT Park Pune. Invest in NA plots 20 mins from Hinjewadi. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-warje": (
        kw_na_plots("Warje") + ", " + kw_warje() + ", NA plots near Warje Pune",
        "NA Bungalow Plots near Warje | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Warje Pune. RERA approved NA plots in Bhugaon township near Warje-Kothrud. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-aundh": (
        kw_na_plots("Aundh") + ", NA plots near Aundh Pune, bungalow plots near Aundh",
        "NA Bungalow Plots near Aundh | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Aundh Pune. Gated township plots with Aundh connectivity. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-erandwane": (
        kw_na_plots("Erandwane") + ", NA plots near Erandwane Pune, bungalow plots Erandwane",
        "NA Bungalow Plots near Erandwane | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Erandwane Pune. Luxury NA plots in gated township near Erandwane. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-karve-nagar": (
        kw_na_plots("Karve Nagar") + ", NA plots near Karve Nagar Pune, bungalow plots Karve Nagar",
        "NA Bungalow Plots near Karve Nagar | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Karve Nagar Pune. Invest in gated township plots near Karve Nagar. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-mulshi": (
        kw_na_plots("Mulshi") + ", NA plots near Mulshi Pune, bungalow plots Mulshi Dam road",
        "NA Bungalow Plots near Mulshi | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Mulshi Pune. Nature-facing NA plots near Mulshi Dam. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-pashan": (
        kw_na_plots("Pashan") + ", NA plots near Pashan Pune, bungalow plots Pashan",
        "NA Bungalow Plots near Pashan | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Pashan Pune. RERA approved plots in gated township near Pashan. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-pirangut": (
        kw_na_plots("Pirangut") + ", NA plots near Pirangut Pune, bungalow plots Pirangut",
        "NA Bungalow Plots near Pirangut | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Pirangut Pune. Serene gated township NA plots near Pirangut. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-pune-west": (
        kw_na_plots("Pune West") + ", " + kw_pune_west() + ", best NA plots Pune West 2026",
        "NA Bungalow Plots in Pune West | Paranjape Forest Trails Township",
        "Premium NA bungalow plots in Pune West. Top-rated RERA approved NA plots in Bhugaon gated township. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-shivaji-nagar": (
        kw_na_plots("Shivaji Nagar") + ", NA plots near Shivaji Nagar Pune, bungalow plots near Shivaji Nagar",
        "NA Bungalow Plots near Shivaji Nagar | Paranjape Forest Trails",
        "Premium NA bungalow plots near Shivaji Nagar Pune. Invest in RERA approved plots in gated township. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-sus": (
        kw_na_plots("Sus") + ", NA plots near Sus Pune, bungalow plots Sus Gaon",
        "NA Bungalow Plots near Sus | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Sus Pune. Gated township plots with Sus-Baner corridor access. Starting ₹1.23 Cr*."
    ),
    "na-bungalow-plots-near-wakad": (
        kw_na_plots("Wakad") + ", NA plots near Wakad Pune, bungalow plots near Wakad",
        "NA Bungalow Plots near Wakad | Paranjape Forest Trails Pune",
        "Premium NA bungalow plots near Wakad Pune. Invest in RERA approved plots near Wakad-Hinjewadi. Starting ₹1.23 Cr*."
    ),
    # ─── Luxury Villas ────────────────────────────────────────────────────────
    "luxury-forest-villas-near-bhugaon": (
        kw_villas("Bhugaon") + ", " + kw_bhugaon("4BHK") + ", The Rivolo villas Bhugaon, luxury forest villa price Bhugaon 2026",
        "Luxury Forest Villas near Bhugaon | Rivolo Residences | Forest Trails",
        "Luxury forest villas in Bhugaon Pune. Book 4BHK & 5BHK Rivolo villas in 190-acre gated township. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-bavdhan": (
        kw_villas("Bavdhan") + ", " + kw_bavdhan("4BHK") + ", luxury villas near Bavdhan price 2026",
        "Luxury Forest Villas near Bavdhan | Paranjape Forest Trails Pune",
        "Luxury forest villas near Bavdhan Pune. 4BHK & 5BHK villas in nature gated township near Bavdhan. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-kothrud": (
        kw_villas("Kothrud") + ", " + kw_kothrud("4BHK") + ", luxury villas near Kothrud price 2026",
        "Luxury Forest Villas near Kothrud | Paranjape Forest Trails Pune",
        "Luxury forest villas near Kothrud Pune. Premium 4BHK villas in Bhugaon gated township near Kothrud. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-chandani-chowk": (
        kw_villas("Chandani Chowk") + ", " + kw_chandani("4BHK") + ", luxury villas near Chandani Chowk 2026",
        "Luxury Forest Villas near Chandani Chowk | Paranjape Forest Trails",
        "Luxury forest villas near Chandani Chowk Pune. 4BHK villas 5 mins from Chandani Chowk flyover. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-baner": (
        kw_villas("Baner") + ", " + kw_baner("4BHK"),
        "Luxury Forest Villas near Baner | Paranjape Forest Trails Pune",
        "Luxury forest villas near Baner Pune. Premium 4BHK nature villas in gated township near Baner. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-balewadi": (
        kw_villas("Balewadi") + ", " + kw_balewadi("4BHK"),
        "Luxury Forest Villas near Balewadi | Paranjape Forest Trails Pune",
        "Luxury forest villas near Balewadi Pune. Premium villas in nature township near Balewadi. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-hinjewadi-it-park": (
        kw_villas("Hinjewadi") + ", " + kw_hinjewadi("4BHK"),
        "Luxury Forest Villas near Hinjewadi IT Park | Paranjape Forest Trails",
        "Luxury forest villas near Hinjewadi IT Park Pune. Premium 4BHK villas for IT professionals. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-aundh": (
        kw_villas("Aundh") + ", luxury villas near Aundh Pune",
        "Luxury Forest Villas near Aundh | Paranjape Forest Trails Pune",
        "Luxury forest villas near Aundh Pune. Premium 4BHK nature villas in gated township near Aundh. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-erandwane": (
        kw_villas("Erandwane") + ", luxury villas near Erandwane Pune",
        "Luxury Forest Villas near Erandwane | Paranjape Forest Trails Pune",
        "Luxury forest villas near Erandwane Pune. Premium villas in nature township near Erandwane. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-karve-nagar": (
        kw_villas("Karve Nagar") + ", luxury villas near Karve Nagar Pune",
        "Luxury Forest Villas near Karve Nagar | Paranjape Forest Trails",
        "Luxury forest villas near Karve Nagar Pune. Premium 4BHK villas in gated township near Karve Nagar. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-mulshi": (
        kw_villas("Mulshi") + ", luxury villas near Mulshi Dam Pune",
        "Luxury Forest Villas near Mulshi | Paranjape Forest Trails Pune",
        "Luxury forest villas near Mulshi Pune. Sahyadri-view villas in gated township near Mulshi Dam. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-pashan": (
        kw_villas("Pashan") + ", luxury villas near Pashan Pune",
        "Luxury Forest Villas near Pashan | Paranjape Forest Trails Pune",
        "Luxury forest villas near Pashan Pune. Premium nature villas in gated township near Pashan. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-pirangut": (
        kw_villas("Pirangut") + ", luxury villas near Pirangut Pune",
        "Luxury Forest Villas near Pirangut | Paranjape Forest Trails Pune",
        "Luxury forest villas near Pirangut Pune. Serene 4BHK villas in gated township near Pirangut. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-paud-road": (
        kw_villas("Paud Road") + ", " + kw_paud_road("4BHK"),
        "Luxury Forest Villas near Paud Road | Paranjape Forest Trails Pune",
        "Luxury forest villas near Paud Road Pune. Premium 4BHK nature villas on Paud Road corridor. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-pune-west": (
        kw_villas("Pune West") + ", " + kw_pune_west("4BHK"),
        "Luxury Forest Villas in Pune West | Paranjape Forest Trails Township",
        "Luxury forest villas in Pune West. Top-rated 4BHK & 5BHK nature villas in 190-acre gated township. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-shivaji-nagar": (
        kw_villas("Shivaji Nagar") + ", luxury villas near Shivaji Nagar Pune",
        "Luxury Forest Villas near Shivaji Nagar | Paranjape Forest Trails",
        "Luxury forest villas near Shivaji Nagar Pune. Premium villas in gated township near Shivaji Nagar. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-sus": (
        kw_villas("Sus") + ", luxury villas near Sus Pune",
        "Luxury Forest Villas near Sus | Paranjape Forest Trails Pune",
        "Luxury forest villas near Sus Pune. 4BHK nature villas in gated township near Sus-Baner. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-wakad": (
        kw_villas("Wakad") + ", luxury villas near Wakad Pune",
        "Luxury Forest Villas near Wakad | Paranjape Forest Trails Pune",
        "Luxury forest villas near Wakad Pune. Premium villas near Wakad-Hinjewadi IT corridor. Starting ₹3.89 Cr*."
    ),
    "luxury-forest-villas-near-warje": (
        kw_villas("Warje") + ", " + kw_warje("4BHK"),
        "Luxury Forest Villas near Warje | Paranjape Forest Trails Pune",
        "Luxury forest villas near Warje Pune. Premium 4BHK nature villas near Warje-Kothrud. Starting ₹3.89 Cr*."
    ),
    # ─── Gated Township ───────────────────────────────────────────────────────
    "gated-township-plots-near-bhugaon": (
        kw_gated_township("Bhugaon") + ", " + kw_bhugaon(),
        "Gated Township Plots near Bhugaon | Paranjape Forest Trails Pune",
        "Gated township plots near Bhugaon Pune. RERA approved plots in 190-acre integrated township. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-bavdhan": (
        kw_gated_township("Bavdhan") + ", " + kw_bavdhan(),
        "Gated Township Plots near Bavdhan | Paranjape Forest Trails Pune",
        "Gated township plots near Bavdhan Pune. Integrated 190-acre township plots near Bavdhan. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-kothrud": (
        kw_gated_township("Kothrud") + ", " + kw_kothrud(),
        "Gated Township Plots near Kothrud | Paranjape Forest Trails Pune",
        "Gated township plots near Kothrud Pune. RERA approved plots in nature township near Kothrud. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-chandani-chowk": (
        kw_gated_township("Chandani Chowk") + ", " + kw_chandani(),
        "Gated Township Plots near Chandani Chowk | Paranjape Forest Trails",
        "Gated township plots near Chandani Chowk Pune. Integrated township plots 5 mins from Chandani Chowk flyover. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-paud-road": (
        kw_gated_township("Paud Road") + ", " + kw_paud_road(),
        "Gated Township Plots near Paud Road | Paranjape Forest Trails Pune",
        "Gated township plots near Paud Road Pune. RERA approved integrated township on Paud Road corridor. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-baner": (
        kw_gated_township("Baner") + ", " + kw_baner(),
        "Gated Township Plots near Baner | Paranjape Forest Trails Pune",
        "Gated township plots near Baner Pune. Nature township plots in Bhugaon with Baner connectivity. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-balewadi": (
        kw_gated_township("Balewadi") + ", " + kw_balewadi(),
        "Gated Township Plots near Balewadi | Paranjape Forest Trails Pune",
        "Gated township plots near Balewadi Pune. Integrated township plots near Balewadi corridor. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-hinjewadi-it-park": (
        kw_gated_township("Hinjewadi") + ", " + kw_hinjewadi(),
        "Gated Township Plots near Hinjewadi IT Park | Paranjape Forest Trails",
        "Gated township plots near Hinjewadi IT Park. RERA approved plots in 190-acre nature township. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-aundh": (
        kw_gated_township("Aundh") + ", gated township near Aundh Pune",
        "Gated Township Plots near Aundh | Paranjape Forest Trails Pune",
        "Gated township plots near Aundh Pune. Integrated nature township plots near Aundh. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-erandwane": (
        kw_gated_township("Erandwane") + ", gated township near Erandwane Pune",
        "Gated Township Plots near Erandwane | Paranjape Forest Trails Pune",
        "Gated township plots near Erandwane Pune. Premium RERA approved plots near Erandwane. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-karve-nagar": (
        kw_gated_township("Karve Nagar") + ", gated township near Karve Nagar Pune",
        "Gated Township Plots near Karve Nagar | Paranjape Forest Trails",
        "Gated township plots near Karve Nagar Pune. Integrated nature township near Karve Nagar-Kothrud. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-mulshi": (
        kw_gated_township("Mulshi") + ", gated township near Mulshi Pune",
        "Gated Township Plots near Mulshi | Paranjape Forest Trails Pune",
        "Gated township plots near Mulshi Pune. Nature-facing township plots near Mulshi Dam. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-pashan": (
        kw_gated_township("Pashan") + ", gated township near Pashan Pune",
        "Gated Township Plots near Pashan | Paranjape Forest Trails Pune",
        "Gated township plots near Pashan Pune. RERA approved integrated township near Pashan. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-pirangut": (
        kw_gated_township("Pirangut") + ", gated township near Pirangut Pune",
        "Gated Township Plots near Pirangut | Paranjape Forest Trails Pune",
        "Gated township plots near Pirangut Pune. Serene nature township plots near Pirangut. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-pune-west": (
        kw_gated_township("Pune West") + ", " + kw_pune_west(),
        "Gated Township Plots in Pune West | Paranjape Forest Trails Township",
        "Gated township plots in Pune West. Top-rated 190-acre integrated nature township in Bhugaon. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-shivaji-nagar": (
        kw_gated_township("Shivaji Nagar") + ", gated township near Shivaji Nagar Pune",
        "Gated Township Plots near Shivaji Nagar | Paranjape Forest Trails",
        "Gated township plots near Shivaji Nagar Pune. RERA approved nature township plots. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-sus": (
        kw_gated_township("Sus") + ", gated township near Sus Gaon Pune",
        "Gated Township Plots near Sus | Paranjape Forest Trails Pune",
        "Gated township plots near Sus Pune. Nature township plots near Sus-Baner corridor. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-wakad": (
        kw_gated_township("Wakad") + ", gated township near Wakad Pune",
        "Gated Township Plots near Wakad | Paranjape Forest Trails Pune",
        "Gated township plots near Wakad Pune. RERA approved integrated township near Wakad. Starting ₹1.23 Cr*."
    ),
    "gated-township-plots-near-warje": (
        kw_gated_township("Warje") + ", " + kw_warje(),
        "Gated Township Plots near Warje | Paranjape Forest Trails Pune",
        "Gated township plots near Warje Pune. Nature township plots near Warje-Kothrud. Starting ₹1.23 Cr*."
    ),
    # ─── Twin Bungalows ───────────────────────────────────────────────────────
    "twin-bungalows-forest-trails-bhugaon": (
        kw_bhugaon("4BHK") + ", twin bungalows Bhugaon, twin bungalow price Bhugaon 2026, duplex bungalow Bhugaon, 4BHK twin bungalow Pune West, The Cove twin bungalows Forest Trails",
        "Twin Bungalows in Bhugaon | The Cove | Paranjape Forest Trails",
        "Luxury twin bungalows in Bhugaon at The Cove, Paranjape Forest Trails. 4BHK & 5BHK twin bungalows in gated township. Starting ₹2.85 Cr*."
    ),
    "twin-bungalows-near-bavdhan": (
        kw_bavdhan("4BHK") + ", twin bungalows near Bavdhan, twin bungalow price near Bavdhan 2026, duplex bungalow Bavdhan Pune",
        "Twin Bungalows near Bavdhan | Paranjape Forest Trails Pune",
        "Luxury twin bungalows near Bavdhan Pune. 4BHK twin bungalows in gated nature township near Bavdhan. Starting ₹2.85 Cr*."
    ),
    "twin-bungalows-near-kothrud": (
        kw_kothrud("4BHK") + ", twin bungalows near Kothrud, twin bungalow price near Kothrud 2026, duplex bungalow Kothrud Pune",
        "Twin Bungalows near Kothrud | Paranjape Forest Trails Pune",
        "Luxury twin bungalows near Kothrud Pune. 4BHK twin bungalows in nature township near Kothrud. Starting ₹2.85 Cr*."
    ),
    # ─── Independent Bungalows ────────────────────────────────────────────────
    "independent-bungalows-near-bavdhan": (
        kw_bavdhan() + ", independent bungalow near Bavdhan, standalone bungalow near Bavdhan, 4BHK bungalow near Bavdhan Pune",
        "Independent Bungalows near Bavdhan | Paranjape Forest Trails Pune",
        "Independent bungalows near Bavdhan Pune. Standalone luxury bungalows in 190-acre gated township near Bavdhan. Starting ₹2.85 Cr*."
    ),
    "independent-bungalows-near-kothrud": (
        kw_kothrud() + ", independent bungalow near Kothrud, standalone bungalow near Kothrud, 4BHK bungalow near Kothrud Pune",
        "Independent Bungalows near Kothrud | Paranjape Forest Trails Pune",
        "Independent bungalows near Kothrud Pune. Standalone luxury bungalows in nature township near Kothrud. Starting ₹2.85 Cr*."
    ),
    # ─── Senior Living ────────────────────────────────────────────────────────
    "senior-living-pune-west-athashri-bhugaon-guide": (
        kw_senior("Bhugaon") + ", " + kw_senior("Pune West") + ", Athashri senior living guide Pune",
        "Senior Living in Bhugaon Pune West | Athashri | Paranjape Forest Trails",
        "Complete guide to senior living in Bhugaon Pune West. Athashri senior citizen homes in 190-acre gated township. Starting ₹83 Lakhs*."
    ),
    # ─── Comparisons ──────────────────────────────────────────────────────────
    "bavdhan-vs-bhugaon-property-appreciation": (
        "Bavdhan vs Bhugaon property, Bavdhan vs Bhugaon investment, Bavdhan vs Bhugaon price comparison 2026, "
        + kw_bavdhan() + ", " + kw_bhugaon() + ", best locality Pune West 2026, Bavdhan Bhugaon ROI comparison",
        "Bavdhan vs Bhugaon Property Appreciation 2026 | Investment Comparison",
        "Bavdhan vs Bhugaon property appreciation 2026. Compare prices, ROI, RERA projects, and connectivity for Pune West investment."
    ),
    "forest-trails-vs-bavdhan-projects": (
        "Forest Trails vs Bavdhan projects, Paranjape Forest Trails vs Bavdhan developers, "
        + kw_bavdhan() + ", Forest Trails vs competitors Pune West, best gated township Pune West 2026",
        "Paranjape Forest Trails vs Bavdhan Projects | Pune West Comparison 2026",
        "Compare Paranjape Forest Trails vs Bavdhan projects. Discover why Forest Trails is Pune West's #1 township."
    ),
    "forest-trails-vs-kothrud-apartments": (
        "Forest Trails vs Kothrud apartments, Paranjape Forest Trails vs Kothrud projects, "
        + kw_kothrud() + ", best township vs apartments Pune, Forest Trails vs Kothrud ROI 2026",
        "Paranjape Forest Trails vs Kothrud Apartments | Pune Comparison 2026",
        "Compare Paranjape Forest Trails vs Kothrud apartments. Why gated township plots outperform urban flats."
    ),
}

# ─── NEW PAGES TO CREATE ─────────────────────────────────────────────────────
NEW_PAGES = {
    "2bhk-in-bhugaon": (
        kw_bhugaon("2BHK") + ", 2BHK in Bhugaon, 2 BHK flat Bhugaon, 2BHK apartment Bhugaon, buy 2BHK Bhugaon, 2BHK price Bhugaon 2026, 2BHK RERA Bhugaon, 2BHK Canopy Forest Trails, 2BHK Highgardens Bhugaon, 2BHK Orchard Bhugaon",
        "2 BHK in Bhugaon | Forest Trails Apartments | Paranjape Pune",
        "Buy 2 BHK in Bhugaon Pune. RERA approved 2BHK apartments in 190-acre Forest Trails township. The Canopy & Highgardens starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-the-canopy/"
    ),
    "3bhk-in-pune": (
        kw_pune_west("3BHK") + ", 3BHK in Pune, 3 BHK flat Pune, 3BHK apartment Pune, buy 3BHK Pune, 3BHK price Pune 2026, 3BHK RERA Pune, 3BHK Pune West, 3BHK Bhugaon Bavdhan Kothrud",
        "3 BHK in Pune | Forest Trails Apartments | Paranjape",
        "Buy 3 BHK in Pune West. Premium RERA approved 3BHK apartments in Bhugaon nature township near Kothrud & Bavdhan. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-the-canopy/"
    ),
    "3bhk-in-kothrud": (
        kw_kothrud("3BHK") + ", 3BHK in Kothrud, 3 BHK flat Kothrud, 3BHK apartment Kothrud, buy 3BHK Kothrud, 3BHK price Kothrud 2026, 3BHK RERA Kothrud",
        "3 BHK in Kothrud | Forest Trails | Paranjape Pune",
        "Buy 3 BHK in Kothrud Pune. Spacious 3BHK apartments in gated nature township near Kothrud. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-the-canopy/"
    ),
    "3bhk-near-chandani-chowk": (
        kw_chandani("3BHK") + ", 3BHK near Chandani Chowk, 3 BHK flat Chandani Chowk, buy 3BHK Chandani Chowk Pune, 3BHK price Chandani Chowk 2026",
        "3 BHK near Chandani Chowk | Forest Trails Apartments | Paranjape",
        "Buy 3 BHK near Chandani Chowk flyover Pune. RERA approved 3BHK apartments 5 mins from Chandani Chowk. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-the-canopy/"
    ),
    "na-plots-in-bhugaon": (
        kw_na_plots("Bhugaon") + ", " + kw_bhugaon() + ", NA plots in Bhugaon, NA bungalow plots Bhugaon, buy NA plots Bhugaon, NA plots price Bhugaon 2026, RERA NA plots Bhugaon P52100053834, Misty Greens plots",
        "NA Plots in Bhugaon | Misty Greens | Paranjape Forest Trails Pune",
        "Buy NA plots in Bhugaon Pune. RERA approved NA bungalow plots (MahaRERA P52100053834) at Misty Greens, 190-acre township. Starting ₹1.23 Cr*.",
        "/paranjape-forest-trails-township-bhugaon-misty-greens/"
    ),
    "na-plots-in-pune": (
        kw_na_plots("Pune") + ", " + kw_pune_west() + ", NA plots in Pune, NA bungalow plots Pune, buy NA plots Pune, NA plots price Pune 2026, RERA NA plots Pune West",
        "NA Plots in Pune | Misty Greens | Paranjape Forest Trails",
        "Buy NA plots in Pune West. Top RERA approved NA bungalow plots in 190-acre gated township Bhugaon. Starting ₹1.23 Cr*.",
        "/paranjape-forest-trails-township-bhugaon-misty-greens/"
    ),
    "property-in-bhugaon": (
        kw_bhugaon() + ", property in Bhugaon, buy property Bhugaon Pune, flats in Bhugaon, villas in Bhugaon, plots in Bhugaon, Bhugaon property price 2026, Bhugaon real estate investment 2026",
        "Property in Bhugaon Pune | Forest Trails Township | Paranjape",
        "Explore all property in Bhugaon Pune. Plots, villas, apartments & senior living at Paranjape Forest Trails. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-pune/"
    ),
    "property-near-chandani-chowk": (
        kw_chandani() + ", property near Chandani Chowk, buy property Chandani Chowk Pune, flats near Chandani Chowk, property price Chandani Chowk 2026",
        "Property near Chandani Chowk Pune | Paranjape Forest Trails",
        "Buy property near Chandani Chowk Pune. RERA approved flats, villas & plots 5 mins from Chandani Chowk flyover. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-pune/"
    ),
    "plots-in-pune-west": (
        kw_na_plots("Pune West") + ", " + kw_pune_west() + ", plots in Pune West, buy plots Pune West, bungalow plots Pune West 2026, NA plots Pune West price, RERA plots Pune West",
        "Plots in Pune West | NA Bungalow Plots | Paranjape Forest Trails",
        "Buy plots in Pune West. RERA approved NA bungalow plots in 190-acre gated township Bhugaon. Starting ₹1.23 Cr*.",
        "/paranjape-forest-trails-township-bhugaon-plots/"
    ),
    "senior-living-bhugaon": (
        kw_senior("Bhugaon") + ", senior living Bhugaon, retirement homes Bhugaon Pune, Athashri Bhugaon, senior citizen township Bhugaon, senior living price Bhugaon 2026",
        "Senior Living in Bhugaon Pune | Athashri | Paranjape Forest Trails",
        "Premium senior living in Bhugaon Pune at Athashri, Forest Trails. Gated senior community with world-class facilities. Starting ₹83 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"
    ),
    "nri-investment-bhugaon": (
        "NRI investment Bhugaon, NRI property Bhugaon Pune, NRI buy property Pune West, NRI plots Bhugaon, NRI villas Bhugaon, NRI investment Pune 2026, NRI real estate Pune West, dollar investment Pune property, NRI RERA property Bhugaon, NRI ROI Bhugaon Pune West, "
        + kw_bhugaon() + ", NRI investment Pune West 2026",
        "NRI Investment in Bhugaon Pune | Paranjape Forest Trails Township",
        "NRI investment guide for Bhugaon Pune. RERA approved plots, villas & apartments for NRI buyers. High ROI, safe gated township. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-property-investment-bhugaon-pune/"
    ),
    "luxury-villas-bhugaon": (
        kw_villas("Bhugaon") + ", " + kw_bhugaon("4BHK") + ", luxury villas in Bhugaon, Rivolo villas Bhugaon price, 4BHK luxury villa Bhugaon, 5BHK luxury villa Bhugaon",
        "Luxury Villas in Bhugaon Pune | Rivolo Residences | Paranjape",
        "Luxury villas in Bhugaon Pune at The Rivolo Residences, Forest Trails. 4BHK & 5BHK luxury forest villas. Starting ₹3.89 Cr*.",
        "/paranjape-forest-trails-township-bhugaon-rivolo-residences/"
    ),
    "5bhk-villas-pune-west": (
        kw_pune_west("5BHK") + ", kw_bhugaon('5BHK'), 5BHK villa Pune West, 5BHK bungalow Pune West, 5BHK luxury villa Bhugaon, 5BHK villa price Pune West 2026, 5BHK duplex Pune West",
        "5 BHK Villas in Pune West | Rivolo Residences | Paranjape Forest Trails",
        "Buy 5 BHK luxury villas in Pune West at The Rivolo Residences, Forest Trails Bhugaon. Premium forest villas. Starting ₹3.89 Cr*.",
        "/paranjape-forest-trails-township-bhugaon-rivolo-residences/"
    ),
    "rera-approved-plots-bhugaon": (
        "RERA approved plots Bhugaon, MahaRERA plots Bhugaon, MahaRERA P52100053834, RERA plots Pune West, RERA approved NA plots Bhugaon, RERA certified plots Pune, "
        + kw_na_plots("Bhugaon") + ", " + kw_bhugaon(),
        "RERA Approved Plots in Bhugaon | MahaRERA P52100053834 | Forest Trails",
        "Buy MahaRERA RERA approved plots in Bhugaon Pune (P52100053834). Fully compliant NA bungalow plots at Misty Greens, Forest Trails. Starting ₹1.23 Cr*.",
        "/paranjape-forest-trails-township-bhugaon-misty-greens/"
    ),
    "ready-to-move-flats-bavdhan": (
        kw_bavdhan("2BHK") + ", ready to move flats Bavdhan, ready possession flats Bavdhan, ready to move 2BHK Bavdhan, ready to move apartments Bavdhan Pune, ready possession Chandani Chowk, ready to move flats Pune West 2026",
        "Ready to Move Flats near Bavdhan | Paranjape Forest Trails Pune",
        "Ready to move flats near Bavdhan Pune. RERA approved ready-possession 2BHK & 3BHK apartments near Bavdhan. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-the-canopy/"
    ),
    "under-construction-projects-bhugaon": (
        kw_bhugaon() + ", under construction projects Bhugaon, new launch Bhugaon Pune, under construction flats Bhugaon, new project Bhugaon 2026, under construction villas Bhugaon, under construction plots Bhugaon, new launch Pune West 2026",
        "Under Construction Projects in Bhugaon Pune | New Launch | Paranjape",
        "Under construction projects in Bhugaon Pune 2026. New launch RERA approved flats, villas & plots at Forest Trails. Starting ₹89 Lakhs*.",
        "/paranjape-forest-trails-township-bhugaon-pune/"
    ),
}

# ─── GLOBAL KEYWORDS (for BaseLayout.astro default) ─────────────────────────
GLOBAL_KEYWORDS = (
    "Paranjape Forest Trails Bhugaon, NA plots Bhugaon, NA bungalow plots Pune, "
    "luxury villas Bhugaon, 2BHK in Bhugaon, 3BHK in Pune West, 4BHK villa Bhugaon, "
    "property in Bhugaon, property near Bavdhan, property near Kothrud, "
    "property near Chandani Chowk, property on Paud Road, property near Baner, "
    "gated township Pune West, 190-acre township Bhugaon, RERA approved Bhugaon, "
    "MahaRERA plots Bhugaon, senior living Bhugaon, NRI investment Bhugaon, "
    "NA plots in Pune, buy plots Pune West, luxury forest villas Pune, "
    "twin bungalows Bhugaon, gated community Bavdhan, gated community Kothrud, "
    "Chandani Chowk flyover connectivity, Bhugaon property price 2026, "
    "Bavdhan property investment, Kothrud real estate 2026, Pune West investment 2026, "
    "ready to move flats Bavdhan, under construction projects Bhugaon, "
    "RERA approved plots Bhugaon P52100053834, Misty Greens NA plots, "
    "The Rivolo villas, The Cove bungalows, The Canopy apartments, "
    "Highgardens apartments, Orchard residences, Swaniketan, Athashri senior living, "
    "Everglades Bavdhan, Paranjape Schemes Pune, Paranjape price list 2026, "
    "NRI investment Pune, ROI appreciation Pune West, Bhugaon 2026 growth"
)

# ─── TEMPLATE FOR NEW PAGES ─────────────────────────────────────────────────
NEW_PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="keywords" content="{keywords}">
  <link rel="canonical" href="https://www.paranjapetownship.com/{slug}/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="https://www.paranjapetownship.com/{slug}/">
  <meta property="og:image" content="https://www.paranjapetownship.com/images/hero-township.webp">
  <meta property="og:site_name" content="Paranjape Forest Trails Township Bhugaon">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{description}">
  <meta name="geo.region" content="IN-MH">
  <meta name="geo.placename" content="Bhugaon, Pune West, Maharashtra, India">
  <meta name="geo.position" content="18.5050;73.7406">
  <meta name="ICBM" content="18.5050, 73.7406">
  <link rel="icon" href="/favicon.ico">
  <meta name="theme-color" content="#4A0808">
  <link rel="stylesheet" href="/style.min.css?v=2026.08.24.10">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "RealEstateProject",
    "name": "Paranjape Forest Trails",
    "description": "{description}",
    "url": "https://www.paranjapetownship.com/",
    "address": {{
      "@type": "PostalAddress",
      "streetAddress": "Paranjape Forest Trails Township",
      "addressLocality": "Bhugaon",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN",
      "postalCode": "412115"
    }},
    "geo": {{
      "@type": "GeoCoordinates",
      "latitude": 18.5050,
      "longitude": 73.7406
    }}
  }}
  </script>
  <!-- Google Analytics GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PARANJAPE"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-PARANJAPE');</script>
</head>
<body>
  <script>window.location.replace("{redirect_url}");</script>
  <noscript>
    <meta http-equiv="refresh" content="0;url={redirect_url}">
  </noscript>

  <!-- SEO Content Block -->
  <main id="main-content" style="max-width:900px;margin:0 auto;padding:2rem;font-family:sans-serif;">
    <h1>{title}</h1>
    <p>{description}</p>

    <h2>Why Choose Paranjape Forest Trails for {h2_market}?</h2>
    <p>Paranjape Forest Trails is Pune West's premier 190-acre integrated township in Bhugaon, offering RERA approved NA plots, luxury forest villas, premium apartments, and senior living residences — all within a single gated nature ecosystem.</p>

    <h2>Property Options {h2_market}</h2>
    <ul>
      <li><strong>NA Bungalow Plots</strong> — Starting ₹1.23 Cr* | MahaRERA P52100053834 | Misty Greens</li>
      <li><strong>Luxury Forest Villas</strong> — Starting ₹3.89 Cr* | MahaRERA P52100031560 | The Rivolo</li>
      <li><strong>Twin Bungalows</strong> — Starting ₹2.85 Cr* | MahaRERA P52100048536 | The Cove</li>
      <li><strong>2 &amp; 3 BHK Apartments</strong> — Starting ₹89 L* | MahaRERA P52100079518 | The Canopy</li>
      <li><strong>Senior Living</strong> — Starting ₹83 L* | MahaRERA P52100077686 | Athashri</li>
    </ul>

    <h2>Connectivity {h2_market}</h2>
    <ul>
      <li>5 mins to Chandani Chowk flyover</li>
      <li>10 mins to Bavdhan &amp; Kothrud</li>
      <li>15 mins to Baner &amp; Balewadi</li>
      <li>20 mins to Hinjewadi IT Park</li>
      <li>25 mins to Shivaji Nagar</li>
    </ul>

    <h2>Investment Highlights {h2_market}</h2>
    <ul>
      <li>190-acre integrated gated township — Pune's largest</li>
      <li>30,000+ trees — certified forest ecosystem</li>
      <li>Bhugaon property appreciation: 18-22% CAGR (2021-2026)</li>
      <li>PMRDA Ring Road interchange at Bhugaon — future value multiplier</li>
      <li>NRI-friendly RERA compliance, bank loan tie-ups</li>
    </ul>

    <p>
      <strong>Contact:</strong> +91 7744009295 | 
      <!--email_off-->propsmartrealty@gmail.com<!--/email_off-->
    </p>
    <p><a href="{redirect_url}">View {title} Details &rarr;</a></p>
  </main>
</body>
</html>
"""

# ─── INJECTION FUNCTIONS ─────────────────────────────────────────────────────
def inject_keywords_into_page(html_path, focused_keywords, title=None, description=None):
    """Replace keywords meta and optionally title/description in an HTML file."""
    try:
        with open(html_path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception as e:
        print(f"  ERROR reading {html_path}: {e}")
        return False

    combined_keywords = focused_keywords + ", " + BRAND_KEYWORDS
    new_keywords_tag = f'<meta name="keywords" content="{combined_keywords}">'

    # Replace existing keywords meta
    keywords_pattern = re.compile(
        r'<meta\s+name=["\']keywords["\']\s+content=["\'][^"\']*["\']\s*/?>',
        re.IGNORECASE
    )

    if keywords_pattern.search(content):
        new_content = keywords_pattern.sub(new_keywords_tag, content)
    else:
        # No keywords meta — inject before </head>
        new_content = re.sub(
            r'</head>',
            f'  {new_keywords_tag}\n</head>',
            content,
            flags=re.IGNORECASE,
            count=1
        )

    # Optionally update title
    if title:
        title_pattern = re.compile(r'<title>[^<]*</title>', re.IGNORECASE)
        if title_pattern.search(new_content):
            new_content = title_pattern.sub(f'<title>{title}</title>', new_content, count=1)

    # Optionally update description
    if description:
        desc_pattern = re.compile(
            r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']\s*/?>',
            re.IGNORECASE
        )
        new_desc_tag = f'<meta name="description" content="{description}">'
        if desc_pattern.search(new_content):
            new_content = desc_pattern.sub(new_desc_tag, new_content, count=1)

    if new_content != content:
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False


def create_new_page(slug, focused_keywords, title, description, redirect_url):
    """Create a new keyword landing page HTML file."""
    page_dir = os.path.join(BASE_DIR, slug)
    os.makedirs(page_dir, exist_ok=True)
    html_path = os.path.join(page_dir, "index.html")

    if os.path.exists(html_path):
        # Just update keywords if page exists
        result = inject_keywords_into_page(html_path, focused_keywords, title, description)
        if result:
            print(f"  UPDATED (existing): {slug}/index.html")
        else:
            print(f"  UNCHANGED: {slug}/index.html")
        return

    combined_keywords = focused_keywords + ", " + BRAND_KEYWORDS
    market_words = slug.replace("-", " ").replace("bhk", "BHK").replace("na ", "NA ").title()

    html = NEW_PAGE_TEMPLATE.format(
        title=title,
        description=description,
        keywords=combined_keywords,
        slug=slug,
        redirect_url=redirect_url,
        h2_market=market_words
    )

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  CREATED: {slug}/index.html")


# ─── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    print("=" * 70)
    print("Pune Real Estate Keyword Domination Engine v1.0")
    print("=" * 70)

    # 1. Inject keywords into existing pages
    print("\n[1/2] Injecting page-specific keywords into existing landing pages...")
    updated = 0
    skipped = 0

    for slug, data in PAGE_KEYWORD_MAP.items():
        focused_kw = data[0]
        title = data[1] if len(data) > 1 else None
        description = data[2] if len(data) > 2 else None

        page_path = os.path.join(BASE_DIR, slug, "index.html")

        if not os.path.exists(page_path):
            print(f"  SKIP (not found): {slug}/")
            skipped += 1
            continue

        result = inject_keywords_into_page(page_path, focused_kw, title, description)
        if result:
            print(f"  ✓ UPDATED: {slug}/")
            updated += 1
        else:
            print(f"  — UNCHANGED: {slug}/")

    print(f"\n  Done: {updated} pages updated, {skipped} slugs not found.")

    # 2. Create new high-volume keyword pages
    print("\n[2/2] Creating new transactional keyword pages...")
    for slug, data in NEW_PAGES.items():
        focused_kw, title, description, redirect_url = data[0], data[1], data[2], data[3]
        create_new_page(slug, focused_kw, title, description, redirect_url)

    print("\n" + "=" * 70)
    print("Keyword injection complete.")
    print("Next: run `python3 scripts/generate_seo_matrix.py` to rebuild sitemaps.")
    print("=" * 70)


if __name__ == "__main__":
    main()
