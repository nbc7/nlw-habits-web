import '../styles/global.css';
import '../lib/dayjs';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../components/Header';
import { SummaryTable } from '../components/SummaryTable';
import { UserProps } from '../contexts/AuthContext';
import { ProfileContext } from '../contexts/ProfileContext';
import { api } from '../lib/axios';

import { Error404 } from './Error404';

export function Profile() {
  const { username } = useParams();
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    setIsLoading(true);

    api.post(`/users/${username}/profile`, { username }).then((response) => {
      setUser(response.data);
      setIsLoading(false);
    });
  }, [username]);

  if (loading) return <h1 className="w-screen h-screen flex items-center justify-center">Loading...</h1>;

  if (!user) return <Error404 />;

  return (
    <div className="w-screen h-screen flex justify-center pt-56">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />

        <div className="flex items-center justify-center gap-6">
          <img src={user.avatarUrl} alt="foto de perfil" className="h-16 w-16 rounded-full" />

          <p className="font-semibold text-xl">{`${user.name.substring(0, 60)}${user.name.length > 60 ? '...' : ''}`}</p>
        </div>

        <ProfileContext.Provider value={user}>
          <SummaryTable />
        </ProfileContext.Provider>
      </div>
    </div>
  );
}
