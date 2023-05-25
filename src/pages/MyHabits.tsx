import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

import { Header } from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { api } from '../lib/axios';

interface UserHabit {
  created_at: string;
  id: string;
  title: string;
  userId: string;
  weekDays: number[];
}

export function MyHabits() {
  const { user } = useAuth();
  const username = user?.username;

  const [userHabits, setUserHabits] = useState<UserHabit[] | null>(null);

  const daysLetter = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  function handleToggleWeekDay(habitIndex: number, weekDay: number) {
    if (!userHabits) return;

    if (userHabits[habitIndex].weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = userHabits[habitIndex].weekDays.filter((day) => day !== weekDay);
      const newUserHabits = [...userHabits];

      newUserHabits[habitIndex] = { ...userHabits[habitIndex], weekDays: weekDaysWithRemovedOne };

      setUserHabits(newUserHabits);
    } else {
      const weekDaysWithAddedOne = [...userHabits[habitIndex].weekDays, weekDay];
      const newUserHabits = [...userHabits];

      newUserHabits[habitIndex] = { ...userHabits[habitIndex], weekDays: weekDaysWithAddedOne };

      setUserHabits(newUserHabits);
    }
  }

  useEffect(() => {
    api.post('/habits', { username }).then((response) => setUserHabits(response.data.userHabits));
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center pt-56">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-32">
        <Header />

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[15%_45%_35%_5%] justify-items-center border border-violet-500 rounded-lg py-2 px-4">
            <div>Data</div>

            <div className="border border-transparent border-x-violet-500 w-full text-center">Hábito</div>

            <div>Dias</div>
          </div>

          {userHabits &&
            userHabits.map((habit: UserHabit, habitIndex) => {
              return (
                <div
                  key={habitIndex}
                  className="grid grid-cols-[15%_45%_35%_5%] justify-items-center items-center border border-violet-500 rounded-lg py-2 px-4"
                >
                  <div>{dayjs(habit.created_at).format('DD/MM/YYYY')}</div>

                  <div>{habit.title}</div>

                  <div className="flex gap-2">
                    {daysLetter.map((day, index) => (
                      <div key={index}>
                        <Checkbox.Root
                          key={index}
                          className="flex items-center gap-1 group focus:outline-none"
                          checked={habit.weekDays.includes(index)}
                          onCheckedChange={() => handleToggleWeekDay(habitIndex, index)}
                          disabled={true}
                        >
                          <span className="text-white leading-tight">{day}</span>

                          <div className="h-5 w-5 rounded flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                            <Checkbox.CheckboxIndicator>
                              <Check size={20} className="text-white" />
                            </Checkbox.CheckboxIndicator>
                          </div>
                        </Checkbox.Root>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
