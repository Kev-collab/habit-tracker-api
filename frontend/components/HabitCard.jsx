"use client";

import ProgressBar from "./ProgressBar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HabitCard({ habit, onUpdate }) {
  const markDone = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/habits/complete/${habit._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (res.ok) {
        alert(data.message || "Hábito completado correctamente");
        onUpdate();
      } else {
        alert(data.message || "Error al completar hábito");
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este hábito?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/habits/${habit._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (res.ok) {
        alert(data.message || "Hábito eliminado correctamente");
        onUpdate();
      } else {
        alert(data.message || "Error al eliminar hábito");
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <h2 className="text-xl font-bold text-slate-800">{habit.name}</h2>

      <p className="mt-2 text-sm text-slate-600">
        Racha actual: <span className="font-semibold">{habit.streak}</span> día
        {habit.streak === 1 ? "" : "s"}
      </p>

      <div className="mt-4">
        <ProgressBar streak={habit.streak} />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={markDone}
          className="rounded-xl bg-green-600 px-4 py-2 text-white"
        >
          Marcar como completado
        </button>

        <button
          onClick={handleDelete}
          className="rounded-xl bg-red-600 px-4 py-2 text-white"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
  