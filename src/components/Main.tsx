import { BooksList } from './BooksList';
import { FC } from 'react';
import { Pagination } from './Pagination';

const Main: FC = ( ) => {
  return (
    <main className="main p-[60px_0] flex-[1_1_100%]">
      <div
        className="container relative min-h-[100px] flex gap-[12px]"
        data-testid="main-container"
      >
        <div className="w-full @container/main">
          <BooksList />
          <Pagination />
        </div>
        <div className="main-right"></div>
      </div>
    </main>
  );
};

export { Main };
