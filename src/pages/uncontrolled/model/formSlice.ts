import { createSlice } from "@reduxjs/toolkit";

import { formDataType } from "./types";

const initialState: formDataType[] = [];

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addToSubmitHistory: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

export const { addToSubmitHistory } = formSlice.actions;

export default formSlice.reducer;
