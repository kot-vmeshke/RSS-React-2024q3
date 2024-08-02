import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeContextProvider } from '../context/ThemeContext';
import { store } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <>
          <Head>
            <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
            <title>Search books</title>
          </Head>
          <Component {...pageProps} />
        </>
      </ThemeContextProvider>
    </Provider>
  );
}
