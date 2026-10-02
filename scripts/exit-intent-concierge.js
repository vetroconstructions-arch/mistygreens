/**
 * Paranjape Forest Trails — Sovereign Exit-Intent & Conversion Concierge v2.0
 * Recovers abandoning high-intent visitors on Desktop (cursor exit) and Mobile (scroll abandonment).
 * Fully integrated with Google Ads Enhanced Conversions (AW-17430583486) & GA4.
 */
(function() {
  'use strict';

  // Do not execute on thank-you pages or if already dismissed in this session
  if (window.location.pathname.indexOf('/thank-you') !== -1) return;
  if (sessionStorage.getItem('pscl_exit_dismissed') === '1') return;

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
        top: 14px;
        right: 14px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #ffffff;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1;
        transition: background 0.2s;
      }
      .pscl-close-btn:hover {
        background: rgba(212, 175, 55, 0.3);
      }
      .pscl-badge {
        display: inline-block;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.1));
        border: 1px solid rgba(212, 175, 55, 0.5);
        color: #D4AF37;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 0.25rem 0.65rem;
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
        color: #94A3B8;
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0 0 1.25rem;
      }
      .pscl-wa-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #25D366;
        color: #ffffff;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.92rem;
        padding: 0.85rem 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
        transition: transform 0.2s, background 0.2s;
      }
      .pscl-wa-cta:hover {
        background: #20bd5a;
        transform: translateY(-1px);
      }
      .pscl-divider {
        display: flex;
        align-items: center;
        text-align: center;
        color: #64748B;
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin: 0.8rem 0;
      }
      .pscl-divider::before, .pscl-divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 8px;
        padding: 0.7rem 0.9rem;
        color: #ffffff;
        font-size: 0.85rem;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
        width: 100%;
      }
      .pscl-input:focus {
        border-color: #D4AF37;
        background: rgba(255, 255, 255, 0.09);
      }
      .pscl-submit-btn {
        background: linear-gradient(135deg, #D4AF37, #B8860B);
        color: #1a1a1a;
        font-weight: 800;
        font-size: 0.9rem;
        padding: 0.8rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .pscl-submit-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
      }
      .pscl-dismiss-link {
        display: block;
        text-align: center;
        color: #64748B;
        font-size: 0.75rem;
        margin-top: 0.75rem;
        cursor: pointer;
        text-decoration: underline;
      }
      .pscl-dismiss-link:hover {
        color: #94A3B8;
      }
    `;
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.id = 'pscl-exit-concierge-wrap';
    wrap.innerHTML = `
      <div class="pscl-concierge-card" role="dialog" aria-modal="true" aria-labelledby="pscl-card-title">
        <button class="pscl-close-btn" id="pscl-concierge-close" aria-label="Close dialog">✕</button>
        <span class="pscl-badge">✦ Direct Developer Desk</span>
        <h3 class="pscl-title" id="pscl-card-title">Before You Go: Download the <span>2026 Price Sheet</span> &amp; Master Plan</h3>
        <p class="pscl-desc">Get the latest MahaRERA approved inventory layout, plot dimension matrix, and bank pre-approved EMI schemes delivered directly.</p>
        
        <a class="pscl-wa-cta" id="pscl-concierge-wa" href="https://wa.me/917744009295?text=Hi%2C%20please%20send%20the%20Official%202026%20Price%20Sheet%20%26%20Master%20Layout%20PDF%20for%20Paranjape%20Forest%20Trails." target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Instant Download via WhatsApp
        </a>

        <div class="pscl-divider">OR REQUEST QUICK CALLBACK</div>

        <form class="pscl-form" id="pscl-exit-form">
          <input type="text" class="pscl-input" id="pscl-exit-name" placeholder="Your Name" required />
          <input type="tel" class="pscl-input" id="pscl-exit-phone" pattern="[0-9]{10}" placeholder="Phone Number (10 Digits) *" required />
          <select class="pscl-input" id="pscl-exit-preference" style="background: #181822;">
            <option value="Misty Greens NA Plots (From ₹1.23 Cr*)">Misty Greens NA Plots (From ₹1.23 Cr*)</option>
            <option value="The Rivolo Luxury Villas (From ₹3.89 Cr*)">The Rivolo Luxury Villas (From ₹3.89 Cr*)</option>
            <option value="The Canopy Apartments (From ₹89 L*)">The Canopy Apartments (From ₹89 L*)</option>
            <option value="General Forest Trails Township Brochure">General Forest Trails Master Brochure</option>
          </select>
          <button type="submit" class="pscl-submit-btn">Send My Brochure &amp; Price List →</button>
        </form>

        <span class="pscl-dismiss-link" id="pscl-concierge-skip">No thanks, I'll continue browsing</span>
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
        _subject: 'VIP Lead: Exit Concierge — ' + preference
      };

      try {
        fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).finally(function() {
          window.location.href = '/thank-you/';
        });
      } catch(fetchErr) {
        window.location.href = '/thank-you/';
      }
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
  window.addEventListener('scroll', function() {
    var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    var currentScroll = (window.scrollY / totalHeight) * 100;
    if (currentScroll > maxScroll) maxScroll = currentScroll;

    if (maxScroll > 75 && !hasTriggered) {
      clearTimeout(scrollCheckTimer);
      scrollCheckTimer = setTimeout(function() {
        // Trigger if reading at bottom for 8 seconds
        triggerConcierge();
      }, 8000);
    }
  }, { passive: true });

  // Expose trigger globally if needed
  window.__psclShowExitConcierge = triggerConcierge;
})();
