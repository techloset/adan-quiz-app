import { POST } from "@/lib/instance";
import { AuthResulttype, AuthTestQuiz } from "@/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const withLoading = async (asyncFn: () => Promise<any>, dispatch: any) => {
  dispatch(userSlice.actions.setLoading(true));
  try {
    const response = await asyncFn();
    return response.data.status === "success" ? response.data.quiz : null;
  } catch (error: any) {
    console.log("================catch====================");
    console.log(error.message);
    console.log("====================================");
    throw error;
  } finally {
    dispatch(userSlice.actions.setLoading(false));
  }
};
export const getQuiz = createAsyncThunk(
  "user/getQuiz",
  async (item: AuthTestQuiz, { dispatch }) => {
    try {
      let id = item.id;
      return await withLoading(() => POST("/user/getQuiz", { id }), dispatch);
    } catch (error: any) {
      console.log("================catch====================");
      console.log(error.message);
      console.log("====================================");
      throw error;
    }
  }
);

export const getResult = createAsyncThunk(
  "user/getResult",
  async (item: AuthResulttype, { dispatch }) => {
    try {
      let id = item.id;
      const response = await POST("/user/getResult", {
        id,
      });
      if (response.data.status === "success") {
        return response.data.result;
      }
    } catch (error: any) {
      console.log("================catch====================");
      console.log(error.message);
      console.log("====================================");
      throw error;
    }
  }
);
const withResultsLoading = async (
  asyncFn: () => Promise<any>,
  dispatch: any
) => {
  dispatch(userSlice.actions.setResultLoading(true));
  try {
    const response = await asyncFn();
    return response.data.status === "success" ? response.data.results : null;
  } catch (error: any) {
    console.log("================catch====================");
    console.log(error.message);
    console.log("====================================");
    throw error;
  } finally {
    dispatch(userSlice.actions.setResultLoading(false));
  }
};
export const getResults = createAsyncThunk(
  "user/getResults",
  async (_, { dispatch }) => {
    try {
      return await withResultsLoading(
        () => POST("/user/getResults", {}),
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

export const userSlice = createSlice({
  name: "user",
  initialState: {
    quiz: {},
    error: null,
    result: {},
    results: [],
    loading: false,
    resultsLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResultLoading: (state, action) => {
      state.resultsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get test
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        quiz: action.payload,
        loading: false,
      };
      return newState;
    });
    // get result
    builder.addCase(getResult.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        result: action.payload,
      };
      return newState;
    });
    builder.addCase(getResults.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        results: action.payload,
        resultsLoading: false,
      };
      return newState;
    });
  },
});
export const { setLoading } = userSlice.actions;

export const selectLoading = (state: { user: any }) => state.user.loading;
export const { setResultLoading } = userSlice.actions;

export const selectResultLoading = (state: { user: any }) =>
  state.user.resultsLoading;
export default userSlice.reducer;
