import '../styles/global.css';
import '../lib/dayjs';

import { Header } from '../components/Header';
import { SummaryTable } from '../components/SummaryTable';

export function Error404() {
  return (
    <div className="w-screen h-screen flex justify-center mt-56">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />

        <h1>404 - Not found</h1>
      </div>
    </div>
  );
}
