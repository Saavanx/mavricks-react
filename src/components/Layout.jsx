import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';

export default function Layout({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const shouldDisableCustomCursor = window.matchMedia('(max-width: 768px), (hover: none)').matches;

    if (!cursor || !follower || shouldDisableCustomCursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hover elements selectors
    const handleMouseEnter = () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    };

    const bindHoverListeners = () => {
      document.querySelectorAll('a, button, .card, .nav-cta, select, input').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Re-bind hover listeners after pages mount
    const timer = setTimeout(bindHoverListeners, 150);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
      document.querySelectorAll('a, button, .card, .nav-cta, select, input').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [children]); // Re-bind hover event listeners on page changes

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
