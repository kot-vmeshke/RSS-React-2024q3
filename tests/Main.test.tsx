import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Main } from '../src/components';

const updatePageNumber = (page: number) => {
  console.log(page);
};

describe('Main', () => {
  it('Main is rendering', () => {
    render(
      <Main
        isLoaded={false}
        booksList={[]}
        paginationData={{
          next: null,
          previous: null,
          pageNumber: 1,
          updatePageNumber: updatePageNumber,
          allPages: 1,
        }}
      />
    );

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });
});
