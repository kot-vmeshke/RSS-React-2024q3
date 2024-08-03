import {
  PayloadAction,
  UnknownAction,
  createSlice,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

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
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: UnknownAction) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        searchString: action.payload as string,
      };
    });
  },
});

export const { updateSearchString } = searchSlice.actions;

export default searchSlice.reducer;
