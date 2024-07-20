import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../src/components';

describe('Header', () => {
  it('Header is rendering', () => {
    render(<Header searchString='' updateSearchString={() => {}}/>);
    const appTitle = screen.getByText(/Search books/i);
    expect(appTitle).toBeInTheDocument();
  });
});
