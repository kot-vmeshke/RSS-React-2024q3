import { Component } from 'react';

import './BooksList.scss';
import { BookCard } from '../BookCard/BookCard';
import { Loader } from '../Loader/Loader';
import { BooksListProps } from '../../types';

class BooksList extends Component<BooksListProps> {
  constructor(props: BooksListProps) {
    super(props);
  }

  render() {
    const { booksList, isLoaded } = this.props;
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
  }
}

export { BooksList };
