import '../styles/global.css';
import '../lib/dayjs';

import { Header } from '../components/Header';
import { SummaryTable } from '../components/SummaryTable';
import { useAuth } from '../hooks/useAuth';

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="w-screen h-screen flex justify-center pt-56">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />

        {user && (
          <div className="flex items-center justify-center gap-6">
            <img src={user.avatarUrl} alt="foto de perfil" className="h-16 w-16 rounded-full" />

            <p className="font-semibold text-xl">{`${user.name.substring(0, 60)}${user.name.length > 60 ? '...' : ''}`}</p>
          </div>
        )}

        <SummaryTable />
      </div>
    </div>
  );
}
