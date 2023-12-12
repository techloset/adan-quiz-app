import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import quizSlice from "./quizSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz:quizSlice,
  },
});
export type RoootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
