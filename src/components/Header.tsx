import { FC } from 'react';
import { SearchBar } from './SearchBar';
import { ThemeSwitch } from './ThemeSwitch';

const Header: FC<{ search: string | null }> = ({ search }) => {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Search books</h1>
        <SearchBar search={search} />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export { Header };
