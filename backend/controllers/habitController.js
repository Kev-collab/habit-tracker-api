import Habit from "../models/Habit.js";

const getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getDayDifference = (date1, date2) => {
  const first = getStartOfDay(date1);
  const second = getStartOfDay(date2);
  const diffTime = second - first;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    const today = new Date();
    let updated = false;

    for (const habit of habits) {
      if (habit.lastCompleted) {
        const diffDays = getDayDifference(habit.lastCompleted, today);

        if (diffDays > 1 && habit.streak !== 0) {
          habit.streak = 0;
          await habit.save();
          updated = true;
        }
      }
    }

    const refreshedHabits = updated
      ? await Habit.find({ userId: req.user._id }).sort({ createdAt: -1 })
      : habits;

    res.status(200).json(refreshedHabits);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener hábitos" });
  }
};

export const createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const habit = await Habit.create({
      name: name.trim(),
      userId: req.user._id,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: "Error al crear hábito" });
  }
};

export const completeHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }

    const today = new Date();

    if (!habit.lastCompleted) {
      habit.streak = 1;
      habit.lastCompleted = today;
      await habit.save();

      return res.status(200).json({
        message: "Hábito completado por primera vez",
        habit,
      });
    }

    const diffDays = getDayDifference(habit.lastCompleted, today);

    if (diffDays === 0) {
      return res.status(200).json({
        message: "Este hábito ya fue completado hoy",
        habit,
      });
    }

    if (diffDays === 1) {
      habit.streak += 1;
    } else {
      habit.streak = 1;
    }

    habit.lastCompleted = today;
    await habit.save();

    res.status(200).json({
      message: "Hábito completado correctamente",
      habit,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al completar hábito" });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }

    res.status(200).json({ message: "Hábito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar hábito" });
  }
};