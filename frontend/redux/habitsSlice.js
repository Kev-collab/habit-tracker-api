import { createSlice } from "@reduxjs/toolkit";

const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    items: [],
  },
  reducers: {
    setHabits: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
