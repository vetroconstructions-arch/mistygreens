#!/usr/bin/env node
/**
 * Advanced Cluster Pages Generator (v2.0)
 * Enhances individual clusters with deep SEO master content, webp assets, and ultra-premium mobile hooks.
 */
const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const SITE = 'https://paranjape-mistygreens.in';
const VERSION = '2.0';

// Elite Global Components
const NAVBAR_HTML = `
    <!-- Architectural Navigation -->
    <header class="header-main">
        <div class="heritage-ticker">
            <div class="ticker-content">
                <div class="ticker-item">New Milestone: 2,000+ Resident Families</div>
                <div class="ticker-item">Plots Booking Rapidly: 85% Sold Case in Misty Greens</div>
                <div class="ticker-item">The Cliff Club: Voted Pune's Best Township Amenity</div>
                <div class="ticker-item">Connectivity Update: Ring Road Phase 1 Operational</div>
                <div class="ticker-item">New Milestone: 2,000+ Resident Families</div>
                <div class="ticker-item">Plots Booking Rapidly: 85% Sold Case in Misty Greens</div>
            </div>
        </div>

        <nav class="nav-main">
        <div class="container nav-content">
            <a href="/" class="nav-brand">
                <div class="brand-logo-text">
                    <span class="brand-main">Paranjape</span>
                    <span class="brand-sub">Forest Trails</span>
                </div>
            </a>

            <button class="mobile-toggle" id="mobile-nav-toggle" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="nav-search-box">
                <div class="search-proxy" role="navigation" aria-label="Main Navigation">
                    <div class="search-links">
                        <a href="/township-facilities.html" class="nav-item-new">TOWNSHIP</a>
                        <a href="/clusters-villas.html" class="nav-item-new">VILLAS & PLOTS</a>
                        <a href="/clusters-apartments.html" class="nav-item-new">APARTMENTS</a>
                        <a href="/amenities-the-cliff-club.html" class="nav-item-new">THE CLIFF CLUB</a>
                    </div>
                </div>
            </div>

            <div class="nav-actions">
                <a href="https://wa.me/917744009295?text=Hi%2C%20I%27m%20interested%20in%20Forest%20Trails%20Bhugaon%20plots." target="_blank" rel="noopener" class="whatsapp-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span>WHATSAPP</span>
                </a>
                <button class="nav-item-new open-enquiry-modal tour-btn" id="nav-enquire" data-project="Forest Trails Legacy" aria-label="Open global enquiry form">ENQUIRY</button>
            </div>
        </div>
    </nav>
    </header>
`;

const STICKY_MOBILE_BAR_HTML = `
    <!-- Mobile High-Conversion Sticky Bar -->
    <div class="mobile-sticky-bar">
        <a href="https://wa.me/917744009295" target="_blank" rel="noopener" class="mobile-sticky-btn" style="background: #25D366; color: #fff; border-right: 1px solid rgba(255,255,255,0.2);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
        </a>
        <button class="mobile-sticky-btn open-enquiry-modal" style="background: var(--pscl-dark); color: var(--pscl-gold);">
            Enquire Now
        </button>
    </div>
    <style>
        .mobile-sticky-bar { display: none; }
        @media(max-width: 1024px) {
            .mobile-sticky-bar { display: flex !important; position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; box-shadow: 0 -10px 30px rgba(0,0,0,0.15); height: 65px; }
            .mobile-sticky-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 800; font-size: 0.95rem; text-transform: uppercase; border: none; text-decoration: none; font-family: 'Inter', sans-serif; cursor: pointer; letter-spacing: 0.1em; transition: background 0.3s; }
            body { padding-bottom: 65px; } /* Ensures bottom content isn't clipped by sticky block */
        }
    </style>
`;

const ENQUIRY_TRIGGER_HTML = `
    <div class="concierge-trigger" id="concierge-open" role="button" aria-label="Open Enquiry Form">
        <div class="concierge-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <span class="concierge-label">ENQUIRE</span>
    </div>
`;

