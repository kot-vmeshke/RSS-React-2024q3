import './App.scss';
import { ErrorPage, SearchPage } from './pages';
import { DetailsBookCard, ErrorBoundary } from './components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

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
  return (
    <ThemeContext.Provider value={'dark'}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};

export default App;
