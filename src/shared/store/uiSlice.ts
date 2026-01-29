import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  isTaskPopupShown: boolean;
  isBoardPopupShown: boolean;
  isTaskFormShown: boolean;
};

const initialState: UIState = {
  isTaskPopupShown: false,
  isBoardPopupShown: false,
  isTaskFormShown: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showTaskPopup: (state) => {
      state.isTaskPopupShown = true;
    },
    hideTaskPopup: (state) => {
      state.isTaskPopupShown = false;
    },
    showBoardPopup: (state) => {
      state.isBoardPopupShown = true;
    },
    hideBoardPopup: (state) => {
      state.isBoardPopupShown = false;
    },
    showTaskForm: (state) => {
      state.isTaskFormShown = true;
    },
    hideTaskForm: (state) => {
      state.isTaskFormShown = false;
    },
  },
});

export const { showTaskPopup, hideTaskPopup, showBoardPopup, hideBoardPopup, showTaskForm, hideTaskForm } =
  uiSlice.actions;
