import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Tickets from './pages/Tickets';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <Home />
              </Layout>
            } 
          />
          <Route 
            path="/about" 
            element={
              <Layout>
                <About />
              </Layout>
            } 
          />
          <Route 
            path="/events" 
            element={
              <Layout>
                <Events />
              </Layout>
            } 
          />
          <Route 
            path="/tickets" 
            element={
              <Layout>
                <Tickets />
              </Layout>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <Layout>
                <Contact />
              </Layout>
            } 
          />
          <Route 
            path="/policies" 
            element={
              <Layout>
                <Policies />
              </Layout>
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <Layout>
                <Gallery />
              </Layout>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
