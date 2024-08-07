import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Pagination } from '../src/components';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { updatePage } from '../src/store/searchSlice';
import { useSearchParams } from 'next/navigation';

describe('Pagination', () => {

  it("If previous page does't exist, then the previous button is disabled", () => {
    renderWithProvider(<Pagination />);

    expect(screen.getByTestId('prev')).toHaveClass(
      'pagination__arrow_disabled'
    );
  });

  it('Component updates page number in store', () => {
    renderWithProvider(<Pagination />);
    const dispatch = vi.fn();
    const searchParams = useSearchParams();
    const page = searchParams.get('page')

    fireEvent.click(screen.getByTestId('next'));
    waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(updatePage(`${+page! + 1}`));
    });
  });

});