const MODAL_HTML = `
    <div class="concierge-modal" id="heritage-concierge" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="concierge-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);"></div>
        <div class="concierge-panel" style="position: relative; background: #ffffff; width: 100%; max-width: 520px; border-radius: 20px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.4); border: none; padding: 0; animation: enquiry-modal-entry 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="height: 6px; background: linear-gradient(90deg, var(--pscl-maroon), var(--pscl-gold), var(--pscl-maroon)); background-size: 200% 100%; animation: enquiry-gradient-shift 4s ease infinite;"></div>
            <div style="padding: 4rem 3.5rem 3.5rem; max-height: 90vh; overflow-y: auto;">
                <button id="concierge-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: #f5f5f0; border: none; color: #000; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; transition: all 0.3s; opacity: 0.6;">&times;</button>
                <div class="form-header" style="text-align: center; margin-bottom: 2.5rem;">
                    <div style="display: inline-block; background: rgba(140,115,47,0.08); border: 1px solid rgba(140,115,47,0.2); padding: 0.5rem 1.5rem; border-radius: 50px; margin-bottom: 1.5rem;">
                        <span style="color: var(--pscl-gold); font-weight: 800; font-size: 0.65rem; letter-spacing: 0.3rem; text-transform: uppercase;">✦ Direct Advisory</span>
                    </div>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 2.6rem; margin-top: 0.5rem; color: #1a1a1a; line-height: 1.1;">Request <i style="color: var(--pscl-gold);">Callback</i></h3>
                    <p style="color: #666; font-size: 0.9rem; margin-top: 1rem; letter-spacing: 0.02em;">Secure exclusive pricing & priority site-visit guidance.</p>
                </div>
                <form id="enquiry-form-modal" method="POST" action="https://formsubmit.co/propsmartrealty@gmail.com" style="display: flex; flex-direction: column; gap: 1.2rem;">
                    <input type="hidden" name="_next" value="https://paranjape-mistygreens.in/thank-you.html">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_subject" value="New Website Enquiry - Paranjape Forest Trails">
                    <style>
                        .concierge-panel input::placeholder { color: #999 !important; font-size: 0.8rem; letter-spacing: 0.05em; }
                        .concierge-panel select { color: #1a1a1a; font-size: 0.85rem; }
                        .concierge-panel select:invalid { color: #999; }
                        @keyframes enquiry-modal-entry { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                        .enquiry-input-premium { width: 100%; padding: 1.2rem 1.5rem; background: #f5f5f0; border: 2px solid #b0a890; color: #1a1a1a; border-radius: 12px; font-size: 0.9rem; outline: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                        .enquiry-input-premium:focus { border-color: var(--pscl-gold); background: #fff; box-shadow: 0 0 0 4px rgba(140,115,47,0.15); }
                    </style>
                    <input type="text" name="name" placeholder="FULL NAME *" required class="enquiry-input-premium" style="border-left: 4px solid var(--pscl-gold);">
                    <input type="tel" name="phone" id="concierge-phone" placeholder="MOBILE NUMBER *" required class="enquiry-input-premium">
                    <input type="email" name="email" placeholder="EMAIL ADDRESS" class="enquiry-input-premium">
                    <div style="position: relative;">
                        <select name="interest" required class="enquiry-input-premium" style="appearance: none; -webkit-appearance: none;">
                            <option value="">SELECT INTEREST *</option>
                            <option value="plots">NA Bungalow Plots</option>
                            <option value="villas">Independent Villas</option>
                            <option value="apartments">Luxury Apartments</option>
                            <option value="visit">Schedule Site Visit</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 1rem; margin-top: 0.5rem; background: #fffcf0; padding: 1.2rem; border: 1px solid #f9f1d0; border-radius: 12px;">
                        <input type="checkbox" name="whatsapp_optin" id="wa-optin" checked style="margin-top: 0.3rem; width: 18px; height: 18px; accent-color: var(--pscl-maroon);">
                        <label for="wa-optin" style="font-size: 0.75rem; line-height: 1.5; color: #555; cursor: pointer; font-weight: 500;">I agree to receive the brochure, price list and updates on WhatsApp.</label>
                    </div>
                    <button type="submit" style="width: 100%; padding: 1.5rem; background: linear-gradient(135deg, var(--pscl-maroon), #8B1A1A); color: #fff; border: none; border-radius: 12px; font-weight: 800; font-size: 0.95rem; letter-spacing: 0.2rem; text-transform: uppercase; cursor: pointer; transition: all 0.4s; margin-top: 0.5rem; box-shadow: 0 15px 35px rgba(107,13,13,0.35);">⬥ SECURE ADVISORY ⬥</button>
                    <input type="hidden" name="source" value="Cluster Page Modal">
                </form>
            </div>
        </div>
    </div>
    <div class="conversion-pill open-enquiry-modal" id="callback-pill" data-project="Forest Trails Legacy">
        <div class="pill-icon">📞</div>
        <div class="pill-text">Request Callback</div>
    </div>
    <link rel="stylesheet" href="/conversion-pill.css">
`;

