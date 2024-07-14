import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorPage } from '../src/pages';
import { describe, expect, it } from 'vitest';

describe('ErrorPage', () => {
  it('ErrorPage is rendering', () => {
    render(<ErrorPage />);
    const errorTitle = screen.getByRole('heading', { level: 1 }).textContent;
    expect(errorTitle).toBe('404');
  });
});
