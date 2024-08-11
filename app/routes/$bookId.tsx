import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { DetailsBookCard } from '../../src/components';
import { Book } from '../../src/types';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'shortcut icon',
      href: './favicon.ico',
      type: 'image/ico',
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {

  const res = await fetch(`https://gutendex.com/books/${params.bookId}`);
  const data: Book = await res.json();
  return json({ data });
};

const OneBookPage = () => {
  const { data } = useLoaderData<typeof loader>();

  return <DetailsBookCard data={data} />;
};

export default OneBookPage;
