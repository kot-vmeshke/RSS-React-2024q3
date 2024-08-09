import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { ThemeSwitch } from '../src/components';
import { renderWithProvider } from './utils/mockStore';

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

describe('ThemeSwitch', () => {
  it('The theme name is saved in the localStorage', () => {
    renderWithProvider(<ThemeSwitch />);

    fireEvent.click(screen.getByTestId('dark-button'));

    const themeName = localStorage.getItem('book-theme');

    expect(themeName).toBe('dark');
  });
});
