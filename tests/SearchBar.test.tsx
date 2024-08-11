import '@testing-library/jest-dom';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { SearchBar } from '../src/components';
import { store } from '../src/store/store';

describe('SearchBar', () => {
  it('Clicking the Search button sends form', async () => {
    const submit = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <SearchBar search={''} />,
        loader() {
          return json({ message: 'hello' });
        },
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const input = await screen.findByRole('textbox');
    const testValue = 'test value';
    fireEvent.change(input, { target: { value: testValue } });

    fireEvent.click(screen.getByRole('button'));

    waitFor(() => {
      expect(submit).toHaveBeenCalled();
    });
  });

  it('Component renders valid value', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <SearchBar search={'test'} />,
        loader() {
          return json({ message: 'hello' });
        },
      },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(input.value).toBe('test');
  });
});
