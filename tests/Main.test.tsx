import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Main } from '../src/components';
import { describe, expect, it } from 'vitest';

describe('Header', () => {
  it('Header is rendering', () => {
    render(<Main isLoaded={false} booksList={[]} />);

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });
});
