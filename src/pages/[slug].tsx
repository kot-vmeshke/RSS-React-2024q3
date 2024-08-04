import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { Book } from '../types';
import { DetailsBookCard } from '../components/DetailsBookCard';
import { FC } from 'react';

export const getServerSideProps = (async (context) => {
  const { slug } = context.query;
  const res = await fetch(`https://gutendex.com/books/${slug}`);
  const data = await res.json();

  return { props: { book: data } };
}) satisfies GetServerSideProps<{ book: Book }>;

export interface DetailsProps {
  book: Book;
}

const Details: FC<DetailsProps> = ({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <DetailsBookCard book={book} />;
};

export default Details;
