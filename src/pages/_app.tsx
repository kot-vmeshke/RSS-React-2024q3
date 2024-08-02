import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeContextProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <>
        <Head>
          <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
          <title>Search books</title>
        </Head>
        <Component {...pageProps} />
      </>
    </ThemeContextProvider>
  );
}
