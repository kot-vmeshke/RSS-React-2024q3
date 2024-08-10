import './Header.css';
import { FC } from 'react';
import { SearchBarProps } from '../../types';
import { SearchBar } from '../SearchBar';
import { ThemeSwitch } from '../ThemeSwitch';

const Header: FC<SearchBarProps> = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Search books</h1>
        <SearchBar />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export { Header };
