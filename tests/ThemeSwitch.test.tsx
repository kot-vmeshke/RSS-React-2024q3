
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../src/App';
import { ThemeSwitch } from '../src/components';



describe('ThemeSwitch', () => {
  it('The theme name is saved in the localStorage', () => {
    render(<ThemeSwitch />);

    fireEvent.click(screen.getByTestId('dark-button'));

    const themeName = localStorage.getItem('book-theme');

    expect(themeName).toBe('dark');
  });

  it('Theme is changing', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('dark-button'));
    const isThemeDark = screen
      .getByTestId('page-container')
      .classList.contains('dark');
    expect(isThemeDark).toBe(true);

    fireEvent.click(screen.getByTestId('light-button'));
    const isThemeLight = screen
      .getByTestId('page-container')
      .classList.contains('light');
    expect(isThemeLight).toBe(true);
  });
});
