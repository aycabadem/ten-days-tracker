import { createSlice } from "@reduxjs/toolkit";

export const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habits: [],
  },
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    markCompleted: (state, action) => {
      const { habitIndex, completion } = action.payload;
      state.habits[habitIndex].completion = completion;
    },
  },
});

export const { addHabit, markCompleted } = habitSlice.actions;

export default habitSlice.reducer;
