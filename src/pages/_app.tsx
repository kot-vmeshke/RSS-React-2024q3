import '../styles/globals.css';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import { Provider } from 'react-redux';
import { ThemeContextProvider } from '../context/ThemeContext';
import { wrapper } from '../store/store';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  Layout?: ({ children }: { children: ReactNode }) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const Layout = Component.Layout || EmptyLayout;

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <>
          <Head>
            <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
            <title>Search books</title>
          </Head>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </>
      </ThemeContextProvider>
    </Provider>
  );
}

const EmptyLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
