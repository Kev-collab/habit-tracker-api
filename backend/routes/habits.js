import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getHabits,
  createHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.get("/", protect, getHabits);
router.post("/", protect, createHabit);

export default router;
