import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BookLayout from '../src/app/[id]/layout';
import Custom404 from '../src/app/error';
import Details from '../src/app/[id]/page';
import Home from '../src/app/page';
import React from 'react';
import RootLayout from '../src/app/layout';
import { renderWithProvider } from './utils/mockStore';

const TestComponent = () => {
  return (
    <>
      <div>Test Component</div>
    </>
  );
};

describe('App', () => {
  it('Main Page is rendering', async () => {
    const main = await Home({ searchParams: { page: '1' } });
    renderWithProvider(main);

    waitFor(
      () => {
        const container = screen.getByTestId('page-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it('Main layout is rendering', () => {
    render(
      <RootLayout>
        <TestComponent />
      </RootLayout>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('Error page is rendering', () => {
    render(<Custom404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('Details Page is rendering', async () => {
    const detailsPage = await Details({ params: { id: '1513' } });
    renderWithProvider(<>{detailsPage}</>);

    waitFor(
      () => {
        const container = screen.getByTestId('page-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('Details layout is rendering', () => {
    renderWithProvider(
      <BookLayout>
        <TestComponent />
      </BookLayout>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
