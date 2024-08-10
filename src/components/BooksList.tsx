import { FC } from 'react';
import { BookCard } from './BookCard';
import { Book, Data } from '../types';

const BooksList: FC<{ data: Data }> = ({ data }) => {
  const books = data.results;
  return (
    <ul className="books-list">
      {books.length ? (
        books.map((book: Book) => <BookCard {...book} key={book.id} />)
      ) : (
        <div className="books-list__nothing">Nothing was found</div>
      )}
    </ul>
  );
};

export { BooksList };
