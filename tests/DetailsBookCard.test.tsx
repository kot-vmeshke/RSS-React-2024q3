import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { DetailsBookCard } from '../src/components';
import React from 'react';
import { book } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';

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
        '/?page=1'
      );
    });
  });
});

