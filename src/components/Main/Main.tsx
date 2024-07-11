import { FC } from 'react';
import './Main.scss';
import { BooksList } from '../BooksList/BooksList';
import { MainProps } from '../../types';

const Main: FC<MainProps> = ({ isLoaded, booksList }) => {
  return (
    <main className="main">
      <div className="container main__container" data-testid="main-container">
        <BooksList isLoaded={isLoaded} booksList={booksList} />
      </div>
    </main>
  );
};

export { Main };
