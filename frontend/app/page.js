"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/habits");
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error("Error al obtener hábitos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !userId) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId }),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear el hábito");
      }

      setName("");
      setUserId("");
      fetchHabits();
    } catch (error) {
      console.error("Error al crear hábito:", error);
      alert("Error al crear hábito");
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
  <h1 style={{ marginBottom: "20px" }}>Mis Hábitos</h1>

  <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
    <input
      type="text"
      placeholder="Nombre del hábito"
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={{ marginRight: "10px", padding: "8px" }}
    />

    <input
      type="text"
      placeholder="Usuario"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
      style={{ marginRight: "10px", padding: "8px" }}
    />

    <button
      type="submit"
      style={{
        padding: "8px 12px",
        backgroundColor: "black",
        color: "white",
        border: "none",
      }}
    >
      Agregar hábito
    </button>
  </form>

  <ul>
    {habits.map((habit) => (
      <li key={habit._id} style={{ marginBottom: "10px" }}>
        <strong>{habit.name}</strong> - Usuario: {habit.userId}
      </li>
    ))}
  </ul>
</main>
  );
}
