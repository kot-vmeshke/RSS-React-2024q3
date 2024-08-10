import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { DetailsBookCard, Loader } from '../../src/components';
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

  const navigation = useNavigation();

  return (
    <>
      {navigation.state === 'loading' ? (
        <Loader />
      ) : (
        <DetailsBookCard data={data} />
      )}
    </>
  );
};

export default OneBookPage;
