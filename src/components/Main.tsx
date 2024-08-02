// import './Main.scss';
import { BooksList } from '../../old/components/BooksList';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Pagination } from '../../old/components/Pagination';

const Main: FC = () => {
  return (
    <main className="main">
      <div className="container main__container" data-testid="main-container">
        <div className="main__left">
          <BooksList />
          <Pagination />
        </div>
        <div className="main__right">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export { Main };
