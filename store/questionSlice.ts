import { POST } from "@/lib/instance";
import { AuthQuestionType } from "@/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const withLoading = async (asyncFn: () => Promise<any>, dispatch: any) => {
  dispatch(questionSlice.actions.setLoading(true));
  try {
    const response = await asyncFn();
    return response.data.status === "success" ? response.data.question : null;
  } catch (error: any) {
    console.log("================catch====================");
    console.log(error.message);
    console.log("====================================");
    throw error;
  } finally {
    dispatch(questionSlice.actions.setLoading(false));
  }
};

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async (id: string, { dispatch }) => {
    try {
      return await withLoading(
        () => POST("/question/getQuestion", { id }),
        dispatch
      );
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
      let QuizId = item.QuizId;
      const res = await POST("/question/deleteQuestion", { id, QuizId });
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
      let QuizId = item.QuizId
      const res = await POST("/question/updateQuestion", {
        id,
        question,
        correctOption,
        OptionOne,
        OptionTwo,
        OptionThree,
        QuizId
      });
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
  initialState: { question: [], error: null, loading: false },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        question: action.payload,
        loading: false,
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
export const { setLoading } = questionSlice.actions;

export const selectLoading = (state: { question: any }) => state.question.loading;
export default questionSlice.reducer;
