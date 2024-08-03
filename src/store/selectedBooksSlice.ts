import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit';
import { Book } from '../../src/types';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: Book[] = [];

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    addBookToSelected(state, action: PayloadAction<Book>) {
      state.push(action.payload);
    },
    removeBookFromSelected(state, action: PayloadAction<number>) {
      return state.filter((item: Book) => item.id !== action.payload);
    },
    removeAllBooksFromSelected() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_state, action: UnknownAction) => {
      return action.payload as Book[];
    });
  },
});

export const {
  addBookToSelected,
  removeBookFromSelected,
  removeAllBooksFromSelected,
} = selectedBooksSlice.actions;

export default selectedBooksSlice.reducer;
