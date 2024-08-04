import '@testing-library/jest-dom';
import { book, books } from './utils/constants';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { FlyingList } from '../src/components';
import React from 'react';
import { removeAllBooksFromSelected } from '../src/store/selectedBooksSlice';
import { renderWithProvider } from './utils/mockStore';

const dispatch = vi.fn();

describe('FliyngList', () => {
  global.URL.createObjectURL = vi.fn();

  it('Remove all saved books on click "Unselect All"', () => {
    renderWithProvider(<FlyingList />);

    waitFor(() => {
      fireEvent.click(screen.getByTestId('unselect-all'));
      expect(dispatch).toBeCalledWith(removeAllBooksFromSelected());
    });
  });

  it('Unselect button has right text', () => {
    renderWithProvider(<FlyingList />);

    waitFor(() => {
      expect(
        screen.getByTestId('unselect-all').textContent?.includes('All')
      ).toBeFalsy();
    });
  });

  it('getCSV to be called if selected books exist', () => {
    const getCSV = vi.fn();

    renderWithProvider(<FlyingList />);

    waitFor(() => {
      expect(getCSV).toBeCalledWith(book);
    });
  });

  it('List of selected items shows right data', () => {
    renderWithProvider(<FlyingList />, {
      preloadedState: {
        selectedBooks: books,
      },
    });

    waitFor(() => {
      const selectedBooks = screen.getAllByTestId('selected-item');
      expect(selectedBooks).toHaveLength(books.length);
    });
  });
});
