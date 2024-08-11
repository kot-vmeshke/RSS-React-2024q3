import '@testing-library/jest-dom';
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { loader, Root } from '../app/root';
import { store } from '../src/store/store';

vi.mock('@remix-run/react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useSubmit: vi.fn(),
  };
});

describe('Header', () => {
  it('Header is rendering', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Root,
        loader,
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    waitFor(() => {
      const appTitle = screen.getByText(/Search books/i);
      expect(appTitle).toBeInTheDocument();
    });
  });
});
