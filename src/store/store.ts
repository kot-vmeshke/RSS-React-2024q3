import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import dataSlice from './dataSlice';
import searchReduser from './searchSlice';
import selectedBooksReduser from './selectedBooksSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      search: searchReduser,
      data: dataSlice,
      selectedBooks: selectedBooksReduser,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const store = makeStore();
