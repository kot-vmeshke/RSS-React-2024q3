import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DetailsBookCard, ErrorBoundary } from './components';
import { ThemeContext } from './context/ThemeContext';
import { ErrorPage, SearchPage } from './pages';

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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};

export default App;
