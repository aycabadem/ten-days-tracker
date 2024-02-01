import { createSlice } from "@reduxjs/toolkit";

export const habitSlice = createSlice({
  name: "habits",
  initialState: {
    userHabits: [],
    allHabits: [],
    selectedDate: null,
  },
  reducers: {
    setHabits: (state, action) => {
      state.userHabits = action.payload;
    },
    addHabit: (state, action) => {
      state.userHabits.push(action.payload);
    },
    setAllHabits: (state, action) => {
      state.allHabits = action.payload;
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
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    // markHabitComplete: (state, action) => {
    //   const { completed } = action.payload;
    //   const habitIndex = state.userHabits.findIndex(

    //   );

    //   if (habitIndex !== -1) {
    //     state.userHabits[habitIndex] = {
    //       ...state.userHabits[habitIndex],
    //       completed,
    //     };
    //   }
    // },
  },
});

export const {
  setHabits,
  addHabit,
  editHabit,
  deleteHabit,
  markHabitComplete,
  setDate,
  setAllHabits,
} = habitSlice.actions;

export default habitSlice.reducer;
