import { Book } from '../../types';
import { DetailsBookCard } from '../../components';
import { FC } from 'react';

export const getBook = async (id: string) => {
  const res = await fetch(`https://gutendex.com/books/${id}`);
  const data = await res.json();

  return data;
};

export async function generateStaticParams() {
  const { results: books } = await fetch('https://gutendex.com/books').then(
    (res) => res.json()
  );

  return books.map((book: Book) => ({
    id: `${book.id}`,
  }));
}

interface DetailsProps {
  params: {
    id: string;
  };
}

const Details: FC<DetailsProps> = async ({ params: { id } }) => {
  const book = await getBook(id);

  return (
    <>
      <DetailsBookCard book={book} />
    </>
  );
};

export default Details;
