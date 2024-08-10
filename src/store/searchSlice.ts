import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Search {
  searchString: string;
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchString: '',
  },
  reducers: {
    updateSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
  },
});

export const { updateSearchString } = searchSlice.actions;

export default searchSlice.reducer;
