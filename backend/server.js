import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import habitsRoutes from "./routes/habits.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de hábitos funcionando correctamente");
});

// Rutas
app.use("/api/habits", habitsRoutes);
app.use("/api/auth", authRoutes);

export default app;