import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_reducer";
import gameReducer from "./game_reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  games: gameReducer,
});

export default configureStore({ reducer: rootReducer });
