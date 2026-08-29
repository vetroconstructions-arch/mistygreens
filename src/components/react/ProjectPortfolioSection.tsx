import React, { useState } from 'react';
import { PARANJAPE_PROJECTS } from '../../data/projects';

export const ProjectPortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cardModes, setCardModes] = useState<Record<string, 'exterior' | 'layout' | 'floorplan'>>({});
  const [lightboxLayout, setLightboxLayout] = useState<{ name: string; image: string } | null>(null);

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

  const toggleCardMode = (projectId: string, mode: 'exterior' | 'layout' | 'floorplan') => {
    setCardModes((prev) => ({ ...prev, [projectId]: mode }));
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
          const currentMode = cardModes[project.id] || 'exterior';
          const displayedImage =
            currentMode === 'floorplan' && project.floorPlan
              ? project.floorPlan
              : currentMode === 'layout' && project.masterLayout
              ? project.masterLayout
              : project.image;

          const isPlanMode = currentMode === 'layout' || currentMode === 'floorplan';

          return (
            <div
              key={project.id}
              className="cluster-card"
              data-category={project.category}
              style={{
                background: `radial-gradient(circle at 50% 0%, ${auraGlow} 0%, #161320 75%)`,
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
              <div style={{ position: 'relative', height: '235px', overflow: 'hidden', background: '#0f0d14' }}>
                <img
                  src={displayedImage}
                  alt={
                    currentMode === 'floorplan'
                      ? `${project.name} Floor Plan`
                      : currentMode === 'layout'
                      ? `${project.name} Master Layout Plan`
                      : project.alt
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: isPlanMode ? 'contain' : 'cover',
                    objectPosition: 'center',
                    background: isPlanMode ? '#100e16' : '#0f0d14',
                    transition: 'transform 0.4s ease, opacity 0.3s ease',
                    cursor: isPlanMode ? 'zoom-in' : 'default'
                  }}
                  onClick={() => {
                    if (currentMode === 'floorplan' && project.floorPlan) {
                      setLightboxLayout({ name: `${project.name} — Floor Plan`, image: project.floorPlan });
                    } else if (currentMode === 'layout' && project.masterLayout) {
                      setLightboxLayout({ name: `${project.name} — Master Layout`, image: project.masterLayout });
                    } else if (project.floorPlan) {
                      setLightboxLayout({ name: `${project.name} — Floor Plan`, image: project.floorPlan });
                    } else if (project.masterLayout) {
                      setLightboxLayout({ name: `${project.name} — Master Layout`, image: project.masterLayout });
                    }
                  }}
                  loading="lazy"
                  decoding="async"
                />
                <div style={{ position: 'absolute', inset: 0, background: isPlanMode ? 'none' : 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none' }} />

                {/* Starting Price Pill */}
                {project.priceNumeric > 0 && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }}>
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

                {/* In-Card Media Toggle: Exterior vs Master Layout vs Floor Plan */}
                {(project.masterLayout || project.floorPlan) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      zIndex: 3,
                      display: 'flex',
                      background: 'rgba(0,0,0,0.88)',
                      padding: '2px',
                      borderRadius: '50px',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      backdropFilter: 'blur(10px)',
                      gap: '2px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCardMode(project.id, 'exterior')}
                      style={{
                        background: currentMode === 'exterior' ? '#D4AF37' : 'transparent',
                        color: currentMode === 'exterior' ? '#000' : '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      📸 Photo
                    </button>
                    {project.masterLayout && (
                      <button
                        type="button"
                        onClick={() => toggleCardMode(project.id, 'layout')}
                        style={{
                          background: currentMode === 'layout' ? '#D4AF37' : 'transparent',
                          color: currentMode === 'layout' ? '#000' : '#fff',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '0.2rem 0.55rem',
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        📐 Layout
                      </button>
                    )}
                    {project.floorPlan && (
                      <button
                        type="button"
                        onClick={() => toggleCardMode(project.id, 'floorplan')}
                        style={{
                          background: currentMode === 'floorplan' ? '#D4AF37' : 'transparent',
                          color: currentMode === 'floorplan' ? '#000' : '#fff',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '0.2rem 0.55rem',
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        🏢 Floor Plan
                      </button>
                    )}
                  </div>
                )}

                {/* Typology Badge */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 2 }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 0.4rem' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.65rem', color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
                      {project.name}
                    </h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '1rem' }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Spec Highlights */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', padding: '0.8rem 1rem', borderRadius: '12px', marginBottom: '0.8rem' }}>
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

      {/* Fullscreen Master Layout & Floor Plan Lightbox Modal */}
      {lightboxLayout && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setLightboxLayout(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              width: '100%',
              background: '#1a1724',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0,0,0,0.95)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.3)', background: '#201d2c' }}>
              <div>
                <span style={{ color: '#D4AF37', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  ✦ Official Architectural Document
                </span>
                <h4 style={{ color: '#ffffff', fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', margin: '0.2rem 0 0' }}>
                  {lightboxLayout.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxLayout(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '1.5rem', background: '#0f0d14', textAlign: 'center', maxHeight: '75vh', overflow: 'auto' }}>
              <img
                src={lightboxLayout.image}
                alt={`${lightboxLayout.name} Architectural Blueprint`}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
              />
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>
                📍 Sanctioned PMRDA / MahaRERA Architectural Plan
              </span>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <a
                  href={`https://wa.me/917744009295?text=Hi%2C%20please%20send%20me%20the%20high-resolution%20PDF%20architectural%20plans%20for%20${encodeURIComponent(lightboxLayout.name)}.`}
                  target="_blank"
                  rel="noopener"
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    padding: '0.55rem 1.1rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  Request High-Res PDF on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
