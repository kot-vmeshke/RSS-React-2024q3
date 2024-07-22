import { apiSlice } from './apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import selectedBooksReduser from './selectedBooksSlice';

export const store = configureStore({
  reducer: {
    selectedBooks: selectedBooksReduser,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
