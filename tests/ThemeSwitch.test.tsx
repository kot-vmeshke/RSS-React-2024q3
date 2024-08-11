import '@testing-library/jest-dom';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { ThemeSwitch } from '../src/components';
import { store } from '../src/store/store';
import themeReducer, { setTheme } from '../src/store/themeSlice';

describe('ThemeSwitch', () => {
  it('Theme is changing', async () => {
    const dispatch = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <ThemeSwitch />,
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

    const darkBtn = await screen.findByTestId('dark-button');
    fireEvent.click(darkBtn);

    waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setTheme('dark'));
    });

    const lightBtn = await screen.findByTestId('light-button');
    fireEvent.click(lightBtn);

    waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setTheme('light'));
    });

  });
});

describe('ThemeSlice', () => {
  it('Theme should be changed in store', () => {
    const initialState = {
      theme: 'dark',
    };
    const state = themeReducer(initialState, setTheme('light'));

    expect(state.theme).toBe('light');
  });
});
