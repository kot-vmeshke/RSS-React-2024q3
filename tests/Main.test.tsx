import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { Main } from '../src/components';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

describe('Main', () => {
  it('Main is rendering', () => {
    renderWithProvider(<Main />);

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});

