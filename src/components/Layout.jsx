import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';

export default function Layout({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    // 1. Custom Cursor Followers (Desktop Only)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const shouldDisableCustomCursor = window.matchMedia('(max-width: 768px), (hover: none)').matches;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
    };

    if (cursor && follower && !shouldDisableCustomCursor) {
      document.addEventListener('mousemove', handleMouseMove);

      const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        animationFrameId = requestAnimationFrame(animateFollower);
      };
      animateFollower();
    }

    // Hover listeners definition
    const handleMouseEnter = () => {
      if (cursor) cursor.classList.add('hover');
      if (follower) follower.classList.add('hover');
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.classList.remove('hover');
      if (follower) follower.classList.remove('hover');
    };

    const bindHoverListeners = () => {
      document.querySelectorAll('a, button, .card, .nav-cta, select, input').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // 2. Scroll Reveal Animations Observer
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const setupReveals = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        // Remove old visible state if route changed, to re-trigger animation
        el.classList.remove('visible');
        revealObserver.observe(el);
      });
    };

    // 3. Stats Count-up Observer
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const setupCounters = () => {
      document.querySelectorAll('[data-target]').forEach(c => {
        c.textContent = '0';
        counterObserver.observe(c);
      });
    };

    // 4. Infinite Ticker Duplication
    const setupTicker = () => {
      const track = document.querySelector('.ticker-track');
      if (track && !track.dataset.cloned) {
        track.innerHTML += track.innerHTML;
        track.dataset.cloned = 'true';
      }
    };

    // Schedule bindings to ensure components are in the DOM
    const timer = setTimeout(() => {
      bindHoverListeners();
      setupReveals();
      setupCounters();
      setupTicker();
    }, 150);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
      revealObserver.disconnect();
      counterObserver.disconnect();
      document.querySelectorAll('a, button, .card, .nav-cta, select, input').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [children]); // Re-run when pages switch

  return (
    <>
      {/* Custom Cursor Followers */}
      <div className="cursor"></div>
      <div className="cursor-follower"></div>
      <div className="page-transition"></div>

      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
