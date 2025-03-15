// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { Game } from './Game';
import { WorldProvider } from 'koota/react';
import { world } from './world';

// Create root & render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WorldProvider world={world}>
      <Game />
    </WorldProvider>
  </React.StrictMode>
);
