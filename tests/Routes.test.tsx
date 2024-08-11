import '@testing-library/jest-dom';
import { json } from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { book, data } from './utils/constants';
import App, { ErrorBoundary, links as mainLinks, Root } from '../app/root';
import OneBookPage, { links as bookLinks } from '../app/routes/$bookId';
import styles from '../app/shared.css?url';
import { store } from '../src/store/store';

const mockLoader = async () => {
  return json({ data: book });
};

describe('Routes', () => {
  it('Detailed Page is rendering', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Root,
        loader() {
          return json({ data, search: '' });
        },
      },
      {
        path: `/${book.id}`,
        Component: OneBookPage,
        loader: mockLoader,
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const link = await screen.findByText(book.title);
    fireEvent.click(link);

    const detailsPage = await screen.findByTestId('details');
    expect(detailsPage).toBeInTheDocument();
  });

  it('Root is rendering', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: App,
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

    await waitFor(() => {
      expect(screen.getByTestId('root')).toBeInTheDocument();
    });
  });

  it('Links functions work', () => {
    const mainResult = mainLinks();
    const bookResult = bookLinks();

    expect(mainResult).toEqual([
      {
        rel: 'shortcut icon',
        href: './favicon.ico',
        type: 'image/ico',
      },
      {
        rel: 'stylesheet',
        href: styles,
      },
    ]);

    expect(bookResult).toEqual([
      {
        rel: 'shortcut icon',
        href: './favicon.ico',
        type: 'image/ico',
      },
    ]);
  });

  it('Error Page is rendering', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: ErrorBoundary,
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const errorTitle = await screen.findByText('404');
    expect(errorTitle).toBeInTheDocument();
  });
});
