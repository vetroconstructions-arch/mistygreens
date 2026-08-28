import React, { useState } from 'react';
import { PARANJAPE_PROJECTS } from '../../data/projects';

export const ProjectPortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '✦ ALL ENCLAVES', count: PARANJAPE_PROJECTS.length },
    { id: 'plots', label: '🏡 NA PLOTS', count: PARANJAPE_PROJECTS.filter((p) => p.category === 'plots').length },
    { id: 'villas', label: '🏰 LUXURY VILLAS', count: PARANJAPE_PROJECTS.filter((p) => p.category === 'villas').length },
    { id: 'apartments', label: '🏢 APARTMENTS', count: PARANJAPE_PROJECTS.filter((p) => p.category === 'apartments').length },
    { id: 'senior-living', label: '👴 SENIOR LIVING', count: PARANJAPE_PROJECTS.filter((p) => p.category === 'senior-living').length },
    { id: 'amenities', label: '🏊 TOWNSHIP AMENITIES', count: PARANJAPE_PROJECTS.filter((p) => p.category === 'amenities').length }
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PARANJAPE_PROJECTS
      : PARANJAPE_PROJECTS.filter((p) => p.category === activeCategory);

  const auraColorMap: Record<string, string> = {
    plots: 'rgba(16, 185, 129, 0.18)',
    villas: 'rgba(212, 175, 55, 0.22)',
    apartments: 'rgba(59, 130, 246, 0.18)',
    'senior-living': 'rgba(245, 158, 11, 0.2)',
    amenities: 'rgba(168, 85, 247, 0.18)'
  };

  return (
    <div style={{ marginTop: '2.5rem' }}>
      {/* Reactive Category Filter Switcher */}
      <div
        id="enclave-filter-bar"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '960px',
          margin: '0 auto 2.8rem',
          padding: '0.5rem',
          background: 'rgba(20, 20, 26, 0.85)',
          border: '1.5px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '50px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #6B0D0D, #8B1A1A)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                border: isActive ? '1.5px solid #D4AF37' : '1px solid transparent',
                borderRadius: '50px',
                padding: '0.55rem 1.15rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 6px 20px rgba(107, 13, 13, 0.5), 0 0 15px rgba(212, 175, 55, 0.3)' : 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: '0.65rem',
                  opacity: 0.9,
                  background: isActive ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  padding: '1px 7px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reactive Project Cards Grid */}
      <div
        id="project-cards-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}
      >
        {filteredProjects.map((project) => {
          const auraGlow = auraColorMap[project.category] || 'rgba(212, 175, 55, 0.18)';
          return (
            <div
              key={project.id}
              className="cluster-card"
              data-category={project.category}
              style={{
                background: `radial-gradient(circle at 50% 0%, ${auraGlow} 0%, #111116 75%)`,
                border: '1.5px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '22px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 15px 35px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.1)',
                animation: 'cardFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Card Header & Media */}
              <div style={{ position: 'relative', height: '225px', overflow: 'hidden', background: '#000' }}>
                <img
                  src={project.image}
                  alt={project.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  loading="lazy"
                  decoding="async"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)' }} />

                {/* Starting Price Pill */}
                {project.priceNumeric > 0 && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #8B1A1A, #5A0A0A)',
                        color: '#fff',
                        padding: '0.32rem 0.85rem',
                        borderRadius: '50px',
                        fontWeight: 900,
                        fontSize: '0.76rem',
                        border: '1px solid #D4AF37',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
                      }}
                    >
                      {project.price}
                    </span>
                  </div>
                )}

                {/* Typology Badge */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                  <span
                    style={{
                      background: project.categoryBadgeColor,
                      color: project.category === 'villas' || project.category === 'amenities' ? '#000' : '#fff',
                      padding: '0.28rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                    }}
                  >
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', color: '#ffffff', margin: '0 0 0.4rem', lineHeight: 1.2 }}>
                    {project.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '1rem' }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Spec Highlights */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', padding: '0.8rem 1rem', borderRadius: '12px', marginBottom: '0.9rem' }}>
                    {project.specs.slice(0, 2).map((spec, i) => (
                      <div key={i}>
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{spec.label}</span>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: '#fff', marginTop: '2px' }}>{spec.value}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Prominent MahaRERA Verification Strip */}
                  <div
                    style={{
                      marginBottom: '1rem',
                      background: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: '#D4AF37', fontWeight: 800, letterSpacing: '0.03em', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '6px', height: '6px', background: '#25D366', borderRadius: '50%', display: 'inline-block' }} />
                      📜 MahaRERA: {project.reraNumber}
                    </span>
                    <a
                      href={project.reraLink || 'https://maharera.maharashtra.gov.in/'}
                      target="_blank"
                      rel="noopener"
                      style={{ fontSize: '0.68rem', color: '#25D366', fontWeight: 800, textDecoration: 'underline' }}
                    >
                      Verify ↗
                    </a>
                  </div>

                  {/* Conversion Actions */}
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <a
                      href={`https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(project.name)}%20at%20Paranjape%20Forest%20Trails%20Bhugaon.`}
                      target="_blank"
                      rel="noopener"
                      style={{
                        flex: 1,
                        background: '#25D366',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '0.8rem 0.5rem',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '0.74rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        boxShadow: '0 4px 15px rgba(37,211,102,0.35)'
                      }}
                    >
                      💬 WHATSAPP
                    </a>
                    <a
                      href={project.url}
                      style={{
                        flex: 1.4,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #6B0D0D, #8B1A1A)',
                        color: '#fff',
                        border: '1.5px solid #D4AF37',
                        padding: '0.8rem 0.8rem',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '0.74rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(107,13,13,0.5)',
                        letterSpacing: '0.05em'
                      }}
                    >
                      EXPLORE ENCLAVE →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
