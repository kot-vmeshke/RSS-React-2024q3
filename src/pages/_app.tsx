import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeContextProvider } from '../context/ThemeContext';
import { wrapper } from '../store/store';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <>
          <Head>
            <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
            <title>Search books</title>
          </Head>
          <Component {...props.pageProps} />
        </>
      </ThemeContextProvider>
    </Provider>
  );
}
