import { createContext, ReactNode, useState } from 'react';
import Cookies from 'universal-cookie';

import { api } from '../lib/axios';

export interface UserProps {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps | null;
  isUserLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContexProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<UserProps | null>(null);

  const cookies = new Cookies();

  const isAuthenticated = !!user;

  async function signIn() {
    try {
      setIsUserLoading(true);

      const urlParams = new URLSearchParams(window.location.search);
      const access = urlParams.get('access');

      let credentials = cookies.get('habits.google.credentials');

      if (access) {
        window.history.replaceState({}, '', window.location.href.split('?')[0]);
        cookies.set('habits.google.credentials', access, { maxAge: 60 * 15, secure: true, sameSite: 'strict' });
        credentials = cookies.get('habits.google.credentials');
      }

      if (!credentials && cookies.get('habits.google.refresh')) {
        await api.get('/login/refresh', { withCredentials: true });
        credentials = cookies.get('habits.google.credentials');
      }

      if (credentials) {
        const tokenResponse = await api.post('/users', { access_token: credentials });

        api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.userToken}`;

        const userInfoResponse = await api.get('/me');

        setUser(userInfoResponse.data.user);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  function signOut() {
    cookies.remove('habits.google.credentials');
    cookies.remove('habits.google.refresh');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isUserLoading,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
