import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { book } from './utils/constants';
import { BookCard, DetailsBookCard } from '../src/components';
import { store } from '../src/store/store';

describe('DetailsBookCard', () => {
  it('Component renders data', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <BookCard {...book} />,
        loader() {
          return json({ message: 'hello' });
        },
      },
      {
        path: '/:bookId',
        Component: () => <DetailsBookCard data={book} />,
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

    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('book'));

      const text = await waitFor(
        () => screen.getByRole('heading', { level: 3 }).textContent
      );
      expect(text).toBe(book.title);
    });
  });

  it('Clicking the close button hides the component', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <BookCard {...book} />,
        loader() {
          return json({ message: 'hello' });
        },
      },
      {
        path: '/:bookId',
        Component: () => <DetailsBookCard data={book} />,
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

    waitFor(async () => {
      fireEvent.click(screen.getByTestId('book'));

      const detailsElement = await waitFor(() => screen.getByTestId('details'));
      expect(detailsElement).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('close-btn'));

      await waitFor(() => {
        expect(screen.queryByTestId('details')).toBeNull();
      });
    });
  });
});
