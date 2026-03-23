import Habit from "../models/Habit.js";

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHabit = async (req, res) => {
  try {
    const habit = new Habit({
      name: req.body.name,
      userId: req.body.userId
    });

    const savedHabit = await habit.save();

    res.status(201).json(savedHabit);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (!habit.lastCompleted) {
      habit.streak = 1;
    } 
    else if (
      new Date(habit.lastCompleted).toDateString() === yesterday.toDateString()
    ) {
      habit.streak += 1;
    } 
    else if (
      new Date(habit.lastCompleted).toDateString() !== today.toDateString()
    ) {
      habit.streak = 1;
    }

    habit.lastCompleted = today;

    await habit.save();

    res.json(habit);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);

    res.json({ message: "Hábito eliminado" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};