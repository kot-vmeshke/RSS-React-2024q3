import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SearchPage } from '../src/pages';
import { store } from '../src/store/store';

describe('SearchPage', () => {
  it('SearchPage is rendering', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );
    const errorTitle = screen.getByTestId('page-container');
    expect(errorTitle).toBeInTheDocument();
  });
});
