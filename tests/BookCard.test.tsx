import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookCard, DetailsBookCard } from '../src/components';
import { describe, expect, it, vi } from 'vitest';
import { Book } from '../src/types';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const book: Book = {
  id: 1513,
  title: 'Romeo and Juliet',
  authors: [
    {
      name: 'Shakespeare, William',
      birth_year: 1564,
      death_year: 1616,
    },
  ],
  translators: [],
  subjects: [
    'Conflict of generations -- Drama',
    'Juliet (Fictitious character) -- Drama',
    'Romeo (Fictitious character) -- Drama',
    'Tragedies',
    'Vendetta -- Drama',
    'Verona (Italy) -- Drama',
    'Youth -- Drama',
  ],
  bookshelves: [],
  languages: ['en'],
  copyright: false,
  media_type: 'Text',
  formats: {
    'text/html': 'https://www.gutenberg.org/ebooks/1513.html.images',
    'application/epub+zip':
      'https://www.gutenberg.org/ebooks/1513.epub3.images',
    'application/x-mobipocket-ebook':
      'https://www.gutenberg.org/ebooks/1513.kf8.images',
    'application/rdf+xml': 'https://www.gutenberg.org/ebooks/1513.rdf',
    'image/jpeg':
      'https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg',
    'text/plain; charset=us-ascii':
      'https://www.gutenberg.org/ebooks/1513.txt.utf-8',
    'application/octet-stream':
      'https://www.gutenberg.org/cache/epub/1513/pg1513-h.zip',
  },
  download_count: 77782,
};

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useParams: vi.fn().mockReturnValue({ bookId: 1 }),
  };
});

describe('BookCard', () => {
  it('Card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <BookCard {...book} />
      </MemoryRouter>
    );
    const bookTitle = screen.getByText(/Romeo and Juliet/i);
    expect(bookTitle).toBeInTheDocument();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<BookCard {...book} />} />
          <Route path="/book/:id" element={<DetailsBookCard />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('book'));

    const detailsElement = await waitFor(() => screen.getByTestId('details'));
    expect(detailsElement).toBeInTheDocument();
  });

  it('Clicking triggers an additional API call to fetch detailed information', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(book),
    };

    const fetchMock = vi
      .spyOn(window, 'fetch')
      .mockResolvedValue(mockResponse as unknown as Response);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<BookCard {...book} />} />
          <Route path="/book/:id" element={<DetailsBookCard />} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('book'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('https://gutendex.com/books/1');
    });
  });
});
