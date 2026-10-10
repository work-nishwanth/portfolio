import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/anton';
import '@fontsource/manrope';
import '@fontsource/dm-mono';
import '@fontsource/instrument-serif';
import '@fontsource/instrument-serif/400-italic.css';
import './styles/tokens.css';
import './styles/grain.css';
import './styles/global.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
