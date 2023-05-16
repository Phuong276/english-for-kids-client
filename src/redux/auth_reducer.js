import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    auth: {},
  },
  reducers: {
    setAuth: (state, action) => {
      const auth = action.payload;
        return {
          ...state,
          auth: auth
        }
    },
  },
});

export const { setAuth } = authReducer.actions;

export default authReducer.reducer;
