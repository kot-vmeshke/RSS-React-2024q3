import { createSlice } from "@reduxjs/toolkit";

import { formDataType } from "./types";

const initialState: { forms: formDataType[]; lastUpdated: string } = {
  forms: [],
  lastUpdated: "",
};

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addToSubmitHistory: (state, action) => {
      state.forms.unshift(action.payload);
    },
    addLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
  },
});

export const { addToSubmitHistory, addLastUpdated } = formSlice.actions;

export default formSlice.reducer;
