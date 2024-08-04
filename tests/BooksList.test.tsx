import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { BooksList } from '../src/components';
import React from 'react';
import { books } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {},
      push: vi.fn(),
      replace: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    }),
  };
});

describe('BooksList', () => {
  it('Component renders the specified number of cards', async () => {

    renderWithProvider(<BooksList />, {preloadedState: {
      data: {
        count: 2,
        next: null,
        previous: null,
        results: books
      }
    }});

    await waitFor(() => {
      const bookCards = screen.getAllByTestId('book');
      expect(bookCards).toHaveLength(books.length);
    });
  });

  it('Appropriate message is displayed if no cards are present', async () => {
    renderWithProvider(<BooksList />);

    await waitFor(() => {
      const altText = screen.getByText(/Nothing was found/i);
      expect(altText).toBeInTheDocument();
    });
  });
});

