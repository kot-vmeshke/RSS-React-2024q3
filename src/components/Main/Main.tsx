import { FC } from 'react';
import './Main.scss';
import { BooksList } from '../BooksList/BooksList';
import { MainProps } from '../../types';
import { Pagination } from '../Pagination/Pagination';

const Main: FC<MainProps> = ({ isLoaded, booksList }) => {
  return (
    <main className="main">
      <div className="container main__container" data-testid="main-container">
        <BooksList isLoaded={isLoaded} booksList={booksList} />
        {isLoaded && <Pagination />}
      </div>
    </main>
  );
};

export { Main };
