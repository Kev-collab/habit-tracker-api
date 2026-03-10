const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// Crear hábito
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const newHabit = new Habit({
      name,
      description,
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error al crear hábito", error: error.message });
  }
});

// Obtener todos los hábitos
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener hábitos", error: error.message });
  }
});

// Actualizar hábito
router.put("/:id", async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar hábito", error: error.message });
  }
});

// Eliminar hábito
router.delete("/:id", async (req, res) => {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);

    if (!deletedHabit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }

    res.status(200).json({ message: "Hábito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar hábito", error: error.message });
  }
});

module.exports = router;
