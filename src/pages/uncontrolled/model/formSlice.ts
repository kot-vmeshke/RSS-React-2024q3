import { createSlice } from "@reduxjs/toolkit";

const initialState: object[] = [];

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addToSubmitHistory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addToSubmitHistory } = formSlice.actions;

export default formSlice.reducer;
