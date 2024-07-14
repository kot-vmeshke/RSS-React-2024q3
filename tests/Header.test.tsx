import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../src/components';
import { describe, expect, it } from 'vitest';

describe('Header', () => {
  it('Header is rendering', () => {
    render(<Header searchString='' updateSearchString={() => {}}/>);
    const appTitle = screen.getByText(/Search books/i);
    expect(appTitle).toBeInTheDocument();
  });
});
