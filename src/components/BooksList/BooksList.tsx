import './BooksList.scss';
import { BookCard } from '../BookCard/BookCard';
import { Loader } from '../Loader/Loader';
import { BooksListProps } from '../../types';
import { FC } from 'react';

const BooksList: FC<BooksListProps> = ({ booksList, isLoaded }) => {
  return (
    <>
      {isLoaded ? (
        <ul className="books-list">
          {booksList.length ? (
            booksList.map((book) => <BookCard {...book} key={book.id} />)
          ) : (
            <Loader />
          )}
        </ul>
      ) : (
        <Loader />
      )}
    </>
  );
};

export { BooksList };
