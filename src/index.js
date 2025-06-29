// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Pastikan App ini mengarah ke file App.js Anda

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);