const pages = [
    {
        dir: 'codename-alpha-apartments-bhugaon',
        title: 'Codename Alpha | Premium 1 BHK Flats in Bhugaon, Pune West',
        desc: "Invest in Codename Alpha at Paranjape Forest Trails. RERA registered premium 1 BHK apartments offering high ROI, zero brokerage, and access to luxury amenities.",
        keywords: 'codename alpha bhugaon, 1 bhk flats bhugaon, premium luxury 1 bhk pune, real estate in pune west, high ROI investment pune, zero brokerage properties, rera registered alpha',
        h1: 'Codename <i>Alpha</i>.',
        subtitle: 'The Perfect Entry to Sovereign 190-Acre Township Living.',
        intro: "Codename Alpha presents a unique opportunity to own a premium 1 BHK apartment within Pune's most sought-after integrated township. Designed for modern professionals, Alpha offers smart spatial design and unrestricted access to the holistic Forest Trails lifestyle.",
        bgImage: '/images/hero.webp',
        masterContent: `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid var(--pscl-maroon);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--pscl-dark); margin-bottom: 1.5rem;">The Ultimate Premium Investment in Pune West</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    As a <strong>RERA registered project</strong>, Codename Alpha represents an unparalleled <strong>high ROI investment</strong> within the 190-acre Paranjape Forest Trails township. Destined for those looking at <strong>premium luxury flats</strong>, this tower offers standard-defying 1 BHKs optimized for natural light and sweeping views. Entering the <strong>luxury real estate market in Pune</strong> has never been more accessible—combining <strong>zero brokerage</strong> transactions with immediate connectivity to the upcoming Ring Road infrastructure. It isn't just a home; it is a rapid-growth wealth asset curated by Paranjape Schemes.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div style="padding: 1.5rem; border: 1px solid rgba(140,115,47,0.2); background: #fdfdfc; border-radius: 8px;">
                        <h5 style="color: var(--pscl-maroon); font-size: 0.95rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800;">Master Plan Integration</h5>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.6;">Seamlessly hooked into the foundational township grid, offering unhindered access to The Cliff Club, Equestrian facility, and 30,000+ trees.</p>
                    </div>
                    <div style="padding: 1.5rem; border: 1px solid rgba(140,115,47,0.2); background: #fdfdfc; border-radius: 8px;">
                        <h5 style="color: var(--pscl-maroon); font-size: 0.95rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800;">Appreciation Metrics</h5>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.6;">Pune West's fastest appreciating asset class. Benefit from elite construction quality and zero dead-space layouts minimizing maintenance costs.</p>
                    </div>
                </div>
            </div>
        `,
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600; margin-top: 0.5rem;">1 BHK Premium</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Tower Height</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600; margin-top: 0.5rem;">G + 19 Floors</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'Is Codename Alpha a good real estate investment?', a: 'Yes, being an exclusive 1 BHK tower inside a luxury 190-acre township ensures high rental yields and aggressive capital appreciation, making it a powerful real estate asset.' },
            { q: 'Is it formally RERA registered?', a: 'Yes, Codename Alpha complies strictly with MahaRERA guidelines.' }
        ]
    },
    {
        dir: 'highgardens-apartments-bhugaon',
        title: 'Highgardens | Exclusive 2 BHK Luxury Apartments in Pune',
        desc: 'Explore Highgardens 2 BHK premium apartments at Paranjape Forest Trails. Enjoy high capital appreciation, exclusive 2 BHK enclaves, and ready-like possession momentum.',
        keywords: 'highgardens bhugaon, premium luxury 2 bhk flats, ready to move nearby, exclusive 2 bhk enclave, high capital appreciation pune, luxury apartments forest trails',
        h1: '<i>Highgardens</i>.',
        subtitle: 'Elevated 2 BHK Living amidst 190 Acres of Pristine Nature.',
        intro: 'Highgardens redefines 2 BHK living in West Pune. Nestled within an exclusive 1.78-acre enclave, these twin 16-story towers offer 176 carefully curated premium residences with sweeping views of the verdant valley.',
        bgImage: '/images/landscape.webp',
        masterContent: `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid #2e3a23;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1.5rem;">An Anchor for High Capital Appreciation</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    Highgardens stands out as the ultimate <strong>exclusive 2 BHK enclave</strong> in West Pune. Far beyond standard flats, these are <strong>premium luxury apartments</strong> constructed to maximize panoramic valley views. As the primary infrastructure of the Ring Road materializes, owners at Highgardens are perfectly positioned for <strong>high capital appreciation</strong>. Offering a seamless progression towards a superior lifestyle with the reliability of a <strong>safeguarded real estate investment</strong>, Highgardens delivers extraordinary space utility and deep serenity.
                </p>
            </div>
        `,
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; text-align: center; border-radius: 8px;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Structure</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">2 Towers / 16 Floors</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'How many units are there in Highgardens?', a: 'It is a highly exclusive cluster featuring only 176 units, guaranteeing unparalleled privacy.' }
        ]
    },
    {
        dir: 'canopy-apartments-bhugaon',
        title: 'Canopy | Super Spacious 3 BHK Luxury Flats in Pune',
        desc: 'Canopy at Forest Trails features top luxury real estate in Pune. Super spacious 3 BHK apartments offering zero brokerage and world-class amenities.',
        keywords: 'top luxury real estate pune, super spacious 3 bhk bhugaon, world-class amenities forest trails, premium lifestyle flats, no brokerage apartments pune',
        h1: '<i>Canopy</i>.',
        subtitle: 'The Crown Jewel of 3 BHK Luxury Living in West Pune.',
        intro: 'Rising 19 floors above the Sahyadri foothills, Canopy is a statement of architectural brilliance within the Forest Trails township, meant for those who seek expansive living spaces and unobstructed vistas.',
        bgImage: '/images/hero.webp',
        masterContent: `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid var(--pscl-gold);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1.5rem;">Opulence Validated: Top Luxury Real Estate in Pune</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    Acquiring an asset in Canopy signifies your arrival. Designed as <strong>super spacious 3 BHK</strong> estates in the sky, Canopy ranks amongst the <strong>top luxury real estate in Pune</strong>. Our design ethos ensures every residence operates as an independent quadrant, maximizing privacy with zero common walls between key bedrooms. Enjoy <strong>world-class amenities</strong> and step into a <strong>premium lifestyle</strong> tailored for elites—all completed with the financial transparency of <strong>no brokerage</strong> transactions and definitive Paranjape pedigree.
                </p>
            </div>
        `,
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">3 BHK Spacious</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'Is Canopy a standalone project?', a: 'No, Canopy is an integral crown-jewel cluster within the massive 190-acre Paranjape Forest Trails township ecosystem.' }
        ]
    },
    {
        dir: 'the-highlands-forest-trails',
        title: 'The Highlands | 3 BHK Premium Bungalows & Flats in Forest Trails',
        desc: 'The Highlands offers a mixed-use luxury township experience in Pune. Explore 3 BHK premium bungalows and robust property investments with elite status.',
        keywords: 'mixed-use luxury township pune, 3 bhk premium bungalows, robust property investment, rera registered highlands, forest trails phase 2',
        h1: 'The <i>Highlands</i>.',
        subtitle: 'A 7.72-Acre Masterpiece. Apartments and Premium Bungalows.',
        intro: 'A unique, self-sustaining community spanning 7.72 acres. Comprising 11 majestic 17-story towers alongside magnificent independent bungalows, this cluster offers unparalleled variety.',
        bgImage: '/images/landscape.webp',
        masterContent: `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid var(--pscl-maroon);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1.5rem;">A Robust, Mixed-Use Luxury Township Hub</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    The Highlands asserts its dominance as a prime hub inside a highly sought-after <strong>mixed-use luxury township in Pune</strong>. Featuring highly coveted <strong>3 BHK premium bungalows</strong> arrayed alongside spectacular high-rises, it provides diverse architectural pathways to secure a <strong>robust property investment</strong>. Fully <strong>RERA registered (P52100000103)</strong>, it guarantees security and compliance for investors, while offering end-users unparalleled lifestyle magnitude.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div style="padding: 1.5rem; border: 1px solid rgba(140,115,47,0.2); background: #fdfdfc; border-radius: 8px;">
                        <h5 style="color: var(--pscl-maroon); font-size: 0.95rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800;">Possession Status</h5>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.6;">Phase 1 Ready. Towers 9, 10, 11 (2 BHK) under construction with possession July 2028.</p>
                    </div>
                </div>
            </div>
        `,
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Inventory Type</h4>
                    <p style="color: #fff; font-size: 1.2rem; font-weight: 600; margin-top:0.8rem;">2/3 BHK & Bungalows</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-maroon);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">RERA No.</h4>
                    <p style="color: #fff; font-size: 1.1rem; font-weight: 600; margin-top: 0.8rem;">P52100000103</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'Does The Highlands have both flats and bungalows?', a: 'Yes, it is a mixed-typology cluster featuring high-rise apartments as well as exclusive bungalows.' }
        ]
    },
    {
        dir: 'pebbles-apartments-bhugaon',
        title: 'Pebbles | Ready-to-Move 1 BHK Luxury Flats in Pune',
        desc: 'Take immediate possession at Pebbles in Forest Trails. Ready-to-move 1 BHK fully constructed luxury apartments offering safe, zero-wait real estate investment.',
        keywords: 'immediate possession flats pune, ready-to-move 1 bhk, fully constructed luxury apartments, safe real estate investment, zero wait homes bhugaon',
        h1: '<i>Pebbles</i>.',
        subtitle: 'Ready-to-Move. Zero Wait Time. 1 BHK Premium Living.',
        intro: 'For those who want to instantly immerse themselves in the Forest Trails lifestyle, Pebbles is the answer. Start your sovereign township life today, without the uncertainty of construction delays.',
        bgImage: '/images/hero.webp',
        masterContent: `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid #25D366;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1.5rem;">Skip the Wait: Secure Immediate Sovereignty</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    Why gamble on projected timelines when you can take <strong>immediate possession</strong>? Pebbles delivers <strong>ready-to-move 1 BHK</strong> flats representing a highly <strong>safe real estate investment</strong>. These are <strong>fully constructed luxury apartments</strong> enabling you to unlock the spectacular benefits of Pune West's largest township tonight. Escape the exhaustion of construction tracking—buy, move in, and begin experiencing your tranquil, upgraded lifestyle instantaneously.
                </p>
            </div>
        `,
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-gold);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Status</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">Ready-to-Move</p>
                </div>
        `,
        faqs: [
            { q: 'Is Pebbles fully constructed?', a: 'Yes, Pebbles is a ready-to-move-in project. You can purchase and immediately shift in to enjoy the Forest Trails lifestyle.' }
        ]
    },
    {
        "dir": "misty-greens-plots-pune",
        "title": "Misty Greens | Premium NA Bungalow Plots in Bhugaon, Pune West",
        "desc": "Secure your heritage at Misty Greens, Paranjape Forest Trails. Premium NA bungalow plots ranging from 1500 to 7000 sq. ft. RERA P52100049327.",
        "keywords": "misty greens plots bhugaon, na bungalow plots pune west, paranjape misty greens rera, premium plots bhugaon, investment plots pune, gated community plots",
        "h1": "Misty <i>Greens</i>.",
        "subtitle": "A Sovereign Heritage of Premium NA Bungalow Plots.",
        "intro": "Misty Greens is the crown jewel of the 190-acre Forest Trails township. Offering clear-title NA bungalow plots within a secure, gated ecosystem, it is the ultimate destination for those seeking land sovereignty and long-term capital appreciation.",
        "bgImage": "/images/plots.webp",
        "masterContent": `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid var(--pscl-gold);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--pscl-dark); margin-bottom: 1.5rem;">Land Sovereignty: RERA Registered & Clear Title</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    Misty Greens at Forest Trails (Kaleidoscope Township) represents the pinnacle of <strong>premium NA bungalow plots in Pune West</strong>. With plot sizes ranging from <strong>1500 to 7000 sq. ft.</strong>, this cluster provides the perfect canvas for your dream villa. Being <strong>RERA registered (P52100049327)</strong>, every plot comes with individual 7/12 extracts and sanctioned plans, ensuring a <strong>safe real estate investment</strong>. Located just 15 minutes from Kothrud, it offers the serenity of 90% open spaces combined with the reliability of 35+ years of Paranjape legacy.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div style="padding: 1.5rem; border: 1px solid rgba(140,115,47,0.2); background: #fdfdfc; border-radius: 8px;">
                        <h5 style="color: var(--pscl-maroon); font-size: 0.95rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800;">Possession Timeline</h5>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.6;">Phase 1 ready for possession. Future phases scheduled for delivery by August 2027 to April 2029.</p>
                    </div>
                </div>
            </div>
        `,
        "tableHtml": `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; border: 1px solid var(--pscl-gold); text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Plot Sizes</h4>
                    <p style="color: #fff; font-size: 1.2rem; font-weight: 600; margin-top: 0.5rem;">1500 - 7000 sq. ft.</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; border: 1px solid var(--pscl-gold); text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">RERA No.</h4>
                    <p style="color: #fff; font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">P52100049327</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'Are the plots at Misty Greens NA sanctioned?', a: 'Yes, all plots are Collector Sanctioned Non-Agricultural (NA) residential plots with individual 7/12 extracts.' },
            { q: 'What is the largest plot size available?', a: 'Misty Greens offers premium plots up to 7000 sq. ft., ideal for mansions and large independent bungalows.' }
        ]
    },
    {
        "dir": "kaleidoscope-apartments-bhugaon",
        "title": "Kaleidoscope | Luxury Apartments & Township Living in Bhugaon, Pune",
        "desc": "Welcome to Kaleidoscope at Paranjape Forest Trails. A 300+ acre integrated township offering valley-view apartments and premium lifestyle living in Bhugaon.",
        "keywords": "kaleidoscope bhugaon, paranjape kaleidoscope apartments, integrated township pune west, luxury apartments forest trails, township living forest trails rera",
        "h1": "<i>Kaleidoscope</i>.",
        "subtitle": "A 300-Acre Vision of Urban Conscious Living.",
        "intro": "Kaleidoscope is the soul of the Forest Trails ecosystem. Spanning over 300 acres, this integrated township is home to over 3,000 residents, offering a seamless blend of valley-view apartments, palatial mansions, and independent plots.",
        "bgImage": "/images/lifestyle.webp",
        "masterContent": `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid #1a1a1a;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1.5rem;">The Benchmark in Integrated Township Living</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    Kaleidoscope at Forest Trails (Kaleidoscope Township) represents the evolution of Paranjape Schemes' township model. With <strong>90% open spaces</strong> and <strong>38,000+ trees</strong>, it offers a micro-climate that is 2-3 degrees cooler than the city. Featuring the <strong>Shri Ravishankar Vidya Mandir (SSRVM) School</strong>, an <strong>Equestrian Center</strong>, and <strong>The Cliff Club</strong> right within its gates, Kaleidoscope is a self-sustaining world. Whether you choose a 1 BHK at Alpha or a luxury villa at The Cove, you are part of the most <strong>urban conscious lifestyle</strong> in West Pune.
                </p>
            </div>
        `,
        "tableHtml": `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Ownership</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">3,000+ Families</p>
                </div>
            </div>
        `,
        "faqs": [
            { "q": "What is the total area of the Kaleidoscope township?", "a": "The township spans over 300 acres, including Forest Trails and its various residential and recreational sectors." }
        ]
    },
    {
        dir: 'the-cove-villas-bhugaon',
        title: 'The Cove | 4 BHK Luxury Duet Villas / Exclusive Plots in Pune',
        desc: 'Discover The Cove at Forest Trails. Luxury duet villas in Pune with independent massive gardens. Invest in elite real estate with highest living standards.',
        keywords: 'luxury duet villas pune, independent massive gardens, exclusive villa plots, highest standard of living, elite real estate bhugaon',
        h1: 'The <i>Cove</i>.',
        subtitle: '4 BHK Independent Duet Villas. An Elite 9-Acre Enclave.',
        intro: "The Cove is an expression of supreme luxury featuring 85 magnificent 4 BHK duet villas spread across 9 exclusive acres. Built for ultimate privacy.",
        bgImage: '/images/plots.webp',
        masterContent: `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid var(--pscl-maroon);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1.5rem;">Absolute Sovereignty in West Pune</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    For those who refuse to compromise, The Cove presents <strong>luxury duet villas in Pune</strong> unlike any other. Surpassing conventional properties, this enclave offers sprawling <strong>independent massive gardens</strong> attached to soaring 4 BHK architectures. Representing the pinnacle of <strong>elite real estate</strong>, buying into the Cove secures an acreage equivalent to the city's most <strong>exclusive villa plots</strong> without removing you from an organized community. This defines the <strong>highest standard of living</strong> inside the formidable Forest Trails township.
                </p>
            </div>
        `,
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-maroon);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Status</h4>
                    <p style="color: #fff; font-size: 1.2rem; font-weight: 600; margin-top: 0.8rem;">Possession Dec 2026 - Mid 2027</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-maroon);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.2rem; font-weight: 600; margin-top: 0.8rem;">4 BHK Duet Villas</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'What is a "Duet Villa"?', a: 'A duet villa shares a single structure wall with its neighbor but maintains completely independent entrances and vast private layouts on all other sides.' }
        ]
    },
    {
        dir: 'athashri-senior-living-bhugaon',
        title: "Athashri | Premium Senior Living in Pune | Forest Trails Bhugaon",
        desc: "Athashri at Forest Trails is an award-winning senior project offering premium senior living in Pune with exact healthcare access and independent retirement homes.",
        keywords: 'premium senior living pune, exact healthcare access, independent retirement homes, award-winning senior project, athashri bhugaon, real estate for seniors',
        h1: '<i>Athashri</i>.',
        subtitle: 'The Platinum Standard in Purpose-Built Senior Living.',
        intro: "Athashri is Paranjape Schemes' flagship, award-winning senior living concept... It is not an old-age home; it is an active, vibrant community for the silver generation.",
        bgImage: '/images/lifestyle.webp',
        masterContent: `
            <div style="margin-top: 4rem; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); border-left: 5px solid var(--pscl-gold);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1.5rem;">Dignity & Joy: The Premier Golden Era Estate</h3>
                <p style="color: #444; font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    Validated globally as an <strong>award-winning senior project</strong>, Athashri completely transforms expectations by delivering world-class <strong>premium senior living in Pune</strong>. Providing completely <strong>independent retirement homes</strong> infused with <strong>exact healthcare access</strong> directly on-site, residents live with sovereign freedom backed by a 24/7 medical safety net. Positioned within the pristine environment of Forest Trails, this is the ultimate legacy investment—securing a joyous, socially vibrant, and fiercely dignified second innings.
                </p>
            </div>
        `,
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Healthcare</h4>
                    <p style="color: #fff; font-size: 1.3rem; font-weight: 600; margin-top:0.5rem;">24/7 Medical Access</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'Is Athashri only for senior citizens?', a: 'Yes, residency in Athashri requires at least one occupant to be a senior citizen (typically 55+ years of age).' }
        ]
    }
];

