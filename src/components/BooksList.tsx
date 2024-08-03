import { Book } from '../types';
//import { BookCard } from './BookCard';
import { FC } from 'react';
import { useAppSelector } from '../store/store';


const BooksList: FC = () => {
  const books = useAppSelector((state) => state.books);

  return (
    <ul className="books-list">
      {books.length ? (
        books.map((book: Book) => (
          // <BookCard {...book} key={book.id} />
          <span key={book.id}>{book.title}</span>
        ))
      ) : (
        <div className="books-list__nothing">Nothing was found</div>
      )}
    </ul>
  );
};

export { BooksList };
