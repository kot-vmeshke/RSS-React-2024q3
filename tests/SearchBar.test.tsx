import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ReduxProvider } from '../src/store/ReduxProvider';
import { SearchBar } from '../src/components';
import { updateSearchString } from '../src/store/searchSlice';

describe('SearchBar', () => {
  it('Clicking the Search button saves the entered value to the store', () => {
    render(
      <ReduxProvider>
        <SearchBar />
      </ReduxProvider>
    );

    const input = screen.getByRole('textbox');
    const testValue = 'test value';
    const dispatch = vi.fn();

    fireEvent.change(input, { target: { value: testValue } });

    fireEvent.click(screen.getByRole('button'));

    waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(updateSearchString(testValue));
    });
  });
});
