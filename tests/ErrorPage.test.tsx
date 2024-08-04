import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { ErrorPage } from '../src/components';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

describe('ErrorPage', () => {
  it('ErrorPage is rendering', () => {
    renderWithProvider(<ErrorPage />);
    const errorTitle = screen.getByRole('heading', { level: 1 }).textContent;
    expect(errorTitle).toBe('404');
  });
});

