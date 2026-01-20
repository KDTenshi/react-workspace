import { combineReducers } from "@reduxjs/toolkit";
import { tasksSlice } from "../../shared/store/tasksSlice";
import { uiSlice } from "../../shared/store/uiSlice";

export const appReducer = combineReducers({
  [tasksSlice.reducerPath]: tasksSlice.reducer,
  [uiSlice.reducerPath]: uiSlice.reducer,
});
