/**
 * Paranjape Forest Trails — Sovereign Exit-Intent & Conversion Concierge v2.0
 * Recovers abandoning high-intent visitors on Desktop (cursor exit) and Mobile (scroll abandonment).
 * Fully integrated with Google Ads Enhanced Conversions (AW-17430583486) & GA4.
 */
(function() {
  'use strict';

  // Do not execute on thank-you pages
  if (window.location.pathname.indexOf('/thank-you') !== -1) return;

  var hasTriggered = false;
  var pageLoadTime = Date.now();
  var minDwellMs = 6000; // Require 6 seconds before trigger

  // Inject Concierge Modal HTML & CSS
  function injectConciergeDOM() {
    if (document.getElementById('pscl-exit-concierge-wrap')) return;

    var style = document.createElement('style');
    style.id = 'pscl-concierge-styles';
    style.textContent = `
      #pscl-exit-concierge-wrap {
        position: fixed;
        inset: 0;
        z-index: 999999;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 1rem;
        box-sizing: border-box;
      }
      #pscl-exit-concierge-wrap.pscl-active {
        display: flex;
        opacity: 1;
      }
      .pscl-concierge-card {
        background: #181822;
        border: 1.5px solid rgba(212, 175, 55, 0.45);
        border-radius: 16px;
        max-width: 480px;
        width: 100%;
        color: #ffffff;
        padding: 1.8rem;
        box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.2);
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        transform: scale(0.95);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #pscl-exit-concierge-wrap.pscl-active .pscl-concierge-card {
        transform: scale(1);
      }
      .pscl-close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.15);
        border: none;
        color: #ffffff;
        width: 48px;
        height: 48px;
        min-width: 48px;
        min-height: 48px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        line-height: 1;
        transition: background 0.2s;
        touch-action: manipulation;
      }
      .pscl-close-btn:hover {
        background: rgba(212, 175, 55, 0.4);
      }
      .pscl-badge {
        display: inline-block;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.1));
        border: 1px solid rgba(212, 175, 55, 0.6);
        color: #D4AF37;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 0.35rem 0.75rem;
        border-radius: 50px;
        margin-bottom: 0.8rem;
      }
      .pscl-title {
        font-size: 1.35rem;
        font-weight: 800;
        color: #ffffff;
        margin: 0 0 0.5rem;
        line-height: 1.3;
      }
      .pscl-title span {
        color: #D4AF37;
      }
      .pscl-desc {
        color: #E2E8F0;
        font-size: 0.86rem;
        line-height: 1.5;
        margin: 0 0 1.25rem;
      }
      .pscl-wa-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #25D366;
        color: #0e0c14;
        text-decoration: none;
        font-weight: 800;
        font-size: 0.92rem;
        padding: 0.85rem 1rem;
        min-height: 48px;
        border-radius: 10px;
        margin-bottom: 1rem;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
        transition: transform 0.2s, background 0.2s;
        touch-action: manipulation;
      }
      .pscl-wa-cta:hover {
        background: #20bd5a;
        transform: translateY(-1px);
      }
      .pscl-divider {
        display: flex;
        align-items: center;
        text-align: center;
        color: #CBD5E1;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin: 0.8rem 0;
      }
      .pscl-divider::before, .pscl-divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      .pscl-divider:not(:empty)::before {
        margin-right: 0.75em;
      }
      .pscl-divider:not(:empty)::after {
        margin-left: 0.75em;
      }
      .pscl-form {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
      }
      .pscl-input {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.4);
        border-radius: 8px;
        padding: 0.7rem 0.9rem;
        color: #ffffff;
        font-size: 0.88rem;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
        width: 100%;
        min-height: 48px;
      }
      .pscl-input::placeholder {
        color: #CBD5E1 !important;
        opacity: 1 !important;
      }
      .pscl-input:focus {
        border-color: #D4AF37;
        background: rgba(255, 255, 255, 0.12);
      }
      .pscl-submit-btn {
        background: linear-gradient(135deg, #D4AF37, #B8860B);
        color: #0e0c14;
        font-weight: 800;
        font-size: 0.9rem;
        padding: 0.8rem;
        min-height: 48px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        touch-action: manipulation;
      }
      .pscl-submit-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
      }
      .pscl-dismiss-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 48px;
        text-align: center;
        color: #CBD5E1;
        font-size: 0.78rem;
        font-weight: 600;
        margin-top: 0.5rem;
        cursor: pointer;
        text-decoration: underline;
        touch-action: manipulation;
      }
      .pscl-dismiss-link:hover {
        color: #FFFFFF;
      }
      .pscl-visually-hidden {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    `;
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.id = 'pscl-exit-concierge-wrap';
    wrap.innerHTML = `
      <div class="pscl-concierge-card" role="dialog" aria-modal="true" aria-labelledby="pscl-card-title">
        <button class="pscl-close-btn" id="pscl-concierge-close" aria-label="Close download dialog" type="button">✕</button>
        <span class="pscl-badge">✦ Direct Developer Desk</span>
        <h3 class="pscl-title" id="pscl-card-title">Before You Go: Download the <span>2026 Price Sheet</span> &amp; Master Plan</h3>
        <p class="pscl-desc">Get the latest MahaRERA approved inventory layout, plot dimension matrix, and bank pre-approved EMI schemes delivered directly.</p>
        
        <a class="pscl-wa-cta" id="pscl-concierge-wa" href="https://wa.me/917744009295?text=Hi%2C%20please%20send%20the%20Official%202026%20Price%20Sheet%20%26%20Master%20Layout%20PDF%20for%20Paranjape%20Forest%20Trails." target="_blank" rel="noopener" aria-label="Download Official 2026 Price Sheet &amp; Master Layout PDF via WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Instant Download via WhatsApp
        </a>

        <div class="pscl-divider">OR REQUEST QUICK CALLBACK</div>

        <form class="pscl-form" id="pscl-exit-form">
          <label for="pscl-exit-name" class="pscl-visually-hidden">Your Full Name</label>
          <input type="text" class="pscl-input" id="pscl-exit-name" name="name" aria-label="Your Full Name" placeholder="Your Name" required />

          <label for="pscl-exit-phone" class="pscl-visually-hidden">Phone Number (10 Digits)</label>
          <input type="tel" class="pscl-input" id="pscl-exit-phone" name="phone" aria-label="Phone Number (10 Digits)" pattern="[0-9]{10}" placeholder="Phone Number (10 Digits) *" required />

          <label for="pscl-exit-preference" class="pscl-visually-hidden">Preferred Enclave or Brochure</label>
          <select class="pscl-input" id="pscl-exit-preference" name="preference" aria-label="Preferred Enclave or Brochure" style="background: #181822;">
            <option value="Misty Greens NA Plots (From ₹1.23 Cr*)">Misty Greens NA Plots (From ₹1.23 Cr*)</option>
            <option value="The Rivolo Luxury Villas (From ₹3.89 Cr*)">The Rivolo Luxury Villas (From ₹3.89 Cr*)</option>
            <option value="The Canopy Apartments (From ₹89 L*)">The Canopy Apartments (From ₹89 L*)</option>
            <option value="General Forest Trails Township Brochure">General Forest Trails Master Brochure</option>
          </select>
          <button type="submit" class="pscl-submit-btn" aria-label="Send My Brochure &amp; Price List">Send My Brochure &amp; Price List →</button>
        </form>

        <span class="pscl-dismiss-link" id="pscl-concierge-skip" role="button" tabindex="0" aria-label="Dismiss and continue browsing">No thanks, I'll continue browsing</span>
      </div>
    `;

    document.body.appendChild(wrap);

    // Event Listeners for Dismissal
    document.getElementById('pscl-concierge-close').addEventListener('click', closeConcierge);
    document.getElementById('pscl-concierge-skip').addEventListener('click', closeConcierge);
    wrap.addEventListener('click', function(e) {
      if (e.target === wrap) closeConcierge();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && wrap.classList.contains('pscl-active')) closeConcierge();
    });

    // WhatsApp Click Tracker
    document.getElementById('pscl-concierge-wa').addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'contact', {
          'method': 'whatsapp',
          'event_category': 'Exit Concierge',
          'event_label': 'WhatsApp PDF Request',
          'value': 1.0,
          'currency': 'INR'
        });
      }
      closeConcierge();
    });

    // Lead Form Submission
    document.getElementById('pscl-exit-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('pscl-exit-name').value.trim();
      var phone = document.getElementById('pscl-exit-phone').value.trim();
      var preference = document.getElementById('pscl-exit-preference').value;
      var leadId = 'EXIT_' + Date.now();

      // Store in sessionStorage for Enhanced Conversions
      try {
        sessionStorage.setItem('pscl_last_lead', JSON.stringify({
          name: name,
          phone: phone,
          email: '',
          preference: preference,
          timestamp: Date.now(),
          transaction_id: leadId
        }));
      } catch(err) {}

      // Fire Enhanced Conversion user_data & conversion event
      if (typeof gtag === 'function') {
        try {
          var cleanPhone = phone.replace(/[^0-9]/g, '');
          if (cleanPhone.length === 10) cleanPhone = '+91' + cleanPhone;
          gtag('set', 'user_data', {
            'phone_number': cleanPhone,
            'address': {
              'first_name': name ? name.split(' ')[0] : undefined,
              'last_name': name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : undefined,
              'country': 'IN'
            }
          });
        } catch(uErr) {}

        // Google Ads Lead Conversion
        gtag('event', 'conversion', {
          'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA',
          'value': 1.0,
          'currency': 'INR',
          'transaction_id': leadId
        });

        // GA4 Lead Event
        gtag('event', 'generate_lead', {
          'event_category': 'Exit Intent Concierge',
          'event_label': preference,
          'value': 1.0,
          'currency': 'INR'
        });
      }

      // Submit lead payload
      var payload = {
        name: name,
        phone: phone,
        email: 'exit-concierge@paranjapetownship.com',
        enclave: preference,
        source_url: window.location.href,
        page_title: document.title,
        timestamp: new Date().toISOString(),
        transaction_id: leadId,
        _subject: 'VIP Lead: Exit Concierge — ' + preference,
        _captcha: 'false'
      };

      // 1. Local Vault
      try {
        sessionStorage.setItem('pscl_last_lead', JSON.stringify(payload));
        localStorage.setItem('pscl_last_lead', JSON.stringify(payload));
        var existing = JSON.parse(localStorage.getItem('pscl_offline_lead_vault') || '[]');
        existing.push(payload);
        localStorage.setItem('pscl_offline_lead_vault', JSON.stringify(existing));
      } catch(err) {}

      // 2. Multi-channel dispatch (Zero Drop Rate Guarantee)
      if (navigator.sendBeacon) {
        try {
          navigator.sendBeacon('/api/lead-capture', JSON.stringify(payload));
        } catch(bErr) {}
      }

      try {
        fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(function() {});
      } catch(fetchErr) {}

      try {
        fetch('/api/lead-capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(function() {});
      } catch(apiErr) {}

      setTimeout(function() {
        window.location.href = '/thank-you/';
      }, 800);
    });
  }

  function triggerConcierge() {
    if (hasTriggered) return;
    if (sessionStorage.getItem('pscl_exit_dismissed') === '1') return;
    if (Date.now() - pageLoadTime < minDwellMs) return;

    hasTriggered = true;
    injectConciergeDOM();
    var wrap = document.getElementById('pscl-exit-concierge-wrap');
    if (wrap) {
      wrap.classList.add('pscl-active');
    }
  }

  function closeConcierge() {
    sessionStorage.setItem('pscl_exit_dismissed', '1');
    var wrap = document.getElementById('pscl-exit-concierge-wrap');
    if (wrap) {
      wrap.classList.remove('pscl-active');
      setTimeout(function() {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      }, 300);
    }
  }

  // Trigger 1: Desktop Mouse Leave (Top Exit)
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 15) {
      triggerConcierge();
    }
  }, { passive: true });

  // Trigger 2: Mobile Scroll Abandonment (>75% scrolled, then idle or rapid scroll back)
  var maxScroll = 0;
  var scrollCheckTimer = null;
  var scrollTicking = false;
  var cachedDocHeight = 0;

  function updateScrollMetrics() {
    scrollTicking = false;
    if (!cachedDocHeight) {
      cachedDocHeight = (document.documentElement.scrollHeight || document.body.scrollHeight || 0) - window.innerHeight;
    }
    if (cachedDocHeight <= 0) return;
    var currentScroll = (window.scrollY / cachedDocHeight) * 100;
    if (currentScroll > maxScroll) maxScroll = currentScroll;

    if (maxScroll > 75 && !hasTriggered) {
      clearTimeout(scrollCheckTimer);
      scrollCheckTimer = setTimeout(function() {
        triggerConcierge();
      }, 8000);
    }
  }

  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollMetrics);
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', function() {
    cachedDocHeight = 0;
  }, { passive: true });

  // Expose trigger globally if needed
  window.__psclShowExitConcierge = triggerConcierge;

  // ─── Universal Sovereign Lead Capture & Modal Engine ───────────────────────
  function getOrInjectLeadModal() {
    var modal = document.getElementById('pscl-enquiry-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'pscl-enquiry-modal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:999999;align-items:center;justify-content:center;padding:1rem;box-sizing:border-box;';
    modal.innerHTML = '<div id="pscl-modal-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);"></div>' +
      '<div style="position:relative;background:linear-gradient(170deg,#16161c 0%,#0d0d10 100%);width:100%;max-width:420px;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(212,175,55,0.25);border:1.5px solid rgba(212,175,55,0.45);box-sizing:border-box;max-height:90vh;display:flex;flex-direction:column;">' +
        '<div style="height:3px;background:linear-gradient(90deg,#6B0D0D,#D4AF37,#6B0D0D);flex-shrink:0;"></div>' +
        '<button id="pscl-modal-close-x" aria-label="Close modal" style="position:absolute;top:10px;right:12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.25);color:#fff;width:48px;height:48px;min-width:48px;min-height:48px;border-radius:50%;font-size:1.1rem;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;" type="button">✕</button>' +
        '<div style="padding:1.2rem 1.4rem 1.1rem;overflow-y:auto;box-sizing:border-box;">' +
          '<div style="text-align:center;margin-bottom:0.8rem;">' +
            '<span style="display:inline-block;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-weight:800;font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.65rem;border-radius:50px;margin-bottom:0.35rem;">✦ Direct Developer Access</span>' +
            '<h3 style="font-family:\'Playfair Display\',serif;font-size:1.25rem;color:#fff;margin:0 0 0.2rem;">Enquire for Forest Trails</h3>' +
            '<p style="color:#E2E8F0;font-size:0.75rem;margin:0;">Instant pricing, floor plans &amp; brochure sent via WhatsApp</p>' +
          '</div>' +
          '<form id="pscl-universal-lead-form" style="display:flex;flex-direction:column;gap:0.7rem;">' +
            '<div>' +
              '<label for="modal-project-interest" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Project Interest</label>' +
              '<select id="modal-project-interest" required style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(212,175,55,0.35);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;cursor:pointer;box-sizing:border-box;">' +
                '<option value="all">🌟 All Paranjape Forest Trails Projects</option>' +
                '<option value="misty-greens">🌳 Misty Greens (NA Plots from ₹1.23 Cr*)</option>' +
                '<option value="the-rivolo">🏡 The Rivolo (4 &amp; 5 BHK Villas from ₹3.89 Cr*)</option>' +
                '<option value="the-cove">🏰 The Cove (4 BHK Duet Villas from ₹2.85 Cr*)</option>' +
                '<option value="athashri-senior-living">👴 Athashri (2 &amp; 3 BHK Senior Living from ₹83 L*)</option>' +
                '<option value="everglades">🏢 Everglades (1 &amp; 2 BHK PRO Homes from ₹48.50 L*)</option>' +
                '<option value="the-canopy">🌅 The Canopy (2 &amp; 3 BHK Flats from ₹89 L*)</option>' +
                '<option value="the-highgardens">🌿 The Highgardens (Terrace Homes from ₹89 L*)</option>' +
                '<option value="verandah">🏡 Verandah (Duplex Homes from ₹93 L*)</option>' +
                '<option value="orchard-residences">🍃 Orchard Residences (Hillside Homes from ₹83 L*)</option>' +
                '<option value="swaniketan">🤝 Swaniketan (Assisted Living 2 &amp; 3 BHK from ₹79 L*)</option>' +
              '</select>' +
            '</div>' +
            '<div>' +
              '<label for="modal-full-name" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Full Name *</label>' +
              '<input id="modal-full-name" placeholder="e.g. Rahul Sharma" required style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" type="text"/>' +
            '</div>' +
            '<div>' +
              '<label for="modal-mobile-phone" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Mobile Phone Number *</label>' +
              '<div style="display:flex;gap:6px;">' +
                '<span style="padding:0.5rem 0.65rem;background:#1c1c22;border:1.5px solid rgba(212,175,55,0.35);border-radius:8px;color:#D4AF37;font-weight:800;font-size:0.78rem;display:flex;align-items:center;">+91</span>' +
                '<input id="modal-mobile-phone" pattern="[0-9]{10}" placeholder="10-digit number" required style="flex:1;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" type="tel"/>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<label for="modal-email-address" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Email Address (Optional)</label>' +
              '<input id="modal-email-address" placeholder="name@domain.com" style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" type="email"/>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;margin:0.2rem 0;">' +
              '<input checked id="wa-modal-optin" style="accent-color:#25D366;width:15px;height:15px;cursor:pointer;" type="checkbox"/>' +
              '<label for="wa-modal-optin" style="font-size:0.72rem;color:rgba(255,255,255,0.8);cursor:pointer;">Send brochure &amp; price sheet on WhatsApp</label>' +
            '</div>' +
            '<button id="modal-submit-btn" style="width:100%;background:linear-gradient(135deg,#6B0D0D 0%,#8B1A1A 50%,#D4AF37 100%);color:#fff;border:1.5px solid #D4AF37;padding:0.75rem 1.2rem;border-radius:10px;font-weight:800;font-size:0.78rem;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 20px rgba(107,13,13,0.5);transition:all 0.2s;" type="submit">' +
              'SUBMIT ENQUIRY →' +
            '</button>' +
          '</form>' +
          '<div style="margin-top:0.8rem;text-align:center;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.7rem;">' +
            '<span style="font-size:0.68rem;color:#CBD5E1;">Direct Sales Helpline: </span>' +
            '<a href="tel:+917744009295" style="color:#D4AF37;text-decoration:none;font-weight:700;font-size:0.72rem;min-height:48px;display:inline-flex;align-items:center;padding:0.4rem 0.2rem;">+91 7744009295</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    document.getElementById('pscl-modal-backdrop').addEventListener('click', window.closeEnquiryModal);
    document.getElementById('pscl-modal-close-x').addEventListener('click', window.closeEnquiryModal);
    document.getElementById('pscl-universal-lead-form').addEventListener('submit', window.handleEnquirySubmit);

    return modal;
  }

  window.openEnquiryModal = function(project) {
    var modal = getOrInjectLeadModal();
    if (modal) {
      modal.style.display = 'flex';
      if (project && typeof project === 'string') {
        var select = document.getElementById('modal-project-interest');
        if (select) {
          for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value === project || select.options[i].value.indexOf(project) !== -1) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }
    }
  };

  window.closeEnquiryModal = function() {
    var modal = document.getElementById('pscl-enquiry-modal');
    if (modal) modal.style.display = 'none';
  };

  window.handleEnquirySubmit = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    var nameEl = document.getElementById('modal-full-name');
    var phoneEl = document.getElementById('modal-mobile-phone');
    var emailEl = document.getElementById('modal-email-address');
    var projectEl = document.getElementById('modal-project-interest');
    var waOptinEl = document.getElementById('wa-modal-optin');

    var name = nameEl ? nameEl.value.trim() : '';
    var phone = phoneEl ? phoneEl.value.trim() : '';
    var email = emailEl ? emailEl.value.trim() : '';
    var project = projectEl ? projectEl.value : 'General Enquiry';
    var waOptin = (waOptinEl && waOptinEl.checked) ? 'YES' : 'NO';

    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    var btn = document.getElementById('modal-submit-btn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Submitting...';
    }

    var leadId = 'LEAD_' + Date.now();
    var cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) cleanPhone = '+91' + cleanPhone;

    var payload = {
      name: name,
      phone: cleanPhone,
      email: email || 'N/A',
      project: project,
      whatsappOptin: waOptin,
      source: window.location.href,
      page_title: document.title,
      timestamp: new Date().toISOString(),
      leadId: leadId,
      _subject: '🌟 New Website Lead: ' + project + ' - ' + name + ' (' + cleanPhone + ')',
      _captcha: 'false'
    };

    // 1. Local Vault
    try {
      sessionStorage.setItem('pscl_last_lead', JSON.stringify(payload));
      localStorage.setItem('pscl_last_lead', JSON.stringify(payload));
      var existing = JSON.parse(localStorage.getItem('pscl_offline_lead_vault') || '[]');
      existing.push(payload);
      localStorage.setItem('pscl_offline_lead_vault', JSON.stringify(existing));
    } catch(err) {}

    // 2. Google Ads Enhanced Conversions
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('set', 'user_data', {
          'phone_number': cleanPhone,
          'email': email || undefined,
          'address': {
            'first_name': name ? name.split(' ')[0] : undefined,
            'last_name': name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : undefined,
            'country': 'IN'
          }
        });
      } catch(uErr) {}

      window.gtag('event', 'conversion', {
        'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA',
        'transaction_id': leadId,
        'value': 1.0,
        'currency': 'INR'
      });

      window.gtag('event', 'generate_lead', {
        'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA',
        'transaction_id': leadId,
        'value': 1.0,
        'currency': 'INR'
      });
    }

    // 3. Multi-channel dispatch (Zero Drop Rate Guarantee)
    if (navigator.sendBeacon) {
      try {
        navigator.sendBeacon('/api/lead-capture', JSON.stringify(payload));
      } catch(bErr) {}
    }

    try {
      fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function() {});
    } catch(fErr) {}

    try {
      fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function() {});
    } catch(fErr2) {}

    setTimeout(function() {
      window.location.href = '/thank-you.html';
    }, 900);
  };

  // ─── Global Contact & Conversion Delegation ─────────────────────────────────
  document.addEventListener('click', function(e) {
    try {
      var target = e.target;
      if (!target) return;
      var btn = target.closest('button, a');
      if (!btn) return;

      var text = (btn.textContent || '').trim().toUpperCase();
      var href = btn.getAttribute('href') || '';
      var cls = btn.className || '';

      // Intercept enquiry clicks across ANY page
      if (
        cls.indexOf('open-enquiry-modal') !== -1 ||
        cls.indexOf('nav-enquire-btn') !== -1 ||
        (btn.closest && btn.closest('.mobile-quick-bar') && text.indexOf('ENQUIRE') !== -1) ||
        text.indexOf('ENQUIRE') !== -1 ||
        text.indexOf('REQUEST BROCHURE') !== -1 ||
        text.indexOf('BOOK SITE VISIT') !== -1 ||
        text.indexOf('DOWNLOAD BROCHURE') !== -1
      ) {
        if (href.indexOf('tel:') === -1 && href.indexOf('wa.me') === -1) {
          e.preventDefault();
          window.openEnquiryModal();
          return;
        }
      }

      // WhatsApp conversion tracking
      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA',
            'value': 1.0,
            'currency': 'INR'
          });
          window.gtag('event', 'contact', {
            'method': 'whatsapp',
            'event_category': 'Direct Engagement',
            'event_label': 'WhatsApp Chat',
            'value': 1.0,
            'currency': 'INR'
          });
        }
      }

      // Phone call conversion tracking
      if (href.indexOf('tel:') === 0) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA',
            'value': 1.0,
            'currency': 'INR'
          });
          window.gtag('event', 'contact', {
            'method': 'phone',
            'event_category': 'Direct Engagement',
            'event_label': href.replace('tel:', ''),
            'value': 1.0,
            'currency': 'INR'
          });
        }
      }
    } catch(err) {}
  });


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

})();
