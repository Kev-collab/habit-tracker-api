"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHabits } from "../redux/habitsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.items);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/habits");
        const data = await res.json();
        dispatch(setHabits(data));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHabits();
  }, [dispatch]);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Lista de hábitos</h1>

      {habits.length === 0 ? (
        <p>No hay hábitos registrados</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit._id}>
              <strong>{habit.name}</strong> - {habit.description}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
