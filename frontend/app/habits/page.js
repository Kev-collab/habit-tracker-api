"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HabitCard from "../../components/HabitCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HabitsPage() {
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getHabits = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/api/habits`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setHabits(data);
      } else {
        alert(data.message || "Error al obtener hábitos");
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();

    if (!habitName.trim()) {
      alert("Escribe un nombre para el hábito");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/api/habits`, {
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
        alert(data.message || "Error al crear hábito");
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Mis hábitos</h1>

        <form
          onSubmit={handleAddHabit}
          className="mb-8 rounded-2xl bg-white p-5 shadow-md"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Nuevo hábito"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white"
            >
              Agregar hábito
            </button>
          </div>
        </form>

        {loading ? (
          <p className="text-slate-600">Cargando hábitos...</p>
        ) : habits.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-md">
            <p className="text-slate-600">Aún no tienes hábitos creados.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {habits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} onUpdate={getHabits} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}