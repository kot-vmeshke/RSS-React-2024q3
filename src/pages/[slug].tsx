import { FC, ReactNode } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { Book } from '../types';
import { DetailsBookCard } from '../components/DetailsBookCard';
import { SearchPage } from '../components';

type LayoutComponent = FC<{ children: ReactNode }>;
export type PageWithLayout<P = object> = FC<P> & {
  Layout: LayoutComponent;
};

export const getServerSideProps = (async (context) => {
  const { slug } = context.query;
  const res = await fetch(`https://gutendex.com/books/${slug}`);
  const data = await res.json();

  return { props: { book: data } };
}) satisfies GetServerSideProps<{ book: Book }>;

export interface DetailsProps {
  book: Book;
}

const Details: PageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ book }) => {
  return <DetailsBookCard book={book} />;
};

Details.Layout = SearchPage;

export default Details;
