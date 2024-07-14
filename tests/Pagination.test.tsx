import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from '../src/components';
import { describe, expect, it, vi } from 'vitest';
import { PaginationProps } from '../src/types';

const paginationProps: PaginationProps = {
  next: null,
  previous: null,
  pageNumber: 1,
  updatePageNumber: vi.fn(),
  allPages: 1,
};
describe('Pagination', () => {
  it('Component updates URL query parameter when page changes', () => {
    render(<Pagination {...paginationProps}/>);

    fireEvent.click(screen.getByTestId('next'));

    expect(paginationProps.updatePageNumber).toHaveBeenCalledWith(
      paginationProps.pageNumber + 1
    );
  });

  it('If previous page does\'t exist, then the previous button is disabled', () => {
    render(<Pagination {...paginationProps} />);

    expect(screen.getByTestId('prev')).toHaveClass(
      'pagination__arrow_disabled'
    );
  });

  it('Component renders valid page number', () => {
    render(<Pagination {...paginationProps} />);

    expect(screen.getByTestId('page-number').textContent).toBe(`${paginationProps.pageNumber} of ${paginationProps.allPages}`);
  });
});

