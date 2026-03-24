import Habit from "../models/Habit.js";

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener hábitos" });
  }
};

export const createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const habit = await Habit.create({
      name,
      userId: req.user._id,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: "Error al crear hábito" });
  }
};