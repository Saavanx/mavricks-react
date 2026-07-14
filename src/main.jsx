import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Import Global Stylesheets
import './assets/css/style.css';
import './assets/css/home.css';
import './assets/css/about.css';
import './assets/css/contact.css';
import './assets/css/events.css';
import './assets/css/tickets.css';
import './assets/css/gallery.css';
import './assets/css/policies.css';

// Remove the default Vite index.css
// import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
