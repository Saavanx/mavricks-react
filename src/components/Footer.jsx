import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <span className="logo-main">MAVRICKS</span>
            <span className="logo-sub">Event & Fun</span>
            <p>NCR's most electrifying event organizer. We don't just throw parties — we create memories that last a lifetime.</p>
            <div className="footer-socials">
              <a href="https://www.mavricks.fun/" target="_blank" rel="noreferrer" className="social-icon">in</a>
              <a href="https://www.instagram.com/mavricks.event/" target="_blank" rel="noreferrer" className="social-icon">ig</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/tickets">Tickets</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/policies">Policies</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Party Types</h4>
            <ul>
              <li><Link to="/events">Rooftop Parties</Link></li>
              <li><Link to="/events">Pool Parties</Link></li>
              <li><Link to="/events">Club Nights</Link></li>
              <li><Link to="/events">House Parties</Link></li>
              <li><Link to="/events">DJ Nights</Link></li>
              <li><Link to="/contact">Private Events</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-newsletter">
            <h4>Newsletter</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--grey)', marginBottom: '12px' }}>
              Get party alerts before anyone else.
            </p>
            <form onSubmit={handleNewsletterSubmit}>
              <input type="hidden" name="subject" value="New Newsletter Signup - Mavricks Events" />
              <input type="hidden" name="from_name" value="Mavricks Events Website" />
              <input type="hidden" name="signup_source" value="Footer Newsletter - Home Page" />
              <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />
              <input type="email" name="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe Now</button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Mavricks Event. All rights reserved.</p>
          <p>
            <Link to="/policies">Policies</Link> · Designed &amp; Developed by{' '}
            <a href="https://teamtechpro.netlify.app" target="_blank" rel="noreferrer">
              Team TechPro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
