import './App.scss';
import { ErrorPage, SearchPage } from './pages';
import { DetailsBookCard, ErrorBoundary } from './components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
