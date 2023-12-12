import { createSlice } from '@reduxjs/toolkit';
import { RoootState } from './store';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;

export const selectToken = (state:RoootState) => state.user.token;

export default userSlice.reducer;