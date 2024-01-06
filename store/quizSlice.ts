import { GET, POST } from "@/lib/instance";
import { AuthQuizType } from "@/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const withLoading = async (asyncFn: () => Promise<any>, dispatch: any) => {
  dispatch(quizSlice.actions.setLoading(true));
  try {
    const response = await asyncFn();
    return response.data.status === "success" ? response.data.quizs : null;
  } catch (error: any) {
    console.log("================catch====================");
    console.log(error.message);
    console.log("====================================");
    throw error;
  } finally {
    dispatch(quizSlice.actions.setLoading(false));
  }
};

export const getQuizs = createAsyncThunk(
  "quiz/getQuizs",
  async (_, { dispatch }) => {
    try {
      return await withLoading(() => GET("/quiz/getQuiz"), dispatch);
    } catch (error: any) {
      console.log("================catch====================");
      console.log(error.message);
      console.log("====================================");
      throw error;
    }
  }
);

export const deleteQuizs = createAsyncThunk(
  "quiz/deleteQuizs",
  async (item: AuthQuizType) => {
    try {
      let id = item.Quiz.id;
      const res = await POST("/quiz/deleteQuiz", { id });
      if (res.data.status === "success") {
        return res.data.quizs;
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
      const res = await POST("/quiz/updateQuiz", {
        id,
        title,
        description,
      });
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
  initialState: { quizs: [], error: null, loading: false },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get
    builder.addCase(getQuizs.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        quizs: action.payload,
        loading: false,
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
export const { setLoading } = quizSlice.actions;

export const selectLoading = (state: { quiz: any }) => state.quiz.loading;
export default quizSlice.reducer;
