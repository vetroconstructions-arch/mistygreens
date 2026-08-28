import React, { useState } from 'react';

export const StrategicKnowledgeHub: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are the bungalow plots in Misty Greens 100% PMRDA and MahaRERA approved?",
      a: "Yes. Misty Greens bungalow plots (1,930 – 3,500+ sq.ft) are 100% PMRDA sanctioned residential NA plots registered under MahaRERA (P52100053834). Each plot comes with an independent 7/12 extract, clear demarcation, underground water/electricity connections, and wide internal concrete roads."
    },
    {
      q: "What is the starting price for plots, villas, and apartments in 2026?",
      a: "Plots in Misty Greens start from ₹1.23 Cr*, luxury 4 & 5 BHK forest villas in The Rivolo start from ₹3.89 Cr*, 4 BHK Duet villas in The Cove start from ₹2.85 Cr*, and 2 & 3 BHK nature apartments in The Canopy and Highgardens start from ₹89 Lakhs*. Everglades PRO homes start from ₹48.50 Lakhs*, and Athashri Senior Living starts from ₹83 Lakhs*."
    },
    {
      q: "What amenities are fully functional inside the 190-acre township?",
      a: "The township features The Cliff Club (a 40,000+ sq.ft sports and lifestyle complex with an Olympic-sized pool and squash courts), a dedicated Equestrian Academy with professional horse riding trainers, Sri Sri Ravishankar Vidya Mandir (SSRVM) ICSE School, and over 1,000+ preserved indigenous trees across nature trails."
    },
    {
      q: "How connected is Forest Trails to Chandani Chowk, Kothrud, and Hinjewadi?",
      a: "Following the completion of the multi-level Chandani Chowk Flyover system, Forest Trails in Bhugaon is just 5 minutes (3.8 km) from Chandani Chowk, 10–12 minutes from Kothrud & Bavdhan, and 20 minutes from Hinjewadi Phase 1 via the Paud-Pirangut bypass road."
    },
    {
      q: "What assisted living care is provided at Athashri Senior Living?",
      a: "Athashri Bhugaon (P52100077686) offers purpose-built 2 BHK senior homes with wheelchair-accessible designs, anti-skid flooring, 24/7 on-call nurses and doctors, daily pure vegetarian dining, emergency pull-cords, and daily housekeeping."
    }
  ];

  const commuteMetrics = [
    { label: "Chandani Chowk", time: "5 Mins", dist: "3.8 km", note: "Direct Paud Road Express Access" },
    { label: "Bavdhan & Kothrud", time: "10-12 Mins", dist: "6.5 km", note: "Metro & Commercial Hubs" },
    { label: "Hinjewadi IT Park", time: "20 Mins", dist: "14 km", note: "Phase 1 / Tech Hubs" },
    { label: "SSRVM ICSE School", time: "On-Campus", dist: "0 km", note: "Inside 190-Acre Township" },
    { label: "Sahyadri Hospital", time: "12 Mins", dist: "7.2 km", note: "Multi-Specialty Healthcare" },
    { label: "The Cliff Club", time: "Walking Dist", dist: "300 m", note: "40k sq.ft Sports Hub" }
  ];

  const editorialArticles = [
    {
      tag: "INFRASTRUCTURE & ROI",
      title: "Chandani Chowk Flyover & PMRDA Ring Road: Bhugaon Property Appreciation Guide 2026",
      desc: "An in-depth analysis of capital appreciation trends, infrastructure catalysts, and why West Pune's NA land market is outperforming high-density apartments.",
      link: "/chandani-chowk-flyover-connectivity-impact/",
      readTime: "4 Min Read"
    },
    {
      tag: "BUYER'S DUE DILIGENCE",
      title: "Bavdhan vs. Bhugaon: NA Bungalow Plot Title Verification & 7/12 Extract Checklist",
      desc: "Essential legal parameters for buying PMRDA approved bungalow plots in Pune West, covering sanction layouts, zone certificates, and builder track records.",
      link: "/bavdhan-vs-bhugaon-property-appreciation/",
      readTime: "5 Min Read"
    },
    {
      tag: "BIOPHILIC LIVING",
      title: "Why Micro-Climate Townships are the New Standard for Luxury Real Estate in Pune",
      desc: "Exploring the environmental, health, and AQI advantages of living in a 190-acre valley township surrounded by 30,000+ indigenous trees and equestrian arenas.",
      link: "/paranjape-forest-trails-township-bhugaon-amenities/the-cliff-club/",
      readTime: "3 Min Read"
    }
  ];

  return (
    <div style={{ marginTop: '5rem' }}>
      
      {/* 1. Location & Connectivity Infographics Grid */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: '#D4AF37', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.72rem', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', padding: '0.35rem 1.2rem', borderRadius: '50px', display: 'inline-block' }}>
            📍 Strategic Connectivity & Proximity
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#ffffff', margin: '0.8rem 0 0.4rem' }}>
            Minutes From Everywhere, <span style={{ color: '#D4AF37' }}>Miles From Chaos</span>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto' }}>
            Seamless access to Kothrud, Bavdhan, and Hinjewadi IT Park via the multi-level Chandani Chowk junction.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
          {commuteMetrics.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                background: 'rgba(18, 18, 24, 0.75)',
                border: '1.5px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '16px',
                padding: '1.2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: 900, color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}>
                {item.time}
              </span>
              <strong style={{ display: 'block', color: '#ffffff', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                {item.label}
              </strong>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.74rem', marginTop: '0.2rem' }}>
                {item.dist} • {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Strategic Editorial Insights & Guides */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: '#D4AF37', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.72rem', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', padding: '0.35rem 1.2rem', borderRadius: '50px', display: 'inline-block' }}>
            📑 Real Estate Advisory & Insights
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#ffffff', margin: '0.8rem 0 0.4rem' }}>
            Township Ledger & <span style={{ color: '#D4AF37' }}>Investment Artifacts</span>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto' }}>
            Comprehensive market research, infrastructure analysis, and due diligence resources.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem' }}>
          {editorialArticles.map((article, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                background: 'rgba(18, 18, 24, 0.75)',
                border: '1.5px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '18px',
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ color: '#D4AF37', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {article.tag}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem' }}>
                    {article.readTime}
                  </span>
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: '#ffffff', lineHeight: 1.35, margin: '0 0 0.6rem' }}>
                  {article.title}
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.82rem', lineHeight: 1.55, margin: 0 }}>
                  {article.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.4rem' }}>
                <a
                  href={article.link}
                  style={{
                    color: '#D4AF37',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    letterSpacing: '0.05em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  READ ADVISORY REPORT &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Collapsible FAQ Accordion */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
          <span style={{ color: '#D4AF37', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.72rem', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', padding: '0.35rem 1.2rem', borderRadius: '50px', display: 'inline-block' }}>
            ✦ Frequently Asked Questions
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#ffffff', margin: '0.8rem 0 0.4rem' }}>
            Buyer Guidance & <span style={{ color: '#D4AF37' }}>MahaRERA FAQs</span>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88rem', margin: 0 }}>
            Clear, transparent answers on sanctions, plot approvals, possession timelines, and pricing.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  background: 'rgba(18, 18, 24, 0.75)',
                  border: isOpen ? '1.5px solid rgba(212, 175, 55, 0.6)' : '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.4rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '1rem'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: '#D4AF37', fontSize: '1.1rem', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}>
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 1.4rem 1.2rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.86rem', lineHeight: 1.65, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
