import { configureStore } from '@reduxjs/toolkit';
import selectedBooksReduser from './selectedBooksSlice';

export const store = configureStore({
  reducer: {
    selectedBooks: selectedBooksReduser,
  },
});

store.subscribe(() => console.log(store.getState()));

export type RootState = ReturnType<typeof store.getState>;