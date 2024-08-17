import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { countriesReducer } from "@/pages/controlled/model";
import { formReducer } from "@/pages/uncontrolled/model";

export const store = configureStore({
  reducer: {
    forms: formReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
