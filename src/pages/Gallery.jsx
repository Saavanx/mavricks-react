import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
  { id: 1, category: 'rooftop', label: 'Sky High Saturdays', sub: 'Rooftop • Noida', emoji: '🌆', gradient: 'linear-gradient(135deg,#1a0528,#ff3cac55)', size: 'tall' },
  { id: 2, category: 'pool', label: 'Splash Sundays', sub: 'Pool Party • Gurgaon', emoji: '🌊', gradient: 'linear-gradient(135deg,#001a2e,#00f0ff55)', size: 'wide' },
  { id: 3, category: 'club', label: 'Club Noir', sub: 'Club Night • Delhi', emoji: '🎧', gradient: 'linear-gradient(135deg,#0d0028,#7b2fff55)', size: 'normal' },
  { id: 4, category: 'private', label: 'Mansion Takeover', sub: 'House Party • NCR', emoji: '🏡', gradient: 'linear-gradient(135deg,#1a1000,#e8b86d55)', size: 'normal' },
  { id: 5, category: 'rooftop', label: 'Sunset Sessions', sub: 'Rooftop • Faridabad', emoji: '🌅', gradient: 'linear-gradient(135deg,#1a0a00,#ff6b3555)', size: 'wide2' },
  { id: 6, category: 'club', label: 'Neon Carnival', sub: 'DJ Night • Noida', emoji: '🎪', gradient: 'linear-gradient(135deg,#001a10,#00ff8855)', size: 'normal' },
  { id: 7, category: 'pool', label: 'Aqua Rave', sub: 'Pool Party • Delhi', emoji: '🏊', gradient: 'linear-gradient(135deg,#001428,#00cfff55)', size: 'tall' },
  { id: 8, category: 'private', label: 'Birthday Blowout', sub: 'Private Event • Gurgaon', emoji: '🎂', gradient: 'linear-gradient(135deg,#1a0020,#ff3cac44)', size: 'normal' },
  { id: 9, category: 'rooftop', label: 'City Lights Night', sub: 'Rooftop • Delhi NCR', emoji: '✨', gradient: 'linear-gradient(135deg,#0a001a,#7b2fff44)', size: 'wide' },
  { id: 10, category: 'club', label: 'Bass & Beats', sub: 'Club Night • Noida', emoji: '🔊', gradient: 'linear-gradient(135deg,#0a1a00,#c8ff0055)', size: 'normal' },
  { id: 11, category: 'private', label: 'Corporate After Party', sub: 'Corporate • Gurgaon', emoji: '🥂', gradient: 'linear-gradient(135deg,#1a1000,#ffd70044)', size: 'normal' },
  { id: 12, category: 'pool', label: 'Summer Madness', sub: 'Pool Party • NCR', emoji: '☀️', gradient: 'linear-gradient(135deg,#1a0a00,#ff8c0055)', size: 'wide2' },
];

const categories = [
  { key: 'all', label: 'All Events' },
  { key: 'rooftop', label: 'Rooftop' },
  { key: 'pool', label: 'Pool Parties' },
  { key: 'club', label: 'Club Nights' },
  { key: 'private', label: 'Private Events' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const getSizeClass = (size) => {
    if (size === 'tall') return 'gi-tall';
    if (size === 'wide') return 'gi-wide';
    if (size === 'wide2') return 'gi-wide2';
    return '';
  };

  return (
    <div className="gallery-page">
      {/* HERO */}
      <section className="page-hero gallery-hero">
        <div className="orb orb-purple" style={{ width: '600px', height: '600px', right: '-100px', top: '-200px', opacity: 0.18 }}></div>
        <div className="orb orb-cyan" style={{ width: '400px', height: '400px', left: '-100px', bottom: '-100px', opacity: 0.1 }}></div>
        <div className="page-hero-bg"></div>
        <div className="container">
          <div className="section-label reveal">Captured Moments</div>
          <h1 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
            THE <span>VIBE</span><br />GALLERY
          </h1>
          <p className="section-desc reveal reveal-delay-2" style={{ marginTop: '16px' }}>
            Every frame tells a story. Browse through our nights — rooftop sessions, pool parties, club takeovers, and private celebrations across Delhi NCR.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section style={{ padding: '40px 0 10px', position: 'sticky', top: '70px', zIndex: 100, background: 'rgba(6,8,22,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: activeCategory === cat.key ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  background: activeCategory === cat.key ? 'var(--gradient-hero)' : 'rgba(255,255,255,0.04)',
                  color: activeCategory === cat.key ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                  boxShadow: activeCategory === cat.key ? '0 4px 20px rgba(255,60,172,0.3)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="section-pad" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="gallery-grid" style={{ gap: '12px' }}>
            {filtered.map(item => (
              <div
                key={item.id}
                className={`gallery-item ${getSizeClass(item.size)}`}
                onClick={() => setLightbox(item)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="gi-placeholder"
                  style={{ background: item.gradient, position: 'relative', height: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}
                >
                  {item.emoji}
                  {/* Noise texture overlay */}
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.5, pointerEvents: 'none' }}></div>
                </div>
                <div className="gi-overlay">
                  <span>{item.label}</span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.7, display: 'block', marginTop: '2px' }}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📸</div>
              <p>No photos in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* SUBMIT YOUR PHOTO CTA */}
      <section className="section-pad" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📷</div>
          <div className="section-label" style={{ justifyContent: 'center' }}>You Were There</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            SHARE YOUR <span>SHOTS</span>
          </h2>
          <p style={{ color: 'var(--grey)', maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Were you at one of our events? Tag us on Instagram <strong style={{ color: 'var(--gold)' }}>@mavricks.events</strong> or send us your best captures — the top shots get featured here!
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://instagram.com/mavricks.events"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Tag on Instagram
            </a>
            <Link to="/contact" className="btn-outline">Submit via Contact</Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: lightbox.gradient,
              borderRadius: '24px',
              width: '100%', maxWidth: '600px',
              aspectRatio: '4/3',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ fontSize: '6rem', marginBottom: '20px' }}>{lightbox.emoji}</div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', color: '#fff', textAlign: 'center' }}>{lightbox.label}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '8px' }}>{lightbox.sub}</p>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%', width: '36px', height: '36px',
                color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
