import './App.scss';
import { SearchPage } from './pages';
import { ErrorBoundary } from './components';

const App = () => {
  return (
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  );
};

export default App;
