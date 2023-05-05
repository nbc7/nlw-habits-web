import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';

import { App } from './pages/App';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Error404 } from './pages/Error404';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}

export function Router() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/:username" element={<Profile />} />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <App />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
