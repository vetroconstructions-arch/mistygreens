import React, { useState } from 'react';
import { PARANJAPE_PROJECTS } from '../../data/projects';

export const ProjectFilter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL ENCLAVES', count: PARANJAPE_PROJECTS.length },
    { id: 'plots', label: 'NA PLOTS', count: PARANJAPE_PROJECTS.filter(p => p.category === 'plots').length },
    { id: 'villas', label: 'LUXURY VILLAS', count: PARANJAPE_PROJECTS.filter(p => p.category === 'villas').length },
    { id: 'apartments', label: 'APARTMENTS', count: PARANJAPE_PROJECTS.filter(p => p.category === 'apartments').length },
    { id: 'senior', label: 'SENIOR LIVING', count: PARANJAPE_PROJECTS.filter(p => p.category === 'senior').length },
    { id: 'amenities', label: 'TOWNSHIP AMENITIES', count: PARANJAPE_PROJECTS.filter(p => p.category === 'amenities').length }
  ];

  const handleFilterClick = (catId: string) => {
    setActiveCategory(catId);
    if ((window as any).filterProjects) {
      (window as any).filterProjects(catId);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.8rem', flexWrap: 'wrap' }}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => handleFilterClick(cat.id)}
            style={{
              background: isActive ? 'linear-gradient(135deg, #6B0D0D, #8B1A1A)' : 'rgba(255, 255, 255, 0.05)',
              color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
              border: isActive ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.55rem 1.3rem',
              borderRadius: '50px',
              fontWeight: isActive ? 800 : 700,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isActive ? '0 4px 15px rgba(107, 13, 13, 0.45)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{cat.label}</span>
            <span
              style={{
                fontSize: '0.65rem',
                opacity: 0.8,
                background: isActive ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                padding: '1px 6px',
                borderRadius: '10px'
              }}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
