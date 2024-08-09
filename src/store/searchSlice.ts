import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface Search {
  searchString: string;
  page: string;
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchString: '',
    page: '1',
  },
  reducers: {
    updateSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
    updatePage(state, action: PayloadAction<string>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: UnknownAction) => {
      return {
        ...state,
        searchString: action.payload as string,
        page: action.payload as string,
      };
    });
  },
});

export const { updateSearchString, updatePage } = searchSlice.actions;

export default searchSlice.reducer;
