import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Pagination } from '../src/components';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { updatePage } from '../src/store/searchSlice';
import { useRouter } from 'next/router';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {
        page: '1',
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
    const router = useRouter();
    const { page } = router.query;

    fireEvent.click(screen.getByTestId('next'));
    waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(updatePage(`${+page! + 1}`));
    });
  });

});
