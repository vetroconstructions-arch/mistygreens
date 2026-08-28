import React, { useState } from 'react';
import { PARANJAPE_PROJECTS, type ProjectEnclave } from '../../data/projects';

export const ComparisonDrawer: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['misty-greens', 'the-rivolo']);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedProjects = PARANJAPE_PROJECTS.filter(p => selectedIds.includes(p.id));

  const toggleProject = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        zIndex: 90
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'linear-gradient(135deg, #18181c, #0a0a0c)',
            color: '#D4AF37',
            border: '1.5px solid #D4AF37',
            padding: '0.65rem 1.2rem',
            borderRadius: '50px',
            fontWeight: '800',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>⚖️</span>
          <span>COMPARE ENCLAVES ({selectedIds.length}/3)</span>
        </button>
      </div>

      {/* Comparison Modal Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#121216',
            border: '1.5px solid rgba(212,175,55,0.4)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.95)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#fff', margin: 0 }}>
                  Enclave Comparison Matrix
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                  Select up to 3 sovereign enclaves to compare specifications
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Quick Picker Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
              {PARANJAPE_PROJECTS.slice(0, 8).map(p => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProject(p.id)}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, #D4AF37, #AA771C)' : 'rgba(255,255,255,0.06)',
                      color: isSelected ? '#000' : '#fff',
                      border: isSelected ? '1px solid #fff' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '50px',
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected ? '✓ ' : '+ '} {p.name}
                  </button>
                );
              })}
            </div>

            {/* Comparison Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${selectedProjects.length}, 1fr)`,
              gap: '1rem'
            }}>
              {selectedProjects.map(proj => (
                <div
                  key={proj.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    borderRadius: '14px',
                    padding: '1.2rem'
                  }}
                >
                  <img
                    src={proj.image}
                    alt={proj.alt}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.8rem' }}
                  />
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#fff', margin: '0 0 4px' }}>
                    {proj.name}
                  </h4>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: proj.categoryBadgeColor, fontWeight: '800', textTransform: 'uppercase' }}>
                    {proj.categoryLabel}
                  </span>
                  <strong style={{ display: 'block', fontSize: '1.2rem', color: '#D4AF37', margin: '8px 0' }}>
                    {proj.price}
                  </strong>
                  
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginBottom: '8px' }}>
                    <strong>MahaRERA:</strong> {proj.reraNumber}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
                    {proj.specs.map((s, idx) => (
                      <div key={idx} style={{ fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.8)' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}:</span>
                        <span>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={proj.url}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #6B0D0D, #8B1A1A)',
                      color: '#fff',
                      padding: '0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      textDecoration: 'none',
                      border: '1px solid #D4AF37'
                    }}
                  >
                    EXPLORE ENCLAVE
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
