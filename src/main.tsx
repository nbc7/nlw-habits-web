import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';
import { AuthContexProvider } from './contexts/AuthContext';

import './styles/global.css';
import './lib/dayjs';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContexProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.StrictMode>
  </AuthContexProvider>
);
