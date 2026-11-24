import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/figtree';
import './index.css';
import App from './App.tsx';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// En production, chaque page est prérendue en HTML (voir scripts/prerender.mjs) : on l'hydrate.
// En développement, la racine est vide : rendu client classique.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
