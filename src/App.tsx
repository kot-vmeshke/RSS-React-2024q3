import { Component } from 'react';
import './App.scss';
import { SearchPage } from './pages';
import { SearchProvider } from './context/SearchContext';
import { ErrorBoundary } from './components';

class App extends Component {
  render() {
    return (
      <SearchProvider>
        <ErrorBoundary>
          <SearchPage />
        </ErrorBoundary>
      </SearchProvider>
    );
  }
}

export default App;
