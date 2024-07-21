import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Book } from '../types';

const initialState: Book[] = [];

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    addBookToSelected(state, action: PayloadAction<Book>) {
      state.push(action.payload);
    },
  },
});

export const { addBookToSelected } = selectedBooksSlice.actions;

export default selectedBooksSlice.reducer;
