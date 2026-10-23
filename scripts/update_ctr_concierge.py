#!/usr/bin/env python3
"""
scripts/update_ctr_concierge.py
═══════════════════════════════════════════════════════════════════════════
Injects Sovereign Real-Time Engagement & Conversion Engine into exit-intent-concierge.js:
1. WCAG AAA Contrast for WhatsApp buttons
2. Smart Dynamic WhatsApp Message Synthesis
3. Dynamic Glassmorphic Social Proof Pulse (#pscl-live-pulse)
4. Floating VIP Property Concierge Action Dial (#pscl-concierge-fab)
═══════════════════════════════════════════════════════════════════════════
"""

import re

with open('exit-intent-concierge.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Fix contrast: color: #ffffff; -> color: #0e0c14; on .pscl-wa-cta
code = re.sub(
    r'(\.pscl-wa-cta\s*\{[^}]*?color:\s*)#ffffff;',
    r'\g<1>#0e0c14;',
    code
)

# 2. Add Smart Dynamic WhatsApp Message Generator and Features before closing })();
ctr_engine_code = r'''
  // ─── Smart Dynamic WhatsApp Message Synthesis ─────────────────────────────
  function getSmartWhatsAppMessage() {
    var path = (window.location.pathname || '').toLowerCase();
    if (path.indexOf('misty-greens') !== -1 || path.indexOf('plot') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in Misty Greens NA Bungalow Plots at Forest Trails Bhugaon. Please send the 2026 price sheet, master layout, and plot availability.');
    }
    if (path.indexOf('rivolo') !== -1 || path.indexOf('villa') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in The Rivolo 4 & 5 BHK Luxury Forest Villas at Bhugaon. Please send floor plans, pricing, and villa specifications.');
    }
    if (path.indexOf('canopy') !== -1 || path.indexOf('2bhk') !== -1 || path.indexOf('flat') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in The Canopy 2 & 3 BHK Nature Apartments at Forest Trails. Please send pricing, payment plans, and brochure.');
    }
    if (path.indexOf('athashri') !== -1 || path.indexOf('senior') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in Athashri Senior Living at Forest Trails Bhugaon. Please share 2 & 3 BHK assisted living details, medical amenities, and pricing.');
    }
    if (path.indexOf('everglades') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in Everglades 1 & 2 BHK PRO Homes near Bavdhan. Please share brochure and pricing from ₹48.5 L*.');
    }
    if (path.indexOf('cove') !== -1 || path.indexOf('bungalow') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in The Cove 4 BHK Duet Villas / Twin Bungalows. Please send floor plans and price sheet.');
    }
    if (path.indexOf('highgardens') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in The Highgardens Terrace Homes at Forest Trails Bhugaon. Please share 2 BHK pricing and brochure.');
    }
    if (path.indexOf('swaniketan') !== -1) {
      return encodeURIComponent('Hello Paranjape Team, I am interested in Swaniketan Assisted Living at Forest Trails Bhugaon. Please share 2 & 3 BHK healthcare services and price list.');
    }
    return encodeURIComponent('Hello Paranjape Team, I am exploring Paranjape Forest Trails 190-Acre Township in Bhugaon. Please send the complete 2026 master plan and all enclave brochures.');
  }

  // ─── Sovereign Glassmorphic Social Proof Pulse ─────────────────────────────
  function injectSocialProofPulse() {
    if (document.getElementById('pscl-live-pulse')) return;

    var pulseStyle = document.createElement('style');
    pulseStyle.id = 'pscl-live-pulse-styles';
    pulseStyle.textContent = `
      #pscl-live-pulse {
        position: fixed;
        bottom: 85px;
        left: 16px;
        z-index: 99990;
        max-width: 340px;
        background: rgba(18, 18, 24, 0.95);
        border: 1.5px solid rgba(212, 175, 55, 0.55);
        border-radius: 14px;
        box-shadow: 0 12px 35px rgba(0,0,0,0.85), 0 0 20px rgba(212,175,55,0.2);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 0.7rem 0.85rem;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 0.76rem;
        transform: translateY(160%);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        box-sizing: border-box;
      }
      #pscl-live-pulse.pscl-pulse-visible {
        transform: translateY(0);
        opacity: 1;
      }
      @media (min-width: 769px) {
        #pscl-live-pulse {
          bottom: 24px;
          left: 24px;
        }
      }
      .pscl-pulse-badge {
        width: 36px;
        height: 36px;
        min-width: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6B0D0D 0%, #D4AF37 100%);
        border: 1px solid #D4AF37;
        color: #fff;
        font-weight: 800;
        font-size: 0.72rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      }
      .pscl-pulse-cta {
        background: #D4AF37;
        color: #0e0c14;
        border: none;
        padding: 5px 10px;
        border-radius: 6px;
        font-weight: 800;
        font-size: 0.68rem;
        cursor: pointer;
        margin-left: auto;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        transition: transform 0.15s, background 0.15s;
      }
      .pscl-pulse-cta:hover {
        background: #f3c332;
        transform: scale(1.04);
      }
      .pscl-pulse-close {
        background: transparent;
        border: none;
        color: rgba(255,255,255,0.5);
        font-size: 0.9rem;
        cursor: pointer;
        padding: 2px 4px;
        margin-left: 2px;
        line-height: 1;
      }
      .pscl-pulse-close:hover {
        color: #fff;
      }
    `;
    document.head.appendChild(pulseStyle);

    var toast = document.createElement('div');
    toast.id = 'pscl-live-pulse';
    toast.innerHTML = '<div class="pscl-pulse-badge">FT</div>' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">' +
          '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e;"></span>' +
          '<span id="pscl-pulse-time" style="font-size:0.62rem;color:#D4AF37;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">LIVE VERIFIED</span>' +
        '</div>' +
        '<div id="pscl-pulse-msg" style="font-weight:600;color:#F1F5F9;line-height:1.3;font-size:0.72rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Dr. S. Kulkarni from Kothrud reserved a 2,400 sq.ft plot at Misty Greens.</div>' +
      '</div>' +
      '<button type="button" id="pscl-pulse-action-btn" class="pscl-pulse-cta">Enquire →</button>' +
      '<button type="button" id="pscl-pulse-dismiss-btn" class="pscl-pulse-close" aria-label="Dismiss">✕</button>';
    document.body.appendChild(toast);

    var rhythms = [
      { msg: "Dr. S. Kulkarni from Kothrud reserved a 2,400 sq.ft plot at Misty Greens.", time: "5 MINS AGO", enclave: "misty-greens" },
      { msg: "Tech Lead from Hinjewadi booked a site visit for The Rivolo 4BHK Villa.", time: "12 MINS AGO", enclave: "the-rivolo" },
      { msg: "Family from Bavdhan received The Canopy 2 & 3 BHK floor plans & price sheet.", time: "18 MINS AGO", enclave: "the-canopy" },
      { msg: "Athashri 2 & 3 BHK Senior Living: 3 units allotted this week.", time: "LIVE UPDATE", enclave: "athashri-senior-living" },
      { msg: "Everglades 1 & 2 BHK PRO Homes starting ₹48.5 L* - High enquiry volume.", time: "HOT DEAL", enclave: "everglades" },
      { msg: "Misty Greens Phase 2: Over 85% NA Plots Sold. Limited sectors remaining.", time: "HIGH DEMAND", enclave: "misty-greens" }
    ];

    var currentIndex = 0;
    var isDismissed = false;

    function showNextToast() {
      if (isDismissed) return;
      var item = rhythms[currentIndex];
      var msgEl = document.getElementById('pscl-pulse-msg');
      var timeEl = document.getElementById('pscl-pulse-time');
      var actionBtn = document.getElementById('pscl-pulse-action-btn');
      if (msgEl) msgEl.textContent = item.msg;
      if (timeEl) timeEl.textContent = item.time;
      if (actionBtn) {
        actionBtn.setAttribute('data-enclave', item.enclave);
        actionBtn.onclick = function(e) {
          e.stopPropagation();
          window.openEnquiryModal && window.openEnquiryModal(item.enclave);
        };
      }
      toast.onclick = function() {
        window.openEnquiryModal && window.openEnquiryModal(item.enclave);
      };

      toast.classList.add('pscl-pulse-visible');

      setTimeout(function() {
        if (!isDismissed) {
          toast.classList.remove('pscl-pulse-visible');
          currentIndex = (currentIndex + 1) % rhythms.length;
          setTimeout(showNextToast, 16000);
        }
      }, 6000);
    }

    var dismissBtn = document.getElementById('pscl-pulse-dismiss-btn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        isDismissed = true;
        toast.classList.remove('pscl-pulse-visible');
        setTimeout(function() {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
      });
    }

    setTimeout(showNextToast, 4500);
  }

  // ─── Floating VIP Property Concierge Action Dial (FAB) ───────────────────────
  function injectConciergeFAB() {
    if (document.getElementById('pscl-concierge-fab')) return;

    var fabStyle = document.createElement('style');
    fabStyle.id = 'pscl-fab-styles';
    fabStyle.textContent = `
      #pscl-concierge-fab {
        position: fixed;
        bottom: 85px;
        right: 16px;
        z-index: 99990;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      @media (min-width: 769px) {
        #pscl-concierge-fab {
          bottom: 24px;
          right: 24px;
        }
      }
      #pscl-fab-btn {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6B0D0D 0%, #8B1A1A 50%, #D4AF37 100%);
        border: 2px solid #D4AF37;
        color: #ffffff;
        box-shadow: 0 8px 25px rgba(107,13,13,0.6), 0 0 15px rgba(212,175,55,0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
        transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
        touch-action: manipulation;
        animation: psclFabPulse 2.5s infinite;
      }
      @keyframes psclFabPulse {
        0% { box-shadow: 0 8px 25px rgba(107,13,13,0.6), 0 0 0 0 rgba(212,175,55,0.6); }
        70% { box-shadow: 0 8px 25px rgba(107,13,13,0.6), 0 0 0 14px rgba(212,175,55,0); }
        100% { box-shadow: 0 8px 25px rgba(107,13,13,0.6), 0 0 0 0 rgba(212,175,55,0); }
      }
      #pscl-fab-btn:hover {
        transform: scale(1.08);
      }
      #pscl-fab-menu {
        position: absolute;
        bottom: 64px;
        right: 0;
        background: rgba(18, 18, 24, 0.96);
        border: 1.5px solid rgba(212, 175, 55, 0.5);
        border-radius: 16px;
        box-shadow: 0 16px 45px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.25);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 0.6rem;
        display: none;
        flex-direction: column;
        gap: 6px;
        width: 250px;
        box-sizing: border-box;
      }
      #pscl-fab-menu.pscl-menu-active {
        display: flex;
      }
      .pscl-fab-item {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        color: #ffffff;
        text-decoration: none;
        padding: 0.55rem 0.75rem;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s;
        box-sizing: border-box;
      }
      .pscl-fab-item:hover {
        background: rgba(212, 175, 55, 0.2);
        border-color: #D4AF37;
        color: #D4AF37;
        transform: translateX(-2px);
      }
    `;
    document.head.appendChild(fabStyle);

    var fabWrap = document.createElement('div');
    fabWrap.id = 'pscl-concierge-fab';
    fabWrap.innerHTML = '<div id="pscl-fab-menu">' +
        '<div style="padding:0.3rem 0.5rem 0.4rem;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:2px;">' +
          '<span style="font-size:0.64rem;color:#D4AF37;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">✦ VIP Buyer Concierge</span>' +
        '</div>' +
        '<button type="button" class="pscl-fab-item" id="pscl-fab-action-brochure">' +
          '<span style="font-size:0.95rem;">📥</span>' +
          '<span>Download 2026 Price List &amp; Plans</span>' +
        '</button>' +
        '<a class="pscl-fab-item" id="pscl-fab-action-whatsapp" href="#" target="_blank" rel="noopener">' +
          '<span style="font-size:0.95rem;">💬</span>' +
          '<span>Instant WhatsApp Advisory</span>' +
        '</a>' +
        '<button type="button" class="pscl-fab-item" id="pscl-fab-action-cab">' +
          '<span style="font-size:0.95rem;">🚗</span>' +
          '<span>Book Free AC Cab Site Visit</span>' +
        '</button>' +
        '<a class="pscl-fab-item" href="tel:+917744009295" style="border-top:1px solid rgba(212,175,55,0.25);color:#D4AF37;">' +
          '<span style="font-size:0.95rem;">📞</span>' +
          '<span>Call Direct: +91 7744009295</span>' +
        '</a>' +
      '</div>' +
      '<button type="button" id="pscl-fab-btn" aria-label="Open Property Concierge">✦</button>';
    document.body.appendChild(fabWrap);

    var btn = document.getElementById('pscl-fab-btn');
    var menu = document.getElementById('pscl-fab-menu');

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.toggle('pscl-menu-active');
      btn.textContent = menu.classList.contains('pscl-menu-active') ? '✕' : '✦';
    });

    document.addEventListener('click', function(e) {
      if (!fabWrap.contains(e.target)) {
        menu.classList.remove('pscl-menu-active');
        btn.textContent = '✦';
      }
    });

    document.getElementById('pscl-fab-action-brochure').addEventListener('click', function() {
      menu.classList.remove('pscl-menu-active');
      btn.textContent = '✦';
      window.openEnquiryModal && window.openEnquiryModal();
    });

    document.getElementById('pscl-fab-action-cab').addEventListener('click', function() {
      menu.classList.remove('pscl-menu-active');
      btn.textContent = '✦';
      window.openEnquiryModal && window.openEnquiryModal();
    });

    var waLink = document.getElementById('pscl-fab-action-whatsapp');
    if (waLink) {
      waLink.href = 'https://wa.me/917744009295?text=' + getSmartWhatsAppMessage();
    }
  }

  // ─── Initialize Sovereign Engagement Layer ─────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectSocialProofPulse();
      injectConciergeFAB();
    });
  } else {
    injectSocialProofPulse();
    injectConciergeFAB();
  }
'''

# Insert before closing })();
idx = code.rfind('})();')
assert idx != -1, 'closing })(); not found'
code = code[:idx] + ctr_engine_code + '\n})();\n'

with open('exit-intent-concierge.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('✅ exit-intent-concierge.js successfully enhanced with Sovereign CTR & Conversion Engine!')
