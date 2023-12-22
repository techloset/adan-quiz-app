import { AuthQuizType} from "@/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuizs = createAsyncThunk("quiz/getQuizs", async () => {
  try {
    const response = await axios.get("http://localhost:8000/quiz/getQuiz");
    if (response.data.status === "success") {
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

export const deleteQuizs = createAsyncThunk(
  "quiz/deleteQuizs",
  async (item: AuthQuizType) => {
    try {
      let id = item.Quiz.id;
      let headers = item.headers;
      const res = await axios.post(
        "http://localhost:8000/quiz/deleteQuiz",
        { id },
        { headers }
      );
      if (res.data.status === "success") {
        return res.data.quiz;
      } else {
        console.log("================catch====================");
        console.log(res.data.status);
        console.log("====================================");
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);
export const updateQuizs = createAsyncThunk(
  "quiz/updateQuizs",
  async (item: AuthQuizType) => {
    try {
      let id = item.Quiz.id;
      let title = item.Quiz.title;
      let description = item.Quiz.description;
      let headers = item.headers;
      const res = await axios.post(
        "http://localhost:8000/quiz/updateQuiz",
        { id, title, description },
        { headers }
      );
      if (res.data.status === "success") {
        return res.data.quiz;
      } else {
        console.log("================catch====================");
        console.log(res.data.status);
        console.log("====================================");
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState: { quizs: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getQuizs.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        quizs: action.payload,
      };
      return newState;
    });
    // delete
    builder.addCase(deleteQuizs.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        quizs: action.payload,
      };
      return newState;
    });
    // update
    builder.addCase(updateQuizs.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        quizs: action.payload,
      };
      return newState;
    });
  },
});

export default quizSlice.reducer;