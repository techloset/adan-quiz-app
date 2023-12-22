import { AuthQuizType, AuthResulttype, AuthTestQuiz } from "@/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuiz = createAsyncThunk(
  "user/getQuiz",
  async (item: AuthTestQuiz) => {
    try {
      let id = item.id;
      let headers = item.headers;
      const response = await axios.post(
        "http://localhost:8000/user/getQuiz",
        {
          id,
        },
        { headers }
      );
      if (response.data.status === "success") {
        return response.data.quiz;
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

export const getResult = createAsyncThunk(
  "user/getResult",
  async (item: AuthResulttype) => {
    try {
      let id = item.id;
      let headers = item.headers;
      const response = await axios.post(
        "http://localhost:8000/user/getResult",
        {
          id,
        },
        { headers }
      );
      if (response.data.status === "success") {
        return response.data.result;
      }
      console.log("================catch====================");
      console.log(response.data);
      console.log("====================================");
      return null;
    } catch (error: any) {
      console.log("================catch====================");
      console.log(error.message);
      console.log("====================================");
      throw error;
    }
  }
);

export const getResults = createAsyncThunk(
  "user/getResults",
  async (item: AuthResulttype) => {
    try {
      let id = item.id;
      let headers = item.headers;
      const response = await axios.post(
        "http://localhost:8000/user/getResult",
        { headers }
      );
      if (response.data.status === "success") {
        return response.data.result;
      }
      console.log("================catch====================");
      console.log(response.data);
      console.log("====================================");
      return null;
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
    quiz: {
      id: "",
      title: "",
      description: "",
      Question: [],
    },
    error: null,
    result: {},
    results: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // get test
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      let newState: any = {
        ...state,
        quiz: action.payload,
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
    
  },
});

export default userSlice.reducer;
