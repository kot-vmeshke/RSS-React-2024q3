import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { Main } from '../src/components';
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

describe('Main', () => {
  it('Main is rendering', () => {
    renderWithProvider(<Main />);

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });
});
