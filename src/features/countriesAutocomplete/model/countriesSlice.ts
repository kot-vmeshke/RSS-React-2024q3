import { createSlice } from "@reduxjs/toolkit";

import { countries } from "./constants";

const initialState = countries;

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
