import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import Document from '../src/pages/_document';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { waitFor } from '@testing-library/react';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {},
      push: vi.fn(),
      replace: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    }),
  };
});

vi.mock('next/document', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    __esModule: true,
    Html: vi.fn().mockReturnValue(() => ({
      render() {
        return React.createElement('html', { 'data-testid': 'html' });
      },
    })),
  };
});

describe('Document', () => {
  it('Should be rendered', () => {
    const { container } = renderWithProvider(<Document />);

    waitFor(() => {
      expect(container.querySelector('h1')?.textContent).toBe('Search books');
    });
  });
});
