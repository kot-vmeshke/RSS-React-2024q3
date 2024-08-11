import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { book } from './utils/constants';
import selectedBooksReducer, {
  addBookToSelected,
  removeAllBooksFromSelected,
  removeBookFromSelected,
} from '../src/store/selectedBooksSlice';
import { Book } from '../src/types';

const initialState: Book[] = [];

describe('SelectedBooksSlice', () => {
  it('Book should be added to store', () => {
    const state = selectedBooksReducer(initialState, addBookToSelected(book));
    expect(state[0].id).toEqual(book.id);
  });

  it('Book should be removed from store', () => {
    const fullState = [book];

    const state = selectedBooksReducer(
      fullState,
      removeBookFromSelected(book.id)
    );

    expect(state.length).toBe(0);
  });

  it('All books was removed', () => {
    const fullState = [book];

    const state = selectedBooksReducer(fullState, removeAllBooksFromSelected());

    expect(state.length).toBe(0);
  });
});

