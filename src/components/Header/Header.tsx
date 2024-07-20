import './Header.scss';
import { FC } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchBarProps } from '../../types';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

const Header: FC<SearchBarProps> = ({ searchString, updateSearchString }) => {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Search books</h1>
        <SearchBar
          searchString={searchString}
          updateSearchString={updateSearchString}
        />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export { Header };
