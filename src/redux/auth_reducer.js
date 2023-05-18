import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    auth: window.localStorage.getItem("token")
      ? {
          accessToken: window.localStorage.getItem("token"),
          user: window.localStorage.getItem("user"),
        }
      : {},
  },
  reducers: {
    setAuth: (state, action) => {
      const auth = action.payload;
      return {
        ...state,
        auth: auth,
      };
    },
  },
});

export const { setAuth } = authReducer.actions;

export default authReducer.reducer;
