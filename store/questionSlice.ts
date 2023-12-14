import { AuthQuestionType, QuestionType,} from "@/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestions = createAsyncThunk("question/getQuestions", async (id:string) => {
  try {
    const response = await axios.post("http://localhost:8000/question/getQuestion",{ id },);
    if (response.data.status === "success") {
      return response.data.question;
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
export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (item: AuthQuestionType) => {
    try {
      let id = item.Question.id;
      let headers = item.headers;
      const res = await axios.post(
        "http://localhost:8000/question/deleteQuestion",
        { id },
        { headers }
      );

      return res.data.question;
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
      return res.data.question;
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
      const questions = state.question;
      const item = action.payload;
      let filteredQuestions = questions.filter(
        (question: QuestionType) => item.id !== question.id
      );
      let newState: any = {
        ...state,
        question: filteredQuestions,
      };
      return newState;
    });
    // update
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      const questions = state.question;
      const updatedquestion = action.payload;
      const updatedquestions = questions .map((question: QuestionType) =>
        question.id === updatedquestion.id ? updatedquestion : question
      );
      let newState: any = {
        ...state,
        question: updatedquestions,
      };
      return newState;
    });
  },
});

export default questionSlice.reducer;
