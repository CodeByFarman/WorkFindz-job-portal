import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Add the global polyfill to ensure 'global' is defined
if (typeof globalThis === 'undefined') {
  window.globalThis = window;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
