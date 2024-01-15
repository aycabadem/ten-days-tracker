import { configureStore } from "@reduxjs/toolkit";
import { habitSlice } from "./habitSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./authSlice";

const reducers = combineReducers({
  user: userSlice.reducer,
  habits: habitSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
});
