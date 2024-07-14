import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { BooksList } from '../src/components';
import { Book } from '../src/types';
import { MemoryRouter } from 'react-router-dom';

const books: Book[] = [
  {
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
  },
  {
    id: 2701,
    title: 'Moby Dick; Or, The Whale',
    authors: [
      {
        name: 'Melville, Herman',
        birth_year: 1819,
        death_year: 1891,
      },
    ],
    translators: [],
    subjects: [
      'Adventure stories',
      'Ahab, Captain (Fictitious character) -- Fiction',
      'Mentally ill -- Fiction',
      'Psychological fiction',
      'Sea stories',
      'Ship captains -- Fiction',
      'Whales -- Fiction',
      'Whaling -- Fiction',
      'Whaling ships -- Fiction',
    ],
    bookshelves: ['Best Books Ever Listings'],
    languages: ['en'],
    copyright: false,
    media_type: 'Text',
    formats: {
      'text/html': 'https://www.gutenberg.org/ebooks/2701.html.images',
      'text/html; charset=utf-8':
        'https://www.gutenberg.org/files/2701/2701-h/2701-h.htm',
      'application/epub+zip':
        'https://www.gutenberg.org/ebooks/2701.epub3.images',
      'application/x-mobipocket-ebook':
        'https://www.gutenberg.org/ebooks/2701.kf8.images',
      'text/plain; charset=utf-8':
        'https://www.gutenberg.org/files/2701/2701-0.txt',
      'application/rdf+xml': 'https://www.gutenberg.org/ebooks/2701.rdf',
      'image/jpeg':
        'https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg',
      'application/octet-stream':
        'https://www.gutenberg.org/cache/epub/2701/pg2701-h.zip',
      'text/plain; charset=us-ascii':
        'https://www.gutenberg.org/ebooks/2701.txt.utf-8',
    },
    download_count: 71888,
  },
  {
    id: 145,
    title: 'Middlemarch',
    authors: [
      {
        name: 'Eliot, George',
        birth_year: 1819,
        death_year: 1880,
      },
    ],
    translators: [],
    subjects: [
      'Bildungsromans',
      'City and town life -- Fiction',
      'Didactic fiction',
      'Domestic fiction',
      'England -- Fiction',
      'Love stories',
      'Married people -- Fiction',
      'Young women -- Fiction',
    ],
    bookshelves: ['Best Books Ever Listings', 'Historical Fiction'],
    languages: ['en'],
    copyright: false,
    media_type: 'Text',
    formats: {
      'text/html': 'https://www.gutenberg.org/ebooks/145.html.images',
      'application/epub+zip':
        'https://www.gutenberg.org/ebooks/145.epub3.images',
      'application/x-mobipocket-ebook':
        'https://www.gutenberg.org/ebooks/145.kf8.images',
      'application/rdf+xml': 'https://www.gutenberg.org/ebooks/145.rdf',
      'image/jpeg':
        'https://www.gutenberg.org/cache/epub/145/pg145.cover.medium.jpg',
      'text/plain; charset=us-ascii':
        'https://www.gutenberg.org/ebooks/145.txt.utf-8',
      'application/octet-stream':
        'https://www.gutenberg.org/cache/epub/145/pg145-h.zip',
    },
    download_count: 54135,
  },
  {
    id: 2641,
    title: 'A Room with a View',
    authors: [
      {
        name: 'Forster, E. M. (Edward Morgan)',
        birth_year: 1879,
        death_year: 1970,
      },
    ],
    translators: [],
    subjects: [
      'British -- Italy -- Fiction',
      'England -- Fiction',
      'Florence (Italy) -- Fiction',
      'Humorous stories',
      'Young women -- Fiction',
    ],
    bookshelves: ['Italy'],
    languages: ['en'],
    copyright: false,
    media_type: 'Text',
    formats: {
      'text/html': 'https://www.gutenberg.org/ebooks/2641.html.images',
      'application/epub+zip':
        'https://www.gutenberg.org/ebooks/2641.epub3.images',
      'application/x-mobipocket-ebook':
        'https://www.gutenberg.org/ebooks/2641.kf8.images',
      'text/plain; charset=us-ascii':
        'https://www.gutenberg.org/ebooks/2641.txt.utf-8',
      'application/rdf+xml': 'https://www.gutenberg.org/ebooks/2641.rdf',
      'image/jpeg':
        'https://www.gutenberg.org/cache/epub/2641/pg2641.cover.medium.jpg',
      'application/octet-stream':
        'https://www.gutenberg.org/cache/epub/2641/pg2641-h.zip',
    },
    download_count: 53431,
  },
  {
    id: 100,
    title: 'The Complete Works of William Shakespeare',
    authors: [
      {
        name: 'Shakespeare, William',
        birth_year: 1564,
        death_year: 1616,
      },
    ],
    translators: [],
    subjects: ['English drama -- Early modern and Elizabethan, 1500-1600'],
    bookshelves: ['Plays'],
    languages: ['en'],
    copyright: false,
    media_type: 'Text',
    formats: {
      'text/html': 'https://www.gutenberg.org/ebooks/100.html.images',
      'application/epub+zip':
        'https://www.gutenberg.org/ebooks/100.epub3.images',
      'application/x-mobipocket-ebook':
        'https://www.gutenberg.org/ebooks/100.kf8.images',
      'text/plain; charset=us-ascii':
        'https://www.gutenberg.org/ebooks/100.txt.utf-8',
      'application/rdf+xml': 'https://www.gutenberg.org/ebooks/100.rdf',
      'image/jpeg':
        'https://www.gutenberg.org/cache/epub/100/pg100.cover.medium.jpg',
      'application/octet-stream':
        'https://www.gutenberg.org/cache/epub/100/pg100-h.zip',
    },
    download_count: 52348,
  },
];

describe('BooksList', () => {
  it('Component renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <BooksList booksList={books} isLoaded={true} />
      </MemoryRouter>
    );

    const bookCards = screen.getAllByTestId('book');
    expect(bookCards).toHaveLength(books.length);
  });

  it('Appropriate message is displayed if no cards are present', () => {
    render(<BooksList booksList={[]} isLoaded={true} />);

    const altText = screen.getByText(/Nothing was found/i);
    expect(altText).toBeInTheDocument();
  });

  it('Renders Loader when isLoaded is false', () => {
    render(<BooksList booksList={[]} isLoaded={false} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

});

