import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import Custom404 from '../src/pages/404';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {},
      push: vi.fn(),
      replace: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    }),
  };
});

describe('404 page', () => {
  it('Should be rendered', () => {
    renderWithProvider(<Custom404 />);

    const errorTitle = screen.getByRole('heading', { level: 1 }).textContent;
    expect(errorTitle).toBe('404');
  });
});
