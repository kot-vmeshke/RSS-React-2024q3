import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit';
import { Book } from '../types';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: Book[] = [];

const dataSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(_state, action: PayloadAction<Book[]>) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: UnknownAction) => {
      return {
        ...state,
        ...action.payload as Book[],
      };
    });
  },
});

export const { setBooks } = dataSlice.actions;

export default dataSlice.reducer;
