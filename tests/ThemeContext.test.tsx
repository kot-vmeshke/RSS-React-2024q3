import '@testing-library/jest-dom';
import React, { FC } from 'react';
import {
  ThemeContext,
  ThemeContextProvider,
} from '../src/context/ThemeContext';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useContext } from 'react';

const ThemeDisplay: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p data-testid="theme-display">{theme}</p>
      <button onClick={() => setTheme('dark')} data-testid="dark-button">
        Switch to Dark Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('Should display the initial theme', () => {
    render(
      <ThemeContextProvider>
        <ThemeDisplay />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
  });

  it('When button click, theme should be changed', () => {
    render(
      <ThemeContextProvider>
        <ThemeDisplay />
      </ThemeContextProvider>
    );

    const setTheme = vi.fn();

    fireEvent.click(screen.getByTestId('dark-button'));
    waitFor(() => {
      expect(setTheme).toHaveBeenCalledWith('dark');
    });
  });
});
