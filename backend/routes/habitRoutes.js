import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getHabits,
  createHabit,
  completeHabit,
  deleteHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.get("/", protect, getHabits);
router.post("/", protect, createHabit);
router.put("/complete/:id", protect, completeHabit);
router.delete("/:id", protect, deleteHabit);

export default router;