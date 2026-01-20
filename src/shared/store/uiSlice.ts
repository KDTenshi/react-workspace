import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  isTaskPopupShown: boolean;
};

const initialState: UIState = {
  isTaskPopupShown: false,
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
  },
});

export const { showTaskPopup, hideTaskPopup } = uiSlice.actions;
