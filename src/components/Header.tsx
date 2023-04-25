import { Plus, X, CaretDown } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import logoImage from '../assets/logo.svg';
import { NewHabitForm } from './NewHabitForm';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { signIn, signOut, isUserLoading, isAuthenticated, user } = useAuth();

  function Login({ isDisabled = false }) {
    return (
      <a
        href={`${import.meta.env.VITE_SERVER_BASE_URL}/login`}
        className={clsx(
          'border font-semibold rounded-lg px-6 py-4 flex items-center gap-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
          {
            'border-zinc-800 bg-zinc-900 focus:ring-zinc-800 cursor-default': isDisabled,
            'border-violet-500 bg-violet-500 hover:border-violet-300 hover:bg-violet-300 focus:ring-violet-600': !isDisabled,
          }
        )}
        onClick={isDisabled ? (e) => e.preventDefault() : () => {}}
      >
        Login
      </a>
    );
  }

  function Logout() {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

    const DropDownMenuItemStyle =
      'px-6 py-4 font-semibold rounded-lg text-center hover:border-violet-500 hover:bg-violet-500 hover:cursor-pointer transition-colors transition-[focus] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-600';

    useEffect(() => {
      if (triggerRef.current) setTriggerWidth(triggerRef.current.offsetWidth);
    }, [triggerRef]);

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          ref={triggerRef}
          className="border border-violet-500 font-semibold rounded-lg px-6 py-2 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
        >
          <CaretDown size={20} className="text-violet-500" />
          {user?.name.split(' ')[0].substring(0, 12)}
          <img
            src={user?.avatarUrl}
            alt={`${user?.name.split(' ')[0].substring(0, 12)} profile picture`}
            width={36}
            height={36}
            referrerPolicy="no-referrer"
            className="rounded-full"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          {triggerWidth && (
            <DropdownMenu.Content className="bg-background border border-violet-500 rounded-lg" style={{ width: triggerWidth }}>
              <Link to="/profile">
                <DropdownMenu.Item className={DropDownMenuItemStyle}>Profile</DropdownMenu.Item>
              </Link>

              <Link to="/settings">
                <DropdownMenu.Item className={DropDownMenuItemStyle}>Settings</DropdownMenu.Item>
              </Link>

              <Link to="/">
                <DropdownMenu.Item className={DropDownMenuItemStyle} onClick={signOut}>
                  Logout
                </DropdownMenu.Item>
              </Link>

              <DropdownMenu.Arrow height={8} width={16} className="fill-violet-500" />
            </DropdownMenu.Content>
          )}
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <Link to="/">
        <img src={logoImage} alt="Habits" />
      </Link>

      <div className="flex gap-3">
        <Dialog.Root>
          <Dialog.Trigger
            type="button"
            className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Plus size={20} className="text-violet-500" />
            Novo hábito
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

            <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
                <X size={24} aria-label="Fechar" />
              </Dialog.Close>

              <Dialog.Title className="text-3xl leading-tight font-extrabold">Criar hábito</Dialog.Title>

              <NewHabitForm />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {!isAuthenticated ? <Login isDisabled={isUserLoading} /> : <Logout />}
      </div>
    </div>
  );
}
