import { AuthQuestionType } from "@/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async (id: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/question/getQuestion",
        { id }
      );
      if (response.data.status === "success") {
        return response.data.question;
      } else {
        console.log("================catch====================");
        console.log(response.data);
        console.log("====================================");
        return null;
      }
    } catch (error: any) {
      console.log("================catch====================");
      console.log(error.message);
      console.log("====================================");
      throw error;
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (item: AuthQuestionType) => {
    try {
      let id = item.Question.id;
      let QuizId = item.id;
      let headers = item.headers;
      const res = await axios.post(
        "http://localhost:8000/question/deleteQuestion",
        { id, QuizId },
        { headers }
      );
      if (res.data.status === "success") {
        return res.data.question;
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
export const updateQuestion = createAsyncThunk(
  "question/updateQuestion",
  async (item: AuthQuestionType) => {
    try {
      let id = item.Question.id;
      let question = item.Question.Question;
      let correctOption = item.Question.CorrectOption;
      let OptionOne = item.Question.OptionOne;
      let OptionTwo = item.Question.OptionTwo;
      let OptionThree = item.Question.OptionThree;
      let headers = item.headers;
      const res = await axios.post(
        "http://localhost:8000/question/updateQuestion",
        { id, question, correctOption, OptionOne, OptionTwo, OptionThree },
        { headers }
      );
      if (res.data.status === "success") {
        return res.data.question;
      } else {
        console.log("================catch====================");
        console.log(res.data.status);
        console.log(res.data.message);
        console.log("====================================");
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);
export const questionSlice = createSlice({
  name: "question",
  initialState: { question: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        question: action.payload,
      };
      return newState;
    });
    // delete
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        question: action.payload,
      };
      return newState;
    });
    // update
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        question: action.payload,
      };
      return newState;
    });
  },
});

export default questionSlice.reducer;
