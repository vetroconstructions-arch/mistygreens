/**
 * Sovereign Universal Contact & Conversion Click Tracker v1.0
 * Tracks Phone (tel:) & WhatsApp (wa.me) interactions across all pages.
 */
(function() {
  'use strict';
  if (window.__psclContactTrackerLoaded) return;
  window.__psclContactTrackerLoaded = true;

  document.addEventListener('click', function(e) {
    try {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        if (typeof gtag === 'function') {
          gtag('event', 'contact', {
            'method': 'phone',
            'event_category': 'Direct Engagement',
            'event_label': href.replace('tel:', ''),
            'value': 1.0,
            'currency': 'INR'
          });
          gtag('event', 'phone_call_lead', {
            'send_to': 'AW-17430583486',
            'event_category': 'Direct Engagement',
            'event_label': href.replace('tel:', ''),
            'value': 1.0,
            'currency': 'INR'
          });
        }
      } else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
        if (typeof gtag === 'function') {
          gtag('event', 'contact', {
            'method': 'whatsapp',
            'event_category': 'Direct Engagement',
            'event_label': 'WhatsApp Chat Initiated',
            'value': 1.0,
            'currency': 'INR'
          });
          gtag('event', 'whatsapp_lead', {
            'send_to': 'AW-17430583486',
            'event_category': 'Direct Engagement',
            'event_label': 'WhatsApp Chat Initiated',
            'value': 1.0,
            'currency': 'INR'
          });
        }
      }
    } catch(err) {}
  }, { passive: true });
})();
