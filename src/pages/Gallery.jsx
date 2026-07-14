import React from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  return (
    <div className="gallery-page" style={{ padding: '120px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="section-label">Captured Moments</div>
      <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '14px 0' }}>THE <span>VIBE GALLERY</span></h1>
      <p style={{ color: 'var(--grey)', maxWidth: '480px', marginBottom: '28px', lineHeight: 1.7 }}>
        We are organizing our latest captured moments from Sky High Saturdays, mansion pool parties, and DJ nights. Stay tuned for updates!
      </p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  );
}
