import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { BookCard } from '../src/components';
import React from 'react';
import { book } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';

describe('BookCard', () => {
  it('Card component renders the relevant card data', () => {
    renderWithProvider(<BookCard {...book} />);

    waitFor(() => {
      const bookTitle = screen.getByText(/Romeo and Juliet/i);
      expect(bookTitle).toBeInTheDocument();
    });
  });
});
