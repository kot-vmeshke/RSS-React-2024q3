import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchPage } from '../src/pages';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('SearchPage', () => {
  it('SearchPage is rendering', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const errorTitle = screen.getByTestId('page-container');
    expect(errorTitle).toBeInTheDocument();
  });
});
