import { Component } from 'react';

import './Header.scss';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchBarProps } from '../../types';

class Header extends Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <h1 className="header__title">Search books</h1>
          <SearchBar
            searchString={this.props.searchString}
            updateSearchString={this.props.updateSearchString}
          />
        </div>
      </header>
    );
  }
}

export { Header };
