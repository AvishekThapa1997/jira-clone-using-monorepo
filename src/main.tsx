import '@radix-ui/themes/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Theme } from '@radix-ui/themes';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './features/auth/provider/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>,
);
