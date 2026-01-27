import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  isTaskPopupShown: boolean;
  isBoardPopupShown: boolean;
};

const initialState: UIState = {
  isTaskPopupShown: false,
  isBoardPopupShown: false,
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
  },
});

export const { showTaskPopup, hideTaskPopup, showBoardPopup, hideBoardPopup } = uiSlice.actions;
