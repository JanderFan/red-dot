import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RedDotProvider } from 'red-dot-react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RedDotProvider>
      <App />
    </RedDotProvider>
  </StrictMode>
);
