/**
 * Sovereign Global Search Manager (Phase 16.3)
 * Unified interface for navigating the 190-acre Forest Trails ecosystem.
 */
class SovereignSearchManager {
    constructor() {
        this.data = [
            { name: "Misty Greens Plots", category: "Plots", url: "/misty-greens-plots-pune/", keywords: "na bungalow plots, land, investment" },
            { name: "The Cove", category: "Villas", url: "/the-cove-villas-bhugaon/", keywords: "villas, independent homes, duet" },
            { name: "The Highlands", category: "Apartments", url: "/the-highlands-forest-trails/", keywords: "luxury flats, 2bhk, 3bhk" },
            { name: "SSRVM School", category: "Liefstyle", url: "/amenities-sri-sri-school.html", keywords: "school, education, kids" },
            { name: "The Cliff Club", category: "Amenities", url: "/amenities-the-cliff-club.html", keywords: "clubhouse, gym, pool, dinner" },
            { name: "Equestrian Academy", category: "Equestrian", url: "/amenities-equestrian.html", keywords: "horses, riding, hobby" }
        ];
        this.init();
    }

    init() {
        this.createOverlay();
        this.bindEvents();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'sovereign-search-overlay';
        overlay.innerHTML = `
            <div class="search-wrap" style="position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 10002; display: none; flex-direction: column; align-items: center; padding: 100px 20px; color: #fff; backdrop-filter: blur(20px);">
                <button class="search-close" style="position: absolute; top: 40px; right: 40px; background: none; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 2rem; cursor: pointer; width: 60px; height: 60px; border-radius: 50%;">&times;</button>
                <div style="width: 100%; max-width: 800px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--pscl-gold); letter-spacing: 0.4em; display: block; margin-bottom: 20px; text-align: center;">GLOBAL ECOSYSTEM SEARCH</span>
                    <input type="text" id="sovereign-search-input" placeholder="Type to explore... (Villas, Plots, Schools)" style="width: 100%; background: none; border: none; border-bottom: 2px solid var(--pscl-gold); font-size: 3rem; color: #fff; outline: none; padding: 20px 0; font-family: 'Playfair Display', serif;">
                    <div id="search-results" style="margin-top: 50px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    bindEvents() {
        const input = document.getElementById('sovereign-search-input');
        const triggers = document.querySelectorAll('.open-global-search');
        const wrap = document.querySelector('#sovereign-search-overlay .search-wrap');
        const close = document.querySelector('.search-close');

        triggers.forEach(t => t.addEventListener('click', (e) => {
            e.preventDefault();
            wrap.style.display = 'flex';
            input.focus();
            if (typeof gsap !== 'undefined') {
                gsap.from(wrap.querySelector('.search-wrap > div'), { y: 20, opacity: 0, duration: 0.5 });
            }
        }));

        close.addEventListener('click', () => wrap.style.display = 'none');

        input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    handleSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
        if (query.length < 2) return;

        const filtered = this.data.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) || 
            item.keywords.toLowerCase().includes(query.toLowerCase())
        );

        filtered.forEach(item => {
            const card = document.createElement('a');
            card.href = item.url;
            card.style.textDecoration = 'none';
            card.innerHTML = `
                <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s;">
                    <span style="font-size: 0.6rem; font-weight: 800; color: var(--pscl-gold); display: block; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.2em;">${item.category}</span>
                    <h4 style="color: #fff; font-size: 1.25rem; margin: 0;">${item.name}</h4>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.SearchHandler = new SovereignSearchManager();
});
