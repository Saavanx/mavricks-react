import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenLogin }) {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Monitor scrolling to apply background filters
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transitions
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  // Compute initials for profile badge
  const getInitial = () => {
    if (!currentUser) return 'U';
    if (currentUser.displayName) return currentUser.displayName.trim().charAt(0).toUpperCase();
    if (currentUser.email) return currentUser.email.trim().charAt(0).toUpperCase();
    if (currentUser.phoneNumber) return currentUser.phoneNumber.replace('+', '').charAt(0);
    return 'U';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <Link to="/" className="nav-logo">
        <img 
          src="/logo/IMG_3480.PNG" 
          alt="Mavricks Logo" 
          className="logo-img" 
          style={{ height: '60px', marginRight: '10px' }} 
        />
      </Link>
      
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/tickets">Tickets</Link></li>
        <li><Link to="/policies">Policies</Link></li>
        
        {/* Render Profile / Login action */}
        <li>
          {currentUser ? (
            <button 
              type="button"
              onClick={onOpenLogin} 
              className="nav-cta nav-avatar-btn"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="nav-avatar-circle">{getInitial()}</div>
            </button>
          ) : (
            <button 
              type="button"
              onClick={onOpenLogin} 
              className="nav-cta"
              style={{ cursor: 'pointer' }}
            >
              Login
            </button>
          )}
        </li>
      </ul>

      {/* Mobile Hamburger toggle button */}
      <div
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        role="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
