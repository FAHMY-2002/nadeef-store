import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ReviewsProvider } from './context/ReviewsContext.jsx';

import './styles/base.css';
import './styles/components.css';
import './styles/home.css';
import './styles/pages.css';

// BrowserRouter gives clean URLs (/shop, /product/...). The MemoryRouter
// option exists only for embedded previews where the URL can't change.
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ReviewsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ReviewsProvider>
    </Router>
  </StrictMode>
);
