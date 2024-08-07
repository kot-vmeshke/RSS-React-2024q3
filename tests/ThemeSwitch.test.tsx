import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeSwitch } from '../src/components';
import { renderWithProvider } from './utils/mockStore';

describe('ThemeSwitch', () => {
  it('The theme was changed', () => {
    const setTheme = vi.fn();
    renderWithProvider(<ThemeSwitch />);

    fireEvent.click(screen.getByTestId('dark-button'));

    waitFor(() => {
      expect(setTheme).toHaveBeenCalledWith('dark');
    });
  });
});
