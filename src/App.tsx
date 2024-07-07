import { Component } from 'react';
import './App.scss';
import { SearchPage } from './pages';
import { SearchProvider } from './context/SearchContext';

//const queryString: string = localStorage.getItem('books-seacrh') || 'a';

class App extends Component {
  render() {
    return (
      <SearchProvider>
        <SearchPage />
      </SearchProvider>
    );
  }
}

export default App;
