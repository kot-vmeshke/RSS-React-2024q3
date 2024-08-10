import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import React from 'react';

import styles from './shared.css?url';
import {
  BooksList,
  // FlyingList,
  Header,
  Loader,
  Pagination
} from '../src/components';
import { Data } from '../src/types';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'shortcut icon',
      href: './favicon.ico',
      type: 'image/ico',
    },
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const page = url.searchParams.get('page');
  const res = await fetch(
    `https://gutendex.com/books?search=${search || ''}&page=${page || 1}`
  );
  const data: Data = await res.json();
  return json({ data, search });
};

const Root = () => {
  const theme = 'light';
  const { data, search } = useLoaderData<typeof loader>();

  const navigation = useNavigation();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Search books</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">
          <div className={`page ${theme}`} data-testid="page-container">
            <Header search={search} />
            <main className="main">
              <div
                className="container main__container"
                data-testid="main-container"
              >
                <>
                  {navigation.state === 'loading' ? (
                    <Loader />
                  ) : (
                    <div className="main__left">
                      <BooksList data={data} />
                      <Pagination data={data}/>
                    </div>
                  )}
                </>
                <div className="main__right">
                  <Outlet />
                </div>
              </div>
            </main>
            {/* <FlyingList /> */}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default Root;
