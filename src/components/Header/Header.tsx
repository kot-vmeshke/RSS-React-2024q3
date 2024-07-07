import { Component } from 'react';

import './Header.scss';
import { SearchBar } from '../SearchBar/SearchBar';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <h1 className="header__title">Search books by author</h1>
          <SearchBar />
        </div>
      </header>
    );
  }
}

export { Header };
