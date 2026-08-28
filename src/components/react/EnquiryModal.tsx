import React, { useState, useEffect } from 'react';

interface EnquiryModalProps {
  initialProject?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ initialProject = 'all' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(initialProject);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappOptin, setWhatsappOptin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Listen for custom trigger event
    const handleOpen = (e: CustomEvent) => {
      if (e.detail && e.detail.project) {
        setSelectedProject(e.detail.project);
      }
      setIsOpen(true);
    };

    window.addEventListener('open-enquiry-modal' as any, handleOpen);
    (window as any).openEnquiryModal = (projectOrEvent?: any) => {
      if (typeof projectOrEvent === 'string') {
        setSelectedProject(projectOrEvent);
      }
      setIsOpen(true);
    };

    return () => {
      window.removeEventListener('open-enquiry-modal' as any, handleOpen);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Submit to Cloudflare Pages Serverless Edge API
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          phone: `+91${phone}`,
          email: email || 'N/A',
          project: selectedProject,
          whatsappOptin,
          source: window.location.pathname,
          timestamp: new Date().toISOString()
        })
      });

      // 2. Direct fallback to standard formsubmit if offline
      if (!res.ok) {
        const formData = new FormData();
        formData.append('name', fullName);
        formData.append('phone', `+91${phone}`);
        formData.append('email', email);
        formData.append('interest', selectedProject);
        formData.append('_subject', `New Website Lead - ${selectedProject}`);
        formData.append('_captcha', 'false');
        await fetch('https://formsubmit.co/propsmartrealty@gmail.com', {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = '/thank-you.html';
      }, 1200);
    } catch (err) {
      console.error('Lead submission fallback:', err);
      window.location.href = '/thank-you.html';
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="concierge-modal"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100005,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
        boxSizing: 'border-box'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.86)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)'
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(165deg, #141416 0%, #0a0a0c 100%)',
          width: '100%',
          maxWidth: '440px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.95), 0 0 30px rgba(212,175,55,0.18)',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          padding: 0,
          boxSizing: 'border-box',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          animation: 'sovereignModalEntry 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top Accent Line */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #6B0D0D, #D4AF37, #6B0D0D)', flexShrink: 0 }} />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close Modal"
          type="button"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.85rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            fontSize: '1rem',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          ✕
        </button>

        <div style={{ padding: '1.25rem 1.4rem 1.1rem', overflowY: 'auto', WebkitOverflowScrolling: 'touch', boxSizing: 'border-box' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '0.9rem' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#D4AF37',
                fontWeight: 800,
                fontSize: '0.62rem',
                letterSpacing: '0.12rem',
                textTransform: 'uppercase',
                padding: '0.2rem 0.75rem',
                borderRadius: '50px',
                marginBottom: '0.4rem'
              }}
            >
              ✦ OFFICIAL SALES DESK
            </span>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', color: '#ffffff', margin: '0 0 0.2rem', lineHeight: 1.2, fontWeight: 700 }}>
              Get Instant <span style={{ color: '#D4AF37' }}>Price & Brochure</span>
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.76rem', lineHeight: 1.35, margin: 0 }}>
              Direct developer pricing, master blueprints & site visit guidance.
            </p>
          </div>

          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
              <h4 style={{ color: '#D4AF37', fontSize: '1.2rem', margin: '0 0 0.5rem' }}>Request Received!</h4>
              <p style={{ color: '#fff', fontSize: '0.85rem', margin: 0 }}>Redirecting to your VIP brochure package...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Project Select */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                  Project Interest
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      background: '#1a1a1c',
                      color: '#ffffff',
                      border: '1.5px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      padding: '0.55rem 0.8rem',
                      fontSize: '0.8rem',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="all">🌟 All Paranjape Forest Trails Projects</option>
                    <option value="misty-greens">🌳 Misty Greens (NA Bungalow Plots from ₹1.23 Cr*)</option>
                    <option value="the-rivolo">🏡 The Rivolo (4 & 5 BHK Luxury Forest Villas from ₹3.89 Cr*)</option>
                    <option value="the-cove">🏰 The Cove (4 BHK Duet Villas from ₹2.85 Cr*)</option>
                    <option value="athashri-senior-living">👴 Athashri (2 BHK Senior Living from ₹83 Lakhs*)</option>
                    <option value="everglades">🏢 Everglades (1 & 2 BHK PRO Homes from ₹48.50 Lakhs*)</option>
                    <option value="the-canopy">🌅 The Canopy (2 & 3 BHK Nature Flats from ₹89 Lakhs*)</option>
                    <option value="the-highgardens">🌿 The Highgardens (Terrace Homes from ₹89 Lakhs*)</option>
                    <option value="verandah">🏡 Verandah (Duplex Homes from ₹93 Lakhs*)</option>
                    <option value="orchard-residences">🍃 Orchard Residences (Hillside Homes from ₹83 Lakhs*)</option>
                    <option value="swaniketan">🤝 Swaniketan (Assisted Living from ₹79 Lakhs*)</option>
                  </select>
                  <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#D4AF37', fontSize: '0.65rem' }}>
                    ▼
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                  style={{
                    width: '100%',
                    background: '#1a1a1c',
                    color: '#ffffff',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.55rem 0.8rem',
                    fontSize: '0.8rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                  Mobile Phone Number *
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div
                    style={{
                      padding: '0.55rem 0.7rem',
                      background: '#1a1a1c',
                      border: '1.5px solid rgba(212, 175, 55, 0.35)',
                      borderRadius: '8px',
                      color: '#D4AF37',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>🇮🇳</span> +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                    style={{
                      flex: 1,
                      width: '100%',
                      background: '#1a1a1c',
                      color: '#ffffff',
                      border: '1.5px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '0.55rem 0.8rem',
                      fontSize: '0.8rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                  Email Address (For Instant PDF Brochure)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@gmail.com"
                  style={{
                    width: '100%',
                    background: '#1a1a1c',
                    color: '#ffffff',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.55rem 0.8rem',
                    fontSize: '0.8rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* WhatsApp Opt-in */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(37, 211, 102, 0.08)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(37, 211, 102, 0.25)'
                }}
              >
                <input
                  type="checkbox"
                  id="wa-modal-optin"
                  checked={whatsappOptin}
                  onChange={(e) => setWhatsappOptin(e.target.checked)}
                  style={{ width: '15px', height: '15px', accentColor: '#25D366', cursor: 'pointer', flexShrink: 0 }}
                />
                <label htmlFor="wa-modal-optin" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.7rem', cursor: 'pointer', lineHeight: 1.25 }}>
                  Send brochure, pricing sheet & floor plans on WhatsApp
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #6B0D0D 0%, #8B1A1A 50%, #D4AF37 100%)',
                  color: '#ffffff',
                  border: '1px solid #D4AF37',
                  padding: '0.75rem 1.2rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 20px rgba(107, 13, 13, 0.45)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  marginTop: '0.15rem',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'PROCESSING...' : 'GET INSTANT BROCHURE & PRICING →'}
              </button>

              {/* Trust Badges */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '0.1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>
                <span>🔒 100% Privacy</span>
                <span>•</span>
                <span>🏛️ Direct PSCL Advisory</span>
                <span>•</span>
                <span>📜 Zero Spam</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
