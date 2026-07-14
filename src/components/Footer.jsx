import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Replicating basic newsletter submission notice
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="/logo/IMG_3478.PNG" alt="Mavricks Footer Logo" className="footer-logo" />
          <p>Redefining nightlife and event experiences. Join us for unforgettable moments and top-tier entertainment.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/tickets">Book Tickets</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Policies</h3>
          <ul>
            <li><Link to="/policies#refund">Refund Policy</Link></li>
            <li><Link to="/policies#terms">Terms & Conditions</Link></li>
            <li><Link to="/policies#privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to get updates on upcoming events and exclusive ticket offers.</p>
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
        <p>Designed & Developed by <a href="https://teamtechpro.netlify.app" target="_blank" rel="noreferrer">Team TechPro</a></p>
      </div>
    </footer>
  );
}
