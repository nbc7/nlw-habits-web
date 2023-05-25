import '../styles/global.css';
import '../lib/dayjs';

import { Header } from '../components/Header';
import heroImage from '../assets/hero support img.svg';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="w-screen h-screen flex justify-center pt-56">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-32">
        <Header />

        <div className="w-full max-w-5xl mx-auto flex justify-between gap-[26px]">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="font-semibold text-5xl leading-[60px] text-center">Desenvolva novos hábitos e tenha uma rotina melhor.</h1>

            <a
              href={user ? `/${encodeURI(user.email.split('@')[0])}` : `${import.meta.env.VITE_SERVER_BASE_URL}/login`}
              className="border font-semibold rounded-lg px-6 py-4 flex items-center gap-3 transition-colors border-violet-500 bg-violet-500 hover:border-violet-300 hover:bg-violet-300 focus:ring-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
            >
              Comece hoje!
            </a>
          </div>

          <img src={heroImage} alt="imagem demonstrativa" />
        </div>
      </div>
    </div>
  );
}
