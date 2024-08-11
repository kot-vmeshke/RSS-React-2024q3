import '@testing-library/jest-dom';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { book, books, data } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';
import { CheckButton } from '../src/components';
import { useAppSelector } from '../src/hooks/redux';
import {
  addBookToSelected,
  removeBookFromSelected,
} from '../src/store/selectedBooksSlice';
import { store } from '../src/store/store';
import { Book } from '../src/types';

describe('CheckButton', () => {
  it('Click on checkbox saves item to store and remove from store', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <CheckButton book={book} />,
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

    waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[0] as HTMLInputElement;
      fireEvent.click(checkbox);

      expect(store.dispatch).toHaveBeenCalledWith(addBookToSelected(book));

      const selectedBooks: Book[] = useAppSelector(
        (state) => state.selectedBooks
      );

      const isInStore = Boolean(
        selectedBooks.find((item) => item.id === book.id)
      );
      expect(isInStore).toBe(true);

      fireEvent.click(checkbox);

      expect(store.dispatch).toHaveBeenCalledWith(
        removeBookFromSelected(book.id)
      );
    });
  });

  it('If book selected, component shows checked icon', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <CheckButton book={book} />,
        loader() {
          return json({ data, search: '' });
        },
      },
    ]);

    renderWithProvider(<RemixStub />, {
      preloadedState: {
        selectedBooks: books,
      },
    });

    const icon = await screen.findByTestId('checked-icon');
    expect(icon).toBeInTheDocument();
  });
});
