import './Main.scss';
import { BooksList } from '../BooksList/BooksList';
import { FC } from 'react';
import { MainProps } from '../../types';
import { Outlet } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';

const Main: FC<MainProps> = ({ isLoaded, booksList, paginationData }) => {
  return (
    <main className="main">
      <div className="container main__container" data-testid="main-container">
        <div className="main__left">
          <BooksList isLoaded={isLoaded} booksList={booksList} />
          {isLoaded && <Pagination {...paginationData} />}
        </div>
        <div className="main__right">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export { Main };
