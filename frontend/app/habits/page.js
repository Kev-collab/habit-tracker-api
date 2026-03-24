"use client";

import { useEffect, useState } from "react";

export default function HabitsPage() {
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState([]);

  const getHabits = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5001/api/habits", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setHabits(data);
    } else {
      alert(data.message);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5001/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: habitName }),
    });

    const data = await res.json();

    if (res.ok) {
      setHabitName("");
      getHabits();
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div>
      <h1>Mis hábitos</h1>

      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          placeholder="Nuevo hábito"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <button type="submit">Agregar hábito</button>
      </form>

      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>{habit.name}</li>
        ))}
      </ul>
    </div>
  );
}