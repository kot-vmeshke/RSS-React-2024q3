import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../src/components';
import { describe, expect, it } from 'vitest';

describe('SearchBar', () => {
  it('Clicking the Search button saves the entered value to the local storage', () => {
    render(<SearchBar updateSearchString={() => {}} />);

    const input = screen.getByRole('textbox');
    const testValue = 'test value';
    fireEvent.change(input, { target: { value: testValue } });

    fireEvent.click(screen.getByRole('button'));

    expect(localStorage.getItem('books-search')).toBe(testValue);
  });

  it('Component retrieves the value from the local storage upon mounting', () => {
    const testValue = 'mount test value';
    localStorage.setItem('books-search', testValue);

    render(<SearchBar updateSearchString={() => {}} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe(testValue);
  });
});
