#!/usr/bin/env node
/**
 * Cluster Pages Generator
 * Creates dedicated landing pages for specific clusters inside Forest Trails.
 */
const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const SITE = 'https://paranjape-mistygreens.in';
const VERSION = '1.7';

// Elite Global Components (Sync from propagate-form.js/gen-intercept-pages.js)
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
                        <a href="/amenities-equestrian.html" class="nav-item-new">EQUESTRIAN</a>
                        <a href="/amenities-sri-sri-school.html" class="nav-item-new">SCHOOL</a>
                    </div>
                </div>
            </div>

            <div class="nav-actions">
                <a href="https://wa.me/917744009295?text=Hi%2C%20I%27m%20interested%20in%20Forest%20Trails%20Bhugaon%20plots.%20Please%20share%20details." target="_blank" rel="noopener" class="whatsapp-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span>WHATSAPP</span>
                </a>
                <button class="nav-item-new open-enquiry-modal tour-btn" id="nav-enquire" data-project="General Township" aria-label="Open global enquiry form">ENQUIRY</button>
            </div>
        </div>
    </nav>
    </header>
`;

const MODAL_HTML = `
    <!-- Premium Enquiry Modal -->
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
                    <style>
                        .concierge-panel input::placeholder { color: #999 !important; font-size: 0.8rem; letter-spacing: 0.05em; }
                        .concierge-panel select { color: #1a1a1a; font-size: 0.85rem; }
                        .concierge-panel select:invalid { color: #999; }
                        @keyframes enquiry-modal-entry { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                        .enquiry-input-premium { width: 100%; padding: 1.2rem 1.5rem; background: #f5f5f0; border: 2px solid #b0a890; color: #1a1a1a; border-radius: 12px; font-size: 0.9rem; outline: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                        .enquiry-input-premium:focus { border-color: var(--pscl-gold); background: #fff; box-shadow: 0 0 0 4px rgba(140,115,47,0.15); }
                    </style>
                    <input type="text" name="name" placeholder="FULL NAME *" required class="enquiry-input-premium" style="border-left: 4px solid var(--pscl-gold);">
                    <input type="tel" name="phone" placeholder="MOBILE NUMBER *" required class="enquiry-input-premium">
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
                    <button type="submit" class="enquiry-submit-btn" style="width: 100%; padding: 1.5rem; background: linear-gradient(135deg, var(--pscl-maroon), #8B1A1A); color: #fff; border: none; border-radius: 12px; font-weight: 800; font-size: 0.95rem; letter-spacing: 0.2rem; text-transform: uppercase; cursor: pointer; transition: all 0.4s; margin-top: 0.5rem;">⬥ SECURE ADVISORY ⬥</button>
                    <input type="hidden" name="source" value="Premium Sovereign Modal">
                </form>
            </div>
        </div>
    </div>`;

const PILL_HTML = `
    <!-- Elite Conversion Pill -->
    <div class="conversion-pill open-enquiry-modal" id="callback-pill">
        <div class="pill-icon">📞</div>
        <div class="pill-text">Request Callback</div>
    </div>
    <link rel="stylesheet" href="/conversion-pill.css">`;

const MASTER_PLAN_HTML = `
    <!-- Premium Master Plan Modal -->
    <div class="master-plan-modal" id="master-plan-modal" aria-hidden="true" style="position: fixed; inset: 0; z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <div class="modal-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);"></div>
        <div class="modal-container" style="position: relative; background: #ffffff; width: 100%; max-width: 1050px; display: grid; grid-template-columns: 1.1fr 1fr; border-radius: 24px; overflow: hidden; box-shadow: 0 50px 120px rgba(0,0,0,0.5); border: none;">
            <button id="master-plan-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: #f5f5f0; border: none; color: #000; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; opacity: 0.6;">&times;</button>
            <div class="modal-visual" style="position: relative; background: #1a1a1a; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <img src="/images/master-plan.jpg" alt="Master Plan" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;">
            </div>
            <div class="modal-form-side" style="padding: 5rem 4.5rem; background: #ffffff;">
                <div class="form-header" style="margin-bottom: 3rem;">
                    <div style="display: inline-block; background: rgba(107,13,13,0.06); border: 1px solid rgba(107,13,13,0.15); padding: 0.4rem 1.2rem; border-radius: 50px; margin-bottom: 1.5rem;">
                        <span style="color: var(--pscl-maroon); font-weight: 800; font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase;">✦ Verification Required</span>
                    </div>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a1a1a; line-height: 1.2;">Secure High-Res <i style="color: var(--pscl-gold);">Blueprint</i></h3>
                </div>
                <form id="master-plan-form" method="POST" action="https://formsubmit.co/propsmartrealty@gmail.com" style="display: flex; flex-direction: column; gap: 1.4rem;">
                    <input type="hidden" name="_next" value="https://paranjape-mistygreens.in/thank-you.html">
                    <input type="hidden" name="_captcha" value="false">
                    <style>.mp-input-premium { width: 100%; padding: 1.2rem 1.5rem; background: #f8f8f4; border: 1px solid #e5e5e0; border-radius: 12px; font-size: 0.9rem; outline: none; } .mp-submit-btn { width: 100%; padding: 1.5rem; background: #1a1a1a; color: #fff; border: none; border-radius: 12px; font-weight: 800; font-size: 0.9rem; letter-spacing: 0.2rem; text-transform: uppercase; cursor: pointer; }</style>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <input type="text" name="name" placeholder="FULL NAME *" required class="mp-input-premium">
                        <input type="tel" name="phone" placeholder="MOBILE NUMBER *" required class="mp-input-premium">
                    </div>
                    <input type="email" name="email" placeholder="EMAIL ADDRESS *" required class="mp-input-premium">
                    <button type="submit" class="mp-submit-btn">Download Blueprint</button>
                    <input type="hidden" name="source" value="Premium Master Plan Modal">
                </form>
            </div>
        </div>
    </div>`;

const crossLinkFooter = `
    <!-- Internal Linking Mesh -->
    <section style="background: #0a0a0a; padding: 4rem 0; border-top: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <h4 style="color: var(--pscl-gold); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 2rem; text-align: center;">EXPLORE FOREST TRAILS</h4>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; text-align: center;">
                <a href="/na-bungalow-plots-bhugaon/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px;">NA Bungalow Plots</a>
                <a href="/luxury-forest-villas-bhugaon/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px;">Luxury Villas</a>
                <a href="/premium-apartments-forest-trails/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px;">Premium Apartments</a>
                <a href="/clusters-apartments.html" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px;">Apartment Clusters</a>
                <a href="/clusters-villas.html" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px;">Villa Clusters</a>
            </div>
        </div>
    </section>`;

const pages = [
    {
        dir: 'codename-alpha-apartments-bhugaon',
        title: 'Codename Alpha | 1 BHK Premium Apartments at Forest Trails Bhugaon',
        desc: "Discover Codename Alpha at Paranjape Forest Trails. Premium 1 BHK apartments in Bhugaon offering majestic views and access to world-class township amenities.",
        keywords: 'codename alpha bhugaon, 1 bhk flats bhugaon, 1 bhk apartments forest trails, paranjape 1 bhk pune, alpha tower forest trails',
        h1: 'Codename <i>Alpha</i>.',
        subtitle: 'The Perfect Entry to Sovereign 190-Acre Township Living. Premium 1 BHK Residences.',
        intro: "Codename Alpha presents a unique opportunity to own a premium 1 BHK apartment within Pune's most sought-after 190-acre integrated township. Designed for modern professionals and small families, Alpha offers smart spatial design, verdant views, and unrestricted access to the holistic Forest Trails lifestyle—a rare luxury for 1 BHK configurations in Pune West.",
        bgImage: '/images/hero.jpg',
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
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Core Benefit</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600; margin-top: 0.5rem;">High ROI Potential</p>
                </div>
            </div>
            <div style="margin-top: 3rem; background: #fff; padding: 3rem; border-left: 4px solid var(--pscl-maroon); border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <h3 style="color: var(--pscl-dark); font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem;">Why Choose Alpha?</h3>
                <p style="color: #444; line-height: 1.6; font-size: 1.1rem;">While most 1 BHK projects limit your lifestyle to a standalone building, Alpha integrates you into an ecosystem. You gain access to The Cliff Club, an Equestrian Academy, 30,000+ trees, and the vast open spaces of Forest Trails. It's the ultimate gateway property for investors and end-users alike.</p>
            </div>
        `,
        faqs: [
            { q: 'Is Codename Alpha purely 1 BHKs?', a: 'Yes, Codename Alpha is an exclusive tower dedicated entirely to masterfully planned 1 BHK apartments, maximizing ventilation and natural light.' },
            { q: 'Do Alpha residents get access to all township facilities?', a: 'Absolutely. Residents of Alpha enjoy the exact same access to the 190-acre Forest Trails ecosystem as villa owners.' }
        ]
    },
    {
        dir: 'highgardens-apartments-bhugaon',
        title: 'Highgardens | 2 BHK Premium Apartments at Forest Trails Bhugaon',
        desc: 'Explore Highgardens 2 BHK apartments at Paranjape Forest Trails, Bhugaon. Spacious flats over 1.78 acres offering 16 floors of elevated green living.',
        keywords: 'highgardens bhugaon, 2 bhk flats bhugaon, 2 bhk apartments forest trails, highgardens paranjape schemes',
        h1: '<i>Highgardens</i>.',
        subtitle: 'Elevated 2 BHK Living amidst 190 Acres of Pristine Nature.',
        intro: 'Highgardens redefines 2 BHK living in West Pune. Nestled within an exclusive 1.78-acre enclave in the Forest Trails township, these twin 16-story towers offer 176 carefully curated premium residences. Designed to bring the outdoors in, every apartment ensures sweeping views of the verdant Bhugaon valley.',
        bgImage: '/images/landscape.jpg',
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">2 BHK Apartments</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Structure</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">2 Towers / 16 Floors</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">RERA</h4>
                    <p style="color: #fff; font-size: 1.1rem; font-weight: 600; margin-top: 0.8rem;">P52100053310</p>
                </div>
            </div>
            <div style="margin-top: 3rem; background: #fff; padding: 3rem; border-left: 4px solid var(--pscl-gold); border-radius: 8px;">
                <h3 style="color: var(--pscl-dark); font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem;">The Highgardens Edge</h3>
                <p style="color: #444; line-height: 1.6; font-size: 1.1rem;">Highgardens is designed for the modern family that demands more. From zero dead-space layouts to expansive living rooms that merge with large decks, every inch of your 2 BHK is optimized for luxury and comfort.</p>
            </div>
        `,
        faqs: [
            { q: 'How many units are there in Highgardens?', a: 'Highgardens is a highly exclusive cluster featuring only 176 units thoughtfully spread across two elegantly designed 16-floor towers.' },
            { q: 'What is the RERA status of Highgardens?', a: 'Highgardens is a fully RERA-compliant project under Maharashtra RERA. Its registration number is P52100053310.' }
        ]
    },
    {
        dir: 'canopy-apartments-bhugaon',
        title: 'Canopy | 3 BHK Luxury Apartments at Forest Trails Bhugaon',
        desc: 'Paranjape Forest Trails introduces Canopy: Luxury 3 BHK apartments in Bhugaon. Experience G+19 floors of elite architecture and unparalleled views.',
        keywords: 'canopy bhugaon, 3 bhk flats bhugaon, canopy forest trails, 3 bhk apartments paranjape schemes',
        h1: '<i>Canopy</i>.',
        subtitle: 'The Crown Jewel of 3 BHK Luxury Living in West Pune.',
        intro: 'Rising 19 floors above the Sahyadri foothills, Canopy is a statement of architectural brilliance within the Forest Trails township. Housing exclusively grand 3 BHK luxury apartments, Canopy is meant for those who seek expansive living spaces, cross-ventilation, and unobstructed vistas of the 190-acre green canopy below.',
        bgImage: '/images/hero.jpg',
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-gold);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">3 BHK Spacious</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Elevation</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">G + 19 Floors</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Vantage</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">Panoramic</p>
                </div>
            </div>
            <p style="margin-top: 2rem; font-size: 1.1rem; color: #444;">Enjoy bespoke layouts designed to maximize privacy, with no common sharing walls between major bedrooms, and massive sundecks that redefine indoor-outdoor living.</p>
        `,
        faqs: [
            { q: 'Is Canopy a standalone project?', a: 'No, Canopy is an integral cluster within the massive 190-acre Paranjape Forest Trails township, sharing the same grand entrance, security, and amenities like The Cliff Club.' }
        ]
    },
    {
        dir: 'the-highlands-forest-trails',
        title: 'The Highlands | Premium 2 & 3 BHK Flats & Bungalows in Bhugaon',
        desc: 'The Highlands at Forest Trails offers a magnificent mix of 2 & 3 BHK apartments and 3 BHK bungalows across 7.72 acres. Elite township living in Pune.',
        keywords: 'the highlands bhugaon, the highlands forest trails, 3 bhk bungalows pune, 2 bhk flats the highlands',
        h1: 'The <i>Highlands</i>.',
        subtitle: 'A 7.72-Acre Masterpiece. Apartments and Premium Bungalows.',
        intro: 'The Highlands is a unique, self-sustaining community within Forest Trails. Spanning 7.72 acres and comprising 11 majestic 17-story towers alongside magnificent 3 BHK independent bungalows, this cluster offers unparalleled variety. With 873 highly coveted units, The Highlands represents a thriving, diverse neighborhood wrapped in absolute luxury.',
        bgImage: '/images/landscape.jpg',
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Project Spread</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">7.72 Acres</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Inventory Type</h4>
                    <p style="color: #fff; font-size: 1.2rem; font-weight: 600; margin-top:0.8rem;">2/3 BHK & Bungalows</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Total Scale</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">11 Towers / 873 Units</p>
                </div>
            </div>
            <div style="margin-top: 3rem; background: #fff; padding: 3rem; border-left: 4px solid var(--pscl-maroon); border-radius: 8px;">
                <h3 style="color: var(--pscl-dark); font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem;">Community Dynamics</h3>
                <p style="color: #444; line-height: 1.6; font-size: 1.1rem;">Whether you prefer the elevated views of a 17th-floor apartment or the sovereign freedom of an independent 3 BHK bungalow with a private garden, The Highlands offers a bespoke lifestyle matched with Paranjape's uncompromising quality.</p>
            </div>
        `,
        faqs: [
            { q: 'Does The Highlands have both flats and bungalows?', a: 'Yes, The Highlands is a mixed-typology cluster featuring high-rise 2 & 3 BHK apartments as well as exclusive 3 BHK bungalows.' }
        ]
    },
    {
        dir: 'pebbles-apartments-bhugaon',
        title: 'Pebbles | Ready-to-Move 1 BHK Apartments at Forest Trails',
        desc: 'Move in immediately. Pebbles offers premium ready-to-move 1 BHK apartments across two 11-floor towers within Paranjape Forest Trails.',
        keywords: 'pebbles forest trails, ready to move 1 bhk bhugaon, ready possession flats pune, paranjape ready flats',
        h1: '<i>Pebbles</i>.',
        subtitle: 'Ready-to-Move. Zero Wait Time. 1 BHK Premium Living.',
        intro: 'For those who want to instantly immerse themselves in the Forest Trails lifestyle, Pebbles is the answer. This ready-to-move housing society features two beautifully constructed 11-floor towers encompassing 280 units of premium 1 BHK apartments. Start your sovereign township life today, without the uncertainty of construction delays.',
        bgImage: '/images/hero.jpg',
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-gold);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Status</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">Ready-to-Move</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">1 BHK</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Scale</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">2 Towers / 280 Units</p>
                </div>
            </div>
            <p style="margin-top: 2rem; font-size: 1.1rem; color: #444;">Pebbles gives you immediate access to the 190-acre township ecosystem. Why wait to experience 30,000+ trees, 40+ amenities, and the serene lakeside when your keys are ready today?</p>
        `,
        faqs: [
            { q: 'Is Pebbles fully constructed?', a: 'Yes, Pebbles is a ready-to-move-in project. You can purchase and immediately shift in to enjoy the Forest Trails lifestyle.' }
        ]
    },
    {
        dir: 'atmos-smart-homes-bhugaon',
        title: 'Atmos | 3 BHK Ultra-Spacious Smart Homes at Forest Trails',
        desc: 'New Launch! Atmos presents ultra-spacious 3 BHK smart homes at Paranjape Forest Trails, Bhugaon. Automated luxury living exceeding 1,300 sq.ft.',
        keywords: 'atmos forest trails, 3 bhk smart homes bhugaon, paranjape new launch, ultra spacious flats pune',
        h1: '<i>Atmos</i>.',
        subtitle: 'The New Benchmark: 3 BHK Ultra-Spacious Smart Homes.',
        intro: "Presenting Atmos, the newest architectural marvel at Forest Trails. Built for the tech-savvy elite, Atmos features ultra-spacious 3 BHK layouts (exceeding 1,300 sq.ft) with fully integrated home automation. It's not just a residence; it's a highly intuitive, expansive sanctuary that responds to your every command.",
        bgImage: '/images/lifestyle.jpg',
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-gold);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Technology</h4>
                    <p style="color: #fff; font-size: 1.3rem; font-weight: 600; margin-top:0.5rem;">Fully Integrated Smart Home</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Space</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">1,300+ sq.ft</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Status</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">New Launch</p>
                </div>
            </div>
        `,
        faqs: [
            { q: 'What makes Atmos a "Smart Home"?', a: 'Atmos incorporates cutting-edge home automation, allowing you to control lighting, climate, and security via your smartphone or voice commands for unparalleled convenience.' }
        ]
    },
    {
        dir: 'the-cove-villas-bhugaon',
        title: 'The Cove | 4 BHK Luxury Duet Villas at Forest Trails',
        desc: 'Discover The Cove at Forest Trails. An exclusive 9-acre enclave of 85 luxury 4 BHK duet villas with private gardens in Bhugaon, Pune.',
        keywords: 'the cove forest trails, 4 bhk villas bhugaon, duet villas pune, paranjape luxury villas',
        h1: 'The <i>Cove</i>.',
        subtitle: '4 BHK Independent Duet Villas. An Elite 9-Acre Enclave.',
        intro: "The Cove is an expression of supreme luxury. Featuring 85 magnificent 4 BHK duet villas spread across 9 exclusive acres, this is Forest Trails' most secluded and premium villa offering. Featuring modern architectural facades, vast private gardens, and massive terrace spaces, The Cove is built for those who demand ultimate privacy without isolating themselves from community.",
        bgImage: '/images/plots.jpg',
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-maroon);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">4 BHK Duet Villas</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Exclusivity</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">Only 85 Units / 9 Acres</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">RERA</h4>
                    <p style="color: #fff; font-size: 1.2rem; font-weight: 600; margin-top: 0.8rem;">P52100048536</p>
                </div>
            </div>
            <div style="margin-top: 3rem; background: #fff; padding: 3rem; border-left: 4px solid var(--pscl-gold); border-radius: 8px;">
                <h3 style="color: var(--pscl-dark); font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem;">Premium Specifications</h3>
                <p style="color: #444; line-height: 1.6; font-size: 1.1rem;">From imported marble flooring to bespoke customization options, The Cove allows you to tailor your villa. Step out into your private garden for morning tea, or host starlight dinners on your expansive terrace.</p>
            </div>
        `,
        faqs: [
            { q: 'What is a "Duet Villa"?', a: 'A duet villa (or twin bungalow) shares a single structure wall with its neighbor but maintains completely independent entrances, gardens, and vast private layouts on all other sides.' },
            { q: 'When is possession for The Cove?', a: 'The Cove is currently under rapid construction with anticipated phase-wise possession scheduled between late 2026 and 2028.' }
        ]
    },
    {
        dir: 'athashri-senior-living-bhugaon',
        title: "Athashri | Premium Senior Living at Forest Trails Bhugaon",
        desc: "Athashri at Forest Trails is India's premier senior living community. Purpose-built 1 & 2 BHK homes offering dignity, healthcare, and a joyful lifestyle.",
        keywords: 'athashri forest trails, athashri bhugaon, senior living pune, retirement homes bhugaon, paranjape senior living',
        h1: '<i>Athashri</i>.',
        subtitle: 'The Platinum Standard in Purpose-Built Senior Living.',
        intro: "Athashri is Paranjape Schemes' flagship, award-winning senior living concept, beautifully woven into the Forest Trails township. Spanning phases like Valley, Ananda, B2, and B3, Athashri offers highly specialized 1 & 2 BHK apartments designed for safety, dignity, and joy. It is not an old-age home; it is an active, vibrant community for the silver generation.",
        bgImage: '/images/lifestyle.jpg',
        tableHtml: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--pscl-gold);">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Typology</h4>
                    <p style="color: #fff; font-size: 1.5rem; font-weight: 600;">1 & 2 BHK Specialized</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Healthcare</h4>
                    <p style="color: #fff; font-size: 1.3rem; font-weight: 600; margin-top:0.5rem;">24/7 Medical Access</p>
                </div>
                <div style="background: var(--pscl-dark); padding: 2rem; border-radius: 12px; text-align: center;">
                    <h4 style="color: var(--pscl-gold); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;">Services</h4>
                    <p style="color: #fff; font-size: 1.2rem; font-weight: 600; margin-top:0.8rem;">Dining, Security, Manager</p>
                </div>
            </div>
            <div style="margin-top: 3rem; background: #fff; padding: 3rem; border-left: 4px solid var(--pscl-maroon); border-radius: 8px;">
                <h3 style="color: var(--pscl-dark); font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem;">Life at Athashri</h3>
                <p style="color: #444; line-height: 1.6; font-size: 1.1rem;">Every apartment features anti-skid flooring, grab bars, emergency pull cords, and wheelchair accessibility. With a dedicated resident manager, centralized dining halls serving nutritious meals, and regular community events, residents enjoy an independent, incredibly fulfilling lifestyle.</p>
            </div>
        `,
        faqs: [
            { q: 'Is Athashri only for senior citizens?', a: 'Yes, residency in Athashri requires at least one occupant to be a senior citizen (typically 55+ years of age) to maintain the integrity and focus of the community.' },
            { q: 'Are medical facilities available at Athashri?', a: 'Yes, Athashri is equipped with emergency response systems, ambulance tie-ups, doctor-on-call facilities, and immediate first-aid capabilities.' }
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    
    <title>${page.title}</title>
    <meta name="description" content="${page.desc}">
    <meta name="keywords" content="${page.keywords}">
    <link rel="canonical" href="${SITE}/${page.dir}/">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style.css?v=${VERSION}">

    <!-- BreadcrumbList Schema -->
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
    
    <!-- FAQPage Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
${faqEntries}
        ]
    }
    </script>
</head>
<body style="background:var(--pscl-bg);">
    ${NAVBAR_HTML}
    <main>
        <section class="hero-section" style="height: 60vh; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000;">
            <div class="hero-bg" style="position: absolute; inset: 0; background-image: url('${page.bgImage}'); background-size: cover; background-position: center; opacity: 0.6;"></div>
            <div class="container" style="position: relative; z-index: 2; text-align: center;">
                <h1 style="color: #fff; font-family: 'Playfair Display', serif; font-size: 1.5rem; letter-spacing: 0.5rem; text-transform: uppercase; margin-bottom: 1rem;">Cluster Spotlight</h1>
                <h2 style="color: #fff; font-family: 'Playfair Display', serif; font-size: 4.5rem; line-height: 1.1; margin-bottom: 1.5rem;">${page.h1}</h2>
                <p style="color: var(--pscl-gold); font-size: 1.2rem; letter-spacing: 0.1em; text-transform: uppercase;">${page.subtitle}</p>
            </div>
        </section>

        <section class="section" style="background: #fafafa; padding: 6rem 0;">
            <div class="container">
                <div style="max-width: 900px; margin: 0 auto;">
                    <p style="font-size: 1.25rem; line-height: 1.8; color: #444; border-left: 4px solid var(--pscl-gold); padding-left: 2rem; margin-bottom: 3rem;">
                        ${page.intro}
                    </p>
                    
                    ${page.tableHtml}

                    <div style="text-align: center; margin-top: 5rem;">
                        <button class="open-enquiry-modal btn-primary" style="padding: 1.5rem 3.5rem; font-size: 1rem; border-radius: 50px; font-weight: 800; cursor: pointer;">ENQUIRE & REQUEST BROCHURE</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    ${crossLinkFooter}

    <footer class="footer-main" style="background: #000; padding: 5rem 0; text-align: center;">
        <div class="container">
            <a href="/" style="color: #fff; text-decoration: none; font-weight: 800; letter-spacing: 0.2em; border: 1px solid rgba(255,255,255,0.2); padding: 1rem 2.5rem; border-radius: 50px;">RETURN TO MAIN SITE</a>
            <p style="margin-top: 3rem; color: rgba(255,255,255,0.4); font-size: 0.8rem;">&copy; 2026 Paranjape Schemes (Construction) Ltd. All Rights Reserved.</p>
        </div>
    </footer>

    ${MODAL_HTML}
    ${MASTER_PLAN_HTML}
    ${PILL_HTML}

    <!-- Scripts -->
    <script src="/script.js?v=${VERSION}"></script>
</body>
</html>`;
}

for (const page of pages) {
    const dirPath = path.join(BASE, page.dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const html = generateHTML(page);
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf-8');
    console.log(`✅ Created Cluster Page: ${page.dir}/index.html`);
}

console.log('\n🎯 Successfully generated 8 New Cluster pages.');
