import './BooksList.css';
import { FC } from 'react';
import { Book, Data } from '../../types';
import { BookCard } from '../BookCard';

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
