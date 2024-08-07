import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { Header } from '../src/components';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

describe('Header', () => {
  it('Header is rendering', () => {
    renderWithProvider(<Header />);
    const appTitle = screen.getByText(/Search books/i);
    expect(appTitle).toBeInTheDocument();
  });
});


