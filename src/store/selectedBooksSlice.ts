import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: number[] = [];

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    addBookToSelected(state, action: PayloadAction<number>) {
      state.push(action.payload);
    },
    removeBookFromSelected(state, action: PayloadAction<number>) {
      return state.filter((item) => item !== action.payload);
    },
    removeAllBooksFromSelected() {
      return initialState;
    },
  },
});

export const {
  addBookToSelected,
  removeBookFromSelected,
  removeAllBooksFromSelected,
} = selectedBooksSlice.actions;

export default selectedBooksSlice.reducer;
