"use client";

import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login correcto");
        router.push("/habits");
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Correo"
          className="w-full mb-4 p-3 border rounded-xl"
          autoComplete="email"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-3 border rounded-xl"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-xl"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}