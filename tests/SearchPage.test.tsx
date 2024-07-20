import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../src/pages';

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
