import React from 'react';

export const QuickContactBar: React.FC = () => {
  const handleEnquireClick = () => {
    if ((window as any).openEnquiryModal) {
      (window as any).openEnquiryModal();
    } else {
      const modal = document.getElementById('heritage-concierge');
      if (modal) modal.style.display = 'flex';
    }
  };

  return (
    <aside
      aria-label="Quick Action Bar"
      className="mobile-quick-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(10, 10, 12, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '0.5rem 1rem 0.65rem',
        display: 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.8)'
      }}
    >
      <a
        href="tel:+917744009295"
        style={{
          flex: 1,
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '0.65rem 0.4rem',
          borderRadius: '10px',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '0.74rem',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px'
        }}
      >
        📞 CALL
      </a>

      <a
        href="https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Paranjape%20Forest%20Trails%20Bhugaon%20Township."
        target="_blank"
        rel="noopener"
        style={{
          flex: 1.2,
          background: '#25D366',
          color: '#ffffff',
          padding: '0.65rem 0.4rem',
          borderRadius: '10px',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '0.74rem',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          boxShadow: '0 4px 15px rgba(37,211,102,0.35)'
        }}
      >
        💬 WHATSAPP
      </a>

      <button
        onClick={handleEnquireClick}
        style={{
          flex: 1.4,
          background: 'linear-gradient(135deg, #6B0D0D, #8B1A1A)',
          color: '#ffffff',
          border: '1px solid #D4AF37',
          padding: '0.65rem 0.4rem',
          borderRadius: '10px',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '0.74rem',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(107,13,13,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px'
        }}
      >
        ✨ ENQUIRE NOW
      </button>
    </aside>
  );
};
