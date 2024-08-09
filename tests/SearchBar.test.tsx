import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SearchBar } from '../src/components';
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

describe('SearchBar', () => {
  it('Clicking the Search button saves the entered value to the local storage', () => {
    renderWithProvider(<SearchBar />);

    const input = screen.getByRole('textbox');
    const testValue = 'test value';
    fireEvent.change(input, { target: { value: testValue } });

    fireEvent.click(screen.getByRole('button'));

    expect(localStorage.getItem('books-search')).toBe(testValue);
  });

  it('Component retrieves the value from the local storage upon mounting', () => {
    const testValue = 'test value';
    localStorage.setItem('books-search', testValue);

    renderWithProvider(<SearchBar />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    waitFor(() => {
      expect(input.value).toBe(testValue);
    });
  });
});

