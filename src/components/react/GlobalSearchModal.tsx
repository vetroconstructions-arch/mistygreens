import React, { useState, useEffect, useRef } from 'react';
import { PARANJAPE_PROJECTS, type ProjectEnclave } from '../../data/projects';

export const GlobalSearchModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'plots' | 'villas' | 'apartments' | 'senior' | 'amenities'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Global triggers: window.openGlobalSearch, Cmd+K, Ctrl+K, /
  useEffect(() => {
    (window as any).openGlobalSearch = () => {
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((document.activeElement?.tagName || ''))) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Filter projects by activeCategory & search query
  const filteredProjects = PARANJAPE_PROJECTS.filter((p) => {
    // Category match
    if (activeCategory !== 'all' && p.category !== activeCategory) {
      return false;
    }

    // Query match
    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const searchString = [
      p.name,
      p.tagline,
      p.description,
      p.price,
      p.categoryLabel,
      p.category,
      p.reraNumber,
      ...(p.features || []),
      ...(p.specs?.map(s => `${s.label} ${s.value}`) || [])
    ].join(' ').toLowerCase();

    return searchString.includes(q);
  });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Enclave & Typology Search"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100005,
        background: 'rgba(5, 5, 8, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '3.5rem 1rem 2rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        style={{
          background: '#0e0e13',
          border: '1.5px solid #D4AF37',
          borderRadius: '24px',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.15)',
          overflow: 'hidden',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}
      >
        {/* Search Header Bar */}
        <div
          style={{
            padding: '1.2rem 1.4rem',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(90deg, rgba(74, 8, 8, 0.6) 0%, rgba(14, 14, 19, 0.9) 100%)'
          }}
        >
          <span style={{ fontSize: '1.3rem', color: '#D4AF37' }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search enclaves, typologies (e.g. Plots, Villas, 2 BHK, Senior Living)..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              ✕
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.05em'
            }}
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Category Chips */}
        <div
          style={{
            padding: '0.75rem 1.4rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            background: '#09090c'
          }}
        >
          {[
            { id: 'all', label: '✨ All Enclaves' },
            { id: 'plots', label: '🌳 NA Plots' },
            { id: 'villas', label: '🏡 Villas & Duets' },
            { id: 'apartments', label: '🏢 Apartments' },
            { id: 'senior', label: '👴 Senior Living' },
            { id: 'amenities', label: '🏊 Amenities' }
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              style={{
                background: activeCategory === cat.id ? 'linear-gradient(135deg, #6B0D0D, #8B1A1A)' : 'rgba(255, 255, 255, 0.04)',
                color: activeCategory === cat.id ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                border: activeCategory === cat.id ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.35rem 0.85rem',
                borderRadius: '50px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div
          style={{
            padding: '1.2rem 1.4rem',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                No Enclaves Matched "{query}"
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Try searching for "Plots", "Villas", "2 BHK", "Senior Living", or browse the full 2026 portfolio.
              </p>
              <a
                href="/paranjape-forest-trails-township-bhugaon-price/"
                style={{
                  background: 'linear-gradient(135deg, #6B0D0D, #8B1A1A)',
                  color: '#fff',
                  border: '1px solid #D4AF37',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}
              >
                VIEW COMPLETE 2026 PRICE SHEET →
              </a>
            </div>
          ) : (
            filteredProjects.map(project => (
              <div
                key={project.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '16px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                {/* Info Block */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: project.categoryBadgeColor,
                        color: project.category === 'villas' || project.category === 'amenities' ? '#000' : '#fff',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '4px',
                        fontSize: '0.62rem',
                        fontWeight: 900,
                        textTransform: 'uppercase'
                      }}
                    >
                      {project.categoryLabel}
                    </span>
                    <span style={{ color: '#D4AF37', fontSize: '0.7rem', fontWeight: 800 }}>
                      📜 {project.reraNumber}
                    </span>
                  </div>

                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#ffffff',
                      fontSize: '1.15rem',
                      margin: '0 0 4px',
                      whiteHeight: 1.2
                    }}
                  >
                    {project.name}
                  </h4>

                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontSize: '0.76rem',
                      margin: '0 0 6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {project.tagline}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        color: '#D4AF37',
                        fontWeight: 900,
                        fontSize: '0.85rem'
                      }}
                    >
                      {project.price}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>•</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>
                      {project.specs?.[0]?.value || 'Signature Residence'}
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                  <a
                    href={project.url}
                    style={{
                      background: 'linear-gradient(135deg, #6B0D0D, #8B1A1A)',
                      color: '#fff',
                      border: '1px solid #D4AF37',
                      padding: '0.48rem 0.9rem',
                      borderRadius: '50px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      textAlign: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    EXPLORE →
                  </a>
                  {project.priceNumeric > 0 && (
                    <a
                      href={`https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20pricing%20and%20availability%20for%20${encodeURIComponent(project.name)}.`}
                      target="_blank"
                      rel="noopener"
                      style={{
                        background: 'rgba(37, 211, 102, 0.15)',
                        color: '#25D366',
                        border: '1px solid rgba(37, 211, 102, 0.4)',
                        padding: '0.35rem 0.7rem',
                        borderRadius: '50px',
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      💬 COST SHEET
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Modal Footer */}
        <div
          style={{
            padding: '0.75rem 1.4rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#09090c',
            fontSize: '0.72rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <div>
            Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '4px', color: '#fff' }}>ESC</kbd> to close
          </div>
          <div>
            <span>Direct Sales Concierge: </span>
            <a href="tel:+917744009295" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 700 }}>
              +91 7744009295
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
