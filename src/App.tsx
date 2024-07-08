import { Component } from 'react';
import './App.scss';
import { SearchPage } from './pages';
import { ErrorBoundary } from './components';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    );
  }
}

export default App;
