import '@testing-library/jest-dom';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { data } from './utils/constants';
import { Root } from '../app/root';
import { store } from '../src/store/store';

describe('Pagination', () => {
  it('Component renders valid page number', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Root,
        loader() {
          return json({ data, search: '' });
        },
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const pagination = await screen.findByTestId('pagination');
    const pageNumber = await screen.findByTestId('page-number');

    expect(pagination).toBeInTheDocument();
    expect(pageNumber.textContent?.includes(`1 of`)).toBe(true);
  });

  it('Click on Next btn updates search params', async () => {
    const setSearchParams = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Root,
        loader() {
          return json({ data, search: '' });
        },
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const bntNext = await screen.findByTestId('next');
    fireEvent.click(bntNext);

    waitFor(() => {
      expect(setSearchParams).toBeCalledWith(2);
    })
  })
});
