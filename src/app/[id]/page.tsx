'use client';
import { DetailsBookCard } from '../../components';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

const getBook = async (id: string) => {
  const res = await fetch(`https://gutendex.com/books/${id}`);
  const data = await res.json();

  return data;
};

const Details: FC = async () => {
  const pathname = usePathname();
  const book = await getBook(pathname?.replace('/', '') ?? '');

  return <DetailsBookCard book={book} />;
};

export default Details;
