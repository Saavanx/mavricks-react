import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenLogin }) {
  const location = useLocation();
  const { currentUser } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Compute initials for profile badge
  const getInitial = () => {
    if (!currentUser) return 'U';
    if (currentUser.displayName) return currentUser.displayName.trim().charAt(0).toUpperCase();
    if (currentUser.email) return currentUser.email.trim().charAt(0).toUpperCase();
    if (currentUser.phoneNumber) return currentUser.phoneNumber.replace('+', '').charAt(0);
    return 'U';
  };

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/logo/IMG_3478.PNG" alt="Mavricks Logo" />
        </Link>
        <nav className="nav-menu">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/about" className={isActive('/about')}>About Us</Link>
          <Link to="/events" className={isActive('/events')}>Events</Link>
          <Link to="/tickets" className={isActive('/tickets')}>Tickets</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact Us</Link>
        </nav>
        <div className="nav-actions">
          {currentUser ? (
            <button 
              type="button"
              onClick={onOpenLogin} 
              className="nav-cta nav-avatar-btn"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
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
        </div>
      </div>
    </header>
  );
}
