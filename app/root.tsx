import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import React from 'react';

import styles from './shared.css?url';
import { BooksList, FlyingList, Header, Pagination } from '../src/components';
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
  const q = url.searchParams.get('q');
  const res = await fetch('https://gutendex.com/books');
  const data: Data = await res.json();
  return json({ data, q });
};

const Root = () => {
  const theme = 'light';
  const { data } = useLoaderData<typeof loader>();

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
            {/* <Header /> */}
            <main className="main">
              <div
                className="container main__container"
                data-testid="main-container"
              >
                <div className="main__left">
                  <BooksList data={data}/>
                  {/* <Pagination /> */}
                </div>
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
