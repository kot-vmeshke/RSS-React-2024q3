import { FC } from 'react';

import './Header.scss';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchBarProps } from '../../types';

const Header: FC<SearchBarProps> = ({ searchString, updateSearchString }) => {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Search books</h1>
        <SearchBar
          searchString={searchString}
          updateSearchString={updateSearchString}
        />
      </div>
    </header>
  );
};

export { Header };
