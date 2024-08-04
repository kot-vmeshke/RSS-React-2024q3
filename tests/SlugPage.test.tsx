import '@testing-library/jest-dom';
import Details, { getServerSideProps } from '../src/pages/[slug]';
import { describe, expect, it, vi } from 'vitest';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { book } from './utils/constants';
import { renderWithProvider } from './utils/mockStore';
import { screen } from '@testing-library/react';

vi.mock('next/router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useRouter: vi.fn().mockReturnValue({
      query: {
        slug: '1513',
      },
      push: vi.fn(),
      replace: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    }),
  };
});

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        ...book,
      }),
  })
) as unknown as typeof fetch;

describe('Details', () => {
  it('Should be rendered', async () => {
    const context = {
      query: {
        slug: '1513',
      },
      req: {},
      res: {},
      resolvedUrl: '',
      locale: 'en',
      localizations: [],
      defaultLocale: 'en',
      params: {
        slug: '1513',
      },
    } as unknown as GetServerSidePropsContext;

    const { props } = await getServerSideProps(context);
    renderWithProvider(<Details book={props.book} />);

    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe(
      book.title
    );
  });
});
