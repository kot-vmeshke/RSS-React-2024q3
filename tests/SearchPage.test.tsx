import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import React from 'react';
import { SearchPage } from '../src/components';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

describe('SearchPage', () => {
  it('SearchPage is rendering', () => {
    renderWithProvider(<SearchPage />);
    const container = screen.getByTestId('page-container');
    expect(container).toBeInTheDocument();
  });
});

