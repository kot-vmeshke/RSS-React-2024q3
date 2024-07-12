import { FC } from 'react';
import './Main.scss';
import { BooksList } from '../BooksList/BooksList';
import { MainProps } from '../../types';
import { Pagination } from '../Pagination/Pagination';
import { Outlet } from 'react-router-dom';

const Main: FC<MainProps> = ({ isLoaded, booksList }) => {
  return (
    <main className="main">
      <div className="container main__container" data-testid="main-container">
        <div className="main__left">
          <BooksList isLoaded={isLoaded} booksList={booksList} />
          {isLoaded && <Pagination />}
        </div>
        <div className="main__right">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export { Main };
