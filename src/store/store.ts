import { configureStore } from '@reduxjs/toolkit';
import selectedBooksReducer from './selectedBooksSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    selectedBooks: selectedBooksReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
