import { DetailsBookCard, ErrorBoundary } from './components';
import { ErrorPage, SearchPage } from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeContext } from './context/ThemeContext';
import { store } from './store/store';
import { useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'book/:bookId',
        element: <DetailsBookCard />,
      },
    ],
  },
]);

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('book-theme') || 'light'
  );
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
};

export { App };
