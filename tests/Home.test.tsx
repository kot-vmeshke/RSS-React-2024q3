import '@testing-library/jest-dom';
import Home, { getServerSideProps } from '../src/pages/index';
import { describe, expect, it, vi } from 'vitest';
import { GetServerSidePropsContext } from 'next/types';
import React from 'react';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {},
      push: vi.fn(),
      replace: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    }),
  };
});



describe('Home page', () => {
  it('Should be rendered', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 0,
            next: null,
            previous: null,
            results: [],
          }),
      })
    ) as unknown as typeof fetch;

    const context = {
      query: {},
      req: {},
      res: {},
      resolvedUrl: '',
      locale: 'en',
      localizations: [],
      defaultLocale: 'en',
      params: {},
    } as unknown as GetServerSidePropsContext;

    const { props } = await getServerSideProps(context);
    renderWithProvider(<Home data={props.data} />);

    const altText = screen.getByText(/Nothing was found/i);
    expect(altText).toBeInTheDocument();
  });

  it('Should be rendered if gSSP got an error', async () => {
    global.fetch = vi.fn(() =>
      Promise.reject()
    ) as unknown as typeof fetch;

    const context = {
      query: {},
      req: {},
      res: {},
      resolvedUrl: '',
      locale: 'en',
      localizations: [],
      defaultLocale: 'en',
      params: {},
    } as unknown as GetServerSidePropsContext;

    const { props } = await getServerSideProps(context);
    renderWithProvider(<Home data={props.data} />);

    const altText = screen.getByText(/Nothing was found/i);
    expect(altText).toBeInTheDocument();
  });
});
