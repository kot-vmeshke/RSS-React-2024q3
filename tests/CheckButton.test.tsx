import '@testing-library/jest-dom';
import {
  addBookToSelected,
  removeBookFromSelected,
} from '../src/store/selectedBooksSlice';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { makeStore, useAppSelector } from '../src/store/store';
import { Book } from '../src/types';
import { CheckButton } from '../src/components';
import { Provider } from 'react-redux';
import React from 'react';
import { book } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';

const bookId = 1513;

vi.mock('../src/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ['', vi.fn()],
}));

const dispatch = vi.fn();

describe('CheckButton', () => {
  it('Click on checkbox saves item to store and remove from store', async () => {
    renderWithProvider(<CheckButton bookId={bookId} />);

    waitFor(() => {
      const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
      fireEvent.click(checkbox);

      expect(dispatch).toHaveBeenCalledWith(addBookToSelected(book));

      const selectedBooks: Book[] = useAppSelector(
        (state) => state.selectedBooks
      );

      const isInStore = Boolean(
        selectedBooks.find((item) => item.id === bookId)
      );
      expect(isInStore).toBe(true);

      fireEvent.click(checkbox);

      expect(dispatch).toHaveBeenCalledWith(removeBookFromSelected(bookId));
    });
  });

  it('If book selected, component shows checked icon', () => {
    render(
      <Provider store={makeStore()}>
        <CheckButton bookId={bookId} />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId('checked-icon')).toBeFalsy();
      fireEvent.click(screen.getByRole('label'));

      expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
    });
  });
});
