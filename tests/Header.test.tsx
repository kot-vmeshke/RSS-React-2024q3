import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { Header } from '../src/components';
import React from 'react';
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
        off: vi.fn(),
      },
    }),
  };
});

describe('Header', () => {
  it('Header is rendering', () => {
    renderWithProvider(<Header />);
    const appTitle = screen.getByText(/Search books/i);
    expect(appTitle).toBeInTheDocument();
  });
});

