import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import habitRoutes from "./routes/habits.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Conectar DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta test
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Rutas
app.use("/api/habits", habitRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});