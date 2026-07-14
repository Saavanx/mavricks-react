import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';

export default function Layout({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