function generateHTML(page) {
    const faqEntries = page.faqs.map(f => `            {
                "@type": "Question",
                "name": "${f.q}",
                "acceptedAnswer": { "@type": "Answer", "text": "${f.a}" }
            }`).join(',\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    
    <title>${page.title}</title>
    <meta name="description" content="${page.desc}">
    <meta name="keywords" content="${page.keywords}">
    <link rel="canonical" href="${SITE}/${page.dir}/">
    
    <!-- Ultra Mobile Speed: Fonts & LCP Image Preload -->
    <link rel="preload" as="image" href="${page.bgImage}" fetchpriority="high">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"></noscript>
    
    <link rel="stylesheet" href="/style.css?v=${VERSION}">

    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Forest Trails", "item": "${SITE}/" },
            { "@type": "ListItem", "position": 2, "name": "Clusters", "item": "${SITE}/clusters-apartments.html" },
            { "@type": "ListItem", "position": 3, "name": "${page.title.split(' |')[0]}", "item": "${SITE}/${page.dir}/" }
        ]
    }
    </script>
    
    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
${faqEntries}
        ]
    }
    </script>

    <!-- RealEstateListing & Product Schema (SEO Phase Advanced JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "@id": "${SITE}/${page.dir}/#listing",
        "name": "${page.title.split(' |')[0]}",
        "isPartOf": {
            "@type": "RealEstateProject",
            "name": "Paranjape Forest Trails",
            "url": "${SITE}/"
        },
        "description": "${page.desc.replace(/"/g, '\\"')}",
        "image": "${SITE}${page.bgImage.replace('.png', '.webp').replace('.jpg', '.webp')}",
        "url": "${SITE}/${page.dir}/",
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "itemOffered": {
                "@type": "Product",
                "name": "Luxury Real Estate: ${page.title.split(' |')[0]}",
                "description": "${page.intro.replace(/"/g, '\\"')}"
            }
        }
    }
    </script>
