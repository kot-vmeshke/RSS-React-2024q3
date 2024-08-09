import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { DetailsBookCard } from '../src/components';
import React from 'react';
import { book } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {
        slug: '1513',
        page: '2',
        search: 'and',
      },
      push: vi.fn(),
      replace: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    }),
  };
});

describe('DetailsBookCard', () => {
  it('Detailed card component correctly displays the detailed card data', async () => {
    renderWithProvider(<DetailsBookCard book={book} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3 }).textContent).toBe(
        book.title
      );
    });
  });

  it('Create queryString', () => {
    renderWithProvider(<DetailsBookCard book={book} />);

    waitFor(() => {
      expect(screen.getByTestId('close-btn')?.getAttribute('href')).toBe(
        '/?page=2&search=and'
      );
    });
  });
});
