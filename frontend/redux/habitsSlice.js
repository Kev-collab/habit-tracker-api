import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: [
    {
      id: 1,
      title: "Tomar agua",
      description: "Beber al menos 8 vasos al día",
      progress: 20,
    },
    {
      id: 2,
      title: "Leer 10 minutos",
      description: "Leer un libro cada día",
      progress: 45,
    },
    {
      id: 3,
      title: "Hacer ejercicio",
      description: "Entrenar 30 minutos",
      progress: 70,
    },
  ],
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
});

export const selectHabits = (state) => state.habits.habits;

export default habitsSlice.reducer;