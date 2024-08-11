import '@testing-library/jest-dom';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { books } from './utils/constants';
import { BooksList } from '../src/components';
import { store } from '../src/store/store';

describe('BooksList', () => {
  it('Appropriate message is displayed if no cards are present', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <BooksList
            data={{
              count: 0,
              next: null,
              previous: null,
              results: [],
            }}
          />
        ),
        loader() {
          return json({ message: 'hello' });
        },
      },
    ]);
    render(<RemixStub />);

    await waitFor(() => {
      const altText = screen.getByText(/Nothing was found/i);
      expect(altText).toBeInTheDocument();
    });
  });

  it('Component renders the specified number of cards', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <BooksList
            data={{
              count: 0,
              next: null,
              previous: null,
              results: [...books],
            }}
          />
        ),
        loader() {
          return json({ message: 'hello' });
        },
      },
    ]);
    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    await waitFor(() => {
      const bookCards = screen.getAllByTestId('book');
      expect(bookCards).toHaveLength(books.length);
    });
  });

});
