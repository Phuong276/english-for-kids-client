import { createSlice } from "@reduxjs/toolkit";

export const gameReducer = createSlice({
  name: "game",
  initialState: {
    games: [],
  },
  reducers: {
    setGames: (state, action) => {
      let { games } = action.payload;
      return {
        ...state,
        games,
      };
    },
  },
});

export const { setGames } = gameReducer.actions;

export default gameReducer.reducer;
