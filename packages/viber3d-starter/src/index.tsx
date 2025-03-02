import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Game from './Game';

import './styles.css';


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Game />
  </StrictMode>
);
