import { configureStore } from "@reduxjs/toolkit";

import { countriesReducer } from "@/features/countriesAutocomplete";
import { formReducer } from "@/features/submitHistory";

export const store = configureStore({
  reducer: {
    forms: formReducer,
    countries: countriesReducer,
  },
});
