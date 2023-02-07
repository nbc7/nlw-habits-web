interface HabitProps {
  completed: number;
}

export function Habit(props: HabitProps) {
  return <p className="bg-zinc-900">{props.completed}</p>;
}
