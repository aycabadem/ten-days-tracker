import { createSlice } from "@reduxjs/toolkit";

export const habitSlice = createSlice({
  name: "habits",
  initialState: {
    userHabits: [],
  },
  reducers: {
    setHabits: (state, action) => {
      state.userHabits = action.payload;
    },
    addHabit: (state, action) => {
      state.userHabits.push(action.payload);
    },
    editHabit: (state, action) => {
      const { habitId, newHabitData } = action.payload;
      const habitIndex = state.userHabits.findIndex(
        (habit) => habit.id === habitId
      );

      if (habitIndex !== -1) {
        state.userHabits[habitIndex] = {
          ...state.userHabits[habitIndex],
          ...newHabitData,
        };
      }
    },
    deleteHabit: (state, action) => {
      const habitId = action.payload;
      state.userHabits = state.userHabits.filter(
        (habit) => habit.id !== habitId
      );
    },
    markHabitComplete: (state, action) => {
      const habitId = action.payload;
      const habitIndex = state.userHabits.findIndex(
        (habit) => habit.id === habitId
      );

      if (habitIndex !== -1) {
        state.userHabits[habitIndex] = {
          ...state.userHabits[habitIndex],
          completed: true,
        };
      }
    },
  },
});

export const {
  setHabits,
  addHabit,
  editHabit,
  deleteHabit,
  markHabitComplete,
} = habitSlice.actions;

export default habitSlice.reducer;
