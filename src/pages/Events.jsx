import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('public');

  const events = [
    {
      id: 1,
      category: 'public',
      tag: 'Pool Party',
      title: 'SPLASH SUNDAYS',
      desc: 'Poolside vibes with floating setups, live DJs, premium refreshments, and a high-energy crowd from afternoon to night.',
      venue: 'Venue Coming Soon',
      date: 'Date & Time Coming Soon',
      bgGradient: 'linear-gradient(135deg,#0c1a2e,#00f0ff33)',
      icon: '🌊',
      badgeClass: ''
    },
    {
      id: 2,
      category: 'public',
      tag: 'Club Night',
      title: 'UNDERGROUND FRIDAYS',
      desc: 'An intense late-night club experience with underground beats, immersive lights, and a packed dance floor.',
      venue: 'Venue Coming Soon',
      date: 'Date & Time Coming Soon',
      bgGradient: 'linear-gradient(135deg,#1a0a2e,#7b2fff33)',
      icon: '🎧',
      badgeClass: 'club-night-badge' // We can color match
    },
    {
      id: 3,
      category: 'private',
      tag: 'Private Celebration',
      title: 'BIRTHDAY BASH EXPERIENCE',
      desc: 'A custom birthday party setup with theme decor, DJ console, cake zone, premium hospitality, and a tailored guest experience.',
      venue: 'Venue Coming Soon',
      date: 'Date & Time Coming Soon',
      bgGradient: 'linear-gradient(135deg,#1a1400,#e8b86d33)',
      icon: '🏡',
      badgeClass: 'private-badge',
      hasButton: true
    },
    {
      id: 4,
      category: 'public',
      tag: 'Special Event',
      title: 'NEON CARNIVAL NIGHT',
      desc: 'A carnival-style night packed with games, performers, stage acts, neon visuals, and nonstop entertainment.',
      venue: 'Venue Coming Soon',
      date: 'Date & Time Coming Soon',
      bgGradient: 'linear-gradient(135deg,#1a0a0a,#ff6b3533)',
      icon: '🎪',
      badgeClass: 'special-badge'
    },
    {
      id: 5,
      category: 'private',
      tag: 'Private Event',
      title: 'CORPORATE PARTY SETUP',
      desc: 'A professionally managed corporate party with stage setup, branding, entertainment, food service, and a polished guest flow.',
      venue: 'Venue Coming Soon',
      date: 'Date & Time Coming Soon',
      bgGradient: 'linear-gradient(135deg,#0a001a,#ff3cac33)',
      icon: '🌃',
      badgeClass: 'private-badge',
      hasButton: true
    },
    {
      id: 6,
      category: 'private',
      tag: 'Private Luxury Event',
      title: 'WEDDING AFTER PARTY',
      desc: 'A luxury after-party experience with curated music, premium decor, hospitality, and a completely personalized celebration flow.',
      venue: 'Venue Coming Soon',
      date: 'Date & Time Coming Soon',
      bgGradient: 'linear-gradient(135deg,#001a1a,#00f0ff22)',
      icon: '💎',
      badgeClass: 'private-badge',
      hasButton: true
    }
  ];

  const filteredEvents = events.filter(e => e.category === activeCategory);

  return (
    <div className="events-page">
      {/* PAGE HERO */}
      <section className="page-hero events-hero">
        <div className="orb orb-pink" style={{ width: '600px', height: '600px', right: '-100px', top: '-200px', opacity: 0.2 }}></div>
        <div className="orb orb-purple" style={{ width: '400px', height: '400px', left: '-100px', bottom: '-100px', opacity: 0.15 }}></div>
        <div className="page-hero-bg"></div>
        <div className="container">
          <div className="section-label reveal">All Events</div>
          <h1 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>FIND YOUR<br/><span>PERFECT</span> PARTY</h1>
          <p className="section-desc reveal reveal-delay-2" style={{ marginTop: '16px' }}>
            Browse all upcoming events. Filter by vibe, date, or venue and book your spot before it sells out.
          </p>
        </div>
      </section>

      {/* FEATURED EVENT & FILTER BUTTONS */}
      <section className="section-pad">
        <div className="container">
          <div className="section-label reveal">Featured</div>
          <div className="filter-group reveal reveal-delay-1" style={{ marginTop: '20px' }}>
            <button 
              className={`filter-btn ${activeCategory === 'public' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('public')}
              type="button"
            >
              Public Party
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'private' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('private')}
              type="button"
            >
              Custom Private Party
            </button>
          </div>

          {/* Public Featured Banner */}
          {activeCategory === 'public' && (
            <>
              <div className="featured-event-banner reveal reveal-delay-1" style={{ marginTop: '28px' }}>
                <div className="feb-content">
                  <div className="tag tag-neon">Coming Soon</div>
                  <h2>NEXT EVENT DROPPING SOON</h2>
                  <p>We're working on something big. Our next public event will be announced shortly — follow us on Instagram or subscribe to the newsletter to get first access.</p>
                  <div className="feb-details">
                    <div className="feb-detail"><span>📅</span><div><strong>Date</strong><em>To be announced</em></div></div>
                    <div className="feb-detail"><span>📍</span><div><strong>Venue</strong><em>To be announced</em></div></div>
                    <div className="feb-detail"><span>🕗</span><div><strong>Time</strong><em>To be announced</em></div></div>
                    <div className="feb-detail"><span>👥</span><div><strong>Entry</strong><em>Details coming soon</em></div></div>
                  </div>
                  <div className="feb-actions">
                    <Link to="/contact" className="btn-primary">Get Notified</Link>
                    <Link to="/policies" className="btn-outline" style={{ marginLeft: '8px' }}>View Policies</Link>
                    <span className="seats-left" style={{ marginLeft: '12px' }}>Announcement dropping soon</span>
                  </div>
                </div>
                <div className="feb-visual">
                  <div className="feb-graphic" aria-hidden="true">
                    <div className="fg-orb fg-orb-1"></div>
                    <div className="fg-orb fg-orb-2"></div>
                    <div className="fg-orb fg-orb-3"></div>
                    <div className="fg-center-card">
                      <span className="fg-chip">Coming Soon</span>
                      <strong>Next Big Night</strong>
                      <em>Stay tuned for the announcement</em>
                    </div>
                  </div>
                </div>
              </div>

              <div className="featured-event-banner reveal reveal-delay-2" style={{ marginTop: '28px' }}>
                <div className="feb-content">
                  <div className="tag tag-neon">Navratri Special</div>
                  <h2>DANDIYA NIGHT</h2>
                  <p>Nine nights of pure festive energy — live dhol &amp; dandiya beats, garba circles, vibrant decor, and a crowd dressed to dazzle. The biggest Navratri celebration of the season.</p>
                  <div className="feb-details">
                    <div className="feb-detail"><span>📅</span><div><strong>Date</strong><em>During Navratri 2026</em></div></div>
                    <div className="feb-detail"><span>📍</span><div><strong>Venue</strong><em>To be announced</em></div></div>
                    <div className="feb-detail"><span>🕗</span><div><strong>Time</strong><em>Evening onwards</em></div></div>
                    <div className="feb-detail"><span>👥</span><div><strong>Dress Code</strong><em>Traditional / Festive</em></div></div>
                  </div>
                  <div className="feb-actions">
                    <Link to="/contact" className="btn-primary">Get Updates</Link>
                    <span className="seats-left" style={{ marginLeft: '12px' }}>Announcement dropping soon</span>
                  </div>
                </div>
                <div className="feb-visual">
                  <div className="feb-graphic" aria-hidden="true">
                    <div className="fg-orb fg-orb-1"></div>
                    <div className="fg-orb fg-orb-2"></div>
                    <div className="fg-orb fg-orb-3"></div>
                    <div className="fg-center-card">
                      <span className="fg-chip">Navratri Special</span>
                      <strong>Dandiya Night</strong>
                      <em>Venue &amp; date to be announced</em>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Private Featured Banner */}
          {activeCategory === 'private' && (
            <div className="featured-event-banner reveal reveal-delay-1" style={{ marginTop: '28px' }}>
              <div className="feb-content">
                <div className="tag tag-neon">Custom Party</div>
                <h2>CUSTOM PRIVATE PARTY</h2>
                <p>Create a fully customized private celebration in NCR with curated decor, artist bookings, food and beverage service, and a party flow designed around your guest list.</p>
                <div className="feb-details">
                  <div className="feb-detail"><span>📅</span><div><strong>Availability</strong><em>Any Preferred Date</em></div></div>
                  <div className="feb-detail"><span>📍</span><div><strong>Venue</strong><em>Any Preferred Location</em></div></div>
                  <div className="feb-detail"><span>🕗</span><div><strong>Format</strong><em>Day or Night Event</em></div></div>
                  <div className="feb-detail"><span>👥</span><div><strong>Guests</strong><em>50 to 600 Guests</em></div></div>
                </div>
                <div className="feb-actions">
                  <Link to="/contact" className="btn-primary">Plan Custom Party</Link>
                  <span className="seats-left" style={{ marginLeft: '12px' }}>Custom themes, DJs, decor, and catering</span>
                </div>
              </div>
              <div className="feb-visual">
                <div className="feb-graphic" aria-hidden="true">
                  <div className="fg-orb fg-orb-1"></div>
                  <div className="fg-orb fg-orb-2"></div>
                  <div className="fg-orb fg-orb-3"></div>
                  <div className="fg-center-card">
                    <span className="fg-chip">Private</span>
                    <strong>Custom Party</strong>
                    <em>Mavricks Signature Setup</em>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ALL EVENTS GRID */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-label reveal">Upcoming</div>
          <h2 className="section-title reveal reveal-delay-1">ALL <span>EVENTS</span></h2>

          <div className="events-grid" style={{ marginTop: '40px' }}>
            {filteredEvents.map((evt) => (
              <div className="event-card card reveal" key={evt.id}>
                <div className="card-img">
                  <div className="ec-img-placeholder" style={{ background: evt.bgGradient }}>{evt.icon}</div>
                  <div className={`card-badge ${evt.badgeClass}`}>{evt.tag}</div>
                  <div className="ec-date-pill">Coming Soon</div>
                </div>
                <div className="card-body">
                  <div className="card-tag">{evt.tag}</div>
                  <h3 className="card-title">{evt.title}</h3>
                  <p className="card-text">{evt.desc}</p>
                  <div className="card-meta">
                    <span>📍 {evt.venue}</span>
                    <span>🕙 {evt.date}</span>
                  </div>
                  {evt.hasButton && (
                    <div className="ec-footer">
                      <Link to="/contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.78rem' }}>Plan Now</Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVATE EVENTS CTA */}
      {activeCategory === 'private' && (
        <section className="private-cta section-pad">
          <div className="container">
            <div className="private-cta-inner reveal">
              <div className="orb orb-pink" style={{ width: '400px', height: '400px', right: '-100px', top: '-100px', opacity: 0.15 }}></div>
              <div className="orb orb-purple" style={{ width: '300px', height: '300px', left: '-80px', bottom: '-80px', opacity: 0.12 }}></div>
              <div className="pci-content">
                <div className="section-label" style={{ color: 'var(--gold)' }}>Private Events</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '0.04em', color: 'var(--white)', margin: '10px 0 18px' }}>
                  WANT SOMETHING<br /><span style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>EXCLUSIVE?</span>
                </h2>
                <p style={{ color: 'var(--grey)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px' }}>
                  Birthday parties, corporate events, anniversaries — we handle everything from venue selection to DJ booking. Fully customized, fully private.
                </p>
              </div>
              <div className="pci-actions">
                <Link to="/contact" className="btn-gold">Plan My Event</Link>
                <Link to="/contact" className="btn-outline" style={{ marginLeft: '12px' }}>Talk to Us</Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
