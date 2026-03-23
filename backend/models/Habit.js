import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    streak: {
      type: Number,
      default: 0,
    },

    lastCompleted: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;