import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import dataSlice from './dataSlice';
import searchReducer from './searchSlice';
import selectedBooksReducer from './selectedBooksSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      data: dataSlice,
      selectedBooks: selectedBooksReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const store = makeStore();
