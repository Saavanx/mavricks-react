import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const testimonials = [
    {
      text: "“Mavricks made our birthday celebration feel like a premium nightlife event. The setup, music, and guest flow were absolutely flawless.”",
      author: "Ananya R.",
      type: "Private House Party"
    },
    {
      text: "“We booked them for a college fest activation and the energy they brought was unreal. From planning to execution, everything felt sharp and professional.”",
      author: "Rohit K.",
      type: "Campus Event Partner"
    },
    {
      text: "“For our corporate after-hours event, Mavricks delivered a classy setup, smooth operations, and a guest experience that felt elevated from start to finish.”",
      author: "Nisha S.",
      type: "Corporate Night"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero about-hero">
        <div className="orb orb-purple" style={{ width: '600px', height: '600px', right: '-100px', top: '-200px', opacity: 0.18 }}></div>
        <div className="orb orb-gold" style={{ width: '400px', height: '400px', left: '-100px', bottom: '-100px', opacity: 0.12 }}></div>
        <div className="page-hero-bg"></div>
        <div className="container">
          <div className="section-label reveal">Our Story</div>
          <h1 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>WE ARE<br/><span>MAVRICKS</span></h1>
          <p className="section-desc reveal reveal-delay-2" style={{ marginTop: '16px' }}>
            Born from a passion for nightlife, built on experience, and powered by a love for creating unforgettable experiences for brands, communities, and private celebrations.
          </p>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="section-pad story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-text reveal">
              <div className="section-label">How We Started</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>FROM A DREAM<br/><span>TO A MOVEMENT</span></h2>
              <p>It started in 2025 with an intimate rooftop gathering in Noida and a belief that NCR deserved better experiences. Better vibes. Better execution. Better events.</p>
              <p>Today, Mavricks is a full-scale event management brand creating premium parties, private celebrations, corporate experiences, college events, and expo activations with a sharp eye for design, guest experience, and flawless execution.</p>
              <div className="story-quote">
                <em>"We don't just organize parties. We create the nights you'll talk about for years."</em>
                <span>— Sawan Singh, Founder, Mavricks Events</span><br />
                <span>— Surya Prakash Singh, Co‑Founder, Mavricks Events</span>
              </div>
            </div>
            <div className="story-visual reveal reveal-delay-2">
              <div className="story-card-stack">
                <div className="sc-card sc-back">
                  <span>🌆</span>
                  <p>House Party<br/>2025</p>
                </div>
                <div className="sc-card sc-front">
                  <span className="sc-number" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', display: 'block', color: 'var(--gold)' }}>12</span>
                  <p>Events & Counting</p>
                </div>
              </div>
              <div className="story-years">
                <div className="year-item">
                  <span className="y-year">2025</span>
                  <span className="y-text">Founded</span>
                </div>
                <div className="year-item">
                  <span className="y-year">2026</span>
                  <span className="y-text">Went Digital</span>
                </div>
                <div className="year-item">
                  <span className="y-year">2026</span>
                  <span className="y-text">500+ Guests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* VALUES */}
      <section className="section-pad values-section" style={{ position: 'relative' }}>
        <div className="orb orb-pink" style={{ width: '500px', height: '500px', right: '-200px', top: 0, opacity: 0.1 }}></div>
        <div className="container">
          <div className="section-label reveal">What We Stand For</div>
          <h2 className="section-title reveal reveal-delay-1">OUR <span>VALUES</span></h2>
          <div className="values-grid" style={{ marginTop: '50px' }}>
            <div className="value-card reveal">
              <div className="val-num">01</div>
              <div className="val-icon">🔥</div>
              <h3>Energy First</h3>
              <p>Every decision we make is through the lens of energy. If it doesn't elevate the vibe, it doesn't happen.</p>
            </div>
            <div className="value-card reveal reveal-delay-1">
              <div className="val-num">02</div>
              <div className="val-icon">🛡️</div>
              <h3>Safe Spaces</h3>
              <p>Everyone deserves to party without fear. Safety, inclusivity, and respect are non-negotiables at every Mavricks event.</p>
            </div>
            <div className="value-card reveal reveal-delay-2">
              <div className="val-num">03</div>
              <div className="val-icon">🎯</div>
              <h3>Quality Over Quantity</h3>
              <p>We cap our events intentionally. We'd rather do fewer, perfect events than hundreds of mediocre ones.</p>
            </div>
            <div className="value-card reveal reveal-delay-3">
              <div className="val-num">04</div>
              <div className="val-icon">💡</div>
              <h3>Relentless Innovation</h3>
              <p>We never throw the same party twice. Every event has a fresh concept, a new element, a surprise.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* PORTFOLIO SECTION */}
      <section className="section-pad" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-label reveal">Event Management Portfolio</div>
          <h2 className="section-title reveal reveal-delay-1">WHAT <span>MAVRICKS</span> CAN CREATE</h2>
          <div className="values-grid" style={{ marginTop: '40px' }}>
            <div className="value-card reveal">
              <div className="val-icon">🏢</div>
              <h3>Corporate Parties</h3>
              <p>Curated corporate celebrations, brand nights, employee engagement parties, and executive networking events with premium ambiance and seamless planning.</p>
            </div>
            <div className="value-card reveal reveal-delay-1">
              <div className="val-icon">🏠</div>
              <h3>House Parties</h3>
              <p>Intimate, stylish, and high-energy private house parties designed for birthdays, reunions, and personal celebrations with a polished guest experience.</p>
            </div>
            <div className="value-card reveal reveal-delay-2">
              <div className="val-icon">🎧</div>
              <h3>Club Parties</h3>
              <p>High-impact club nights with immersive lighting, curated music, crowd flow management, and an electric atmosphere built for nightlife lovers.</p>
            </div>
            <div className="value-card reveal reveal-delay-3">
              <div className="val-icon">🎓</div>
              <h3>College & Campus Events</h3>
              <p>Festive campus activations, student fests, cultural nights, and youth-centric events that combine entertainment with strong audience engagement.</p>
            </div>
            <div className="value-card reveal">
              <div className="val-icon">📦</div>
              <h3>Expo & Brand Events</h3>
              <p>Modern expo showcases, pop-up activations, experiential brand events, and public-facing launches designed to leave a lasting impression.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* TIMELINE */}
      <section className="section-pad timeline-section" style={{ position: 'relative' }}>
        <div className="orb orb-cyan" style={{ width: '500px', height: '500px', left: '-200px', bottom: '-100px', opacity: 0.08 }}></div>
        <div className="container">
          <div className="section-label reveal">Journey</div>
          <h2 className="section-title reveal reveal-delay-1">OUR <span>MILESTONES</span></h2>
          <div className="timeline" style={{ marginTop: '60px' }}>
            <div className="tl-item reveal">
              <div className="tl-year">2025</div>
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>The Beginning</h4>
                <p>First rooftop pool party in Noida with 50 friends. Sold out in 2 hours. The Mavricks idea was born.</p>
              </div>
            </div>
            <div className="tl-item reveal reveal-delay-1">
              <div className="tl-year">2025</div>
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>First NCR Takeover</h4>
                <p>Back‑to‑back events across Noida and Delhi NCR. Word‑of‑mouth and Instagram started building the Mavricks community.</p>
              </div>
            </div>
            <div className="tl-item reveal reveal-delay-2">
              <div className="tl-year">2026</div>
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>Going Digital‑First</h4>
                <p>Launched our digital booking and ticketing experience so guests could discover and lock in parties in just a few taps.</p>
              </div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-year">2026</div>
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>Pool Party Launch</h4>
                <p>Launched our signature rooftop pool party series in NCR. Immediately sold out multiple months in a row.</p>
              </div>
            </div>
            <div className="tl-item reveal reveal-delay-1">
              <div className="tl-year">2026</div>
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>500+ Guests Milestone</h4>
                <p>Crossed 500 cumulative guests across our parties in NCR, with a community that keeps coming back.</p>
              </div>
            </div>
            <div className="tl-item reveal reveal-delay-2">
              <div className="tl-year">2026</div>
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>VIP & Private Events</h4>
                <p>Launched exclusive VIP tables and private event planning for birthdays, weddings and corporate nights in NCR.</p>
              </div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-year">2026</div>
              <div className="tl-dot tl-current"></div>
              <div className="tl-content">
                <h4>Growing Across NCR</h4>
                <p>From one rooftop in Noida to multiple venues across NCR — expanding formats, bigger productions, and even wilder nights ahead.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION & APPROVALS */}
      <section className="section-pad press-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-label reveal">Trust & Compliance</div>
          <h2 className="section-title reveal reveal-delay-1">REGISTERED & <span>APPROVED</span></h2>
          <div className="press-grid" style={{ marginTop: '46px' }}>
            <div className="press-card reveal">
              <div className="press-logo">MSME</div>
              <p>Registered as a Micro, Small & Medium Enterprise, operating with proper documentation and compliance.</p>
              <span>MSME Registered Firm</span>
            </div>
            <div className="press-card reveal reveal-delay-1">
              <div className="press-logo">Govt</div>
              <p>Listed as a government‑approved firm, eligible to work with official bodies and public sector clients.</p>
              <span>Government Approved & Listed</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad testimonial-section">
        <div className="container">
          <div className="section-label reveal">Guest Experiences</div>
          <h2 className="section-title reveal reveal-delay-1">WHAT <span>GUESTS SAY</span></h2>
          
          <div className="testimonial-shell reveal">
            <button className="testimonial-nav testimonial-prev" type="button" onClick={prevTestimonial}>←</button>
            <div className="testimonial-viewport">
              <div className="testimonial-track" style={{ display: 'flex', transform: `translateX(-${activeTestimonial * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
                {testimonials.map((test, index) => (
                  <article className="testimonial-card" style={{ flex: '0 0 100%', minWidth: '100%' }} key={index}>
                    <p>{test.text}</p>
                    <div className="testimonial-meta">
                      <strong>{test.author}</strong>
                      <span>{test.type}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <button className="testimonial-nav testimonial-next" type="button" onClick={nextTestimonial}>→</button>
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`testimonial-dot ${index === activeTestimonial ? 'is-active' : ''}`} 
                type="button" 
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="join-cta section-pad">
        <div className="container">
          <div className="jc-inner reveal" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="orb orb-pink" style={{ width: '500px', height: '500px', right: '-100px', top: 0, opacity: 0.15, zIndex: 0 }}></div>
            <div className="orb orb-purple" style={{ width: '300px', height: '300px', left: '-80px', bottom: 0, opacity: 0.12, zIndex: 0 }}></div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Join the Family</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,6vw,5rem)', letterSpacing: '0.04em', color: 'var(--white)', margin: '14px 0 20px' }}>
                READY TO<br /><span style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>PARTY WITH US?</span>
              </h2>
              <p style={{ color: 'var(--grey)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 36px' }}>
                Whether you want to attend, collaborate, or host your own event with us — we'd love to have you as part of the Mavricks family.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/events" className="btn-primary">See Upcoming Events</Link>
                <Link to="/contact" className="btn-outline">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
