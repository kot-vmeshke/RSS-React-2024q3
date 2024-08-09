import { FC } from 'react';
import { SearchBar } from './SearchBar';
import { SearchBarProps } from '../types';
import { ThemeSwitch } from './ThemeSwitch';

const Header: FC<SearchBarProps> = () => {
  return (
    <header className="bg-color-bg-dark p-[20px_0] dark:bg-dark-color-bg-dark">
      <div className="container flex items-center justify-between gap-[32px]">
        <h1 className="mr-auto font-light text-[24px] text-color-text dark:text-dark-color-text">Search books</h1>
        <SearchBar />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export { Header };
