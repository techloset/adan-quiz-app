import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuizs = createAsyncThunk("quiz/getQuizs", async () => {
    try {
      console.log("quiz are coming");
      const response = await axios.get("http://localhost:8000/quiz/getQuiz");
      if (response.data.status === "success") {
        console.log("quiz are coming2", response.data.quizs);
        return response.data.quizs; 
      } else {
        console.log("================catch====================");
        console.log(response.data.status);
        console.log("====================================");
        return null;
      }
    } catch (error: any) {
      console.log("================catch====================");
      console.log(error.message);
      console.log("====================================");
      throw error;
    }
  });
  

export const quizSlice = createSlice({
  name: "quiz",
  initialState: { quizs: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizs.fulfilled, (state, action) => {
      console.log(action, "get quizes");
      let newState: any = {
        ...state,
        quizs: action.payload,
      };
      return newState;
    });
  },
});

export default quizSlice.reducer;
