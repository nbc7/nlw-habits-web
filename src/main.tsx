import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AuthContexProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContexProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContexProvider>
);
