import React, { useState } from 'react';
import { PARANJAPE_PROJECTS } from '../../data/projects';

export const MasterPlanNavigator: React.FC = () => {
  const [selectedEnclave, setSelectedEnclave] = useState<string | null>('misty-greens');

  const activeProject = PARANJAPE_PROJECTS.find(p => p.id === selectedEnclave) || PARANJAPE_PROJECTS[0];

  const hotspots = [
    { id: 'misty-greens', label: 'Misty Greens (Plots)', x: '28%', y: '42%', category: 'NA Plots' },
    { id: 'the-rivolo', label: 'The Rivolo (Villas)', x: '45%', y: '30%', category: 'Luxury Villas' },
    { id: 'the-canopy', label: 'The Canopy (2/3 BHK)', x: '62%', y: '38%', category: 'Apartments' },
    { id: 'the-cove', label: 'The Cove (Duet Villas)', x: '38%', y: '58%', category: 'Villas' },
    { id: 'athashri', label: 'Athashri Senior Living', x: '72%', y: '52%', category: 'Senior Living' },
    { id: 'the-cliff-club', label: 'The Cliff Club (40k sq.ft)', x: '50%', y: '48%', category: 'Lifestyle Hub' },
    { id: 'the-highgardens', label: 'The Highgardens', x: '58%', y: '68%', category: 'Terrace Homes' },
    { id: 'everglades', label: 'Everglades (1/2 BHK)', x: '78%', y: '32%', category: 'PRO Homes' },
    { id: 'equestrian-academy', label: 'Equestrian Academy', x: '20%', y: '65%', category: 'Sports' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(20,20,24,0.95) 0%, rgba(10,10,12,0.98) 100%)',
      borderRadius: '24px',
      border: '1.5px solid rgba(212,175,55,0.3)',
      padding: '2rem',
      boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
      margin: '3rem 0'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          padding: '0.35rem 1rem',
          borderRadius: '50px',
          fontSize: '0.75rem',
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          border: '1px solid rgba(212,175,55,0.3)'
        }}>
          Interactive Master Plan Navigator
        </span>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          color: '#ffffff',
          margin: '0.8rem 0 0.4rem'
        }}>
          Explore the 190-Acre Forest Trails Township
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
          Click any hotspot below to inspect enclaves, starting prices, RERA sanctions, and architectural specs.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Interactive Vector Map with Hotspots */}
        <div style={{
          position: 'relative',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1px solid rgba(212,175,55,0.25)',
          background: '#0e1217',
          minHeight: '380px',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
        }}>
          <img
            src="/images/master-plan.webp"
            alt="190-Acre Master Plan of Paranjape Forest Trails Bhugaon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.85) contrast(1.1)'
            }}
          />

          {/* Hotspot Markers */}
          {hotspots.map((spot) => {
            const isActive = selectedEnclave === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setSelectedEnclave(spot.id)}
                style={{
                  position: 'absolute',
                  left: spot.x,
                  top: spot.y,
                  transform: 'translate(-50%, -50%)',
                  background: isActive ? 'linear-gradient(135deg, #D4AF37, #AA771C)' : 'rgba(0,0,0,0.85)',
                  color: isActive ? '#000000' : '#D4AF37',
                  border: isActive ? '2px solid #ffffff' : '1.5px solid #D4AF37',
                  borderRadius: '50px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 20px rgba(212,175,55,0.9)' : '0 4px 12px rgba(0,0,0,0.6)',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  zIndex: isActive ? 10 : 2
                }}
              >
                📍 {spot.label}
              </button>
            );
          })}
        </div>

        {/* Selected Enclave Info Card */}
        {activeProject && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '18px',
            border: '1px solid rgba(212,175,55,0.3)',
            padding: '2rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
              <span style={{
                background: activeProject.categoryBadgeColor,
                color: activeProject.category === 'villas' || activeProject.category === 'amenities' ? '#000' : '#fff',
                padding: '0.2rem 0.65rem',
                borderRadius: '50px',
                fontSize: '0.68rem',
                fontWeight: '900',
                textTransform: 'uppercase'
              }}>
                {activeProject.categoryLabel}
              </span>
              <span style={{
                background: 'rgba(0,0,0,0.7)',
                color: '#D4AF37',
                border: '1px solid rgba(212,175,55,0.3)',
                padding: '0.2rem 0.65rem',
                borderRadius: '50px',
                fontSize: '0.68rem',
                fontWeight: '700'
              }}>
                MahaRERA: {activeProject.reraNumber}
              </span>
            </div>

            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem',
              color: '#ffffff',
              margin: '0 0 0.4rem'
            }}>
              {activeProject.name}
            </h4>

            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: '1.5', margin: '0 0 1.2rem' }}>
              {activeProject.tagline}
            </p>

            <div style={{
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Pricing & Configuration
              </span>
              <strong style={{ display: 'block', fontSize: '1.4rem', color: '#D4AF37', fontFamily: "'Playfair Display', serif", margin: '2px 0 6px' }}>
                {activeProject.price}
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {activeProject.features.slice(0, 3).map((f, i) => (
                  <span key={i} style={{ fontSize: '0.72rem', color: '#fff', background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={activeProject.url}
                style={{
                  flex: '1',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #6B0D0D, #8B1A1A)',
                  color: '#fff',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid #D4AF37'
                }}
              >
                VIEW ENCLAVE &rarr;
              </a>
              <button
                className="open-enquiry-modal"
                onClick={() => (window as any).openEnquiryModal && (window as any).openEnquiryModal(activeProject.id)}
                style={{
                  flex: '1',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#D4AF37',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(212,175,55,0.4)',
                  cursor: 'pointer'
                }}
              >
                GET BROCHURE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
