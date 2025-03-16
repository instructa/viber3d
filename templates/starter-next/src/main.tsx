// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { App } from './app';
import { WorldProvider } from 'koota/react';
import { world } from './world';

// Create root & render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WorldProvider world={world}>
      <App />
    </WorldProvider>
  </React.StrictMode>
);
