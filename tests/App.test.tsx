import { describe, expect, it } from 'vitest';
import App from '../src/App';
import { render } from '@testing-library/react';

describe('App component', () => {
  it('App renders', () => {
    const { container } = render(<App />);

    expect(container.querySelector('.page')).toBeInTheDocument();
  });
});
