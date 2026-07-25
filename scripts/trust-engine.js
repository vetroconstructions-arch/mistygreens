/**
 * Sovereign Trust Engine (Phase 14.1 & 14.2)
 */
class SovereignTrustEngine {
    constructor() {
        this.initScroller();
        // Disabled toast activity manager as requested
        // this.initActivityManager();
    }

    initScroller() {
        const scroller = document.querySelector('.trust-scroller-wrap');
        if (!scroller) return;

        // Duplicate items for infinite loop
        const content = scroller.innerHTML;
        scroller.innerHTML = content + content;

        gsap.to(scroller, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
            onHover: () => gsap.to(scroller, { timeScale: 0.2 }),
            onLeave: () => gsap.to(scroller, { timeScale: 1 })
        });
    }

    initActivityManager() {
        const activities = [
            "5 visitors are exploring Misty Greens right now",
            "Last site visit scheduled for The Highlands 40 mins ago",
            "2 brochure downloads in the last hour",
            "Misty Greens Plot #42 just moved to 'Limited Inventory'",
            "12 families joined the Forest Trails community this month"
        ];

        const toast = document.createElement('div');
        toast.id = 'sovereign-activity-toast';
        toast.innerHTML = `<span style="font-size:1.2rem">🔥</span> <span id="activity-text"></span>`;
        document.body.appendChild(toast);

        let index = 0;
        const showActivity = () => {
            document.getElementById('activity-text').innerText = activities[index];
            toast.classList.add('active');
            
            setTimeout(() => {
                toast.classList.remove('active');
                index = (index + 1) % activities.length;
                setTimeout(showActivity, 15000 + Math.random() * 10000);
            }, 5000);
        };

        // Start after initial delay
        setTimeout(showActivity, 8000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SovereignTrustEngine();
});
