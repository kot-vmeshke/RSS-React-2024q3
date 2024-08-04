import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { BookCard } from '../src/components';
import React from 'react';
import { book } from './utils/constants';
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

describe('BookCard', () => {
  it('Card component renders the relevant card data', () => {
    renderWithProvider(<BookCard {...book} />);

    waitFor(() => {
      const bookTitle = screen.getByText(/Romeo and Juliet/i);
      expect(bookTitle).toBeInTheDocument();
    });
  });
});
