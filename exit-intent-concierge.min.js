"use strict";(function(){"use strict";if(window.location.pathname.indexOf("/thank-you")!==-1||window.__psclConciergeInitialized)return;window.__psclConciergeInitialized=!0;var w=!1,P=Date.now(),N=6e3;function F(){if(!document.getElementById("pscl-exit-concierge-wrap")){var e=document.createElement("style");e.id="pscl-concierge-styles",e.textContent=`
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
    `,document.head.appendChild(e);var t=document.createElement("div");t.id="pscl-exit-concierge-wrap",t.innerHTML=`
      <div class="pscl-concierge-card" role="dialog" aria-modal="true" aria-labelledby="pscl-card-title">
        <button class="pscl-close-btn" id="pscl-concierge-close" aria-label="Close download dialog" type="button">\u2715</button>
        <span class="pscl-badge">\u2726 Direct Developer Desk</span>
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
            <option value="Misty Greens NA Plots (From \u20B91.23 Cr*)">Misty Greens NA Plots (From \u20B91.23 Cr*)</option>
            <option value="The Rivolo Luxury Villas (From \u20B93.89 Cr*)">The Rivolo Luxury Villas (From \u20B93.89 Cr*)</option>
            <option value="The Canopy Apartments (From \u20B989 L*)">The Canopy Apartments (From \u20B989 L*)</option>
            <option value="General Forest Trails Township Brochure">General Forest Trails Master Brochure</option>
          </select>
          <button type="submit" class="pscl-submit-btn" aria-label="Send My Brochure &amp; Price List">Send My Brochure &amp; Price List \u2192</button>
          <p style="font-size:0.68rem;color:rgba(255,255,255,0.7);text-align:center;margin:0.5rem 0 0.2rem;line-height:1.4;">
            \u{1F512} By submitting, you agree to our <a href="/privacy-policy/" target="_blank" rel="noopener" style="color:#D4AF37;text-decoration:underline;">Privacy Policy</a> &amp; authorize verified updates via Call/WhatsApp. Zero spam.
          </p>
        </form>

        <span class="pscl-dismiss-link" id="pscl-concierge-skip" role="button" tabindex="0" aria-label="Dismiss and continue browsing">No thanks, I'll continue browsing</span>
      </div>
    `,document.body.appendChild(t),document.getElementById("pscl-concierge-close").addEventListener("click",h),document.getElementById("pscl-concierge-skip").addEventListener("click",h),t.addEventListener("click",function(a){a.target===t&&h()}),document.addEventListener("keydown",function(a){a.key==="Escape"&&t.classList.contains("pscl-active")&&h()}),document.getElementById("pscl-concierge-wa").addEventListener("click",function(){typeof gtag=="function"&&gtag("event","contact",{method:"whatsapp",event_category:"Exit Concierge",event_label:"WhatsApp PDF Request",value:1,currency:"INR"}),h()}),document.getElementById("pscl-exit-form").addEventListener("submit",function(a){a.preventDefault();var n=document.getElementById("pscl-exit-name").value.trim(),i=document.getElementById("pscl-exit-phone").value.trim(),s=document.getElementById("pscl-exit-preference").value,o="EXIT_"+Date.now();try{sessionStorage.setItem("pscl_last_lead",JSON.stringify({name:n,phone:i,email:"",preference:s,timestamp:Date.now(),transaction_id:o}))}catch{}if(typeof gtag=="function"){try{var r=i.replace(/[^0-9]/g,"");r.length===10&&(r="+91"+r),gtag("set","user_data",{phone_number:r,address:{first_name:n?n.split(" ")[0]:void 0,last_name:n&&n.split(" ").length>1?n.split(" ").slice(1).join(" "):void 0,country:"IN"}})}catch{}gtag("event","conversion",{send_to:"AW-17430583486/2oseCKuOodYcEL6xxvdA",value:1,currency:"INR",transaction_id:o}),gtag("event","generate_lead",{event_category:"Exit Intent Concierge",event_label:s,value:1,currency:"INR"})}var l={name:n,phone:i,email:"exit-concierge@paranjapetownship.com",enclave:s,source_url:window.location.href,page_title:document.title,timestamp:new Date().toISOString(),transaction_id:o,_subject:"VIP Lead: Exit Concierge \u2014 "+s,_captcha:"false"};try{sessionStorage.setItem("pscl_last_lead",JSON.stringify(l)),localStorage.setItem("pscl_last_lead",JSON.stringify(l));var p=JSON.parse(localStorage.getItem("pscl_offline_lead_vault")||"[]");p.push(l),localStorage.setItem("pscl_offline_lead_vault",JSON.stringify(p))}catch{}if(navigator.sendBeacon)try{navigator.sendBeacon("/api/lead-capture",JSON.stringify(l))}catch{}try{fetch("https://formsubmit.co/ajax/propsmartrealty@gmail.com",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(l),keepalive:!0}).catch(function(){})}catch{}try{fetch("/api/lead-capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l),keepalive:!0}).catch(function(){})}catch{}setTimeout(function(){window.location.href="/thank-you/"},800)})}}function I(){if(!w&&sessionStorage.getItem("pscl_exit_dismissed")!=="1"&&!(Date.now()-P<N)){w=!0,F();var e=document.getElementById("pscl-exit-concierge-wrap");e&&e.classList.add("pscl-active")}}function h(){sessionStorage.setItem("pscl_exit_dismissed","1");var e=document.getElementById("pscl-exit-concierge-wrap");e&&(e.classList.remove("pscl-active"),setTimeout(function(){e.parentNode&&e.parentNode.removeChild(e)},300))}document.addEventListener("mouseleave",function(e){e.clientY<=15&&I()},{passive:!0});var E=0,D=null,B=!1,x=0;function T(){if(B=!1,x||(x=(document.documentElement.scrollHeight||document.body.scrollHeight||0)-window.innerHeight),!(x<=0)){var e=window.scrollY/x*100;e>E&&(E=e),E>75&&!w&&(clearTimeout(D),D=setTimeout(function(){I()},8e3))}}window.addEventListener("scroll",function(){B||(window.requestAnimationFrame(T),B=!0)},{passive:!0}),window.addEventListener("resize",function(){x=0},{passive:!0}),window.__psclShowExitConcierge=I;function z(){var e=document.getElementById("pscl-enquiry-modal");return e||(e=document.createElement("div"),e.id="pscl-enquiry-modal",e.style.cssText="display:none;position:fixed;inset:0;z-index:999999;align-items:center;justify-content:center;padding:1rem;box-sizing:border-box;",e.innerHTML=`<div id="pscl-modal-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);"></div><div style="position:relative;background:linear-gradient(170deg,#16161c 0%,#0d0d10 100%);width:100%;max-width:420px;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(212,175,55,0.25);border:1.5px solid rgba(212,175,55,0.45);box-sizing:border-box;max-height:90vh;display:flex;flex-direction:column;"><div style="height:3px;background:linear-gradient(90deg,#6B0D0D,#D4AF37,#6B0D0D);flex-shrink:0;"></div><button id="pscl-modal-close-x" aria-label="Close modal" style="position:absolute;top:10px;right:12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.25);color:#fff;width:48px;height:48px;min-width:48px;min-height:48px;border-radius:50%;font-size:1.1rem;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;" type="button">\u2715</button><div style="padding:1.2rem 1.4rem 1.1rem;overflow-y:auto;box-sizing:border-box;"><div style="text-align:center;margin-bottom:0.8rem;"><span style="display:inline-block;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-weight:800;font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.65rem;border-radius:50px;margin-bottom:0.35rem;">\u2726 Direct Developer Access</span><h3 style="font-family:'Playfair Display',serif;font-size:1.25rem;color:#fff;margin:0 0 0.2rem;">Enquire for Forest Trails</h3><p style="color:#E2E8F0;font-size:0.75rem;margin:0;">Instant pricing, floor plans &amp; brochure sent via WhatsApp</p></div><form id="pscl-universal-lead-form" style="display:flex;flex-direction:column;gap:0.7rem;"><div><label for="modal-project-interest" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Project Interest</label><select id="modal-project-interest" required style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(212,175,55,0.35);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;cursor:pointer;box-sizing:border-box;"><option value="all">\u{1F31F} All Paranjape Forest Trails Projects</option><option value="misty-greens">\u{1F333} Misty Greens (NA Plots from \u20B91.23 Cr*)</option><option value="the-rivolo">\u{1F3E1} The Rivolo (4 &amp; 5 BHK Villas from \u20B93.89 Cr*)</option><option value="the-cove">\u{1F3F0} The Cove (4 BHK Duet Villas from \u20B92.85 Cr*)</option><option value="athashri-senior-living">\u{1F474} Athashri (2 &amp; 3 BHK Senior Living from \u20B983 L*)</option><option value="everglades">\u{1F3E2} Everglades (1 &amp; 2 BHK PRO Homes from \u20B948.50 L*)</option><option value="the-canopy">\u{1F305} The Canopy (2 &amp; 3 BHK Flats from \u20B989 L*)</option><option value="the-highgardens">\u{1F33F} The Highgardens (Terrace Homes from \u20B989 L*)</option><option value="verandah">\u{1F3E1} Verandah (Duplex Homes from \u20B993 L*)</option><option value="orchard-residences">\u{1F343} Orchard Residences (Hillside Homes from \u20B983 L*)</option><option value="swaniketan">\u{1F91D} Swaniketan (Assisted Living 2 &amp; 3 BHK from \u20B979 L*)</option></select></div><div><label for="modal-full-name" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Full Name *</label><input id="modal-full-name" placeholder="e.g. Rahul Sharma" required style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" type="text"/></div><div><label for="modal-mobile-phone" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Mobile Phone Number *</label><div style="display:flex;gap:6px;"><span style="padding:0.5rem 0.65rem;background:#1c1c22;border:1.5px solid rgba(212,175,55,0.35);border-radius:8px;color:#D4AF37;font-weight:800;font-size:0.78rem;display:flex;align-items:center;">+91</span><input id="modal-mobile-phone" pattern="[0-9]{10}" placeholder="10-digit number" required style="flex:1;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" type="tel"/></div></div><div><label for="modal-email-address" style="display:block;color:rgba(255,255,255,0.85);font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.2rem;">Email Address (Optional)</label><input id="modal-email-address" placeholder="name@domain.com" style="width:100%;background:#1c1c22;color:#fff;border:1.5px solid rgba(255,255,255,0.18);border-radius:8px;padding:0.5rem 0.75rem;font-size:0.78rem;outline:none;box-sizing:border-box;" type="email"/></div><div style="display:flex;align-items:center;gap:8px;margin:0.2rem 0;"><input checked id="wa-modal-optin" style="accent-color:#25D366;width:15px;height:15px;cursor:pointer;" type="checkbox"/><label for="wa-modal-optin" style="font-size:0.72rem;color:rgba(255,255,255,0.8);cursor:pointer;">Send brochure &amp; price sheet on WhatsApp</label></div><button id="modal-submit-btn" style="width:100%;background:linear-gradient(135deg,#6B0D0D 0%,#8B1A1A 50%,#D4AF37 100%);color:#fff;border:1.5px solid #D4AF37;padding:0.75rem 1.2rem;border-radius:10px;font-weight:800;font-size:0.78rem;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 20px rgba(107,13,13,0.5);transition:all 0.2s;" type="submit">SUBMIT ENQUIRY \u2192</button><p style="font-size:0.65rem;color:rgba(255,255,255,0.65);text-align:center;margin:0.45rem 0 0.1rem;line-height:1.4;">\u{1F512} By submitting, you agree to our <a href="/privacy-policy/" target="_blank" rel="noopener" style="color:#D4AF37;text-decoration:underline;">Privacy Policy</a> &amp; authorize verified updates via Call/WhatsApp.</p></form><div style="margin-top:0.8rem;text-align:center;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.7rem;"><span style="font-size:0.68rem;color:#CBD5E1;">Direct Sales Helpline: </span><a href="tel:+917744009295" style="color:#D4AF37;text-decoration:none;font-weight:700;font-size:0.72rem;min-height:48px;display:inline-flex;align-items:center;padding:0.4rem 0.2rem;">+91 7744009295</a></div></div></div>`,document.body.appendChild(e),document.getElementById("pscl-modal-backdrop").addEventListener("click",window.closeEnquiryModal),document.getElementById("pscl-modal-close-x").addEventListener("click",window.closeEnquiryModal),document.getElementById("pscl-universal-lead-form").addEventListener("submit",window.handleEnquirySubmit),e)}window.openEnquiryModal=function(e){var t=z();if(t&&(t.style.display="flex",e&&typeof e=="string")){var a=document.getElementById("modal-project-interest");if(a){for(var n=0;n<a.options.length;n++)if(a.options[n].value===e||a.options[n].value.indexOf(e)!==-1){a.selectedIndex=n;break}}}},window.closeEnquiryModal=function(){var e=document.getElementById("pscl-enquiry-modal");e&&(e.style.display="none")},window.handleEnquirySubmit=function(e){e&&e.preventDefault&&e.preventDefault();var t=document.getElementById("modal-full-name"),a=document.getElementById("modal-mobile-phone"),n=document.getElementById("modal-email-address"),i=document.getElementById("modal-project-interest"),s=document.getElementById("wa-modal-optin"),o=t?t.value.trim():"",r=a?a.value.trim():"",l=n?n.value.trim():"",p=i?i.value:"General Enquiry",d=s&&s.checked?"YES":"NO";if(!r||r.length<10){alert("Please enter a valid 10-digit mobile number");return}var f=document.getElementById("modal-submit-btn");f&&(f.disabled=!0,f.textContent="Submitting...");var c="LEAD_"+Date.now(),m=r.replace(/[^0-9]/g,"");m.length===10&&(m="+91"+m);var u={name:o,phone:m,email:l||"N/A",project:p,whatsappOptin:d,source:window.location.href,page_title:document.title,timestamp:new Date().toISOString(),leadId:c,_subject:"\u{1F31F} New Website Lead: "+p+" - "+o+" ("+m+")",_captcha:"false"};try{sessionStorage.setItem("pscl_last_lead",JSON.stringify(u)),localStorage.setItem("pscl_last_lead",JSON.stringify(u));var b=JSON.parse(localStorage.getItem("pscl_offline_lead_vault")||"[]");b.push(u),localStorage.setItem("pscl_offline_lead_vault",JSON.stringify(b))}catch{}if(typeof window.gtag=="function"){try{window.gtag("set","user_data",{phone_number:m,email:l||void 0,address:{first_name:o?o.split(" ")[0]:void 0,last_name:o&&o.split(" ").length>1?o.split(" ").slice(1).join(" "):void 0,country:"IN"}})}catch{}window.gtag("event","conversion",{send_to:"AW-17430583486/2oseCKuOodYcEL6xxvdA",transaction_id:c,value:1,currency:"INR"}),window.gtag("event","generate_lead",{send_to:"AW-17430583486/2oseCKuOodYcEL6xxvdA",transaction_id:c,value:1,currency:"INR"})}if(navigator.sendBeacon)try{navigator.sendBeacon("/api/lead-capture",JSON.stringify(u))}catch{}try{fetch("https://formsubmit.co/ajax/propsmartrealty@gmail.com",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(u),keepalive:!0}).catch(function(){})}catch{}try{fetch("/api/lead-capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u),keepalive:!0}).catch(function(){})}catch{}setTimeout(function(){window.location.href="/thank-you.html"},900)},document.addEventListener("click",function(e){try{var t=e.target;if(!t)return;var a=t.closest("button, a");if(!a)return;var n=(a.textContent||"").trim().toUpperCase(),i=a.getAttribute("href")||"",s=a.className||"";if((s.indexOf("open-enquiry-modal")!==-1||s.indexOf("nav-enquire-btn")!==-1||a.closest&&a.closest(".mobile-quick-bar")&&n.indexOf("ENQUIRE")!==-1||n.indexOf("ENQUIRE")!==-1||n.indexOf("REQUEST BROCHURE")!==-1||n.indexOf("BOOK SITE VISIT")!==-1||n.indexOf("DOWNLOAD BROCHURE")!==-1)&&i.indexOf("tel:")===-1&&i.indexOf("wa.me")===-1){e.preventDefault(),window.openEnquiryModal();return}(i.indexOf("wa.me")!==-1||i.indexOf("whatsapp.com")!==-1)&&typeof window.gtag=="function"&&(window.gtag("event","conversion",{send_to:"AW-17430583486/2oseCKuOodYcEL6xxvdA",value:1,currency:"INR"}),window.gtag("event","contact",{method:"whatsapp",event_category:"Direct Engagement",event_label:"WhatsApp Chat",value:1,currency:"INR"})),i.indexOf("tel:")===0&&typeof window.gtag=="function"&&(window.gtag("event","conversion",{send_to:"AW-17430583486/2oseCKuOodYcEL6xxvdA",value:1,currency:"INR"}),window.gtag("event","contact",{method:"phone",event_category:"Direct Engagement",event_label:i.replace("tel:",""),value:1,currency:"INR"}))}catch{}});function M(){var e=(window.location.pathname||"").toLowerCase();return e.indexOf("misty-greens")!==-1||e.indexOf("plot")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in Misty Greens NA Bungalow Plots at Forest Trails Bhugaon. Please send the 2026 price sheet, master layout, and plot availability."):e.indexOf("rivolo")!==-1||e.indexOf("villa")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in The Rivolo 4 & 5 BHK Luxury Forest Villas at Bhugaon. Please send floor plans, pricing, and villa specifications."):e.indexOf("canopy")!==-1||e.indexOf("2bhk")!==-1||e.indexOf("flat")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in The Canopy 2 & 3 BHK Nature Apartments at Forest Trails. Please send pricing, payment plans, and brochure."):e.indexOf("athashri")!==-1||e.indexOf("senior")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in Athashri Senior Living at Forest Trails Bhugaon. Please share 2 & 3 BHK assisted living details, medical amenities, and pricing."):e.indexOf("everglades")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in Everglades 1 & 2 BHK PRO Homes near Bavdhan. Please share brochure and pricing from \u20B948.5 L*."):e.indexOf("cove")!==-1||e.indexOf("bungalow")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in The Cove 4 BHK Duet Villas / Twin Bungalows. Please send floor plans and price sheet."):e.indexOf("highgardens")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in The Highgardens Terrace Homes at Forest Trails Bhugaon. Please share 2 BHK pricing and brochure."):e.indexOf("swaniketan")!==-1?encodeURIComponent("Hello Paranjape Team, I am interested in Swaniketan Assisted Living at Forest Trails Bhugaon. Please share 2 & 3 BHK healthcare services and price list."):encodeURIComponent("Hello Paranjape Team, I am exploring Paranjape Forest Trails 190-Acre Township in Bhugaon. Please send the complete 2026 master plan and all enclave brochures.")}function _(){if(document.getElementById("pscl-live-pulse"))return;var e=document.createElement("style");e.id="pscl-live-pulse-styles",e.textContent=`
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
        min-height: 48px;
        min-width: 76px;
        padding: 0.5rem 0.9rem;
        border-radius: 8px;
        font-weight: 800;
        font-size: 0.75rem;
        cursor: pointer;
        margin-left: auto;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        touch-action: manipulation;
        transition: transform 0.15s, background 0.15s;
      }
      .pscl-pulse-cta:hover {
        background: #f3c332;
        transform: scale(1.04);
      }
      .pscl-pulse-close {
        background: transparent;
        border: none;
        color: rgba(255,255,255,0.7);
        font-size: 1.15rem;
        cursor: pointer;
        min-height: 48px;
        min-width: 48px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;
        line-height: 1;
        touch-action: manipulation;
      }
      .pscl-pulse-close:hover {
        color: #fff;
      }
    `,document.head.appendChild(e);var t=document.createElement("div");t.id="pscl-live-pulse",t.innerHTML='<div class="pscl-pulse-badge">FT</div><div style="flex:1;min-width:0;"><div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e;"></span><span id="pscl-pulse-time" style="font-size:0.62rem;color:#D4AF37;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">LIVE VERIFIED</span></div><div id="pscl-pulse-msg" style="font-weight:600;color:#F1F5F9;line-height:1.3;font-size:0.72rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Dr. S. Kulkarni from Kothrud reserved a 2,400 sq.ft plot at Misty Greens.</div></div><button type="button" id="pscl-pulse-action-btn" class="pscl-pulse-cta">Enquire \u2192</button><button type="button" id="pscl-pulse-dismiss-btn" class="pscl-pulse-close" aria-label="Dismiss">\u2715</button>',document.body.appendChild(t);var a=[{msg:"Dr. S. Kulkarni from Kothrud reserved a 2,400 sq.ft plot at Misty Greens.",time:"5 MINS AGO",enclave:"misty-greens"},{msg:"Tech Lead from Hinjewadi booked a site visit for The Rivolo 4BHK Villa.",time:"12 MINS AGO",enclave:"the-rivolo"},{msg:"Family from Bavdhan received The Canopy 2 & 3 BHK floor plans & price sheet.",time:"18 MINS AGO",enclave:"the-canopy"},{msg:"Athashri 2 & 3 BHK Senior Living: 3 units allotted this week.",time:"LIVE UPDATE",enclave:"athashri-senior-living"},{msg:"Everglades 1 & 2 BHK PRO Homes starting \u20B948.5 L* - High enquiry volume.",time:"HOT DEAL",enclave:"everglades"},{msg:"Misty Greens Phase 2: Over 85% NA Plots Sold. Limited sectors remaining.",time:"HIGH DEMAND",enclave:"misty-greens"}],n=0,i=!1;function s(){if(!i){var r=a[n],l=document.getElementById("pscl-pulse-msg"),p=document.getElementById("pscl-pulse-time"),d=document.getElementById("pscl-pulse-action-btn");l&&(l.textContent=r.msg),p&&(p.textContent=r.time),d&&(d.setAttribute("data-enclave",r.enclave),d.onclick=function(f){f.stopPropagation(),window.openEnquiryModal&&window.openEnquiryModal(r.enclave)}),t.onclick=function(){window.openEnquiryModal&&window.openEnquiryModal(r.enclave)},t.classList.add("pscl-pulse-visible"),setTimeout(function(){i||(t.classList.remove("pscl-pulse-visible"),n=(n+1)%a.length,setTimeout(s,16e3))},6e3)}}var o=document.getElementById("pscl-pulse-dismiss-btn");o&&o.addEventListener("click",function(r){r.stopPropagation(),i=!0,t.classList.remove("pscl-pulse-visible"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t)},400)}),setTimeout(s,4500)}function O(){if(!document.getElementById("pscl-concierge-fab")){var e=document.createElement("style");e.id="pscl-fab-styles",e.textContent=`
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
        width: 54px;
        height: 54px;
        min-width: 54px;
        min-height: 54px;
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
        transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        touch-action: manipulation;
        position: relative;
      }
      #pscl-fab-btn::before {
        content: '';
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        border: 2px solid rgba(212, 175, 55, 0.7);
        pointer-events: none;
        will-change: transform, opacity;
        animation: psclFabPulseComposited 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }
      @keyframes psclFabPulseComposited {
        0% { transform: scale(0.92); opacity: 0.85; }
        70%, 100% { transform: scale(1.35); opacity: 0; }
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
        min-height: 48px;
        min-width: 48px;
        padding: 0.65rem 0.85rem;
        border-radius: 10px;
        font-size: 0.8rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s;
        box-sizing: border-box;
        touch-action: manipulation;
      }
      .pscl-fab-item:hover {
        background: rgba(212, 175, 55, 0.2);
        border-color: #D4AF37;
        color: #D4AF37;
        transform: translateX(-2px);
      }
    `,document.head.appendChild(e);var t=document.createElement("div");t.id="pscl-concierge-fab",t.innerHTML='<div id="pscl-fab-menu"><div style="padding:0.3rem 0.5rem 0.4rem;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:2px;"><span style="font-size:0.64rem;color:#D4AF37;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">\u2726 VIP Buyer Concierge</span></div><button type="button" class="pscl-fab-item" id="pscl-fab-action-brochure"><span style="font-size:0.95rem;">\u{1F4E5}</span><span>Download 2026 Price List &amp; Plans</span></button><a class="pscl-fab-item" id="pscl-fab-action-whatsapp" href="#" target="_blank" rel="noopener"><span style="font-size:0.95rem;">\u{1F4AC}</span><span>Instant WhatsApp Advisory</span></a><button type="button" class="pscl-fab-item" id="pscl-fab-action-calc"><span style="font-size:0.95rem;">\u{1F9EE}</span><span>Cost &amp; EMI Visualizer</span></button><button type="button" class="pscl-fab-item" id="pscl-fab-action-cab"><span style="font-size:0.95rem;">\u{1F697}</span><span>Book Free AC Cab Site Visit</span></button><a class="pscl-fab-item" href="tel:+917744009295" style="border-top:1px solid rgba(212,175,55,0.25);color:#D4AF37;"><span style="font-size:0.95rem;">\u{1F4DE}</span><span>Call Direct: +91 7744009295</span></a></div><button type="button" id="pscl-fab-btn" aria-label="Open Property Concierge">\u2726</button>',document.body.appendChild(t);var a=document.getElementById("pscl-fab-btn"),n=document.getElementById("pscl-fab-menu");a.addEventListener("click",function(o){o.stopPropagation(),n.classList.toggle("pscl-menu-active"),a.textContent=n.classList.contains("pscl-menu-active")?"\u2715":"\u2726"}),document.addEventListener("click",function(o){t.contains(o.target)||(n.classList.remove("pscl-menu-active"),a.textContent="\u2726")}),document.getElementById("pscl-fab-action-brochure").addEventListener("click",function(){n.classList.remove("pscl-menu-active"),a.textContent="\u2726",window.openEnquiryModal&&window.openEnquiryModal()});var i=document.getElementById("pscl-fab-action-calc");i&&i.addEventListener("click",function(){n.classList.remove("pscl-menu-active"),a.textContent="\u2726",L()}),document.getElementById("pscl-fab-action-cab").addEventListener("click",function(){n.classList.remove("pscl-menu-active"),a.textContent="\u2726",A()});var s=document.getElementById("pscl-fab-action-whatsapp");s&&(s.href="https://wa.me/917744009295?text="+M())}}var y=[{id:"misty-greens",name:"Misty Greens NA Plots",typology:"Gated NA Bungalow Plots (1,930 \u2013 3,500+ sq.ft)",baseINR:123e5,priceDisplay:"\u20B91.23 Cr*",rera:"P52100053834",isPlot:!0,gstRate:0,status:"Ready for Registration",minINR:123e5,maxINR:35e6},{id:"rivolo",name:"The Rivolo Luxury Forest Villas",typology:"4 & 5 BHK Bespoke Forest Villas (3,400 \u2013 5,500 sq.ft)",baseINR:389e5,priceDisplay:"\u20B93.89 Cr*",rera:"P52100031560",isPlot:!1,gstRate:.05,status:"Under Construction (Possession Q4 2026)",minINR:389e5,maxINR:55e6},{id:"the-cove",name:"The Cove Duet & Twin Villas",typology:"4 BHK Duet Villas (2,400 \u2013 3,800 sq.ft)",baseINR:285e5,priceDisplay:"\u20B92.85 Cr*",rera:"P52100048536",isPlot:!1,gstRate:.05,status:"Active Bookings",minINR:285e5,maxINR:38e6},{id:"the-canopy",name:"The Canopy Nature Apartments",typology:"2 & 3 BHK Hillside Apartments (850 \u2013 1,250 sq.ft)",baseINR:89e5,priceDisplay:"\u20B989 Lakhs*",rera:"P52100079518",isPlot:!1,gstRate:.05,status:"Possession 2027",minINR:89e5,maxINR:145e5},{id:"highgardens",name:"The Highgardens Terrace Homes",typology:"2 & 3 BHK Stepped Terrace Homes (950 \u2013 1,450 sq.ft)",baseINR:89e5,priceDisplay:"\u20B989 Lakhs*",rera:"P52100053310",isPlot:!1,gstRate:0,status:"Ready to Move In (OC Received)",minINR:89e5,maxINR:135e5},{id:"everglades",name:"Everglades Bavdhan 1 & 2 BHK",typology:"1 & 2 BHK PRO Efficient Homes (480 \u2013 750 sq.ft)",baseINR:485e4,priceDisplay:"\u20B948.50 Lakhs*",rera:"P52100055711",isPlot:!1,gstRate:.05,status:"Active Booking",minINR:485e4,maxINR:75e5},{id:"athashri",name:"Athashri Senior Living (2 & 3 BHK)",typology:"2 & 3 BHK Assisted Senior Living (750 \u2013 1,150 sq.ft)",baseINR:83e5,priceDisplay:"\u20B983 Lakhs*",rera:"P52100077686",isPlot:!1,gstRate:0,status:"Ready & Available",minINR:83e5,maxINR:125e5},{id:"swaniketan",name:"Swaniketan Assisted Care (2 & 3 BHK)",typology:"2 & 3 BHK Assisted Care Living (720 \u2013 1,100 sq.ft)",baseINR:79e5,priceDisplay:"\u20B979 Lakhs*",rera:"P52100052124",isPlot:!1,gstRate:0,status:"Available",minINR:79e5,maxINR:11e6},{id:"verandah",name:"The Verandah Duplex Homes",typology:"3 & 4 BHK Luxury Duplex Homes (1,300 \u2013 2,200 sq.ft)",baseINR:93e5,priceDisplay:"\u20B993 Lakhs*",rera:"P52100002194",isPlot:!1,gstRate:0,status:"Ready to Move In",minINR:93e5,maxINR:16e6},{id:"orchard",name:"Orchard Residences (2 & 3 BHK)",typology:"2 & 3 BHK Hillside Apartments (850 \u2013 1,300 sq.ft)",baseINR:83e5,priceDisplay:"\u20B983 Lakhs*",rera:"P52100055710",isPlot:!1,gstRate:0,status:"Ready to Move In",minINR:83e5,maxINR:125e5}],S={INR:{symbol:"\u20B9",rate:1,label:"\u20B9 INR",locale:"en-IN"},USD:{symbol:"$",rate:86.5,label:"$ USD",locale:"en-US"},AED:{symbol:"AED ",rate:23.55,label:"\u062F.\u0625 AED",locale:"en-AE"},GBP:{symbol:"\xA3",rate:110.2,label:"\xA3 GBP",locale:"en-GB"},EUR:{symbol:"\u20AC",rate:92.8,label:"\u20AC EUR",locale:"de-DE"},SGD:{symbol:"S$",rate:64.5,label:"S$ SGD",locale:"en-SG"}};function g(e,t){var a=S[t]||S.INR,n=e/a.rate;return t==="INR"?n>=1e7?"\u20B9"+(n/1e7).toFixed(2)+" Cr*":n>=1e5?"\u20B9"+(n/1e5).toFixed(2)+" L*":"\u20B9"+Math.round(n).toLocaleString("en-IN"):a.symbol+Math.round(n).toLocaleString("en-US")}function H(e,t,a,n,i,s,o){var r=t==="female"?.04:t==="joint"?.045:.05,l=Math.round(e*r),p=a?Math.min(Math.round(e*.01),3e4):3e4,d=Math.round(e*n),f=e+l+p+d,c=Math.round(e*(1-i/100)),m=o/100/12,u=s*12,b=0;m>0&&u>0&&(b=Math.round(c*m*Math.pow(1+m,u)/(Math.pow(1+m,u)-1)));var v=b*u,j=v-c;return{baseINR:e,sdPct:r,stampDuty:l,regFee:p,gst:d,totalOutlay:f,loanAmount:c,emi:b,totalInterest:j}}function C(){if(document.getElementById("pscl-cost-modal-wrap"))return;var e=document.createElement("style");e.id="pscl-cost-modal-styles",e.textContent=`
      #pscl-cost-modal-wrap {
        position: fixed;
        inset: 0;
        z-index: 999998;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(10, 10, 16, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 1rem;
        box-sizing: border-box;
      }
      #pscl-cost-modal-wrap.pscl-active {
        display: flex;
        opacity: 1;
      }
      .pscl-cost-card {
        background: #14141e;
        border: 1.5px solid rgba(212, 175, 55, 0.5);
        border-radius: 20px;
        max-width: 680px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        color: #ffffff;
        padding: 1.8rem;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.2);
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
      }
      .pscl-curr-pills {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }
      .pscl-curr-btn {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.15);
        color: #fff;
        padding: 0.35rem 0.75rem;
        border-radius: 50px;
        font-size: 0.74rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      }
      .pscl-curr-btn.active, .pscl-curr-btn:hover {
        background: #D4AF37;
        color: #000;
        border-color: #D4AF37;
      }
      .pscl-cost-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1.2rem 0;
      }
      @media (max-width: 600px) {
        .pscl-cost-grid { grid-template-columns: 1fr; }
        .pscl-cost-card { padding: 1.2rem; }
      }
      .pscl-cost-box {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(212,175,55,0.25);
        border-radius: 12px;
        padding: 1rem;
      }
      .pscl-cost-box.highlight {
        background: linear-gradient(135deg, rgba(74,8,8,0.4), rgba(212,175,55,0.15));
        border-color: #D4AF37;
      }
      .pscl-slider-row {
        margin: 0.8rem 0;
      }
      .pscl-slider-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.76rem;
        color: rgba(255,255,255,0.8);
        margin-bottom: 0.3rem;
      }
      .pscl-slider-input {
        width: 100%;
        accent-color: #D4AF37;
        cursor: pointer;
      }
      .pscl-cost-cta-row {
        display: flex;
        gap: 0.8rem;
        margin-top: 1.4rem;
        flex-wrap: wrap;
      }
      .pscl-cost-cta-wa {
        flex: 1.2;
        background: #25D366;
        color: #fff;
        border: none;
        padding: 0.85rem;
        border-radius: 10px;
        font-weight: 800;
        font-size: 0.82rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        text-decoration: none;
        box-shadow: 0 4px 15px rgba(37,211,102,0.4);
      }
      .pscl-cost-cta-cab {
        flex: 1;
        background: linear-gradient(135deg, #6B0D0D, #8B1A1A);
        color: #fff;
        border: 1px solid #D4AF37;
        padding: 0.85rem;
        border-radius: 10px;
        font-weight: 800;
        font-size: 0.82rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-shadow: 0 4px 15px rgba(107,13,13,0.5);
      }
    `,document.head.appendChild(e);var t=document.createElement("div");t.id="pscl-cost-modal-wrap",t.innerHTML=`
      <div class="pscl-cost-card" role="dialog" aria-modal="true" aria-labelledby="pscl-calc-title">
        <button type="button" class="pscl-close-btn" id="pscl-cost-close-btn" aria-label="Close Cost Visualizer">\u2715</button>
        <span class="pscl-badge">\u2726 Interactive Real Estate Visualizer</span>
        <h2 id="pscl-calc-title" style="margin:0 0 0.3rem;font-size:1.35rem;color:#ffffff;font-weight:800;">Enclave Cost, Taxes &amp; EMI Calculator</h2>
        <p style="margin:0 0 1rem;font-size:0.8rem;color:rgba(255,255,255,0.7);">Live Maharashtra Stamp Duty, Registration, Indicative Bank EMI &amp; Global Currency Converter.</p>
        
        <!-- Multi-Currency Selector -->
        <div style="font-size:0.7rem;color:#D4AF37;font-weight:800;margin-bottom:0.4rem;text-transform:uppercase;letter-spacing:0.06em;">Select Currency (NRI Friendly):</div>
        <div class="pscl-curr-pills" id="pscl-curr-pills-wrap">
          <button type="button" class="pscl-curr-btn active" data-curr="INR">\u20B9 INR</button>
          <button type="button" class="pscl-curr-btn" data-curr="USD">$ USD</button>
          <button type="button" class="pscl-curr-btn" data-curr="AED">\u062F.\u0625 AED</button>
          <button type="button" class="pscl-curr-btn" data-curr="GBP">\xA3 GBP</button>
          <button type="button" class="pscl-curr-btn" data-curr="EUR">\u20AC EUR</button>
          <button type="button" class="pscl-curr-btn" data-curr="SGD">S$ SGD</button>
        </div>

        <!-- Enclave Select -->
        <div style="margin-bottom:0.8rem;">
          <label for="pscl-calc-enclave-select" style="display:block;font-size:0.75rem;color:rgba(255,255,255,0.8);margin-bottom:0.3rem;font-weight:700;">Select Enclave &amp; Typology:</label>
          <select id="pscl-calc-enclave-select" style="width:100%;background:#1d1d2b;border:1px solid rgba(212,175,55,0.4);color:#fff;padding:0.65rem 0.8rem;border-radius:10px;font-size:0.82rem;font-weight:700;outline:none;">
            ${y.map(function(o){return'<option value="'+o.id+'">'+o.name+" \u2014 "+o.priceDisplay+" ("+o.rera+")</option>"}).join("")}
          </select>
        </div>

        <!-- Stamp Duty Gender Benefit -->
        <div style="margin-bottom:0.8rem;">
          <span style="display:block;font-size:0.75rem;color:rgba(255,255,255,0.8);margin-bottom:0.3rem;font-weight:700;">Buyer Category (Stamp Duty Concession):</span>
          <div style="display:flex;gap:12px;font-size:0.76rem;">
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;">
              <input type="radio" name="pscl_calc_gender" value="male" checked style="accent-color:#D4AF37;"> Standard (5% Stamp Duty)
            </label>
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;color:#10B981;font-weight:700;">
              <input type="radio" name="pscl_calc_gender" value="female" style="accent-color:#10B981;"> Female Buyer (4% \u2014 Save 1%!)
            </label>
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;">
              <input type="radio" name="pscl_calc_gender" value="joint" style="accent-color:#D4AF37;"> Joint (4.5%)
            </label>
          </div>
        </div>

        <!-- Loan Sliders -->
        <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:0.8rem;margin-bottom:0.8rem;">
          <div class="pscl-slider-row">
            <div class="pscl-slider-label">
              <span>Down Payment: <strong id="pscl-dp-val" style="color:#D4AF37;">20%</strong></span>
              <span id="pscl-dp-amount" style="color:rgba(255,255,255,0.6);">\u20B924.60 L*</span>
            </div>
            <input type="range" id="pscl-dp-slider" min="10" max="50" step="5" value="20" class="pscl-slider-input">
          </div>
          <div class="pscl-slider-row">
            <div class="pscl-slider-label">
              <span>Loan Tenure: <strong id="pscl-tenure-val" style="color:#D4AF37;">20 Years</strong></span>
              <span>Interest Rate: <strong id="pscl-rate-val" style="color:#D4AF37;">8.50%</strong></span>
            </div>
            <input type="range" id="pscl-tenure-slider" min="5" max="30" step="1" value="20" class="pscl-slider-input">
          </div>
        </div>

        <!-- Results Display Cards -->
        <div class="pscl-cost-grid">
          <!-- Card 1: Outlay Breakdown -->
          <div class="pscl-cost-box highlight">
            <span style="display:block;font-size:0.68rem;text-transform:uppercase;color:#D4AF37;font-weight:800;letter-spacing:0.06em;">Indicative Total Outlay</span>
            <div id="pscl-res-total-outlay" style="font-size:1.45rem;font-weight:900;color:#ffffff;margin:0.25rem 0;">\u20B91.29 Cr*</div>
            <div style="font-size:0.73rem;color:rgba(255,255,255,0.75);line-height:1.4;">
              <div>\u2022 Base Agreement: <span id="pscl-res-base" style="color:#fff;font-weight:700;">\u20B91.23 Cr*</span></div>
              <div>\u2022 Stamp Duty: <span id="pscl-res-sd" style="color:#fff;font-weight:700;">\u20B96.15 L*</span></div>
              <div>\u2022 Registration: <span id="pscl-res-reg" style="color:#fff;font-weight:700;">\u20B930,000*</span></div>
              <div>\u2022 GST: <span id="pscl-res-gst" style="color:#fff;font-weight:700;">0% (Nil)</span></div>
            </div>
          </div>

          <!-- Card 2: EMI Visualizer -->
          <div class="pscl-cost-box">
            <span style="display:block;font-size:0.68rem;text-transform:uppercase;color:#10B981;font-weight:800;letter-spacing:0.06em;">Indicative Bank EMI</span>
            <div id="pscl-res-emi" style="font-size:1.45rem;font-weight:900;color:#10B981;margin:0.25rem 0;">\u20B985,420<span style="font-size:0.75rem;font-weight:600;color:rgba(255,255,255,0.7);">/mo</span></div>
            <div style="font-size:0.73rem;color:rgba(255,255,255,0.75);line-height:1.4;">
              <div>\u2022 Loan Amount: <span id="pscl-res-loan" style="color:#fff;font-weight:700;">\u20B998.40 L*</span></div>
              <div>\u2022 Bank Partners: <span style="color:#D4AF37;">SBI, HDFC, ICICI, BoB</span></div>
              <div>\u2022 Tax Benefit: <span style="color:#fff;">Sec 24(b) &amp; 80C</span></div>
            </div>
          </div>
        </div>

        <p style="font-size:0.66rem;color:rgba(255,255,255,0.5);margin:0;line-height:1.3;">*All calculations are indicative estimates. Stamp duty, registration, and tax figures are subject to Maharashtra Government IGR notifications. Final figures as per official agreement for sale.</p>

        <!-- CTAs -->
        <div class="pscl-cost-cta-row">
          <a class="pscl-cost-cta-wa" id="pscl-cost-cta-wa-btn" href="#" target="_blank" rel="noopener">
            <span>\u{1F4AC}</span><span>Send Cost Sheet on WhatsApp</span>
          </a>
          <button type="button" class="pscl-cost-cta-cab" id="pscl-cost-cta-cab-btn">
            <span>\u{1F697}</span><span>Book Free AC Cab Site Visit</span>
          </button>
        </div>
      </div>
    `,document.body.appendChild(t);var a="INR";function n(){for(var o=document.getElementById("pscl-calc-enclave-select"),r=o?o.value:"misty-greens",l=0;l<y.length;l++)if(y[l].id===r)return y[l];return y[0]}function i(){var o=n(),r=document.querySelector('input[name="pscl_calc_gender"]:checked'),l=r?r.value:"male",p=parseInt(document.getElementById("pscl-dp-slider").value,10),d=parseInt(document.getElementById("pscl-tenure-slider").value,10),f=8.5;document.getElementById("pscl-dp-val").textContent=p+"%",document.getElementById("pscl-tenure-val").textContent=d+" Years";var c=H(o.baseINR,l,o.isPlot,o.gstRate,p,d,f),m=Math.round(o.baseINR*(p/100));document.getElementById("pscl-dp-amount").textContent=g(m,a),document.getElementById("pscl-res-total-outlay").textContent=g(c.totalOutlay,a),document.getElementById("pscl-res-base").textContent=g(c.baseINR,a),document.getElementById("pscl-res-sd").textContent=g(c.stampDuty,a)+" ("+c.sdPct*100+"%)",document.getElementById("pscl-res-reg").textContent=g(c.regFee,a),document.getElementById("pscl-res-gst").textContent=o.gstRate>0?g(c.gst,a)+" (5%)":"0% (Exempt)";var u=a==="INR"?"\u20B9"+c.emi.toLocaleString("en-IN"):g(c.emi,a);document.getElementById("pscl-res-emi").innerHTML=u+'<span style="font-size:0.75rem;font-weight:600;color:rgba(255,255,255,0.7);">/mo</span>',document.getElementById("pscl-res-loan").textContent=g(c.loanAmount,a);var b=document.getElementById("pscl-cost-cta-wa-btn");if(b){var v="Hello, I generated a cost breakdown on your website:%0A\u2022 Enclave: "+encodeURIComponent(o.name)+"%0A\u2022 Base Price: "+encodeURIComponent(g(c.baseINR,"INR"))+" ("+encodeURIComponent(g(c.baseINR,a))+")%0A\u2022 Stamp Duty: "+encodeURIComponent(g(c.stampDuty,"INR"))+"%0A\u2022 Total Estimated Outlay: "+encodeURIComponent(g(c.totalOutlay,"INR"))+"%0A\u2022 Est. Monthly EMI: "+encodeURIComponent("\u20B9"+c.emi.toLocaleString("en-IN")+"/mo")+"%0A%0APlease share the official builder cost sheet, payment schedule, and site visit slot.";b.href="https://wa.me/917744009295?text="+v}}var s=document.querySelectorAll(".pscl-curr-btn");s.forEach(function(o){o.addEventListener("click",function(){s.forEach(function(r){r.classList.remove("active")}),o.classList.add("active"),a=o.getAttribute("data-curr")||"INR",i()})}),document.getElementById("pscl-calc-enclave-select").addEventListener("change",i),document.querySelectorAll('input[name="pscl_calc_gender"]').forEach(function(o){o.addEventListener("change",i)}),document.getElementById("pscl-dp-slider").addEventListener("input",i),document.getElementById("pscl-tenure-slider").addEventListener("input",i),document.getElementById("pscl-cost-close-btn").addEventListener("click",function(){t.classList.remove("pscl-active")}),t.addEventListener("click",function(o){o.target===t&&t.classList.remove("pscl-active")}),document.getElementById("pscl-cost-cta-wa-btn").addEventListener("click",function(){var o=n();typeof gtag=="function"&&(gtag("event","generate_lead",{event_category:"Cost Visualizer",event_label:o.name,value:100,currency:"INR"}),gtag("event","conversion",{send_to:"AW-17430583486",event_category:"Cost Sheet Lead",event_label:o.name}))}),document.getElementById("pscl-cost-cta-cab-btn").addEventListener("click",function(){t.classList.remove("pscl-active"),A()}),i()}function L(e){C();var t=document.getElementById("pscl-cost-modal-wrap");if(t){if(e){var a=document.getElementById("pscl-calc-enclave-select");if(a){for(var n=0;n<a.options.length;n++)if(a.options[n].value===e){a.selectedIndex=n,a.dispatchEvent(new Event("change"));break}}}t.classList.add("pscl-active")}}function k(){if(!document.getElementById("pscl-vip-cab-wrap")){var e=document.createElement("style");e.id="pscl-cab-modal-styles",e.textContent=`
      #pscl-vip-cab-wrap {
        position: fixed;
        inset: 0;
        z-index: 999999;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(10, 10, 16, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 1rem;
        box-sizing: border-box;
      }
      #pscl-vip-cab-wrap.pscl-active {
        display: flex;
        opacity: 1;
      }
      .pscl-cab-card {
        background: #151522;
        border: 1.5px solid #D4AF37;
        border-radius: 20px;
        max-width: 500px;
        width: 100%;
        color: #ffffff;
        padding: 1.8rem;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 175, 55, 0.25);
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
      }
      .pscl-cab-field {
        margin-bottom: 0.85rem;
      }
      .pscl-cab-field label {
        display: block;
        font-size: 0.76rem;
        color: rgba(255,255,255,0.8);
        font-weight: 700;
        margin-bottom: 0.25rem;
      }
      .pscl-cab-field input, .pscl-cab-field select {
        width: 100%;
        background: #1e1e2d;
        border: 1px solid rgba(212,175,55,0.4);
        color: #fff;
        padding: 0.7rem 0.85rem;
        border-radius: 10px;
        font-size: 0.85rem;
        box-sizing: border-box;
        outline: none;
      }
      .pscl-cab-submit {
        width: 100%;
        background: linear-gradient(135deg, #6B0D0D, #8B1A1A);
        color: #ffffff;
        border: 1.5px solid #D4AF37;
        padding: 0.9rem;
        border-radius: 10px;
        font-size: 0.86rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-shadow: 0 6px 20px rgba(107,13,13,0.5);
      }
    `,document.head.appendChild(e);var t=document.createElement("div");t.id="pscl-vip-cab-wrap",t.innerHTML=`
      <div class="pscl-cab-card" role="dialog" aria-modal="true" aria-labelledby="pscl-cab-title">
        <button type="button" class="pscl-close-btn" id="pscl-cab-close-btn" aria-label="Close VIP Cab Modal">\u2715</button>
        <span class="pscl-badge" style="background:rgba(37,211,102,0.15);border-color:#25D366;color:#25D366;">\u{1F697} Complimentary VIP Chauffeur</span>
        <h2 id="pscl-cab-title" style="margin:0 0 0.3rem;font-size:1.35rem;color:#ffffff;font-weight:800;">Book Free AC Cab Site Visit</h2>
        <p style="margin:0 0 1.1rem;font-size:0.8rem;color:rgba(255,255,255,0.75);">Doorstep pickup and drop anywhere in Pune to Paranjape Forest Trails, Bhugaon.</p>
        
        <form id="pscl-cab-form">
          <div class="pscl-cab-field">
            <label for="pscl-cab-name">Full Name *</label>
            <input type="text" id="pscl-cab-name" required placeholder="e.g. Rahul Sharma">
          </div>
          <div class="pscl-cab-field">
            <label for="pscl-cab-phone">WhatsApp / Mobile Number *</label>
            <input type="tel" id="pscl-cab-phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number">
          </div>
          <div class="pscl-cab-field">
            <label for="pscl-cab-hub">Select Free Pickup Location Hub *</label>
            <select id="pscl-cab-hub" required>
              <option value="Chandani Chowk Flyover Junction (7 Mins)">Chandani Chowk Flyover Junction (7 Mins)</option>
              <option value="Bavdhan Paud Road (5 Mins)">Bavdhan / Paud Road (5 Mins)</option>
              <option value="Kothrud Nal Stop / Vanaz Metro (10 Mins)">Kothrud Nal Stop / Vanaz Metro (10 Mins)</option>
              <option value="Baner / Balewadi High Street (15 Mins)">Baner / Balewadi High Street (15 Mins)</option>
              <option value="Hinjewadi Phase 1 / 2 / 3 (20 Mins)">Hinjewadi Phase 1 / 2 / 3 (20 Mins)</option>
              <option value="Pune Airport / Railway Station">Pune Airport (PNQ) / Pune Railway Station</option>
              <option value="Direct at Site / Self-Drive">Direct at Site / Self-Drive</option>
            </select>
          </div>
          <div class="pscl-cab-field">
            <label for="pscl-cab-date">Preferred Site Visit Date *</label>
            <select id="pscl-cab-date" required>
              <option value="Tomorrow (Morning 10:30 AM)">Tomorrow (Morning 10:30 AM)</option>
              <option value="Tomorrow (Afternoon 3:30 PM)">Tomorrow (Afternoon 3:30 PM)</option>
              <option value="This Upcoming Saturday">This Upcoming Saturday</option>
              <option value="This Upcoming Sunday">This Upcoming Sunday</option>
              <option value="Next Week / Custom Date">Next Week / Custom Date</option>
            </select>
          </div>
          <div class="pscl-cab-field">
            <label for="pscl-cab-interest">Enclave of Primary Interest</label>
            <select id="pscl-cab-interest">
              <option value="Misty Greens NA Plots (From \u20B91.23 Cr*)">Misty Greens NA Plots (From \u20B91.23 Cr*)</option>
              <option value="The Rivolo Luxury Villas (From \u20B93.89 Cr*)">The Rivolo Luxury Villas (From \u20B93.89 Cr*)</option>
              <option value="The Cove Twin Bungalows (From \u20B92.85 Cr*)">The Cove Twin Bungalows (From \u20B92.85 Cr*)</option>
              <option value="The Canopy Hillside Flats (From \u20B989 L*)">The Canopy Hillside Flats (From \u20B989 L*)</option>
              <option value="Everglades 1 & 2 BHK (From \u20B948.50 L*)">Everglades 1 & 2 BHK (From \u20B948.50 L*)</option>
              <option value="Athashri Senior Living (From \u20B983 L*)">Athashri Senior Living (From \u20B983 L*)</option>
              <option value="Swaniketan Assisted Living (From \u20B979 L*)">Swaniketan Assisted Living (From \u20B979 L*)</option>
              <option value="All Enclaves / General Tour">All Enclaves / 190-Acre General Tour</option>
            </select>
          </div>
          <button type="submit" class="pscl-cab-submit">
            <span>\u{1F697}</span><span>Confirm VIP Chauffeur Booking</span>
          </button>
          <p style="font-size:0.68rem;color:rgba(255,255,255,0.7);text-align:center;margin:0.5rem 0 0.2rem;line-height:1.4;">
            \u{1F512} By submitting, you agree to our <a href="/privacy-policy/" target="_blank" rel="noopener" style="color:#D4AF37;text-decoration:underline;">Privacy Policy</a> &amp; authorize verified site visit coordination via Call/WhatsApp.
          </p>
        </form>
      </div>
    `,document.body.appendChild(t),document.getElementById("pscl-cab-close-btn").addEventListener("click",function(){t.classList.remove("pscl-active")}),t.addEventListener("click",function(a){a.target===t&&t.classList.remove("pscl-active")}),document.getElementById("pscl-cab-form").addEventListener("submit",function(a){a.preventDefault();var n=document.getElementById("pscl-cab-name").value.trim(),i=document.getElementById("pscl-cab-phone").value.trim(),s=document.getElementById("pscl-cab-hub").value,o=document.getElementById("pscl-cab-date").value,r=document.getElementById("pscl-cab-interest").value;typeof gtag=="function"&&(gtag("event","generate_lead",{event_category:"VIP Cab Booking",event_label:r+" | "+s,value:500,currency:"INR"}),gtag("event","conversion",{send_to:"AW-17430583486",event_category:"VIP Site Visit",event_label:r}));var l="Hello, I booked a VIP AC Chauffeur Site Visit on your website:%0A\u2022 Name: "+encodeURIComponent(n)+"%0A\u2022 Phone: "+encodeURIComponent(i)+"%0A\u2022 Pickup Location: "+encodeURIComponent(s)+"%0A\u2022 Date & Slot: "+encodeURIComponent(o)+"%0A\u2022 Interested Enclave: "+encodeURIComponent(r)+"%0A%0APlease confirm driver assignment and chauffeur pickup time.";window.open("https://wa.me/917744009295?text="+l,"_blank"),t.classList.remove("pscl-active"),alert("Thank you "+n+"! Your VIP Chauffeur site visit request has been received. Our concierge team is coordinating your private AC cab details.")})}}function A(){k();var e=document.getElementById("pscl-vip-cab-wrap");e&&e.classList.add("pscl-active")}window.openCostVisualizerModal=L,window.openVipCabModal=A,window.psclEnclaves=y;function R(){_(),O(),"requestIdleCallback"in window?window.requestIdleCallback(function(){C(),k()},{timeout:3500}):setTimeout(function(){C(),k()},2500)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",R):R()})();