</head>
<body style="background:var(--pscl-bg);">
    ${NAVBAR_HTML}
    <main>
        <section class="hero-section" style="height: 60vh; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000;">
            <div class="hero-bg" style="position: absolute; inset: 0; background-image: url('${page.bgImage}'); background-size: cover; background-position: center; opacity: 0.6;"></div>
            <div class="container" style="position: relative; z-index: 2; text-align: center; padding: 0 1rem;">
                <h1 style="color: #fff; font-family: 'Playfair Display', serif; font-size: clamp(0.9rem, 3vw, 1.5rem); letter-spacing: 0.5rem; text-transform: uppercase; margin-bottom: 1rem;">Cluster Spotlight</h1>
                <h2 style="color: #fff; font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1.1; margin-bottom: 1.5rem;">${page.h1}</h2>
                <p style="color: var(--pscl-gold); font-size: clamp(1rem, 4vw, 1.2rem); letter-spacing: 0.1em; text-transform: uppercase;">${page.subtitle}</p>
            </div>
        </section>

        <section class="section" style="background: #fafafa; padding: 6rem 0;">
            <div class="container">
                <div style="max-width: 900px; margin: 0 auto;">
                    <p style="font-size: 1.25rem; line-height: 1.8; color: #444; border-left: 4px solid var(--pscl-gold); padding-left: 2rem; margin-bottom: 3rem;">
                        ${page.intro}
                    </p>
                    
                    ${page.tableHtml}
                    ${page.masterContent}

                    <div style="text-align: center; margin-top: 5rem;">
                        <button class="open-enquiry-modal btn-primary" style="padding: 1.5rem 3.5rem; font-size: 1rem; border-radius: 50px; font-weight: 800; cursor: pointer;">ENQUIRE & REQUEST BROCHURE</button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    ${STICKY_MOBILE_BAR_HTML}

    <footer class="footer-main" style="background: #000; padding: 5rem 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
        <div class="container">
            <a href="/" style="color: #fff; text-decoration: none; font-weight: 800; letter-spacing: 0.2em; border: 1px solid rgba(255,255,255,0.2); padding: 1rem 2.5rem; border-radius: 50px; display: inline-block;">RETURN TO MAIN SITE</a>
            <p style="margin-top: 3rem; color: rgba(255,255,255,0.4); font-size: 0.8rem;">&copy; 2026 Paranjape Schemes (Construction) Ltd. All Rights Reserved.</p>
        </div>
    </footer>

    ${ENQUIRY_TRIGGER_HTML}
    ${MODAL_HTML}

    <!-- External Dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/script.js?v=${VERSION}" defer></script>
</body>
</html>`;
}

for (const page of pages) {
    const dirPath = path.join(BASE, page.dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Ensure all internal images use webp in generation
    const html = generateHTML(page).replace(/\.jpg/g, '.webp').replace(/\.png/g, '.webp');
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf-8');
    console.log(`✅ Propagated Supreme SEO Content & Mobile Layout for: ${page.dir}`);
}

console.log('\n🎯 Successfully augmented 8 cluster pages with SEO Master Content, WEBP, and Sticky Mobile Bars.');
