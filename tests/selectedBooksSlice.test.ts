import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import selectedBooksReduser, {
  addBookToSelected,
  removeAllBooksFromSelected,
  removeBookFromSelected,
} from '../src/store/selectedBooksSlice';
import { Book } from '../src/types';
import { book } from './utils/constants';

const initialState: Book[] = [];

describe('SelectedBooksSlice', () => {
  it('Book should be added to store', () => {
    const state = selectedBooksReduser(initialState, addBookToSelected(book));
    expect(state[0].id).toEqual(book.id);
  });

  it('Book should be removed from store', () => {
    const fullState = [book];

    const state = selectedBooksReduser(
      fullState,
      removeBookFromSelected(book.id)
    );

    expect(state.length).toBe(0);
  });

  it('All books was removed', () => {
    const fullState = [book];

    const state = selectedBooksReduser(fullState, removeAllBooksFromSelected());

    expect(state.length).toBe(0);
  });
});

