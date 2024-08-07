import { vi } from 'vitest';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal();

  const mockSearchParams = new URLSearchParams();
  mockSearchParams.append('page', '1');

  return {
    ...(actual as object),
    useSearchParams: vi.fn().mockReturnValue(mockSearchParams),
    useRouter: () => ({
      replace: vi.fn(),
    }),
  };
});

vi.mock('../../src/app/page', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    getData: vi.fn().mockResolvedValue({
      count: 0,
      next: null,
      previous: null,
      results: [],
    }),
  };
});

vi.mock('../../src/app/[id]/page', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    getBook: vi.fn().mockResolvedValue({
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
    }),
  };
});
