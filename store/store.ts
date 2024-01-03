import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import quizSlice from "./quizSlice";
import questionSlice from "./questionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizSlice,
    question: questionSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
