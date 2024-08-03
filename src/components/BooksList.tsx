import { Book } from '../types';
import { BookCard } from './BookCard';
import { FC } from 'react';
import { useAppSelector } from '../store/store';

const BooksList: FC = () => {
  const { results: books } = useAppSelector((state) => state.data);

  return (
    <ul className="grid grid-cols-1 gap-[12px] list-none h-[calc(100svh-272px)] overflow-y-auto scrollbar-none pb-[65px] mask @[988px]/main:grid-cols-[repeat(2,_calc(50%-6px))] auto-rows-min">
      {books.length ? (
        books.map((book: Book) => <BookCard {...book} key={book.id} />)
      ) : (
        <div className="col-[1_/_-1] text-center text-[14px] text-color-text dark:text-dark-color-text opacity-70">
          Nothing was found
        </div>
      )}
    </ul>
  );
};

export { BooksList };
