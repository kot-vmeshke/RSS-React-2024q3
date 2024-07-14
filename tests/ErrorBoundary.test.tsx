import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../src/components';
import { describe, expect, it } from 'vitest';

describe('ErrorBoundary', () => {
  it('Render children without errors', () => {
    render(
      <ErrorBoundary>
        <div>Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child')).toBeInTheDocument();
  })
  it('Catch error and render fallback UI', () => {

    const ChildWithError = () => {
      throw new Error('Test error');
    }
    render(
      <ErrorBoundary>
        <ChildWithError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  })
})
