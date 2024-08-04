import type { AppState, AppStore } from '../../src/store/store';
import React, { PropsWithChildren } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { RenderOptions } from '@testing-library/react';
import dataSlice from '../../src/store/dataSlice';
import { render } from '@testing-library/react';
import searchReduser from '../../src/store/searchSlice';
import selectedBooksReduser from '../../src/store/selectedBooksSlice';

const rootReducer = combineReducers({
  search: searchReduser,
  data: dataSlice,
  selectedBooks: selectedBooksReduser,
});

export const setupStore = (preloadedState?: Partial<AppState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<AppState>;
  store?: AppStore;
}

export function renderWithProvider(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
