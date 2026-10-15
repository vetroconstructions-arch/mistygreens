import re
import os

def optimize_homepage():
    index_path = "index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Remove Astro island runtime scripts
    html = re.sub(r'<script>\(\(\)=>\{var e=async t=>.*?\(self\.Astro\|\|\(self\.Astro=\{\}\)\)\.load=e;window\.dispatchEvent\(new Event\("astro:load"\)\);\)\(\);</script>', '', html)
    html = re.sub(r'<script>\(\(\)=>\{var g=Object\.defineProperty;.*?customElements\.get\("astro-island"\)\|\|customElements\.define\("astro-island",f\)\}\}\)\(\);</script>', '', html)
    html = re.sub(r'<script>\(\(\)=>\{var a=\(s,i,o\)=>.*?\(self\.Astro\|\|\(self\.Astro=\{\}\)\)\.visible=a;window\.dispatchEvent\(new Event\("astro:visible"\)\);\)\(\);</script>', '', html)
    html = re.sub(r'<script>\(\(\)=>\{var l=\(n,t\)=>.*?\(self\.Astro\|\|\(self\.Astro=\{\}\)\)\.idle=l;window\.dispatchEvent\(new Event\("astro:idle"\)\);\)\(\);</script>', '', html)

    # 2. Convert ProjectPortfolioSection island to div
    html = re.sub(r'<astro-island[^>]*component-export="ProjectPortfolioSection"[^>]*>', '<div id="project-portfolio-section">', html)

    # 3. Convert MasterPlanNavigator island to div
    html = re.sub(r'<astro-island[^>]*component-export="MasterPlanNavigator"[^>]*>', '<div id="master-plan-navigator-section">', html)

    # 4. Convert StrategicKnowledgeHub island to div
    html = re.sub(r'<astro-island[^>]*component-export="StrategicKnowledgeHub"[^>]*>', '<div id="strategic-knowledge-hub-section">', html)

    # 5. Replace closing <!--astro:end--></astro-island> with </div>
    html = html.replace('<!--astro:end--></astro-island>', '</div>')

    # 6. Remove empty/hidden modal islands
    html = re.sub(r'<astro-island[^>]*component-export="EnquiryModal"[^>]*></astro-island>', '', html)
    html = re.sub(r'<astro-island[^>]*component-export="ComparisonDrawer"[^>]*>.*?</astro-island>', '', html, flags=re.DOTALL)
    html = re.sub(r'<astro-island[^>]*component-export="GlobalSearchModal"[^>]*></astro-island>', '', html)

    # 7. Add Lightweight Vanilla JS Modal & Interactivity before </body>
    vanilla_enhancements = """
<!-- PSCL Sovereign Vanilla Interactive Engine (Zero React Overhead, Sub-20ms TBT) -->
<div id="pscl-enquiry-modal" style="display:none;position:fixed;inset:0;z-index:999999;align-items:center;justify-content:center;padding:1rem;box-sizing:border-box;">
  <div id="pscl-modal-backdrop" onclick="window.closeEnquiryModal()" style="position:absolute;inset:0;background:rgba(0,0,0,0.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);"></div>
  <div style="position:relative;background:linear-gradient(170deg,#16161c 0%,#0d0d10 100%);width:100%;maxWidth:420px;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(212,175,55,0.25);border:1.5px solid rgba(212,175,55,0.45);box-sizing:border-box;max-height:90vh;display:flex;flex-direction:column;">
    <div style="height:3px;background:linear-gradient(90deg,#6B0D0D,#D4AF37,#6B0D0D);flex-shrink:0;"></div>
    <button onclick="window.closeEnquiryModal()" aria-label="Close modal" type="button" style="position:absolute;top:10px;right:12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.25);color:#fff;width:28px;height:28px;border-radius:50%;font-size:0.85rem;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;">✕</button>
    <div style="padding:1.2rem 1.4rem 1.1rem;overflow-y:auto;box-sizing:border-box;">
      <div style="text-align:center;margin-bottom:0.8rem;">
        <span style="display:inline-block;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-weight:800;font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.65rem;border-radius:50px;margin-bottom:0.35rem;">✦ Direct Developer Access</span>
        <h3 style="font-family:'Playfair Display',serif;font-size:1.25rem;color:#fff;margin:0 0 0.2rem;">Enquire for Forest Trails</h3>
        <p style="color:rgba(255,255,255,0.65);font-size:0.75rem;margin:0;">Instant pricing, floor plans & brochure sent via WhatsApp</p>
      </div>
      <form id="pscl-lead-form" onsubmit="window.handleEnquirySubmit(event)" style="display:flex;flex-direction:column;gap:0.7rem;">
        <div>
          <label for="modal-project-interest" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Project Interest</label>
          <select id="modal-project-interest" required style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(212,175,55,0.35);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;cursor:pointer;box-sizing:border-box;">
            <option value="all">🌟 All Paranjape Forest Trails Projects</option>
            <option value="misty-greens">🌳 Misty Greens (NA Plots from ₹1.23 Cr*)</option>
            <option value="the-rivolo">🏡 The Rivolo (4 & 5 BHK Villas from ₹3.89 Cr*)</option>
            <option value="the-cove">🏰 The Cove (4 BHK Duet Villas from ₹2.85 Cr*)</option>
            <option value="athashri-senior-living">👴 Athashri (2 BHK Senior Living from ₹83 L*)</option>
            <option value="everglades">🏢 Everglades (1 & 2 BHK PRO Homes from ₹48.50 L*)</option>
            <option value="the-canopy">🌅 The Canopy (2 & 3 BHK Flats from ₹89 L*)</option>
            <option value="the-highgardens">🌿 The Highgardens (Terrace Homes from ₹89 L*)</option>
            <option value="verandah">🏡 Verandah (Duplex Homes from ₹93 L*)</option>
            <option value="orchard-residences">🍃 Orchard Residences (Hillside Homes from ₹83 L*)</option>
            <option value="swaniketan">🤝 Swaniketan (Assisted Living from ₹79 L*)</option>
          </select>
        </div>
        <div>
          <label for="modal-full-name" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Full Name *</label>
          <input id="modal-full-name" type="text" placeholder="e.g. Rahul Sharma" required style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" />
        </div>
        <div>
          <label for="modal-mobile-phone" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Mobile Phone Number *</label>
          <div style="display:flex;gap:6px;">
            <span style="padding:0.5rem 0.65rem;background:#1c1c22;border:1.5px solid rgba(212,175,55,0.35);border-radius:8px;color:#D4AF37;font-weight:800;font-size:0.78rem;display:flex;align-items:center;">+91</span>
            <input id="modal-mobile-phone" type="tel" placeholder="10-digit number" pattern="[0-9]{10}" required style="flex:1;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" />
          </div>
        </div>
        <div>
          <label for="modal-email-address" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Email Address (Optional)</label>
          <input id="modal-email-address" type="email" placeholder="name@domain.com" style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" />
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin:0.2rem 0;">
          <input type="checkbox" id="wa-modal-optin" checked style="accent-color:#25D366;width:15px;height:15px;cursor:pointer;" />
          <label for="wa-modal-optin" style="font-size:0.72rem;color:rgba(255,255,255,0.8);cursor:pointer;">Send brochure & price sheet on WhatsApp</label>
        </div>
        <button id="modal-submit-btn" type="submit" style="width:100%;background:linear-gradient(135deg,#6B0D0D 0%,#8B1A1A 50%,#D4AF37 100%);color:#fff;border:1.5px solid #D4AF37;padding:0.75rem 1.2rem;border-radius:10px;font-weight:800;font-size:0.78rem;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 20px rgba(107,13,13,0.5);transition:all 0.2s;">
          SUBMIT ENQUIRY →
        </button>
      </form>
      <div style="margin-top:0.8rem;text-align:center;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.7rem;">
        <span style="font-size:0.68rem;color:rgba(255,255,255,0.5);">Direct Sales Helpline: </span>
        <a href="tel:+917744009295" style="color:#D4AF37;text-decoration:none;font-weight:700;font-size:0.72rem;">+91 7744009295</a>
      </div>
    </div>
  </div>
</div>

<script>
// 1. Sovereign Modal Controller
window.openEnquiryModal = function(project) {
  var modal = document.getElementById('pscl-enquiry-modal');
  if (modal) {
    modal.style.display = 'flex';
    if (project) {
      var select = document.getElementById('modal-project-interest');
      if (select) select.value = project;
    }
  }
};

window.closeEnquiryModal = function() {
  var modal = document.getElementById('pscl-enquiry-modal');
  if (modal) modal.style.display = 'none';
};

window.handleEnquirySubmit = function(e) {
  e.preventDefault();
  var name = document.getElementById('modal-full-name').value.trim();
  var phone = document.getElementById('modal-mobile-phone').value.trim();
  var email = document.getElementById('modal-email-address').value.trim();
  var project = document.getElementById('modal-project-interest').value;
  var waOptin = document.getElementById('wa-modal-optin').checked ? 'YES' : 'NO';

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
  var payload = {
    name: name,
    phone: '+91' + phone,
    email: email || 'N/A',
    project: project,
    whatsappOptin: waOptin,
    source: window.location.href,
    timestamp: new Date().toISOString(),
    _subject: '🌟 New Website Lead: ' + project + ' - ' + name + ' (+91' + phone + ')',
    _captcha: 'false'
  };

  try {
    sessionStorage.setItem('pscl_last_lead', JSON.stringify({ name: name, phone: '+91' + phone, email: email, project: project, leadId: leadId }));
    localStorage.setItem('pscl_last_lead', JSON.stringify({ name: name, phone: '+91' + phone, email: email, project: project, leadId: leadId }));
  } catch(err) {}

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { 'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA', 'transaction_id': leadId });
    window.gtag('event', 'generate_lead', { 'send_to': 'AW-17430583486/2oseCKuOodYcEL6xxvdA', 'transaction_id': leadId, 'value': 1.0, 'currency': 'INR' });
  }

  fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(function() {});

  fetch('/api/lead-capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(function() {});

  setTimeout(function() {
    window.location.href = '/thank-you.html';
  }, 600);
};

// 2. Enclave Filter Tabs Handler
document.addEventListener('DOMContentLoaded', function() {
  var filterBar = document.getElementById('enclave-filter-bar');
  if (filterBar) {
    var buttons = filterBar.querySelectorAll('button');
    var cards = document.querySelectorAll('.cluster-card');
    var categories = ['all', 'plots', 'villas', 'apartments', 'senior-living', 'amenities'];

    buttons.forEach(function(btn, idx) {
      btn.addEventListener('click', function() {
        buttons.forEach(function(b) {
          b.style.background = 'transparent';
          b.style.color = 'rgba(255, 255, 255, 0.75)';
          b.style.border = '1px solid transparent';
          b.style.boxShadow = 'none';
        });
        btn.style.background = 'linear-gradient(135deg, #6B0D0D, #8B1A1A)';
        btn.style.color = '#FFFFFF';
        btn.style.border = '1.5px solid #D4AF37';
        btn.style.boxShadow = '0 6px 20px rgba(107, 13, 13, 0.5), 0 0 15px rgba(212, 175, 55, 0.3)';

        var cat = categories[idx] || 'all';
        cards.forEach(function(card) {
          var cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Strategic Knowledge Hub Accordions
  var faqButtons = document.querySelectorAll('#strategic-knowledge-hub-section button');
  faqButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      var arrow = btn.querySelector('span:last-child');
      if (arrow) arrow.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
      var content = btn.nextElementSibling;
      if (content) content.style.display = expanded ? 'none' : 'block';
    });
  });
});
</script>
"""

    if vanilla_enhancements not in html:
        html = html.replace('</body>', vanilla_enhancements + '\n</body>')

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)

    # Also update dist/index.html
    if os.path.exists("dist/index.html"):
        with open("dist/index.html", "w", encoding="utf-8") as f:
            f.write(html)

    print("Successfully transformed index.html and dist/index.html!")

if __name__ == "__main__":
    optimize_homepage()
