import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Counter({ targetValue, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(targetValue, 10);
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return <span className="stat-number">{count}</span>;
}

export default function Home() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg hero-parallax">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="/video/concert-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero-gradient"></div>
          <div className="hero-grid-overlay"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge reveal">
              Now Booking • Premium Events & Nightlife
            </div>
            <h1 className="hero-title reveal reveal-delay-1">
              CURATED<br />
              <em className="hero-italic">
                <span className="hero-typed">premium</span>
              </em><br />
              <span className="hero-title-line hero-title-line-bottom">EXPERIENCES</span>
            </h1>
            <p className="hero-desc reveal reveal-delay-2">
              Curated rooftop parties, pool events, club takeovers, and private celebrations designed for guests, brands,
              and venues that expect a sharper nightlife experience.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <Link to="/events" className="btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10,8 16,12 10,16" />
                </svg>
                Explore Events
              </Link>
              <Link to="/tickets" className="btn-outline">Get Tickets</Link>
            </div>
          </div>
          
          <div className="hero-visual reveal reveal-delay-2">
            <div className="hero-panel">
              <div className="hero-panel-top">
                <span className="hero-panel-label">Coming Soon</span>
                <span className="hero-panel-status"><span></span>Stay Tuned</span>
              </div>
              <h3>Next Big Night</h3>
              <p className="hero-panel-subtitle">Announcement Dropping Soon</p>
              <div className="hero-panel-meta">
                <div className="hero-panel-item">
                  <strong>What's Next</strong>
                  <span>Something bigger is in the works. Follow us to be the first to know.</span>
                </div>
                <div className="hero-panel-item">
                  <strong>Stay Updated</strong>
                  <span>Subscribe to our newsletter or follow on Instagram for early access.</span>
                </div>
              </div>
              <Link to="/contact" className="btn-gold hero-panel-cta">Get Notified</Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          <span>Rooftop Parties</span><span className="dot">✦</span>
          <span>Pool Parties</span><span className="dot">✦</span>
          <span>Club Nights</span><span className="dot">✦</span>
          <span>House Parties</span><span className="dot">✦</span>
          <span>DJ Nights</span><span className="dot">✦</span>
          <span>Private Events</span><span className="dot">✦</span>
          <span>Corporate Parties</span><span className="dot">✦</span>
          <span>VIP Experiences</span><span className="dot">✦</span>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="stats-section section-pad">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item reveal">
              <Counter targetValue="12" />
              <span className="stat-plus">+</span>
              <span className="stat-label">Events Hosted</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item reveal reveal-delay-1">
              <Counter targetValue="500" />
              <span className="stat-plus">+</span>
              <span className="stat-label">Happy Guests</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item reveal reveal-delay-2">
              <Counter targetValue="8" />
              <span className="stat-plus">+</span>
              <span className="stat-label">Venues</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item reveal reveal-delay-3">
              <Counter targetValue="1" />
              <span className="stat-plus">+</span>
              <span className="stat-label">Years Running</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* UPCOMING EVENTS */}
      <section className="section-pad upcoming-section" style={{ position: 'relative' }}>
        <div className="orb orb-purple" style={{ width: '600px', height: '600px', right: '-200px', top: '-100px', opacity: 0.12 }}></div>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-label">What's On</div>
              <h2 className="section-title">UPCOMING <span>EVENTS</span></h2>
            </div>
            <Link to="/events" className="btn-outline">View All Events</Link>
          </div>

          <div className="events-featured">
            {/* Featured Event */}
            <div className="event-featured-card reveal">
              <div className="efc-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a0a2e, #2e0a14)' }}>
                <div style={{ textAlign: 'center', padding: '40px 30px' }}>
                  <div style={{ fontSize: '3.6rem', marginBottom: '14px' }}>💃🪔</div>
                  <div className="tag tag-neon" style={{ marginBottom: '14px' }}>Navratri Special</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em', fontSize: '2rem', lineHeight: 1, color: 'var(--white)', marginBottom: '10px' }}>DANDIYA NIGHT</h3>
                  <p style={{ color: 'var(--grey)', fontSize: '0.92rem', lineHeight: 1.65 }}>Nine nights of garba, dandiya beats, dazzling lights and full festive energy — the biggest Dandiya celebration of the season.</p>
                </div>
                <div className="efc-overlay"></div>
              </div>
              <div className="efc-content">
                <div className="efc-meta">
                  <span>📅 During Navratri 2026</span>
                  <span>📍 Venue to be announced</span>
                </div>
                <div className="efc-actions">
                  <Link to="/contact" className="btn-gold">Get Notified</Link>
                </div>
              </div>
            </div>

            {/* Side Events */}
            <div className="events-side">
              <div className="event-mini-card reveal reveal-delay-1">
                <div className="emc-left">
                  <div className="emc-date">
                    <span className="emc-day" style={{ fontSize: '1.5rem' }}>🪔</span>
                    <span className="emc-month">Navratri</span>
                  </div>
                </div>
                <div className="emc-info">
                  <div className="tag tag-neon" style={{ fontSize: '0.65rem', padding: '3px 10px' }}>NAVRATRI SPECIAL</div>
                  <h4>Garba &amp; Dandiya Nights</h4>
                  <div className="emc-meta">
                    <span>📍 Coming Soon</span>
                  </div>
                </div>
                <Link to="/contact" className="emc-arrow">→</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* PARTY TYPES */}
      <section className="section-pad party-types-section" style={{ position: 'relative' }}>
        <div className="orb orb-pink" style={{ width: '500px', height: '500px', left: '-200px', top: 0, opacity: 0.1 }}></div>
        <div className="container">
          <div className="section-label reveal">What We Do</div>
          <h2 className="section-title reveal reveal-delay-1">PARTY FOR <span>EVERY VIBE</span></h2>
          <p className="section-desc reveal reveal-delay-2" style={{ margin: '16px 0 50px' }}>
            From sky-high rooftops to subterranean clubs — we craft the perfect atmosphere for every occasion.
          </p>

          <div className="party-types-grid">
            <div className="pt-card reveal" style={{ '--accent': '#ff3cac' }}>
              <div className="pt-icon">🏙️</div>
              <h3>Rooftop Parties</h3>
              <p>Skyline views, open-air vibes, premium setups. Experience the city from above.</p>
              <Link to="/events">Explore →</Link>
            </div>
            <div className="pt-card reveal reveal-delay-1" style={{ '--accent': '#00f0ff' }}>
              <div className="pt-icon">🌊</div>
              <h3>Pool Parties</h3>
              <p>Poolside madness with neon floats, live DJs, and all-day open bars.</p>
              <Link to="/events">Explore →</Link>
            </div>
            <div className="pt-card reveal reveal-delay-2" style={{ '--accent': '#7b2fff' }}>
              <div className="pt-icon">🎧</div>
              <h3>Club Nights</h3>
              <p>Underground beats, laser shows, and intimate club experiences.</p>
              <Link to="/events">Explore →</Link>
            </div>
            <div className="pt-card reveal reveal-delay-3" style={{ '--accent': '#e8b86d' }}>
              <div className="pt-icon">🏡</div>
              <h3>House Parties</h3>
              <p>Private villa takeovers. Curated guest lists, luxury settings, unforgettable moments.</p>
              <Link to="/events">Explore →</Link>
            </div>
            <div className="pt-card reveal" style={{ '--accent': '#ff6b35' }}>
              <div className="pt-icon">🎧</div>
              <h3>DJ Nights</h3>
              <p>Theme parties and DJ Nights with games, performers, and spectacle.</p>
              <Link to="/events">Explore →</Link>
            </div>
            <div className="pt-card reveal reveal-delay-1" style={{ '--accent': '#ff3cac' }}>
              <div className="pt-icon">🎂</div>
              <h3>Private Events</h3>
              <p>Birthdays, anniversaries, corporate — fully bespoke event planning.</p>
              <Link to="/contact">Enquire →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="promo-banner">
        <div className="promo-bg"></div>
        <div className="container promo-content">
          <div className="promo-text reveal">
            <div className="section-label" style={{ color: 'var(--black)' }}>Stay Ready</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '0.04em', color: 'var(--black)', lineHeight: 1 }}>
              NEXT EVENT<br />DROPPING<br /><span style={{ fontSize: '1.3em', color: 'var(--neon2)' }}>VERY SOON</span>
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '1rem', maxWidth: '400px' }}>
              Something big is being planned. Subscribe to our newsletter or follow us on Instagram to get first access and early bird deals.
            </p>
          </div>
          <div className="promo-action reveal reveal-delay-2">
            <Link to="/contact" className="btn-primary" style={{ fontSize: '1rem', padding: '18px 44px' }}>
              Get Notified
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="section-pad gallery-teaser">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="section-label">The Vibe</div>
              <h2 className="section-title">CAPTURED <span>MOMENTS</span></h2>
            </div>
            <Link to="/gallery" className="btn-outline">View Gallery</Link>
          </div>
          <div className="gallery-grid reveal reveal-delay-1">
            <div className="gallery-item gi-tall">
              <div className="gi-overlay"><span>Rooftop Saturdays</span></div>
              <div className="gi-placeholder" style={{ background: 'linear-gradient(135deg,#1a1729,#ff3cac44)' }}>🌆</div>
            </div>
            <div className="gallery-item gi-wide">
              <div className="gi-overlay"><span>Pool Vibes</span></div>
              <div className="gi-placeholder" style={{ background: 'linear-gradient(135deg,#1a1729,#00f0ff44)' }}>🌊</div>
            </div>
            <div className="gallery-item">
              <div className="gi-overlay"><span>Club Noir</span></div>
              <div className="gi-placeholder" style={{ background: 'linear-gradient(135deg,#1a1729,#7b2fff44)' }}>🎧</div>
            </div>
            <div className="gallery-item">
              <div className="gi-overlay"><span>Mansion Party</span></div>
              <div className="gi-placeholder" style={{ background: 'linear-gradient(135deg,#1a1729,#e8b86d44)' }}>🏡</div>
            </div>
            <div className="gallery-item gi-wide2">
              <div className="gi-overlay"><span>Neon Carnival</span></div>
              <div className="gi-placeholder" style={{ background: 'linear-gradient(135deg,#1a1729,#ff6b3544)' }}>🎪</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad testimonials-section" style={{ position: 'relative' }}>
        <div className="orb orb-cyan" style={{ width: '400px', height: '400px', right: '-100px', bottom: '-100px', opacity: 0.08 }}></div>
        <div className="container">
          <div className="section-label reveal">Reviews</div>
          <h2 className="section-title reveal reveal-delay-1">WHAT THEY <span>SAY</span></h2>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal reveal-delay-1">
              <div className="stars">★★★★★</div>
              <p>"The rooftop party was insane! Views, music, crowd — everything was 10/10. Mavricks knows how to throw a party."</p>
              <div className="t-author">
                <div className="t-avatar">RS</div>
                <div>
                  <strong>Riya Sharma</strong>
                  <span>Attended Sky High Saturdays</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-2">
              <div className="stars">★★★★★</div>
              <p>"Pool party was unreal. DJ was fire, floats were aesthetic, vibe was immaculate. Already booked the next one!"</p>
              <div className="t-author">
                <div className="t-avatar">AK</div>
                <div>
                  <strong>Arjun Kapoor</strong>
                  <span>Attended Splash Sundays</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-3">
              <div className="stars">★★★★★</div>
              <p>"Hired Mavricks for our company party. They handled everything perfectly. Our team is still talking about it!"</p>
              <div className="t-author">
                <div className="t-avatar">NP</div>
                <div>
                  <strong>Neha Patel</strong>
                  <span>Corporate Event Client</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="newsletter-section section-pad">
        <div className="container">
          <div className="newsletter-inner reveal">
            <div className="nl-text">
              <div className="section-label">Stay in the loop</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>NEVER MISS A <span>PARTY</span></h2>
              <p className="section-desc">Get first access to events, early bird deals, and exclusive invites — straight to your inbox.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="you@email.com" required />
              <button type="submit" className="btn-primary">Subscribe Now</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
