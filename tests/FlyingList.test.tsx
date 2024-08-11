import '@testing-library/jest-dom';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { book, books, data } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';
import { FlyingList } from '../src/components';
import { removeAllBooksFromSelected, removeBookFromSelected } from '../src/store/selectedBooksSlice';
import { store } from '../src/store/store';

describe('FlyingList', () => {
  it('All unselect buttons in component work correct', async () => {
    const dispatch = vi.fn();
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <FlyingList />,
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

    const btnDownload = await screen.findByText('Download');
    expect(btnDownload).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(`unselect-${books[0].id}`));
    waitFor(() => {
      expect(dispatch).toBeCalledWith(removeBookFromSelected(books[0].id));
    });

    fireEvent.click(screen.getByTestId('unselect-all'));

    waitFor(() => {
      expect(dispatch).toBeCalledWith(removeAllBooksFromSelected());
    });
  });

  it('Unselect button has right text', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <FlyingList />,
        loader() {
          return json({ data, search: '' });
        },
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    waitFor(() => {
      expect(
        screen.getByTestId('unselect-all').textContent?.includes('All')
      ).toBeFalsy();
    });
  });

  it('getCSV to be called if selected books exist', () => {
    const getCSV = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <FlyingList />,
        loader() {
          return json({ data, search: '' });
        },
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    waitFor(() => {
      expect(getCSV).toBeCalledWith(book);
    });
  });
});
