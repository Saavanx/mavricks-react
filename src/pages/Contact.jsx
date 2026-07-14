import React, { useState } from 'react';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('general');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    e.target.reset();
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="page-hero contact-hero">
        <div className="orb orb-cyan" style={{ width: '500px', height: '500px', right: '-100px', top: '-150px', opacity: 0.15 }}></div>
        <div className="orb orb-pink" style={{ width: '350px', height: '350px', left: '-100px', bottom: '-50px', opacity: 0.1 }}></div>
        <div className="page-hero-bg"></div>
        <div className="container">
          <div className="section-label reveal">Reach Out</div>
          <h1 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>LET'S<br/><span>TALK PARTY</span></h1>
          <p className="section-desc reveal reveal-delay-2" style={{ marginTop: '16px' }}>
            Got questions, want to collaborate, or planning a private event? We're all ears — and we love talking parties.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section-pad contact-section">
        <div className="container">
          <div className="contact-layout">

            {/* Left: Contact Info */}
            <div className="contact-info">
              <div className="section-label reveal">Contact Info</div>
              <h2 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '30px' }}>GET IN<br/><span>TOUCH</span></h2>

              <div className="info-cards">
                <div className="info-card reveal">
                  <div className="ic-icon">📞</div>
                  <div className="ic-content" style={{ marginBottom: '14px' }}>
                    <h4>Phone</h4>
                    <a href="tel:+919454526120">+91 9454526120</a>
                    <span>Mon–Sat, 10AM–8PM</span>
                  </div>
                  <div className="ic-content">
                    <h4>Phone</h4>
                    <a href="tel:+919695167669">+91 96951 67669</a>
                    <span>Mon–Sat, 10AM–8PM</span>
                  </div>
                </div>
                <div className="info-card reveal reveal-delay-1">
                  <div className="ic-icon">📧</div>
                  <div className="ic-content">
                    <h4>Email</h4>
                    <a href="mailto:mavricks.fun@gmail.com">mavricks.fun@gmail.com</a>
                    <span>Our team will reply within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="contact-socials reveal">
                <h4>Follow Us</h4>
                <div className="cs-grid">
                  <a href="https://www.instagram.com/mavricks.event/" target="_blank" rel="noreferrer" className="cs-link">
                    <span className="cs-icon">📸</span>
                    <div>
                      <strong>Instagram</strong>
                      <em>@mavricksevents</em>
                    </div>
                  </a>
                  <a href="https://www.mavricks.fun/" target="_blank" rel="noreferrer" className="cs-link">
                    <span className="cs-icon">🔗</span>
                    <div>
                      <strong>Website</strong>
                      <em>www.mavricks.fun</em>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="contact-form-wrap reveal reveal-delay-2" style={{ scrollMarginTop: '96px' }}>
              <div className="form-tabs">
                <button 
                  type="button"
                  className={`form-tab ${activeTab === 'general' ? 'active' : ''}`}
                  onClick={() => setActiveTab('general')}
                >
                  General Enquiry
                </button>
                <button 
                  type="button" 
                  className={`form-tab ${activeTab === 'private' ? 'active' : ''}`}
                  onClick={() => setActiveTab('private')}
                >
                  Private Event
                </button>
                <button 
                  type="button" 
                  className={`form-tab ${activeTab === 'collab' ? 'active' : ''}`}
                  onClick={() => setActiveTab('collab')}
                >
                  Collaborate
                </button>
              </div>

              {/* General Form */}
              {activeTab === 'general' && (
                <form onSubmit={handleSubmit} className="contact-form tab-panel active">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" placeholder="Your full name" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select>
                      <option>General Enquiry</option>
                      <option>Event Information</option>
                      <option>Ticket Support</option>
                      <option>Refund Request</option>
                      <option>Media & Press</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows="5" placeholder="Tell us what's on your mind..." required></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
                  </button>
                </form>
              )}

              {/* Private Event Form */}
              {activeTab === 'private' && (
                <form onSubmit={handleSubmit} className="contact-form tab-panel active">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" placeholder="Your full name" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 00000 00000" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Event Type</label>
                      <select>
                        <option>Birthday Party</option>
                        <option>Anniversary</option>
                        <option>Corporate Event</option>
                        <option>Bachelor/Bachelorette</option>
                        <option>Graduation Party</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Expected Guests</label>
                      <select>
                        <option>10 – 30</option>
                        <option>30 – 80</option>
                        <option>80 – 200</option>
                        <option>200 – 500</option>
                        <option>500+</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Preferred Date</label>
                      <input type="date" style={{ colorScheme: 'dark' }} />
                    </div>
                    <div className="form-group">
                      <label>Budget Range</label>
                      <select>
                        <option>₹50,000 – ₹1 Lakh</option>
                        <option>₹1 – ₹3 Lakhs</option>
                        <option>₹3 – ₹10 Lakhs</option>
                        <option>₹10 Lakhs+</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Additional Details</label>
                    <textarea rows="4" placeholder="Tell us your vision, theme ideas, special requirements..."></textarea>
                  </div>
                  <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                    Request Callback
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                  </button>
                </form>
              )}

              {/* Collaborate Form */}
              {activeTab === 'collab' && (
                <form onSubmit={handleSubmit} className="contact-form tab-panel active">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name / Brand</label>
                      <input type="text" placeholder="Your name or brand" required />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Collaboration Type</label>
                    <select>
                      <option>DJ / Artist Performance</option>
                      <option>Brand Sponsorship</option>
                      <option>Photography / Videography</option>
                      <option>Venue Partnership</option>
                      <option>Social Media Collaboration</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Instagram / Portfolio Link</label>
                    <input type="url" placeholder="https://..." />
                  </div>
                  <div className="form-group">
                    <label>Tell us about yourself</label>
                    <textarea rows="4" placeholder="Who are you, what you do, why you want to work with Mavricks..."></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Submit Proposal
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS TOAST */}
      <div className={`form-toast ${showToast ? 'active' : ''}`} id="form-toast">
        🎉 Message sent! We'll get back to you within 24 hours.
      </div>
    </div>
  );
}
