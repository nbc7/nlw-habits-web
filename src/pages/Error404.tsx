import { Header } from '../components/Header';

export function Error404() {
  return (
    <div className="w-screen h-screen flex justify-center pt-56">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />

        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <p className="text-violet-500 text-[256px] font-bold">404</p>
            <p className="absolute font-semibold text-2xl drop-shadow">A página que você está procurando não existe</p>
          </div>

          <a
            href="/"
            className="border font-semibold rounded-lg px-6 py-4 flex items-center gap-3 transition-colors border-violet-500 bg-violet-500 hover:border-violet-300 hover:bg-violet-300 focus:ring-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
          >
            Página inicial
          </a>
        </div>
      </div>
    </div>
  );
}
