import re

with open('exit-intent-concierge.js', 'r') as f:
    code = f.read()

# Replace early return on exit_dismissed
target_dismiss = '''  // Do not execute on thank-you pages or if already dismissed in this session
  if (window.location.pathname.indexOf('/thank-you') !== -1) return;
  if (sessionStorage.getItem('pscl_exit_dismissed') === '1') return;'''

repl_dismiss = '''  // Do not execute on thank-you pages
  if (window.location.pathname.indexOf('/thank-you') !== -1) return;'''

if target_dismiss in code:
    code = code.replace(target_dismiss, repl_dismiss)

# Universal Modal Code to insert before the closing })();
universal_lead_engine = r'''
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
'''

# Insert before closing })();
idx = code.rfind('})();')
assert idx != -1, 'closing })(); not found'
code = code[:idx] + universal_lead_engine + '\n})();\n'

with open('exit-intent-concierge.js', 'w') as f:
    f.write(code)
print('exit-intent-concierge.js updated successfully!')
