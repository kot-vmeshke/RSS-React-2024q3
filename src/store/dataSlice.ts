import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit';
import { Book } from '../types';
import { HYDRATE } from 'next-redux-wrapper';

export interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

const initialState: Data = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(_state, action: PayloadAction<Data>) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_state, action: UnknownAction) => {
      return action.payload as Data;
    });
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
