import express from "express";
import Habit from "../models/Habit.js";

const router = express.Router();

// Crear hábito
router.post("/", async (req, res) => {
  try {
    const { name, userId } = req.body;

    const newHabit = new Habit({
      name,
      userId,
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener hábitos
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
