"use client";

import { useSelector } from "react-redux";
import { selectHabits } from "../redux/habitsSlice";
import HabitCard from "../components/HabitCard";

export default function HomePage() {
  const habits = useSelector(selectHabits);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-4xl font-extrabold text-slate-900">
          Habit Tracker
        </h1>

        <p className="mb-8 text-slate-600">
          Manage your daily habits and track your progress to 66 days.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </main>
  );
}
