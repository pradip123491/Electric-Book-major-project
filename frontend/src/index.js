import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css";
import App from './App';
import  "./i18n/index.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
