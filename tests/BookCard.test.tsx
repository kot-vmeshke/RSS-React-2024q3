import '@testing-library/jest-dom';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { book } from './utils/constants';
import { BookCard, DetailsBookCard } from '../src/components';
import { store } from '../src/store/store';

describe('BookCard', () => {
  it('Card component renders the relevant card data', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <BookCard {...book} />,
        loader() {
          return json({ message: 'hello' });
        },
      },
    ]);
    render(<RemixStub />);

    const authors = book.authors.map((author) => author.name).join(', ');

    waitFor(() => {
      const bookTitle = screen.getByText(/Romeo and Juliet/i);
      expect(bookTitle).toBeInTheDocument();

      expect(screen.getByTestId('book-author')).toHaveTextContent(authors);

      const linkElement = screen.getByTestId('book');
      expect(linkElement).toHaveTextContent(book.title);
      expect(linkElement).toHaveAttribute('href', `/${book.id}`);

      expect(
        screen.getByText(`Subjects: ${book.subjects.join(', ')}`)
      ).toBeInTheDocument();
    });
  });

  it('Clicking on a card opens a detailed card component', async () => {
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
    render(<RemixStub />);

    waitFor(async () => {
      fireEvent.click(screen.getByTestId('book'));

      const detailsElement = await waitFor(() => screen.getByTestId('details'));
      expect(detailsElement).toBeInTheDocument();
    });
  });

  it('Clicking triggers an additional API call to fetch detailed information', async () => {
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

      const text = await waitFor(
        () => screen.getByRole('heading', { level: 3 }).textContent
      );
      expect(text).toBe(book.title);
    });
  });
});
