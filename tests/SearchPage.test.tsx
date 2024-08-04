import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { SearchPage } from '../src/components';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {},
      events: {
        on: vi.fn(),
        off: vi.fn()
      }
    }),
  };
});

describe('SearchPage', () => {
  it('SearchPage is rendering', () => {
    renderWithProvider(<SearchPage />);
    const container = screen.getByTestId('page-container');
    expect(container).toBeInTheDocument();
  });
});
